/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the Mass Update trigger point.
         * @param {Object} params
         * @param {string} params.type - Record type of the record being processed
         * @param {number} params.id - ID of the record being processed
         * @since 2016.1
         */
        const each = (params) => {

            let recordId = params.id;
            let recordType = params.type;
            record.submitFields({
                type: recordType,
                id: recordId,
                values: {'memo': "Memo Updated"}
            })

        }

        return {each}

    });
