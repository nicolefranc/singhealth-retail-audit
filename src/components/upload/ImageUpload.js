import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { Upload, Button } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_UPLOAD } from "../../graphql/mutations";
import { addImage, removeImage } from "../../redux/actions/image";

/*
 * This functions allows images to be captured and stored in the state
 */
export default function ImageUpload({ id }) {
    // const [files, setFiles] = useState([]);
    const files = useSelector(state => state.images[id] ? state.images[id].images : []);
    const links = useSelector(state => state.images[id] ? state.images[id].links : null);
    const dispatch = useDispatch();

    const [mutate, { loading, error }] = useMutation(DELETE_UPLOAD);

    const props = {
        onRemove: file => {
            const index = files.indexOf(file);
            if (links != null) {
                let [filename] = links[index].split('.com/').slice(-1);
                console.log(filename);
                mutate({ variables: { filename } })
                    .then(
                        onfulfilled => {
                            console.log(onfulfilled);
                            removeImage(id, index)(dispatch);
                        },
                        onrejected => {
                            console.log(onrejected);
                        }
                    )
            } else {
                removeImage(id, index)(dispatch);
            }
        },
        beforeUpload: file => {
            const newFiles = [...files, file];
            addImage(id, newFiles)(dispatch);
            return false;
        },
        fileList: files
    };

    // if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
    return (
        <div>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
        </div>
    )
}