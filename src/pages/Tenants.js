import { useState } from "react";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Button, Col, Row, Input, Divider, Spin, Result } from "antd";
import { SelectOutlined, CloseOutlined, FilterOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import TenantCard from "../components/tenants/TenantCard";
import { RESPONSIVE_GUTTER, routes } from "../const";

import {
    SwipeableList,
    SwipeableListItem
  } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { noOp } from '@sandstreamdev/std/function';
import SwipeListItem from '../components/swipe/SwipeListItem';
import SwipeContent from '../components/swipe/SwipeContent';
import { Link } from "react-router-dom";


const { Search } = Input;

export default function Tenants() {
    const [checkboxVisibility, setCheckboxVisibility] = useState(null)
    const { loading, error, data } = useQuery(FETCH_ALL_TENANTS);
    
    if (loading) return (
        <div className="flex w-full justify-center items-center">
            <Spin tip="Loading..." size="large" />
        </div> 
    )

    else if (error) {
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={<Link to={routes.TENANTS}><Button type="primary">Refresh</Button></Link>}
        />
    }

    const { getAllTenants } = data;

    const toggleCheckbox = () => {
        setCheckboxVisibility(!checkboxVisibility)
    }

    const onSearch = value => {
        console.log(value);
    }

    // const handleSwipe=()=>{
    //     window.open("../components/checklist/ChecklistTemplates");
    // }

    const swipeRightOptions = () => ({
    content: (
        <SwipeContent
        label="Notify"
        position="left"
        />
    ),
    action: noOp
    });
    
    const swipeLeftOptions = () => ({
    content: (
        <SwipeContent
        label="Audit"
        position="right"
        />
    ),
    action: noOp
    });

    return (
        <>
            <Title>Tenants</Title>

            <Divider />

            <Row gutter={16} justify="space-between">
                <Col className="mb-4">
                    <Search
                        placeholder="Search a tenant"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                    />
                </Col>
                <Col className="mb-4">
                    <Button icon={<FilterOutlined />} type="text" size="large">Filter</Button>
                    <Button icon={checkboxVisibility ? <CloseOutlined /> : <SelectOutlined />} size="large"
                    onClick={toggleCheckbox}>{ checkboxVisibility ? "Cancel" : "Select" }</Button>
                </Col>
            </Row>

            {/* className="size-to-content-swipeable-list__container" */}
            <Row gutter={RESPONSIVE_GUTTER} justify="center" className="w-full ml-6">
                {
                    <SwipeableList>
                        {getAllTenants.map(({ id, name, institution }) => (
                        <SwipeableListItem
                            key={id}
                            swipeLeft={swipeLeftOptions(name)}
                            swipeRight={swipeRightOptions(name)}
                        >
                            <SwipeListItem
                            description={institution}
                            name={name}
                            />
                        </SwipeableListItem>
                        ))}
                    </SwipeableList>
                }
            </Row>
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

// getAllTenants ? getAllTenants.map((tenant, index) => (
//     <Col key={index} xs={24} md={12} lg={8}>
//         <TenantCard content={tenant} checkboxVisible={checkboxVisibility} />
//     </Col>
// )) : 
// <div className="flex w-full justify-center items-center">
//     <Spin tip="Loading..." size="large" />
// </div>