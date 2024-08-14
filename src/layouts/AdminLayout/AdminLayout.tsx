import { Button, Layout, Menu, theme } from "antd";
import { FC, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";

interface AdminLayoutProps {
  children: React.ReactNode;
}
const { Header, Sider, Content } = Layout;

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex h-[80px] cursor-pointer items-center justify-center text-center">
          <img
            src="/img/logo-airbnb.svg"
            width={40}
            onClick={() => navigate(PATH.HOME)}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname || PATH.ADMIN_USER]}
          onSelect={(item) => {
            navigate(item.key);
          }}
          items={[
            {
              key: PATH.ADMIN_USER,
              icon: <UserOutlined />,
              label: "User Management",
            },
            {
              key: PATH.ADMIN_LOCATION,
              icon: <VideoCameraOutlined />,
              label: "Location Management",
            },
            {
              key: PATH.ADMIN_ROOM,
              icon: <UploadOutlined />,
              label: "Room Management",
            },
            {
              key: PATH.ADMIN_ROOM_BOOKING,
              icon: <SettingOutlined />,
              label: "Room Booking Management",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "scroll",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
