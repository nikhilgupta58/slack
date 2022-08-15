import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import useUsers from "../../hooks/useUsers";
import { RootState } from "../../store";
import { IUser } from "../../types";
import AppLayoutView from "./AppLayout.view";
import { AppLayoutContext } from "./utils/context";

export default function AppLayoutContainer({ children }) {
  const router = useRouter();
  const {
    data: users,
    isLoading: isUserLoading,
  }: { data: IUser[]; isLoading: boolean } = useUsers();
  const currnetUser = useSelector((state: RootState) => state.login.user);

  React.useEffect(() => {
    if (!currnetUser) {
      router.push("/");
    }
  }, []);

  const handleUserClick = (id) => {
    router.push("/client/" + id);
  };
  return (
    <AppLayoutContext.Provider
      value={{
        children,
        router,
        users,
        isUserLoading,
        currnetUser,
        handleUserClick,
      }}
    >
      <AppLayoutView />
    </AppLayoutContext.Provider>
  );
}
