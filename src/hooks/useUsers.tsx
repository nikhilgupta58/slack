import React from "react";
import { useQuery } from "react-query";
import { getProtectedAxios } from "../auth";
import { IUser } from "../types";

async function fetch() {
  const axios = getProtectedAxios();
  const endpoint = "/api/user";
  return axios.get(endpoint).then(({ data }) => {
    return data as IUser[];
  });
}

export default function useUsers() {
  const { data, isLoading }: { data: IUser[]; isLoading: boolean } = useQuery(
    ["/users"],
    () => fetch(),
    {
      onError(err) {
        console.error(err);
      },
    }
  );
  return {
    data,
    isLoading,
  };
}
