---
layout: doc
title: $nodeVersion
translation_key: docs
category: "Entity Info"
function_name: nodeVersion
syntax: $nodeVersion
description: Retourne la version du runtime Node.js sur lequel le bot s'exécute.
parameters: []
returns:
  - type: string
    description: "La version de Node.js (ex: v18.15.0)."
related:
  - $botNode
  - $scriptLanguage
  - $hostingExpireTime
examples:
  - description: Afficher la version
    code: |
      $sendMessage[Node.js : $nodeVersion]
  - description: Debug info
    code: |
      $sendMessage[Runtime: "$nodeVersion | Node: $botNode | Lang: $scriptLanguage]"
---

# $nodeVersion

La fonction `$nodeVersion` **retourne la version actuelle du runtime Node.js** sur lequel le bot BDFD est exécuté.

## Syntaxe

```
$nodeVersion
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- La version de Node.js (ex: `v18.15.0`, `v20.10.0`).

## Comportement

- Retourne la version complète avec le préfixe `v`.
- La version est déterminée par l'infrastructure BDFD (non modifiable).
- Utile pour le débogage et la compatibilité des fonctionnalités.

## Exemples

### Compatibilité de fonctionnalité

```bdfd
$var[version;$nodeVersion]
$var[major;$textSplit[$var[version];v]]
$var[major;$textSplit[$var[major];.;1]]

$if[$var[major]>=18]
  $sendMessage[✅ Votre runtime supporte les dernières fonctionnalités.]
$else
  $sendMessage[⚠️ Runtime ancien. Certaines fonctions peuvent être limitées.]
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
**Commandes :** $commandsCount
]
$footer[Infrastructure BDFD]
$sendMessage[]
```

### Log de démarrage

```bdfd
$log[🚀 $botName démarré | Node: $botNode | Runtime: $nodeVersion | Lang: $scriptLanguage]
```

## Notes

- Version en lecture seule, gérée par BDFD.
- Mise à jour automatique par l'infrastructure BDFD.
- Pour des informations sur le nœud, utilisez `$botNode`.
- Pour le langage de script, utilisez `$scriptLanguage`.
