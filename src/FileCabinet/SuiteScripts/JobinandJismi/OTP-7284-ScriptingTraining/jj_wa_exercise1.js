/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/record', 'N/runtime', 'N/url'],
    /**
 * @param{record} record
 * @param{runtime} runtime
 * @param{url} url
 */
    (record, runtime, url) => {
        /**
         * Defines the WorkflowAction script trigger point.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.workflowId - Internal ID of workflow which triggered this action
         * @param {string} scriptContext.type - Event type
         * @param {Form} scriptContext.form - Current form that the script uses to interact with the record
         * @since 2016.1
         */
        const onAction = (scriptContext) => {

            let newRecord = record.create({
                type: 'customrecord_jj_test',
                isDynamic: true
            });
    
            newRecord.setValue({
                fieldId: 'name',
                value: 'name' // set as needed
            });
    
            newRecord.setValue({
                fieldId: 'custrecord_jj_test_field',
                value: 'Test Value' // set as needed
            });
    
            // Save the record and get the ID
            var recordId = newRecord.save();
    
            // Update the Task record with the created custom record ID
            var taskId = context.newRecord.id;
            record.submitFields({
                type: context.newRecord.type,
                id: taskId,
                values: {
                    custrecord_created_custom_record_id: recordId
                },
                options: {
                    enableSourcing: false,
                    ignoreMandatoryFields: true
                }
            });
    
            // Redirect to the created custom record
            var redirectUrl = url.resolveRecord({
                recordType: 'customrecord_jj_test', // replace with your custom record type id
                recordId: recordId,
                isEditMode: true // adjust as needed
            });
    
            // Set the redirect URL
            context.redirectUrl = redirectUrl;

        }

        return {onAction};
    });
