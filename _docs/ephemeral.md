---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $ephemeral

Rend la réponse éphémère (visible uniquement par l'utilisateur qui a déclenché l'interaction). S'utilise comme flag avant `$sendMessage`.

## Syntaxe

```
$ephemeral
```

## Description

`$ephemeral` est un **flag** (sans arguments) qui, placé avant `$sendMessage`, rend le message visible uniquement par l'utilisateur cible. Le message apparaît avec la mention "Only you can see this" et disparaît après un certain temps ou quand l'utilisateur ferme Discord.

Cette fonction est particulièrement utile pour :
- Les messages de confirmation discrets
- Les erreurs ou avertissements
- Les réponses à des interactions sur boutons/selects
- Les informations sensibles

## Exemples

### Réponse éphémère simple

```
$ephemeral
$sendMessage[Ce message est visible uniquement par vous.]
```

### Avec embeds

```
$ephemeral
$newEmbed[title=Information;description=Données privées;color=#9B59B6]
$sendMessage[]
```

### Dans une interaction

```
$onInteraction
$if[$customID==btn_secret]
  $ephemeral
  $sendMessage[🔒 Action secrète effectuée !]
$endif
```

### Message d'erreur éphémère

```
$if[$argsCount==0]
  $ephemeral
  $sendMessage[❌ Vous devez fournir un argument !]
  $stop
$endif
```

## Notes

- Fonctionne uniquement dans le contexte d'interactions (slash commands, boutons, selects).
- Ne fonctionne PAS pour les commandes à préfixe classiques (message commands).
- Le flag doit être placé avant `$sendMessage`.
- Pratique pour garder les salons propres des messages système.
