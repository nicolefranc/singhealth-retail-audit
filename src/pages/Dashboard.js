import Title from "antd/lib/typography/Title";
import { Spin } from 'antd';
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
import { PageHeading, PageContent, Section, SectionTitle } from "../components/layout/PageLayout";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_TENANTS_PERFORMANCE } from '../graphql/queries';
import unrectified from "../assets/images/unrectified.png";
import draft from "../assets/images/draft.png";
import { useState } from "react";

const bgColor = { backgroundColor: "#f0f2f5"};

export default function Dashboard() {
  const [draftLength, setDraftLength] = useState(null);
  const [unrectLength, setUnrectLength] = useState(null);
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
    <div>
      {isTenant ? (
        <DashboardTenant />
      ) : ( isAuditor ?
        <>
          <PageHeading title="Dashboard">
            <div className="bg-white p-6 rounded-md shadow-md flex justify-evenly cursor-pointer">
              <a href="#unrectified" className="flex flex-col items-center">
                <div className="flex items-center">
                  <h1 className="text-3xl font-semibold mr-1">{ unrectLength }</h1>
                  <img src={unrectified} alt="Unrectified" width="30" />
                </div>
                <h2 className="uppercase font-medium text-xs">Unrectified</h2>
              </a>
              <a href="#drafts" className="flex flex-col items-center">
                <div className="flex items-center">
                  <h1 className="text-3xl font-semibold mr-1">{ draftLength }</h1>
                  <img src={draft} alt="Unrectified" width="30" />
                </div>
                <h2 className="uppercase font-medium text-xs">Drafts</h2>
              </a>
            </div>
          </PageHeading>
          <PageContent>
            <Section className='mb-10'>
              <DropdownTenantPerformance getAllTenantsPerformance={getAllTenants} />
            </Section>
            <Section>
              <div id="unrectified" className="sticky top-0 z-1 pt-5" style={bgColor}>
              {/* <Title level={4} className='flex justify-center bg-blue-100'>Drafts</Title> */}
                <SectionTitle title="Unrectified Audits" />
              </div>
              <div style={{overflowX:'hidden', overflowY:'auto',  zIndex:'0'}}>
                <ReportCardDashboard status="unrectified" setLength={setUnrectLength} />
              </div>
            </Section>
            
            <Section>
              <div id="drafts" className="sticky top-0 z-1 pt-5" style={bgColor}>
              {/* <Title level={4} className='flex justify-center bg-blue-100'>Drafts</Title> */}
                <SectionTitle title="Drafts" />
              </div>
              <div style={{position:'sticky',top:'30px', overflowX:'hidden', overflowY:'auto',  zIndex:'0'}}>
                <ReportCardDashboard status="draft" setLength={setDraftLength} />
              </div>
            </Section>
          </PageContent>

        </>
      : <div>error</div>) }
    </div>
  );
}
