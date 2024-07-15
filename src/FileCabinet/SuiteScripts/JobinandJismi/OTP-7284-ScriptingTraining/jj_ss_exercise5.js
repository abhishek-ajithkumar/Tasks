/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            try {
                var customerSearch = search.create({
                    type: search.Type.CUSTOMER,
                    filters: [
                        ['subsidiary', 'is', 1], 
                        'AND',
                        ['entityid', 'startswith', 'xyz']
                    ],
                    columns: ['internalid', 'email', 'entityid']
                });
   
                customerSearch.run().each(function(result) {
                    var customerId = result.getValue('internalid');
                    var customerEmail = result.getValue('email');
                    var customerName = result.getValue('entityid');

                    log.debug(customerName + customerId + customerEmail)
   
                    email.send({
                        author:-5,
                        recipients: customerEmail,
                        subject: 'Daily Email',
                        body: 'Dear ' + customerName + ',\n\nThis is a daily email.\n\nBest regards,\nXYZ..'
                    });
   
                    return true;
                });
   
            } catch (e) {
                log.error('Error in scheduled script', e.toString());
            }

        }

        return {execute}

    });
