/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record', 'N/runtime', 'N/search'],
    /**
     * @param{currentRecord} currentRecord
     * @param{record} record
     * @param{runtime} runtime
     * @param{search} search
     */
    function (currentRecord, record, runtime, search) {

        // /**
        //  * Function to be executed after page is initialized.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
        //  *
        //  * @since 2015.2
        //  */
        // function pageInit(scriptContext) {

        // }

        /**
         * Function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @since 2015.2
         */
        function fieldChanged(scriptContext) {

            let currentRecordObj = scriptContext.currentRecord;
            let fieldName = scriptContext.fieldId;

            if (fieldName === 'custrecord_jj_email_') {
                let emailID = currentRecordObj.getValue({ fieldId: 'custrecord_jj_email_' });
                console.log("Email: "+ emailID);

                let searchEmail = search.create({
                    type: search.Type.CUSTOMER,
                        filters: [
                            ["email","is", emailID]
                        ],
                        columns: [
                            'salesrep'
                        ]
                });

                let searchResults = searchEmail.run().getRange({ start: 0, end: 1 });
                searchResults.forEach(function (result) {
                    let salesRep = result.getValue({ name: 'salesrep' });
                    currentRecordObj.setValue({
                                fieldId: 'custrecord_jj_account_manager',
                                value: salesRep
                            });

                    log.debug("salesRep: "+ salesRep);
                });

                
            }


                // if (applyCouponField == true) {
                //     couponCodeField.isDisabled = false;
                // }
                // else {
                //     couponCodeField.isDisabled = true;
                //     currentRecordObj.setValue({
                //         fieldId: 'custentity_jj_coupon_code_textbox',
                //         value: ''
                //     });
                // }

            
        }

            // /**
            //  * Function to be executed when field is slaved.
            //  *
            //  * @param {Object} scriptContext
            //  * @param {Record} scriptContext.currentRecord - Current form record
            //  * @param {string} scriptContext.sublistId - Sublist name
            //  * @param {string} scriptContext.fieldId - Field name
            //  *
            //  * @since 2015.2
            //  */
            // function postSourcing(scriptContext) {

            // }

            // /**
            //  * Function to be executed after sublist is inserted, removed, or edited.
            //  *
            //  * @param {Object} scriptContext
            //  * @param {Record} scriptContext.currentRecord - Current form record
            //  * @param {string} scriptContext.sublistId - Sublist name
            //  *
            //  * @since 2015.2
            //  */
            // function sublistChanged(scriptContext) {

            // }

            // /**
            //  * Function to be executed after line is selected.
            //  *
            //  * @param {Object} scriptContext
            //  * @param {Record} scriptContext.currentRecord - Current form record
            //  * @param {string} scriptContext.sublistId - Sublist name
            //  *
            //  * @since 2015.2
            //  */
            // function lineInit(scriptContext) {

            // }

            // /**
            //  * Validation function to be executed when field is changed.
            //  *
            //  * @param {Object} scriptContext
            //  * @param {Record} scriptContext.currentRecord - Current form record
            //  * @param {string} scriptContext.sublistId - Sublist name
            //  * @param {string} scriptContext.fieldId - Field name
            //  * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
            //  * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
            //  *
            //  * @returns {boolean} Return true if field is valid
            //  *
            //  * @since 2015.2
            //  */
            // function validateField(scriptContext) {

            // }

            // /**
            //  * Validation function to be executed when sublist line is committed.
            //  *
            //  * @param {Object} scriptContext
            //  * @param {Record} scriptContext.currentRecord - Current form record
            //  * @param {string} scriptContext.sublistId - Sublist name
            //  *
            //  * @returns {boolean} Return true if sublist line is valid
            //  *
            //  * @since 2015.2
            //  */
            // function validateLine(scriptContext) {

            // }

            // /**
            //  * Validation function to be executed when sublist line is inserted.
            //  *
            //  * @param {Object} scriptContext
            //  * @param {Record} scriptContext.currentRecord - Current form record
            //  * @param {string} scriptContext.sublistId - Sublist name
            //  *
            //  * @returns {boolean} Return true if sublist line is valid
            //  *
            //  * @since 2015.2
            //  */
            // function validateInsert(scriptContext) {

            // }

            // /**
            //  * Validation function to be executed when record is deleted.
            //  *
            //  * @param {Object} scriptContext
            //  * @param {Record} scriptContext.currentRecord - Current form record
            //  * @param {string} scriptContext.sublistId - Sublist name
            //  *
            //  * @returns {boolean} Return true if sublist line is valid
            //  *
            //  * @since 2015.2
            //  */
            // function validateDelete(scriptContext) {

            // }

            // /**
            //  * Validation function to be executed when record is saved.
            //  *
            //  * @param {Object} scriptContext
            //  * @param {Record} scriptContext.currentRecord - Current form record
            //  * @returns {boolean} Return true if record is valid
            //  *
            //  * @since 2015.2
            //  */
            // function saveRecord(scriptContext) {

            // }

            return {
                // pageInit: pageInit,
                fieldChanged: fieldChanged
                // postSourcing: postSourcing,
                // sublistChanged: sublistChanged,
                // lineInit: lineInit,
                // validateField: validateField,
                // validateLine: validateLine,
                // validateInsert: validateInsert,
                // validateDelete: validateDelete,
                // saveRecord: saveRecord
            };

        });
