import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ErrorDisplayProps {
  error: string;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <Alert className="mt-4 ">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
