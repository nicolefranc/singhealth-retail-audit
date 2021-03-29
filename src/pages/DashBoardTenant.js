import Title from "antd/lib/typography/Title";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import ScrollList from "../components/dashboard/ScrollList";
import {PerformanceAll, Performance, pastReports, reportColumns} from "../components/dashboard/TenantData";
import { Typography, Button, Popconfirm, message } from 'antd';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Pdf from "../components/checklist/Pdf";

const { Text} = Typography;

export default function DashboardTenant() {

    function confirm(e) {
        console.log(e);
        message.success('Tenant Deleted');
      }

    const tenantId = "";

    const data = useQuery(FETCH_REPORT_BY_TENANTID, {variables: tenantId})

    console.log(data);

    const checklistData = [
        {
           categoryName: 'cat 1',
           total: 98,
           subcategories: [
              {
                 subcategoryName: 'subcat 1 under cat 1',
                 lineItems: [
                    {
                       lineItemName: 'line item 1 under subcat 1',
                       lineItemName1: 'line item 2 under subcat 1'
                    },
                 ]
              },
  
              {
                 subcategoryName: 'subcat 2 under cat 1',
                 lineItems: [
                    {
                       lineItemName: 'line item 1 under subcat 2',
                       lineItemName1: 'line item 2 under subcat 2'
                    }
                 ]
              }
           ]
        }
     ]

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
            
            <Pdf checklistData={data}/>

            {/* <Pdf checklistData={checklistData}/> */}
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

