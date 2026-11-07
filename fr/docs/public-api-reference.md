---
layout: doc
title: Routes de l'API publique
category: "Général"
category_key: "Meta"
description: Toutes les routes de l'API publique /v1 de Bot Creator avec leur méthode, la permission requise et une courte description. Réservé à Premium.
locale: fr
lang: fr
content_language: fr
translation_key: doc-public-api-reference
permalink: /fr/docs/public-api-reference/
sidebar_context: docs_fr
---

Toutes les routes de l'API publique. Lisez d'abord le [guide de l'API publique]({{ '/fr/docs/public-api/' | relative_url }}) pour l'authentification, les permissions, les limites et les erreurs. Le contrat lisible par machine est `https://api.bot-creator.fr/v1/openapi.json` (OpenAPI 3.1).

URL de base : `https://api.bot-creator.fr`. Envoyez `Authorization: Bearer bcm_k_...` sur toutes les routes sauf le contrat. `{botId}` doit être le bot de la clé ; `GET /v1/bot` est un raccourci qui n'a pas besoin d'identifiant.

## Bot

| Route | Permission | Description |
|---|---|---|
| `GET /v1/bot` | `read:bots` | Le bot de la clé |
| `GET /v1/bots/{botId}` | `read:bots` | Nom, moteur, compteurs et réglages non secrets (jamais le jeton Discord) |

## Commandes

| Route | Permission | Description |
|---|---|---|
| `GET /v1/bots/{botId}/commands` | `read:bots` | Lister les commandes. Paramètres : `limit` (1 à 100), `cursor`, `state` |
| `POST /v1/bots/{botId}/commands` | `write:commands` | Créer une commande. Corps `{ "command": {...} }`. `409 already_exists` si l'identifiant est pris |
| `GET /v1/bots/{botId}/commands/{commandId}` | `read:bots` | Lire une commande |
| `PUT /v1/bots/{botId}/commands/{commandId}` | `write:commands` | Créer ou remplacer |
| `PATCH /v1/bots/{botId}/commands/{commandId}` | `write:commands` | Patch de fusion JSON (RFC 7386). L'identifiant ne change pas |
| `DELETE /v1/bots/{botId}/commands/{commandId}` | `write:commands` | Supprimer définitivement, historique compris. La retire aussi de Discord si elle est publiée |
| `GET /v1/bots/{botId}/commands/{commandId}/history` | `read:bots` | 5 dernières versions |
| `POST /v1/bots/{botId}/commands/{commandId}/rollback/{historyId}` | `write:commands` | Restaurer une version |

## Publication sur Discord

| Route | Permission | Description |
|---|---|---|
| `GET /v1/bots/{botId}/commands/{commandId}/publication` | `read:bots` | Enregistrement (`none`, `global`, `guilds`), état et publications par serveur |
| `POST /v1/bots/{botId}/commands/{commandId}/publication` | `publish:commands` | Publier. Corps `{ "registration": "global" }` ou `{ "registration": "guilds", "guild_ids": ["..."] }` |
| `DELETE /v1/bots/{botId}/commands/{commandId}/publication` | `publish:commands` | Retirer de Discord, garder dans Bot Creator |

`state` vaut `local`, `published`, `out_of_sync`, `unpublished`, `error` ou `unknown`. Les `guild_ids` sont des identifiants Discord de 17 à 20 chiffres.

## Workflows

| Route | Permission | Description |
|---|---|---|
| `GET /v1/bots/{botId}/workflows` | `read:bots` | Lister les workflows (paginé) |
| `GET /v1/bots/{botId}/workflows/{name}` | `read:bots` | Lire un workflow |
| `PUT /v1/bots/{botId}/workflows/{name}` | `write:workflows` | Créer ou remplacer. Corps `{ "workflow": {...} }` |
| `DELETE /v1/bots/{botId}/workflows/{name}` | `write:workflows` | Supprimer |

## Variables

`scope` vaut `global`, `user`, `guild`, `channel` ou `guildMember`.

| Route | Permission | Description |
|---|---|---|
| `GET /v1/bots/{botId}/variables` | `read:bots` | Valeurs globales et définitions de variables (noms ressemblant à un secret masqués) |
| `GET /v1/bots/{botId}/variables/{scope}/{key}` | `read:bots` | Avec `scope_id` (et `scope_aux_id`) : une valeur, `{ scope, key, found, value }`. Sans : les valeurs enregistrées, paginées |
| `PUT /v1/bots/{botId}/variables/{scope}/{key}` | `write:settings` | Corps `{ "value": ..., "scope_id"?, "scope_aux_id"? }`. Crée la définition si elle manque |
| `DELETE /v1/bots/{botId}/variables/{scope}/{key}` | `write:settings` | Supprimer une valeur, garder la définition |

## Liste des Premium (publique)

| Route | Permission | Description |
|---|---|---|
| `GET /premiums-list` | aucune, sans clé | Tableau JSON des identifiants Discord (chaînes) des comptes ayant un Premium actif, et rien d'autre |

Cette route n'a besoin d'aucune clé d'API et est ouverte à tous : un bot peut ainsi vérifier si un membre est Premium. Seuls les comptes connectés avec Discord y figurent. La réponse est mise en cache 5 minutes (`Cache-Control: public, max-age=300`) : un changement peut mettre quelques minutes à apparaître. Limité à 60 requêtes par minute et par adresse IP (`429` au-delà). Exemple : `["123456789012345678","234567890123456789"]`.

## Contrat

| Route | Permission | Description |
|---|---|---|
| `GET /v1/openapi.json` | aucune | Contrat OpenAPI 3.1 |

## Conventions des réponses

- Listes : `{ "items": [...], "next_cursor": "..." | null }`.
- Les écritures renvoient l'objet enregistré, une `revision` et `runner_synced` (avec `runner_sync_reason` et `next_step` quand il vaut `false`). Les commandes renvoient aussi `compile.warnings`, `discord_publish` et `discord_error` quand Discord est concerné.
- Erreurs : `{ "code", "message", "details", "request_id" }`.
- En-têtes de limite : `X-RateLimit-Limit`, `X-RateLimit-Remaining` ; sur `429`, `Retry-After` et `X-RateLimit-Reset`.
