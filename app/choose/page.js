"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function Choose() {
  const router = useRouter();

  function selectMode(mode) {
    sessionStorage.setItem("mode", mode);
    router.push("/chat");
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-4 px-6">
      <h2 className="text-xl font-semibold">How do you want to use this space?</h2>

      <Button onClick={() => selectMode("vent")} variant="secondary">
        Rant Room (Just listen)
      </Button>

      <Button onClick={() => selectMode("reflect")}>
        Reflect & Calm
      </Button>
    </main>
  );
}