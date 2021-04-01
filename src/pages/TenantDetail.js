import Title from "antd/lib/typography/Title";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import {Performance} from "../components/dashboard/TenantData";
import { Typography, Button, Popconfirm, message, Layout, Empty, Tag, Row, Col,Spin } from 'antd';

import { FETCH_TENANT_DETAILS } from "../graphql/queries";
import { useParams } from "react-router";
import ReportCard from '../components/report/ReportCard';
import {SwipeableList} from '@sandstreamdev/react-swipeable-list';

const { Footer, Content } = Layout;
const { Text } = Typography;

export default function TenantDetail() {
    const { tenantId } = useParams();
    // console.log(tenantId);
    const { loading, error,data } = useQuery(FETCH_TENANT_DETAILS, {
        variables: { getAllReportsByTenantTenantId: tenantId }
    });
    const { getAllReportsByTenant } = data ;
    console.log(getAllReportsByTenant);

    function confirm(e) {
        console.log(e);
        message.success('Tenant Deleted');
    }

    return (    
        <>
            <div className='flex justify-between'>
                <Title>{getAllReportsByTenant[0].tenantId.name}</Title> {/* HELP */}
    
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
                        <Text>{getAllReportsByTenant[0].auditDate}</Text>
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
            </div>
            
            <div className='mb-20' >
                <PerformanceGraph content={Performance} type= {undefined}/>
            </div>
            <div>
                <div className='m-5' style={{position:'sticky', top:'0', zIndex:'100'}}>
                    <Title level={4} className='flex justify-center bg-blue-100 w-full'>Past Audits</Title>
                </div>
                <div style={{overflowX:'hidden', overflowY:'auto', height:'auto', zIndex:'0'}}>
                    {/* <ReportCard content={getAllReportsByTenant}  /> */}
                    {
                        getAllReportsByTenant.map((report)=> (
                            <SwipeableList  style={{zIndex:'0'}}>
                                <ReportCard content={report} loading={loading} error={error} />
                            </SwipeableList>
                        ))
                    }
                </div>
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