import React, { useState } from 'react';
import { Card,Button,Input,Typography, Carousel} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeImage } from '../../redux/actions/image';
import NonCompliances from '../upload/NonCompliances';

// for card
const { Meta } = Card; 

export default function Photo() {
    const nonCompliances = useSelector(state => state.images);
    const [itemSelected, setItemSelected] = useState(null);
    const [lineItem, setLineItem] = useState(null);
    const lineItemIds = Object.keys(nonCompliances);
    const dispatch = useDispatch();
    

    // for pop up
    const [visible,setVisible]=useState(false);
    const showUploadModal = (id, lineItem) => {
        setVisible(true);
        setItemSelected(id);
        setLineItem(lineItem);
    };

    const handleOk = () => {
        setVisible(false)
    };
    const handleCancel = () => {
        setVisible(false);
    };


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
            {
                lineItemIds.map((id, index) => {
                    const { lineItem, images, remarks } = nonCompliances[id];
                    
                    return (
                        <>
                            <h1 className="bg-white px-6 py-4 text-base font-normal">{ lineItem }</h1>
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
                                            return <img alt={image.name} src={url} className="object-contain max-h-52"/>
                                        })}
                                    </Carousel>
                                }
                                actions={[
                                    // <DeleteOutlined key="delete" onClick={() => handleDelete(id, index)} />,
                                    <EditOutlined key="editphoto" onClick={() => showUploadModal(id, lineItem)}/>
                                ]}
                            >
                                <Meta description={<h2 className="text-base">
                                    <span className="uppercase text-sm font-medium text-gray-400">Remarks<br/></span>{remarks || 'No remarks'}
                                </h2>} />
                            </Card>
                        </>
                    )
                })
            }

            
            <NonCompliances id={itemSelected} lineItem={lineItem} modal={{
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