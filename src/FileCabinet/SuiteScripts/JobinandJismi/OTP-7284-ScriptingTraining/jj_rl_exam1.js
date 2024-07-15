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

                let salesOrderId = requestParams.id;
                let salesOrder = record.load({
                    type: record.Type.SALES_ORDER,
                    id: salesOrderId
                })
                let salesOrderline = salesOrder.getLineCount({
                    sublistId: "item"
                });
                
                let result = ""

                for (let i = 0; i < salesOrderline; i++){
                    let itemName = salesOrder.getSublistText({
                        sublistId: "item",
                        fieldId: "item",
                        line:i
                    })

                    let quantity = salesOrder.getSublistValue({
                        sublistId: "item",
                        fieldId: "quantity",
                        line:i
                    })

                    let rate = salesOrder.getSublistValue({
                        sublistId: "item",
                        fieldId: "rate",
                        line:i
                    })

                    let amount = salesOrder.getSublistValue({
                        sublistId: "item",
                        fieldId: "amount",
                        line:i
                    })

                    result = result + "Item Name: "+ itemName + " \t Quantity: "+ quantity  + " \t Rate: "+ rate + " \t Amount: "+ amount + "\n"

                    // log.debug("\n Item Name: "+ itemName + " \t Quantity: "+ quantity  + " \t Rate: "+ rate + " \t Amount: "+ amount)                    
                }

                if(salesOrderline>2){
                    return result + "\n Sales Order contains more than 2 items."
                }
                return result

            }
            catch (e) {
                log.error({
                    title: 'Error retrieving sales order',
                    details: e
                });
                return "Error found.. ";


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
