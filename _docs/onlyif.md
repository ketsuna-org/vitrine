---
layout: doc
title: $onlyIf[]
translation_key: docs
category: "Control Flow"
function_name: onlyIf
syntax: $onlyIf[condition] or $onlyIf[condition;errorMessage]
description: Condition guard that stops command execution if the condition evaluates to false. Optionally sends an error message before stopping.
parameters:
  - name: condition
    type: string
    required: true
    description: A boolean expression to evaluate. If the condition is true, execution continues. If false, execution stops.
  - name: errorMessage
    type: string
    required: false
    description: Optional message to send to the user before stopping execution. If omitted, execution stops silently.
returns:
  type: void
  description: Returns nothing. Execution either continues (condition true) or stops immediately (condition false).
related:
  - onlyIfMessageContains
  - argsCheck
  - stop
  - suppressErrors
examples:
  - title: Stop si l'utilisateur n'est pas admin
    code: |
      $onlyIf[$hasPerms[$authorID;Administrator];❌ Vous n'avez pas la permission d'utiliser cette commande.]
      Commande exécutée avec succès.
  - title: Stop silencieux (sans message)
    code: |
      $onlyIf[$isNumber[$message]==true]
      Traitement du nombre...
  - title: Blocage avec plusieurs conditions
    code: |
      $onlyIf[$isNumber[$message]==true;❌ Veuillez entrer un nombre valide.]
      $onlyIf[$message>0;❌ Le nombre doit être positif.]
      Le nombre $message est valide.
---
$onlyIf is the fundamental guard function in BDFD. It acts as a gatekeeper: if the condition passes, the command continues; if it fails, the command stops dead. This is the building block for permissions checks, input validation, and any scenario where you need to abort early.

## How It Works

1. The `condition` is evaluated as a boolean expression.
2. If the condition is **true** → execution continues to the next line.
3. If the condition is **false** → the optional `errorMessage` is sent (if provided), then execution **stops immediately** via `BotCreatorActionType.stop`. No further code in the command runs.

## Two-Argument Form

```
$onlyIf[condition;errorMessage]
```

When `errorMessage` is provided and the condition fails, the message is sent to the channel before stopping. This is the recommended form — it gives feedback to the user about why the command failed.

## Single-Argument Form

```
$onlyIf[condition]
```

When no error message is provided and the condition fails, execution stops silently. The user receives no response. Use this when you want to silently reject invalid input without cluttering the chat.

## Common Patterns

### Permission Guards

```bdfd
$onlyIf[$hasPerms[$authorID;BanMembers];❌ Permission BanMembers requise.]
$onlyIf[$authorID!=$mentioned[1];❌ Vous ne pouvez pas vous bannir vous-même.]
```

### Input Validation

```bdfd
$onlyIf[$isNumber[$message]==true;❌ Veuillez entrer un nombre.]
$onlyIf[$message>=1;❌ Le nombre doit être >= 1.]
$onlyIf[$message<=100;❌ Le nombre doit être <= 100.]
```

### Channel/Role Restrictions

```bdfd
$onlyIf[$channelID==123456789012345678;❌ Cette commande ne peut être utilisée que dans <#123456789012345678>.]
```

## Comparison with $if / $stop

Without `$onlyIf`:
```
$if[$hasPerms[$authorID;Administrator]==false]
❌ Permission refusée.
$stop
$endif
```

With `$onlyIf` (equivalent, cleaner):
```
$onlyIf[$hasPerms[$authorID;Administrator];❌ Permission refusée.]
```

`$onlyIf` is the idiomatic way to write guards — it is shorter, more readable, and signals intent clearly: "only continue if this condition holds."
