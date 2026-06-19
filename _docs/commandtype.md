---
layout: doc
title: $commandType
translation_key: docs
category: "Entity Info"
function_name: commandType
syntax: $commandType
description: Retourne le type de la commande en cours (prefix ou slash).
---

# $commandType

La fonction `$commandType` **retourne le type de la commande en cours** : `prefix` pour les commandes textuelles classiques, `slash` pour les commandes slash Discord.

## Syntaxe

```
$commandType
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- `prefix` : commande déclenchée par un préfixe texte (`!`, `?`, etc.).
- `slash` : commande déclenchée via l'interface slash Discord (`/`).

## Comportement

- Permet d'adapter le comportement selon le type d'invocation.
- Équivalent fonctionnel à `$if[$isSlash==true]slash$elseprefix$endif`.

## Exemples

### Réponse adaptative

```bdfd
$if[$commandType==slash]
  $sendEphemeral[✅ Opération réussie !]
$else
  $sendMessage[✅ Opération réussie !]
$endif
```

### Log différencié

```bdfd
$if[$commandType==slash]
  $log[🔹 SLASH /$commandName par $userName]
$else
  $log[🔸 PREFIX $commandTrigger par $userName]
$endif
```

### Aide contextuelle

```bdfd
$title[⚙️ Détails de la commande]
$addField[Nom;$commandName;yes]
$addField[Trigger;$commandTrigger;yes]
$addField[Type;$if[$commandType==slash]🔹 Slash$else🔸 Prefix$endif;yes]
$addField[Dossier;$commandFolder;yes]
$footer[Langage : $scriptLanguage]
$sendMessage[]
```

### Commande hybride avec arguments

```bdfd
;; Récupération des arguments selon le type
$if[$commandType==slash]
  $var[arg1;$slashOption[cible]]
  $var[arg2;$slashOption[raison]]
$else
  $var[arg1;$message[1]]
  $var[arg2;$message[2]]
$endif

$sendMessage[🎯 Cible : $var[arg1] | Raison : $var[arg2]]
```

## Notes

- Valeurs possibles : `prefix` ou `slash`.
- Pour un test booléen simple, utilisez `$isSlash`.
- Les réponses éphémères (`$sendEphemeral[]`) ne fonctionnent qu'en type `slash`.
- Le type est défini dans la console BDFD lors de la création de la commande.
