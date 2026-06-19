---
layout: doc
title: $debug
translation_key: docs
category: "Flags & Debug"
function_name: debug
syntax: $debug
description: Active le mode debug pour la commande en cours. Affiche des informations de diagnostic dans la console ou les logs BDFD.
parameters: []
returns:
  - type: void
    description: Active le mode debug. Ne retourne rien.
related:
  - $optOff
  - $log
  - $logQuota
examples:
  - description: Activer le debug dans une commande
    code: |
      $debug
      $sendMessage[Debug actif, consultez la console.]
---
# $debug

La fonction `$debug` **active le mode debug** pour l'exécution de la commande en cours.

## Syntaxe

```
$debug
```

## Paramètres

Aucun.

## Valeur de retour

Aucune.

## Comportement

- Une fois activé, BDFD affiche des informations de diagnostic supplémentaires.
- Aide à tracer les erreurs, les valeurs de variables, et le flux d'exécution.
- Le mode debug est désactivé automatiquement à la fin de la commande.

## Exemples

### Debug simple

```bdfd
$debug
$let[result;$calculate[2+2]]
$sendMessage[Résultat : $result]
```

### Debug conditionnel

```bdfd
$if[$message[1]==--debug]
  $debug
$endif
$sendMessage[Debug activé pour cette exécution.]
```

### Debug dans une commande complexe

```bdfd
$debug
$var[userData;$getGlobalUserVar[$authorID;xp]]
$sendMessage[XP : $userData]
```

## Notes

- Le debug consomme des ressources de log ; ne l'activez pas en production.
- Combinez avec `$log[]` pour des logs personnalisés.
- Utile pour résoudre les comportements inattendus.
