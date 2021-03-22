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

            <div className="flex flex-col">
                <Link to={`${baseRoute}/non-fnb`}> 
                    <Button block className="shadow max-w-screen-sm">Non-F&amp;B</Button>
                </Link>
                <Link to={`${baseRoute}/fnb`}>
                    <Button block className="shadow max-w-screen-sm mt-2">F&amp;B</Button>
                </Link>
            </div>

            {/* <br />

            <h2>COVID Safe Management Measures Compliance Checklist:</h2>
            <Link to={`${baseRoute}/covid-19`}> 
                <Button block className="bg-orange text-white">COVID-19 Checklist</Button>
            </Link>        */}
        </>
    )
}