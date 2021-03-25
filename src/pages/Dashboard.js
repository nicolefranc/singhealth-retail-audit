import Title from "antd/lib/typography/Title";
import { PageHeader } from 'antd';
import { Redirect } from "react-router";
import DropdownTenantPerformance from "../components/dashboard/DropdownTenantPerformance";
import PerformanceGraph from "../components/dashboard/PerformanceGraph";
import ScrollList from "../components/dashboard/ScrollList";
import {
  PerformanceAll,
  Performance,
  tenantColumns,
  unrectifiedAudits,
  dropdownTenant,
} from "../components/dashboard/TenantData";
import TenantCard from "../components/tenants/TenantCard";
import { routes } from "../const";
import { tokenValidator } from "../utils/tokenValidator";
import DashboardTenant from "./DashBoardTenant";

export default function Dashboard() {
  let validatorResult = tokenValidator(localStorage.getItem("jwt"));

  const isTenant = validatorResult.type === "tenant";
  const isAuditor = validatorResult.type === "auditor";

  return (
    <>
      {isTenant ? (
        <DashboardTenant />
      ) : ( isAuditor ?
        <>
          <Title>Dashboard</Title>
          <div className='mb-10'>
            <DropdownTenantPerformance dropdownTenant={dropdownTenant} />
            {/* <h1 className="mt-20">Unrectified Audits</h1>
            <ScrollList columns={tenantColumns} data={unrectifiedAudits} />
            <h1 className="mt-0">Incomplete Audits</h1>
            <ScrollList columns={tenantColumns} data={unrectifiedAudits} /> */}
          </div>

          <div>
            <div className='m-5' style={{position:'sticky', top:'0', zIndex:'100'}}>
            <Title level={4} className='flex justify-center bg-blue-100 w-full'>Unrectified Audits</Title>
            </div>
            <div style={{overflowX:'hidden', overflowY:'auto', height:'700px', zIndex:'0'}}>
            <TenantCard style={{zIndex:'0'}}></TenantCard>
            </div>
          </div>
          
          <div>
            <div className='m-5' style={{position:'sticky', top:'0', zIndex:'100'}}>
            <Title level={4} className='flex justify-center bg-blue-100'>Incomplete Audits</Title>
            </div>
            <div style={{position:'sticky',top:'30px', overflowX:'hidden', overflowY:'auto', height:'700px', zIndex:'0'}}>
            <TenantCard style={{zIndex:'0'}}></TenantCard>
            </div>
            </div>
          

        </>
      : <div>error</div>) }
    </>
  );
}
