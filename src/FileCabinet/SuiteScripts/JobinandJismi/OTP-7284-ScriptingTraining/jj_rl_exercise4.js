/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record', 'N/runtime', 'N/search'],
    /**
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (record, runtime, search) => {
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

            if (typeof requestBody === 'string') {
                requestBody = JSON.parse(requestBody);
            }
 
            try {
                // let { id, memo, salesrep } = requestBody;
                let id = requestBody.id;
                let newmemo = requestBody.memo;
                let salesRep = requestBody.salesrep;
 
                if (!id || !newmemo || !salesRep) {
                    throw error.create({
                        name: 'MISSING_REQUIRED_FIELDS',
                        message: 'Missing required fields: id, memo, salesrep'
                    });
                }
 
                var saRecord = record.load({
                    type: record.Type.SALES_ORDER,
                    id: id
                });
 
                saRecord.setValue({
                    fieldId: 'memo',
                    value: newmemo
                });
                saRecord.setValue({
                    fieldId: 'salesrep',
                    value: salesRep
                });
 
                var recordId = saRecord.save();
 
                return {
                    success: true,
                    recordId: recordId
                };
            } catch (e) {
                log.error('Error updating sales order', e);
                return {
                    success: false,
                    message: 'Failed to update sales order: ' + e.message
                };
            }

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

        return {get, put, post, delete: doDelete}

    });
