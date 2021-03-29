import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../const";
import { tokenValidator } from "../../utils/tokenValidator";

export default function MenuItems() {
  const location = useLocation();
  let validatorResult = tokenValidator(localStorage.getItem("jwt"));

  const isAuditor = validatorResult.type === "auditor" || validatorResult.type === "staff" || validatorResult.type === "admin";

  return (
    <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
      <Menu.Item key={routes.DEFAULT} icon={<DashboardOutlined />}>
        <Link to={routes.DEFAULT}>Dashboard</Link>
      </Menu.Item>
      {isAuditor && (
        <Menu.Item key={routes.TENANTS} icon={<UserOutlined />}>
          <Link to={routes.TENANTS}>Tenants</Link>
        </Menu.Item>
      )}
      <Menu.Item key={routes.NOTIFICATIONS} icon={<NotificationOutlined />}>
        <Link to={routes.NOTIFICATIONS}>Notifications</Link>
      </Menu.Item>
      <Menu.Item key={routes.SETTINGS} icon={<SettingOutlined />}>
        <Link to={routes.SETTINGS}>Settings</Link>
      </Menu.Item>
    </Menu>
  );
}
