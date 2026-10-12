---
layout: doc
title: "$timeout — fonction BDScript"
category: "Modération"
category_key: "Moderation"
function_name: timeout
syntax: $timeout[duration;(userID)]
description: Exclut temporairement un utilisateur (mise sous silence temporaire).
locale: fr
lang: fr
content_language: fr
translation_key: doc-timeout
permalink: /fr/docs/timeout/
sidebar_context: docs_fr
---

# $timeout

La fonction `$timeout` place un utilisateur en exclusion temporaire (timeout) sur Discord. Elle définit l'exclusion temporaire de communication de Discord sur le membre jusqu'à ce que la durée donnée soit écoulée. Le bot doit avoir la permission `ModerateMembers`.

## Syntaxe

```
$timeout[duration;(userID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `duration` | Durée de l'exclusion temporaire. Obligatoire. Unités acceptées : `ms`, `s`, `m`, `h`, `d`, `w`, `y` (ainsi que `millisecond`, `sec`, `second`, `min`, `minute`, `hour`, `day`, `week`, `year`, et leurs formes plurielles), qui peuvent être combinées (par exemple `1h30m`) ; les décimales sont acceptées. Un nombre seul est lu comme des secondes. Exemples : `60s`, `5m`, `1h`, `7d`. Doit être positive et d'au plus 28 jours, sinon une erreur est levée. |
| `userID` | Facultatif - L'ID de l'utilisateur. S'il est omis ou vide, l'exclusion temporaire est appliquée à chaque utilisateur mentionné dans le message ; une erreur est levée s'il n'y en a aucun. |

## Valeur de retour

Aucune (chaîne vide). L'utilisateur est exclu temporairement pendant la durée indiquée. Une erreur est levée si la durée ou l'ID d'utilisateur est invalide, ou si le bot ne peut pas exclure temporairement l'utilisateur.

## Exemples

### Exclusion temporaire de 5 minutes

```bdfd
$timeout[5m;$mentioned[1]]
$sendMessage[⏳ <@$mentioned[1]> has been timed out for 5 minutes.]
```

### Exclusion temporaire d'une heure

```bdfd
$timeout[1h;$mentioned[1]]
$sendMessage[⏳ 1-hour timeout applied.]
```

### Exclusion temporaire de 7 jours

```bdfd
$timeout[7d;$mentioned[1]]
$sendMessage[⏳ 7-day timeout applied. Next infraction will result in a ban.]
```

### Commande d'exclusion temporaire personnalisable

```bdfd
$timeout[$message[2];$mentioned[1]]
$sendMessage[Timeout applied.]
```

## Remarques

- Le bot doit avoir la permission `ModerateMembers`.
- La durée maximale est de 28 jours.
- `$timeout` n'a pas de paramètre de raison.
- Le bot ne peut pas exclure temporairement le propriétaire du serveur, un administrateur, ou un membre dont le rôle le plus élevé n'est pas inférieur au sien.
- Pour lever une exclusion temporaire avant son terme, utilisez `$unTimeout`.
