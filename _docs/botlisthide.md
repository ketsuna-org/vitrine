---
layout: doc
title: $botListHide
translation_key: docs
category: "Entity Info"
function_name: botListHide
syntax: $botListHide
description: Masque the bot de la list public des bots BDFD (bot list).
---

# $botListHide

The `$botListHide` function **retire the bot de la list public des bots BDFD** (Bot List). A fois hidden, the bot n'apparaît plus in the annuaire communautaire.

## Syntax

```
$botListHide
```

## Parameters

Aucun.

## Return value

None. The bot est hidden de la list public.

## Behavior

- Action irréversible via script (contactez le support pour ré-afficher the bot).
- The bot continue de functionner normalement.
- Seule la visibilité in the annuaire BDFD est affectée.

## Examples

### Masquage simple

```bdfd
$botListHide
$sendMessage[🔒 The bot has been retiré de la list public BDFD.]
```

### Command owner sécurisée

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Cette command est réservée au owner.]
  $stop
$endif

$botListHide
$sendMessage[✅ **$botName** has been hidden de la bot list BDFD.
⚠️ Cette action est définitive. Contactez le support pour annuler.]
```

### Panneau de configuration

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Réservé au owner.]
  $stop
$endif

$var[action;$message[1]]
$if[$var[action]==hide]
  $botListHide
  $sendMessage[🔒 Bot hidden.]
$elseif[$var[action]==desc]
  $botListDescription[$message[2]]
  $sendMessage[📝 Description mise à day.]
$else
  $sendMessage[❌ Usage: !botconfig <hide|desc> [text]]
$endif
```

## Notes

- `$botListHide` est définitif via script.
- Pour gérer la description, use `$botListDescription[]`.
- The bot reste pleinement functionnel même hidden.
- Use cette function si vous ne souhaitez pas que votre bot apparaisse in the annuaire public.
