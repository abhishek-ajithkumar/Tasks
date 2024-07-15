/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */

/**********************************************************************************
 * OTP-7411 : Custom page for display sales order based on the status
 *
 *
 * ********************************************************************************
 *
 * ********************
 * company name
 *
 * Author: Jobin and Jismi IT Services
 *
 *
 * Date Created: 02-July-2024
 *
 * Description: This script is for creating a custom form that will display sales orders which need to be fulfilled or billed with some filters.
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 02-July-2024: Created the initial build by JJ0347
 *
 *
 *
 **************/

define(['N/record', 'N/search', 'N/ui/serverWidget'],
    /**
     * @param {record} record
     * @param {search} search
     * @param {serverWidget} serverWidget
     */

    (record, search, serverWidget) => {

        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {

                //Creating a form
                var form = serverWidget.createForm({
                    title: 'Sales Orders to fulfilled or Billed'
                });

                //Defining fields for filtering
                var statusIdField = form.addField({
                    id: 'status_id',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customlist_jj_status',
                    label: 'Status'
                });
                var entityIdField = form.addField({
                    id: 'entity_id',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customer',
                    label: 'Customer'
                });
                var subsidiaryIdField = form.addField({
                    id: 'subsidiary_id',
                    type: serverWidget.FieldType.SELECT,
                    source: 'subsidiary',
                    label: 'Subsidiary'
                });
                var departmentIdField = form.addField({
                    id: 'department_id',
                    type: serverWidget.FieldType.SELECT,
                    source: 'department',
                    label: 'Department'
                });



                //Creating a Sublist
                var sublist = form.addSublist({
                    id: 'custpage_salesorder_sublist',
                    type: serverWidget.SublistType.LIST,
                    label: 'Sales Orders'
                });

                //Adding various fields in the sublist
                sublist.addField({
                    id: 'custpage_internal_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Internal Id'
                });
                sublist.addField({
                    id: 'custpage_doc_number',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Document Number'
                });
                sublist.addField({
                    id: 'custpage_order_date',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Date'
                });
                sublist.addField({
                    id: 'custpage_status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Status'
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
                    id: 'custpage_department',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Department'
                });
                sublist.addField({
                    id: 'custpage_class',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Class'
                });
                sublist.addField({
                    id: 'custpage_line',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Line Number'
                });
                sublist.addField({
                    id: 'custpage_subtotal',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Sub Total'
                });
                sublist.addField({
                    id: 'custpage_taxtotal',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Tax'
                });
                sublist.addField({
                    id: 'custpage_total',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Total'
                });

                //Adding submit button 
                form.addSubmitButton({
                    label: 'Search'
                });

                scriptContext.response.writePage(form);

            }
            else if (scriptContext.request.method === 'POST') {


                var statusId = scriptContext.request.parameters.status_id;
                var entityId = scriptContext.request.parameters.entity_id;
                var subsidiaryId = scriptContext.request.parameters.subsidiary_id;
                var departmentId = scriptContext.request.parameters.department_id;


                var form = serverWidget.createForm({
                    title: 'Sales Order Search Results'
                });

                // Set default values if fields are not selected
                var statusIdField = form.addField({
                    id: 'status_id',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customlist_jj_status',
                    label: 'Status'
                });
                statusIdField.defaultValue = statusId || '';

                var entityIdField = form.addField({
                    id: 'entity_id',
                    type: serverWidget.FieldType.SELECT,
                    source: 'customer',
                    label: 'Customer'
                });
                entityIdField.defaultValue = entityId || '';

                var subsidiaryIdField = form.addField({
                    id: 'subsidiary_id',
                    type: serverWidget.FieldType.SELECT,
                    source: 'subsidiary',
                    label: 'Subsidiary'
                });
                subsidiaryIdField.defaultValue = subsidiaryId || '';

                var departmentIdField = form.addField({
                    id: 'department_id',
                    type: serverWidget.FieldType.SELECT,
                    source: 'department',
                    label: 'Department'
                });
                departmentIdField.defaultValue = departmentId || '';


                var sublist = form.addSublist({
                    id: 'custpage_salesorder_sublist',
                    type: serverWidget.SublistType.LIST,
                    label: 'Sales Orders'
                });




                sublist.addField({
                    id: 'custpage_internal_id',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Internal Id'
                });

                sublist.addField({
                    id: 'custpage_doc_number',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Document Number'
                });

                sublist.addField({
                    id: 'custpage_order_date',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Date'
                });

                sublist.addField({
                    id: 'custpage_status',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Status'
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
                    id: 'custpage_department',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Department'
                });
                sublist.addField({
                    id: 'custpage_class',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Class'
                });
                sublist.addField({
                    id: 'custpage_line',
                    type: serverWidget.FieldType.INTEGER,
                    label: 'Line Number'
                });
                sublist.addField({
                    id: 'custpage_subtotal',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Sub Total'
                });

                sublist.addField({
                    id: 'custpage_taxtotal',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Tax'
                });
                sublist.addField({
                    id: 'custpage_total',
                    type: serverWidget.FieldType.CURRENCY,
                    label: 'Total'
                });



                // Build filters based on selected parameters
                var filters = [
                    ['status', 'anyof', ['SalesOrd:B', 'SalesOrd:D', 'SalesOrd:E', 'SalesOrd:F']],
                    'AND',
                    ['mainline', 'is', 'F'],
                    'AND',
                    ['taxline', 'is', 'F']
                ];

                if (statusId == 1) {
                    filters.push('AND', ['status', 'is', 'SalesOrd:B']);
                }
                else if (statusId == 2) {
                    filters.push('AND', ['status', 'is', 'SalesOrd:D']);
                }
                else if (statusId == 3) {
                    filters.push('AND', ['status', 'is', 'SalesOrd:E']);
                }
                else if (statusId == 4) {
                    filters.push('AND', ['status', 'is', 'SalesOrd:F']);
                }

                if (entityId) {
                    filters.push('AND', ['entity', 'is', entityId]);
                }

                if (subsidiaryId) {
                    filters.push('AND', ['subsidiary', 'is', subsidiaryId]);
                }

                if (departmentId) {
                    filters.push('AND', ['department', 'anyof', departmentId]);
                }

                var salesOrderSearch = search.create({
                    type: search.Type.SALES_ORDER,
                    filters: filters,
                    columns: [
                        'internalid',
                        search.createColumn({ name: "tranid", label: "Document Number" }),
                        search.createColumn({ name: "trandate", label: "Date" }),
                        search.createColumn({ name: "status", label: "Status" }),
                        search.createColumn({ name: "entity", label: "Customer Name" }),
                        search.createColumn({ name: "subsidiary", label: "Subsidiary" }),
                        search.createColumn({ name: "department", label: "Division" }),
                        search.createColumn({ name: "class", label: "Sales Channel" }),
                        search.createColumn({ name: "line", label: "Line ID" }),

                        search.createColumn({
                            name: "formulacurrency1",
                            formula: "{amount}",
                            label: "SubTotal"
                        }),
                        search.createColumn({
                            name: "formulacurrency2",
                            formula: "{total}-{amount}",
                            label: "Tax Total"
                        }),
                        // 'subtotal',
                        // 'taxtotal',
                        search.createColumn({
                            name: "formulacurrency3",
                            formula: "{total}",
                            label: "Total Amount"
                        })
                    ]
                });

                var resultSet = salesOrderSearch.run();
                var i = 0;

                resultSet.each(function (result) {

                    sublist.setSublistValue({
                        id: 'custpage_internal_id',
                        line: i,
                        value: result.getValue({ name: 'internalid' })
                    });

                    sublist.setSublistValue({
                        id: 'custpage_doc_number',
                        line: i,
                        value: result.getValue({ name: 'tranid' })
                    });

                    sublist.setSublistValue({
                        id: 'custpage_order_date',
                        line: i,
                        value: result.getValue({ name: 'trandate' })
                    });

                    sublist.setSublistValue({
                        id: 'custpage_status',
                        line: i,
                        value: result.getText({ name: 'status' })
                    });

                    let cName = result.getText({ name: 'entity' })
                    if (cName) {
                        sublist.setSublistValue({
                            id: 'custpage_customer_name',
                            line: i,
                            value: cName

                        });
                    } else {
                        sublist.setSublistValue({
                            id: 'custpage_customer_name',
                            line: i,
                            value: " "

                        });
                    }

                    sublist.setSublistValue({
                        id: 'custpage_subsidiary',
                        line: i,
                        value: result.getText({ name: 'subsidiary' })
                    });

                    if (result.getValue('department') == null || result.getValue('department') == '') {
                        sublist.setSublistValue({
                            id: 'custpage_department',
                            line: i,
                            value: '-'
                        });
                    }
                    else {
                        sublist.setSublistValue({
                            id: 'custpage_department',
                            line: i,
                            value: result.getText('department')
                        });
                    }

                    if (result.getValue('class') == null || result.getValue('class') == '') {
                        sublist.setSublistValue({
                            id: 'custpage_class',
                            line: i,
                            value: '-'
                        });
                    }
                    else {
                        sublist.setSublistValue({
                            id: 'custpage_class',
                            line: i,
                            value: result.getText('class')
                        });
                    }
                    sublist.setSublistValue({
                        id: 'custpage_line',
                        line: i,
                        value: result.getValue({ name: 'line' })
                    });


                    sublist.setSublistValue({
                        id: 'custpage_subtotal',
                        line: i,
                        value: result.getValue({ name: 'formulacurrency1' })
                    });
                    sublist.setSublistValue({
                        id: 'custpage_taxtotal',
                        line: i,
                        value: result.getValue({ name: 'formulacurrency2' })
                    });

                    // sublist.setSublistValue({
                    //     id: 'custpage_taxtotal',
                    //     line: i,
                    //     value: result.getValue({ name: 'taxtotal' })
                    // });
                    sublist.setSublistValue({
                        id: 'custpage_total',
                        line: i,
                        value: result.getValue({ name: 'formulacurrency3' })
                    });

                    i++;
                    return true; // Continue iteration
                });

                form.addSubmitButton({
                    label: 'Search'
                });

                scriptContext.response.writePage(form);
            }
        };

        return {
            onRequest
        };

    });
