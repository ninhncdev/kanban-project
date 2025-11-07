import React, { useState, useEffect } from "react";
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TeamOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider } = Layout;

type UserRole = "admin" | "staff" | "customer";

interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
  roles: UserRole[];
  children?: MenuItem[];
}

interface SiderComponentProps {
  role: UserRole;
  onLogout?: () => void;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SiderComponent = ({
  role,
  onLogout,
  collapsed,
  setCollapsed,
}: SiderComponentProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      key: "/iventory",
      icon: <DashboardOutlined />,
      label: "Iventory",
      roles: ["admin", "staff", "customer"],
      children: [
        {
          key: "/iventory",
          icon: <BarChartOutlined />,
          label: "Overview",
          roles: ["admin", "staff", "customer"],
        },
        {
          key: "/iventory/statistics",
          icon: <PieChartOutlined />,
          label: "Statistics",
          roles: ["admin", "staff"],
        },
      ],
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: "Users",
      roles: ["admin", "staff"],
    },
    {
      key: "/orders",
      icon: <ShoppingOutlined />,
      label: "Orders",
      roles: ["admin", "staff"],
    },
    {
      key: "/suppliers",
      icon: <FileTextOutlined />,
      label: "Suppliers",
      roles: ["admin"],
    },
    {
      key: "/team",
      icon: <TeamOutlined />,
      label: "Team",
      roles: ["admin", "staff"],
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      roles: ["admin"],
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      roles: ["admin", "staff", "customer"],
    },
  ];

  const filterMenuByRole = (items: MenuItem[]): MenuItem[] =>
    items
      .filter((item) => item.roles.includes(role))
      .map((item) => ({
        ...item,
        children: item.children ? filterMenuByRole(item.children) : undefined,
      }));

  const filteredItems = filterMenuByRole(menuItems);

  const onMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "/logout") {
      onLogout?.();
      return;
    }
    navigate(e.key);
  };

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed") === "true";
    setCollapsed(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  return (
    <Sider
      width={220}
      collapsed={collapsed}
      collapsible
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        minHeight: "100vh",
        background: "#fff",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        left: 0,
        overflowY: "auto",
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "0" : "0 16px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        {!collapsed && (
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 600,
              color: "#1677ff",
              whiteSpace: "nowrap",
            }}
          >
            {role === "admin"
              ? "Admin Panel"
              : role === "staff"
              ? "Staff Panel"
              : "User Panel"}
          </h2>
        )}
        <Button
          type="text"
          size="small"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={["/dashboard"]}
        onClick={onMenuClick}
        items={filteredItems as any}
        style={{
          borderRight: 0,
          marginTop: 8,
          paddingBottom: 24,
        }}
      />
    </Sider>
  );
};

export default SiderComponent;
