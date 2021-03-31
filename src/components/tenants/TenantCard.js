import gql from 'graphql-tag';
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { Spin,Empty } from "antd";
import {SwipeableList} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import TenantListItem from "./TenantListItem";


export default function TenantCard({incomplete, unrectified}) {

    const [checkboxVisibility, setCheckboxVisibility] = useState(null)
    const { data } = useQuery(FETCH_ALL_TENANTS);
    const { getAllTenants } = data ? data : [];

    const toggleCheckbox = () => {
        setCheckboxVisibility(!checkboxVisibility)
    }

    if (unrectified == true){
        //getAllTenants.status.rectification
    }

    if(incomplete == true){
        //getAlltenants.status.draft??
    }

    return (
        <div>
            {
                getAllTenants ? getAllTenants.map((tenant) => (
                    <SwipeableList>
                        <TenantListItem content={tenant} checkboxVisible={checkboxVisibility} />
                    </SwipeableList>
                )) : 
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <span>No Tenants Found</span>
                    }
                />
                // <div className="flex w-full justify-center items-center">
                //     <Spin tip="Loading..." size="large" />
                // </div>
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