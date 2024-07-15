/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{serverWidget} serverWidget
 */
    (record, serverWidget) => {
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
                    title: 'Customer Information Form'
                });

                form.addField({
                    id: 'first_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'First Name'
                });

                form.addField({
                    id: 'last_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Last Name'
                });

                form.addField({
                    id: 'customer_email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Email'
                });

                form.addField({
                    id: 'customer_phone',
                    type: serverWidget.FieldType.PHONE,
                    label: 'Phone'
                });

                form.addField({
                    id: 'customer_sales_rep',
                    type: serverWidget.FieldType.SELECT,
                    source: 'employee',
                    label: 'Sales Rep'
                });

                form.addField({
                    id: 'customer_subsidiary',
                    type: serverWidget.FieldType.SELECT,
                    source: 'subsidiary',
                    label: 'Subsidiary'
                });

                form.addSubmitButton({
                    label: 'Submit'
                });

                scriptContext.response.writePage(form);

            } else if (scriptContext.request.method === 'POST') {

                var firstName = scriptContext.request.parameters.first_name;
                var lastName = scriptContext.request.parameters.last_name;
                var customerEmail = scriptContext.request.parameters.customer_email;
                var customerPhone = scriptContext.request.parameters.customer_phone;
                var customerSalesRep = scriptContext.request.parameters.customer_sales_rep;
                var customerSubsidiary = scriptContext.request.parameters.customer_subsidiary;

                try {

                    var customerRecord = record.create({
                        type: record.Type.CUSTOMER,
                        isDynamic: true
                    });

                    customerRecord.setValue({
                        fieldId: 'firstname',
                        value: firstName
                    });

                    customerRecord.setValue({
                        fieldId: 'lastname',
                        value: lastName
                    });

                    customerRecord.setValue({
                        fieldId: 'email',
                        value: customerEmail
                    });

                    customerRecord.setValue({
                        fieldId: 'phone',
                        value: customerPhone
                    });

                    customerRecord.setValue({
                        fieldId: 'salesrep',
                        value: customerSalesRep
                    });

                    customerRecord.setValue({
                        fieldId: 'subsidiary',
                        value: customerSubsidiary
                    });

                    var customerId = customerRecord.save();

                    scriptContext.response.write('Customer record created successfully. Customer ID: ' + customerId);

                } catch (e) {
                    log.error({
                        title: 'Error Creating Customer Record',
                        details: e.toString()
                    });
                    scriptContext.response.write('An error occurred while creating the customer record: ' + e.message);
                }
            }

        }

        return { onRequest }

    });
