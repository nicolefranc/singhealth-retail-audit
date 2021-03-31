import Title from "antd/lib/typography/Title";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { PerformanceAll, Performance, pastReports, reportColumns } from "../components/dashboard/TenantData";
import { Typography, Button, Popconfirm, message, Layout, Divider, Tag, Row, Col,Spin } from 'antd';

import { SwipeableList } from '@sandstreamdev/react-swipeable-list';
import ReportCard from "../components/report/ReportCard";
import { FETCH_TENANT_DETAILS } from "../graphql/queries";
import { useParams } from "react-router";

const { Footer, Content } = Layout;
const { Text } = Typography;

export default function TenantDetail() {
    const { tenantId } = useParams();
    console.log(tenantId);
    const { data } = useQuery(FETCH_TENANT_DETAILS, {
        variables: { getAllReportsByTenantTenantId: tenantId }
    });
    const { getAllReportsByTenant } = data ? data : [];
    console.log(getAllReportsByTenant);

    function confirm(e) {
        console.log(e);
        message.success('Tenant Deleted');
      }

    return (    
        <>
            <div className='flex justify-between'>
                <Title>Tenant X</Title>

                <Button type="primary" danger>
                    <Popconfirm
                        title="Are you sure to delete tenant x?"
                        onConfirm={confirm}
                        onCancel= {null}
                        okText="Yes"
                        cancelText="No"
                    >
                        Delete
                    </Popconfirm>
                </Button>
            </div>

            <div className="mb-6">
                <Row>
                    <Col className="mr-2">
                        <Title level={5}>Last Audit Date:</Title>
                    </Col>
                    <Col>
                        <Text>01/03/2021</Text>
                    </Col>
                </Row>
                
                <Row>
                    <Col className="mr-2">
                        <Title level={5}>Audit Status: </Title>
                    </Col>
                    <Col>
                        <Tag color="red">Unrectified</Tag>
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
            </div>
            
            <div className='mb-20' >
                <PerformanceGraph content={Performance} type= {undefined}/>
                
                
                <span class="block bg-gray-50 h-12 swipeable-listitem">

                    <Title className='mt-10 p-2' level={4}>Past Audits</Title>
                </span>
                {/* <ScrollList columns={reportColumns} data={pastReports}/> */}  
                {
                    getAllReportsByTenant ? getAllReportsByTenant.map((report)=> (
                        <SwipeableList >
                            <ReportCard content={report}  />
                        </SwipeableList>
                    )):
                    <div className="flex w-full justify-center items-center">
                        <Spin tip="Loading..." size="large" />
                    </div>
                }
            </div>

        </>
    )
}



{/* <div className='justify-between flex'>
        <div className='fab-container' style={{width: '30%'}}>
            <Button className='ml-16' shape='round' size='large' type="primary" block={true}>Audit</Button> 
        </div>

        <div className='fab-container-right mr-16' style={{width: '30%'}}>
            <Button shape='round' size='large' type="primary" block={true}>Notify</Button> 
        </div>  
    </div> */}