import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import { Performance } from "../components/dashboard/TenantData";
import { Typography, Button, Spin, Empty, Progress } from 'antd';
import { useQuery } from '@apollo/client';

import Pdf from "../components/audit/Pdf";
import { tokenValidator } from "../utils/tokenValidator";
import { FETCH_TENANT_DETAILS } from "../graphql/queries";
import { BackHeader, PageContent, PageHeading, PageTitle, Section, SectionTitle } from "../components/layout/PageLayout";
import ExpiryPopover from "../components/tenants/ExpiryPopover";
import ReportCard from "../components/tenants/ReportCard";
import { SwipeableList } from "@sandstreamdev/react-swipeable-list";
import unrectified from "../assets/images/unrectified.png";
import checklist from "../assets/images/checklist.png";
import evaluation from "../assets/images/evaluation.png";
import ReportModal from "../components/report/ReportModal";
import SendPdf from "../components/audit/SendPdf";
import Checkbox from "../components/audit/Checkbox";
import TextArea from "antd/lib/input/TextArea";
import { AUDIT_ACTIONS } from "../const";
import { round } from '../utils/utils';

const { Text } = Typography;

export default function DashboardTenant() {

    let tenant = tokenValidator(localStorage.getItem("jwt"));
    // console.log(tenant);


    const { loading, error, data } = useQuery(FETCH_TENANT_DETAILS, {
        variables: { getAllReportsByTenantTenantId: tenant.id, getTenantByIdId: tenant.id }
    });

    if (loading) return (<Spin />)
    else if (error) return (<div>{JSON.stringify(error)}</div>)

    const { getAllReportsByTenant, getTenantById } = data;
    if (getAllReportsByTenant && getAllReportsByTenant.length>0){
        console.log(getAllReportsByTenant);
    }

    console.log("gtid",getTenantById)

    const unrectLength = getAllReportsByTenant.filter(report => report.status === AUDIT_ACTIONS.UNRECTIFIED_AUDIT).length;
    const auditedLength = getAllReportsByTenant.filter(report => report.status === AUDIT_ACTIONS.AUDITED).length;
    const progress = round((auditedLength / getAllReportsByTenant.length) * 100, 0);

    return (    
        <>
            <PageHeading title={tenant.name} node={
                <div className="flex mt-4">
                    <Progress status={`${progress < 100 && 'active'}`} percent={progress} />
                </div>
            }>
                <PageTitle title={`Hello, ${tenant.name}!`} />
                
                <div className="bg-white p-6 rounded-md shadow-md flex justify-evenly cursor-pointer">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center">
                        <h1 className="text-3xl font-semibold mr-1">{ unrectLength }</h1>
                        <img src={unrectified} alt="Unrectified" width="30" />
                        </div>
                        <h2 className="uppercase font-medium text-xs">Unrectified</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center">
                        <h1 className="text-3xl font-semibold mr-1">{ auditedLength }</h1>
                        <img src={evaluation} alt="Completed Audits" width="30" />
                        </div>
                        <h2 className="uppercase font-medium text-xs">Completed</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center">
                        <h1 className="text-3xl font-semibold mr-1">{ getAllReportsByTenant.length }</h1>
                        <img src={checklist} alt="Total Audits" width="30" />
                        </div>
                        <h2 className="uppercase font-medium text-xs">Total</h2>
                    </div>
                </div>
            </PageHeading>
            <PageContent>
                    
                <div>
                    <SectionTitle title="Performance Graph" />
                    <PerformanceGraph content={getTenantById.performance} type={undefined}/>
                </div>

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
            </PageContent>
        </>
    )
}