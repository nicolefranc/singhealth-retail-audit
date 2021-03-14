 
import { Layout } from 'antd';
import MenuItems from './MenuItems';


export default function Sidebar() {
    
    return (
        <Layout.Sider
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
        >
            <div className="logo" />
            <MenuItems />
        </Layout.Sider>
    )
}