import { Collapse } from "antd";
import Item from "./Item";
// import LineItem from "./LineItem";


export default function Subcategory({ subcategory }) {
    const { Panel } = Collapse;
    console.log(subcategory);

    return (
        <Panel header={subcategory.subcategory} key="1">
            {/* <LineItem lineItems={subcategory.lineItems} /> */}
            <Item items={subcategory.lineItems} />
        </Panel>
    )
}