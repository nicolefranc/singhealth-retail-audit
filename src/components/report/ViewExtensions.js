import {
    Button,
    Descriptions,
    Popconfirm,
    Popover,
    Result,
    Row,
    Spin,
    Statistic,
    Tabs,
    Tag,
} from "antd";
import { useState } from "react";
import ExtensionPopover from './ExtensionPopover';

export default function ViewExtentions({ report }) {
    console.log(report.extension);

    const [visible, setVisible] = useState(false);

    const makeInvisible = () => {
        setVisible(false);
    }


    console.log(typeof(setVisible));
    const handleVisibleChange = (e) => {
        console.log(e);
        setVisible(e);
    };

    return (
        <>
            <Descriptions size="small" column={1} layout="horizontal" bordered>
                {/* TODO: auditor details */}
                <Descriptions.Item label="Proposed date">
                    {report.extension.proposed?.date}
                </Descriptions.Item>
                <Descriptions.Item label="Proposed remarks">
                    {report.extension.proposed?.remarks}
                </Descriptions.Item>
                <Descriptions.Item label="Due date">
                    {report.extension.final.date}
                </Descriptions.Item>
                {report.extension.final.remarks && <Descriptions.Item label="Final remarks">
                    {report.extension.final?.remarks}
                </Descriptions.Item>}
                {report.extension.status && <Descriptions.Item label="Status">
                    {report.extension.status}
                </Descriptions.Item>}
            </Descriptions>
            <div className="mt-12 mb-6">
                <Popover
                    content={<a><ExtensionPopover report={report} makeInvisible={makeInvisible}/></a>}
                    title="Extension Request"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                >
                    <Button type="primary" disabled={report.extension.status === "Pending Approval"}>Request Extension</Button>
                </Popover>
            </div>
        </>
    );
}
