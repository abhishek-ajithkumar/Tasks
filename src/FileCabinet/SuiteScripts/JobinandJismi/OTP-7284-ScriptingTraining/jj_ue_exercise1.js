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

            //1. Create a custom checkbox in the customer and vendor records. When a sales order is created, check the checkbox in the corresponding customer record. When a purchase order is created, check the checkbox in the corresponding vendor record.

            try {
                if (scriptContext.type === scriptContext.UserEventType.CREATE) {
                    let newRecord = scriptContext.newRecord;
    
                    if (scriptContext.newRecord.type === record.Type.SALES_ORDER) {

                        let customerId = newRecord.getValue({
                            fieldId: 'entity'
                        });
                
                        let customerRecord = record.load({
                            type: record.Type.CUSTOMER,
                            id: customerId
                        });
                
                        customerRecord.setValue({
                            fieldId: 'custentity_jj_customer_checkbox',
                            value: true
                        });
                
                        customerRecord.save();
                        log.debug("Checkbox checked for Customer ID: " + customerId)
                    } 

                    if (scriptContext.newRecord.type === record.Type.PURCHASE_ORDER) {

                        let vendorId = newRecord.getValue({
                            fieldId: 'entity'
                        });
                
                        let vendorRecord = record.load({
                            type: record.Type.VENDOR,
                            id: vendorId
                        });
                        log.debug("Vendor ID: " + vendorRecord.id)
                
                        vendorRecord.setValue({
                            fieldId: 'custentity_jj_vendor_checkbox',
                            value: true,
                            ignoreFieldChanged: true,
                            ignoreMandatoryField: true
                        });
                        log.debug("Vendor Recorded ")

                        vendorRecord.save({
                            enableSourcing: true,
                            ignoreMandatoryField: true
                        });
                        log.debug("Checkbox checked for Vendor ID: " + vendorId)
                    } 
                    
                }
            } catch (e) {
                log.error({
                    title: 'Error in User Event Script',
                    details: e.toString()
                });
            }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
