import React from "react";
import { Chat } from "./Chat";

interface AIResponseProps {
  response: string;
}

export default function AIResponse({ response }: AIResponseProps) {
  return <Chat output={response} />;
}
