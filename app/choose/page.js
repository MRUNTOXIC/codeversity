"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function Choose() {
  const router = useRouter();

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-6 px-6">
      <h2 className="text-2xl font-semibold text-center mb-4">How are you feeling today?</h2>
      <p className="text-gray-600 text-center mb-6">Choose the support that feels right for you</p>

      <div className="space-y-4 w-full max-w-sm">
        <Button onClick={() => router.push("/vent")} variant="secondary" className="w-full">
          💭 Vent Room - I need to let it all out
        </Button>

        <Button onClick={() => router.push("/reflect")} className="w-full">
          🤔 Reflect & Calm - Help me process and find peace
        </Button>
      </div>
    </main>
  );
}