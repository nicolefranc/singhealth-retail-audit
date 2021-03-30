import { useQuery } from "@apollo/client";
import { Collapse, Result, Spin } from "antd";
import { FETCH_REPORT_BY_ID } from "../../graphql/queries";
import Item from "../checklist/Item";
const { Panel } = Collapse;

export default function ViewChecklist({ checklist }) {

    console.log(checklist);

    return (
        <Collapse accordion defaultActiveKey='1'  className="site-collapse-custom-collapse">
            {checklist.map((category, cIndex) => {    
                return (<Panel header={category.category} key={cIndex + 1} className="font-semibold">
                        <Collapse accordion defaultActiveKey="1"  className="site-collapse-custom-collapse">
                            {   
                                category.subcategories.map((subcategory, sIndex) => {
                                    return <Panel header={subcategory.subcategory} key={sIndex+1} >
                                        <Item items={subcategory.lineItems} cIndex={cIndex} sIndex={sIndex} />
                                    </Panel>
                                })
                            }
                        </Collapse>
                    </Panel>
                )}
            )}
        </Collapse>
            
    )
}