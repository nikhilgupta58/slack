import React from "react";
import { useQuery } from "react-query";
import { getProtectedAxios } from "../auth";
import { ILogin } from "../types";

async function fetch(id: string): Promise<ILogin> {
  if (id) {
    const axios = getProtectedAxios();
    const endpoint = "/api/user/" + id;
    return axios.get(endpoint).then(({ data }) => data as ILogin);
  }
  return;
}

export default function useGetUser(id) {
  const { data, isLoading } = useQuery(["/get/user",id], () => fetch(id), {
    onError(err) {
      console.error(err);
    },
  });
  return {
    data,
    isLoading,
  };
}
