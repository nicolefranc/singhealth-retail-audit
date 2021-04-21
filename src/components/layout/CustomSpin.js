import { PercentageOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function CustomSpin() {
    return (
        <div className="h-screen flex items-center justify-center">
            <Spin size="large" tip="Loading..." indicator={<PercentageOutlined className="mb-2" style={{ fontSize: 32 }} spin />} />
        </div>
    )
}