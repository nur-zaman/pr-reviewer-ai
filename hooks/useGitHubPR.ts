import { useState } from "react";
import { getPRFileChanges, PRChanges } from "@/actions/github";

export function useGitHubPR() {
  const [repo, setRepo] = useState("");
  const [prNumber, setPRNumber] = useState("");
  const [prChanges, setPRChanges] = useState<PRChanges>();
  const [isPRLoading, setIsPRLoading] = useState(false);
  const [prError, setPRError] = useState("");

  const fetchPRChanges = async () => {
    setIsPRLoading(true);
    setPRError("");
    try {
      const changes = await getPRFileChanges(repo, parseInt(prNumber));
      if (!changes) throw new Error("No changes found.");
      setPRChanges(changes);
      return changes;
    } catch (error) {
      setPRError(
        error instanceof Error
          ? error.message
          : "An error occurred while fetching PR changes."
      );
      return null;
    } finally {
      setIsPRLoading(false);
    }
  };

  return {
    repo,
    setRepo,
    prNumber,
    setPRNumber,
    prChanges,
    isPRLoading,
    prError,
    fetchPRChanges,
  };
}
