import gql from 'graphql-tag';
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { Spin,Empty } from "antd";
import {SwipeableList} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import TenantListItem from "./TenantListItem";


export default function TenantCard({ status }) {

    const [checkboxVisibility, setCheckboxVisibility] = useState(null)
    // TODO: Query report by auditor and status
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