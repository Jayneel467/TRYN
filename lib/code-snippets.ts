export type CodeSnippet = {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
};

export const codeSnippets: CodeSnippet[] = [
  {
    id: "rag-agent",
    title: "RAG agent with tool calling",
    description:
      "A minimal pattern for grounding LLM responses in retrieved context. The same approach we use on Itinero and client chatbot deliveries.",
    language: "typescript",
    code: `import { createAgent } from "@/lib/ai/agent";
import { searchKnowledgeBase } from "@/lib/ai/retrieval";

export const supportAgent = createAgent({
  name: "support",
  tools: [
    {
      name: "search_docs",
      description: "Search product documentation",
      execute: async ({ query }) => searchKnowledgeBase(query),
    },
  ],
  system: \`Answer using retrieved context only.
If unsure, escalate to a human.\`,
});

export async function handleMessage(userId: string, message: string) {
  const thread = await loadThread(userId);
  return supportAgent.run({ thread, input: message });
}`,
  },
  {
    id: "multi-tenant",
    title: "Multi-tenant request context",
    description:
      "Resolve tenant from subdomain or JWT before any database query. Foundation for every SaaS platform we build.",
    language: "typescript",
    code: `import { NextRequest, NextResponse } from "next/server";
import { resolveTenant } from "@/lib/tenancy";

export async function middleware(request: NextRequest) {
  const tenant = await resolveTenant(request);

  if (!tenant) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const headers = new Headers(request.headers);
  headers.set("x-tenant-id", tenant.id);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/app/:path*"],
};`,
  },
  {
    id: "whatsapp-webhook",
    title: "WhatsApp webhook handler",
    description:
      "Verify Meta signatures and route inbound messages to an NLP pipeline. Core pattern behind TRYN WhatsApp client deliveries.",
    language: "typescript",
    code: `import { verifyWebhookSignature } from "@/lib/whatsapp";
import { routeInboundMessage } from "@/lib/chat/router";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return new Response("Invalid signature", { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const messages = extractMessages(payload);

  await Promise.all(messages.map(routeInboundMessage));

  return Response.json({ ok: true });
}`,
  },
  {
    id: "ci-deploy",
    title: "CI deploy gate",
    description:
      "Typecheck, test, and build before promote. The studio standard for every venture repository.",
    language: "yaml",
    code: `name: deploy
on:
  push:
    branches: [main]

jobs:
  ship:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
      - run: npx vercel deploy --prebuilt --prod
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}`,
  },
];
