import Title from "antd/lib/typography/Title";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import ScrollList from "../components/dashboard/ScrollList";
import {PerformanceAll, Performance, pastReports, reportColumns} from "../components/dashboard/TenantData";
import { Typography, Button, Popconfirm, message } from 'antd';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Pdf from "../components/audit/Pdf";

const { Text} = Typography;

export default function DashboardTenant() {

    function confirm(e) {
        console.log(e);
        message.success('Tenant Deleted');
      }

    const tenantId = "";

    const data = useQuery(FETCH_REPORT_BY_TENANTID, {variables: tenantId})

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

                <div className='mt-12' style={{justifyContent:'center'}}>
                <Title level={5}>Tenant Expiry:</Title>
                <Title level={5}>Date of Latest Audit:</Title>
                <Title level={5}>Audit Status:</Title>
                </div>

                <Title className='mt-12' level={4}>Past Audits</Title>
                <ScrollList columns={reportColumns} data={pastReports}/>
            </div>
            
            {/* <Pdf checklistData={data}/> */}

            <Pdf checklistData={{somth: "smth", total: 98, item1: "not dusty", item1score: 1, item2: "not wet", item2score: 0}}/>
        </>
    )
}

const FETCH_REPORT_BY_TENANTID = gql`
    query($tenantId: String!){
        getLatestReportByTenantId(tenantId: $tenantId) {
            type
            checklist {
                category
                weightage
                score
                subcategories {
                    subcategory
                    subcatScore
                    lineItems {
                    lineItem
                    complied
                    images {
                        nonCompliances
                        nonComplRemarks
                        rectifications
                        rectRemarks
                    }
                    }
                }
            }
        }
    }
`