import { useRouter } from "next/router";
import React from "react";
import { AppLayout } from "../../src/components/AppLayout";
import { Content } from "../../src/components/Content";
import Navbar from "../../src/components/Navbar";

export default function UserMessage() {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <AppLayout>
      <div className="flex w-[100%] min-h-[100vh-40px] flex-col">
        <Navbar />
        <Content />
      </div>
    </AppLayout>
  );
}
