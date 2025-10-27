import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Signup } from "../screens";
import { Typography } from "antd";

const { Title } = Typography;
const AuthRouter = () => {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col d-none d-lg-block text-center"
          style={{ marginTop: "15%" }}
        >
          <Title>Kanban</Title>
        </div>
        <div className="col content-center">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default AuthRouter;
