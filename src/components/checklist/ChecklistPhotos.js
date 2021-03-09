import Photo from "./Photo";
import {Button} from "antd";
import { routes } from '../../const';
import { Link} from 'react-router-dom';

export default function ChecklistPhotos() {

    return(
        <>
            <h2>PHOTOS OF NON-COMPLIANCE</h2>
            
            <Photo  />

            <Link to={routes.PHOTOS} className="justify-end flex"> 
                <Button className="bg-orange text-white ">Next</Button>
            </Link>
        </>
        
    )
}