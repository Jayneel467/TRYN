"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "@/components/shared/fade-in";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SnippetWithHtml = {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  html: string;
};

type CodeSnippetTabsClientProps = {
  snippets: SnippetWithHtml[];
};

export function CodeSnippetTabsClient({ snippets }: CodeSnippetTabsClientProps) {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(snippets[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const active = snippets.find((s) => s.id === activeId) ?? snippets[0]!;

  async function handleCopy() {
    const snippet = snippets.find((s) => s.id === activeId);
    if (!snippet) return;
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="code-snippet-panel overflow-hidden rounded-lg border border-border bg-[#0d1117]">
      <div className="flex flex-wrap gap-1 border-b border-white/10 p-2">
        {snippets.map((snippet) => (
          <button
            key={snippet.id}
            type="button"
            onClick={() => setActiveId(snippet.id)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              activeId === snippet.id
                ? "bg-white/10 text-white"
                : "text-white/50 hover:bg-white/5 hover:text-white/80",
            )}
          >
            {snippet.title}
          </button>
        ))}
      </div>

      <div className="border-b border-white/10 px-4 py-3 sm:px-6">
        <p className="text-sm text-white/70">{active.description}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-2 text-xs font-medium text-saffron hover:text-saffron-hover"
        >
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>

      <FadeIn>
        {reducedMotion ? (
          <div
            className="code-snippet-html overflow-x-auto p-4 text-sm sm:p-6"
            dangerouslySetInnerHTML={{ __html: active.html }}
          />
        ) : (
          <motion.div
            key={active.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="code-snippet-html overflow-x-auto p-4 text-sm sm:p-6"
            dangerouslySetInnerHTML={{ __html: active.html }}
          />
        )}
      </FadeIn>
    </div>
  );
}
