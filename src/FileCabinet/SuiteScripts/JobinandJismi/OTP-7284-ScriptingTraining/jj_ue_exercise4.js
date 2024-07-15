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

            try {
                if ((scriptContext.type === scriptContext.UserEventType.VIEW) || (scriptContext.type === scriptContext.UserEventType.EDIT)) {

                    let customerRecord = scriptContext.newRecord;
                    if (scriptContext.newRecord.type === record.Type.CUSTOMER) {
                        let customer = record.load({
                            type: record.Type.CUSTOMER,
                            id: customerRecord.id
                        });

                        let name = customer.getValue({
                            fieldId: 'entityid'
                        });
                        let name_char = name.substring(0, 2).toUpperCase();
                        // log.debug("Name: "+ name_char)

                        let date = customer.getValue({
                            fieldId: 'datecreated'
                        });
                        let createdMonth = ('0' + (date.getMonth() + 1)).slice(-2);
                        // log.debug("Date: "+ createdMonth)

                        let shortName = name_char + ": " + createdMonth
                        // log.debug("shortName: "+ shortName)

                        customer.setValue({
                            fieldId: 'custentity_jj_ue_short_name',
                            value: shortName
                        })
                        customer.save()
                        // log.debug("Update")

                    }



                }





            } catch (e) {
                log.error({
                    title: 'Error in Exercise 4',
                    details: e.toString()
                });
            }

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
