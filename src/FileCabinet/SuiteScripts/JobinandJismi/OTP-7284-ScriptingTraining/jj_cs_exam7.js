/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record', 'N/search', 'N/ui/dialog'],
    /**
     * @param{currentRecord} currentRecord
     * @param{record} record
     * @param{search} search
     * @param{dialog} dialog
     */
    function (currentRecord, record, search, dialog) {

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

            var currentRecord = scriptContext.currentRecord;
            var sublistName = scriptContext.sublistId;
            var fieldName = scriptContext.fieldId;
            let line = scriptContext.line;

            let itemsCount = currentRecord.getLineCount({
                sublistId: "item"
            });
            // console.log("itemsCount"+ itemsCount)

            
            for( let i = 0; i<itemsCount; i++){

                let available = scriptContext.currentRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_jj_item_availability',
                    line: i
                });
                if( available == false){
                    currentRecord.setValue({
                        fieldId: 'custbody_jj_item_availability_status',
                        value: "Backordered"
                    })
                }

            }



            let quantity = currentRecord.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity'
            });
            let availableQuantity = currentRecord.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantityavailable'
            });
            // console.log("availableQuantity: " + availableQuantity)
            // console.log("quantity: " + quantity)


            if (sublistName === 'item' && fieldName === 'item') {
                // var line = scriptContext.line;
                var itemId = currentRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'item'
                });
                // var available = currentRecord.getCurrentSublistValue({
                //     sublistId: 'item',
                //     fieldId: 'custcol_jj_item_availability'
                // });

                if (itemId) {
                    if (quantity <= availableQuantity) {
                        scriptContext.currentRecord.setCurrentSublistValue({
                            sublistId: sublistName,
                            fieldId: 'custcol_jj_item_availability',
                            value: true,
                            line: line
                        });
                    }
                    else if (quantity > availableQuantity) {
                        scriptContext.currentRecord.setCurrentSublistValue({
                            sublistId: sublistName,
                            fieldId: 'custcol_jj_item_availability',
                            value: false,
                            line: line
                        });
                    }

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
        function postSourcing(scriptContext) {
            let currentRecord = scriptContext.currentRecord;

            currentRecord.setValue({
                fieldId: 'custbody_jj_item_availability_status',
                value: "Available"
            })

        }

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
            fieldChanged: fieldChanged,
            postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };

    });
