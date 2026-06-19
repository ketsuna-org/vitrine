---
layout: doc
title: $nodeVersion
translation_key: docs
category: "Entity Info"
function_name: nodeVersion
syntax: $nodeVersion
description: Returns the version du runtime Node.js sur lequel the bot s'exécute.
---

# $nodeVersion

The function `$nodeVersion` **retourne la version currentle du runtime Node.js** sur lequel the bot BDFD est executed.

## Syntax

```
$nodeVersion
```

## Parameters

Aucun.

## Return Value

- **Type** : String
- La version de Node.js (ex: `v18.15.0`, `v20.10.0`).

## Behavior

- Returns the version complete with the préfixe `v`.
- La version est déterminée par l'infrastructure BDFD (non modifiable).
- Utile for the débogage and la compatibilité des functionnalités.

## Examples

### Compatibilité de functionnalité

```bdfd
$var[version;$nodeVersion]
$var[major;$textSplit[$var[version];v]]
$var[major;$textSplit[$var[major];.;1]]

$if[$var[major]>=18]
  $sendMessage[✅ Votre runtime supporte les lasts functionnalités.]
$else
  $sendMessage[⚠️ Runtime old. Certaines functions can be limitées.]
$endif
```

### Information technique

```bdfd
$title[🛠️ Environnement technique]
$description[
**Bot :** $botName
**Node :** $botNode
**Runtime :** $nodeVersion
**Langage :** $scriptLanguage
**Commands :** $commandsCount
]
$footer[Infrastructure BDFD]
$sendMessage[]
```

### Log de démarrage

```bdfd
$log[🚀 $botName started | Node: $botNode | Runtime: $nodeVersion | Lang: $scriptLanguage]
```

## Notes

- Version en lecture seule, gérée par BDFD.
- Mise à day automatique par l'infrastructure BDFD.
- Pour des informations sur le nœud, utilisez `$botNode`.
- Pour le langage de script, utilisez `$scriptLanguage`.
