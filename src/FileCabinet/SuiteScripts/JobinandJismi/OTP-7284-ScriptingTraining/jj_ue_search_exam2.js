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
                    ['mainline', 'is', 'T'],
                    'AND',
                    ['entity','is', 122]
                ];

                let filter2 = [
                    search.createFilter({
                        name: 'entity',
                        operator: search.Operator.IS,
                        values: 122
                })];

                let columns = [
                    search.createColumn({ name: 'tranid', label: 'Transaction ID' }),
                    search.createColumn({ name: 'trandate', label: 'Transaction Date' }),
                    search.createColumn({ name: 'total', label: 'Total Amount' }),
                    search.createColumn({ name: 'status', label: 'Status' })

                ];

                let memoSearch = search.create({
                    title: 'Credit Memo of ABC company JJ',
                    id: 'customsearch_jj_credit_memo',
                    type: search.Type.CREDIT_MEMO,
                    filters: filter1, 
                    columns: columns
                });


                let searchResults = memoSearch.run().getRange({ start: 0, end: 10 });


                searchResults.forEach(function (result) {
                    let transactionid = result.getValue({ name: 'tranid' });
                    let date = result.getValue({ name: 'trandate' });
                    let total = result.getValue({ name: 'total' });
                    let status = result.getValue({ name: 'status' });


                    log.debug('Credit Memo of ABC company', 'Transaction ID : ' + transactionid + ', Date: ' + date +
                        ', Total Amount: ' + total +
                        ', Status: ' + status);

                    return true;

                });


            } catch (e) {
                log.error('Error while searching the credit memo', e.toString());
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
