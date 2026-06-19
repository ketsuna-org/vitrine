---
layout: doc
title: $onlyNSFW
translation_key: docs
category: "Moderation"
function_name: onlyNSFW
syntax: $onlyNSFW
description: Fonction guard qui arrête l'exécution si le channel courant n'est pas marqué comme NSFW.
---

# $onlyNSFW

La fonction guard `$onlyNSFW` vérifie que le channel où la commande est exécutée est marqué comme **NSFW** (Not Safe For Work) sur Discord. Si le channel n'est pas NSFW, la commande est silencieusement interrompue.

## Syntaxe

```
$onlyNSFW
```

## Paramètres

Aucun paramètre. `$onlyNSFW` s'utilise seul, sans argument.

## Comportement

- Si le channel est NSFW, la commande continue normalement.
- Si le channel n'est **pas** NSFW, la commande est interrompue (`$stop` implicite), sans message d'erreur par défaut.
- Équivalent à `$onlyIf[$channelNSFW==true]` mais plus concis.

## Exemples

### Commande réservée au NSFW

```bdfd
$onlyNSFW
$sendMessage[Ce contenu est visible uniquement dans les salons NSFW.]
```

### Avec message d'erreur personnalisé

```bdfd
$if[$channelNSFW==false]
  $sendMessage[❌ Passez en salon NSFW pour utiliser cette commande.]
  $stop
$endif
$sendMessage[Contenu NSFW.]
```

### Filtrage de contenu

```bdfd
$if[$channelNSFW==true]
  $sendMessage[🔞 Résultat de la recherche...]
$else
  $sendMessage[Recherche filtrée (mode SFW)...]
$endif
```

## Notes

- `$onlyNSFW` est silencieux : aucun message d'erreur n'est envoyé par défaut. Pour informer l'utilisateur, utilisez la condition manuelle avec `$channelNSFW`.
- Le marquage NSFW se configure dans les paramètres du salon Discord (Paramètres du salon → Aperçu → Salon NSFW).
- Utilisez `$channelNSFW` pour une vérification inline sans interrompre la commande.
- Compatible avec les salons textuels uniquement. Les fils (threads) héritent du statut NSFW de leur salon parent.
