import Checklist from "../components/audit/Checklist";
import { useMutation, useQuery } from '@apollo/client';
import { Button, message, Result, Skeleton, Steps, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { initReport, resetReport } from "../redux/actions/report"; // Actions
import { useParams } from "react-router";
import { AUDIT_ACTIONS, DATE_FORMAT, routes } from "../const";
import { Link } from "react-router-dom";
import { FETCH_CHECKLIST } from "../graphql/queries";
import { useState } from "react";
import ChecklistPhotos from "../components/audit/ChecklistPhotos";
import Details from "../components/audit/Details";
import { CREATE_REPORT } from "../graphql/mutations";
import moment from "moment";
import { resetImage } from "../redux/actions/image";
import { PropertySafetyFilled } from "@ant-design/icons";




export default function Report(props) {
    const dispatch = useDispatch();
    const { tenantId, reportType } = useParams();
    const report = useSelector(state => state.report);
    const images = useSelector(state => state.images);
    const [current, setCurrent] = useState(0);
    const { loading, error, data } = useQuery(FETCH_CHECKLIST, {
        variables: { "getReportTemplateType": reportType, "getTenantByIdId": tenantId }
    });
    const [createReport] = useMutation(CREATE_REPORT);
    

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

    // Initialising UI from state
    const { getReportTemplate, getTenantById } = data; // TODO: Pass auditorId to report state
    const { Title } = Typography;
    const { Step } = Steps;
    
    const reportFromTemplate = {...getReportTemplate};
    reportFromTemplate.tenantId = getTenantById.id;

    // TODO: Add check if tenantId in url is the same as the one in state
    (Object.keys(report).length === 0 
        || tenantId !== report.tenantId) && initReport(reportFromTemplate, tenantId)(dispatch);

    // API actions
    const handleSubmit = async action => {
        let status = action === AUDIT_ACTIONS.SUBMIT_AUDIT ? 'audited' : action;
    
        // 1. Retrieve images, checklist from state
        // 2. Other infos: auditorId, auditDate, dueDate
        // Pass to mutate
        const lineItemIDs = Object.keys(images);
        const imagesArr = lineItemIDs.map(lineItemId => {
            console.log('map')
            console.log(lineItemIDs);
            let remarks = images[lineItemId].remarks ? images[lineItemId].remarks : ''
            return { lineItemId, nonCompliances: images[lineItemId].links, nonComplRemarks: remarks }
        })
        console.log('images')
        console.log(imagesArr);
        console.log(report);
        const variables = {
            createReportBody: {
              type: report.type,
              tenantId: report.tenantId,
              auditDate: report.auditDate,
              createdDate: moment().format(DATE_FORMAT),
              status: status,
              extension: report.extension,
              auditScore: report.auditScore,
              remarks: report.remarks,
              checklist: report.checklist,
              images: imagesArr
            }
        }
        console.log(variables);
    
        // createReport({ variables: { createReportBody: { tenantId: report.tenantId } } })
        createReport({ variables,
             update(cache,result){
                // TODO: Clear state
                    // resetStates();
                 message.success('Successfully saved report');
                 resetReport()(dispatch);
                    // resetImage()(dispatch);
                    props.history.push(`/report/${result.data.createReport.id}`)
        },onError(err){
                message.error('Failed to save report. Please try again later');
                console.log(err);
            }
        })
    }
    

    // UI data and actions
    const next = () => { setCurrent(current + 1) };
    const prev = () => { setCurrent(current - 1) };
    const steps = [
        { title: 'Details', content: () => { return <Details tenant={getTenantById} template={[reportType]} /> } },
        { title: 'Checklist', content: () => { return <Checklist data={ report.checklist } /> } },
        { title: 'Summary', content: () => { return <ChecklistPhotos /> } }
    ]

    return (
        <> 
            <Title>New Audit</Title>
            <Steps current={current}>
                { steps.map(item => <Step key={item.title} title={item.title} />) }
            </Steps>
            <div className="mt-10">{ steps[current].content() }</div>
            {/* <Checklist data={ getReportTemplate.checklist} /> */}
            <div className="mt-6 flex justify-between">
                { current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>Previous</Button>
                )}
                { current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>Next</Button>
                )}
                { current === steps.length - 1 && (
                    <div>
                        <Button className="mr-8" onClick={() => handleSubmit(AUDIT_ACTIONS.DRAFT_AUDIT)}>Save as Draft</Button>
                        <Button type="primary" onClick={() => handleSubmit(AUDIT_ACTIONS.SUBMIT_AUDIT)}>Submit</Button>
                    </div>
                )}
            </div>
        </>
    )
}

