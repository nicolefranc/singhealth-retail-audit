import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import BottomNav from './BottomNav';

const { Header, Content } = Layout;

export default function BaseLayout({ children }) {
    const breakpoint = useBreakpoint();

    if (breakpoint.lg)
        return (
            <Layout>
                <Sidebar />
                <Layout style={breakpoint.lg ? { marginLeft: '200px' } : {}}>
                    <Navbar />

                    <Layout style={{ padding: '0 14px 14px' }}>
                        <Content
                        style={{
                            padding: 14,
                            margin: 0,
                            minHeight: '100vh',
                        }}
                        >
                            { children }
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )

    return (
        <Layout>
            {/* <Header>Header</Header> */}
            <Content
                // style={{
                //     padding: 14,
                //     margin: 0,
                //     minHeight: '100vh',
                // }}
                className="m-0 min-h-screen"
            >
                { children }
            </Content>
            <BottomNav />
        </Layout>
    )
}