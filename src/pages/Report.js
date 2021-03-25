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




export default function Report() {
    const dispatch = useDispatch();
    const { tenantId, reportType } = useParams();
    const type = reportType;
    const { loading, error, data } = useQuery(FETCH_REPORT_TEMPLATE_QUERY, {
        variables: { type }
    });
    const tenantQuery = useQuery(FETCH_TENANT, {
        variables: { tenantId }
    });
    const reportInState = useSelector(state => state.report);

    if (loading || tenantQuery.loading) {
        // console.log("loading");
        return (
            <Skeleton loading={true} />
        )
    }

    else if (error || tenantQuery.error) {
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

    // console.log(data);
    const { getReportTemplate } = data;
    const { getTenantById } = tenantQuery.data; // TODO: Pass auditorId to report state
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

const FETCH_TENANT = gql`
    query($tenantId: String!) {
        getTenantById(id: $tenantId) {
            id
            name
            institution
        }
    }
`

const FETCH_REPORT_TEMPLATE_QUERY = gql`
    query($type: String!) {
        getReportTemplate(type: $type) {
            type
            checklist {
                category
                weightage
                score
                subcategories {
                    subcategory
                    subcatScore
                    lineItems {
                        id
                        lineItem
                        complied
                    }
                }
            }
        }
    }
`

// tenantId
// auditorId
// auditDate
// auditScore

// extension {
//     status
//     proposed {
//         date
//         remarks
//     }
//     final {
//         date
//         remarks
//     }
// }