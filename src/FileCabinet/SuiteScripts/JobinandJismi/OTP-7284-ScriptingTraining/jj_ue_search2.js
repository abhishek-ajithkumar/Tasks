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

            //Create a search to display the details of all the invoices with ‘Open’ status. The search result should include Document number, date, customer name, customer email, amount. 

            try {
                let filters = [
                    ['status', 'is', 'CustInvc:A'],
                    'AND',
                    ['mainline', 'is', 'T']
                ];

                let columns = [
                    search.createColumn({ name: 'tranid', label: 'Document Number' }),
                    search.createColumn({ name: 'trandate', label: 'Date' }),
                    search.createColumn({ name: 'entity', label: 'Customer Name' }),
                    search.createColumn({ name: 'email', label: 'Customer Email' }),
                    search.createColumn({ name: 'amount', label: 'Amount' })
                ];

                let invoiceSearch = search.create({
                    title: 'Open Invoices JJ',
                    id: 'customsearch_jj_open_invoices',
                    type: search.Type.INVOICE,
                    filters: filters,
                    columns: columns
                });

                let searchResults = invoiceSearch.run().getRange({ start: 0, end: 20 });


                searchResults.forEach(function (result) {
                    let documentNumber = result.getValue({ name: 'tranid' });
                    let date = result.getValue({ name: 'trandate' });
                    let customerName = result.getText({ name: 'entity' });
                    let customerEmail = result.getValue({ name: 'email', join: 'customer' });
                    let amount = result.getValue({ name: 'amount' });

                    log.debug('Serach 2', 'Document Number: ' + documentNumber + ', Date: ' + date +
                        ', Customer Name: ' + customerName + ', Customer Email: ' + customerEmail +
                        ', Amount: ' + amount);

                    return true;

                });


            } catch (e) {
                log.error('Error while creating the Search', e.toString());
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
