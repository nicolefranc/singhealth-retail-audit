import React, { useState } from 'react';
import PerformanceGraph from "../components/dashboard/PerformanceGraph";
import { useQuery } from '@apollo/client';
import {Performance} from "../components/dashboard/TenantData";
import { Typography, Button, Popconfirm, message, Layout, Empty, Tag, Row, Col,Spin, Result, PageHeader, Space, Statistic, Descriptions, Checkbox } from 'antd';
import SwipeContent from '../components/swipe/SwipeContent';
import {SwipeableListItem,SwipeableList} from '@sandstreamdev/react-swipeable-list';
import { MailOutlined } from "@ant-design/icons";
import SendPdf from '../components/audit/SendPdf';
import ReportModal from '../components/report/ReportModal';
import { routes } from '../const';
import ReportCard from "../components/report/ReportCard";
import { FETCH_TENANT_DETAILS,FETCH_REPORT_BY_TENANT_STATUS } from "../graphql/queries";
import { useParams } from "react-router";
import { useHistory } from 'react-router';
import { PageTitle, SectionTitle, Section, PageSubtitle } from "../components/layout/PageLayout";
import TextArea from 'antd/lib/input/TextArea';

const { Footer, Content } = Layout;
const { Text } = Typography;

export default function TenantDetail({}) {
    const { tenantId } = useParams();
    const { loading, error, data } = useQuery(FETCH_REPORT_BY_TENANT_STATUS, {
        variables: { getReportByTenantAndStatusTenantId: tenantId, getReportByTenantAndStatusStatus: "audited" }
    });
    const { getReportByTenantAndStatus } = data ? data : [];
    // const latestReport = getReportByTenantAndStatus[0];
    console.log("data is" + data);
    console.log("query is " +getReportByTenantAndStatus);
    // console.log(latestReport);

    // const { loading, error, data } = useQuery(FETCH_TENANT_DETAILS, {
    //     variables: { getAllReportsByTenantTenantId: tenantId, getTenantByIdId: tenantId }
    // });

    function confirm(e) {
        console.log(e);
        message.success('Tenant Deleted');
    }

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

    // For swipe functionality  
    const swipeLeftOptions = () => ({
        content: (
            <SwipeContent
            label="Email"
            position="right"
            icon={<MailOutlined />}
            />
        ),
        action: () => showModal()
    });

    const history = useHistory();
    const goToReport = () => {
        history.push(`${routes.REPORT}/${getReportByTenantAndStatus}`)
    }
    if (loading) return <Spin />
    else if (error) return <Result status="500" title="500" subTitle="Sorry, something went wrong" />
    // if (error) return <div>{ JSON.stringify(error, null, 2) }</div>
   

    return (    
        <div>
            {/* TODO: change data names!! */}
            <PageHeader
                className="p-0"
                onBack={() => window.history.back()}
                title={<PageSubtitle title="Tenant Details" />}
            >
                <PageTitle title={getReportByTenantAndStatus} />
                <Descriptions size="small" column={1} layout="horizontal" bordered>
                    <Descriptions.Item label="Institution">{ getReportByTenantAndStatus }</Descriptions.Item>
                    {/* <Descriptions.Item label="Checklist Type">{ tenant.type ? tenant.type : 'TODO: Please add' }</Descriptions.Item>
                    <Descriptions.Item label="Tenancy Expiry">{ tenant.expirty ? tenant.expirty : 'TODO: Please add' }</Descriptions.Item> */}
                </Descriptions>
                <div className="flex my-6">
                    <Button block className="mr-2">Notify</Button>
                    <Button block className="ml-2" type="primary">Audit</Button>
                </div>
            </PageHeader>

            <Section>
                <SectionTitle title="Latest Report" />

                <SwipeableListItem swipeLeft={swipeLeftOptions()}>

                    <div className="swipeable-listitem p-2.5 flex-1" onClick={goToReport}>
                        <div className="flex items-center">
                            <span className="swipeable-listitem-name mr-2">{getReportByTenantAndStatus}</span>
                            <Tag color="red">{getReportByTenantAndStatus}</Tag>
                            {/* <Tag color="warning">{content.extension}</Tag> */}
                        </div>
                        <div >Audit Date: {getReportByTenantAndStatus}</div>
                    </div>

                </SwipeableListItem>
            </Section>
            <Section>
                <SectionTitle title="Performance Graph" />
                <PerformanceGraph content={Performance} type={undefined}/>
            </Section>

            <Section>
                <SectionTitle title="Past Audits" />
                {/* <ScrollList columns={reportColumns} data={pastReports}/> */}  
                {
                    getReportByTenantAndStatus.length > 0 ? getReportByTenantAndStatus.map((report, index)=> (
                        <SwipeableList key={index}>
                            <ReportCard content={report}  />
                        </SwipeableList>
                    )) : <Empty description="No Audits">
                        {/* <Button type="primary">New Audit</Button> */}
                    </Empty>
                }
            </Section>

            <div className="mt-12 mb-6">
                <Button type="primary" danger block>
                    <Popconfirm
                        title="Are you sure to delete tenant x?"
                        onConfirm={confirm}
                        onCancel= {null}
                        okText="Yes"
                        cancelText="No"
                    >Delete Tenant</Popconfirm>
                </Button>
            </div>

            <ReportModal 
                    id={getReportByTenantAndStatus}
                    title="Email Report PDF to..."
                    visible = {visible}
                    actions={[
                        <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                        <SendPdf reportId={getReportByTenantAndStatus} sendSelf={sendSelf} sendTenant={sendTenant} remarks={remarks} addressee={["toh.kai.feng.2015@vjc.sg"]}/>
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

        </div>
    )
}


{/* <div>
    <div className='m-5' style={{position:'sticky', top:'0', zIndex:'1'}}>
        <Title level={4} className='flex justify-center bg-blue-100 w-full'>Past Audits</Title>
    </div>
    <div style={{overflowX:'hidden', overflowY:'auto', height:'auto', zIndex:'0'}}>
        {
            getAllReportsByTenant.map((report, index)=> (
                <SwipeableList key={index} style={{zIndex:'0'}}>
                    <ReportCard content={report} loading={loading} error={error} />
                </SwipeableList>
            ))
        }
    </div>
</div> */}