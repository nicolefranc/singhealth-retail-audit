import React, { useState } from 'react';
import PerformanceGraph from "../components/dashboard/PerformanceGraph";
import { useQuery } from '@apollo/client';
import {Performance} from "../components/dashboard/TenantData";
import { Typography, Button, Popconfirm,Popover, message, Layout, Empty, Tag, Row, Col,Spin, Result, PageHeader, Space, Statistic, Descriptions, Checkbox, Divider } from 'antd';
import { SwipeContentAction1 } from '../components/swipe/SwipeContent';
import { SwipeableListItem,SwipeableList } from '@sandstreamdev/react-swipeable-list';
import { MailOutlined } from "@ant-design/icons";
import SendPdf from '../components/audit/SendPdf';
import ReportModal from '../components/report/ReportModal';
import { routes } from '../const';
import ReportCard from "../components/tenants/ReportCard";
import { FETCH_TENANT_DETAILS } from "../graphql/queries";
import { useParams } from "react-router";
import { useHistory } from 'react-router';
import { PageTitle, SectionTitle, Section, PageSubtitle } from "../components/layout/PageLayout";
import TextArea from 'antd/lib/input/TextArea';
import ExpiryPopover from "../components/tenants/ExpiryPopover";

const { Footer, Content } = Layout;
const { Text } = Typography;

export default function TenantDetail({}) {
    const { tenantId } = useParams();

    //for tenant expiry popover
    const [visible1, setVisible1] = useState(false);

    const makeInvisible = () => {
        setVisible1(false);
    }
    const handleVisibleChange = (e) => {
        console.log(e);
        setVisible1(e);
    };

    const { loading, error, data } = useQuery(FETCH_TENANT_DETAILS, {
        variables: { getAllReportsByTenantTenantId: tenantId, getTenantByIdId: tenantId }
    });

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
            <SwipeContentAction1
            label="Email"
            icon={<MailOutlined />}
            />
        ),
        action: () => showModal()
    });

    const history = useHistory();
    const goToReport = () => {
        history.push(`${routes.REPORT}/${getAllReportsByTenant[0].id}`)
        
    }  

    if (loading) return <Spin />
    else if (error) return <Result status="500" title="500" subTitle="Sorry, something went wrong" />
    // if (error) return <div>{ JSON.stringify(error, null, 2) }</div>

    const { getAllReportsByTenant, getTenantById } = data ? data : [] ;
    const tenant = getTenantById;
    if (getAllReportsByTenant && getAllReportsByTenant.length>0){
        console.log(getAllReportsByTenant);
    }

    console.log(getAllReportsByTenant[0]);

    return (    
        <div>
            <PageHeader
                className="p-0"
                onBack={() => window.history.back()}
                title={<PageSubtitle title="Tenant Details" />}
            >
                <PageTitle title={tenant.name} />
                <Descriptions size="small" column={1} layout="horizontal" bordered>
                    <Descriptions.Item label="Institution">{ tenant.institution }</Descriptions.Item>
                    <Descriptions.Item label="Checklist Type">{ getAllReportsByTenant && getAllReportsByTenant.length>0 ? getAllReportsByTenant[0].type.toUpperCase() : "-"}</Descriptions.Item>
                    <Descriptions.Item label="Tenancy Expiry">{ tenant.expiry ? tenant.expiry : "-" }</Descriptions.Item>
                    
                </Descriptions>
                <div className="flex my-6">
                    <Button block className="mr-2">Notify</Button>
                    <Button block className="ml-2" type="primary">Audit</Button>
                    <div block className="ml-2">
                <Popover
                    content={<a><ExpiryPopover tenant={tenant} makeInvisible={makeInvisible}/></a>}
                    title="Extension Request"
                    trigger="click"
                    visible={visible1}
                    onVisibleChange={handleVisibleChange}
                >
                    <Button type="ghost" disabled={tenant.expiry === "Pending Approval"}>Edit Expiry</Button>
                </Popover>
            </div>
                </div>
            </PageHeader>

            {( () => {
                if (getAllReportsByTenant && getAllReportsByTenant.length>0) {
                    return (
                        <Section>
                            <SectionTitle title="Latest Report" />
                            <SwipeableListItem swipeLeft={swipeLeftOptions()}>
                                <div className="swipeable-listitem p-2.5 flex-1" onClick={goToReport}>
                                    <span className="font-semibold text-l truncate uppercase">Audit Checklist ({getAllReportsByTenant[0].type.toUpperCase()})</span>
                                    <Divider type="vertical" />
                                    {( () => {
                                        if (getAllReportsByTenant[0].status==="audited"){
                                            return (<Tag color="success">{getAllReportsByTenant[0].status.toUpperCase()}</Tag>)
                                        } else if (getAllReportsByTenant[0].status==="unrectified"){
                                            return(<Tag color="error">{getAllReportsByTenant[0].status.toUpperCase()}</Tag>)
                                        }else if (getAllReportsByTenant[0].status==="draft"){
                                            return(<Tag color="warning">{getAllReportsByTenant[0].status.toUpperCase()}</Tag>)
                                        }else{
                                            return (<div/>)
                                        }
                                    } ) ()}
                                    <div className="text-sm text-gray-600">Date Created: {getAllReportsByTenant[0].auditDate}</div>
                                    {/* TODO: fix extension */}
                                    {/* <Tag>Due {getAllReportsByTenant[0].extension.final.date}</Tag> */}
                                </div>
                            </SwipeableListItem>
                        </Section>
                    )
                } else {
                    return (<div/>)
                }
            } ) ()}
                   
            <Section>
                <SectionTitle title="Performance Graph" />
                <PerformanceGraph content={Performance} type={undefined}/>
            </Section>

            <Section>
                <SectionTitle title="Audits" />
                {
                    getAllReportsByTenant.length > 0 ? getAllReportsByTenant.map((report, index)=> (
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

            {( () => {
                if (getAllReportsByTenant && getAllReportsByTenant.length>0) {
                    return (
                        <ReportModal 
                            id={getAllReportsByTenant[0].id}
                            title="Email Report PDF to..."
                            visible = {visible}
                            actions={[
                                <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                                <SendPdf reportId={getAllReportsByTenant[0].id} sendSelf={sendSelf} sendTenant={sendTenant} remarks={remarks} addressee={["toh.kai.feng.2015@vjc.sg"]}/>
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
                    )
                }
            } ) ()}
            
        </div>
    )
}