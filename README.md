# AI Agent Bundle on Next.js

A Next.js starter that drops a multimodal voice assistant — powered by Gemini Live via WebSocket — into any web app with a single script tag. Useful when you want voice, video, screen-share, and file analysis working from day one without wiring up a provider SDK yourself.

## What's Included

- **Next.js 15 + React 19 + TypeScript + Tailwind CSS 4** — the stack, nothing unusual
- **`voice-assistant-bundle.js`** — a self-contained, pre-built bundle (in `public/src/`) that exposes a `VoiceAssistant` global. Call `VoiceAssistant.init({ backendUrl: 'wss://...' })` and you're live
- **Gemini 2.0 Flash** under the hood, routed through a WebSocket backend you own or point at `wss://aiagent.babaai.live` for a quick demo
- **Multimodal from the start** — voice input/output, video, screen sharing, file upload, and page-context reading are all enabled by default
- **iOS Safari AudioContext fix** — baked into `PlainVoiceDemo.tsx` so the mic works on mobile without extra patches
- **Global layout integration** — the bundle CSS and JS are loaded in `app/layout.tsx`, so the assistant follows the user across all pages
- **`/about` route** — a second page showing that the assistant is page-aware and can answer questions about whatever the user is currently viewing

## Getting Started

Clone and run:

```bash
git clone https://github.com/arianbod/ai-agent-bundle-on-nextjs.git my-app
cd my-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll see a text input pre-filled with `wss://aiagent.babaai.live` — hit **Start Assistant** to try it against the demo backend.

When you're ready to connect your own backend, replace that URL with your WebSocket server's address. The bundle's `init` config accepts `backendUrl`, `voiceName`, `model`, feature flags, and `websiteContext` for custom instructions.

## Key Files

| File | What it does |
|---|---|
| `public/src/voice-assistant-bundle.js` | The prebuilt assistant bundle — replace when you ship a new version |
| `public/src/voice-assistant-bundle.css` | Matching styles for the assistant widget |
| `app/PlainVoiceDemo.tsx` | Client component wiring up the start/stop flow with mic permission handling |
| `app/layout.tsx` | Loads the bundle globally so it persists across routes |
| `next.config.ts` | Sets a one-year cache header on the bundle assets |

## Backend

This starter is frontend-only. It expects a WebSocket server that speaks the Gemini Live protocol. You can run `wss://aiagent.babaai.live` as a demo endpoint, or build your own server that proxies to the Gemini Live API with your `GOOGLE_API_KEY`.

## Deploy

```bash
npm run build
```

Deploys cleanly on Vercel, Cloudflare Pages, or any Node host. No server-side env vars required by the frontend itself.
