import { Button, Card, Form, Input, message, Space, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SocialLogin from "./components/SocialLogin";
import handleApi from "../../apis/handleApi";
import { useDispatch } from "react-redux";
import { addAuth } from "../../reduxs/reducres/authReducer";
const { Title, Paragraph, Text } = Typography;
const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [isRemember, setIsRemember] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleLogin = async (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    setIsLoading(true);
    try {
      const api = "/auth/register";
      const res = await handleApi(api, values, "post");
      if (res.data) {
        message.success(res.data.message);
        dispatch(addAuth(res.data.data));
        console.log(res.data.data);
      }
    } catch (error: any) {
      console.log(error);
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card
      style={{
        width: "70%",
      }}
    >
      <div className="text-center">
        <div>
          <img
            src={
              "https://res.cloudinary.com/dwvyjgxxg/image/upload/v1760900823/rucnmnbavdqpn3wxod5d.jpg"
            }
            alt=""
            style={{
              width: 58,
              height: 58,
            }}
          />
        </div>
        <Title level={2}>Creat an account</Title>
        <Paragraph type="secondary">
          Get started with your free account
        </Paragraph>
      </div>
      <Form
        layout="vertical"
        form={form}
        onFinish={handleLogin}
        disabled={isLoading}
        size="small"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            allowClear
            maxLength={100}
            type="name"
            className="p-2"
            placeholder="Enter your name"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            allowClear
            maxLength={100}
            type="email"
            className="p-2"
            placeholder="Enter your email"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            () => ({
              validator(_, value) {
                if (!value || value.length >= 6) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Password must be at least 6 characters long")
                );
              },
            }),
          ]}
        >
          <Input.Password
            allowClear
            type="password"
            className="p-2"
            placeholder="Create password"
          />
        </Form.Item>

        <div className="mt-4 mb-3">
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            style={{ width: "100%" }}
            htmlType="submit"
          >
            Sign Up
          </Button>
        </div>
        <SocialLogin />
        <div className="mt-4 text-center">
          <Space>
            <Text type="secondary">Already an account?</Text>
            <Link to={"/login"}>Login</Link>
          </Space>
        </div>
      </Form>
    </Card>
  );
};

export default SignUp;
