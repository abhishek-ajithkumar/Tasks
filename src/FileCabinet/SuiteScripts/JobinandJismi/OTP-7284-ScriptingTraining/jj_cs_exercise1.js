/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/ui/dialog', 'N/ui/message'],
    /**
     * @param{currentRecord} currentRecord
     * @param{dialog} dialog
     * @param{message} message
     * @param{record} record
    4
     */
    function (currentRecord, dialog, message, record) {

        /**
         * Function to be executed after page is initialized.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
         *
         * @since 2015.2
         */
        function pageInit(scriptContext) {

            let currentRecordObj = scriptContext.currentRecord;

            let applyCouponField = currentRecordObj.getValue({ fieldId: 'custentity_jj_apply_coupon_checkbox' });
            let couponCodeField = currentRecordObj.getField({ fieldId: 'custentity_jj_coupon_code_textbox' });

            if (applyCouponField == false) {
                couponCodeField.isDisabled = true;
            }


        }

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

            if (fieldName === 'custentity_jj_apply_coupon_checkbox') {
                let applyCouponField = currentRecordObj.getValue({ fieldId: 'custentity_jj_apply_coupon_checkbox' });
                let couponCodeField = currentRecordObj.getField({ fieldId: 'custentity_jj_coupon_code_textbox' });

                if (applyCouponField == true) {
                    couponCodeField.isDisabled = false;
                }
                else {
                    couponCodeField.isDisabled = true;
                    currentRecordObj.setValue({ 
                        fieldId: 'custentity_jj_coupon_code_textbox', 
                        value: '' 
                    });
                }
            }

        }

        /**
         * Function to be executed when field is slaved.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         *
         * @since 2015.2
         */
        // function postSourcing(scriptContext) {

        // }

        /**
         * Function to be executed after sublist is inserted, removed, or edited.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        // function sublistChanged(scriptContext) {

        // }

        /**
         * Function to be executed after line is selected.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @since 2015.2
         */
        // function lineInit(scriptContext) {

        // }

        /**
         * Validation function to be executed when field is changed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         * @param {string} scriptContext.fieldId - Field name
         * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
         * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
         *
         * @returns {boolean} Return true if field is valid
         *
         * @since 2015.2
         */
        // function validateField(scriptContext) {

        // }

        /**
         * Validation function to be executed when sublist line is committed.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.currentRecord - Current form record
         * @param {string} scriptContext.sublistId - Sublist name
         *
         * @returns {boolean} Return true if sublist line is valid
         *
         * @since 2015.2
         */
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
        function saveRecord(scriptContext) {

            let currentRecordObj = scriptContext.currentRecord;
            let applyCouponField = currentRecordObj.getValue({ fieldId: 'custentity_jj_apply_coupon_checkbox' });
            let couponCode = currentRecordObj.getValue({ fieldId: 'custentity_jj_coupon_code_textbox' });

            if (applyCouponField == true && couponCode.length !== 5) {
                dialog.alert({
                    title: 'Coupon Code Length Restriction',
                    message: 'Coupon Code must be exactly 5 characters long.'
                });

                return false;
            }

            return true;
        }

        return {
            pageInit: pageInit,
            fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            saveRecord: saveRecord
        };

    });
