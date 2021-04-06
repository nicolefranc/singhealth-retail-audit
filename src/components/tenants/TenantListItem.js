import { Button, Skeleton,Tag } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import TextArea from 'antd/lib/input/TextArea';
import SwipeContentv2 from '../../components/swipe/SwipeContentv2';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import { NotificationOutlined,EditOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import CustomModal from '../../components/modals/CustomModal';
import SendEmailDemo from './SendEmailDemo';

export default function TenantListItem({ content, checkboxVisible }) {

    const tenantId = content.id;

    const handleClick = () => {
        console.log(`TenantDetail/${tenantId}`)
        history.push(`TenantDetail/${tenantId}`)
    }

    const handleCheckbox = (e) => {
        console.log(`checked: ${e.target.checked}`)
    }

    // for modal
    const [visible,setVisible]=useState(false);

    function updateSubject(e){
        setSubject(e.target.value);
    }
    const [subject, setSubject] = useState("");

    function updateRemarks(e){
        setRemarks(e.target.value);
    }
    const [remarks, setRemarks] = useState("");

    const showModal = () => {
        setVisible(content );
    };
    const handleCancel = () => {
        setVisible(false);
    };
    // swipe functionalities
    let history = useHistory();
    const swipeToAudit = () => {
        history.push(`audit/${tenantId}`);
    }

    const swipeNotifyOptions = () => ({
        content: (
            <SwipeContentv2
            label="Notify"
            position="right"
            icon={<NotificationOutlined />}
            />
        ),
        action: () => showModal()
    });
    
    const swipeAuditOptions = () => ({
        content: (
            <SwipeContentv2
            label="Audit"
            position="right"
            icon={<EditOutlined />}
            />
        ),
        action: () => swipeToAudit()
    });

    const [swipeProgress, handleSwipeProgress] = useState(0);

    const handleSwipeEnd = () => {
        handleSwipeProgress(0);
    };

    if (content)
        return (
            <>
                {/* edit if else */}
                <SwipeableListItem 
                    threshold={0}
                    extra={ checkboxVisible && <Checkbox onChange={handleCheckbox}/>}
                    swipeLeft={(swipeProgress<40) ? swipeAuditOptions(content.name) : swipeNotifyOptions(content.name)}
                    onSwipeProgress={handleSwipeProgress }
                    onSwipeEnd={handleSwipeEnd}
                    // key={id}
                >
                    <div className="swipeable-listitem p-2.5 flex-1" onClickCapture={handleClick}>
                    
                        <div className="flex items-center">
                            <span className="swipeable-listitem-name">{content.name}</span>
                        
                        </div>
                        <div className="flex">
                            <div className="swipeable-listitem-description mr-2">{content.institution}</div>
                            {/* <Tag >Last Audit: {content.auditDate[0]}</Tag>
                            <Tag color="red">{content.status}</Tag> */}
                            <Tag >Last Audit: 29/3/2021</Tag>
                            <Tag color="red">Unrectified</Tag>

                            {/* {status.map(status => {
                                let color = 'blue';
                                if (status === 'Due') {
                                color = 'volcano';
                                }
                                else if(status === 'Rectified'){
                                color = 'green';
                                }
                                else if(status ==='Unrectified'){
                                color = 'geekblue'
                                }
                                return (
                                <Tag color={color} key={status}>
                                    {status.toUpperCase()}
                                </Tag>
                                );
                            })} */}
                        </div>
                        
                    </div>
                </SwipeableListItem>

                <CustomModal
                    title="Notify Tenant"
                    visible = {visible}
                    actions={[
                        <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                        // <SendEmailDemo to={tenantId} subject={subject} body={remarks}/>
                    ]}
                    functions={handleCancel}
                    maskClosable={false}
                >
                    <TextArea onChange={updateSubject} placeholder="Subject" autoSize/>
                    <TextArea onChange={updateRemarks} placeholder="Message" autoSize={{ minRows: 4}} className="mt-5" />
                    
                </CustomModal>

            </>
        )
    
    return <Skeleton />
}