import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const useMarkdownProcessor = (markdownContent: string) => {
  const [processedContent, setProcessedContent] = useState<JSX.Element | null>(
    null
  );

  useEffect(() => {
    if (markdownContent) {
      setProcessedContent(
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {markdownContent}
        </ReactMarkdown>
      );
    }
  }, [markdownContent]);

  return processedContent;
};
