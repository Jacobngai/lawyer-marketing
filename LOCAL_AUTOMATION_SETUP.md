# Local Automation Setup

## What Changed

- The contact form no longer opens `wa.me` in the visitor's browser.
- The form now submits to a backend endpoint: `POST /api/contact/submit`.
- The backend can:
  - back up each lead to `server/data/lead-submissions.jsonl`
  - relay the lead to your Google Apps Script
  - trigger your local Dify workflow, which then sends WhatsApp through Evolution API

## Run Locally

1. Copy `.env.example` to `.env`.
2. Set `DIFY_APP_API_KEY` to the API key of your published Dify workflow app.
3. Start the site and backend together:

```bash
npm run dev:full
```

4. Open the frontend as usual.

## Current Dify Status

- Dify is already running locally at `http://localhost`.
- Evolution API is already running locally.
- The Dify app `CRM-010: WhatsApp Message Sender` exists, but it is still only a draft.
- Until that workflow is published, Dify API calls return `app_unavailable`.

## Dify Input Mapping

The backend sends these inputs to the workflow:

- `phone_number`
- `approved_message`
- `member_name`
- `notes`

## Important Deployment Constraint

If this website stays deployed as a public Vercel frontend, it cannot reach a backend that only exists on your local machine.

You need one of these:

1. Host the backend on the same machine/server as Dify and expose it publicly with HTTPS.
2. Move Dify/Evolution to a public server that your backend can reach.
3. Keep the whole website and backend self-hosted together instead of using a static-only deployment.
