---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $noMention

Désactive les mentions dans la réponse. Lors d'une réponse (reply), l'utilisateur ne sera pas pingé/mentionné.

## Syntaxe

```
$noMention
```

## Description

`$noMention` est un **flag** (sans arguments) qui s'utilise avant `$sendMessage`, généralement en combinaison avec `$reply`. Il empêche la mention/ping de l'utilisateur dans une réponse, ce qui est utile pour des réponses silencieuses.

Par défaut, `$reply` ping l'auteur du message cible. `$noMention` supprime ce comportement.

## Exemples

### Réponse silencieuse

```
$reply
$noMention
$sendMessage[Voici votre réponse, sans notification]
```

### Réponse discrète avec embeds

```
$reply
$noMention
$newEmbed[title=Résultat;description=Opération terminée;color=#2ECC71]
$sendMessage[]
```

### Dans une interaction

```
$onInteraction
$if[$customID==btn_silent]
  $reply
  $noMention
  $sendMessage[Action effectuée silencieusement]
$endif
```

## Comparaison

| Flag | Effet |
|------|-------|
| *(aucun)* | Comportement par défaut |
| `$noMention` | Désactive toutes les mentions |
| `$allowMention` | Active les mentions (explicite) |

## Notes

- `$noMention` désactive le ping utilisateur, pas les autres types de mentions (@everyone, @role).
- Particulièrement utile avec `$reply` pour des réponses non intrusives.
- Flag à placer avant `$sendMessage`.
