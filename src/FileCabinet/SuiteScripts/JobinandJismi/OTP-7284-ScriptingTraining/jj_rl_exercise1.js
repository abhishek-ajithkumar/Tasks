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

            let salesOrderId = requestParams.id;

            try {

                let salesOrderSearch = search.create({
                    type: search.Type.SALES_ORDER,
                    filters: [['internalid', 'anyof', salesOrderId]],
                    columns: ['internalid', 'tranid', 'entity', 'total']
                });

                let searchResults = salesOrderSearch.run().getRange({ start: 0, end: 1 });

                if (searchResults.length > 0) {
                    let salesOrder = searchResults[0];
                    return {
                        salesOrder: {
                            id: salesOrder.getValue({ name: 'tranid' }),
                            customer: salesOrder.getText({ name: 'entity' }),
                            total: salesOrder.getValue({ name: 'total' })
                        }
                    };
                    
                } else {
                    return "Does not exist";
                }


                // let salesOrder = record.load({
                //     type: record.Type.SALES_ORDER,
                //     id: salesOrderId
                // });

                // if (salesOrder) {
                //     return {
                //         success: true,
                //         salesOrder: {
                //             id: salesOrder.id,
                //             number: salesOrder.getValue('tranid'),
                //             entity: salesOrder.getText('entity')
                //         }
                //     };
                // } else {
                //     return "ABC";
                //     // return {
                //     //     success: false,
                //     //     message: 'Does not exist'
                //     // };
                // }

            }
            catch (e) {
                log.error({
                    title: 'Error retrieving sales order',
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

