import { ArrowRightOutlined, LeftOutlined, NotificationOutlined, RightOutlined } from "@ant-design/icons";
import { Affix, Button, Card, Carousel, Collapse, Divider, Empty, Image, message } from "antd";
import Meta from "antd/lib/card/Meta";
import { useState } from "react";
import { useSelector } from "react-redux";
import { tokenValidator } from "../../utils/tokenValidator";
import NonCompliances from "../upload/NonCompliances";

export default function ViewPhotos({ report }) {
    const [visible, setVisible] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const [lineItem, setLineItem] = useState(null);
    const images = useSelector(state => state.images);

    const jwt = localStorage.getItem('jwt');
    const user = tokenValidator(jwt);
    const isTenant = user.type === 'tenant';

    console.log(report);

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

    const handleRectification = () => {
        message.success('Rectification submitted');
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

    return report.images.length === 0 ? <Empty description="No Images" /> : (
        <>
            <Collapse ghost defaultActiveKey={['0']}>
                { report.images.map((item, index) => {
                    console.log(item);
                    return (
                        <Collapse.Panel key={index}
                            header={<h3 className="font-medium text-base">{item.lineItem}</h3>} showArrow={true}>
                            
                            <h4 className="uppercase font-semibold text-md text-gray-500">Non-compliance</h4>
                            <Divider className="my-1 w-12" />
                            <h5><span className=" text-xs uppercase text-gray-500">Remarks:</span> {item.nonComplRemarks || 'No remarks'}</h5>
                            <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap mt-4">
                                <div className="inline-block">
                                    {/* <div className="flex justify-evenly mb-2"> */}
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
                <Button block type="primary" className="mt-4" onClick={handleRectification}>Submit Rectifications</Button>
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