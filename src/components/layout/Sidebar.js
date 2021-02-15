 
import { Layout, Menu } from 'antd';
import { DashboardOutlined, UserOutlined, NotificationOutlined, SettingOutlined } from '@ant-design/icons';


export default function Sidebar() {
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
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                Dashboard
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                Tenants
                </Menu.Item>
                <Menu.Item key="3" icon={<NotificationOutlined />}>
                Notifications
                </Menu.Item>
                <Menu.Item key="9" icon={<SettingOutlined />}>
                Settings
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    )
}