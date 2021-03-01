import Title from "antd/lib/typography/Title";
import DropdownTenant from "../components/dashboard/DropdownTenant";
import PerformanceGraph from "../components/dashboard/PerformanceGraph"
import ScrollList from "../components/dashboard/ScrollList";


export default function Dashboard() {

    const chooseType= "all";

    //data for 1
    var tenantData = [
        { month: 'January', score: 3 },
        { month: 'Febuary', score: 4 },
        { month: 'March', score: 3.5 },
        { month: 'April', score: 5 },
        { month: 'May', score: 4.9 },
        { month: 'June', score: 4.9 },
        { month: 'July', score: 4.9 },
        { month: 'August', score: 4.9 },
        { month: 'September', score: 4.9 },
        { month: 'October', score: 4.9 },
        { month: 'November', score: 4.9 },
        { month: 'December', score: 4.9 }
    ];
  
    //data for all
    var tenantDataAll = [
        {
        month: 'Jan',
        key: 'series1',
        score: 125,
        },
        {
        month: 'Jan',
        key: 'series2',
        score: 51,
        },
        {
        month: 'Feb',
        key: 'series1',
        score: 132,
        },
        {
        month: 'Feb',
        key: 'series2',
        score: 91,
        },
        {
        month: 'Mar',
        key: 'series1',
        score: 141,
        },
        {
        month: 'Mar',
        key: 'series2',
        score: 34,
        },
        {
        month: 'Apr',
        key: 'series1',
        score: 158,
        },
        {
        month: 'Apr',
        key: 'series2',
        score: 47,
        },
        {
        month: 'May',
        key: 'series1',
        score: 133,
        },
        {
        month: 'May',
        key: 'series2',
        score: 63,
        },
        {
        month: 'June',
        key: 'series1',
        score: 143,
        },
        {
        month: 'June',
        key: 'series2',
        score: 58,
        },
        {
        month: 'July',
        key: 'series1',
        score: 176,
        },
        {
        month: 'July',
        key: 'series2',
        score: 56,
        },
        {
        month: 'Aug',
        key: 'series1',
        score: 194,
        },
        {
        month: 'Aug',
        key: 'series2',
        score: 77,
        },
        {
        month: 'Sep',
        key: 'series1',
        score: 115,
        },
        {
        month: 'Sep',
        key: 'series2',
        score: 99,
        },
        {
        month: 'Oct',
        key: 'series1',
        score: 134,
        },
        {
        month: 'Oct',
        key: 'series2',
        score: 106,
        },
        {
        month: 'Nov',
        key: 'series1',
        score: 110,
        },
        {
        month: 'Nov',
        key: 'series2',
        score: 88,
        },
        {
        month: 'Dec',
        key: 'series1',
        score: 91,
        },
        {
        month: 'Dec',
        key: 'series2',
        score: 56,
        },
    ];

    return (    
        <>
            <Title>Dashboard</Title>

            <div>
                <DropdownTenant />
                <PerformanceGraph content={tenantDataAll} type={chooseType}/>
                <h1 className='mt-6'>Unrectified Audits</h1>
                <ScrollList/>
                <h1 className='mt-6'>Incomplete Audits</h1>
                <ScrollList/>
            </div>
        </>
    )
}