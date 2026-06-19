---
layout: doc
title: $commandFolder
translation_key: docs
category: "Entity Info"
function_name: commandFolder
syntax: $commandFolder
description: Retourne le nom du dossier contenant la commande en cours d'exécution.
parameters: []
returns:
  - type: string
    description: "Le nom du dossier de la commande (ex: Modération, Fun, Admin)."
related:
  - $commandName
  - $commandTrigger
  - $commandType
examples:
  - description: Afficher le dossier
    code: |
      $sendMessage[Dossier : $commandFolder]
  - description: Catégorie dans l'aide
    code: |
      $sendMessage[Catégorie: "$commandFolder | Commande : $commandName]"
---

# $commandFolder

La fonction `$commandFolder` **retourne le nom du dossier** dans lequel la commande en cours est organisée sur la console BDFD.

## Syntaxe

```
$commandFolder
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- Le nom du dossier (ex: `Modération`, `Fun`, `Admin`, `Utils`).

## Comportement

- Les dossiers sont définis dans l'organisateur de commandes BDFD.
- Utile pour organiser les logs, l'aide, ou les permissions.
- Retourne une chaîne vide si la commande est à la racine.

## Exemples

### Log organisé

```bdfd
$log[📂 [$commandFolder] $userName a exécuté $commandName]
```

### Aide contextuelle

```bdfd
$title[📖 $commandName]
$addField[📂 Catégorie;$commandFolder;yes]
$addField[⚡ Type;$commandType;yes]
$addField[🔤 Trigger;$commandTrigger;yes]
$description[
Aide complète de la commande...
]
$sendMessage[]
```

### Permissions par dossier

```bdfd
$if[$commandFolder==Admin]
  $if[$hasRole[$roleID[Admin]]==false]
    $sendEphemeral[❌ Les commandes du dossier Admin sont réservées.]
    $stop
  $endif
$endif

;; Commande exécutée normalement
$sendMessage[✅ Commande exécutée.]
```

### Page d'accueil par dossier

```bdfd
$if[$commandFolder==Modération]
  $sendMessage[🛡️ **Modération** - Commandes de gestion du serveur.]
$elseif[$commandFolder==Fun]
  $sendMessage[🎮 **Fun** - Commandes de divertissement.]
$elseif[$commandFolder==Utils]
  $sendMessage[🔧 **Utilitaires** - Commandes pratiques.]
$else
  $sendMessage[📂 Dossier : $commandFolder]
$endif
```

## Notes

- Le nom du dossier est celui défini dans la console BDFD.
- Utile pour la structuration des commandes et les permissions.
- Chaîne vide si la commande n'est pas dans un dossier.
