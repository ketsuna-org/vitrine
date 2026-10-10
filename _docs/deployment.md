---
layout: doc
title: Deployment & Hosting
category: "Meta"
api_type: general
description: Choose between app hosting and the self-hosted Docker runner for running Bot Creator bots.
permalink: /docs/deployment/
---

Bot Creator supports two deployment models: **running the bot from the app** and **self-hosted Docker runners**.

## App hosting

1. Download the [mobile or desktop app](/download/).
2. Create a bot token — [token setup guide](/getting-started/2025/05/18/how-to-create-a-bot-token-bot-creator/).
3. Design commands in the visual editor or JavaScript blocks.
4. Host directly from the app dashboard.

The app starts the bot runtime itself (mobile service or desktop runtime) and shows logs and stats; no server administration is needed.

## Docker runner (self-hosted)

Use the Docker runner when you need:

- A remote runner on your own server that the app drives through an HTTP API (the runner image is API-only)
- Persistent bot configs and logs in mounted volumes (`/bots` and `/data` in the image)
- Long-lived remote runtime separate from mobile/desktop editing

### Quick start

```bash
docker volume create bot-creator-bots
docker volume create bot-creator-data
docker run -d --name bot-creator-runner \
  -p 8080:8080 \
  -e BOT_CREATOR_WEB_HOST=0.0.0.0 \
  -e BOT_CREATOR_API_TOKEN=change-me \
  -v bot-creator-bots:/bots \
  -v bot-creator-data:/data \
  ghcr.io/ketsuna-org/bot-creator-runner:<tag>
```

- The image listens on port `8080` and binds to `127.0.0.1` by default; to reach it from outside the container set `BOT_CREATOR_WEB_HOST=0.0.0.0`. Binding to a non-loopback host requires `BOT_CREATOR_API_TOKEN` (or `--api-token`), otherwise the runner refuses to start.
- Replace `<tag>` with the image tag given on the [Download page](/download/#runner).

### Full runner guide

The complete API and configuration reference is in the [Docker Runner (API only)](/guides/runner-docker-api-only/) guide, including:

- Persistent volume
- Launching the API runner
- Main endpoints
- Environment variables

## Choosing a model

| Need | Recommendation |
|------|----------------|
| Fast setup, mobile editing | App hosting |
| Team on the go | App hosting |
| Server you already manage | Docker runner |
| Raspberry Pi / homelab | Docker runner |

## Related documentation

- [Getting started](/docs/getting-started/) — zero-to-first-command path
- [Download](/download/) — app stores and runner setup
- [Docker Runner guide](/guides/runner-docker-api-only/) — full self-host reference
