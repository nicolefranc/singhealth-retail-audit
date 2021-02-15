 
import { Layout, Menu } from 'antd';
import { DashboardOutlined, UserOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../const';


export default function Sidebar() {
    let location = useLocation();
    
    return (
        <Layout.Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
            console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
            }}
        >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
                
                <Menu.Item key={routes.DEFAULT} icon={<DashboardOutlined />}>
                    <Link to={routes.DEFAULT}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key={routes.TENANTS} icon={<UserOutlined />}>
                    <Link to={routes.TENANTS}>Tenants</Link>
                </Menu.Item>
                <Menu.Item key={routes.NOTIFICATIONS} icon={<NotificationOutlined />}>
                    <Link to={routes.NOTIFICATIONS}>Notifications</Link>
                </Menu.Item>
                <Menu.Item key={routes.SETTINGS} icon={<SettingOutlined />}>
                    <Link to={routes.SETTINGS}>Settings</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    )
}