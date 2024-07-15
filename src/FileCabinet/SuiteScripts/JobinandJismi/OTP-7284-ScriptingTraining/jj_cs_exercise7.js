/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/email', 'N/record', 'N/runtime'],
/**
 * @param{currentRecord} currentRecord
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 */
function(currentRecord, email, record, runtime) {
    
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
    function fieldChanged(scriptContext) {

        var currentRecordObj = scriptContext.currentRecord;
        
        let sublistId = scriptContext.sublistId;
        let fieldId = scriptContext.fieldId;
        var line = scriptContext.line;
        var vendorId = currentRecordObj.getValue({
            fieldId: 'entity' 
        });
        let vendorRecord = record.load({
            type: record.Type.VENDOR,
            id: vendorId
        })         
        let vendorEmail = vendorRecord.getValue({
            fieldId: 'email'
        })
        console.log(vendorEmail)

        
        if (sublistId === 'item' && fieldId === 'quantity') {
            let oldQuantity = currentRecordObj.getSublistValue({
                sublistId: sublistId,
                fieldId: fieldId,
                line: line
            });
            
            let newQuantity = currentRecordObj.getCurrentSublistValue({
                sublistId: sublistId,
                fieldId: fieldId
            });

            let itemId = currentRecordObj.getCurrentSublistValue({
                sublistId: sublistId,
                fieldId: 'item'
            });

            itemRecord = record.load({
                type: record.Type.INVENTORY_ITEM,
                id: itemId,
                isDynamic: false
            });

            let itemName = itemRecord.getText({
                fieldId: 'itemid'
            });

            var poNumber = currentRecordObj.getValue('tranid');


            // console.log("itemName:"+itemName)
            // console.log("oldQuantity"+oldQuantity)
            // console.log("newQuantity"+newQuantity)

            if (oldQuantity !== newQuantity) {
                let subject = 'The quantity updated in the PO: ' + poNumber;
                let body = 'Item Name: ' + itemName + '\n'
                         + 'Old Quantity: ' + oldQuantity + '\n'
                         + 'Updated Quantity: ' + newQuantity + '\n';

                email.send({
                    author: runtime.getCurrentUser().id,
                    recipients: vendorEmail,
                    subject: subject,
                    body: body
                });
            }
        }

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
