/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/email', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{runtime} runtime
 * @param{search} search
 * @param{record} record
 */
    (record, email, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {


            let salesSearch = search.create({
                type: search.Type.SALES_ORDER,
                filters: [
                    ['datecreated', 'is', 'lastMonth'],
                    'AND',
                    ['mainline', 'is', 'T']
                ],
                columns: [
                    search.createColumn({ name: 'datecreated', label: 'Date' }),
                    search.createColumn({ name: 'entity', label: 'Customer Name' }),
                    search.createColumn({ name: 'status', label: 'Status' }),
                    search.createColumn({ name: 'total', label: 'Total' })
                ]
            });

            var salesOrderSearchResults = salesSearch.run().getRange({
                start: 0,
                end: 1000
            });


            // let salesRep = record.load({
            //     type: record.Type.EMPLOYEE,
            //     id: -5
            // });
            // let supervisorId = salesRep.getValue({
            //     fieldId: 'supervisor'
            // });
            // console.log(salesRep + supervisorId)
            

            var emailBody = '<html><body>';
            emailBody += '<p>Dear [Sales Manager\'s Name],</p>';
            emailBody += '<p>Please find below the sales order details for the previous month:</p>';
            emailBody += '<table border="1" style="border-collapse: collapse;">';
            emailBody += '<tr><th>Customer</th><th>Order Date</th><th>Order Status</th><th>Total Amount</th></tr>';


            for (var i = 0; i < salesOrderSearchResults.length; i++) {
                var result = salesOrderSearchResults[i];
                emailBody += '<tr>';
                emailBody += '<td>' + result.getText('entity') + '</td>';
                emailBody += '<td>' + result.getValue('datecreated') + '</td>';
                emailBody += '<td>' + result.getText('status') + '</td>';
                emailBody += '<td>' + result.getValue('total') + '</td>';
                emailBody += '</tr>';
            }

            emailBody += '</table>';
            emailBody += '<p>If you have any questions or need further details, please let me know.</p>';
            emailBody += '<p>Best regards,<br>[Sales Rep\'s Name]</p>';
            emailBody += '</body></html>';

            email.send({
                author: -5,
                recipients: 25,
                subject: 'Previous Month Sales Order Details',
                body: emailBody
            });

        }

        return { execute }

    });
