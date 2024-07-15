/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

            //2. Create a checkbox “memo updated” in the sales order. Update the memo field as “memo updated”, when the checkbox is checked.

            try {

                let newRecord = scriptContext.newRecord;
                if (scriptContext.newRecord.type === record.Type.SALES_ORDER) {

                    let checkbox = newRecord.getValue({
                        fieldId: 'custbody_jj_update_memo'
                    });

                    if (checkbox == true) {
                        newRecord.setValue({
                            fieldId: 'memo',
                            value: "Memo Updated"
                        })
                        log.debug("Memo Updated")
                    }
                    else {
                        newRecord.setValue({
                            fieldId: 'memo',
                            value: ""
                        })
                        log.debug("Memo Removed")
                    }

                }

            }

            catch (e) {
                log.error({
                    title: 'Error in Exercise 2',
                    details: e.toString()
                });
            }

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
