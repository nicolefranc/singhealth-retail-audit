import Title from "antd/lib/typography/Title";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import ScrollList from "../components/dashboard/ScrollList";
import {PerformanceAll, Performance, pastReports, reportColumns} from "../components/dashboard/TenantData";
import { Typography, Button, Popconfirm, message, Layout } from 'antd';

const { Footer, Content } = Layout;
const { Text } = Typography;

export default function TenantDetail() {

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

            <div className='justify-between flex'>

                <div className='fab-container' style={{width: '30%'}}>
                    <Button className='ml-16' shape='round' size='large' type="primary" block={true}>Audit</Button> 
                </div>

                <div className='fab-container-right mr-16' style={{width: '30%'}}>
                    <Button shape='round' size='large' type="primary" block={true}>Notify</Button> 
                </div>  

            </div>
        </>
    )
}