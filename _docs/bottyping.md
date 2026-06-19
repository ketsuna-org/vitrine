---
layout: doc
title: $botTyping
translation_key: docs
category: "Moderation"
function_name: botTyping
syntax: $botTyping
description: Déclenche l'indicateur de saisie (typing indicator) in the channel courant. Montre aux users only the bot est en train d'écrire.
---

# $botTyping

The `$botTyping[]` function **déclencher l'indicateur de saisie** ("Bot is typing...") in the channel where la command est executede.

## Syntax

```
$botTyping
```

## Parameters

Cette function ne prend auca parameter.

## Return value

Cette function does not return a value.

## Behavior

- L'indicateur de saisie dure environ 10 seconds or up to l'envoi of a message.
- Utile pour simuler a delay de traitement or donner un feedback visuel.
- L'indicateur s'stops automatically if a message is sent.

## Examples

### Traitement avec feedback

```bdfd
$botTyping
$wait[3]
$sendMessage[Traitement terminé ! Voici the results...]
```

### Simulation de recherche

```bdfd
$botTyping
$wait[2]
$sendMessage[🔍 Recherche in the base de datas...]
$botTyping
$wait[2]
$sendMessage[✅ Results founds !]
```

### Enstringment avec action longue

```bdfd
$botTyping
$let[result;$httpGet[https://api.example.com/data]]
$if[$result!=]
  $sendMessage[Datas récupérées avec success.]
$else
  $sendMessage[Error during la récupération.]
$endif
```

## Notes

- L'indicateur est purement cosmétique, no effet sur the processing réel.
- Particulièrement utile for commands avec `$wait[]` or calls API.
- Ne functionne que in thes canaux text.
