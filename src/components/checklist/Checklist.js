import React, {useState} from 'react';
import '../../App.css';
import { Collapse, Input , Divider, Typography, Button} from "antd";
import LineItem from "./LineItem";
import { routes } from '../../const';
import { Link} from 'react-router-dom';

function Checklist({ data }) {
    // data is an array of category objects
    
    const { Panel } = Collapse; //for dropdown

    const { TextArea } = Input; //for 'remarks' input box

    console.log(data);
    return (
        <div className="flex flex-col h-screen">
            <Collapse accordion defaultActiveKey='1' >
                {data.map((category, index,weightage) => (     

                    <Panel header={category.category} key={index + 1} className="bg-orange ">
                        <Collapse accordion defaultActiveKey="1" >
                            {   
                                category.subcategories.map((subcategory, index) => {
                                    console.log(index);
                                    return <Panel header={subcategory.subcategory} key={index+1} className="bg-orange ">
                                        <LineItem lineItems={subcategory.lineItems}/>
                                    </Panel>
                                })
                            }
                        </Collapse>
                
                        <div class="pt-10 font-bold text-right">Score: __/{category.weightage}%</div>
                    </Panel>
                ))}
            </Collapse>
            
            <div className="pt-20">
                <TextArea placeholder="Remarks" allowClear/>
            </div>

            <Divider />

            <div className="font-bold text-right">Total: ___/100%</div>

            <Link to={routes.PHOTOS} className="justify-end flex "> 
                <Button className="bg-orange text-white ">Next</Button>
            </Link>

        </div>
    )
}


function ChecklistCovid({ data }) {
    // data is an array of category objects

    const { Panel } = Collapse; //for dropdown

    
    const { TextArea } = Input; //for remarks input box
    const onChange = e => {
    console.log(e);
    };
    
    const { Text, Link } = Typography;

    console.log(data);
    return (
        <div className="flex">
            <h2>COVID Safe Management Measures Compliance Checklist</h2> 
            <Text type="secondary">For any non-compliance, auditor(s) shall remind auditee (operator) on immediate rectification and adherence.</Text>
            
            <Divider />

            <Collapse accordion defaultActiveKey='1'>
                {data.map((category, index) => {
                    console.log(index);     
                    return <Panel header={category.category} key={index + 1} className="bg-orange text-white">
                        <LineItem lineItems={category.lineItems} />
                    </Panel>
                })}
            </Collapse>

            <div className="pt-20">
                <TextArea placeholder="Remarks" allowClear onChange={onChange} />
            </div>
              

            <Link to={routes.PHOTOS} className="justify-end flex"> 
                <Button className="bg-orange text-white ">Next</Button>
            </Link>

        </div>
        
    )
}

export {
    Checklist,
    ChecklistCovid,
}


{/* {data.map((category,weightage) => {   
        console.log(weightage); 
        return <div class="row justify-between">
            <div>{category.category}</div>
            <div>__/{category.weightage}%</div>
        </div>
    })} */}