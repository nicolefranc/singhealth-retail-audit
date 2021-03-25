export  var reports =[
    {
        id: 1,
        type: 'fnb',
        dateCreated: '25/3/2021',
        status:'Unrectified (Due 30/5/2021)',
        extStatus: 'Extension Request',
    },
    {
        id: 2,
        type: 'fnb',
        dateCreated: '25/2/2021',
        status:'Rectified',
        extStatus: '',
    }
]    
    

// export var pastReports = [];
// for (let i = 0; i<30; i++){
//     if (i%2 === 0){
//     pastReports.push({
//         key: i,
//         report: `Report ${i}`,
//         date: '17/02/2021',
//         status: ['Rectified']});
//     }
//     else if (i%3 === 0){
//         pastReports.push({
//             key: i,
//             report: `Report ${i}`,
//             date: '17/02/2021',
//             status: ['Unrectified', 'Due']});
//     }
//     else {
//         pastReports.push({
//             key: i,
//             report: `Report ${i}`,
//             date: '17/02/2021',
//             status: ['Unrectified']});
//     }
// }

// export const reportColumns = [
//     {
//       title: 'Report',
//       dataIndex: 'report',
//       width: 150,
//       render: reports => <a>{reports}</a>,
//     },
//     {
//         title: 'Date',
//         dataIndex: 'date',
//         width: 150,
//       },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       render: status => (
//         <>
//           {status.map(status => {
//             let color = 'blue';
//             if (status === 'Due') {
//               color = 'volcano';
//             }
//             else if(status === 'Rectified'){
//               color = 'green';
//             }
//             else if(status ==='Unrectified'){
//               color = 'geekblue'
//             }
//             return (
//               <Tag color={color} key={status}>
//                 {status.toUpperCase()}
//               </Tag>
//             );
//           })}
//         </>
//       ),
//     },
//   ];