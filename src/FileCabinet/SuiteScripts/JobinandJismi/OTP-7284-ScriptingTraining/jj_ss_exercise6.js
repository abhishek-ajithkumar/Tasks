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
            try {

                let customerSearch = search.create({
                    type: search.Type.CUSTOMER,
                    filters: [
                        ["datecreated", "within", "thismonth"]
                    ],
                    columns: [
                        search.createColumn({ name: 'entityid', label: 'Customer Name' }),
                        search.createColumn({ name: 'datecreated', label: 'Date Created' }),
                        search.createColumn({ name: 'salesrep', label: 'Sales Rep' }),
                        search.createColumn({ name: 'terms', label: 'Terms' })
                    ]
                });

                let csvContent = 'Name,Date Created,Sales Rep,Terms\n';

                customerSearch.run().each(function (result) {
                    let customerName = result.getValue('entityid');
                    let dateCreated = result.getValue('datecreated');
                    let salesRep = result.getText('salesrep');
                    let terms = result.getText('terms');

                    csvContent += customerName + ',' + dateCreated + ',' + (salesRep || '') + ',' + (terms || '') + '\n';
                    return true; 
                });

                let csvFile = file.create({
                    name: 'NewlyCreatedCustomerReport.csv',
                    fileType: file.Type.CSV,
                    contents: csvContent,
                    folder: -15
                });

                let fileId = csvFile.save();

                email.send({
                    author: -5, 
                    recipients: -5,
                    subject: 'Newly Created Customer Report',
                    body: 'Dear Admin,\n\nPlease find attached the newly created customer report for the current month.\n\nBest regards,\nABC',
                    attachments: [file.load({ id: fileId })]
                });

            } catch (e) {
                log.error('Error in scheduled script', e.toString());
            }

        }

        return { execute }

    });
