---
layout: doc
title: $timeout
translation_key: docs
category: "Moderation"
function_name: timeout
syntax: $timeout[userID;duration;(reason)]
description: Met un utilisateur en timeout (silence temporaire).
---

# $timeout

La fonction `$timeout` **met un utilisateur en timeout** sur Discord. Pendant la durée spécifiée, l'utilisateur ne peut ni envoyer de messages, ni parler en vocal, ni réagir. Le bot doit avoir la permission `ModerateMembers`.

## Syntaxe

```
$timeout[userID;duration;(reason)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur. Obligatoire. |
| `duration` | Durée du timeout. Obligatoire. Formats acceptés : `s` (secondes), `m` (minutes), `h` (heures), `d` (jours). Exemples : `"60s"`, `"5m"`, `"1h"`, `"7d"`. |
| `reason` | Optionnel. La raison du timeout. |

## Valeur de retour

Aucune. L'utilisateur est mis en timeout pour la durée spécifiée.

## Exemples

### Timeout de 5 minutes

```bdfd
$timeout[$mentioned[1];5m;Spam dans le chat]
$sendMessage[⏳ <@$mentioned[1]> est en timeout pour 5 minutes.]
```

### Timeout d'une heure

```bdfd
$timeout[$mentioned[1];1h;Comportement toxique]
$sendMessage[⏳ Timeout d'1 heure appliqué.]
```

### Timeout de 7 jours

```bdfd
$timeout[$mentioned[1];7d;Non-respect répété des règles]
$sendMessage[⏳ Timeout de 7 jours appliqué. Prochaine infraction = ban.]
```

### Commande de timeout modulable

```bdfd
$if[$argsCount<2]
  $sendMessage[Usage: !timeout <@mention> <durée> <raison>]
  $stop
$endif

$timeout[$mentioned[1];$message[2];$message[3]]
$sendMessage[Timeout appliqué.]
```

## Notes

- Le bot doit avoir la permission `ModerateMembers`.
- La durée maximale est de 28 jours (limite Discord).
- Formats de durée : `s` secondes, `m` minutes, `h` heures, `d` jours.
- Pour retirer le timeout avant la fin, utilisez `$unTimeout`.
- Contrairement au mute, le timeout empêche aussi l'envoi de messages textuels.
