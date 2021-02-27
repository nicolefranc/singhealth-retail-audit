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
            <div class="button">
                <Link to={routes.CHECKLIST_NONFB}> 
                    <Button block >Non-F&B</Button>
                </Link>
                <Link to={routes.CHECKLIST_FB}> 
                    <Button block>F&B</Button>
                </Link>
            </div>
            
        </>
    )
}