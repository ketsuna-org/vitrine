---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $noMention

Désactive les mentions in the response. Lors d'une response (reply), the user ne sera pas pingé/mentionné.

## Syntax

```
$noMention
```

## Description

`$noMention` est un **flag** (without arguments) qui s'utilise before `$sendMessage`, generally en combinaison avec `$reply`. Il empêche la mention/ping of the user dans une response, ce qui est utile pour des responses silencieuses.

Par default, `$reply` ping l'auteur of the message cible. `$noMention` supprime ce comportement.

## Examples

### Response silencieuse

```
$reply
$noMention
$sendMessage[Voici votre response, without notification]
```

### Response discrète avec embeds

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

- `$noMention` désactive le ping user, pas les autres types de mentions (@everyone, @role).
- Particulièrement utile avec `$reply` pour des responses non intrusives.
- Flag à placer before `$sendMessage`.
