---
layout: doc
title: $botNode
translation_key: docs
category: "Entity Info"
function_name: botNode
syntax: $botNode
description: Retourne l'identifiant du nœud (runner) sur lequel le bot est exécuté.
---

# $botNode

La fonction `$botNode` **retourne l'identifiant du nœud (runner)** sur lequel le bot BDFD est actuellement exécuté. Chaque bot est assigné à un runner spécifique de l'infrastructure BDFD.

## Syntaxe

```
$botNode
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- L'identifiant du nœud (ex: `node-14`, `us-east-3`).

## Comportement

- Le nœud est attribué automatiquement par BDFD.
- Peut changer lors d'une migration ou maintenance.
- Utile pour le diagnostic et le support technique.

## Exemples

### Page d'information technique

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

### Commande debug (réservée owner)

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Réservé au propriétaire.]
  $stop
$endif

$title[🛠️ Debug Bot]
$description[
**Nom :** $botName
**ID :** $botID
**Node :** $botNode
**Runtime :** $nodeVersion
**Langage :** $scriptLanguage
**Commandes :** $commandsCount
**CPU :** $cpu
**RAM :** $ram
]
$sendMessage[]
```

### Signature de message

```bdfd
$sendMessage[Message traité par $botName]
$footer[Node: $botNode | $nodeVersion]
```

## Notes

- Le nœud est géré automatiquement par BDFD.
- En cas de problème de performance, indiquez votre `$botNode` au support BDFD.
- Pour la version du runtime, utilisez `$nodeVersion`.
- Pour le langage de script, utilisez `$scriptLanguage`.
