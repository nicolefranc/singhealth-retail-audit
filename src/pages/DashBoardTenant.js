import Title from "antd/lib/typography/Title";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import ScrollList from "../components/dashboard/ScrollList";
import {PerformanceAll, Performance, pastReports, reportColumns} from "../components/dashboard/TenantData";
import { Typography, Button, Popconfirm, message } from 'antd';

const { Text} = Typography;

export default function DashboardTenant() {

    function confirm(e) {
        console.log(e);
        message.success('Tenant Deleted');
      }

    return (    
        <>
            <div className='flex justify-between'>
            <Title >Dashboard Tenant X </Title>
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

            <div className='mb-6 flex justify-between'>
                <Title level={5} type="danger">Due on 04/03/2021</Title>
                <Title level={5} type="danger">3 Days Due</Title> 
            </div>
        
            <div className='mb-20' >
                <PerformanceGraph content={Performance} type= {undefined}/>

                <div className='mt-12'>
                <Title level={5}>Tenant Expiry:</Title>
                <Title level={5}>Date of Latest Audit:</Title>
                <Title level={5}>Audit Status:</Title>
                </div>

                <Title className='mt-12' level={4}>Past Audits</Title>
                <ScrollList columns={reportColumns} data={pastReports}/>
            </div>
        
                <Button className="fab-container-left" type="ghost" block={true}>Audit</Button>
                <Button className="fab-container-right"  type="primary" block={true}>Notify</Button>   
        </>
    )
}