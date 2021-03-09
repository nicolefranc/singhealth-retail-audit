import React from 'react';
import { Divider,Button} from 'antd';
import { routes } from '../../const';
import { Link} from 'react-router-dom';
import {fnb} from '../../data/report';
import Subcategory from './Subcategory';

export default function ChecklistFB({ data }) {
    console.log(fnb);

    const {Checklist} = require('./Checklist.js'); //import Checklist function

    return(
        <>
            <h2>Audit Checklist (F&B)</h2> 

            <Divider />  
            
            <Checklist data={fnb} />

            {/* <Link to={routes.PHOTOS}> 
                <Button className="bg-orange text-white">Next</Button>
            </Link> */}
        </>
    )
}


// <Collapse accordion defaultActiveKey="1">
//     <Panel header="1. Professionalism & Staff Hygiene (10%)" key="1">

//         <Collapse accordion defaultActiveKey="1">
//             <Subcategory subcategory={fnb[0]['subcategories'][0]} />
//             {
//                 fnb[0].subcategories.map((subcategory, index) => {
//                     console.log(index);
//                     return <Panel header={subcategory.subcategory} key={index+1}>
//                         <LineItem lineItems={subcategory.lineItems} />
//                     </Panel>
//                 })
//             }

//             <Panel header="Staff Hygiene" key="2">
//                 <LineItem lineItems={fnb[0].subcategories[1].lineItems} />
//             </Panel>
//         </Collapse>

