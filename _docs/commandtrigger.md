---
layout: doc
title: $commandTrigger
translation_key: docs
category: "Entity Info"
function_name: commandTrigger
syntax: $commandTrigger
description: Returns the déclencheur (trigger) of the command in progress d'execution.
---

# $commandTrigger

The `$commandTrigger` function **returns the déclencheur complete** of the command in progress, incluant le préfixe or the slash. Par example, if the command `help` est déclenchée par `!help`, le trigger retourné est `!help`.

## Syntax

```
$commandTrigger
```

## Parameters

Aucun.

## Return value

- **Type** : String
- Le trigger complete of the command (préfixe + nom, or `/nom` for slash).

## Behavior

- For commands prefix : returns the préfixe + nom (ex: `!help`, `?ban`).
- For commands slash : retourne `/nom` (ex: `/help`).
- Le préfixe dépend de la configuration of the bot.

## Examples

### Message error avec usage

```bdfd
$if[$message[1]==]
  $sendMessage[❌ **Usage :** $commandTrigger <user> <reason>
  Example : $commandTrigger @user Spam]
  $stop
$endif
```

### Aide contextuelle

```bdfd
$title[📖 Aide : $commandName]
$description[
**Command :** $commandTrigger
**Type :** $commandType
**Folder :** $commandFolder

**Usage :**
`$commandTrigger <param1> [param2]`

**Example :**
`$commandTrigger value1 optional`
]
$sendMessage[]
```

### Log détaillé

```bdfd
$log[📌 CMD | User: $userName | Trigger: $commandTrigger | Name: $commandName | Type: $commandType | Server: $serverName]
```

### Information in the embed

```bdfd
$title[⚡ Execution]
$addField[Command;$commandName;yes]
$addField[Trigger;$commandTrigger;yes]
$addField[Type;$commandType;yes]
$addField[Auteur;$userName;yes]
$addField[Folder;$commandFolder;yes]
$footer[Executed le $formatDate[$dateStamp]]
$sendMessage[]
```

## Notes

- `$commandTrigger` inclut le préfixe (ex: `!help`), contrairement à `$commandName` (qui retourne `help`).
- For the nom without préfixe, use `$commandName`.
- Pour savoir si this is une command slash, use `$isSlash` or `$commandType`.
- Le préfixe can be extracted avec `$charAt[$commandTrigger;1]`.
