---
layout: doc
title: $allowRoleMentions[]
translation_key: docs
category: "Embed & Message"
function_name: allowRoleMentions
syntax: $allowRoleMentions
description: Autorise les mentions de rôles dans le message en cours. Sans cet appel, les mentions de rôles dans le contenu du message ne notifieront pas les membres.
parameters: []
returns:
  type: void
  description: Active l'autorisation de mention de rôles pour le message en cours de construction.
related:
  - allowUserMentions
  - $allowMentions
  - $noMentions
  - $sendMessage
examples:
  - description: Message avec mention de rôle
    code: |
      $allowRoleMentions
      $sendMessage[<@&$roleID[Admin]> Nouvelle mise à jour disponible !]
  - description: Annonce avec ping rôle
    code: |
      $allowRoleMentions
      $title[Annonce Importante]
      $description[<@&$roleID[Members]> Réunion ce soir à 20h]
      $color[#E74C3C]
---

# $allowRoleMentions[] — Autoriser les Mentions de Rôles

`$allowRoleMentions[]` active la notification des membres lorsqu'un rôle est mentionné dans le message. Sans cet appel, les tags de rôles comme `<@&roleId>` sont affichés mais ne déclenchent **pas** de notification.

## Syntaxe

```
$allowRoleMentions
```

## Paramètres

Aucun paramètre.

## Valeur de retour

Active l'autorisation de mention de rôles pour le prochain message envoyé. Les rôles mentionnés dans le contenu notifieront leurs membres.

## Utilisation

### Annonce avec ping

```bdfd
$allowRoleMentions
$sendMessage[<@&$roleID[Modo]> Un rapport a été soumis, merci de vérifier.]
```

### Notification d'événement

```bdfd
$allowRoleMentions
$title[🎉 Événement du serveur]
$description[<@&$roleID[Event_Ping]> Un nouvel événement commence dans 1 heure !]
$addField[Détails;Tournoi hebdomadaire;yes]
$addField[Récompense;5000 pièces d'or;yes]
$color[#F1C40F]
```

### Rappel avec mention

```bdfd
$allowRoleMentions
$sendMessage[⏰ <@&$roleID[Staff]> Réunion staff dans 10 minutes !]
```

### Message conditionnel

```bdfd
$if[$var[important]==yes]
$allowRoleMentions
$sendMessage[<@&$roleID[Everyone_Important]> Alerte critique !]
$else
$noMentions
$sendMessage[Mise à jour mineure disponible]
$endif
```

## Notes

- Sans `$allowRoleMentions[]`, les rôles mentionnés apparaissent comme texte mais sans notification.
- L'effet s'applique uniquement au prochain message envoyé (via `$sendMessage` ou fonctions d'envoi).
- Pour interdire explicitement toute mention, utilisez `$noMentions[]`.
- `$allowRoleMentions[]` n'affecte que les **mentions de rôles**. Pour les utilisateurs, utilisez `$allowUserMentions[]`.
- Pratique pour les annonces importantes tout en évitant les pings abusifs dans les messages ordinaires.
