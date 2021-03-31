import { Divider, Skeleton,Tag } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import { noOp } from '@sandstreamdev/std/function';
import SwipeContent from '../../components/swipe/SwipeContent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';
import { NotificationOutlined,EditOutlined } from "@ant-design/icons";

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
            position="left"
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

    if (content)
        return (
            <>
                
                <SwipeableListItem 
                    extra={ checkboxVisible && <Checkbox onChange={handleCheckbox}/>}
                    swipeLeft={swipeLeftOptions(content.name)}
                    swipeRight={swipeRightOptions(content.name)}
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