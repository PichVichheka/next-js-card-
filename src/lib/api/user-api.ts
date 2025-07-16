import request from "@/lib/api/request";
import { IUser } from "@/app/store/types/user-type";
import type { FormValues } from "@/components/update-user-dialog";
export const userRequest = () => {
  const GET_ME = async (): Promise<IUser> => {
    return await request({
      url: `/user/me`,
      method: "GET",
    });
  };

  const UPDATE_USER = async (payload: FormValues): Promise<IUser> => {
    return await request({
      url: "/user/update-profile",
      method: "PUT",
      data: payload,
    });
  };

  return {
    GET_ME,
    UPDATE_USER,
  };
};
