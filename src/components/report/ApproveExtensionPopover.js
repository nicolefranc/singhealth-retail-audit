import { DatePicker, Descriptions, Button, Input, message } from "antd";
import moment from "moment";
import { DATE_FORMAT } from "../../const";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { APPROVE_EXTENSION } from "../../graphql/mutations";
import { ContactsOutlined } from "@ant-design/icons";
import { FETCH_REPORT_BY_ID } from "../../graphql/queries";

export default function ApproveExtensionPopover({ report, makeInvisible }) {
    const { TextArea } = Input;

    const [remarks, setRemarks] = useState("");

    const startDate = report.extension.proposed.date
        ? report.extension.proposed.date
        : report.extension.final.date;
    const [dateChosen, setdateChosen] = useState(startDate);

    const onAuditDateChange = (date, dateString) => {
        setdateChosen(dateString);
    };

    const [requestExtension, { loading }] = useMutation(APPROVE_EXTENSION, {
        update(cache, result) {
            const { getReportById: cachedReport } = cache.readQuery({
                query: FETCH_REPORT_BY_ID,
                variables: { getReportByIdReportId: report.id },
            });
            const newReport = JSON.parse(JSON.stringify(cachedReport)); //deep clone
            newReport.extension = result.data.approveExtension.extension;
            cache.writeQuery({
                query: FETCH_REPORT_BY_ID,
                variables: { getReportByIdReportId: report.id },
                data: {
                    getReportById: newReport,
                },
            });
            message.success("Proposed Due date is set to ".concat(dateChosen));
        },
        onError(err) {
            //any error will be thrown here
            console.log(err);
            try {
            } catch (err) {
                console.log(err);
            }
        },
        variables: { reportId: report.id, date: dateChosen, remarks: remarks },
    });

    const handleSubmit = () => {
        requestExtension();
        makeInvisible(false);
    };
    return (
        <>
            <h1>Approved Due Date</h1>
            {/* <DatePicker
                onChange={onAuditDateChange}
                format={DATE_FORMAT}
                value={moment(dateChosen, DATE_FORMAT)}
                defaultValue={report.extension.final.date && moment(report.extension.final.date, DATE_FORMAT)}
                
            />   */}
             <DatePicker className="mb-2 mt-2" defaultValue={report.extension.proposed.date && moment(report.extension.proposed.date, DATE_FORMAT)} onChange={onAuditDateChange} showToday={false} dateRender={current => {
                        const style = {};
                        if (current.format(DATE_FORMAT) === report.extension.final.date) {
                            style.backgroundColor = "rgba(252, 165, 165)";
                            }
                        return (
                            <div className="ant-picker-cell-inner rounded" style={style}>
                             {current.date()}
                                </div>
                            );
                        }}/>
            <br/>
            <h1 className="mb-2">Remarks</h1>
            <TextArea className="mb-4" onChange={(e)=> setRemarks(e.target.value)}/>
            <Button type="primary" onClick={handleSubmit}>Submit</Button>
        </>
    );
}
