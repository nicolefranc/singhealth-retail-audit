import { useState } from "react";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Button, Col, Row, Input, Divider, Skeleton, Spin } from "antd";
import { SelectOutlined, CloseOutlined, FilterOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import TenantCard from "../components/tenants/TenantCard";
import { RESPONSIVE_GUTTER } from "../const";

const { Search } = Input;

export default function Tenants() {
    const [checkboxVisibility, setCheckboxVisibility] = useState(null)
    const { data } = useQuery(FETCH_ALL_TENANTS);
    const { getAllTenants } = data ? data : [];

    const toggleCheckbox = () => {
        setCheckboxVisibility(!checkboxVisibility)
    }

    const onSearch = value => {
        console.log(value);
    }

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
            
            <Row gutter={RESPONSIVE_GUTTER} justify="start" align="middle">
                {
                    getAllTenants ? getAllTenants.map((tenant, index) => (
                        <Col key={index} xs={24} md={12} lg={8}>
                            <TenantCard content={tenant} checkboxVisible={checkboxVisibility} />
                        </Col>
                    )) : 
                    <div className="flex w-full justify-center items-center">
                        <Spin tip="Loading..." size="large" />
                    </div>
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