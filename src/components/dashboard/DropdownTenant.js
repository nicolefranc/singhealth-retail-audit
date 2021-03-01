import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function DropdownTenant() {

    const onClick = ({ key }) => {
        message.info(`Click on Tenant ${key}`);
      };
      
      const menu = (
        <Menu onClick={onClick}>
          <Menu.Item key="1">Tenant 1</Menu.Item>
          <Menu.Item key="2">Tenant 2</Menu.Item>
          <Menu.Item key="3">Tenant 3</Menu.Item>
        </Menu>
      );

    return(
        <div className='mb-6'>
        <Dropdown overlay={menu}>
        <a className="dropdownTenant" onClick={e => e.preventDefault()}>
      Tenant <DownOutlined />
      </a>
  </Dropdown> 
  </div>
    )
}