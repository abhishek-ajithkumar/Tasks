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

                /*let newCustomer = record.create({
                    type: record.Type.CUSTOMER,
                    isDynamic: true
                });
    
                newCustomer.setValue({
                    fieldId: 'firstname',
                    value: 'Riya Singh'
                });
    
                newCustomer.setValue({
                    fieldId: 'subsidiary', 
                    value: 1
                });
    
                let recId = newCustomer.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });
                log.debug("Successfully added new customer", recId);*/


                //1. Display the following details of a specified sales order. Document number, Customer name.

                let salesorder = record.load({
                    type: record.Type.SALES_ORDER,
                    id: 3545
                });

                let documentNumber = salesorder.getValue({
                    fieldId: 'tranid'
                });

                let customerName = salesorder.getText({
                    fieldId: 'entity'
                });

                log.debug("Document Number", "Q1 -" + documentNumber)
                log.debug("Customer name", "Q1 -" + customerName)


                //2. Update the sales rep field of any given customer record.

                let customerrecord = record.load({
                    type: record.Type.CUSTOMER,
                    id: 1189
                });

                customerrecord.setValue({
                    fieldId: 'salesrep',
                    value: 965,
                    ignoreFieldChange: true
                });
                let customer = customerrecord.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });
                log.debug("Updated SalesRep", "Q2 - Customer ID: " + customer)


                //3. Create a sales order programmatically. 

                let newSalesOrder = record.create({
                    type: record.Type.SALES_ORDER,
                    isDynamic: true
                });
    
                newSalesOrder.setValue({
                    fieldId: 'entity',
                    value: 1072
                });

                newSalesOrder.selectNewLine({ 
                    sublistId: 'item'  
                });
                
                newSalesOrder.setCurrentSublistValue({ 
                    sublistId: 'item',
                    fieldId: 'item',
                    value: 519
                });
                newSalesOrder.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 2
                });

                newSalesOrder.commitLine({ 
                    sublistId: 'item'
                });
                
                let salesOrderId = newSalesOrder.save({                  
                    ignoreMandatoryFields: true 
                });
    
                log.debug('Sales Order Created', 'Q3 - Sales Orders ID: ' + salesOrderId);

                

                //4. Create a purchase order programmatically. 

                let newPurchaseOrder = record.create({
                    type: record.Type.PURCHASE_ORDER,
                    isDynamic: true
                });
    
                newPurchaseOrder.setValue({
                    fieldId: 'entity',
                    value: 127
                });

                newPurchaseOrder.selectNewLine({ 
                    sublistId: 'item'  
                });
                
                newPurchaseOrder.setCurrentSublistValue({ 
                    sublistId: 'item',
                    fieldId: 'item',
                    value: 356
                });
                newPurchaseOrder.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: 2
                });

                newPurchaseOrder.commitLine({ 
                    sublistId: 'item'
                });
                
                let PurchaseOrderId = newPurchaseOrder.save({                  
                    ignoreMandatoryFields: true 
                });
    
                log.debug('Purchase Order Created', 'Q4 - Purchase Orders ID: ' + PurchaseOrderId);




                // 5. Delete any record. 

                record.delete({
                    type: record.Type.PURCHASE_ORDER,
                    id: 2919
                });
                log.debug('Deleted Purchase Order','Q5 - Record No: 3566');


                // 6. Load any record and display the details. 

                let order = record.load({
                    type: record.Type.PURCHASE_ORDER,
                    id: 3560
                });

                let documentNo = order.getValue({
                    fieldId: 'tranid'
                });

                let vendorName = order.getText({
                    fieldId: 'entity'
                });

                log.debug("Record loaded", "Q6 - document Number: " + documentNo + "\n" + ", Vendor name: " + vendorName)


            } catch (e) {
                log.error('Error in deleting a record', e.toString());
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
