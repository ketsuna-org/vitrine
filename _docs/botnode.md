---
layout: doc
title: $botNode
translation_key: docs
category: "Entity Info"
function_name: botNode
syntax: $botNode
description: Returns the identifier of the nœud (runner) on lequel the bot est executed.
---

# $botNode

The `$botNode` function **returns the identifier of the nœud (runner)** on lequel the bot BDFD est currently executed. Each bot est assigné to un runner specific of l'infrastructure BDFD.

## Syntax

```
$botNode
```

## Parameters

Aucun.

## Return value

- **Type** : String
- L'identifier of the nœud (ex: `node-14`, `us-east-3`).

## Behavior

- Le nœud est attribué automatically par BDFD.
- Peut changer lors of une migration or maintenance.
- Utile for the diagnostic and the support technique.

## Examples

### Page of information technique

```bdfd
$title[🔧 Informations techniques]
$addField[🤖 Bot;$botName;yes]
$addField[🆔 ID;$botID;yes]
$addField[📦 Node;$botNode;yes]
$addField[⚡ Runtime;$nodeVersion;yes]
$addField[📝 Langage;$scriptLanguage;yes]
$footer[Hosting expire : $hostingExpireTime]
$color[#5865F2]
$sendMessage[]
```

### Command debug (réservée owner)

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Réservé to the owner.]
  $stop
$endif

$title[🛠️ Debug Bot]
$description[
**Nom :** $botName
**ID :** $botID
**Node :** $botNode
**Runtime :** $nodeVersion
**Langage :** $scriptLanguage
**Commands :** $commandsCount
**CPU :** $cpu
**RAM :** $ram
]
$sendMessage[]
```

### Signature of message

```bdfd
$sendMessage[Message traité par $botName]
$footer[Node: $botNode | $nodeVersion]
```

## Notes

- Le nœud est géré automatically par BDFD.
- En cas of problème of performance, indiquez votre `$botNode` to the support BDFD.
- For the version of the runtime, use `$nodeVersion`.
- For the langage of script, use `$scriptLanguage`.
