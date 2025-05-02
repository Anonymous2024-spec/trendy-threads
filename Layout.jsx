import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  DeliveredProcedureOutlined,
  AppstoreOutlined,
  TagsOutlined,
  SettingOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  theme,
  Avatar,
  Badge,
  ConfigProvider,
} from "antd";

const { Header, Sider, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const siderWidth = collapsed ? 80 : 200;

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: "#fff",
            siderBg: "#ffe4e6",
            lightSiderBg: "#ffe4e6",
            headerBg: "#fff1f2",
            bodyBgColor: "#fff",
            contentBg: "#fff",
          },
          Menu: {
            itemMarginInline: 8, // Reduce spacing between icon and text
            iconMarginInlineEnd: 8, // Reduce space after icon
            itemColor: "#000000", // Dark black text color for menu items
            itemSelectedColor: "#000000", // Dark black for selected item text
            itemHoverColor: "#000000", // Dark black on hover
          },
        },
      }}
    >
      <Layout
        style={{ minHeight: "100vh", maxWidth: "100vw", overflow: "hidden" }}
      >
        {/* Fixed Sider */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            backgroundColor: "#ffe4e6",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            zIndex: 1001,
            overflow: "auto",
            borderRight: "none", // Remove the border that causes the vertical line
          }}
        >
          {/* Logo and Brand Name */}
          <div
            style={{
              height: "64px",
              display: "flex",
              alignItems: "center",
              padding: collapsed ? "0 24px" : "0 16px",
              overflow: "hidden",
              backgroundColor: "#fecdd3",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: collapsed ? "32px" : "40px",
                height: collapsed ? "32px" : "40px",
                borderRadius: "50%",
                backgroundColor: "#f472b6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: collapsed ? "16px" : "20px",
              }}
            >
              ST
            </div>

            {/* Brand Name - Only show when not collapsed */}
            {!collapsed && (
              <div
                style={{
                  marginLeft: "12px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#1f2937",
                  whiteSpace: "nowrap",
                }}
              >
                SheTrendy
              </div>
            )}
          </div>

          <Menu
            mode="inline"
            defaultSelectedKeys={["home"]}
            style={{
              backgroundColor: "#ffe4e6",
              color: "#000000",
              border: "none",
            }}
            items={[
              {
                key: "home",
                icon: <HomeOutlined />,
                label: <Link to="/">Home</Link>,
              },
              {
                key: "products",
                icon: <AppstoreOutlined />,
                label: <Link to="/products">Products</Link>,
              },
              {
                key: "categories",
                icon: <TagsOutlined />,
                label: <Link to="/categories">Categories</Link>,
              },
              {
                key: "cart",
                icon: <ShoppingCartOutlined />,
                label: <Link to="/cart">Cart</Link>,
              },
              {
                key: "orders",
                icon: <DeliveredProcedureOutlined />,
                label: <Link to="/orders">Orders</Link>,
              },
              {
                key: "settings",
                icon: <SettingOutlined />,
                label: <Link to="/settings">Settings</Link>,
              },
            ]}
          />
        </Sider>

        {/* Main layout */}
        <Layout
          style={{
            marginLeft: siderWidth,
            transition: "margin-left 0.2s",
            overflow: "hidden", // Prevent horizontal scrollbar
            maxWidth: `calc(100vw - ${siderWidth}px)`, // Ensure no overflow beyond viewport
          }}
        >
          {/* Fixed Header */}
          <Header
            style={{
              background: "#fff1f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              height: 64,
              position: "fixed",
              top: 0,
              left: siderWidth,
              right: 0,
              zIndex: 1000,
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06)",
              transition: "left 0.2s",
              borderBottom: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  color: "#4b5563",
                }}
              />
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                SheTrendy Admin
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Badge count={3} size="small">
                <BellOutlined style={{ fontSize: "18px", color: "#4b5563" }} />
              </Badge>
              <SettingOutlined style={{ fontSize: "18px", color: "#4b5563" }} />
              <Avatar
                size="small"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#f472b6" }}
              />
            </div>
          </Header>

          {/* Content and Footer */}
          <Layout
            style={{
              background: "#fff",
              border: "none",
              margin: "64px 0 64px 0", // Space for header and footer
              overflow: "hidden", // Prevent scrollbars on the layout
            }}
          >
            <Content
              style={{
                margin: "0",
                padding: 24,
                background: "transparent",
                minHeight: "calc(100vh - 144px)", // Header + Footer + margin
                border: "none", // Remove any border
                overflow: "auto", // Allow content to scroll
              }}
            >
              <Outlet />
            </Content>
          </Layout>

          <Footer
            style={{
              position: "fixed",
              bottom: 0,
              left: siderWidth,
              right: 0,
              height: 64,
              background: "#ffe4e6",
              borderTop: "1px solid rgba(0, 0, 0, 0.03)", // Lighter border
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 24px",
              color: "#1f2937",
              fontWeight: 500,
              transition: "left 0.2s",
              zIndex: 1000,
            }}
          >
            <div>© 2025 SheTrendy</div>
            <div style={{ display: "flex", gap: "12px" }}>
              {/* Optional: add Ant Design icons for social links */}
              {/* Example: <InstagramOutlined />, <FacebookOutlined /> */}
            </div>
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppLayout;
