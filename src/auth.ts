import axios, { AxiosInstance } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export const getAccessToken = (): string => {
  const user = useSelector((state: RootState) => state.login.user);
  if (user) {
    return user.accesstoken;
  }
  return null;
};

let authAxios: AxiosInstance;

/**
 * Generates axios instance for authenticated API calls
 */
export const getProtectedAxios = () => {
  const access_token = getAccessToken();

  if (access_token && authAxios) {
    authAxios.defaults.headers = {
      //@ts-ignore
      Authorization: `Bearer ${access_token}`,
    };
  }

  if (!authAxios)
    authAxios = axios.create({
      headers: {
        ...(typeof access_token === "string"
          ? {
              Authorization: `Bearer ${access_token}`,
            }
          : {}),
      },
    });
  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error;
    }
  );

  return authAxios;
};
