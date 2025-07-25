import axios from "@/lib/api/request";
import { AuthLoginType, AuthRegisterType } from "@/app/store/types/auth-typs";

export const authRequest = () => {
  const AUTH_REGISTER = async (payload: AuthRegisterType) => {
    return await axios({
      url: "/auth/register",
      method: "POST",
      data: payload,
    });
  };

  const AUTH_LOGIN = async (payload: AuthLoginType) => {
    return await axios({
      url: "/auth/login",
      method: "POST",
      data: payload,
    });
  };

  const AUTH_LOGOUT = async (refreshToken: string) => {
    return await axios({
      url: "/auth/logout",
      method: "POST",
      data: { refreshToken },
    });
  };

  return {
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_LOGOUT,
  };
};
