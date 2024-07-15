/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/currentRecord', 'N/record', 'N/runtime', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{currentRecord} currentRecord
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (currentRecord, record, runtime, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {

            if (scriptContext.request.method === 'GET') {

                var form = serverWidget.createForm({
                    title: 'Custom Customer Record Form'
                });

                form.addField({
                    id: 'fname',
                    type: serverWidget.FieldType.TEXT,
                    label: 'First Name'
                });

                form.addField({
                    id: 'lname',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Last Name'
                });

                form.addField({
                    id: 'email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Email'
                });


                form.addField({
                    id: 'phone',
                    type: serverWidget.FieldType.PHONE,
                    label: 'Phone Number'
                });

                form.addField({
                    id: 'dob',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date of Birth'
                });

                form.addField({
                    id: 'sales_rep',
                    type: serverWidget.FieldType.SELECT,
                    source: 'employee',
                    label: 'Account Manager (Sales Rep)'
                });

                form.addSubmitButton({
                    label: 'Submit'
                });

                scriptContext.response.writePage(form);

            }
            else if (scriptContext.request.method === 'POST') {

                var params = scriptContext.request.parameters;
                var submittedFName = params.fname;
                var submittedLName = params.lname;
                var submittedEmail = params.email;
                var submittedPhone = params.phone;
                var submittedDOB = new Date(params.dob);
                var submittedManager = params.sales_rep;


                let custRecord = record.create({
                    type: 'customrecord_jj_custom_customer',
                    isDynamic: true
                });

                custRecord.setValue({
                    fieldId: 'custrecord_jj_firstname',
                    value: submittedFName
                });

                custRecord.setValue({
                    fieldId: 'custrecord_jj_lastname',
                    value: submittedLName
                });

                custRecord.setValue({
                    fieldId: 'custrecord_jj_email_',
                    value: submittedEmail
                });

                custRecord.setValue({
                    fieldId: 'custrecord_jj_phonee',
                    value: submittedPhone
                });

                custRecord.setValue({
                    fieldId: 'custrecord_jj_dob',
                    value: submittedDOB
                });


                let searchEmail = search.create({
                    type: search.Type.CUSTOMER,
                    filters: [
                        ["email", "is", submittedEmail]
                    ],
                    columns: [
                        'salesrep'
                    ]
                });
                let searchResults = searchEmail.run().getRange({ start: 0, end: 1 });
                if (searchResults.length == 0){
                    custRecord.setValue({
                        fieldId: 'custrecord_jj_account_manager',
                        value: submittedManager
                    });
                }
                else{
                    searchResults.forEach(function (result) {
                        let salesRep = result.getValue({ name: 'salesrep' });
                        custRecord.setValue({
                                    fieldId: 'custrecord_jj_account_manager',
                                    value: salesRep
                                });
                    });

                    
                }
                
                custRecord.save();

                scriptContext.response.write('<html><body><h3>Thank you for submitting the form!</h3></body></html>');
                // scriptContext.response.write('<br><b>First Name</b>: ' + submittedFName);
                // scriptContext.response.write('<br><b>Last Name</b>: ' + submittedLName);
                // scriptContext.response.write('<br><b>Phone</b>: ' + submittedPhone);
                // scriptContext.response.write('<br><b>Email</b>: ' + submittedEmail);
                // scriptContext.response.write('<br><b>Date of Birth</b>: ' + submittedDOB);
                // // scriptContext.response.write('<br><b>Account Manager</b>: ' + submittedManager);



            }
        }

        return { onRequest }

    });
