/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {

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
            try {

                CustId = requestBody.id
                loc = requestBody.location
                itemValue = requestBody.item
                quantityValue = requestBody.quantity

                let cashSale = record.create({
                    type: record.Type.CASH_SALE,
                    isDynamic: true
                })

                cashSale.setValue({
                    fieldId: 'entity',
                    value: CustId
                });

                cashSale.setValue({
                    fieldId: 'location',
                    value: loc
                });


                cashSale.selectNewLine({
                    sublistId: 'item'
                });
                cashSale.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item',
                    value: itemValue
                });
                cashSale.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    value: quantityValue
                });
                
                cashSale.commitLine({
                    sublistId: 'item'
                });

                cashSale.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });

                return ("Cash Sale Created");

            } catch (e) {
                return ('Error while creating Cash Sale', e.toString());

            }



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

