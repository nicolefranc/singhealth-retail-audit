import React, { useState } from 'react';
import { Divider, Skeleton,Tag, Modal, Button, Input,Row,Col } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import SwipeContent from '../../components/swipe/SwipeContent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import { MailOutlined } from "@ant-design/icons";
import Pdf from '../checklist/Pdf';
import SendPdf from '../checklist/SendPdf';
import { useQuery } from '@apollo/client';
import { FETCH_REPORT } from '../../graphql/queries';

export default function ReportCard({ content}) {

    const reportId = content.id;
    console.log("reportId is this :", reportId);


    const { TextArea } = Input; 

    // for pop up
    const [visible,setVisible]=useState(false);

    const [sendSelf, setSendSelf] = useState(false);
    const [sendTenant, setSendTenant] = useState(false);
    
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false);
    };

    //for self checkbox
    function onSelfChecked(e) {
        console.log(`self = ${e.target.checked}`);
        setSendSelf(e.target.checked);
    }
    //for tenant checkbox
    function onTenantChecked(e) {
        console.log(`tenant = ${e.target.checked}`);
        setSendTenant(e.target.checked);
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
                        // <Button key="save" className="" onClick={handleOk}>Send</Button>,
                        // <Pdf checklistData={{somth: "smth", total: 98, item1: "not dusty", item1score: 1, item2: "not wet", item2score: 0}}/>,
                        <SendPdf reportId="605c74ffbb2a67120e3494da" sendSelf={sendSelf} sendTenant={sendTenant} addressee={["toh.kai.feng.2015@vjc.sg"]}/>
                    ]}
                >
                    <div className="flex flex-col">

                        <Row>
                            <Col span={6}><Checkbox onChange={onSelfChecked}>Self</Checkbox></Col>
                            <Col span={6}><Checkbox onChange={onTenantChecked}>Tenant</Checkbox></Col>
                        </Row>
                        
                        <TextArea placeholder="Remarks" autoSize className="mt-5" />
                    </div>    
                </Modal>
            </>
        )
    
    return <Skeleton />
}