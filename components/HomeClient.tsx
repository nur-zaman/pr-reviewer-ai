"use client";

import { useState } from "react";
import { generate } from "@/actions/gemini";
import { readStreamableValue } from "ai/rsc";
import { InputField } from "@/components/InputField";
import { Chat } from "@/components/Chat";
import { Button } from "@/components/ui/button";

export default function HomeClient() {
  const [message, setMessage] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (input: string) => {
    setIsLoading(true);
    setMessage(input);
    setAssistantResponse("");

    const { output } = await generate(input);

    for await (const delta of readStreamableValue(output)) {
      setAssistantResponse((prevResponse) => prevResponse + delta);
    }

    setIsLoading(false);
  };

  return (
    <>
      <InputField onSendMessage={handleSendMessage} isLoading={isLoading} />
      {message && (
        <Button
          variant={"outline"}
          className="text-[--foreground] text-lg border-2 pointer-events-none"
        >
          {message}
        </Button>
      )}
      <Chat output={assistantResponse} />
    </>
  );
}
