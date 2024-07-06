"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

interface InputFieldProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function InputField({ onSendMessage, isLoading }: InputFieldProps) {
  const [input, setInput] = useState("");

  const placeholders = [""];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
