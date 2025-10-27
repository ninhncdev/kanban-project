import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  message,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import handleApi from "../../apis/handleApi";
import { useDispatch } from "react-redux";
import { addAuth } from "../../reduxs/reducres/authReducer";
import { localDataNames } from "constants/appinfos";

const { Title, Paragraph, Text } = Typography;
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const api = "/auth/login";
      const res = await handleApi(api, values, "post");
      message.success("Login succeesfuly");

      res.data && dispatch(addAuth(res.data));

      if (isRemember) {
        localStorage.setItem(localDataNames.authData, JSON.stringify(res.data));
      }
    } catch (error: any) {
      message.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card
      style={{
        minWidth: "450px",
      }}
    >
      <div className="text-center">
        <Title level={2}>Login to your account</Title>
        <Paragraph type="secondary">
          Welcpome back! Please enter your details.
        </Paragraph>
      </div>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleLogin}
        disabled={isLoading}
        size="large"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input allowClear maxLength={100} type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password allowClear type="password" />
        </Form.Item>
        <div className="row">
          <div className="col">
            <Checkbox
              checked={isRemember}
              onChange={(val) => setIsRemember(val.target.checked)}
            >
              Remember for 30 days
            </Checkbox>
          </div>
          <div className="col text-right">
            <Link to="/#">Forgot Password?</Link>
          </div>
        </div>
        <div className="mt-4 mb-3">
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            style={{ width: "100%" }}
            htmlType="submit"
          >
            Login
          </Button>
        </div>
        <SocialLogin isRemember={isRemember} />
        <div className="mt-4 text-center">
          <Space>
            <Text type="secondary">Don't have an account?</Text>
            <Link to={"/sign-up"}>Create an account</Link>
          </Space>
        </div>
      </Form>
    </Card>
  );
};

export default Login;
