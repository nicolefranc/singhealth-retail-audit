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
import { tokenValidator } from "../../utils/tokenValidator";
import ExtensionPopover from './ExtensionPopover';
import ApproveExtensionPopover from './ApproveExtensionPopover';
import { EXT_INITIAL } from "../../const";

export default function ViewExtentions({ report }) {

    let validatorResult = tokenValidator(localStorage.getItem("jwt"));

    const isTenant = validatorResult.type === "tenant";
    const isAuditor = ["auditor","admin"].includes(validatorResult.type);
    const sameInstitution = validatorResult.institutions.includes(report.tenantId.institution);
    const canApprove = isAuditor && sameInstitution;
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
                {report.extension.proposed.date && <><Descriptions.Item label="Proposed date">
                    {report.extension.proposed?.date}
                </Descriptions.Item>
                <Descriptions.Item label="Proposed remarks">
                    {report.extension.proposed?.remarks}
                </Descriptions.Item></>}
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
            {isTenant && <div className="mt-12 mb-6">
                <Popover
                    content={<a><ExtensionPopover report={report} makeInvisible={makeInvisible}/></a>}
                    title="Extension Request"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                >
                    <Button type="primary" disabled={report.extension.status === "Pending Approval"}>Request Extension</Button>
                </Popover>
            </div>}
            {canApprove && <div className="mt-12 mb-6">
                <Popover
                    content={<a><ApproveExtensionPopover report={report} makeInvisible={makeInvisible}/></a>}
                    title="Extension"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                >
                    <Button type="primary" disabled={report.extension.status === "NA"}>{[EXT_INITIAL,"Approved"].includes(report.extension.status) ? "Extend":"Approve Extension"}</Button>
                </Popover>
            </div>}
        </>
    );
}
