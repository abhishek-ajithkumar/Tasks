/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, record, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            let invoiceSearch = search.create({
                type: search.Type.INVOICE,
                filters: [
                    ['status', 'is', 'CustInvc:A'],
                    'AND',
                    ['mainline', 'is', 'T']
                ],
                columns: [
                    search.createColumn({ name: 'entity', label: 'Customer Name' }),
                    search.createColumn({ name: 'tranid', label: 'Invoice Document Number' })
                ]
            });

            var invoiceSearchResult = invoiceSearch.run().getRange({
                start: 0,
                end: 50
            });

            

            var emailBody = '<html><body>';
            emailBody += '<p>Dear Administrator,</p>';
            emailBody += '<p>Please find below the Open Invoice details:</p>';
            emailBody += '<table border="1" style="border-collapse: collapse;">';
            emailBody += '<tr><th><b>Customer Name</b></th><th><b>Document Number</b></th></tr>';


            for (var i = 0; i < invoiceSearchResult.length; i++) {
                var result = invoiceSearchResult[i];
                emailBody += '<tr>';
                emailBody += '<td>' + result.getText('entity') + '</td>';
                emailBody += '<td>' + result.getValue('tranid') + '</td>';
                emailBody += '</tr>';
            }

            emailBody += '</table>';
            emailBody += '<p>If you have any questions or need further details, please let me know.</p>';
            emailBody += '<p>Best regards,<br>Abhishek</p>';
            emailBody += '</body></html>';

            email.send({
                author: -5,
                recipients: -5,
                subject: 'Open Invoices',
                body: emailBody
            });

        }

        return {execute}

    });