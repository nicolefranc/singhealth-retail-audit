import Photo from "../components/checklist/Photo";
import {Button,Typography, Divider, message} from "antd";
import { routes } from '../const';
import { Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { CREATE_REPORT } from "../graphql/mutations";

export default function ChecklistPhotos() {
    const report = useSelector(state => state.report);
    const images = useSelector(state => state.images);
    const [createReport, { loading, error }] = useMutation(CREATE_REPORT);

    const { Title } = Typography;

    const handleSubmit = async action => {
        let status = action === 'submit' ? 'audited' : action;

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
        // report.checklist.map(categories => {
        //     categories.subcategories.map(subcategory => {
        //         subcategory.lineItems.map(lineItem => {
                    
        //             return {
        //                 id: lineItem.id,
        //                 lineItem: lineItem.lineItem,
        //                 complied: lineItem.complied,
        //             }
        //         })
        //     })
        // })
        console.log(report);
        const variables = {
            createReportBody: {
              type: report.type,
              tenantId: report.tenantId,
              auditDate: Date.now().toString,
              createdDate: Date.now().toString(),
              status: status,
              // extension,
              // auditScore,
              checklist: report.checklist,
              images: imagesArr
            }
        }
        console.log(variables);

        // createReport({ variables: { createReportBody: { tenantId: report.tenantId } } })
        createReport({ variables })
            .then(
                onfulfilled => {
                    message.success('Successfully saved report');
                    // Redirect to view report
                },
                onrejected => {
                    message.error('Failed to save report. Please try again later');
                    console.log(onrejected);
                }
            )
    }
    console.log(error);

    if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

    return(
        <>
            <Title level={2}>PHOTOS OF NON-COMPLIANCE</Title>
            
            <Photo  />

            <Divider/>

            <div className="flex flex-row justify-between">
                <Link to={routes.TENANTS} >
                    <Button onClick={() => handleSubmit('draft')}>Save as Draft</Button>
                </Link>
                {/* <Link to={routes.TENANTS} > */}
                    <Button className="" onClick={() => handleSubmit('submit')}>Submit</Button>
                {/* </Link> */}
            </div>
        </>
        
    )
}