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

            try {

                if (scriptContext.type === scriptContext.UserEventType.CREATE) {

                    let customerId = scriptContext.newRecord.getValue('entity');
                    let count = openSalesOrderCount(customerId);
                    log.debug("OPEN SALES ORDER: " + count)
                    if (count > 5) {
                        let salesRepId = getSalesRep(customerId);
                        let salesRepRecord = record.load({
                            type: record.Type.EMPLOYEE,
                            id: salesRepId,
                            isDynamic: true
                        });
                        let salesRepEmail = salesRepRecord.getValue('email');
                        let customerName = record.load({
                            type: record.Type.CUSTOMER,
                            id: customerId
                        }).getValue('entityid'); 
                        let subject = count +' Open Sales Orders for ' + customerName;
                        let body = 'A new sales order has been created for customer ' + customerName + ', who has '+ count + ' open sales orders.';
                        body += '\n\nPlease close the sales order asap.';
        
                        email.send({
                            author: runtime.getCurrentUser().id,
                            recipients: salesRepEmail,
                            subject: subject,
                            body: body
                        });
                        log.debug("Email sent","Email has been sent to the SalesRep.")
                    }
                }

                function openSalesOrderCount(customerId) {
                    let count = 0;
                    let openStatus = search.create({
                        type: search.Type.SALES_ORDER,
                        filters: [
                            ['entity', 'anyof', customerId],
                            'AND',
                            ['mainline', 'is', 'T'],
                            'AND',
                            ['status', 'anyof', 'SalesOrd:A', 'SalesOrd:B', 'SalesOrd:D', 'SalesOrd:E', 'SalesOrd:F']
                        ],
                        columns: ['internalid', 'entity']
                    });
                    let searchResults = openStatus.run().getRange({ start: 0, end: 100 });
                    searchResults.forEach(function (result) {
                        let internalId = result.getValue({ name: 'internalid' });
                        let entity = result.getText({ name: 'entity' });
                        count = count + 1;
                        return true;
                    });
                    return count;
                }

                function getSalesRep(customerId) {
                    let customerRecord = record.load({
                        type: record.Type.CUSTOMER,
                        id: customerId,
                        isDynamic: true
                    });
                    return customerRecord.getValue('salesrep');
                }
            } catch (e) {
                log.error('Error while sending the email', e.toString());
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
