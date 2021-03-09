import React, { useState } from 'react';
import { Card, Divider,Modal, Button, Image,Input} from 'antd';
import { DeleteOutlined,PictureOutlined } from '@ant-design/icons';

export default function Photo({}){

    // for card
    const { Meta } = Card; 

    // for pop up
    const [visible,setVisible]=useState(false);
    
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false);
    };
    //

    //for 'remarks' input box
    const { TextArea } = Input; 

    return (
        <>
            <div>
                <h4>Professionalism & Staff Hygiene</h4>
                <div>At least one (1) clearly assigned person in-charge on site.</div>
            </div>
            
            <div className="flex flex-row flex-wrap w-full">
                <Card
                    style={{width:150}}
                    cover={
                        <img
                            alt="example"
                            src="http://www.spongeeducation.com/wp-content/uploads/2019/01/placeholder-image.png"
                            onClick={showModal}
                        />
                    }
                    actions={[
                        <DeleteOutlined key="delete" />,
                        <PictureOutlined key="editphoto"/>
                    ]}
                >
                    <Meta description="(insert remarks here)" onClick={showModal}/>
                </Card>

            </div>

            <Divider/>

            <Modal
                visible={visible}
                title="Edit Photo/Remarks"
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="save" className="bg-orange text-white" onClick={handleOk}>Save</Button>,
                ]}
            >
                <Image
                    className="object-contain"
                    src="http://www.spongeeducation.com/wp-content/uploads/2019/01/placeholder-image.png"
                />
                <div className="pt-20">
                    <div className="font-bold">Remarks:</div>
                    <TextArea defaultValue="(insert remarks here)" allowClear/>
                </div>
            </Modal>

        </>
    );
}