import Title from "antd/lib/typography/Title";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import {Performance} from "../components/dashboard/TenantData";
import { Typography, Button, Popconfirm,Popover, message, Layout, Empty, Tag, Row, Col,Spin, Result, PageHeader, Space, Statistic, Descriptions, Divider } from 'antd';
import { useState } from "react";

import { SwipeableList } from '@sandstreamdev/react-swipeable-list';
import ReportCard from "../components/report/ReportCard";
import { FETCH_TENANT_DETAILS } from "../graphql/queries";
import { useParams } from "react-router";
import { PageTitle, SectionTitle, Section, PageSubtitle } from "../components/layout/PageLayout";
import ExpiryPopover from "../components/tenants/ExpiryPopover";

const { Footer, Content } = Layout;
const { Text } = Typography;

export default function TenantDetail() {
    const { tenantId } = useParams();

    const [visible, setVisible] = useState(false);

    const makeInvisible = () => {
        setVisible(false);
    }

    const handleVisibleChange = (e) => {
        console.log(e);
        setVisible(e);
    };

    const { loading, error, data } = useQuery(FETCH_TENANT_DETAILS, {
        variables: { getAllReportsByTenantTenantId: tenantId, getTenantByIdId: tenantId }
    });

    function confirm(e) {
        console.log(e);
        message.success('Tenant Deleted');
    }

    if (loading) return <Spin />
    else if (error) return <Result status="500" title="500" subTitle="Sorry, something went wrong" />
    // if (error) return <div>{ JSON.stringify(error, null, 2) }</div>

      
    const { getAllReportsByTenant, getTenantById } = data ;
    const latestReport = getAllReportsByTenant[0];
    const tenant = getTenantById;


    console.log(tenant);

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
                    <Descriptions.Item label="Checklist Type">{ tenant.type ? tenant.type : 'TODO: Please add' }</Descriptions.Item>
                    <Descriptions.Item label="Tenancy Expiry">{ tenant.expiry ? tenant.expiry : 'TODO: Please add' }</Descriptions.Item>
                    
                </Descriptions>
                <div className="flex my-6">
                    <Button block className="mr-2">Notify</Button>
                    <Button block className="ml-2" type="primary">Audit</Button>
                    <div block className="ml-2">
                <Popover
                    content={<a><ExpiryPopover tenant={tenant} makeInvisible={makeInvisible}/></a>}
                    title="Extension Request"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                >
                    <Button type="ghost" disabled={tenant.expiry === "Pending Approval"}>Edit Expiry</Button>
                </Popover>
            </div>
                </div>
            </PageHeader>

            {/* <div className="mb-6">
                <Row>
                    <Col className="mr-2">
                        <Title level={5}>Last Audit Date:</Title>
                    </Col>
                    <Col>
                        <Text>{latestReport.auditDate}</Text>
                    </Col>
                </Row>
                
                <Row>
                    <Col className="mr-2">
                        <Title level={5}>Audit Status: </Title>
                    </Col>
                    <Col>
                        <Tag color="red">{getAllReportsByTenant[0].auditDate}</Tag>
                    </Col>
                    <Col>
                        <Text type="danger">Due 30/03/2021</Text>
                    </Col>
                </Row>

                <Row>
                <Col className="mr-2">
                    <Title level={5}>Tenant Expiry:</Title>
                </Col>
                <Col>
                    <Text>01/01/2022</Text>
                </Col>
            </Row>
            </div> */}
            <Section>
                <SectionTitle title="Latest Report" />
                TODO: Please add in one swipeable card of the latest report here
            </Section>
            <Section>
                <SectionTitle title="Performance Graph" />
                <PerformanceGraph content={Performance} type={undefined}/>
            </Section>

            <Section>
                <SectionTitle title="Past Audits" />
                {/* <ScrollList columns={reportColumns} data={pastReports}/> */}  
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
        </div>
    )
}