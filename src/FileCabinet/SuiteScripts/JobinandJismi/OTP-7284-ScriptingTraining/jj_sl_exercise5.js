/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/search', 'N/ui/dialog', 'N/ui/serverWidget'],
    /**
 * @param{search} search
 * @param{dialog} dialog
 * @param{serverWidget} serverWidget
 */
    (search, dialog, serverWidget) => {
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
                    title: 'Sales Orders - Fulfilled/Billed'
                });
    
                var subsidiaryField = form.addField({
                    id: 'subsidiary_filter',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Subsidiary',
                    source: 'subsidiary'
                });
    
                var customerField = form.addField({
                    id: 'customer_filter',
                    type: serverWidget.FieldType.SELECT,
                    label: 'Customer',
                    source: 'customer'
                });
    
                var sublist = form.addSublist({
                    id: 'salesorders_sublist',
                    type: serverWidget.SublistType.LIST,
                    label: 'Sales Orders List'
                });
    
                sublist.addField({
                    id: 'internalid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Internal ID'
                });
                sublist.addField({
                    id: 'tranid',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Document Name'
                });
                sublist.addField({
                    id: 'trandate',
                    type: serverWidget.FieldType.DATE,
                    label: 'Date'
                });
                sublist.addField({
                    id: 'status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Status'
                });
                sublist.addField({
                    id: 'entity',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer Name'
                });
                sublist.addField({
                    id: 'subsidiary',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Subsidiary'
                });
                sublist.addField({
                    id: 'department',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Department'
                });
                sublist.addField({
                    id: 'class',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Class'
                });
                sublist.addField({
                    id: 'line',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Line Number'
                });
                sublist.addField({
                    id: 'subtotal',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Subtotal'
                });
                sublist.addField({
                    id: 'taxtotal',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Tax'
                });
                sublist.addField({
                    id: 'total',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Total'
                });
    
                subsidiaryField.defaultValue = scriptContext.request.parameters.subsidiary_filter || '';
                customerField.defaultValue = scriptContext.request.parameters.customer_filter || '';
    
                form.clientScriptModulePath = './jj_sl_cs_exercise5.js';
    
                scriptContext.response.writePage(form);
            }

        }

        return {onRequest}

    });
