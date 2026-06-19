---
layout: doc
title: $botListHide
translation_key: docs
category: "Entity Info"
function_name: botListHide
syntax: $botListHide
description: Masque the bot of la list public bots BDFD (bot list).
---

# $botListHide

The `$botListHide` function **retire the bot of la list public bots BDFD** (Bot List). A fois hidden, the bot n'apparaît plus in the annuaire communautaire.

## Syntax

```
$botListHide
```

## Parameters

Aucun.

## Return value

None. The bot est hidden of la list public.

## Behavior

- Action irréversible via script (contactez le support pour ré-display the bot).
- The bot continue of functionner normalement.
- Seule la visibilité in the annuaire BDFD est affectée.

## Examples

### Masquage simple

```bdfd
$botListHide
$sendMessage[🔒 The bot has been retiré of la list public BDFD.]
```

### Command owner sécurisée

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Cette command est réservée to the owner.]
  $stop
$endif

$botListHide
$sendMessage[✅ **$botName** has been hidden of la bot list BDFD.
⚠️ Cette action est définitive. Contactez le support pour annuler.]
```

### Panneau of configuration

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Réservé to the owner.]
  $stop
$endif

$var[action;$message[1]]
$if[$var[action]==hide]
  $botListHide
  $sendMessage[🔒 Bot hidden.]
$elseif[$var[action]==desc]
  $botListDescription[$message[2]]
  $sendMessage[📝 Description mise to day.]
$else
  $sendMessage[❌ Usage: !botconfig <hide|desc> [text]]
$endif
```

## Notes

- `$botListHide` est définitif via script.
- Pour gérer la description, use `$botListDescription[]`.
- The bot reste pleinement functionnel même hidden.
- Use cette function si vous ne souhaitez pas que votre bot apparaisse in the annuaire public.
