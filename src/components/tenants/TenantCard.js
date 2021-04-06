import gql from 'graphql-tag';
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { Spin,Empty } from "antd";
import {SwipeableList} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { FETCH_REPORT_BY_AUDITOR_STATUS } from "../../graphql/queries";
import TenantListItem from "./TenantListItem";


export default function TenantCard({ status }) {

    const [checkboxVisibility, setCheckboxVisibility] = useState(null)

    // TODO: Query report by auditor and status
    // const { auditorId } = useParams();
    // const { loading, error, data } = useQuery(FETCH_REPORT_BY_AUDITOR_STATUS, {
    //     variables: { getReportByAuditorAndStatusAuditorId: auditorId, getReportByAuditorAndStatusStatus: 'audited' }
    // });
    // const { getReportByAuditorAndStatus } = data ? data : [];
    // const latestReport = getReportByAuditorAndStatus[0];
    // console.log(latestReport);
    
    const { loading, error, data } = useQuery(FETCH_ALL_TENANTS);
    const { getAllTenants } = data ? data : [];

    if(loading || error) {
        return (
            <div className="flex w-full justify-center items-center">
                    <Spin tip="Loading..." size="large" />
            </div>
        );
    }
    if(!data) {
        return (
            <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <span>No Tenants Found</span>
                }
            />
        );
    }

    return (
        <div className="z-0">
            {
                getAllTenants.map((tenant, index) => (
                    <SwipeableList key={index}>
                        <TenantListItem content={tenant} checkboxVisible={checkboxVisibility} />
                    </SwipeableList>
                )) 
            }
        </div>
    )
}

const FETCH_ALL_TENANTS = gql`
    query fetchAllTenants {
        getAllTenants {
            id
            name
            institution
        }
    }
`