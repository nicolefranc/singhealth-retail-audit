import Modal from "antd/lib/modal/Modal";

export default function CustomModal({ title, visible, actions, functions, maskClosable, children }) {
    if (maskClosable == null) maskClosable = true

    return (
        <Modal
            visible={visible}
            title={title}
            centered
            onOk={functions.handleOk}
            onCancel={functions.handleCancel}
            footer={actions}
            maskClosable={maskClosable}
        >
            { children }
        </Modal>
    )
}