import React, { useState } from 'react';
import { Divider, Skeleton,Tag, Modal, Button, Input,Row,Col } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import SwipeContent from '../../components/swipe/SwipeContent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import { MailOutlined } from "@ant-design/icons";
import SendPdf from '../checklist/SendPdf';
import ReportModal from './ReportModal';
	
export default function ReportCard({ content}) {

    const reportId = content.id;
    // console.log("reportId is this :", reportId);
    const [itemSelected, setItemSelected] = useState(null);

    const { TextArea } = Input; 

    // for pop up
    const [visible,setVisible]=useState(false);


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

    function updateRemarks(e){
        setRemarks(e.target.value);
    }

    const [sendSelf, setSendSelf] = useState(false);
    const [sendTenant, setSendTenant] = useState(false);
    const [remarks, setRemarks] = useState("");

    
    const showModal = (index) => {
        setVisible(true);
        setItemSelected(index);
        console.log(index);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    // For swipe functionality  
    const swipeLeftOptions = () => ({
        content: (
            <SwipeContent
            label="Email"
            position="right"
            icon={<MailOutlined />}
            />
        ),
        action: () => showModal(reportId)
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

                <ReportModal
                    id={itemSelected}
                    title="Email Report PDF to..."
                    visible = {visible}
                    actions={[
                        <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                        <SendPdf reportId={itemSelected} sendSelf={sendSelf} sendTenant={sendTenant} remarks={remarks} addressee={["toh.kai.feng.2015@vjc.sg"]}/>
                    ]}
                    functions={handleCancel}
                    maskClosable={false}
                >
                    <div className="flex flex-col">

                        <Row>
                            <Col span={6}><Checkbox onChange={onSelfChecked}>Self</Checkbox></Col>
                            <Col span={6}><Checkbox onChange={onTenantChecked}>Tenant</Checkbox></Col>
                        </Row>

                        <TextArea onChange={updateRemarks} placeholder="Remarks" autoSize className="mt-5" />
                    </div>  
                </ReportModal>

            </>
        )
    
    return <Skeleton />
}