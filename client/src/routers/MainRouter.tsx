import React, { useState } from "react";
import { Layout } from "antd";
import SiderComponent from "../components/SiderComponent";
import HomeScreen from "../screens/HomeScreen";
import { Route, Routes } from "react-router-dom";
import Iventories from "../screens/Iventories";
import HeaderComponent from "../components/HeaderComponent";
import SupplierScreen from "screens/SupplierScreen";

const { Content, Footer } = Layout;

const role = "admin";

const MainRouter: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderComponent
        role={role}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Layout
        style={{
          transition: "all 0.3s",
          minHeight: "100vh",
          background: "#f5f6fa",
        }}
      >
        <HeaderComponent
          role={role}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <Content
          style={{
            margin: "20px",
            padding: "20px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            minHeight: "calc(100vh - 160px)",
          }}
        >
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/iventory" element={<Iventories />} />
            <Route path="/suppliers" element={<SupplierScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            background: "#fff",
            padding: "10px",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          © {new Date().getFullYear()} — Your Company
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainRouter;
