import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PRFormProps {
  repo: string;
  setRepo: (repo: string) => void;
  prNumber: string;
  setPRNumber: (prNumber: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function PRForm({
  repo,
  setRepo,
  prNumber,
  setPRNumber,
  onSubmit,
  isLoading,
}: PRFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="repo">Repository</Label>
        <Input
          id="repo"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="owner/repo"
          required
        />
      </div>
      <div>
        <Label htmlFor="prNumber">PR Number</Label>
        <Input
          id="prNumber"
          type="number"
          value={prNumber}
          onChange={(e) => setPRNumber(e.target.value)}
          placeholder="e.g., 1"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Analyze PR"}
      </Button>
    </form>
  );
}
