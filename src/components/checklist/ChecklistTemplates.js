import React from 'react';
import Title from "antd/lib/typography/Title";
import { routes } from '../../const';
import {Divider,Button,Checkbox} from 'antd';
import { Link} from 'react-router-dom';


export default function ChecklistTemplates() {
    return (
        <>
            <Title>Select Template:</Title>

            <Divider />

            <h2>Audit Checklist:</h2>
            <div >
                <Link to={routes.CHECKLIST_NONFB}> 
                    <Button block className="bg-orange text-white">Non-F&B</Button>
                </Link>
                <Link to={routes.CHECKLIST_FB}> 
                    <Button block className="bg-orange text-white">F&B</Button>
                </Link>
            </div>

            <br />

            <h2>COVID Safe Management Measures Compliance Checklist:</h2>
            <Link to={routes.CHECKLIST_COVID}> 
                <Button block className="bg-orange text-white">COVID-19 Checklist</Button>
            </Link>       

            
        </>
    )
}