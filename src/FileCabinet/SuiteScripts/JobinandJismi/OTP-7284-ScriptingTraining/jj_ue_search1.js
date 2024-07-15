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

            //1. Create a search to display the details of all the customers created in the previous month under ‘Parent Subsidiary’. The search result should include Customer Name, Subsidiary, Sales Rep, Email and date created. 

            try {
                let filters = [
                    ['subsidiary', 'is', 1],
                    'AND',
                    ['datecreated', 'is', 'lastMonth']
                ];

                let columns = [
                    search.createColumn({ name: 'companyname', label: 'Customer Name' }),
                    search.createColumn({ name: 'subsidiary', label: 'Subsidiary' }),
                    search.createColumn({ name: 'salesrep', label: 'Sales Rep' }),
                    search.createColumn({ name: 'email', label: 'Email' }),
                    search.createColumn({ name: 'datecreated', label: 'Date Created' })
                ];

                let newSearch = search.create({
                    title: 'Customer in Previous Month JJ',
                    id: 'customsearch_jj_previousmonth_customer',
                    type: 'customer',
                    filters: filters,
                    columns: columns
                });

                let searchResults = newSearch.run().getRange({ start: 0, end: 10 });


                searchResults.forEach(function (result) {
                    let customerName = result.getValue(columns[0]);
                    let subsidiary = result.getText(columns[1]);
                    let salesRep = result.getText(columns[2]);
                    let email = result.getValue(columns[3]);
                    let dateCreated = result.getValue(columns[4]);

                    log.debug('Serach 1', 'customerName: ' + customerName + ', subsidiary: ' + subsidiary +
                        ', salesRep: ' + salesRep + ', Email: ' + email +
                        ', dateCreated: ' + dateCreated);

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
