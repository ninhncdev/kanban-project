import React, { useEffect, useState } from "react";
import MainRouter from "./MainRouter";
import AuthRouter from "./AuthRouter";
import { useDispatch, useSelector } from "react-redux";
import {
  addAuth,
  authSeletor,
  IAuthSate,
} from "../reduxs/reducres/authReducer";
import { localDataNames } from "../constants/appinfos";
import { Spin } from "antd";

const Routers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth: IAuthSate = useSelector(authSeletor);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = localStorage.getItem(localDataNames.authData);
    res && dispatch(addAuth(JSON.parse(res)));
  };
  return isLoading ? <Spin /> : !auth.token ? <AuthRouter /> : <MainRouter />;
};

export default Routers;
