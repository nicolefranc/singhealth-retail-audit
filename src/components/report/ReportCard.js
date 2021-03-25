import React, { useState } from 'react';
import { Divider, Skeleton,Tag, Modal, Button, Input,Row,Col } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import SwipeContent from '../../components/swipe/SwipeContent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import { MailOutlined } from "@ant-design/icons";

export default function ReportCard({ content}) {

    const tenantId = content.id;
    console.log(tenantId);

    const { TextArea } = Input; 

    // for pop up
    const [visible,setVisible]=useState(false);
    
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false);
    };

    //for checkbox
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    // For swipe functionality  
    const swipeLeftOptions = () => ({
        content: (
            <SwipeContent
            label="Email"
            position="right"
            icon={<MailOutlined />}
            />
        ),
        action: () => showModal()
    });

    if (content)
        return (
            <>
                
                <SwipeableListItem 
                    swipeLeft={swipeLeftOptions(content.type)}
                >
                    <div className="swipeable-listitem p-2.5 flex-1">

                        <div className="flex items-center">
                            <span className="swipeable-listitem-name mr-2">{content.type}</span>
                            <Tag color="red">{content.status}</Tag>
                        </div>
                        <div className="flex">
                            <div className="mr-2">Audit Date: {content.auditDate}</div>
                            
                            {/* <Tag color="warning">{content.extStatus}</Tag> */}
                        </div>
                        
                    </div>
                </SwipeableListItem>

                <Modal
                    visible={visible}
                    title="Email Report PDF to..."
                    centered
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                        <Button key="save" className="" onClick={handleOk}>Send</Button>,
                    ]}
                >
                    <div className="flex flex-col">

                        <Row>
                            <Col span={6}><Checkbox onChange={onChange}>Self</Checkbox></Col>
                            <Col span={6}><Checkbox onChange={onChange}>Tenant</Checkbox></Col>
                        </Row>
                        
                        <TextArea placeholder="Remarks" autoSize className="mt-5" />
                    </div>    
                </Modal>
            </>
        )
    
    return <Skeleton />
}