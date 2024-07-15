/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/email', 'N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (email, record, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {

            if (scriptContext.request.method === 'GET') {
                let form = serverWidget.createForm({
                    title: 'New Customer Record Form'
                });
                form.addField({
                    id: 'name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer Name'
                });
                form.addField({
                    id: 'email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Customer Email'
                });
                form.addField({
                    id: 'subject',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Subject'
                });
                form.addField({
                    id: 'message',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Message'
                });
                form.addSubmitButton({
                    label: 'Submit'
                });
                scriptContext.response.writePage(form);
            }
            else {
                let name = scriptContext.request.parameters.name;
                let email = scriptContext.request.parameters.email;
                let subject = scriptContext.request.parameters.subject;
                let message = scriptContext.request.parameters.message;
                let customerSearch = search.create({
                    type: search.Type.CUSTOMER,
                    filters: [['email', 'is', email]],
                    columns: ['internalid','salesrep']
                }).run().getRange({ start: 0, end: 1 });
                let customerRef = customerSearch.length > 0 ? customerSearch[0].getValue('internalid') : null;

                try {
                    let customerRecord = record.create({
                        type: 'customrecord_jj_customer_record',
                        isDynamic: true
                    });
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_cname',
                        value: name
                    });
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_c_email',
                        value: email
                    });
                    if(customerRef){
                        customerRecord.setValue({
                            fieldId: 'custrecord_jj_ref_customer',
                            value: customerRef
                        }); 
                    }
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_subject',
                        value: subject
                    }); 
                    customerRecord.setValue({
                        fieldId: 'custrecord_jj_message',
                        value: message
                    }); 
                    let recordId = customerRecord.save();
                    sendEmailToAdmin(recordId)

                    let salesRep = customerSearch.length > 0 ? customerSearch[0].getValue('salesrep') : null;
                    if(salesRep){
                        let employee = record.load({
                            type: 'employee',
                            id: salesRep,
                            isDynamic: true
                        });
                        let employeeEmail = employee.getValue('email');
                        if(employeeEmail){
                            sendEmailToSalesRep(employeeEmail, recordId)
                        }
                    }
                    scriptContext.response.write('Customer record was successfully saved. Record ID: ' + recordId);             
                } catch (e) {
                    log.error({
                        title: 'Error in Creating Record',
                        details: e.toString()
                    });
                    scriptContext.response.write('An error occurred while creating record: ' + e.message);
                }
            }

            function sendEmailToAdmin(recordId){
                email.send({
                    author: -5,
                    recipients: -5,
                    subject: 'Customer Record Created - '+recordId,
                    body: 'Customer Record Id:'+ recordId
                
                });
            }
            function sendEmailToSalesRep(employeeEmail, recordId){
                email.send({
                    author: -5,
                    recipients: employeeEmail,
                    subject: 'Customer Record Created - '+recordId,
                    body: 'Customer Record Id:'+ recordId
                    });
            }
        }
        return {onRequest}

    });
