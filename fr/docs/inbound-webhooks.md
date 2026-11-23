---
layout: doc
title: Webhooks entrants
category: "Général"
category_key: "Meta"
description: "Laisser un autre service lancer un workflow de votre bot par une requête HTTP. Créer le webhook, trouver son URL, garder le secret, lire la payload en BDFD et en JavaScript, tester avec curl et corriger les erreurs courantes."
locale: fr
premium: true
lang: fr
content_language: fr
translation_key: doc-inbound-webhooks
permalink: /fr/docs/inbound-webhooks/
sidebar_context: docs_fr
---

Un webhook entrant donne une adresse web à l'un de vos workflows. Quand un autre service (une page de paiement, un serveur de jeu, un job de CI, un formulaire, un script à vous) envoie une requête à cette adresse, le workflow s'exécute sur votre bot. Il peut alors lire ce qui a été envoyé, poster un message, modifier une variable, etc.

Les webhooks entrants font partie de l'offre Premium. Un bot peut en avoir 5 au maximum.

## Créer un webhook

1. Créez d'abord le workflow à lancer. L'application vous le dit s'il n'y en a aucun.
2. Ouvrez votre bot, puis la page **Webhooks** (elle existe dans l'application et dans le Studio).
3. Choisissez **Ajouter un webhook**, puis renseignez :
   - **Chemin** : la fin de l'URL, par exemple `orders/new`. Deux webhooks d'un même bot ne peuvent pas avoir le même chemin, et la casse ne compte pas.
   - **Workflow cible** : le workflow à lancer.
   - **Secret du webhook** : appuyez sur **Générer**, ou saisissez le vôtre. Prenez une longue valeur aléatoire.
4. Enregistrez, puis utilisez **Copier l'URL**.

Le secret n'est montré qu'une fois, à sa génération. Le Manager ne le renvoie jamais ensuite : un webhook créé sur un autre appareil ou dans le Studio affiche « le secret n'est pas stocké sur cet appareil » quand vous copiez l'URL ailleurs. Modifiez le webhook et définissez un nouveau secret si vous l'avez perdu. Un webhook désactivé se comporte comme s'il n'existait pas.

## L'URL

```
https://api.bot-creator.fr/gateway/bots/<id du bot>/inbound/<chemin>
```

**Copier l'URL** dans l'application donne l'adresse avec l'identifiant de votre bot. Seul `POST` est accepté : un `GET` (par exemple ouvrir le lien dans un navigateur) répond `405`.

Le corps doit être un objet JSON (un corps de formulaire fonctionne aussi et donne une clé par champ ; un corps vide est un objet vide). Sur un bot Dart, il fait 256 Kio au maximum.

## Envoyer le secret

Placez le secret dans un en-tête. Les deux noms fonctionnent :

```
X-Webhook-Secret: <secret>
X-Bot-Webhook-Secret: <secret>
```

`?secret=<secret>` fonctionne aussi mais est déconseillé : les URL finissent dans les journaux d'accès. Préférez l'en-tête dès que l'appelant le permet.

## Tester avec curl

```bash
curl -X POST "https://api.bot-creator.fr/gateway/bots/<id du bot>/inbound/orders/new" \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: <secret>" \
  -d '{"userID":"123456789012345678","order":{"id":42,"items":["sword","shield"]}}'
```

Un succès répond `{"ok":true,...}`. Le workflow s'exécute ensuite : lisez les journaux du bot pour voir son résultat. Le bot doit être démarré pour recevoir la requête.

## Lire la payload dans un workflow BDFD

Dans un workflow Dart (BDFD ou visuel), la requête est disponible sous forme de variables et de deux fonctions.

| Quoi | Comment |
|---|---|
| Un champ du JSON | `$inboundPayload[order.id]`. Utilisez `.` pour entrer dans un objet et un nombre pour un élément de tableau : `$inboundPayload[order.items.0]`. Vide si le champ n'existe pas. |
| Le corps entier | `$inboundPayload` sans argument le rend en JSON. Combinez-le avec `$jsonParse` pour le parcourir. |
| Un en-tête | `$inboundHeader[X-Event]`, la casse du nom ne compte pas. |
| Adresse de l'appelant | `((inbound.source.ip))` |
| Identifiant de requête | `((inbound.request.id))` (l'en-tête `X-Request-Id`, si l'appelant l'envoie) |
| Clé de premier niveau | `((inbound.payload.userID))`, pour les clés de premier niveau seulement. |
| JSON brut | `((inbound.payload.json))` |
| Un en-tête en variable | `((inbound.header.x-event))`, nom en minuscules. |

Le secret et les cookies ne sont jamais transmis au workflow.

```bdfd
$sendMessage[Commande $inboundPayload[order.id] pour <@$inboundPayload[userID]> : $inboundPayload[order.items.0]]
```

## Lire la payload dans un workflow JavaScript

Un script JavaScript reçoit un objet global `webhook` :

| Champ | Contenu |
|---|---|
| `webhook.payload` | Le corps JSON, déjà analysé. Les champs imbriqués s'utilisent normalement. |
| `webhook.headers` | Les en-têtes de la requête (noms en minuscules). |
| `webhook.path` | Le chemin du webhook. |
| `webhook.sourceIp` | L'adresse de l'appelant. |
| `webhook.requestId` | L'en-tête `X-Request-Id`, ou une chaîne vide. |

```js
const id = webhook.payload?.order?.id;
const user = webhook.payload?.userID;
await channel.send(`Commande ${id} pour <@${user}>`);
```

`interaction` et `message` n'existent pas dans une exécution de webhook.

## Erreurs courantes

| Réponse | Sens et correction |
|---|---|
| `401` Invalid webhook secret | Le secret manque ou est faux. Envoyez-le dans `X-Webhook-Secret`. Sur un bot JavaScript, un webhook sans secret est aussi refusé : définissez-en un. |
| `403` Inbound webhooks are disabled | Le bot ne peut pas utiliser les webhooks entrants (Premium requis). Vérifiez l'offre du compte propriétaire du bot. |
| `404` Inbound webhook path not found | Le chemin est faux, ou le webhook est désactivé. Comparez avec la page de votre bot. |
| `405` | Vous avez utilisé `GET` (ou une autre méthode). Utilisez `POST`. |
| `409` Bot is not running | Démarrez le bot puis renvoyez la requête. |
| `400` | Le corps n'est pas un objet JSON, ou le webhook n'a pas de workflow cible. |
| `413` | Le corps dépasse la limite (256 Kio sur un bot Dart). |
| `500` | La requête n'a pas pu être traitée. Lisez les journaux du bot ; un échec dans le workflow lui-même y est aussi écrit. |
| `503` runner_not_assigned | Le bot n'est pas encore placé sur un nœud. Démarrez-le et réessayez. |

Les webhooks créés par l'API (`/v2/bots/<id>/inbound-webhooks`) suivent les mêmes règles.
