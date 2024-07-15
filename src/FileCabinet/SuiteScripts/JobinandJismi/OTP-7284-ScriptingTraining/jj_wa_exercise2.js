/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/currentRecord', 'N/log', 'N/record'],
    /**
 * @param{currentRecord} currentRecord
 * @param{log} log
 * @param{record} record
 */
    (currentRecord, log, record) => {
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

            try {
                var newRecord = scriptContext.newRecord;

                var numberValue = newRecord.getValue({
                    fieldId: 'custbody_jj_sales_number'
                });

                if (numberValue >= 100){
                    return "Passed"
                }
                else{
                    return "Failed"
                }

                // var resultValue = (numberValue >= 100) ? 'Passed' : 'Failed';

                // newRecord.setValue({
                //     fieldId: 'custbody_jj_sales_result',
                //     value: resultValue
                // });

            } catch (e) {
                log.error({
                    title: 'Error in beforeSubmit',
                    details: e.message
                });

            }
        }

        return { onAction };
    });

