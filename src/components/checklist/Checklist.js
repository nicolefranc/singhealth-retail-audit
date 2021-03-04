import { Collapse } from "antd";
import LineItem from "./LineItem";


export default function Checklist({ data }) {
    // data is an array of category objects
    const { Panel } = Collapse;
    
    console.log(data);
    return (
        <Collapse accordion defaultActiveKey='1'>
            {data.map((category, index) => (     
                        
                <Panel header={category.category} key={index + 1}>
                    <Collapse accordion defaultActiveKey="1">
                        {   
                            category.subcategories.map((subcategory, index) => {
                                console.log(index);
                                return <Panel header={subcategory.subcategory} key={index+1}>
                                    <LineItem lineItems={subcategory.lineItems} />
                                </Panel>
                            })
                        }
                    </Collapse>
                </Panel>
                
            ))}
        </Collapse>
    )
}