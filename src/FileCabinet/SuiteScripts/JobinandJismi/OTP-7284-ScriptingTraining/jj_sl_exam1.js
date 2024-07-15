/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record','N/ui/serverWidget'],
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
                    title: 'Registration Form'
                });
    
                form.addField({
                    id: 'name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                });
    
                form.addField({
                    id: 'age',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Age'
                });
    
                form.addField({
                    id: 'phone',
                    type: serverWidget.FieldType.PHONE,
                    label: 'Phone Number'
                });
    
                form.addField({
                    id: 'email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Email'
                });
    
                form.addField({
                    id: 'father_name',
                    type: serverWidget.FieldType.TEXT,
                    label: "Father's Name"
                });
    
                form.addField({
                    id: 'address',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Address'
                });
    
                form.addSubmitButton({
                    label: 'Submit'
                });
    
                scriptContext.response.writePage(form);
    
            } else { 
                var params = scriptContext.request.parameters;
                log.debug('Form Submitted Values', params);
                var submittedName = params.name;
                var submittedAge = params.age;
                var submittedPhone = params.phone;
                var submittedEmail = params.email;
                var submittedFatherName = params.father_name;
                var submittedAddress = params.address;

                try {
                    let registrationRecord = record.create({
                        type: 'customrecord_jj_registration_form',
                        isDynamic: true
                    });
    
                    registrationRecord.setValue({
                        fieldId: 'custrecord_jj_reg_name',
                        value: submittedName
                    });
    
                    registrationRecord.setValue({
                        fieldId: 'custrecord_jj_reg_age',
                        value: submittedAge
                    });
    
                    registrationRecord.setValue({
                        fieldId: 'custrecord_jj_reg_phone',
                        value: submittedPhone
                    });
    
                    registrationRecord.setValue({
                        fieldId: 'custrecord_jj_reg_email',
                        value: submittedEmail
                    });

                    registrationRecord.setValue({
                        fieldId: 'custrecord_jj_reg_father',
                        value: submittedFatherName
                    });

                    registrationRecord.setValue({
                        fieldId: 'custrecord_jj_reg_address',
                        value: submittedAddress
                    });
    
                    registrationRecord.save();
    
                } catch (e) {

                    scriptContext.response.write({
                        output: 'Error occurred: ' + e.message
                    });
                }
    
                scriptContext.response.write('<html><body><h3>Thank you for submitting the form!</h3></body></html>');
                scriptContext.response.write('<br><b>submittedName</b>: '+ submittedName);
                scriptContext.response.write('<br><b>submittedAge</b>: '+ submittedAge);
                scriptContext.response.write('<br><b>submittedPhone</b>: '+ submittedPhone);
                scriptContext.response.write('<br><b>submittedEmail</b>: '+ submittedEmail);
                scriptContext.response.write('<br><b>submittedFatherName</b>: '+ submittedFatherName);
                scriptContext.response.write('<br><b>submittedAge</b>: '+ submittedAge);
                scriptContext.response.write('<br><b>submittedAddress</b>: '+ submittedAddress);
            
            }

        }

        return {onRequest}

    });
