---
layout: doc
title: $deleteCommand
translation_key: docs
category: "Moderation"
function_name: deleteCommand
syntax: $deleteCommand
description: Supprime le message de commande de l'utilisateur (le message qui a déclenché le trigger). Utile pour garder les canaux propres.
---

# $deleteCommand

La fonction `$deleteCommand[]` permet de **supprimer le message de commande** de l'utilisateur qui a déclenché le trigger.

## Syntaxe

```
$deleteCommand
```

## Paramètres

Cette fonction ne prend aucun paramètre.

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Supprime immédiatement le message de l'utilisateur ayant déclenché la commande.
- Le bot doit avoir la permission `MANAGE_MESSAGES` dans le canal.
- Si le message a déjà été supprimé, rien ne se passe.

## Exemples

### Commande propre

```bdfd
$deleteCommand
$sendMessage[Résultat de votre commande...]
```

### Feedback silencieux

```bdfd
$deleteCommand
$addReactions[✅]
$ephemeral[Commande exécutée avec succès.]
```

### Protection anti-spam

```bdfd
$deleteCommand
$if[$checkContains[$userPerms;Administrator]==false]
  $sendMessage[Cette commande est réservée aux administrateurs.]
  $suppressErrors[]
$else
  $sendMessage[Commande admin exécutée.]
$endif
```

### ModMail / confession

```bdfd
$deleteCommand
$channelSendMessage[$modChannel;Message anonyme :
>>> $noMentionMessage]
$ephemeral[Votre message a été envoyé à l'équipe de modération.]
```

## Notes

- Fonctionne uniquement si le bot a `MANAGE_MESSAGES`.
- Idéal pour les commandes de modération, les systèmes de confession ou les modmails.
- Le message est supprimé avant que le bot n'envoie sa réponse.
- Si combiné avec `$addCmdReactions[]`, placez `$deleteCommand` après ou avant selon le comportement souhaité.
