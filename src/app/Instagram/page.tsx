"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter()
  const handleBack = () => {
    router.push("/");
  };
  return (
    <div>
      <h3>Welcome to with Instagram</h3>
      <button onClick={() => handleBack()}>Back home</button>
    </div>
  );
};

export default Page;
