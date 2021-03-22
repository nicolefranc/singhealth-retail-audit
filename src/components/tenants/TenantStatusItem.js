import { Divider, Skeleton,Tag, Badge } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { useHistory } from "react-router-dom";
import { noOp } from '@sandstreamdev/std/function';
import SwipeContent from '../../components/swipe/SwipeContent';
import {SwipeableListItem} from '@sandstreamdev/react-swipeable-list';

export default function TenantStatusItem({ content, checkboxVisible }) {

    const tenantId = content.id;
    console.log(tenantId);

    const handleClick = () => {
        history.push(`status/${tenantId}`)
    }

    const handleCheckbox = (e) => {
        console.log(`checked: ${e.target.checked}`)
    }

    // For swipe functionality
    let history = useHistory();
    const handleSwipe = () => {
        history.push(`report/${tenantId}`);
    }

    const swipeRightOptions = () => ({
        content: (
            <SwipeContent
            label="Notify"
            position="left"
            />
        ),
        action: noOp
        });
        
    const swipeLeftOptions = () => ({
        content: (
            <SwipeContent
            label="Audit"
            position="right"
            />
        ),
        action: () => handleSwipe()
    });

    if (content)
        return (
            <div >
                
                <SwipeableListItem 
                    extra={ checkboxVisible && <Checkbox onChange={handleCheckbox}/>}
                    swipeLeft={swipeLeftOptions(content.name)}
                    swipeRight={swipeRightOptions(content.name)}
                    // key={id}
                >
                    <div className="swipeable-listitem p-2.5 flex-1" onClick={handleClick} >

                        <div className="flex items-center justify-between">
                            <span className="swipeable-listitem-name mb-1.5">{content.name} 
                            </span>

                            <Badge count={5} className="mr-3">
                            <a href="#" className="head-example" />
                        </Badge>

                        </div>
                        
                        <div className="swipeable-listitem-description mr-2">
                            {content.institution}
                        </div> 

                    </div>


                </SwipeableListItem>

            </div>
        )
    
    return <Skeleton />
}


{/* 
    <h3 className="uppercase mb-0 font-bold">{content.name}</h3>
    <h3 className="text-sm uppercase mb-0 mr-2">{ content.institution }</h3>
*/}
