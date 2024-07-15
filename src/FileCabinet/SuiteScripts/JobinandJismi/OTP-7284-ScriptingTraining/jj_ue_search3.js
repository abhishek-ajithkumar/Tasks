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

            //3. When you create a vendor record, display the Name and Subsidiary of all the vendors available in your NetSuite account. 

            try {
                
                let columns = [
                    search.createColumn({ name: 'entityid', label: 'Vendor Name' }),
                    search.createColumn({ name: 'subsidiary', label: 'Subsidiary' })                    
                ];

                let vendorSearch = search.create({
                    title: 'List Vendors JJ',
                    id: 'customsearch_jj_list_vendors',
                    type: search.Type.VENDOR,
                    columns: columns
                });

                let searchResults = vendorSearch.run().getRange({ start: 0, end: 20 });
                vendorSearch.save();

                searchResults.forEach(function (result) {
                    let Vendor = result.getValue({ name: 'entityid' });
                    let Subsidiary = result.getText({ name: 'subsidiary' });
                    
                    log.debug('Serach 3', 'Vendor Name: ' + Vendor + ', Subsidiary: ' + Subsidiary);

                    return true;

                });


            } catch (e) {
                log.error('Error while creating the Search', e.toString());
            }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
