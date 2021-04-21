import { useState } from "react";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Button, Col, Row, Input, Divider, Spin, Tabs } from "antd";
import { SelectOutlined, CloseOutlined, FilterOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { RESPONSIVE_GUTTER } from "../const";
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import TenantCard from "../components/tenants/TenantCard";
import TenantSearchFilter from "../components/tenants/TenantSearchFilter";
import { PageContent, PageHeading, Section, SectionTitle } from "../components/layout/PageLayout";
import { useMemo } from "react";
import { tokenValidator } from "../utils/tokenValidator";

const { Search } = Input;

export default function Tenants() {
    const [checkboxVisibility, setCheckboxVisibility] = useState(null)

    let user = tokenValidator(localStorage.getItem("jwt"));

    const { data , loading, error} = useQuery(FETCH_ALL_TENANTS, { variables: { getTenantsByAuditorAuditorId: user.id }});
    
    const allTenants = useMemo(() => {
        const tenantsByInstitution = {};
        data?.getAllTenants.map(tenant => {
            let exists = Object.keys(tenantsByInstitution).includes(tenant.institution);
            console.log(`exists ${exists}`);
            tenantsByInstitution[tenant.institution] = exists ? [...tenantsByInstitution[tenant.institution], tenant] : [tenant]
        })

        console.log('Tenants Institution');
        console.log(tenantsByInstitution);
        return tenantsByInstitution;
    }, [data])

    const ownTenants = useMemo(() => {
        const tenantsByInstitution = {};
        data?.getTenantsByAuditor.map(tenant => {
            let exists = Object.keys(tenantsByInstitution).includes(tenant.institution);
            console.log(`exists ${exists}`);
            tenantsByInstitution[tenant.institution] = exists ? [...tenantsByInstitution[tenant.institution], tenant] : [tenant]
        })

        console.log('Tenants Institution');
        console.log(tenantsByInstitution);
        return tenantsByInstitution;
    }, [data])
    
    if (loading) return <Spin size="large" />

    else if(error) {
        return <div>{ JSON.stringify(error) }</div>
    }

    const { getAllTenants, getTenantsByAuditor } = data;
    const toggleCheckbox = () => {
        setCheckboxVisibility(!checkboxVisibility)
    }

    console.log('dataaa');
    console.log(ownTenants);

    return (
        <>
            
            <PageHeading title="Tenants">
                <TenantSearchFilter tenants={getAllTenants}/>
            </PageHeading>
            <PageContent>
                <Tabs defaultActiveKey="0">
                    <Tabs.TabPane tab="Your Institution(s)" key="0">
                        { Object.keys(ownTenants).map((institution, idx) => (
                            <Section>
                                <SectionTitle title={institution} />
                                <TenantCard tenants={ownTenants[institution]} />
                            </Section>
                        ))}
                    </Tabs.TabPane>)
                    { Object.keys(allTenants).map((institution, idx) => 
                        <Tabs.TabPane tab={institution} key={idx + 1}>
                            <TenantCard tenants={allTenants[institution]} />
                        </Tabs.TabPane>) }
                </Tabs>
            </PageContent>
        </>
    )
}

const FETCH_ALL_TENANTS = gql`
    query ($getTenantsByAuditorAuditorId: String!) {
        getAllTenants {
            id
            name
            type
            institution
        }
        getTenantsByAuditor(auditorId: $getTenantsByAuditorAuditorId) {
            id
            name
            type
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