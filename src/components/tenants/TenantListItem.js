import { Divider, Skeleton,Tag } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import { noOp } from '@sandstreamdev/std/function';
import SwipeContent from '../../components/swipe/SwipeContent';
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

    // For swipe functionality
    let history = useHistory();
    const handleSwipe = () => {
        history.push(`audit/${tenantId}`);
    }


        
        


    const swipeRightOptions = () => ({
        
        content: (
            <SwipeContent
            label="Notify"
            position="right"
            icon={<NotificationOutlined />}
            />
        ),
        action: noOp
        
    });
    
   
    const swipeLeftOptions = () => ({
        content: (
            <SwipeContent
            label="Audit"
            position="right"
            icon={<EditOutlined />}
            />
        ),
        action: () => handleSwipe()
    });

    const [swipeProgress, handleSwipeProgress] = useState(0);
    // console.log(swipeProgress);

    const handleSwipeEnd = () => {
        handleSwipeProgress(0);
    };

    if (content)
        return (
            <>
                {/* edit if else */}
                {/* reset useState */}
                <SwipeableListItem 
                    extra={ checkboxVisible && <Checkbox onChange={handleCheckbox}/>}
                    swipeLeft={(handleSwipeProgress<=20) ? swipeLeftOptions(content.name): swipeRightOptions(content.name)}
                    // swipeRight={}
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