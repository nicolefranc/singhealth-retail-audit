import React,{ useState } from 'react';
import { List,Modal,Button,Divider,Image,Upload,Input} from "antd";
import CameraButton from '../../components/CameraButton';
import { UploadOutlined} from '@ant-design/icons';

export default function LineItem({ lineItems }) {

    //TEMPORARY CHECKBOX!! TO BE REPLACED
    const updateInput = (ref, checked) => {
        // console.log(ref);
        const input = ref.current;
        if (input) {
            input.checked = checked;
            input.indeterminate = checked == null;
        }
    };
    const ThreeStateCheckbox = ({ name, checked, toggleCompliance}) => {
        const inputRef = React.useRef(null);
        const checkedRef = React.useRef(checked);
        React.useEffect(() => {
            checkedRef.current = checked;
            updateInput(inputRef, checked);
        }, [checked]);

        const handleClick = () => {
            switch (checkedRef.current) {
                case false:
                    checkedRef.current = null;
                    break;
                case null:
                    checkedRef.current = true;
                    break;
                default: // true
                    checkedRef.current = false;
                break;
          }
          updateInput(inputRef, checkedRef.current);
          if (toggleCompliance) {
            toggleCompliance(checkedRef.current);
          }
        };

        // console.log(checkedRef);
        return (
            <input 
            ref={inputRef}
            type="checkbox"
            name={name}
            onClick={handleClick} />
        );
    };
    const [compliance, setCompliance] = React.useState(true);
    const toggleCompliance = (checked) => {
        // console.log(`checked: ${checked}`);
    };
    //
    
    // console.log(lineItems);

    let lineItemsString = [];

    lineItems.forEach(lineItemObj => {
        lineItemsString = [...lineItemsString, lineItemObj.lineItem];
    });

    // console.log(lineItemsString);


    //TEMPORARY FOR PHOTO POPUP
    //for remarks
    const { TextArea } = Input; 

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

    //for camera button
    const [imgSources, setImgSources] = useState([]);

    const handleCapture = (target) => {
        if (target.files && target.files.length !== 0) {
            const file = target.files[0];
            const imgUrl = URL.createObjectURL(file);
            setImgSources([ imgUrl, ...imgSources ]);
        }
    }
    //

    return (
        <>
            <List
                dataSource={lineItemsString}
                renderItem={item => (
                    <List.Item>
                        <div className="flex flex-col">
                            {item}

                            {/* TEMPORARY FOR PHOTO POPUP */}
                            <Button type="primary" block onClick={showModal} style={{width: 100}}>Add Photo</Button>
                        </div>
                    </List.Item>
                )}  
            />

            {/* TEMPORARY FOR PHOTO POPUP */}
            <Modal
                visible={visible}
                title="Add Photo of Non-Compliance"
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="save" className="" onClick={handleOk}>Save</Button>,
                ]}
            >
                <div className="flex flex-col">
                    <div>
                        <CameraButton handleCapture={handleCapture}/>
                        
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Upload Photo</Button>
                        </Upload>
                    </div>

                    <Divider/>

                    <Image.PreviewGroup>
                    { imgSources.map(imgSource => (
                            <Image
                                key={imgSource}
                                className="object-contain"
                                src={imgSource}
                                fallback="data:image/png;base64,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"
                                />
                        ))
                    }
                    </Image.PreviewGroup>

                    <TextArea placeholder="Remarks" autoSize className="mt-20" />
                </div>    
            </Modal>

        </>
    )
}