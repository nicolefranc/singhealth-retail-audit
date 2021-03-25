import { UploadOutlined, WarningFilled } from "@ant-design/icons";
import { Button, Divider, Image, List, Upload, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRemarks } from "../../redux/actions/image";
import { toggleCompliant } from "../../redux/actions/report";
import CameraButton from "../CameraButton";
import CustomModal from "../modals/CustomModal";
import ImageUpload from "../upload/ImageUpload";
import NonCompliances from "../upload/NonCompliances";
import Checkbox from "./Checkbox";

export default function Item({ items, cIndex, sIndex }) {
    const [lineItems, setLineItems] = useState(items); // Array of line item objects
    const [compliance] = useState(null);
    const [itemSelected, setItemSelected] = useState(null);
    const images = useSelector(state => state.images);
    const dispatch = useDispatch();

    // console.log(`Item load: ${cIndex}, ${sIndex}`);

    let itemsSrc = [];
    items.forEach(lineItemObj => {
        itemsSrc = [...itemsSrc, lineItemObj.lineItem];
    });

    const confirm = () => {
        // TODO: Handle proceed and cancel states
        Modal.confirm({
            title: 'Are you sure?',
            content: 'You have added images to this line item.',
            okText: 'Proceed',
            onOk: () => console.log('purge images'),
            centered: true,
        });
    }

    // payload.checklist[cIndex].subcategories[sIndex].lineItems
    const toggleCompliance = (complied, index) => {

        // Given the index, update the complied field in line item object
        let lineItem = {...lineItems[index]};
        // Check if image is in state before switching from non-compliance
        if (complied === false && images[lineItem.id]) confirm();

        let compliance;

        // console.log(cIndex, sIndex);
        if (complied) { // Not compliant
            compliance = false;
            lineItem.complied = false;
        } else if (complied === false) { // N/A
            compliance = null;
            lineItem.complied = null;
        } else if (complied === null) { // Compliant
            compliance = true;
            lineItem.complied = true;
        }

        // console.log(lineItem);

        // Update the lineItems array
        const lineItemsArr = updateLineItems(lineItem, index)
        const compliant = lineItemsArr.filter(item => item.complied);
        const notNA = lineItemsArr.filter(item => item.complied !== null)
        let compliantCount = compliant.length;
        let totalCount = notNA.length;
        // console.log(`Compliant items: ${compliant.length}`);
        // console.log(`Total items: ${notNA.length}`);
        setLineItems(lineItemsArr);
        toggleCompliant(cIndex, sIndex, compliance, compliantCount, totalCount, lineItemsArr)(dispatch);
    }

    const updateLineItems = (lineItem, index) => {
        return [
            ...lineItems.slice(0, index),
            lineItem,
            ...lineItems.slice(index + 1)
        ]
    }


    const [visible,setVisible]=useState(false);
    
    const showUploadModal = (index) => {
        setVisible(true);
        setItemSelected(items[index].id);
    };

    const handleOk = () => {
        // Trigger upload
        // Once complete set upload status to uploaded
        setVisible(false);
    };

    const handleCancel = () => {
        // TODO: RESET IMAGE STATE
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

    // console.log(imgSources);

    return (
        <>
            <List dataSource={itemsSrc} renderItem={(item, index) => (
                <List.Item>
                    <div className="flex row justify-between items-center w-full font-normal">
                        <p>{ item }</p>
                        <Checkbox index={index} compliance={compliance} toggleCompliance={toggleCompliance} />
                    </div>

                    {lineItems[index].complied === false && <Button onClick={() => showUploadModal(index)} style={{width: 100}}>Add Photo</Button>}
                </List.Item>
            )} />

            {/* Image upload modal */}
            <NonCompliances id={itemSelected} modal={{
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
    )
}