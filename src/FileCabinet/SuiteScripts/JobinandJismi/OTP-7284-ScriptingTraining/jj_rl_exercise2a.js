/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {

            try {

                let customerId = requestParams.id;

                let filters = [
                    ['daysoverdue', 'greaterthan', '0'],
                    'AND',
                    ['mainline', 'is', 'T'],
                    'AND',
                    ['entity', 'is', customerId]
                ];

                let columns = [
                    search.createColumn({ name: 'trandate', label: 'Date' }),
                    search.createColumn({ name: 'entity', label: 'Customer Name' }),
                    search.createColumn({ name: 'amountremaining', label: 'Amount' }),
                    search.createColumn({ name: 'duedate', label: 'Due Date' })
                ];

                let overdueSearch = search.create({
                    type: search.Type.INVOICE,
                    filters: filters,
                    columns: columns
                });

                let searchResult = overdueSearch.run().getRange(0, 100);
                let overdueDetails = [];

                if (searchResult.length > 0) {
                    searchResult.forEach(function (result) {
                        let dueDate = result.getValue('duedate');
                        let amountRemaining = result.getValue('amountremaining');
                        log.debug("DATE" + dueDate + amountRemaining)

                        if (amountRemaining > 0) {
                            let customerName = result.getText('entity');
                            let transactionDate = result.getValue('trandate');

                            log.debug("ABC:" + customerName + transactionDate + amountRemaining)

                            overdueDetails.push([
                                '\n Customer Name: ' + customerName,
                                '\t Date: ' + transactionDate,
                                '\t Overdue Balance: ' + amountRemaining
                            ]);
                        }

                        return true;
                    });


                    return "Overdue Details:" + overdueDetails;
                }
                else {
                    return "No overdue";
                }













            }
            catch (e) {
                log.error({
                    title: 'Error retrieving customer data..!',
                    details: e
                });
            }

        }

        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {

        }

        return { get, put, post, delete: doDelete }

    });
