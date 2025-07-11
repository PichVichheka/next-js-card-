import { useAuthStore } from "@/app/store/auth-store";
import axios, {type AxiosRequestConfig} from "axios";
import cookies from "js-cookie"


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = useAuthStore.getState().accessToken;
      config.headers["Authorization"] = `${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

let isRefreshing = false;

axiosInstance.interceptors.response.use(
    (response) => {
      return response .data;
    },
    async (error) => {
        const originalRequest: AxiosRequestConfig = error.config;
        if(error.response && error.response.data.status === 401) {
            if(!isRefreshing){
              try {
                const response = await axiosInstance({
                  method: 'post',
                  url: 'http://localhost:8000/api/v1/auth/refresh',
                });

                const { accessToken } = response.data;
                cookies.set("cookieName.ACCESS_TOKEN", accessToken);
                error.config.headers["Authorization"] = `${accessToken}`;
                return await axiosInstance(originalRequest);

              } catch (error:any) {
                if (error.response && error.response.data) {
                  // make layout api call or remove token

                  return Promise.reject(error.response.data);
                }
                return Promise.reject(error);
               
              }finally {
                isRefreshing = false;
              }
            }  
        }
        if (error.response && error.response.status === 401) {
          // make logout aip logical

          return Promise.reject(error.response.data);
        }  
        return Promise.reject(error);
    }
);
export default axiosInstance;
