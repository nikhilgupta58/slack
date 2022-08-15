import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { ILogin } from "../types";

async function login(payload): Promise<ILogin> {
  const endpoint = "/api/login";
  return axios.post(endpoint, payload).then(({ data }) => data as ILogin);
}

export default function useLogin() {
  const { mutate, isLoading, data } = useMutation(
    ["/login"],
    (payload: { email: string; username: string }) => login(payload),
    {
      onError(err) {
        console.error(err);
      },
    }
  );
  return {
    mutate,
    isLoading,
    data,
  };
}
