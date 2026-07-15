---
layout: doc
title: Deployment & Hosting
category: "Meta"
description: Choose between app hosting and the self-hosted Docker runner for running Bot Creator bots.
permalink: /docs/deployment/
---

Bot Creator supports two deployment models: **managed hosting from the app** and **self-hosted Docker runners**.

## App hosting (recommended)

Most teams should start here.

1. Download the [mobile or desktop app](/download/).
2. Create a bot token — [token setup guide](/getting-started/2025/05/18/how-to-create-a-bot-token-bot-creator/).
3. Design commands in the visual editor or JavaScript blocks.
4. Host directly from the app dashboard.

The app handles uptime, reconnects, and monitoring without server administration.

## Docker runner (self-hosted)

Use the Docker runner when you need:

- A browser-based control panel on your own Linux server or Raspberry Pi
- Persistent logs and state in mounted volumes
- Long-lived remote runtime separate from mobile/desktop editing

### Quick start

```bash
docker pull ghcr.io/ketsuna-org/bot-creator-runner:latest
docker volume create bot-creator-data
docker run -d --name bot-creator-runner \
  -p 3000:3000 \
  -v bot-creator-data:/data \
  ghcr.io/ketsuna-org/bot-creator-runner:latest
```

Copy commands and version-specific flags from the [Download page](/download/#runner).

### Full runner guide

The complete API and configuration reference is in the [Docker Runner (API only)](/guides/runner-docker-api-only/) guide, including:

- Environment variables
- Volume layout
- HTTP API endpoints
- Pairing with the mobile/desktop app

## Choosing a model

| Need | Recommendation |
|------|----------------|
| Fast setup, mobile editing | App hosting |
| Team on the go | App hosting |
| Server you already manage | Docker runner |
| Raspberry Pi / homelab | Docker runner |
| Maximum uptime on your infra | Docker runner |

## Related documentation

- [Getting started](/docs/getting-started/) — zero-to-first-command path
- [Download](/download/) — app stores and runner setup
- [Docker Runner guide](/guides/runner-docker-api-only/) — full self-host reference
