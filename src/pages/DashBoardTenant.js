import Title from "antd/lib/typography/Title";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import ScrollList from "../components/dashboard/ScrollList";
import {PerformanceAll, Performance, pastReports, reportColumns} from "../components/dashboard/TenantData";
import { Typography, Button, Popconfirm, message } from 'antd';

import Pdf from "../components/checklist/Pdf";

const { Text} = Typography;

export default function DashboardTenant() {

    function confirm(e) {
        console.log(e);
        message.success('Tenant Deleted');
      }

    return (    
        <>
            <div id= "test" className='flex justify-between'>
            <Title >Dashboard Tenant X </Title>
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
            <Pdf checklistData={{somth: "smth", total: 98, item1: "not dusty", item1score: 1, item2: "not wet", item2score: 0}}/>
        </>
    )
}