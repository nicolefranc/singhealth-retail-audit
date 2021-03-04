import { Table, Tag } from 'antd';


export var PerformanceAll = [
    {
    month: 'Jan',
    key: 'tenant1',
    score: 125,
    },
    {
    month: 'Jan',
    key: 'tenant2',
    score: 51,
    },
    {
    month: 'Feb',
    key: 'tenant1',
    score: 132,
    },
    {
    month: 'Feb',
    key: 'tenant2',
    score: 91,
    },
    {
    month: 'Mar',
    key: 'tenant1',
    score: 141,
    },
    {
    month: 'Mar',
    key: 'tenant2',
    score: 34,
    },
    {
    month: 'Apr',
    key: 'tenant1',
    score: 158,
    },
    {
    month: 'Apr',
    key: 'tenant2',
    score: 47,
    },
    {
    month: 'May',
    key: 'tenant1',
    score: 133,
    },
    {
    month: 'May',
    key: 'tenant2',
    score: 63,
    },
    {
    month: 'June',
    key: 'tenant1',
    score: 143,
    },
    {
    month: 'June',
    key: 'tenant2',
    score: 58,
    },
    {
    month: 'July',
    key: 'tenant1',
    score: 176,
    },
    {
    month: 'July',
    key: 'tenant2',
    score: 56,
    },
    {
    month: 'Aug',
    key: 'tenant1',
    score: 194,
    },
    {
    month: 'Aug',
    key: 'tenant2',
    score: 77,
    },
    {
    month: 'Sep',
    key: 'tenant1',
    score: 115,
    },
    {
    month: 'Sep',
    key: 'tenant2',
    score: 99,
    },
    {
    month: 'Oct',
    key: 'tenant1',
    score: 134,
    },
    {
    month: 'Oct',
    key: 'tenant2',
    score: 106,
    },
    {
    month: 'Nov',
    key: 'tenant1',
    score: 110,
    },
    {
    month: 'Nov',
    key: 'tenant2',
    score: 88,
    },
    {
    month: 'Dec',
    key: 'tenant1',
    score: 91,
    },
    {
    month: 'Dec',
    key: 'tenant2',
    score: 56,
    },
];

export var Performance = [
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

export var unrectifiedAudits = [];
for (let i = 0; i<30; i++){
    if (i%2 === 0){
    unrectifiedAudits.push({
        key: i,
        tenant: `Tenant ${i}`,
        status: ['Rectified']});
    }
    else if (i%3 === 0){
        unrectifiedAudits.push({
            key: i,
            tenant: `Tenant ${i}`,
            status: ['Unrectified', 'Due']});
    }
    else {
        unrectifiedAudits.push({
            key: i,
            tenant: `Tenant ${i}`,
            status: ['Unrectified']});
    }
}


export const tenantColumns = [
    {
      title: 'Tenant',
      dataIndex: 'tenant',
      width: 150,
      render: tenants => <a>{tenants}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => (
        <>
          {status.map(status => {
            let color = 'blue';
            if (status === 'Due') {
              color = 'volcano';
            }
            else if(status === 'Rectified'){
              color = 'green';
            }
            else if(status ==='Unrectified'){
              color = 'geekblue'
            }
            return (
              <Tag color={color} key={status}>
                {status.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

export var pastReports = [];
for (let i = 0; i<30; i++){
    if (i%2 === 0){
    pastReports.push({
        key: i,
        report: `Report ${i}`,
        date: '17/02/2021',
        status: ['Rectified']});
    }
    else if (i%3 === 0){
        pastReports.push({
            key: i,
            report: `Report ${i}`,
            date: '17/02/2021',
            status: ['Unrectified', 'Due']});
    }
    else {
        pastReports.push({
            key: i,
            report: `Report ${i}`,
            date: '17/02/2021',
            status: ['Unrectified']});
    }
}

export const reportColumns = [
    {
      title: 'Report',
      dataIndex: 'report',
      width: 150,
      render: reports => <a>{reports}</a>,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        width: 150,
      },
    {
      title: 'Status',
      dataIndex: 'status',
      render: status => (
        <>
          {status.map(status => {
            let color = 'blue';
            if (status === 'Due') {
              color = 'volcano';
            }
            else if(status === 'Rectified'){
              color = 'green';
            }
            else if(status ==='Unrectified'){
              color = 'geekblue'
            }
            return (
              <Tag color={color} key={status}>
                {status.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];