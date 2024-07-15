/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
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


            let recordData = record.load({
                type: recordType,
                id: recordId,
                isDynamic: true
            });

            let oldClass = parseInt(recordData.getValue({
                fieldId: 'custrecord_jj_stud_class',
                isDynamic: true
            }));

            if (oldClass == 10) {
                record.submitFields({
                    type: recordType,
                    id: recordId,
                    values: { 'custrecord_jj_stud_class': 'Completed' }
                })
            }

            else if (oldClass >= 1 && oldClass < 10) {
                record.submitFields({
                    type: recordType,
                    id: recordId,
                    values: { 'custrecord_jj_stud_class': oldClass + 1 }
                })
            }

            

        }

        return { each }

    });
