"use client";

import OutputCard from "@/components/ui/OutputCard";
import { useMarkdownProcessor } from "@/hooks/use-markdown-processor";

interface ChatProps {
  output: string;
}

export function Chat({ output }: ChatProps) {
  const content = useMarkdownProcessor(output || "");

  if (!output || output === "") return null;

  return (
    <div className="mt-8 space-y-4">
      <OutputCard cardTitle="AI Review" cardDescription={content} />
    </div>
  );
}
