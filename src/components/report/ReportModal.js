import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";

export default function ReportModal({ id, title, visible, actions, functions,maskClosable,children } ) {

    
    return (
        <Modal
            id={id}
            title={title}
            visible={visible}
            centered
            maskClosable={maskClosable}
            footer={actions}
            onOk={functions.handleOk}
            onCancel={functions.handleCancel}
        >
            { children }
        </Modal>
    )
}