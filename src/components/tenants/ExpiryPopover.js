import { DatePicker, Descriptions, Button, Input, message } from "antd";
import gql from "graphql-tag";
import moment from "moment";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";

import { DATE_FORMAT } from "../../const";
import { FETCH_TENANT_DETAILS } from "../../graphql/queries";



export default function ExpiryPopover({tenant, makeInvisible}){

    console.log(tenant);

    const startDate = tenant.expiry && tenant.expiry;

    const [dateChosen, setdateChosen] = useState(moment(startDate,DATE_FORMAT));

    const onChange = (date, dateString) => {
        setdateChosen(dateString);
        console.log(date);
    };

    const [changeExpiry, { loading }] = useMutation(CHANGE_EXPIRY, {
        update(cache, result) {
            const { getTenantById: cachedTenant } = cache.readQuery({
                query: FETCH_TENANT_DETAILS,
                variables: { getTenantByIdId: tenant.id, getAllReportsByTenantTenantId: tenant.id },
            });
            const newTenant = JSON.parse(JSON.stringify(cachedTenant)); //deep clone
            newTenant.expiry = result.data.changeTenantExpiry.expiry;
            cache.writeQuery({
                query: FETCH_TENANT_DETAILS,
                variables: { getTenantByIdId: tenant.id, getAllReportsByTenantTenantId: tenant.id },
                data: {
                    getTenantById: newTenant,
                },
            });
            message.success("Expiry date is set to ".concat(dateChosen));
        },
        onError(err) {
            //any error will be thrown here
            console.log(err);
            try {
            } catch (err) {
                console.log(err);
            }
        },
        variables: { tenantId: tenant.id, date: dateChosen },
    });

    const handleSubmit = ()=>{
        changeExpiry();
        makeInvisible(false);
    }

    return (<>
        <h1>Expiry Date</h1>

         <DatePicker format={DATE_FORMAT} className="mb-2 mt-2" defaultValue={tenant.expiry && moment(tenant.expiry, DATE_FORMAT)} onChange={onChange} showToday={false} dateRender={current => {
                    const style = {};
                    if (current.format(DATE_FORMAT) === tenant.expiry) {
                        style.backgroundColor = "rgba(252, 165, 165)";
                        }
                    return (
                        <div className="ant-picker-cell-inner rounded" style={style}>
                         {current.date()}
                            </div>
                        );
                    }}/>
        <br/>
        <Button type="primary" onClick={handleSubmit}>Submit</Button>
    </>)
}

const CHANGE_EXPIRY = gql`
mutation changeExp($tenantId:String!,$date:String!){
  changeTenantExpiry(tenantId:$tenantId,date:$date){
    expiry
  }
}
`