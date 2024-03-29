import { CameraOutlined } from '@ant-design/icons';
import { Button } from "antd";

export default function CameraButton({ handleCapture }) {
    return (
        <>
            <input accept="image/*" id="icon-button-file" type="file" capture="environment"
                id="cameraInput"
                onChange={e => handleCapture(e.target)}
                style={{ display: "block" }} />
            <label htmlFor="cameraInput">
                {/* <Button icon={<CameraOutlined />}>Take Photo</Button> */}
            </label>
        </>
    )
}

// type="primary" shape="circle" size="large" style={{ width: 60, height: 60 }}
// icon={<CameraOutlined style={{ fontSize: "26px", paddingTop: "4px" }} />}