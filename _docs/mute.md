---
layout: doc
title: $mute
translation_key: docs
category: "Moderation"
function_name: mute
syntax: $mute[userID;(reason)]
description: Rend muet un utilisateur sur le serveur.
---

# $mute

La fonction `$mute` **rend muet un utilisateur** sur le serveur Discord. Cela l'empêche de parler dans les salons vocaux. Le bot doit avoir la permission `MuteMembers`.

## Syntaxe

```
$mute[userID;(reason)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur à rendre muet. Obligatoire. |
| `reason` | Optionnel. La raison de la sourdine. |

## Valeur de retour

Aucune. L'utilisateur est rendu muet.

## Exemples

### Mute simple

```bdfd
$mute[$mentioned[1];Spam vocal]
$sendMessage[<@$mentioned[1]> a été rendu muet pour spam vocal.]
```

### Mute avec commande modération

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !mute <@mention> <raison>]
  $stop
$endif

$mute[$mentioned[1];$replaceText[$message;-;$mentioned[1];]]
$sendMessage[🔇 <@$mentioned[1]> est maintenant muet.]
```

### Vérification avant mute

```bdfd
$if[$isAdmin==true]
  $mute[$mentioned[1];Non-respect des règles vocales]
  $sendMessage[Membre rendu muet.]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- Le bot doit avoir la permission `MuteMembers`.
- Le mute empêche de parler en vocal, pas d'écrire dans les salons textuels.
- Pour empêcher l'envoi de messages, créez un rôle sans permission d'écriture et utilisez `$giveRole`.
- Pour retirer le mute, utilisez `$unmute`.
- Pour un silence temporaire, utilisez `$timeout`.
