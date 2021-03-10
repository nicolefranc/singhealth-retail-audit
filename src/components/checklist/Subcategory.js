import React from 'react';

import { Collapse } from "antd";
import Item from "./Item";
// import LineItem from "./LineItem";

const { Panel } = Collapse;

export default function Subcategory({ subcategory, index }) {
    // const [score, setScore] = useState(su)
    console.log('Subcat');

    return (
        <Panel header={subcategory.subcategory} key={index + 1} className='bg-orange'>
            {/* <LineItem lineItems={subcategory.lineItems} /> */}
            <Item items={subcategory.lineItems} />
        </Panel>
    )
}