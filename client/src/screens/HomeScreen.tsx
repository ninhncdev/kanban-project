import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authSeletor,
  refreshToken,
  removeAuth,
} from "../reduxs/reducres/authReducer";
import handleApi from "apis/handleApi";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authSeletor);
  const logout = () => {
    dispatch(removeAuth({}));
  };

  const getProducts = async () => {
    const api = "/storage/products";
    try {
      const res = await handleApi(api);
      console.log(res);
    } catch (error: any) {
      if (error.message === "jwt expired") {
        handleRefreshToken();
      }
    }
  };
  const handleRefreshToken = async () => {
    try {
      const api = `auth/refresh-token?id=${auth._id}`;
      const res = await handleApi(api);
      dispatch(refreshToken(res.data.token));
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={getProducts}>Get Product</Button>
    </div>
  );
};

export default HomeScreen;
