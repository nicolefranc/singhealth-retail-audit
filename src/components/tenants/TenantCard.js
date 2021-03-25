import gql from 'graphql-tag';
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { Button, Col, Row, Input, Divider, Spin } from "antd";
import {SwipeableList} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import TenantListItem from "./TenantListItem";

//REPLACED BY TENANTLISTITEM
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
                    getAllTenants ? getAllTenants.map((tenant, index) => (
                        <SwipeableList>
                            <TenantListItem content={tenant} checkboxVisible={checkboxVisibility} />
                        </SwipeableList>
                    )) : 
                    <div className="flex w-full justify-center items-center">
                        <Spin tip="Loading..." size="large" />
                    </div>
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