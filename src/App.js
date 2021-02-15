import './App.css';
import { Layout } from 'antd';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';

const { Content } = Layout;

function App() {
	return (
		<>
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
						Content
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</>
	);
}

export default App;
