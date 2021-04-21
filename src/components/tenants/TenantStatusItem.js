import React, { useState } from 'react';
import { Skeleton, Badge,Button } from "antd";
import TextArea from 'antd/lib/input/TextArea';
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import {SwipeContentAction1} from '../../components/swipe/SwipeContent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import { NotificationOutlined} from "@ant-design/icons";
import CustomModal from '../../components/modals/CustomModal';
import SendEmailDemo from './SendEmailDemo';

export default function TenantStatusItem({ content, checkboxVisible }) {

    const tenantId = content.id;
    const tenantEmail = content.email;
    console.log(tenantId);

    let history = useHistory();
    const handleClick = () => {
        history.push(`status/${tenantId}`)
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

    //for swipe
    const swipeNotifyOptions = () => ({
        content: (
            <SwipeContentAction1
            label="Notify"
            icon={<NotificationOutlined />}
            />
        ),
        action: () => showModal()
    });


    if (content)
        return (
            <div >
                
                <SwipeableListItem 
                    extra={ checkboxVisible && <Checkbox onChange={handleCheckbox}/>}
                    swipeLeft={swipeNotifyOptions(content.name)}
                    // key={id}
                >
                    <div className="swipeable-listitem p-2.5 flex-1" onClick={handleClick} >

                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-xl truncate">{content.name}</span>
                            <Badge count={5} className="mr-3">
                                <a href="#" className="head-example" />
                            </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-500 uppercase">
                            {content.institution}
                        </div> 

                    </div>

                </SwipeableListItem>

                <CustomModal
                    title="Notify Tenant"
                    visible = {visible}
                    actions={[
                        <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                        <SendEmailDemo to={tenantEmail} title={subject} body={remarks}/>
                    ]}
                    functions={handleCancel}
                    maskClosable={false}
                >
                    <TextArea onChange={updateSubject} placeholder="Subject" autoSize/>
                    <TextArea onChange={updateRemarks} placeholder="Message" autoSize={{ minRows: 4}} className="mt-5" />
                    
                </CustomModal>

            </div>
        )
    
    return <Skeleton />
}
