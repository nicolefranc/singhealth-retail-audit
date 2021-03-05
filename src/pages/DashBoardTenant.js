import Title from "antd/lib/typography/Title";
import DropdownTenant from "../components/dashboard/DropdownTenant";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import ScrollList from "../components/dashboard/ScrollList";
import {PerformanceAll, Performance, pastReports, reportColumns} from "../components/dashboard/TenantData";
import { Typography, Button, Affix} from 'antd';

const { Text} = Typography;

export default function DashboardTenant() {

    return (    
        <>
            <div className='flex justify-between'>
            <Title >Dashboard Tenant X </Title>
            <Button type="primary" danger>Delete</Button>
            </div>

            <div className='mb-6 flex justify-between'>
                <Title level={4} type="danger">Due on 04/03/2021</Title>
                <Title level={4} type="danger">3 Days Due</Title> 
            </div>
        
            <div>
                <PerformanceGraph content={Performance}/>

                <div className='mt-12'>
                <Title level={5}>Tenant Expiry:</Title>
                <Title level={5}>Date of Latest Audit:</Title>
                <Title level={5}>Audit Status:</Title>
                </div>

                <Title className='mt-12' level={4}>Past Audits</Title>
                <ScrollList columns={reportColumns} data={pastReports}/>
            </div>

            <div className='flex justify-between'>
                <Button type="primary">Affix bottom</Button>
                <Button type="primary">Affix bottom</Button>
            </div>
        </>
    )
}