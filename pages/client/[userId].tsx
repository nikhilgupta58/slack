import { useRouter } from "next/router";
import { AppLayout } from "../../src/components/AppLayout";
import { Content } from "../../src/components/Content";

export default function UserMessage() {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <AppLayout>
      <div className="flex w-[100%] min-h-[100vh-40px] flex-col">
        <Content />
      </div>
    </AppLayout>
  );
}
