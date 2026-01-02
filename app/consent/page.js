"use client";

import { useRouter } from "next/navigation";
import WarningCard from "@/components/WarningCard";
import Button from "@/components/Button";

export default function Consent() {
  const router = useRouter();

  return (
    <main className="h-screen flex justify-center items-center px-4">
      <div className="max-w-md space-y-4">
        <WarningCard title="Important">
          This is not medical advice or emergency support.
          If you are in immediate danger, please contact local emergency services.
        </WarningCard>

        <Button onClick={() => router.push("/choose")}>
          I Understand
        </Button>
      </div>
    </main>
  );
}