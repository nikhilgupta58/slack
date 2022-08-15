import { useRouter } from "next/router";
import React from "react";
import { AppLayout } from "../../src/components/AppLayout";

export default function UserMessage() {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <AppLayout>
      <></>
    </AppLayout>
  );
}
