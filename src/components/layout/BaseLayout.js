import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { Content } = Layout;

export default function BaseLayout({ children }) {
    const breakpoint = useBreakpoint();

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
                        minHeight: 280,
                    }}
                    >
                        { children }
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}