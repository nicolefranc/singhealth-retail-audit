import { Table, Tag } from 'antd';

export default function ScrollList({columns, data}) {

    return(
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 15 }} scroll={{ y: 240 }} />
    )
}