"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface PRChangesUIProps {
  handleSubmit: (e: React.FormEvent) => void;
  error: string;
  isLoading: boolean;
  repo: string;
  setRepo: (repo: string) => void;
  prNumber: string;
  setPRNumber: (prNumber: string) => void;
}

export default function PRChangesUI({
  handleSubmit,
  error,
  isLoading,
  repo,
  setRepo,
  prNumber,
  setPRNumber,
}: PRChangesUIProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>GitHub PR Changes</CardTitle>
        <CardDescription>
          Enter repository details and PR number to fetch changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repo">Repository</Label>
            <Input
              id="repo"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="owner/repo"
              required
            />
          </div>
          <div className="space-y-2">
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
            {isLoading ? "Fetching..." : "Fetch PR Changes"}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
}
