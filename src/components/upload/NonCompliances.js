import { useMutation } from "@apollo/client";
import { Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { MULTIPLE_UPLOADS, RECTIFICATION_UPLOADS } from "../../graphql/mutations";
import { updateRemarks, updateUploadStatus } from "../../redux/actions/image";
import CustomModal from "../modals/CustomModal";
import ImageUpload from "./ImageUpload";

export default function NonCompliances({ type, reportId, id, lineItem, modal: { title, visible, actions, functions } }) {
    const files = useSelector(state => state.images[id] ? state.images[id].images : [])
    const remarks = useSelector(state => state[id]?.remarks);
    const dispatch = useDispatch();
    const isRectification = type === 'rectification';
    const [mutate, { loading, error }] = useMutation(isRectification ? RECTIFICATION_UPLOADS : MULTIPLE_UPLOADS);

    const handleRemarks = ({ target: { value } }) => {
        updateRemarks(id, value)(dispatch);
    }

    const handleUpload = async () => {
        // Upload to bucket
        let { data } = await mutate({ variables: { files, id }})
        // console.log(multipleUploads);
        // Set state to uploaded, replace the image state values
        let multipleUploads = isRectification ? data.rectificationUploads : data.multipleUploads;
        if (multipleUploads.length === files?.length) {
            updateUploadStatus(id, multipleUploads)(dispatch)
        }
        // Close modal
        functions.handleCancel();
    }

    console.log('modal ' + lineItem);

    return (
        <CustomModal
            title={title}
            visible={visible}
            actions={[...actions, 
                // <UploadButton action={handleUpload} status={loading} files={files} />
                <Button primary key="upload" onClick={handleUpload} loading={loading} disabled={files?.length === 0}>
                    { loading ? 'Uploading' : 'Upload'}
                </Button>
            ]}
            functions={functions}
            maskClosable={false}
        >
            <ImageUpload id={id} lineItem={lineItem} />
            <TextArea
                value={remarks}
                onChange={handleRemarks}
                placeholder="Remarks"
                autoSize={{ minRows: 3, maxRows: 5 }}
                className="mt-4"
            />
            {
                error && message.error('Failed to upload. Try again later')
            }
        </CustomModal>
    )
}

const UploadButton = ({ action, loading, files }) => {
    // console.log(files);
    return (
        <Button primary key="upload" onClick={action} loading={loading} disabled={files?.length === 0}>
            { loading ? 'Uploading' : 'Upload'}
        </Button>
    )
}