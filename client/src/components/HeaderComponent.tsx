import {
  BellOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Space } from "antd";
import Input from "antd/es/input/Input";
import { Header } from "antd/es/layout/layout";
import { colors } from "constants/colors";
import React from "react";

const HeaderComponent = ({
  role,
  collapsed,
  setCollapsed,
}: {
  role: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {collapsed && (
          <Button
            type="text"
            icon={<MenuUnfoldOutlined />}
            onClick={() => setCollapsed(false)}
          />
        )}
        <Input
          placeholder="Search..."
          style={{ borderRadius: 100, minWidth: "220px", padding: "4px 10px" }}
          size="large"
          prefix={<SearchOutlined className="text-muted" size={18} />}
        />
      </div>
      <div>
        <Space>
          <Button
            type="text"
            icon={<BellOutlined color={colors.gray600} size={22} />}
          ></Button>
          <Avatar
            src={
              "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/573619926_25077759331914308_6797920836303168937_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=xy1dj5xJyvwQ7kNvwHq-_T5&_nc_oc=Adk3OxCbGi8sRz6DhHcJOP0mO2bqUCGAp745fqzFT0ntfu0m8lQUVh0qcnqCemCRrKg&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=y1NB5XwecqQaH0Uc5E2rSw&oh=00_Afiaz9WLZr00cGxkcTtx3GwTcp25ELfq5EdaokBoz3bovw&oe=690DCDEC"
            }
            size={40}
          />
        </Space>
      </div>
    </Header>
  );
};

export default HeaderComponent;
