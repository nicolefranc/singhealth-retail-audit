import { DatePicker, Modal, Button, Image, Input} from 'antd';
import { DeleteOutlined,PictureOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Title from "antd/lib/typography/Title";
import moment from 'moment';
import { DATE_FORMAT } from '../const';


export default function RequestExtension() {

    const [uploadVisible,setUploadVisible]=useState(false);
    const [requestVisible, setRequestVisible]=useState(false);
    
    const showUpload = () => {
        setUploadVisible(true);
    };

    const showRequest = () => {
        setRequestVisible(true);
    }

    const handleOk = () => {
        setUploadVisible(false);
        setRequestVisible(false);
    };

    const handleCancel = () => {
        setUploadVisible(false);
        setRequestVisible(false);
    };

    function onChange(date, dateString) {
        console.log(date ,dateString);
        console.log(moment().toString().substring(0,15))
        console.log(moment().toDate().toISOString().substring(0,10))
    }
    
    

    //for 'remarks' input box
    const { TextArea } = Input; 

    return(
        <>
            <Title>Report Tenant X </Title>
            
            <div className="flex flex-row flex-wrap w-full justify-center mb-12 mt-12" >
            <Image
                width={530}
                src="https://www.pngkey.com/png/full/139-1394551_doc-icon-document-icon.png"
                preview={{
                src: 'https://xflower-software.com/files/Blog/HU/document.png',
      }}
    />
            </div>

            <div className='flex justify-between max-w-full'>
            <Button className='m-2' style={{height: '75px'}} shape='round' size='middle' type="primary" block={true}
            onClick={showUpload}
            >Non-Compliance</Button> 

            <Button className= 'p-0.5 m-2' style={{height: '75px'}}  shape='round' size='middle' type="primary" block={true}
            onClick={showRequest}
            >Request Extension</Button> 
            </div>

            <Modal
                visible={uploadVisible}
                title="Upload/Edit Photo and Remarks"
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="save" className="bg-orange" onClick={handleOk}>Save</Button>,
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

            <Modal
                visible={requestVisible}
                title="Request for Extension"
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="save" className="bg-orange" onClick={handleOk}>Save</Button>,
                ]}
            >
                <h3>select date</h3>

                <DatePicker format={DATE_FORMAT} className='mb-16' onChange={onChange} showToday={false} dateRender={current => {
                        const style = {};
                        if (current.toDate().toISOString().substring(0,10) === "2021-04-22") {
                            style.backgroundColor = "rgba(252, 165, 165)";
                            }
                        return (
                            <div className="ant-picker-cell-inner rounded" style={style}>
                             {current.date()}
                                </div>
                            );
                        }}/>

                <div className="pt-20">
                    <div className="font-bold">Reason:</div>
                    <TextArea defaultValue="(type reason here)" allowClear/>
                </div>
            </Modal>

        </>

    )
}

