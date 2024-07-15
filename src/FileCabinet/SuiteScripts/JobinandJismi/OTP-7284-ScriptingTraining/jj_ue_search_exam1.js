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
                let filter1 = [
                    ['status', 'is', 'SalesOrd:B'],
                    'AND',
                    ['mainline', 'is', 'T']
                ];

                let columns = [
                    search.createColumn({ name: 'tranid', label: 'Document Number' }),
                    search.createColumn({ name: 'trandate', label: 'Date' }),
                    search.createColumn({ name: 'entity', label: 'Customer Name' }),
                    search.createColumn({ name: 'subsidiary', label: 'Subsidiary' }),
                    search.createColumn({ name: 'amount', label: 'Amount' })
                ];

                let orderSearch = search.create({
                    title: 'Pending Fulfillment Sales Order JJ',
                    id: 'customsearch_jj_pending_fulfillment',
                    type: search.Type.SALES_ORDER,
                    filters: filter1,
                    columns: columns
                });

                // log.debug("Searched")

                let searchResults = orderSearch.run().getRange({ start: 0, end: 100 });


                searchResults.forEach(function (result) {
                    let documentNumber = result.getValue({ name: 'tranid' });
                    let date = result.getValue({ name: 'trandate' });
                    let customerName = result.getText({ name: 'entity' });
                    let subsidiary = result.getText({ name: 'subsidiary'});
                    let amount = result.getValue({ name: 'amount' });

                    log.debug('Sales Order: Pending Fulfillment', 'Document Number: ' + documentNumber + ', Date: ' + date +
                        ', Customer Name: ' + customerName + ', Subsidiary: ' + subsidiary +
                        ', Amount: ' + amount);

                    return true;

                });


            } catch (e) {
                log.error('Error while searching the sales order', e.toString());
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

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
