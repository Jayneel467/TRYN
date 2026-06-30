import { codeToHtml } from "shiki";
import { CodeSnippetTabsClient } from "@/components/shared/code-snippet-tabs-client";
import { codeSnippets } from "@/lib/code-snippets";

export async function CodeSnippetTabs() {
  const snippets = await Promise.all(
    codeSnippets.map(async (snippet) => ({
      id: snippet.id,
      title: snippet.title,
      description: snippet.description,
      language: snippet.language,
      code: snippet.code,
      html: await codeToHtml(snippet.code, {
        lang: snippet.language,
        theme: "github-dark",
      }),
    })),
  );

  return <CodeSnippetTabsClient snippets={snippets} />;
}
