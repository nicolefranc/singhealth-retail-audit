import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const { Content } = Layout;

export default function BaseLayout({ children }) {
    return (
        <Layout className="h-screen">
            <Sidebar />
            <Layout>
                <Navbar />

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
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