---
layout: doc
title: $workflowResponse
translation_key: docs
category: "Workflows & Automations"
function_name: workflowResponse
syntax: $workflowResponse
description: Returns the last response or value produite par un workflow BDFD. Utile pour enstringr workflows or récupérer results.
---
# $workflowResponse

The function `$workflowResponse` retourne la **last response** produite par un workflow BDFD.

## Syntax

```
$workflowResponse
```

## Parameters

Aucun.

## Return Value

- **Type** : String
- The value retournée par le last workflow executed.
- String vide si no workflow n'a encore été callé.

## Behavior

- Stocke the response of the last `$workflow[]` callé.
- The value persiste until la fin of the command or jusqu'au prochain workflow.
- Allows composer strings of workflows.

## Examples

### Caller and récupérer

```bdfd
$workflow[calculSalaire;$authorID]
$sendMessage[Votre salaire calculated : $workflowResponse €]
```

### String of workflows

```bdfd
$workflow[verifyUser;$authorID]
$if[$workflowResponse==ok]
  $workflow[processOrder;$input]
  $sendMessage[Command traitée : $workflowResponse]
$else
  $sendMessage[Vérification échouée.]
$endif
```

### Log of workflow

```bdfd
$workflow[dailyReward;$authorID]
$log[Daily reward pour $username : $workflowResponse]
$sendMessage[$workflowResponse]
```

### Workflow conditionnel

```bdfd
$workflow[checkBan;$mentioned[1]]
$if[$workflowResponse!="clean"]
  $sendMessage[Cet user est banni : $workflowResponse]
$else
  $sendMessage[Aucun ban found.]
$endif
```

## Notes

- `$workflowResponse` est écrasé to each nouvel call of `$workflow[]`.
- Stockez the value in a variable si vous devez la réuse : `$let[rep;$workflowResponse]`.
- The response dépend entièrement of ce que le workflow retourne via `$sendMessage` or `$return`.
