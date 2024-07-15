/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record', 'N/runtime', 'N/search', 'N/ui/dialog', 'N/ui/message'],
    /**
     * @param{currentRecord} currentRecord
     * @param{record} record
     * @param{runtime} runtime
     * @param{search} search
     * @param{dialog} dialog
     * @param{message} message
     */
    function (currentRecord, record, runtime, search, dialog, message) {

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

        //     console.log("ABC")

        // }

        // /**
        //  * Function to be executed when field is changed.
        //  *
        //  * @param {Object} scriptContext
        //  * @param {Record} scriptContext.currentRecord - Current form record
        //  * @param {string} scriptContext.sublistId - Sublist name
        //  * @param {string} scriptContext.fieldId - Field name
        //  * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
        //  * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
        //  *
        //  * @since 2015.2
        //  */
        // function fieldChanged(scriptContext) {

        // }

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
        function validateLine(scriptContext) {

            let currentRecord = scriptContext.currentRecord;
            let sublistName = scriptContext.sublistId;
            let itemAmount = currentRecord.getCurrentSublistValue({
                sublistId: "item",
                fieldId: "amount",
            })
            // console.log("sublistName: "+sublistName)
            // console.log("fieldAmount: "+fieldAmount)
            if (itemAmount <= 200) {

                dialog.alert({
                    title: 'Error',
                    message: 'Item amount must be greater than 200.'
                });

                return false;
            }
            return true;
        }

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
            // fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            validateLine: validateLine
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };

    });
