import { ContactsOutlined, LineChartOutlined, NotificationOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../const";
import { tokenValidator } from "../../utils/tokenValidator";

export default function BottomNav() {
    const location = useLocation();
    let validatorResult = tokenValidator(localStorage.getItem("jwt"));
  
    const isAuditor = validatorResult.type === "auditor" || validatorResult.type === "staff" || validatorResult.type === "admin";
    const iconStyle = { fontSize: '22px', width: '100%' };

    return (
        <div className="bg-white shadow-2xl sticky bottom-0">
            {/* <div className="flex justify-between">
                <Link to={routes.DEFAULT}>
                    <div className="flex flex-col justify-center">
                        <LineChartOutlined className="text-3xl" />
                        <h1 className="uppercase font-medium tracking-wide text-xs">Dashboard</h1>
                    </div>
                </Link>
            </div> */}
            <Menu theme="light" defaultSelectedKeys={[location.pathname]} mode="horizontal"
                className="flex justify-between">
                <Menu.Item key={routes.DEFAULT} className="w-full">
                    <Link to={routes.DEFAULT}>
                        <LineChartOutlined style={iconStyle} />
                    </Link>
                </Menu.Item>
                {isAuditor && (
                    <Menu.Item key={routes.TENANTS} className="w-full">
                    <Link to={routes.TENANTS}><ContactsOutlined style={iconStyle} /></Link>
                    </Menu.Item>
                )}
                <Menu.Item key={routes.NOTIFICATIONS} className="w-full">
                    <Link to={routes.NOTIFICATIONS}><NotificationOutlined style={iconStyle} /></Link>
                </Menu.Item>
                <Menu.Item key={routes.SETTINGS} className="w-full">
                    <Link to={routes.SETTINGS}><SettingOutlined style={iconStyle} /></Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}