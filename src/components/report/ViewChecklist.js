import { Collapse, List } from "antd";
import tick from '../../assets/images/tick.png';
import wrong from '../../assets/images/wrong.png';
import na from '../../assets/images/not-applicable.png';
import Checkbox from "../audit/Checkbox";

const { Panel } = Collapse;
export default function ViewChecklist({ checklist }) {

    return (
        <Collapse accordion defaultActiveKey='1'  className="site-collapse-custom-collapse">
            {checklist.map((category, cIndex) => {    
                return (<Panel header={category.category} key={cIndex + 1} className="font-semibold">
                        <Collapse accordion defaultActiveKey="1"  className="site-collapse-custom-collapse">
                            {   
                                category.subcategories.map((subcategory, sIndex) => {
                                    return <Panel header={subcategory.subcategory} key={sIndex+1} className="p-0 m-0" >
                                        <ViewItems items={subcategory.lineItems} />
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

const ViewItems = ({ items }) => {
    let itemsSrc = [];
    items.forEach(lineItemObj => {
        itemsSrc = [...itemsSrc, lineItemObj.lineItem];
    });

    return (
        <List dataSource={itemsSrc} renderItem={(item, index) => {
            let complied = items[index].complied;
            console.log(complied);
            return <List.Item>
                <div className="flex gap-2 row justify-between items-center w-full font-normal">
                    <p className="">{ item }</p>
                    <img src={getCompliedImg(complied)} alt={`${complied}`} width={30} />
                </div>
            </List.Item>
        }} />
    )
}

const getCompliedImg = (complied) => {
    if (complied) return tick;
    else if (complied === false) return wrong;
    else if (complied === null) return na;
}