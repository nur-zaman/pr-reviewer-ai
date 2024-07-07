"use client";

import React from "react";
import { useGitHubPR } from "@/hooks/useGitHubPR";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";
import PRForm from "@/components/PRForm";
import AIResponse from "@/components/AIResponse";
import ErrorDisplay from "@/components/ErrorDisplay";
import LoadingIndicator from "@/components/LoadingIndicator";
import PRInfoCard from "./PRInfoCard";

export default function GitHubPRAnalyzer() {
  const {
    repo,
    setRepo,
    prNumber,
    setPRNumber,
    prChanges,
    isPRLoading,
    prError,
    fetchPRChanges,
  } = useGitHubPR();

  const { aiResponse, isAILoading, aiError, analyzeChanges } = useAIAnalysis();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const changes = await fetchPRChanges();
    if (changes) {
      await analyzeChanges(changes);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex flex-col justify-center gap-4 w-full">
        <PRForm
          repo={repo}
          setRepo={setRepo}
          prNumber={prNumber}
          setPRNumber={setPRNumber}
          onSubmit={handleSubmit}
          isLoading={isPRLoading || isAILoading}
        />
        {prChanges && <PRInfoCard prChanges={prChanges} />}
      </div>
      {(isPRLoading || isAILoading) && <LoadingIndicator />}
      {(prError || aiError) && <ErrorDisplay error={prError || aiError} />}
      {aiResponse && <AIResponse response={aiResponse} />}
    </div>
  );
}
