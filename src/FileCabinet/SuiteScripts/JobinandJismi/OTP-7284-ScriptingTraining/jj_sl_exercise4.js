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
                    id: 'sex',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customlist_jj_sex_list',
                    label: 'Sex'
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
    
            } else if (scriptContext.request.method === 'POST'){ 
                var params = scriptContext.request.parameters;
                log.debug('Form Submitted Values', params);
                var submittedName = params.name;
                var submittedAge = params.age;
                var submittedSex = params.sex;
                var submittedAddress = params.address;

                try {
                    let patientRecord = record.create({
                        type: 'customrecord_jj_patient_record',
                        isDynamic: true
                    });
    
                    patientRecord.setValue({
                        fieldId: 'custrecord_jj_name',
                        value: submittedName
                    });
    
                    patientRecord.setValue({
                        fieldId: 'custrecord_jj_age',
                        value: submittedAge
                    });
    
                    patientRecord.setValue({
                        fieldId: 'custrecord_jj_sex',
                        value: submittedSex
                    });
    
                    patientRecord.setValue({
                        fieldId: 'custrecord_jj_addresss',
                        value: submittedAddress
                    });
    
                    patientRecord.save();
    
                } catch (e) {

                    scriptContext.response.write({
                        output: 'Error occurred: ' + e.message
                    });
                }
    
                scriptContext.response.write('<html><body><h3>Thank you for submitting the form!</h3></body></html>');
                scriptContext.response.write('<br><b>submittedName</b>: '+ submittedName);
                scriptContext.response.write('<br><b>submittedAge</b>: '+ submittedAge);
                scriptContext.response.write('<br><b>submittedPhone</b>: '+ submittedSex);
                scriptContext.response.write('<br><b>submittedAddress</b>: '+ submittedAddress);
            
            }

        }

        return {onRequest}

    });
