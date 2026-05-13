---
title: Runner Docker (API only)
description: Apprenez à configurer et lancer le Runner Bot Creator en mode API via Docker pour une synchronisation optimale.
date: 2026-05-13T18:10:00.000Z
thumbnail: assets/images/blog_analytics_neon.png
author: Garder500
layout: post
toc: true
locale: fr
translation_key: docker-runner-api-only
content_language: fr
categories: [setup, docker, runner]
permalink: /fr/guides/runner-docker-api-only/
---

# Runner Docker (API only)

Ce document explique comment exécuter le Runner en Docker en mode API. 

Le Runner n'a qu'une seule fonction: exposer une API HTTP pour que l'application Bot Creator puisse :

- synchroniser les configurations de bots,
- démarrer un bot par ID,
- arrêter un bot par ID,
- lire le statut/les métriques/logs.

> **Note :** Le mode mono-bot (CLI local ZIP) n'est plus supporté.

## Build de l'image

Si vous construisez l'image vous-même :

```bash
docker build -t bot-creator-runner .
```

## Volume persistant

Il est crucial de créer un volume pour conserver vos données entre les redémarrages du conteneur.

```bash
docker volume create bot_creator_data
```

Ce volume conserve les données Runner (configs synchronisées, variables, logs).

## Lancer le Runner API

Par défaut, l'image écoute sur `127.0.0.1`. Pour l'exposer via Docker, il faut forcer l'écoute sur `0.0.0.0` et définir un jeton bearer pour la sécurité.

```bash
docker run --rm \
  -p 8080:8080 \
  -e BOT_CREATOR_WEB_HOST=0.0.0.0 \
  -e BOT_CREATOR_API_TOKEN=votre-jeton-secret \
  -v bot_creator_data:/data \
  bot-creator-runner
```

L'image démarre en mode API par défaut.

## Endpoints principaux

Le runner expose les points d'entrée suivants :

- `GET /health` : Liveness check public.
- `GET /status` : État général du runner.
- `GET /metrics` : Métriques de performance.
- `GET /bots` : Liste des bots configurés.
- `POST /bots/sync` : Synchronisation des fichiers.
- `POST /bots/{id}/start` : Démarrage d'un bot.
- `POST /bots/{id}/stop` : Arrêt d'un bot.
- `GET /logs?limit=N` : Lecture des logs.

## Variables d'environnement utiles

| Variable | Description | Défaut |
|----------|-------------|--------|
| `BOT_CREATOR_WEB_HOST` | Interface d'écoute | `127.0.0.1` |
| `BOT_CREATOR_WEB_PORT` | Port d'écoute | `8080` |
| `BOT_CREATOR_API_TOKEN` | Jeton Bearer (Requis si hors loopback) | - |
| `BOT_CREATOR_DATA_DIR` | Dossier des configurations | `/data/bots` |
| `BOT_CREATOR_RUNNER_LOG_FILE` | Fichier de logs | `/data/logs/runner.log` |

## Note importante

Le binaire Runner est **API-only**. Les anciens usages CLI (ex: `--config` / ZIP local) ne font plus partie du comportement supporté.

`GET /health` reste public pour le liveness check. Tous les autres endpoints sont protégés par bearer token dès que `BOT_CREATOR_API_TOKEN` est configuré.
