import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import useGetUser from "../../hooks/useGetUser";
import { setSidebar } from "../../store/sidebarSlice";
import Navbar from "../Navbar";
import ContentView from "./Content.view";
import { ContentContext } from "./utils/context";

export default function ContentContainer() {
  const router = useRouter();
  const { userId } = router.query;
  const { data: userData, isLoading: isUserDataLoading } = useGetUser(userId);
  const dispatch = useDispatch();
  return (
    <ContentContext.Provider value={{ userData, isUserDataLoading }}>
      <Navbar data={userData} type={"user"} isLoading={isUserDataLoading} />
      <div
        onClick={() => {
          dispatch(setSidebar({ active: false }));
        }}
      >
        <ContentView />
      </div>
    </ContentContext.Provider>
  );
}
