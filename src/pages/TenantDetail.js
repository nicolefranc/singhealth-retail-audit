import React, { useState } from 'react';
import PerformanceGraph from "../components/dashboard/PerformanceGraph";
import { useQuery } from '@apollo/client';
import { Typography, Button, Popconfirm,Popover, message, Layout, Empty, Tag, Row, Col,Spin, Result, PageHeader, Space, Statistic, Descriptions, Checkbox, Alert } from 'antd';
import { SwipeableListItem,SwipeableList } from '@sandstreamdev/react-swipeable-list';
import { routes } from '../const';
import ReportCard from "../components/tenants/ReportCard";
import { FETCH_TENANT_DETAILS } from "../graphql/queries";
import { useParams } from "react-router";
import { useHistory } from 'react-router';
import { PageTitle, SectionTitle, Section, PageSubtitle, PageContent, PageHeading, BackHeader } from "../components/layout/PageLayout";
import TextArea from 'antd/lib/input/TextArea';
import ExpiryPopover from "../components/tenants/ExpiryPopover";
import { tokenValidator } from '../utils/tokenValidator'
import CustomModal from '../components/modals/CustomModal';
import SendEmailDemo from '../components/tenants/SendEmailDemo';

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

    function updateSubject(e){
        setSubject(e.target.value);
    }
    const [subject, setSubject] = useState("");

    function updateRemarks(e){
        setRemarks(e.target.value);
    }
    const [remarks, setRemarks] = useState("");

    const showModal = () => {
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    
    // // for modal
    // const [visible,setVisible]=useState(false);
    // //for self checkbox
    // function onSelfChecked(e) {
    //     console.log(`self = ${e.target.checked}`);
    //     setSendSelf(e.target.checked);
    // }
    // //for tenant checkbox
    // function onTenantChecked(e) {
    //     console.log(`tenant = ${e.target.checked}`);
    //     setSendTenant(e.target.checked);
    // }
    // function updateRemarks(e){
    //     setRemarks(e.target.value);
    // }
    // const [sendSelf, setSendSelf] = useState(false);
    // const [sendTenant, setSendTenant] = useState(false);
    // const [remarks, setRemarks] = useState("");

    // const showModal = () => {
    //     setVisible(true);
    // };
    // const handleCancel = () => {
    //     setVisible(false);
    // };

    // // For swipe functionality  
    // const swipeLeftOptions = () => ({
    //     content: (
    //         <SwipeContentAction1
    //         label="Email"
    //         icon={<MailOutlined />}
    //         />
    //     ),
    //     action: () => showModal()
    // });

    const history = useHistory();
    // const goToReport = () => {
    //     history.push(`${routes.REPORT}/${getAllReportsByTenant[0].id}`)
    // }

    if (loading) return <Spin />
    else if (error) return <Result status="500" title="500" subTitle="Sorry, something went wrong" />
    // if (error) return <div>{ JSON.stringify(error, null, 2) }</div>

    const { getAllReportsByTenant, getTenantById } = data ? data : [] ;
    const tenant = getTenantById;
    
    if (getAllReportsByTenant && getAllReportsByTenant.length>0){
        console.log(getAllReportsByTenant);
    }

    const audit = () => {
        history.push(`${routes.AUDIT}/${tenantId}/${tenant.type}`);
    }

    console.log("gtid",tenant)

    console.log(getAllReportsByTenant[0]);
    let user = tokenValidator(localStorage.getItem("jwt"));
    const auditable = user.institutions.includes(tenant.institution);
    console.log(auditable);

    return (    
        <>
            <PageHeading title={tenant.name} node={
                auditable ? <div className="flex mt-4">
                    <Button block className="mr-2" onClick={() => showModal()}>Notify</Button>
                    <Button block className="ml-2" type="primary" onClick={audit}>Audit</Button>
                </div> : <></>
            }>
                <BackHeader title="Tenant Details" />
                <PageTitle title={tenant.name} />
                <Descriptions size="small" column={1} layout="horizontal" bordered>
                    <Descriptions.Item label="Institution">{ tenant.institution }</Descriptions.Item>
                    <Descriptions.Item label="Checklist Type">{ getAllReportsByTenant && getAllReportsByTenant.length>0 ? getAllReportsByTenant[0].type.toUpperCase() : "-"}</Descriptions.Item>
                    <Descriptions.Item label="Tenancy Expiry">{ tenant.expiry ? tenant.expiry : "-" }</Descriptions.Item>
                    
                </Descriptions>
                <div className="flex mt-6">
                    { auditable ? <>
                        <Button block className="mr-2" onClick={() => showModal()}>Notify</Button>
                        <Button block className="ml-2" type="primary" onClick={audit}>Audit</Button>
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
                    </> : <Alert
                        message="Viewing Rights"
                        description="You are only allowed to view this tenant from this institution."
                        type="info"
                        showIcon className="w-full"
                    /> }
                </div>
            </PageHeading>
            <PageContent>
                {( () => {
                    if (getAllReportsByTenant && getAllReportsByTenant.length>0) {
                        return (
                            <Section>
                                <SectionTitle title="Latest Report" />
                                <ReportCard content={getAllReportsByTenant[0]} />
                            </Section>
                        )
                    } else {
                        return (<div/>)
                    }
                } ) ()}
                    
                <Section>
                    <SectionTitle title="Performance Graph" />
                    <PerformanceGraph content={tenant.performance} type={"performance"}/>
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

                { auditable && <div className="my-6">
                    <Button type="primary" danger block size="large">
                        <Popconfirm
                            title="Are you sure to delete tenant x?"
                            onConfirm={confirm}
                            onCancel= {null}
                            okText="Yes"
                            cancelText="No"
                        >Delete Tenant</Popconfirm>
                    </Button>
                </div> }

            </PageContent>


            <CustomModal
                title="Notify Tenant"
                visible = {visible}
                actions={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <SendEmailDemo to={tenant.email} title={subject} body={remarks}/>
                ]}
                functions={handleCancel}
                maskClosable={false}
            >
                <TextArea onChange={updateSubject} placeholder="Subject" autoSize/>
                <TextArea onChange={updateRemarks} placeholder="Message" autoSize={{ minRows: 4}} className="mt-5" />
                    
            </CustomModal>
        </>
    )
}


{/* {( () => {
    if (getAllReportsByTenant && getAllReportsByTenant.length>0) {
        return (
            <ReportModal 
                id={getAllReportsByTenant[0].id}
                title="Email Report PDF to..."
                visible = {visible}
                actions={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <SendPdf reportId={getAllReportsByTenant[0].id} sendSelf={sendSelf} sendTenant={sendTenant} remarks={remarks} addressee={["deeni1299@gmail.com"]}/>
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
} ) ()} */}