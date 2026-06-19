---
layout: doc
title: $commandTrigger
translation_key: docs
category: "Entity Info"
function_name: commandTrigger
syntax: $commandTrigger
description: Retourne le déclencheur (trigger) de la commande en cours d'exécution.
---

# $commandTrigger

La fonction `$commandTrigger` **retourne le déclencheur complet** de la commande en cours, incluant le préfixe ou le slash. Par exemple, si la commande `help` est déclenchée par `!help`, le trigger retourné est `!help`.

## Syntaxe

```
$commandTrigger
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- Le trigger complet de la commande (préfixe + nom, ou `/nom` pour les slash).

## Comportement

- Pour les commandes prefix : retourne le préfixe + nom (ex: `!help`, `?ban`).
- Pour les commandes slash : retourne `/nom` (ex: `/help`).
- Le préfixe dépend de la configuration du bot.

## Exemples

### Message d'erreur avec usage

```bdfd
$if[$message[1]==]
  $sendMessage[❌ **Usage :** $commandTrigger <utilisateur> <raison>
  Exemple : $commandTrigger @user Spam]
  $stop
$endif
```

### Aide contextuelle

```bdfd
$title[📖 Aide : $commandName]
$description[
**Commande :** $commandTrigger
**Type :** $commandType
**Dossier :** $commandFolder

**Utilisation :**
`$commandTrigger <param1> [param2]`

**Exemple :**
`$commandTrigger valeur1 optionnel`
]
$sendMessage[]
```

### Log détaillé

```bdfd
$log[📌 CMD | User: $userName | Trigger: $commandTrigger | Name: $commandName | Type: $commandType | Server: $serverName]
```

### Information dans l'embed

```bdfd
$title[⚡ Exécution]
$addField[Commande;$commandName;yes]
$addField[Trigger;$commandTrigger;yes]
$addField[Type;$commandType;yes]
$addField[Auteur;$userName;yes]
$addField[Dossier;$commandFolder;yes]
$footer[Exécuté le $formatDate[$dateStamp]]
$sendMessage[]
```

## Notes

- `$commandTrigger` inclut le préfixe (ex: `!help`), contrairement à `$commandName` (qui retourne `help`).
- Pour le nom sans préfixe, utilisez `$commandName`.
- Pour savoir si c'est une commande slash, utilisez `$isSlash` ou `$commandType`.
- Le préfixe peut être extrait avec `$charAt[$commandTrigger;1]`.
