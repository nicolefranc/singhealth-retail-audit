import { Table, Tag } from 'antd';
import { unrectifiedAudits } from './TenantData';


export default function ScrollList() {

    const columns = [
      {
        title: 'Tenant',
        dataIndex: 'tenant',
        width: 150,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
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

    return(
      <Table columns={columns} dataSource={unrectifiedAudits} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
    )
}