import Title from "antd/lib/typography/Title";
import DropdownTenantPerformance from "../components/dashboard/DropdownTenantPerformance";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import ScrollList from "../components/dashboard/ScrollList";
import {PerformanceAll, Performance, tenantColumns, unrectifiedAudits, dropdownTenant} from "../components/dashboard/TenantData";

export default function Dashboard() {

    return (    
        <>
            <Title>Dashboard</Title>
            
            <div>
                <DropdownTenantPerformance dropdownTenant= {dropdownTenant}/>
                <h1 className='mt-20'>Unrectified Audits</h1>
                <ScrollList columns={tenantColumns} data={unrectifiedAudits}/>
                <h1 className='mt-0'>Incomplete Audits</h1>
                <ScrollList columns={tenantColumns} data={unrectifiedAudits}/>
            </div>
        </>
    )
}