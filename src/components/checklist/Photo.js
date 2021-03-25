import React, { useState } from 'react';
import { Card, Modal, Button, Image,Input,Typography,Upload, Divider, Carousel, Empty} from 'antd';
import { DeleteOutlined,EditOutlined,UploadOutlined} from '@ant-design/icons';
import CameraButton from '../../components/CameraButton';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeImage } from '../../redux/actions/image';
import NonCompliances from '../upload/NonCompliances';

const { Title } = Typography;
// for card
const { Meta } = Card; 

export default function Photo(){
    const nonCompliances = useSelector(state => state.images);
    const [itemSelected, setItemSelected] = useState(null);
    const lineItemIds = Object.keys(nonCompliances);
    const dispatch = useDispatch();
    

    // for pop up
    const [visible,setVisible]=useState(false);
    const showUploadModal = (id) => {
        setVisible(true);
        setItemSelected(id);
    };

    const handleOk = () => {
        setVisible(false)
    };
    const handleCancel = () => {
        setVisible(false);
    };

    //for 'remarks' input box
    const { TextArea } = Input; 

    //for CameraButton
    const [imgSources, setImgSources] = useState([]);

    const handleCapture = (target) => {
        if (target.files && target.files.length !== 0) {
            const file = target.files[0];
            // console.log(file);
            const imgUrl = URL.createObjectURL(file);
            setImgSources([ file ]);
        }
    }

    const handleDelete = (id, index) => {
        removeImage(id, index)(dispatch);
    }

    return (
        <>
            {/* <h4 className="shadow bg-white mb-20">Staff Attendance: adequate staff for peak and non-peak hours.</h4> */}
            {
                lineItemIds.map((id, index) => {
                    const { images, remarks } = nonCompliances[id];
                    // console.log(images);
                    // console.log(id);
                    return (
                        <>
                            <h1>{ id }</h1>
                            <Card
                                cover={
                                    <Carousel>
                                        { images.map((image, index) => {
                                            // console.log('image')
                                            // console.log(image);
                                            // TODO: Fix File object not saved causing url conversion error (image becomes a mere Object when loading from state after refresh)
                                            let url = URL.createObjectURL(image);
                                            // console.log('url')
                                            // console.log(url);
                                            return <img alt={image.name} src={url} className="object-contain max-h-80"/>
                                        })}
                                    </Carousel>
                                }
                                actions={[
                                    // <DeleteOutlined key="delete" onClick={() => handleDelete(id, index)} />,
                                    <EditOutlined key="editphoto" onClick={() => showUploadModal(id)}/>
                                ]}
                            >
                                <Meta description={remarks || 'No remarks'} />
                            </Card>
                        </>
                    )
                })
            }

            
            <NonCompliances id={itemSelected} modal={{
                title: "Upload Photo for Non-compliance",
                visible: visible,
                actions: [
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>
                ],
                functions: {
                    handleOk, handleCancel
                }
            }}/>

        </>
    );
}