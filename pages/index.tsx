import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useLogin from "../src/hooks/useLogin";
import { setLogin } from "../src/store/loginSlice";
import { RootState } from "../src/store";

export default function Router() {
  const user = useSelector((state: RootState) => state.login.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user: auth0User, error, isLoading: authOLoading } = useUser();
  const { mutate, isLoading, data } = useLogin();
  React.useEffect(() => {
    if (!authOLoading) {
      if (!auth0User) {
        localStorage.setItem("slack-clone", "");
        router.push("/api/auth/login");
      } else {
        const userLocalStorage = localStorage.getItem("slack-clone");
        if (userLocalStorage != "") {
          const data = JSON.parse(userLocalStorage);
          const hours =
            Math.abs(new Date().getTime() - data.user.time) / 3600000;
          if (hours > 1) router.push("/api/auth/logout");
          else dispatch(setLogin(data));
        } else {
          mutate({
            email: auth0User?.email,
            username: auth0User?.name,
          });
        }
      }
    }
  }, [auth0User, authOLoading, isLoading]);

  React.useEffect(() => {
    if (!isLoading && data) {
      dispatch(setLogin({ user: data }));
      localStorage.setItem(
        "slack-clone",
        JSON.stringify({ user: { ...data, time: new Date().getTime() } })
      );
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (user)
    return (
      <button
        onClick={() => {
          router.push("/api/auth/logout");
        }}
      >
        sign out
      </button>
    );

  return <></>;
}
