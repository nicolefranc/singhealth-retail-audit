import {Timeline, Alert} from 'antd';
import Title from 'antd/lib/typography/Title';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import { useParams } from "react-router";

export default function Status({status}){ //takes in status.rectified and requestEx 

    // const tenantQuery = useQuery(FETCH_TENANT, {
    //     variables: { tenantId }
    // });
    // const { tenantId } = useParams();

    /*
    for states 
    */
   let unrectifiedAudits = true;
   let requestExtension = true; 


   if (unrectifiedAudits){
    
   }

   if (requestExtension){

   }

    return(
        <>

    <Title className='mb-2'>
        Tenant X
    </Title>

    <div className='mb-4'>

    <Alert className='mb-3'
      message="Reminder"
      description="Rectification due Tomorrow" //yet to pass due date
      type="info"
      showIcon
    />
    <Alert
      message="Warning"
      description="Audit Incomplete" //passed due date or no approval
      type="error"
      showIcon
    />

    </div >

    <div className="bg-white w-full">

    <Timeline mode="alternate" className='p-8 mb-10'>
        <div className='mt-5'/>
        {/* .map status here for timeline.item */}
        <Timeline.Item color="green">Extension Approved on 19/03/2021</Timeline.Item>
        <Timeline.Item color="green">Extension Requested on 17/03/2021</Timeline.Item>
        <Timeline.Item color="blue">Rectification Due on 25/03/2021</Timeline.Item>
        <Timeline.Item color="green">Audited</Timeline.Item>
  </Timeline>

  </div>

  </>
    )
}

const FETCH_TENANT = gql`
    query($tenantId: String!) {
        getTenantById(id: $tenantId) {
            id
            name
            institution
        }
    }
`