/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([],

    () => {
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
                var newCustomer = record.create({
                    type: record.Type.CUSTOMER,
                    isDynamic: true
                });

                newCustomer.setValue({
                    fieldId: 'firstname',
                    value: "Arjun"
                });

                newCustomer.setValue({
                    fieldId: 'subsidiary',
                    value: 25
                });

                let CustomerId = newCustomer.save({
                    ignoreMandatoryFields: true
                });

                log.debug('Customer Created', 'Customer ID: ' + CustomerId);


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

            log.debug("Before Submit ..!!");

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

            require(['N/record', 'N/search'],
                function (record, search) {
                    try {
                    
                        var filter = [
                            ['status', 'is', 'VendBill:A'],
                            'AND',
                            ['datecreated', 'within', 'lastMonth'],
                            'AND',
                            ['mainline', 'is', 'T']
                        ];
                        var columns = [
                            search.createColumn({ name: 'transactionnumber', label: 'Transaction Number' }),
                            search.createColumn({ name: 'entity', label: 'Vendor' }),
                            search.createColumn({ name: 'amount', label: 'Amount' }),
                            search.createColumn({ name: 'status', label: 'Status' })

                        ];
                        var customerSearch = search.create({
                            type: search.Type.TRANSACTION,
                            filters: filter,
                            columns: columns
                        });
                        var searchResults = customerSearch.run().getRange({ start: 0, end: 30 });
                        searchResults.forEach(function (result) {
                            var Transaction = result.getValue({ name: 'transactionnumber' });
                            var Vendor = result.getText({ name: 'entity' });
                            var Amount = result.getValue({ name: 'amount' });
                            var Status = result.getValue({ name: 'status' });
                            log.debug('Transaction Number :' + Transaction, 'Vendor: ' + Vendor + ', Amount: ' + Amount +
                                ', Status: ' + Status);
                            return true;
                        });
                    } catch (e) {
                        log.error('Error searching open bills', e.toString());
                    }
                }
            );







        }

        return { beforeLoad, beforeSubmit, afterSubmit }

    });
