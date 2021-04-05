import { DatePicker, Descriptions,Button, Input, message } from "antd";
import moment from "moment";
import { DATE_FORMAT } from "../../const";
import { useMutation } from "@apollo/client";
import React, { useState } from 'react';
import {PROPOSE_EXTENSION} from '../../graphql/mutations'
import { ContactsOutlined } from "@ant-design/icons";


export default function ExtensionPopover({report}) {
    const {TextArea} = Input;

    const [remarks, setRemarks] = useState("");

    const startDate = report.extension.proposed.date ? report.extension.proposed.date : report.extension.final.date
    const [dateChosen, setdateChosen] = useState(startDate);


    console.log(report);

    const onAuditDateChange = (date, dateString) => {
        setdateChosen(dateString);
    };

    const [requestExtension, {loading}] = useMutation(
        PROPOSE_EXTENSION,{
            update(cache, result) {

              console.log("result is", result);
              message.success("Proposed Due date is set to ".concat(dateChosen));
            },
            onError(err) {
              //any error will be thrown here
              console.log(err);
              try {
                // seterrors allow me to print the error to the react 'alert' component (for instance, the red bar you see when you key in wrong credentials)
                // because sometimes it doesn't work (like the graphql errors return me smth undefined), i put it in a try and catch block haha

              } catch (err) {
                console.log(err);
              }
            },
            variables: {reportId: report.id, date: dateChosen, remarks},
          }

    )

    const handleSubmit = () => {
        requestExtension();
    }
    return (
        <><h1>Proposed Date</h1>
            <DatePicker
                onChange={onAuditDateChange}
                format={DATE_FORMAT}
                value={moment(dateChosen, DATE_FORMAT)}
                defaultValue={report.extension.final.date && moment(report.extension.final.date, DATE_FORMAT)}
                
            />
            <br/>
            <h1>Remarks</h1>
            <TextArea onChange={(e)=> setRemarks(e.target.value)}/>
            <Button type="primary" onClick={handleSubmit}>Submit</Button>
        </>
    );
}
