import React, { useState } from 'react';
import { InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Button, Descriptions, PageHeader, Popover, Result, Row, Spin, Statistic, Tabs, Tag, Col, Checkbox, } from "antd";
import TextArea from 'antd/lib/input/TextArea';
import { Redirect, useHistory, useParams } from "react-router";
import { FETCH_REPORT_BY_ID } from "../../graphql/queries";
import ViewChecklist from "./ViewChecklist";
import { BackHeader, PageContent, PageHeading, PageSubtitle, PageTitle, Section } from "../layout/PageLayout";
import ViewPhotos from "./ViewPhotos";
import ViewExtentions from "./ViewExtensions";
import SendPdf from '../../components/audit/SendPdf';
import ReportModal from '../../components/report/ReportModal';
import { round } from '../../utils/utils';
import { tokenValidator } from '../../utils/tokenValidator';
import { AUDIT_ACTIONS, routes } from '../../const';

const { TabPane } = Tabs;
const infoContent = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
);


export default function ViewReport() {
    // TODO: retrieve from params instead
    const { reportId } = useParams();
    // const reportId = "6060d37dc9fd5a18c33be070";
    const { data, loading, error } = useQuery(FETCH_REPORT_BY_ID, { variables: { getReportByIdReportId: reportId }, fetchPolicy: 'cache-first' });
    const history = useHistory();
    // for modal
    const [visible,setVisible]=useState(false);
    //for self checkbox
    function onSelfChecked(e) {
        console.log(`self = ${e.target.checked}`);
        setSendSelf(e.target.checked);
    }
    //for tenant checkbox
    function onTenantChecked(e) {
        console.log(`tenant = ${e.target.checked}`);
        setSendTenant(e.target.checked);
    }
    function updateRemarks(e){
        setRemarks(e.target.value);
    }
    const [sendSelf, setSendSelf] = useState(false);
    const [sendTenant, setSendTenant] = useState(false);
    const [remarks, setRemarks] = useState("");

    const showModal = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
    };

    if (loading) return <Spin size="large" />

    // else if (error) return <Result status="500" title="500" subTitle="Sorry, something went wrong" />
    else if (error) return <div>{ JSON.stringify(error) }</div>
    

    const { getReportById } = data;
    const report = getReportById;
    console.log(getReportById)
    let statusColor;
    if (report.status === AUDIT_ACTIONS.AUDITED) statusColor = "text-green-400";
    else if (report.status === AUDIT_ACTIONS.UNRECTIFIED_AUDIT) statusColor = "text-red-400";
    else if (report.status === AUDIT_ACTIONS.DRAFT_AUDIT) statusColor = "text-yellow-400";
    
    let scoreColor;
    if (report.auditScore >= 95) scoreColor = "text-green-400";
    else scoreColor = "text-red-400";

    //check authorized
    let validatorResult = tokenValidator(localStorage.getItem("jwt"));
    const isTenant = validatorResult.type === "tenant";
    const sameInstitution = validatorResult.institutions.includes(getReportById.tenantId.institution);
    if(isTenant && !sameInstitution){
        <Redirect to={routes.DEFAULT}/>
    }

    const audit = () => {
        history.push(`${routes.AUDIT}/${report.tenantId.id}/${report.type}`)
    }
    
    return (
        <>
            <PageHeading title={getReportById.tenantId.name} node={
                <Row align="middle" className="bg-white mt-4 p-4 shadow-md rounded-md justify-evenly">
                    <div className="flex flex-col items-center">
                        <h2 className="uppercase font-medium text-xs">Score (%)</h2>
                        <h1 className={`text-3xl font-semibold mr-1 ${scoreColor}`}>{round(getReportById.auditScore, 0)}</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="uppercase font-medium text-xs">Status</h2>
                        <h1 className={`text-3xl font-semibold mr-1 capitalize ${statusColor}`}>{getReportById.status}</h1>
                    </div>
                </Row>
            }>
                <BackHeader title="Audit Checklist" />
                <PageTitle title={getReportById.tenantId.name} />
                <Row align="middle" className="bg-white p-6 shadow-md rounded-md justify-evenly">
                    <div className="flex flex-col items-center">
                        <h2 className="uppercase font-medium text-xs">Type</h2>
                        <h1 className="text-3xl font-semibold mr-1">{ getReportById.type.toUpperCase() }</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="uppercase font-medium text-xs">Score (%)</h2>
                        <h1 className={`text-3xl font-semibold mr-1 ${scoreColor}`}>{round(getReportById.auditScore, 0)}</h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="uppercase font-medium text-xs">Status</h2>
                        <h1 className={`text-3xl font-semibold mr-1 capitalize ${statusColor}`}>{getReportById.status}</h1>
                    </div>
                    
                    <div className="flex mt-6">
                        { report.status === AUDIT_ACTIONS.DRAFT_AUDIT 
                            ? <Button className="mr-2" onClick={audit}>Continue Editing</Button>
                            : <Button block className="mr-2">Download</Button> }
                        <Button onClick={() => showModal()} block className="ml-2" type="primary">Send Email</Button>
                    </div>
                </Row>

                {/* </PageHeader> */}
            </PageHeading>
            <PageContent>
                <div>
                    <Tabs defaultActiveKey="1" type="card">
                        <TabPane tab="Details" key="1">
                            <Descriptions size="small" column={1} layout="horizontal" bordered>
                                <Descriptions.Item label="Auditor">{ report.auditorId.name }</Descriptions.Item>
                                <Descriptions.Item label="Auditee">{ report.tenantId.name }</Descriptions.Item>
                                <Descriptions.Item label="Institution">{ report.tenantId.institution }</Descriptions.Item>
                                <Descriptions.Item label="Audit Date">{ report.auditDate }</Descriptions.Item>
                                <Descriptions.Item label="Due Date">{ report.dueDate }</Descriptions.Item>

                                <Descriptions.Item label="Remarks">
                                    { report.remarks || 'No remarks'}
                                </Descriptions.Item>
                            </Descriptions>
                        </TabPane>
                        <TabPane tab="Checklist" key="2">
                            <ViewChecklist checklist={getReportById.checklist} />
                        </TabPane>
                        <TabPane tab="Images" key="3">
                            <ViewPhotos report={getReportById} />
                        </TabPane>
                        <TabPane tab="Extensions" key="4">
                            <ViewExtentions report={getReportById}/>
                        </TabPane>
                    </Tabs>
                </div>
            </PageContent>

            <ReportModal 
                id={getReportById.id}
                title="Email Report PDF to..."
                visible = {visible}
                actions={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <SendPdf reportId={getReportById.id} sendSelf={sendSelf} sendTenant={sendTenant} remarks={remarks} addressee={["toh.kai.feng.2015@vjc.sg"]}/>
                ]}
                functions={handleCancel}
                maskClosable={true}  
            >
                <div className="flex flex-col">
                    <Row>
                        <Col span={6}><Checkbox onChange={onSelfChecked}>Self</Checkbox></Col>
                        <Col span={6}><Checkbox onChange={onTenantChecked}>Tenant</Checkbox></Col>
                    </Row>

                    <TextArea onChange={updateRemarks} placeholder="Remarks" autoSize className="mt-5" />
                </div>
            </ReportModal>
        </>
    )
}