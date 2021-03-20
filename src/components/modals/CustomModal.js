import Modal from "antd/lib/modal/Modal";

export default function CustomModal({ title, visible, actions, functions, children }) {
    return (
        <Modal
            visible={visible}
            title={title}
            centered
            onOk={functions.handleOk}
            onCancel={functions.handleCancel}
            footer={actions}
        >
            { children }
        </Modal>
    )
}