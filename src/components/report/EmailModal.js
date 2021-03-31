import { Row,Col,Checkbox,Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import CustomModal from "../modals/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import saveAs from 'file-saver';
import axios from 'axios';

export default function EmailModal({ id, checklistData, modal: { title, visible, actions, functions } }) {
    console.log(checklistData);
    console.log("html is :", document.getElementById('root'));

    // ????
    // const report = useSelector(state => );

    //for checkbox
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    //email pdf
    const server = axios.create({
        baseURL: "http://localhost:5001"
    })
    function handleEmail() {
        server.post('/create-pdf', checklistData)
        .then(() => server.get('/fetch-pdf', {responseType: 'blob'}))
        .then((res) => {
          const pdfBlob = new Blob([res.data], {type: 'application/pdf'});
    
          saveAs(pdfBlob, 'newPDF.pdf');
        })
        // Close modal
        functions.handleCancel();
    }
    
    return (
        <CustomModal
            title={title}
            visible={visible}
            actions={[...actions, <EmailButton action={handleEmail} />]}
            functions={functions}
            maskClosable={false}
        >
            <Row>
                <Col span={6}><Checkbox onChange={onChange}>Self</Checkbox></Col>
                <Col span={6}><Checkbox onChange={onChange}>Tenant</Checkbox></Col>
            </Row>
        </CustomModal>
    )
}

const EmailButton = ({ action}) => {
    return (
        <Button primary key="upload" onClick={action} >
            Send
        </Button>
    );
}