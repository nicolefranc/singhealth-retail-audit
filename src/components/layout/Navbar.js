import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout, Typography } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useState } from 'react';
import MenuItems from './MenuItems';
const { Title } = Typography;

export default function Navbar() {
    const [toggle, setToggle] = useState(false);
    const breakpoint = useBreakpoint();

    return (
        <>
            <Layout.Header className="bg-white flex items-center justify-between"
                style={{ padding: "0 28px" }}>
                <Title level={5} className="mb-0 uppercase">SingHealth Retail Audit</Title>
                <div>
                    { !breakpoint.lg 
                        && <Button type="text" icon={<MenuOutlined />} onClick={() => setToggle(!toggle)} /> }
                </div>
            </Layout.Header>
            <Drawer
                id="nav-drawer"
                title="Menu"
                placement="right"
                closable={true}
                onClick={() => setToggle(false)}
                visible={toggle}
                key="right"
                className="p-0"
            >
            <MenuItems />
            </Drawer>
        </>
    )
}