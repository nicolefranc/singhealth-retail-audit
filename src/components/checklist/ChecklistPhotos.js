import Photo from "./Photo";
import {Button,Typography, Divider} from "antd";
import { routes } from '../../const';
import { Link} from 'react-router-dom';

export default function ChecklistPhotos() {

    const { Title } = Typography;

    return(
        <div class="relative w-full h-full">
            <Title level={2}>PHOTOS OF NON-COMPLIANCE</Title>
            
            <Photo  />

            <Divider/>

            <div className="flex flex-row justify-between">
                <Link to={routes.PHOTOS} absolute bottom-0 left-0>
                    <Button>Save as Draft</Button>
                </Link>
                <Link to={routes.PHOTOS} class="absolute bottom-0 right-0">
                    <Button type="primary">Submit</Button>
                </Link>
            </div>
        </div>
        
    )
}