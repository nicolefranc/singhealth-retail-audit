import { ArrowRightOutlined, LeftOutlined, NotificationOutlined, RightOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Affix, Button, Card, Carousel, Collapse, Divider, Empty, Image, message } from "antd";
import Meta from "antd/lib/card/Meta";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUDIT_ACTIONS } from "../../const";
import { APPROVE_RECTIFICATION, CREATE_RECTIFICATION } from "../../graphql/mutations";
import { FETCH_REPORT_BY_ID } from "../../graphql/queries";
import { resetImage } from "../../redux/actions/image";
import { tokenValidator } from "../../utils/tokenValidator";
import NonCompliances from "../upload/NonCompliances";

export default function ViewPhotos({ report }) {
    const [visible, setVisible] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const [lineItem, setLineItem] = useState(null);
    const images = useSelector(state => state.images);
    // const [rectifications, setRectifications] = useState(null);
    const dispatch = useDispatch();

    const [rectify, { loading, error }] = useMutation(CREATE_RECTIFICATION, {
        update(cache, result) {
            console.log('Rectification created.');
            console.log(result);
            // updateCache(cache, result.data.createRectification);
            const { getReportById } = cache.readQuery({
                query: FETCH_REPORT_BY_ID,
                variables: { getReportByIdReportId: report.id },
            });
            const newReport = JSON.parse(JSON.stringify(getReportById)); //deep clone
            // const newReport = getReportById; 
            console.log(newReport);
            newReport.status = result.data.createRectification.status;
            newReport.images = result.data.createRectification.images;
            cache.writeQuery({
                query: FETCH_REPORT_BY_ID,
                variables: { getReportByIdReportId: report.id },
                data: {
                    getReportById: newReport,
                },
            });
            message.success("Rectification sucessfully submitted.");
            resetImage()(dispatch);
        },
        onError(err) {
            console.log(err);
            message.error('Failed to submit rectification. Please try again later.');
        }
    });

    const [approve] = useMutation(APPROVE_RECTIFICATION, {
        update(cache, result) {
            const { getReportById } = cache.readQuery({
                query: FETCH_REPORT_BY_ID,
                variables: { getReportByIdReportId: report.id },
            });
            const newReport = JSON.parse(JSON.stringify(getReportById)); //deep clone
            // const newReport = getReportById; 
            console.log(newReport);
            newReport.status = result.data.approveRectification.status;
            cache.writeQuery({ query: FETCH_REPORT_BY_ID,  variables: { getReportByIdReportId: report.id }, data: {  getReportById: newReport } });
            message.success("Rectification sucessfully approved.");
        },
        onError(err) {
            console.log(err);
            message.error('Failed to approve rectification. Please try again later.');
        }
    })

    const jwt = localStorage.getItem('jwt');
    const user = tokenValidator(jwt);
    const isTenant = user.type === 'tenant';

    const showUploadModal = (id, lineItem) => {
        setVisible(true);
        setItemSelected(id);
        setLineItem(lineItem);
    };

    const handleOk = () => {
        setVisible(false)
    };
    const handleCancel = () => {
        setVisible(false);
    };

    const handleRectification = async () => {
        if (Object.keys(images).length !== report.images.length) {
            message.error('Please upload rectifications for all line items.');
            return;
        } 

        // message.success('Rectification submitted');
        let reportImages = report.images; // images array

        const newImages = reportImages.map(reportImage => {
            let stateImages = images[reportImage.lineItemId];
            if(stateImages) {
                let remarks = stateImages.remarks ? stateImages.remarks : null
                let newImage = { lineItemId: reportImage.lineItemId, lineItem: reportImage.lineItem, nonCompliances: reportImage.nonCompliances, nonComplRemarks: reportImage.nonComplRemarks, rectifications: stateImages.links, rectRemarks: remarks }
                return newImage;
            }
        });

        console.log('Sending rectification...')
        const { data } = await rectify({ variables: { createRectificationId: report.id, createRectificationImages: newImages }});
        console.log('Rectified.');
    }

    const rectImages = (item) => {
        if (images[item.lineItemId] && images[item.lineItemId].links && images[item.lineItemId].links?.length !== 0) {
            return (
                <>
                    <Image.PreviewGroup>
                        { images[item.lineItemId].links.map((image, index) => {
                            return <Image alt={image.name} src={image} key={index} className="object-contain max-h-80"/> 
                        })}
                    </Image.PreviewGroup>
                </>
            )
        } else if (item.rectifications.length !== 0) {
            return <Image.PreviewGroup>
                { item.rectifications.map((image, index) => {
                    return <Image alt={image.name} src={image} key={index} className="object-contain max-h-80"/> 
                })}
            </Image.PreviewGroup>
        }

        return <Empty description="No Rectifications" className="max-h-52 flex flex-col justify-center">
            { isTenant && <Button type="primary" onClick={() => showUploadModal(item.lineItemId, item.lineItem)}>Rectify</Button> }
        </Empty>
    }

    const handleApproval = async () => {
        // message.success('Rectification approved');
        await approve({ variables: { approveRectificationId: report.id, approveRectificationStatus: AUDIT_ACTIONS.AUDITED } });
    }

    return report.images.length === 0 ? <Empty description="No Images" /> : (
        <>
            <Collapse ghost defaultActiveKey={['0']}>
                { report.images.map((item, index) => {
                    // console.log(item);
                    return (
                        <Collapse.Panel key={index}
                            header={<h3 className="font-medium text-base">{item.lineItem}</h3>} showArrow={true}>
                            
                            <h4 className="uppercase font-semibold text-md text-gray-500">Non-compliance</h4>
                            <Divider className="my-1 w-12" />
                            <h5><span className=" text-xs uppercase text-gray-500">Remarks:</span> {item.nonComplRemarks || 'No remarks'}</h5>
                            <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap mt-4">
                                <div className="inline-block">
                                    <Image.PreviewGroup>
                                    { item.nonCompliances.map((image, index) => {
                                        // return <img alt={image.name} src={image} className="object-contain max-h-80"/>
                                        return <Image src={image} key={index} className="max-h-52 object-contain" />
                                    })}
                                    </Image.PreviewGroup>
                                </div>
                            </div>
                            <h4 className="uppercase font-semibold text-md text-gray-500 mt-6">Rectifications</h4>
                            <Divider className="my-1 w-12" />
                            <h5><span className=" text-xs uppercase text-gray-500">Remarks:</span> {item.rectRemarks || (images[item.lineItemId]?.remarks &&  images[item.lineItemId].remarks) || 'No remarks'}</h5>
                            <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap mt-4">
                                <div className="w-full inline-block">
                                    { rectImages(item) }
                                    
                                    {/* { item.rectifications.length !== 0 ? <Image.PreviewGroup>
                                        { item.rectifications.map((image, index) => {
                                            return <img alt={image.name} src={image} key={index} className="object-contain max-h-80"/> })}
                                        </Image.PreviewGroup>
                                        : <Empty description="No Rectifications" className="max-h-52 flex flex-col justify-center">
                                            {isTenant && <Button type="primary" onClick={() => showUploadModal(item.lineItemId, item.lineItem)}>Rectify</Button>}
                                        </Empty>
                                    } */}
                                    
                                </div>
                            </div>
                            { (images[item.lineItemId] && images[item.lineItemId].links && images[item.lineItemId].links.length !== 0) && 
                                <Button block type="default" className="mt-4" onClick={() => showUploadModal(item.lineItemId, item.lineItem)}>Edit</Button>
                            }
                        </Collapse.Panel>
                    )
                })}
            </Collapse>
            { Object.keys(images).length > 0 && <Affix offsetBottom={60}>
                <Button block type="primary" className="mt-4" loading={loading}
                    onClick={handleRectification}>Submit Rectifications</Button>
            </Affix> }

            { report.status === AUDIT_ACTIONS.RECTIFIED_AUDIT && <Affix offsetBottom={60}>
                <Button block type="primary" className="mt-4" loading={loading}
                    onClick={handleApproval}>Approve Rectifications</Button>
            </Affix> }
            <NonCompliances type="rectification" reportId={report.id} id={itemSelected} lineItem={lineItem} modal={{
                title: "Upload Photo(s) for Rectification",
                visible: visible,
                actions: [
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>
                ],
                functions: {
                    handleOk, handleCancel
                }
            }}/>
        </>
    )
}