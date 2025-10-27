import { Button, message } from "antd";
import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase/fireBaseConfig";
import handleApi from "apis/handleApi";
import { addAuth } from "reduxs/reducres/authReducer";
import { localDataNames } from "constants/appinfos";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

provider.setCustomParameters({
  login_hint: "ninhchinguyenx@gmail.com",
});
interface Props {
  isRemember?: boolean;
}
const SocialLogin = (pros: Props) => {
  const { isRemember } = pros;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        const data = {
          name: user.displayName,
          email: user.email,
        };
        const api = "/auth/google-sign";
        try {
          const res: any = await handleApi(api, data, "post");
          message.success(res.message);
          dispatch(addAuth(res.data));
          if (isRemember) {
            localStorage.setItem(
              localDataNames.authData,
              JSON.stringify(res.data)
            );
          }
        } catch (error: any) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      console.log(user);
    } catch (error: any) {
      message.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      loading={isLoading}
      onClick={handleLoginWithGoogle}
      icon={
        <img
          width={24}
          height={24}
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
        />
      }
      style={{ width: "100%" }}
      size="large"
    >
      Google
    </Button>
  );
};

export default SocialLogin;
