import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {Skeleton,Tag, Button,Empty,Spin,Row,Col,Checkbox,Divider,Result } from "antd";
import {SwipeContentAction1} from '../swipe/SwipeContent';
import {SwipeableListItem, SwipeableList} from '@sandstreamdev/react-swipeable-list';
import { MailOutlined } from "@ant-design/icons";
import ReportCard from "../tenants/ReportCard";

import {FETCH_REPORT_BY_AUDITOR_STATUS} from "../../graphql/queries";
import { tokenValidator } from "../../utils/tokenValidator";
import gql from "graphql-tag";


export default function ReportCardDashboard({ status, setLength }) {

    const reportStatus = status;

    let isAuthenticated = localStorage.getItem("jwt");
    let validatorResult = tokenValidator(isAuthenticated);
    const auditorId= validatorResult.id;
    
    const { loading, error, data } = useQuery(FETCH_REPORT_BY_AUDITOR_STATUS, {
        variables: { getReportByAuditorAndStatusAuditorId: auditorId, getReportByAuditorAndStatusStatus: reportStatus }
    });

    if (loading) return <Spin />
    else if (error) return <Result status="500" title="500" subTitle="Sorry, something went wrong" />

    const { getReportByAuditorAndStatus } = data ? data : [] ;
    // console.log(getReportByAuditorAndStatus);
    setLength(getReportByAuditorAndStatus.length)

    return (
        <>
            {
                getReportByAuditorAndStatus.length > 0 ? getReportByAuditorAndStatus.map((report, index)=> (
                    <SwipeableList key={index}>
                            <ReportCard content={report}  />
                        </SwipeableList>
                    )) : <Empty description="No Audits"/>
            }
        </>
        
    )
}