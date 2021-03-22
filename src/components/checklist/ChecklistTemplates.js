import React from 'react';
import Title from "antd/lib/typography/Title";
import { routes } from '../../const';
import { Divider, Button } from 'antd';
import { Link, useParams} from 'react-router-dom';


export default function ChecklistTemplates() {
    const { tenantId } = useParams();
    const baseRoute = routes.REPORT.concat(`/${tenantId}`);
    console.log(baseRoute);
    return (
        <>
            <Title>Select Template:</Title>

            <Divider />

            <h2>Audit Checklist:</h2>
            <div >
                <Link to={`${baseRoute}/non-fnb`}> 
                    <Button block className="">Non-F&amp;B</Button>
                </Link>
                <Link to={`${baseRoute}/fnb`}>
                    <Button block className="">F&amp;B</Button>
                </Link>
            </div>

            {/* <br />

            <h2>COVID Safe Management Measures Compliance Checklist:</h2>
            <Link to={`${baseRoute}/covid-19`}> 
                <Button block className="">COVID-19 Checklist</Button>
            </Link>        */}
        </>
    )
}