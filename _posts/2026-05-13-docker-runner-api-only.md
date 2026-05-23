---
title: Docker Runner (API only)
description: Learn how to configure and run the Bot Creator Runner in API mode
  via Docker for optimal bot synchronization.
category: Runner
date: 2026-05-13T18:10:00.000Z
categories:
  - setup
  - docker
  - runner
thumbnail: assets/images/blog_analytics_neon.png
author: Garder500
translation_key: docker-runner-api-only
locale: en
content_language: en
layout: post
toc: true
permalink: /guides/runner-docker-api-only/
---

# Docker Runner (API only)

This document explains how to run the Runner in Docker using API mode.

The Runner has only one function: exposing a HTTP API so the Bot Creator application can:

- synchronize bot configurations,
- start a bot by ID,
- stop a bot by ID,
- read status/metrics/logs.

> **Note:** The single-bot mode (local CLI ZIP) is no longer supported.

## Building the image

If you are building the image yourself:

```bash
docker build -t bot-creator-runner .
```

## Persistent Volume

It is crucial to create a volume to preserve your data between container restarts.

```bash
docker volume create bot_creator_data
```

This volume preserves Runner data (synchronized configs, variables, logs).

## Launching the API Runner

By default, the image listens on `127.0.0.1`. To expose it via Docker, you must force it to listen on `0.0.0.0` and define a bearer token for security.

```bash
docker run --rm \
  -p 8080:8080 \
  -e BOT_CREATOR_WEB_HOST=0.0.0.0 \
  -e BOT_CREATOR_API_TOKEN=your-secret-token \
  -v bot_creator_data:/data \
  bot-creator-runner
```

The image starts in API mode by default.

## Main Endpoints

The runner exposes the following endpoints:

- `GET /health`: Public liveness check.
- `GET /status`: General runner state.
- `GET /metrics`: Performance metrics.
- `GET /bots`: List of configured bots.
- `POST /bots/sync`: Configuration synchronization.
- `POST /bots/{id}/start`: Start a bot.
- `POST /bots/{id}/stop`: Stop a bot.
- `GET /logs?limit=N`: Read logs.

## Useful Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BOT_CREATOR_WEB_HOST` | Listening interface | `127.0.0.1` |
| `BOT_CREATOR_WEB_PORT` | Listening port | `8080` |
| `BOT_CREATOR_API_TOKEN` | Bearer Token (Required if outside loopback) | - |
| `BOT_CREATOR_DATA_DIR` | Configuration folder | `/data/bots` |
| `BOT_CREATOR_RUNNER_LOG_FILE` | Log file | `/data/logs/runner.log` |

## Important Note

The Runner binary is **API-only**. Legacy CLI usages (e.g., `--config` / local ZIP) are no longer part of the supported behavior.

`GET /health` remains public for the liveness check. All other endpoints are protected by bearer token as soon as `BOT_CREATOR_API_TOKEN` is configured.
