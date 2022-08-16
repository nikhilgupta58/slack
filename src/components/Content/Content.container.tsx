import { useRouter } from "next/router";
import React from "react";
import useGetUser from "../../hooks/useGetUser";
import ContentView from "./Content.view";
import { ContentContext } from "./utils/context";

export default function ContentContainer() {
  const router = useRouter();
  const { userId } = router.query;
  const { data: userData, isLoading: isUserDataLoading } = useGetUser(userId);
  return (
    <ContentContext.Provider value={{ userData, isUserDataLoading }}>
      <ContentView />
    </ContentContext.Provider>
  );
}
