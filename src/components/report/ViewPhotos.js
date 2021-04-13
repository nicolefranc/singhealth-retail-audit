import { ArrowRightOutlined, LeftOutlined, NotificationOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Carousel, Collapse, Divider, Empty, Image } from "antd";
import Meta from "antd/lib/card/Meta";

export default function ViewPhotos({ report }) {
    return report.images.length === 0 ? <Empty description="No Images" /> : (
        <Collapse ghost defaultActiveKey={['0']}>
            { report.images.map((item, index) => {
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
                        <h5><span className=" text-xs uppercase text-gray-500">Remarks:</span> {item.rectRemarks || 'No remarks'}</h5>
                        <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap mt-4">
                            <div className="w-full inline-block">
                                
                                { item.rectifications.length !== 0 ? <Image.PreviewGroup>{ item.rectifications.map((image, index) => {
                                        return <img alt={image.name} src={image} key={index} className="object-contain max-h-80"/> })}
                                    </Image.PreviewGroup>
                                    : <Empty description="No Rectifications" className="max-h-52 flex flex-col justify-center">
                                        {/* <Button type="primary">Send Reminder</Button> */}
                                    </Empty>
                                }
                                
                            </div>
                        </div>
                    </Collapse.Panel>
                )
            })}
        </Collapse>
    )
}