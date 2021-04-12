import Title from "antd/lib/typography/Title";
import { PageHeader, Spin } from 'antd';
import { Redirect } from "react-router";
import DropdownTenantPerformance from "../components/dashboard/DropdownTenantPerformance";
import PerformanceGraph from "../components/dashboard/PerformanceGraph";
import ScrollList from "../components/dashboard/ScrollList";
import {dropdownTenant} from "../components/dashboard/TenantData";
import TenantCard from "../components/tenants/TenantCard";
import { routes } from "../const";
import { tokenValidator } from "../utils/tokenValidator";
import DashboardTenant from "./DashBoardTenant";
import ReportCardDashboard from "../components/dashboard/ReportCardDashboard";
import { Section, SectionTitle } from "../components/layout/PageLayout";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_TENANTS_PERFORMANCE, FETCH_ALL_TENANT_PERFORMANCE } from '../graphql/queries';

const bgColor = { backgroundColor: "#f0f2f5"};

export default function Dashboard() {

  let validatorResult = tokenValidator(localStorage.getItem("jwt"));

  const isTenant = validatorResult.type === "tenant";
  const isAuditor = ["auditor","admin"].includes(validatorResult.type);

  const { loading, error, data } = useQuery(FETCH_ALL_TENANTS_PERFORMANCE);

  if (loading) return <Spin size="large" />

  else if(error) {
      return <div>{ JSON.stringify(error) }</div>
  }

  const { getAllTenants } = data ;
  console.log("getAlltenantPerformance", getAllTenants)

  return (
    <>
      {isTenant ? (
        <DashboardTenant />
      ) : ( isAuditor ?
        <>
          <Title>Dashboard</Title>
          <Section className='mb-10'>
            <DropdownTenantPerformance getAllTenantsPerformance={getAllTenants} />
          </Section>
          <Section>
            <div className="sticky top-0 z-1 pt-5" style={bgColor}>
            {/* <Title level={4} className='flex justify-center bg-blue-100'>Drafts</Title> */}
              <SectionTitle title="Unrectified Audits" />
            </div>
            <div style={{overflowX:'hidden', overflowY:'auto',  zIndex:'0'}}>
              <ReportCardDashboard status="unrectified"/>
            </div>
          </Section>
          
          <Section>
            <div className="sticky top-0 z-1 pt-5" style={bgColor}>
            {/* <Title level={4} className='flex justify-center bg-blue-100'>Drafts</Title> */}
              <SectionTitle title="Drafts" />
            </div>
            <div style={{position:'sticky',top:'30px', overflowX:'hidden', overflowY:'auto',  zIndex:'0'}}>
              <ReportCardDashboard status="draft"/>
            </div>
          </Section>
          

        </>
      : <div>error</div>) }
    </>
  );
}
