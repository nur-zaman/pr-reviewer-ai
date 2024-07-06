"use server";

import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { createStreamableValue } from "ai/rsc";

export async function generate(input: string) {
  const stream = createStreamableValue("");

  const systemPrompt =
    process.env.SYSTEM_PROMPT ||
    "You will refuse to answer anything and only reply with a 404";
  (async () => {
    const { textStream } = await streamText({
      model: google("models/gemini-1.5-flash", {
        safetySettings: [
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE",
          },
        ],
      }),
      system: systemPrompt,
      messages: [{ role: "user", content: input }],
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }
    stream.done();
  })();

  return { output: stream.value };
}
