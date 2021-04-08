import { useState } from "react";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Button, Col, Row, Input, Divider, Spin } from "antd";
import { SelectOutlined, CloseOutlined, FilterOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { RESPONSIVE_GUTTER } from "../const";
import {SwipeableList} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import TenantCard from "../components/tenants/TenantCard";
import TenantSearchFilter from "../components/tenants/TenantSearchFilter";

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

    if(!data) console.log("nodata");
    if(!getAllTenants) console.log("no tenants");

    // function sortByInstitution(property){
    //     return function(a,b){
    //       if(a[property] > b[property]){
    //         return 1;
    //       }
    //       else if(a[property] < b[property]){
    //         return -1;
    //       }
    //       return 0;
    //     }
    //   }
    
    // getAllTenants.sort(sortByInstitution("institution"))

    return (
        <>
            <Title>Tenants</Title>

            <Divider />

            <div className='mb-4'>
                <TenantSearchFilter tenants={getAllTenants}/>
            </div>

            {/* <Row gutter={16} justify="space-between">
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
                        onClick={toggleCheckbox}>{ checkboxVisibility ? "Cancel" : "Select" }
                    </Button>
                </Col>
            </Row> */}

            <TenantCard/>
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

// <SwipeableList>
//     {getAllTenants.map(({ id, name, institution }) => (
//     <SwipeableListItem
//         key={id}
//         swipeLeft={swipeLeftOptions(name)}
//         swipeRight={swipeRightOptions(name)}
//     >
//         <SwipeListItem
//         description={institution}
//         name={name}
//         />
//     </SwipeableListItem>
//     ))}
// </SwipeableList>