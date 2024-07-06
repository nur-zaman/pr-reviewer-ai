import { useState } from "react";
import { generate } from "@/actions/gemini";
import { readStreamableValue } from "ai/rsc";

export function useAIAnalysis() {
  const [aiResponse, setAIResponse] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiError, setAIError] = useState("");

  const analyzeChanges = async (changes: any) => {
    setIsAILoading(true);
    setAIError("");
    setAIResponse("");

    try {
      const changesJSONString = JSON.stringify(changes, null, 2);
      const { output } = await generate(changesJSONString);

      for await (const delta of readStreamableValue(output)) {
        setAIResponse((prevResponse) => prevResponse + delta);
      }
    } catch (error) {
      setAIError(
        error instanceof Error
          ? error.message
          : "An error occurred during AI analysis."
      );
    } finally {
      setIsAILoading(false);
    }
  };

  return {
    aiResponse,
    isAILoading,
    aiError,
    analyzeChanges,
  };
}
