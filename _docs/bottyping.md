---
layout: doc
title: $botTyping
translation_key: docs
category: "Moderation"
function_name: botTyping
syntax: $botTyping
description: Déclenche l'indicateur of saisie (typing indicator) in the channel courant. Montre to the users only the bot est en train of écrire.
---

# $botTyping

The `$botTyping[]` function **trigger l'indicateur of saisie** ("Bot is typing...") in the channel where la command est executede.

## Syntax

```
$botTyping
```

## Parameters

Cette function ne prend auca parameter.

## Return value

Cette function does not return a value.

## Behavior

- L'indicateur of saisie dure environ 10 seconds or up to l'envoi of a message.
- Utile pour simuler a delay of traitement or donner un feedback visual.
- L'indicateur s'stops automatically if a message is sent.

## Examples

### Traitement with feedback

```bdfd
$botTyping
$wait[3]
$sendMessage[Traitement terminé ! Voici the results...]
```

### Simulation of recherche

```bdfd
$botTyping
$wait[2]
$sendMessage[🔍 Recherche in the base of datas...]
$botTyping
$wait[2]
$sendMessage[✅ Results founds !]
```

### Enstringment with action longue

```bdfd
$botTyping
$let[result;$httpGet[https://api.example.com/data]]
$if[$result!=]
  $sendMessage[Datas récupérées with success.]
$else
  $sendMessage[Error during la récupération.]
$endif
```

## Notes

- L'indicateur est purement cosmétique, no effet on the processing réel.
- Particulièrement utile for commands with `$wait[]` or calls API.
- Ne functionne que in thes canaux text.
