import { Layout, Typography } from 'antd';
const { Title } = Typography;

export default function Navbar() {
    return (
        <Layout.Header className="bg-white flex items-center">
            <Title level={5} className="mb-0 uppercase">SingHealth Retail Audit</Title>
        </Layout.Header>
    )
}