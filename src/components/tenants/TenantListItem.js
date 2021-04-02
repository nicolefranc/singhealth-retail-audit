import { Divider, Skeleton,Tag } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import { noOp } from '@sandstreamdev/std/function';
import SwipeContentv2 from '../../components/swipe/SwipeContentv2';
import {SwipeableListItem,SwipeableList,} from '@sandstreamdev/react-swipeable-list';
import { NotificationOutlined,EditOutlined } from "@ant-design/icons";
import React, { useState } from 'react';

export default function TenantListItem({ content, checkboxVisible }) {

    const tenantId = content.id;
    console.log(tenantId);

    const handleClick = () => {
        console.log(`TenantDetail/${tenantId}`)
        history.push(`TenantDetail/${tenantId}`)
    }

    const handleCheckbox = (e) => {
        console.log(`checked: ${e.target.checked}`)
    }

    let history = useHistory();
    const swipeToAudit = () => {
        history.push(`audit/${tenantId}`);
    }
    const swipeToNotify=()=>{
        history.push(`status/${tenantId}`);
    }

    const swipeNotifyOptions = () => ({
        content: (
            <SwipeContentv2
            label="Notify"
            position="right"
            icon={<NotificationOutlined />}
            />
        ),
        action: () => swipeToNotify()
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
    console.log(swipeProgress);
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
                        </div>
                        
                    </div>
                </SwipeableListItem>

            </>
        )
    
    return <Skeleton />
}