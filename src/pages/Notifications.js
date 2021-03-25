import Title from "antd/lib/typography/Title";
import { useState } from "react";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Button, Col, Row, Input, Divider, Spin } from "antd";
import { RESPONSIVE_GUTTER } from "../const";
import {SwipeableList} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { noOp } from '@sandstreamdev/std/function';
import TenantStatusItem from "../components/tenants/TenantStatusItem";
import TenantCard from "../components/tenants/TenantCard";

export default function Notifications() {

    const [checkboxVisibility, setCheckboxVisibility] = useState(null)
    const { data } = useQuery(FETCH_ALL_TENANTS);
    const { getAllTenants } = data ? data : [];

    const toggleCheckbox = () => {
        setCheckboxVisibility(!checkboxVisibility)
    }
    
    return (
        <>
            <Title >Notifications</Title>

            {/* {
                    getAllTenants ? getAllTenants.map((tenant, index) => (
                        <Col key={index} xs={24} md={12} lg={8}>
                            <TenantCard content={tenant} checkboxVisible={checkboxVisibility} />
                        </Col>
                    )) : 
                    <div className="flex w-full justify-center items-center">
                        <Spin tip="Loading..." size="large" />
                    </div>
                } */}
                <div>
            
            {
                    getAllTenants ? getAllTenants.map((tenant, index) => (
                        <SwipeableList>
                            <TenantStatusItem content={tenant} checkboxVisible={checkboxVisibility} />
                        </SwipeableList>
                    )) : 
                    <div className="flex w-full justify-center items-center">
                        <Spin tip="Loading..." size="large" />
                    </div>
                }
                </div>
        </>
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