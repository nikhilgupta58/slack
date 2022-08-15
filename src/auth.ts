import axios, { AxiosInstance } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "./store";

let authAxios: AxiosInstance;

/**
 * Generates axios instance for authenticated API calls
 */
export const getProtectedAxios = () => {
  const data = JSON.parse(localStorage.getItem("slack-clone"));
  const access_token = data?.user?.access_token;
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
