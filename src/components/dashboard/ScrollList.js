import { List, Avatar } from 'antd';

export default function ScrollList() {

    const data = [
        {
          title: 'Tenant 1',
        },
        {
          title: 'Tenant 2',
        },
        {
          title: 'Tenant 3',
        },
        {
          title: 'Tenant 4',
        },
      ];

    return(
        <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    )
}