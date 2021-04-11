import React, { useState } from 'react';
import { InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Button, Descriptions, PageHeader, Popover, Result, Row, Spin, Statistic, Tabs, Tag, Col, Checkbox, } from "antd";
import TextArea from 'antd/lib/input/TextArea';
import { useParams } from "react-router";
import { FETCH_REPORT_BY_ID } from "../../graphql/queries";
import ViewChecklist from "./ViewChecklist";
import { PageContent, PageSubtitle, PageTitle, Section } from "../layout/PageLayout";
import ViewPhotos from "./ViewPhotos";
import ViewExtentions from "./ViewExtensions";
import SendPdf from '../../components/audit/SendPdf';
import ReportModal from '../../components/report/ReportModal';
import { round } from '../../utils/utils';

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

    return (
        <PageContent>
            <PageHeader
                className="p-0"
                onBack={() => window.history.back()}
                title={<PageSubtitle title="Audit Checklist" />}
                tags={<Popover content={infoContent} title="Title" trigger="click">
                        <Button type="text" className="py-0 px-1">
                            <div className="flex items-center"><InfoCircleOutlined /></div>
                        </Button>
                    </Popover>
                }
            >
                <PageTitle title={getReportById.tenantId.name} />
                <Row align="middle" className="pb-6">
                    <Statistic title="Type" value={getReportById.type.toUpperCase()} />
                    <Statistic title="Score" suffix="%" value={round(getReportById.auditScore, 0)} className="px-8" />
                    {/* TODO: change color based on Status */}
                    <Tag color="blue" className="px-3 py-1"><Statistic title="Status" value={getReportById.status} className="capitalize" /></Tag>
                    
                </Row>
                <div className="flex">
                    <Button block className="mr-2">Download</Button>
                    <Button onClick={() => showModal()} block className="ml-2" type="primary">Send Email</Button>
                </div>

            </PageHeader>
            <Section>
                <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="Details" key="1">
                        <Descriptions size="small" column={1} layout="horizontal" bordered>
                            {/* TODO: auditor details */}
                            <Descriptions.Item label="Auditor">Beatrice</Descriptions.Item>
                            <Descriptions.Item label="Auditee">{ getReportById.tenantId.name }</Descriptions.Item>
                            <Descriptions.Item label="Institution">{ getReportById.tenantId.institution }</Descriptions.Item>
                            <Descriptions.Item label="Audit Date">23 March 2021</Descriptions.Item>
                            <Descriptions.Item label="Due Date">04 April 2021</Descriptions.Item>

                            <Descriptions.Item label="Remarks">
                                These are the general comments of the report. Lorem ipsum dolor sit amet...
                            </Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                    <TabPane tab="Checklist" key="2">
                        <ViewChecklist checklist={getReportById.checklist} />
                    </TabPane>
                    <TabPane tab="Images" key="3">
                        <ViewPhotos />
                    </TabPane>
                    <TabPane tab="Extensions" key="4">
                        <ViewExtentions report={getReportById}/>
                    </TabPane>
                </Tabs>
            </Section>

            <ReportModal 
                id={getReportById.id}
                title="Email Report PDF to..."
                visible = {visible}
                actions={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <SendPdf reportId={getReportById.id} sendSelf={sendSelf} sendTenant={sendTenant} remarks={remarks} addressee={["deeni1299@gmail.com"]}/>
                ]}
                functions={handleCancel}
                maskClosable={false}  
            >
                <div className="flex flex-col">
                    <Row>
                        <Col span={6}><Checkbox onChange={onSelfChecked}>Self</Checkbox></Col>
                        <Col span={6}><Checkbox onChange={onTenantChecked}>Tenant</Checkbox></Col>
                    </Row>

                    <TextArea onChange={updateRemarks} placeholder="Remarks" autoSize className="mt-5" />
                </div>
        </ReportModal>
        </PageContent>
    )
}