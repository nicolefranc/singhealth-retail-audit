import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage, removeImage } from "../../redux/actions/image";

/*
 * This functions allows images to be captured and stored in the state
 */
export default function ImageUpload({ id }) {
    // const [files, setFiles] = useState([]);
    const files = useSelector(state => state.images[id] ? state.images[id].images : []);
    const dispatch = useDispatch();
    const render = [];

    const props = {
        onRemove: file => {
            const index = files.indexOf(file);
            removeImage(id, index)(dispatch);
        },
        beforeUpload: file => {
            const newFiles = [...files, file];
            addImage(id, newFiles)(dispatch);
            return false;
        },
        fileList: files
    };

    // console.log(files);
    return (
        <>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
        </>
    )
}