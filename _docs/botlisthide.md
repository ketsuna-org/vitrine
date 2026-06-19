---
layout: doc
title: $botListHide
translation_key: docs
category: "Entity Info"
function_name: botListHide
syntax: $botListHide
description: Masque le bot de la liste publique des bots BDFD (bot list).
---

# $botListHide

La fonction `$botListHide` **retire le bot de la liste publique des bots BDFD** (Bot List). Une fois masqué, le bot n'apparaît plus dans l'annuaire communautaire.

## Syntaxe

```
$botListHide
```

## Paramètres

Aucun.

## Valeur de retour

Aucune. Le bot est masqué de la liste publique.

## Comportement

- Action irréversible via script (contactez le support pour ré-afficher le bot).
- Le bot continue de fonctionner normalement.
- Seule la visibilité dans l'annuaire BDFD est affectée.

## Exemples

### Masquage simple

```bdfd
$botListHide
$sendMessage[🔒 Le bot a été retiré de la liste publique BDFD.]
```

### Commande owner sécurisée

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Cette commande est réservée au propriétaire.]
  $stop
$endif

$botListHide
$sendMessage[✅ **$botName** a été masqué de la bot list BDFD.
⚠️ Cette action est définitive. Contactez le support pour annuler.]
```

### Panneau de configuration

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Réservé au propriétaire.]
  $stop
$endif

$var[action;$message[1]]
$if[$var[action]==hide]
  $botListHide
  $sendMessage[🔒 Bot masqué.]
$elseif[$var[action]==desc]
  $botListDescription[$message[2]]
  $sendMessage[📝 Description mise à jour.]
$else
  $sendMessage[❌ Usage: !botconfig <hide|desc> [texte]]
$endif
```

## Notes

- `$botListHide` est définitif via script.
- Pour gérer la description, utilisez `$botListDescription[]`.
- Le bot reste pleinement fonctionnel même masqué.
- Utilisez cette fonction si vous ne souhaitez pas que votre bot apparaisse dans l'annuaire public.
