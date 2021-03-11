import Photo from "./Photo";
import {Button,Typography, Divider} from "antd";
import { routes } from '../../const';
import { Link} from 'react-router-dom';

export default function ChecklistPhotos() {

    const { Title } = Typography;

    return(
        <>
            <Title level={2}>PHOTOS OF NON-COMPLIANCE</Title>
            
            <Photo  />

            <Divider/>

            <div className="flex flex-row justify-between">
                <Link to={routes.PHOTOS} >
                    <Button>Save as Draft</Button>
                </Link>
                <Link to={routes.PHOTOS} >
                    <Button className="bg-orange text-white">Submit</Button>
                </Link>
            </div>
        </>
        
    )
}