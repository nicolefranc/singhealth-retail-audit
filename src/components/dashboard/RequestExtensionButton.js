import { DatePicker, Modal, Button, Image, Input} from 'antd';
import { DeleteOutlined,PictureOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Title from "antd/lib/typography/Title";


export default function RequestExtensionButton() {

    const [requestVisible, setRequestVisible]=useState(false);

    const showRequest = () => {
        setRequestVisible(true);
    }

    const handleOk = () => {
        setRequestVisible(false);
    };

    const handleCancel = () => {
        setRequestVisible(false);
    };

    function onChange(date, dateString) {
        console.log(date ,dateString);
    }
    
    //for 'remarks' input box
    const { TextArea } = Input; 

    return(
        <>

            <Button className= 'p-0.5 m-2' style={{height: '75px'}}  shape='round' size='middle' type="primary" block={true}
            onClick={showRequest}
            >Request Extension</Button> 

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

                <DatePicker className='mb-16' onChange={onChange} showToday={false} dateRender={current => {
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

const REQUEST_EXTENSION = gql`
  mutation requestExtention($requestdate: String!) {
    loginTenant(requestdate: $requestdate) {
      id
      requestdate
      duedate
    }
  }
`;
