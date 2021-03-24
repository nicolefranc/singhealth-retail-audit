import Title from "antd/lib/typography/Title";
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
import { routes } from "../const";
import { tokenValidator } from "../utils/tokenValidator";
import DashboardTenant from "./DashBoardTenant";

export default function Dashboard() {
  let validatorResult = tokenValidator(localStorage.getItem("jwt"));

  const isTenant = validatorResult.type === "tenant";
  const isAuditor = ["auditor","admin"].includes(validatorResult.type);

  return (
    <>
      {isTenant ? (
        <DashboardTenant />
      ) : ( isAuditor ?
        <>
          <Title>Dashboard</Title>
          <div>
            <DropdownTenantPerformance dropdownTenant={dropdownTenant} />
            <h1 className="mt-20">Unrectified Audits</h1>
            <ScrollList columns={tenantColumns} data={unrectifiedAudits} />
            <h1 className="mt-0">Incomplete Audits</h1>
            <ScrollList columns={tenantColumns} data={unrectifiedAudits} />
          </div>
        </>
      : <div>error</div>) }
    </>
  );
}
