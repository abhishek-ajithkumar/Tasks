/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record', 'N/ui/dialog', 'N/ui/message'],
    /**
     * @param{currentRecord} currentRecord
     * @param{dialog} dialog
     * @param{message} message
     * @param{record} record
     */
    function (currentRecord, record, dialog, message) {

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

        //     console.log("HELLO")

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

            let fieldId = scriptContext.fieldId;
            var sublistId = scriptContext.sublistId;
            var line = scriptContext.line;

            if (fieldId === 'item') {
                var itemId = scriptContext.currentRecord.getCurrentSublistValue({
                    sublistId: sublistId,
                    fieldId: fieldId,
                    line: line
                });

                var itemRecord = null;
                try {
                    itemRecord = record.load({
                        type: record.Type.ASSEMBLY_ITEM,
                        id: itemId,
                        isDynamic: false
                    });

                    let length = itemRecord.getValue({
                        fieldId: 'custitem_jj_length'
                    });
                    let breadth = itemRecord.getValue({
                        fieldId: 'custitem_jj_breadth'
                    });
                    let height = itemRecord.getValue({
                        fieldId: 'custitem_jj_height'
                    });

                    let rate = scriptContext.currentRecord.getCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'rate',
                        line: line
                    });

                    let containerBox = length * breadth * height;
                    let amount = rate * containerBox;

                    // console.log("containerBox" + containerBox, "amount" + amount)



                    scriptContext.currentRecord.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'custcol_jj_container_box',
                        value: containerBox,
                        line: line
                    });

                    scriptContext.currentRecord.setCurrentSublistValue({
                        sublistId: sublistId,
                        fieldId: 'amount',
                        value: amount,
                        line: line
                    });




                } catch (e) {
                    log.error({
                        title: 'Error Loading Item Record',
                        details: e.message
                    });
                }
            }

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

            let currentRecordObj = scriptContext.currentRecord;

            let itemId = currentRecordObj.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item'
            });
            let rate = currentRecordObj.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'rate'
            });
            let itemRecord =record.load({
                type: record.Type.ASSEMBLY_ITEM ,
                id: itemId,
                isDynamic: false
            });

            let length = itemRecord.getValue({
                fieldId: 'custitem_jj_length'
            });
            let breadth = itemRecord.getValue({
                fieldId: 'custitem_jj_breadth'
            });
            let height = itemRecord.getValue({
                fieldId: 'custitem_jj_height'
            });
            let containerBox = length * breadth * height;
            let amount = rate * containerBox;
            
            let exactAmount = currentRecordObj.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'amount'
            });


            if (amount == exactAmount) {
                // Continue adding the line
                return true;
            } else {
                // Do not add the line
                alert('The amount does not match the expected value.');
                return false;
            }

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
            postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            validateLine: validateLine
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            // saveRecord: saveRecord
        };

    });
