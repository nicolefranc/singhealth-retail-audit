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