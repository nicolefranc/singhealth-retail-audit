import Modal from "antd/lib/modal/Modal";

export default function ReportModal({ id, title, visible, actions, functions, maskClosable,children }) {
    if (maskClosable == null) maskClosable = true

    return (
        <Modal
            id={id}
            title={title}
            visible={visible}
            centered
            closable={false}
            maskClosable={maskClosable}
            footer={actions}
            onOk={functions.handleOk}
            onCancel={functions.handleCancel}
        >
            { children }
        </Modal>
    )
}