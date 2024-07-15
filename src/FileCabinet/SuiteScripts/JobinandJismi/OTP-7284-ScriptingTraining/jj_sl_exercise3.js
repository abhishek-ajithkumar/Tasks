/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/search', 'N/ui/serverWidget'],
    /**
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {

            if (scriptContext.request.method === 'GET') {
                var form = serverWidget.createForm({
                    title: 'Sales Order Search'
                });
    
                var name = form.addField({
                    id: 'name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Name'
                });
    
                var sublist = form.addSublist({
                    id: 'custpage_salesorder_sublist',
                    type: serverWidget.SublistType.LIST,
                    label: 'Sales Orders'
                });
    
                sublist.addField({
                    id: 'custpage_doc_number',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Document Number'
                });
                sublist.addField({
                    id: 'custpage_customer_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer Name'
                });
                sublist.addField({
                    id: 'custpage_subsidiary',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Subsidiary'
                });
                sublist.addField({
                    id: 'custpage_order_date',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Order Date'
                });
    
                var salesOrderSearch = search.create({
                    type: search.Type.SALES_ORDER,
                    filters: [
                        ['mainline', 'is', 'T'],
                        'and',
                        ['status', 'anyof', 'SalesOrd:A'] 
                    ],
                    columns: [
                        'tranid',
                        'entity', 
                        'subsidiary', 
                        'trandate'
                    ]
                });
    
                var resultSet = salesOrderSearch.run();
                var i = 0;
                resultSet.each(function(result) {
                    sublist.setSublistValue({
                        id: 'custpage_doc_number',
                        line: i,
                        value: result.getValue({ name: 'tranid' })
                    });
                    sublist.setSublistValue({
                        id: 'custpage_customer_name',
                        line: i,
                        value: result.getText({ name: 'entity' })
                    });
                    sublist.setSublistValue({
                        id: 'custpage_subsidiary',
                        line: i,
                        value: result.getText({ name: 'subsidiary' })
                    });
                    sublist.setSublistValue({
                        id: 'custpage_order_date',
                        line: i,
                        value: result.getValue({ name: 'trandate' })
                    });
                    i++;
                    return true; 
                });
    
                form.addSubmitButton({
                    label: 'Search'
                });
    
                scriptContext.response.writePage(form);
            }

        }

        return {onRequest}

    });
