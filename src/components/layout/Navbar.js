import { Layout, Typography } from 'antd';
const { Title } = Typography;

export default function Navbar() {
    return (
        <Layout.Header className="bg-white flex items-center">
            <Title level={3} className="mb-0">SingHealth Retail Audit</Title>
        </Layout.Header>
    )
}