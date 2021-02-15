 
import { Layout } from 'antd';
import MenuItems from './MenuItems';


export default function Sidebar() {
    
    return (
        <Layout.Sider
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
        >
            <div className="logo" />
            <MenuItems />
        </Layout.Sider>
    )
}