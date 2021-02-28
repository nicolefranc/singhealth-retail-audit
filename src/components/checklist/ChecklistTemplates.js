import Title from "antd/lib/typography/Title";
import { routes } from '../../const';
import {Divider,Button} from 'antd';
import { Link} from 'react-router-dom';

export default function ChecklistTemplates() {
    return (
        <>
            <Title>Select Template:</Title>

            <Divider />

            <h2>Audit Checklist:</h2>

            <div class="row-equal">
                <Link to={routes.CHECKLIST_NONFB}> 
                    <Button block className="button">Non-F&B</Button>
                </Link>
                <Link to={routes.CHECKLIST_FB}> 
                    <Button block className="button">F&B</Button>
                </Link>
            </div>
            <h2>COVID Safe Management Measures Compliance Checklist:</h2>

            <Link to={routes.CHECKLIST_COVID}> 
                <Button block className="button">COVID Checklist</Button>
            </Link>       

            
        </>
    )
}