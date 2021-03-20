import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { updateRemarks } from "../../redux/actions/image";
import ImageUpload from "./ImageUpload";

export default function NonCompliances({ id }) {
    const remarks = useSelector(state => state[id]?.remarks);
    const dispatch = useDispatch();

    const handleRemarks = ({ target: { value } }) => {
        updateRemarks(id, value)(dispatch);
    }

    console.log(remarks)
    return (
        <>
            <ImageUpload id={id} />
            <TextArea
                value={remarks}
                onChange={handleRemarks}
                placeholder="Remarks"
                autoSize={{ minRows: 3, maxRows: 5 }}
            />
        </>
    )
}