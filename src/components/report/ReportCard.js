import React, { useState } from 'react';
import {Skeleton,Tag, Button } from "antd";
import SwipeContent from '../../components/swipe/SwipeContent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import { MailOutlined } from "@ant-design/icons";
import EmailModal from './EmailModal';

export default function ReportCard({ content}) {

    const reportId = content.id;

    const [itemSelected, setItemSelected] = useState(null);

    // for pop up
    const [visible,setVisible]=useState(false);
    
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

                <EmailModal 
                    id={itemSelected}
                    checklistData={{somth: "smth", total: 98, item1: "not dusty", item1score: 1, item2: "not wet", item2score: 0}}
                    modal={{
                        title: "Email Report PDF to...",
                        visible: visible,
                        actions: [
                            <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                            // <Pdf checklistData={{somth: "smth", total: 98, item1: "not dusty", item1score: 1, item2: "not wet", item2score: 0}}/>
                        ],
                        functions: {
                            handleCancel
                    }
                }}/>

            </>
        )
    
    return <Skeleton />
}


{/* <Modal
        visible={visible}
        title="Email Report PDF to..."
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
            <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
            // <Button key="save" className="" onClick={handleOk}>Send</Button>,
            <Pdf checklistData={{somth: "smth", total: 98, item1: "not dusty", item1score: 1, item2: "not wet", item2score: 0}}/>
        ]}
    >
        <div className="flex flex-col">

            <Row>
                <Col span={6}><Checkbox onChange={onChange}>Self</Checkbox></Col>
                <Col span={6}><Checkbox onChange={onChange}>Tenant</Checkbox></Col>
            </Row>
            
            <TextArea placeholder="Remarks" autoSize className="mt-5" />
        </div>    
    </Modal> */}