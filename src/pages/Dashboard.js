import Title from "antd/lib/typography/Title";
import DropdownTenant from "../components/dashboard/DropdownTenant";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import ScrollList from "../components/dashboard/ScrollList";
import {PerformanceAll, Performance} from "../components/dashboard/TenantData";

export default function Dashboard() {

    const chooseType= "all";

    return (    
        <>
            <Title>Dashboard</Title>

            <div>
                <DropdownTenant />
                <PerformanceGraph content={PerformanceAll} type={chooseType}/>
                <h1 className='mt-20' >Unrectified Audits</h1>
                <ScrollList/>
                <h1 className='mt-0'>Incomplete Audits</h1>
                <ScrollList/>
            </div>
        </>
    )
}