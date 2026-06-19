---
layout: doc
title: $scriptLanguage
translation_key: docs
category: "Entity Info"
function_name: scriptLanguage
syntax: $scriptLanguage
description: Retourne le langage de script utilisé par le bot (BDScript ou BDJS).
parameters: []
returns:
  - type: string
    description: "bdscript" ou "bdjs".
related:
  - $nodeVersion
  - $botNode
  - $hostingExpireTime
examples:
  - description: Vérifier le langage
    code: |
      $sendMessage[Langage : $scriptLanguage]
  - description: Afficher BDJS ou BDScript
    code: |
      $if[$scriptLanguage==bdjs]
        $sendMessage[Bot programmé en BDJS (JavaScript)]
      $else
        $sendMessage[Bot programmé en BDScript]
      $endif
---

# $scriptLanguage

La fonction `$scriptLanguage` **retourne le langage de script** configuré pour le bot sur la plateforme BDFD. Les valeurs possibles sont `bdscript` (langage natif BDFD) ou `bdjs` (JavaScript-like).

## Syntaxe

```
$scriptLanguage
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- `bdscript` : le bot utilise le langage BDScript natif.
- `bdjs` : le bot utilise BDJS (syntaxe JavaScript).

## Comportement

- Le langage est défini dans les paramètres du bot sur la console BDFD.
- BDJS permet d'utiliser des structures JavaScript (variables, fonctions, etc.).
- BDScript est le langage traditionnel basé sur les fonctions `$`.

## Exemples

### Vérification du mode

```bdfd
$if[$scriptLanguage==bdjs]
  $sendMessage[📝 Ce bot utilise **BDJS** (JavaScript).

  Vous pouvez utiliser la syntaxe JavaScript :
  ```js
  var x = 5;
  if (x > 3) { ... }
  ```]
$else
  $sendMessage[📝 Ce bot utilise **BDScript**.

  Syntaxe traditionnelle :
  ```bdfd
  $var[x;5]
  $if[$var[x]>3]
    ...
  $endif
  ```]
$endif
```

### Page information

```bdfd
$title[⚙️ Configuration du bot]
$addField[🤖 Nom;$botName;yes]
$addField[📝 Langage;$if[$scriptLanguage==bdjs]BDJS (JavaScript)$elseBDScript$endif;yes]
$addField[⚡ Runtime;$nodeVersion;yes]
$addField[📦 Node;$botNode;yes]
$footer[BDFD Bot Creator]
$color[#5865F2]
$sendMessage[]
```

### Aide contextuelle

```bdfd
;; Exemple de fonction qui s'adapte au langage
$if[$scriptLanguage==bdjs]
  $sendMessage[💡 En BDJS, utilisez `var` pour déclarer des variables.
  Exemple : `var x = 10;`]
$else
  $sendMessage[💡 En BDScript, utilisez `$var[]` pour déclarer des variables.
  Exemple : `$var[x;10]`]
$endif
```

## Notes

- Valeurs possibles : `bdscript` ou `bdjs`.
- Le choix du langage est fait à la création du bot et peut être modifié dans les paramètres.
- BDJS permet d'utiliser des `if/else`, `for`, `while` JavaScript en plus des fonctions `$`.
- BDScript est recommandé pour les débutants.
