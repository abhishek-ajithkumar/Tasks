/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, record, runtime, search) => {
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

            try {

                if (scriptContext.type === scriptContext.UserEventType.CREATE) {

                    let orderID = scriptContext.newRecord.getValue('id');
                    log.debug("ID" + orderID)

                    let order = record.load({
                        type: record.Type.PURCHASE_ORDER,
                        id: orderID
                    });

                    let items = order.getSublistValue({ 
                        sublistId: 'item',
                        fieldId: 'item',
                    });
                    log.debug("ITEM NAME: " + items)

                    // items.forEach(function (result) {
                    //     let item = result.getValue({ name: 'item' });
                    //     log.debug("item; " + item);
                    //     return true;
                    // });



                    //     let subject = 'Item with no preferred vendor';
                    //     let body = 'No preferred vendor is added for the item ' + itemName + '.';
                    //     body += '\n\nPlease update the preferred vendor.';

                    //     // Send email alert to sales manager
                    //     email.send({
                    //         author: runtime.getCurrentUser().id,
                    //         recipients: Employee,
                    //         subject: subject,
                    //         body: body
                    //     });
                    //     log.debug("Email sented")
                    // }
                }

    

            } catch (e) {
                log.error('Error while sending the email', e.toString());
            }

        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
