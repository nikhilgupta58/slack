import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import useLogin from "../src/hooks/useLogin";
import { setLogin } from "../src/store/loginSlice";
import { RootState } from "../src/store";
import { Home } from "../src/components/Home";

export default function Router() {
  const user = useSelector((state: RootState) => state.login.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const { user: auth0User, error, isLoading: authOLoading } = useUser();
  const { mutate, isLoading, data } = useLogin();
  React.useEffect(() => {
    if (error) console.log("Auth0 Error :" + error);
    if (!authOLoading) {
      if (!auth0User) {
        router.push("/api/auth/logout");
        localStorage.setItem("slack-clone", "null");
        router.push("/api/auth/login");
      } else {
        const userLocalStorage = localStorage.getItem("slack-clone");
        const data = JSON.parse(userLocalStorage);
        if (data) {
          const hours =
            Math.abs(new Date().getTime() - data.user.time) / 3600000;
          if (hours > 1) router.push("/api/auth/logout");
          else {
            dispatch(setLogin(data));
            router.push("/client/" + data.user.id);
          }
        } else {
          mutate({
            email: auth0User?.email,
            username: auth0User?.name,
          });
        }
      }
    }
  }, [authOLoading]);

  React.useEffect(() => {
    if (!isLoading && data) {
      dispatch(setLogin({ user: data }));
      localStorage.setItem(
        "slack-clone",
        JSON.stringify({ user: { ...data, time: new Date().getTime() } })
      );
      router.push("/client/" + data.id);
    }
  }, [isLoading, data]);

  if (isLoading || authOLoading) {
    return (
      <div className="flex w-[100vw] h-[100vh] justify-center items-center">
        <img src="/slack-app-loader.gif" width={"200px"} />
      </div>
    );
  }

  if (user) return <Home />;

  return <></>;
}
