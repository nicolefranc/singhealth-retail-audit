import Checklist from "../components/checklist/Checklist";
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Result, Skeleton, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

// Actions
import { initReport } from "../redux/actions/report";
import { useParams } from "react-router";
import { routes } from "../const";
import { Link } from "react-router-dom";
import { FETCH_CHECKLIST } from "../graphql/queries";




export default function Report() {
    const dispatch = useDispatch();
    const { tenantId, reportType } = useParams();
    const { loading, error, data } = useQuery(FETCH_CHECKLIST, {
        variables: {
            "getReportTemplateType": reportType,
            "getTenantByIdId": tenantId
        }
    });
    
    const reportInState = useSelector(state => state.report);

    if (loading) {
        // console.log("loading");
        return (
            <Skeleton loading={true} />
        )
    }

    else if (error) {
        console.log(error.message);
        const statusCode = error.message.substring(error.message.length - 3);
        const message = error.message.split(':')[0];
        return (
            <Result
                status="500"
                title={statusCode}
                subTitle={message}
                extra={<Link to={routes.TENANTS}><Button type="primary">Back to Tenants</Button></Link>}
            />
        )   
    }

    const { getReportTemplate, getTenantById } = data; // TODO: Pass auditorId to report state
    const { Title } = Typography;
    
    const report = {...getReportTemplate};
    report.tenantId = getTenantById.id;

    // TODO: Add check if tenantId in url is the same as the one in state
    (Object.keys(reportInState).length === 0 
        || tenantId !== reportInState.tenantId) && initReport(report, tenantId)(dispatch);
    // console.log(reportInState);
    return (
        <> 
            <Title>{ getTenantById.name }</Title>
            {/* <Checklist data={ getReportTemplate.checklist} /> */}
            <Checklist data={ reportInState.checklist } />
        </>
    )
}