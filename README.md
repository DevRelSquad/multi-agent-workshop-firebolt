# Multi-Agent AI Workshop

Production-ready multi-agent orchestration demo built with Next.js 14, TypeScript, Tailwind, Gemini API, Firebolt MCP (sandbox), and Gmail (sandbox), plus an interactive workshop at `/workshop`.

## Quick Start

1) Install and run

```
npm install
npm run dev
```

2) Set env vars (freemium-friendly)

Create `.env.local` with at least:

```
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3) Open the app

Visit http://localhost:3000 and try the Live Demo. Explore `/workshop` to complete TODOs.

## Tech Stack

- Next.js 14 (App Router) • TypeScript • Tailwind CSS
- Gemini API (Google AI Studio)
- Firebolt MCP Server (mocked in dev)
- Gmail API (sandbox mode)
- shadcn/ui components

## Folder Structure

See WORKSHOP-GUIDE.md for full breakdown. Key dirs:

- `src/lib/agents` Orchestrator, Analytics, Report
- `src/app/api` API routes
- `src/components` UI + workshop components
- `src/content/workshop-steps` MDX workshop steps

## Development

```
npm run dev    # start dev server
npm run build  # production build
npm start      # start production server
```

## Deployment

See `DEPLOYMENT.md` for instructions for Stackblitz, Vercel, Cloud Run, and Docker.

## Workshop

Open `/workshop`. TODOs are marked in code with hints and testing steps. Start with `01-setup`.


