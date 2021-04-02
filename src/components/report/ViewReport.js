import { InfoCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { Button, Descriptions, PageHeader, Popover, Result, Row, Spin, Statistic, Tabs, Tag } from "antd";
import { useParams } from "react-router";
import { FETCH_REPORT_BY_ID } from "../../graphql/queries";
import ViewChecklist from "./ViewChecklist";

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
    const { data, loading, error } = useQuery(FETCH_REPORT_BY_ID, { variables: { getReportByIdReportId: reportId }, fetchPolicy: 'network-only' });


    if (loading) return <Spin size="large" />

    // else if (error) return <Result status="500" title="500" subTitle="Sorry, something went wrong" />
    else if (error) return <div>{ JSON.stringify(error) }</div>

    const { getReportById } = data;

    return (
        <>
            <PageHeader
                onBack={() => window.history.back()}
                title="Audit Checklist"
                tags={<Tag color="blue">{ getReportById.status }</Tag>}
                extra={[
                    <Button key="2">Download</Button>,
                    <Button key="1" type="primary">Send Reminder</Button>,
                ]}
            >
                <Row align="middle">
                    <Statistic title="Type" value={getReportById.type.toUpperCase()} />
                    <Statistic title="Score" suffix="%" value={getReportById.auditScore} className="px-8" />
                    <Popover content={infoContent} title="Title" trigger="click">
                        <Button type="default">
                            <div className="flex items-center">
                                <InfoCircleOutlined />
                                <span className="ml-2">Info</span>
                            </div>
                        </Button>
                    </Popover>
                </Row>

            </PageHeader>
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
                    Content of card tab 3
                </TabPane>
            </Tabs>
        </>
    )
}