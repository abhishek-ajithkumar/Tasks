/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/email', 'N/file', 'N/log', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{file} file
 * @param{log} log
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, file, log, record, runtime, search) => {
        /**
         * Defines the function that is executed at the beginning of the map/reduce process and generates the input data.
         * @param {Object} inputContext
         * @param {boolean} inputContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Object} inputContext.ObjectRef - Object that references the input data
         * @typedef {Object} ObjectRef
         * @property {string|number} ObjectRef.id - Internal ID of the record instance that contains the input data
         * @property {string} ObjectRef.type - Type of the record instance that contains the input data
         * @returns {Array|Object|Search|ObjectRef|File|Query} The input data to use in the map/reduce process
         * @since 2015.2
         */

        const getInputData = (inputContext) => {

            return search.create({
                type: search.Type.SALES_ORDER,
                filters: [
                    ["datecreated", "within", "lastmonth"],
                    "AND",
                    ["mainline", "is", "T"]
                ],
                columns: [
                    'entity', // Customer
                    'email', // Customer Email
                    'tranid', // Sales Order Document Number
                    'total', // Sales Amount
                    'salesrep' // Sales Representative
                ]
            });

        }

        /**
         * Defines the function that is executed when the map entry point is triggered. This entry point is triggered automatically
         * when the associated getInputData stage is complete. This function is applied to each key-value pair in the provided
         * context.
         * @param {Object} mapContext - Data collection containing the key-value pairs to process in the map stage. This parameter
         *     is provided automatically based on the results of the getInputData stage.
         * @param {Iterator} mapContext.errors - Serialized errors that were thrown during previous attempts to execute the map
         *     function on the current key-value pair
         * @param {number} mapContext.executionNo - Number of times the map function has been executed on the current key-value
         *     pair
         * @param {boolean} mapContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} mapContext.key - Key to be processed during the map stage
         * @param {string} mapContext.value - Value to be processed during the map stage
         * @since 2015.2
         */

        const map = (mapContext) => {

            let result = JSON.parse(mapContext.value);
            let salesRep = result.values.salesrep.value || 'no_salesrep';

            mapContext.write({
                key: salesRep,
                value: {
                    customer: result.values.entity.text,
                    email: result.values.email,
                    salesOrder: result.values.tranid,
                    amount: result.values.total
                }
            });

        }

        /**
         * Defines the function that is executed when the reduce entry point is triggered. This entry point is triggered
         * automatically when the associated map stage is complete. This function is applied to each group in the provided context.
         * @param {Object} reduceContext - Data collection containing the groups to process in the reduce stage. This parameter is
         *     provided automatically based on the results of the map stage.
         * @param {Iterator} reduceContext.errors - Serialized errors that were thrown during previous attempts to execute the
         *     reduce function on the current group
         * @param {number} reduceContext.executionNo - Number of times the reduce function has been executed on the current group
         * @param {boolean} reduceContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} reduceContext.key - Key to be processed during the reduce stage
         * @param {List<String>} reduceContext.values - All values associated with a unique key that was passed to the reduce stage
         *     for processing
         * @since 2015.2
         */
        const reduce = (reduceContext) => {

            let csvContent = 'Customer Name,Email,Sales Order Document Number,Sales Amount\n';

            reduceContext.values.forEach(function (record) {
                let data = JSON.parse(record);
                csvContent += `${data.customer},${data.email},${data.salesOrder},${data.amount}\n`;
            });

            let csvFile = file.create({
                name: reduceContext.key + '_sales_data.csv',
                fileType: file.Type.CSV,
                contents: csvContent
            });

            csvFile.folder = -15; // Set to the appropriate folder ID
            let fileId = csvFile.save();

            reduceContext.write({
                key: reduceContext.key,
                value: fileId
            });

        }


        /**
         * Defines the function that is executed when the summarize entry point is triggered. This entry point is triggered
         * automatically when the associated reduce stage is complete. This function is applied to the entire result set.
         * @param {Object} summaryContext - Statistics about the execution of a map/reduce script
         * @param {number} summaryContext.concurrency - Maximum concurrency number when executing parallel tasks for the map/reduce
         *     script
         * @param {Date} summaryContext.dateCreated - The date and time when the map/reduce script began running
         * @param {boolean} summaryContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Iterator} summaryContext.output - Serialized keys and values that were saved as output during the reduce stage
         * @param {number} summaryContext.seconds - Total seconds elapsed when running the map/reduce script
         * @param {number} summaryContext.usage - Total number of governance usage units consumed when running the map/reduce
         *     script
         * @param {number} summaryContext.yields - Total number of yields when running the map/reduce script
         * @param {Object} summaryContext.inputSummary - Statistics about the input stage
         * @param {Object} summaryContext.mapSummary - Statistics about the map stage
         * @param {Object} summaryContext.reduceSummary - Statistics about the reduce stage
         * @since 2015.2
         */
        const summarize = (summaryContext) => {

            summaryContext.output.iterator().each(function (salesRep, fileId) {
                let recipientEmail;
                let message;

                if (salesRep === 'no_salesrep') {
                    recipientEmail = 'adminfun043024LP@netsuite.com';
                    message = 'Please assign a sales representative to the customers listed in the attached CSV file.';
                } else {
                    recipientEmail = getSalesRepEmail(salesRep);
                    message = 'Please find attached the sales data for your customers from the previous month.';
                }

                email.send({
                    author: -5, //internal ID of the sender
                    recipients: recipientEmail,
                    subject: 'Monthly Sales Data',
                    body: message,
                    attachments: [file.load({ id: fileId })]
                });

                return true;
            });
        };

        const getSalesRepEmail = (salesRep) => {
            let repRecord = search.lookupFields({
                type: search.Type.EMPLOYEE,
                id: salesRep,
                columns: ['email']
            });
            return repRecord.email;
        };

        return { getInputData, map, reduce, summarize }

    });
