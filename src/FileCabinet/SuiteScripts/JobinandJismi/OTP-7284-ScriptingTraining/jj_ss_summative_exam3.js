/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/runtime', 'N/search'],
    /**
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (record, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            //FOR ACTIVE EMPLOYEES

            let activeEmployeeSearch = search.create({
                type: "customrecord_jj_employee_details",
                filters:
                    [
                        ["isinactive", "is", "F"]
                    ],
                columns:
                    [
                        search.createColumn({ name: "internalid", label: "ID" }),                    
                        search.createColumn({ name: "custrecord_jj_employee_name", label: "Employee Name" }),
                        search.createColumn({ name: "custrecord_jj_department", label: "Department" }),
                        search.createColumn({ name: "custrecord_jj_status", label: "Status" })                    
                    ]
            });

            let SearchResult = activeEmployeeSearch.run().getRange({
                start: 0,
                end: 100
            });

            for (let i = 0; i < SearchResult.length; i++) {
                let result = SearchResult[i];

                let empId = result.getText('internalid')
                let empRecord = record.load({
                    type: "customrecord_jj_employee_details",
                    id: empId
                });
                let vacationdays = empRecord.getValue({
                    fieldId: 'custrecord_jj_vacation_days'
                })

                if (vacationdays == 0){
                    empRecord.setValue({
                        fieldId: 'custrecord_jj_status',
                        value: 'On Leave'
                    });
                    empRecord.save();

                }
            }


            //FOR INACTIVE
            let inactiveEmployeeSearch = search.create({
                type: "customrecord_jj_employee_details",
                filters:
                    [
                        ["isinactive", "is", "T"]
                    ],
                columns:
                    [
                        search.createColumn({ name: "internalid", label: "ID" }),                    
                        search.createColumn({ name: "custrecord_jj_employee_name", label: "Employee Name" }),
                        search.createColumn({ name: "custrecord_jj_department", label: "Department" }),
                        search.createColumn({ name: "custrecord_jj_status", label: "Status" })                    
                    ]
            });

            let SearchResult2 = inactiveEmployeeSearch.run().getRange({
                start: 0,
                end: 100
            });

            for (let i = 0; i < SearchResult2.length; i++) {
                let result = SearchResult2[i];

                let empId = result.getText('internalid')
                let empRecord = record.load({
                    type: "customrecord_jj_employee_details",
                    id: empId
                });

                let probationPeriod = empRecord.getValue({
                    fieldId: 'custrecord_jj_probationary_period'
                })

                if (probationPeriod == 0 ){
                    empRecord.setValue({
                        fieldId: 'custrecord_jj_status',
                        value: 'Terminated'
                    });
                    empRecord.save();

                }
            }




        }

        return { execute }

    });
