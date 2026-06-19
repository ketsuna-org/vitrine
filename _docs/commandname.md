---
layout: doc
title: $commandName
translation_key: docs
category: "Entity Info"
function_name: commandName
syntax: $commandName
description: Retourne le nom de la commande en cours d'exécution.
parameters: []
returns:
  - type: string
    description: Le nom de la commande actuelle.
related:
  - $commandTrigger
  - $commandType
  - $commandFolder
  - $isSlash
examples:
  - description: Afficher le nom
    code: |
      $sendMessage[Commande en cours : $commandName]
  - description: Log de commande
    code: |
      $log[$userName a exécuté $commandName]
  - description: Aide contextuelle
    code: |
      $sendMessage[Aide pour $commandName : ...]
---

# $commandName

La fonction `$commandName` **retourne le nom de la commande en cours d'exécution**, tel que défini dans l'éditeur BDFD.

## Syntaxe

```
$commandName
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- Le nom de la commande (ex: `help`, `ban`, `ping`).

## Comportement

- Retourne le nom interne de la commande, pas le trigger.
- Le nom est celui défini dans la console BDFD.
- Utile pour les logs, l'aide contextuelle, la détection.

## Exemples

### Log d'exécution

```bdfd
$log[📌 $userName ($authorID) a exécuté /$commandName dans #$channelName sur $serverName]
```

### Aide contextuelle

```bdfd
$title[❓ Aide : $commandName]
$description[
**Commande :** $commandName
**Type :** $commandType
**Dossier :** $commandFolder
**Trigger :** $commandTrigger
]
$footer[Utilisée par $userName]
$sendMessage[]
```

### Gestion d'erreurs personnalisée

```bdfd
$if[$message[1]==]
  $sendMessage[❌ Usage correct : $commandTrigger <paramètre>
  Tapez `!help $commandName` pour plus d'informations.]
  $stop
$endif
```

### Statistique d'usage (via stockage)

```bdfd
$var[count;$getVar[usage_$commandName]]
$var[count;$math[$var[count]+1]]
$setVar[usage_$commandName;$var[count]]
$log[📊 $commandName utilisée $var[count] fois]
```

### Détection pour comportement spécifique

```bdfd
$if[$commandName==help]
  $sendMessage[📚 Voici la liste des commandes...]
$elseif[$commandName==ping]
  $sendMessage[🏓 Pong ! Latence : $ping ms]
$else
  $sendMessage[Commande $commandName exécutée.]
$endif
```

## Notes

- `$commandName` retourne le nom interne, pas le trigger (préfixe).
- En slash, le nom correspond à celui de l'application command.
- Pour le type (prefix/slash), utilisez `$commandType`.
- Pour le dossier, utilisez `$commandFolder`.
