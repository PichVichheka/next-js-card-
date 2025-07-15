import axios from "axios";
import { devtools } from "zustand/middleware";
import { create } from "zustand";
import cookies from "js-cookie";

const CookieName = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

interface AuthStore {
  accessToken: string;
  refreshToken: string;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    accessToken: null,
    refreshToken: null,

    setTokens: (accessToken: string, refreshToken: string) => {
      cookies.set(CookieName.ACCESS_TOKEN, accessToken);
      cookies.set(CookieName.REFRESH_TOKEN, refreshToken);
      set({
        accessToken,
        refreshToken,
      });

      false;
      ("accessToken");
    },
  }))
);
