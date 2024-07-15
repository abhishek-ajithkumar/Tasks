/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {

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
                    ["datecreated", "before", "fourdaysago"],
                    'AND',
                    ['mainline', 'is', 'T'],
                    "AND",
                    ["anylineitem", "is", "518"]
                ],
                columns: [
                    search.createColumn({ name: 'entity', label: 'Customer Name' }),
                    search.createColumn({ name: 'internalid', label: 'Internal ID' })
                ]
            });

            var salesOrderSearchResult = salesOrderSearch.run().getRange({
                start: 0,
                end: 100
            });


            if (salesOrderSearchResult.length > 0) {
                for (var i = 0; i < salesOrderSearchResult.length; i++) {
                    var salesOrderId = salesOrderSearchResult[i];

                    let abc = salesOrderId.getValue('internalid')
                    log.debug("\n" + abc)

                    try {
                        var salesOrder = record.load({
                            type: record.Type.SALES_ORDER,
                            id: salesOrderId,
                            isDynamic: true
                        });

                        salesOrder.setValue({
                            fieldId: 'orderstatus',
                            value: 'Closed'
                        });

                        salesOrder.save();

                        log.audit({
                            title: 'Sales Order Closed',
                            details: 'Closed Sales Order ID ' + salesOrderId
                        });

                    } catch (e) {
                        log.error({
                            title: 'Error Closing Sales Order',
                            details: 'Error occurred while closing Sales Order ID ' + salesOrderId + ': ' + e.message
                        });
                    }
                }
            } else {
                log.audit({
                    title: 'No Sales Orders to Close',
                    details: 'No open sales orders found that match the criteria.'
                });
            }

        }

        return { execute }

    });
