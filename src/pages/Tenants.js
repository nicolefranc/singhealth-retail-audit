import { useState } from "react";
import { Button, Col, Row, Input, Divider } from "antd";
import { SelectOutlined, CloseOutlined, FilterOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import TenantCard from "../components/tenants/TenantCard";
import { RESPONSIVE_GUTTER, routes } from "../const";
import { Link } from "react-router-dom";

const tenants = [
    {
        name: "Tenant 1",
        date: "29 April 2021",
        status: "Due"
    },
    {
        name: "Tenant 2",
        date: "22 March 2021",
        status: "Unrectified"
    },
    {
        name: "Tenant 3",
        date: "22 June 2021",
        status: "Rectified"
    },
]

const { Search } = Input;

export default function Tenants() {
    const [checkboxVisibility, setCheckboxVisibility] = useState(null)

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
                    tenants.map((tenant, index) => (
                        <Col key={index} xs={24} md={12} lg={8}>
                            <TenantCard content={tenant} checkboxVisible={checkboxVisibility} />
                        </Col>
                    ))
                }
            </Row>

            <Link to={routes.TEMPLATES}> 
                <Button className="bg-orange text-white">Audit</Button>
            </Link>
            
        </>
    )
}