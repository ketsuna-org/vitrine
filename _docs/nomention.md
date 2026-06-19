---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $noMention

Désactive les mentions in the response. Lors of une response (reply), the user ne sera pas pingé/mentionné.

## Syntax

```
$noMention
```

## Description

`$noMention` est un **flag** (without arguments) qui s'utilise before `$sendMessage`, generally en combinaison with `$reply`. Il empêche la mention/ping of the user in a response, ce qui est utile pour responses silencieuses.

Par default, `$reply` ping l'auteur of the message cible. `$noMention` supprime ce comportement.

## Examples

### Response silencieuse

```
$reply
$noMention
$sendMessage[Voici votre response, without notification]
```

### Response discrète with embeds

```
$reply
$noMention
$newEmbed[title=Result;description=Opération terminée;color=#2ECC71]
$sendMessage[]
```

### Dans une interaction

```
$onInteraction
$if[$customID==btn_sislow]
  $reply
  $noMention
  $sendMessage[Action effectuée silencieusement]
$endif
```

## Compareason

| Flag | Effet |
|------|-------|
| *(no)* | Comportement default |
| `$noMention` | Désactive all mentions |
| `$allowMention` | Active les mentions (explicite) |

## Notes

- `$noMention` désactive le ping user, pas les autres types of mentions (@everyone, @role).
- Particulièrement utile with `$reply` pour responses non intrusives.
- Flag to placer before `$sendMessage`.
