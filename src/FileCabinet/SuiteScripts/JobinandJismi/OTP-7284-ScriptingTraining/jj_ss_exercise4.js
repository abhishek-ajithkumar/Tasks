/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/file', 'N/record', 'N/render', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{file} file
 * @param{record} record
 * @param{render} render
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, file, record, render, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            let salesOrderSearch = search.create({
                type: search.Type.SALES_ORDER,
                filters: [
                    ["datecreated", "within", "today"],
                    'AND',
                    ['mainline', 'is', 'T']
                ],
                columns: [
                    search.createColumn({ name: 'entity', label: 'Customer Name' }),
                    search.createColumn({ name: 'internalid', label: 'internalid' })
                ]
            });

            var salesOrderSearchResult = salesOrderSearch.run().getRange({
                start: 0,
                end: 100
            });

            if (salesOrderSearchResult.length > 0) {
                for (var i = 0; i < salesOrderSearchResult.length; i++) {
                    var salesOrderId = salesOrderSearchResult[i];

                    let OrderId = parseInt(salesOrderId.getValue('internalid'))
                    var customerId = salesOrderId.getValue('entity'); 

                    let customerRecord = record.load({
                        type: record.Type.CUSTOMER,
                        id: customerId,
                        isDynamic: true
                    })
                    let customerEmail = customerRecord.getValue({
                        fieldId: 'email'
                    })
                    

                    var salesOrderData = record.load({
                        type: record.Type.SALES_ORDER,
                        id: OrderId,
                        isDynamic: true
                    });
        
                    var pdfFile = render.transaction({
                        entityId: OrderId,
                        printMode: render.PrintMode.PDF
                    });

                    log.debug("One done: ")


                    email.send({
                        author: -5,
                        recipients: customerEmail,
                        subject: 'Sales Order PDF from NetSuite',
                        body: 'Please find the attachement of your sales order PDF.',
                        attachments: [pdfFile],
                    });
        
                    // log.debug("One done: "+abc)

                }
            }

            // salesOrderSearchResult.forEach(function(result) {
            //     var customerId = result.getValue('entity'); // Customer ID
            //     var customerEmail = result.getValue('entity.email'); // Customer email
            //     var salesOrderId = result.getValue('internalid'); // Sales order ID
            //     // var pdfFile = generateSalesOrderPDF(salesOrderId); // Generate PDF
    
            //     // if (pdfFile && customerEmail) {
            //     //     // sendEmailWithAttachment(customerEmail, pdfFile, salesOrderId); // Send email with PDF attachment
                    
            //     // }
            // });

        }

        return {execute}

    });
