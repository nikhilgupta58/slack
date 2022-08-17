import React from "react";
import { useQuery } from "react-query";
import { getProtectedAxios } from "../auth";
import { ILogin, IMessage } from "../types";

async function fetch(id: string): Promise<IMessage[]> {
  if (id) {
    const axios = getProtectedAxios();
    const endpoint = "/api/message/" + id;
    return axios.get(endpoint).then(({ data }) => data as IMessage[]);
  }
  return;
}

export default function useMessage(id) {
  const { data, isLoading,refetch } = useQuery(["/get/message", id], () => fetch(id), {
    onError(err) {
      console.error(err);
    },
  });
  return {
    data,
    isLoading,
    refetch
  };
}
