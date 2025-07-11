import axios from "@/lib/api/request";
import { AuthRegisterType } from "@/app/store/types/auth-typs"; 

export const authRequest = axios.create({});

    const AUTH_REGISTER = async (payload: AuthRegisterType) => {
        return await axios ({
            method: "post",
            url: "/auth/register",
            data: payload,

        })

      return { 
        AUTH_REGISTER
       };

};
