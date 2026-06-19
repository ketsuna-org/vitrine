---
layout: doc
title: $allowUserMentions[]
translation_key: docs
category: "Embed & Message"
function_name: allowUserMentions
syntax: $allowUserMentions
description: Autorise les mentions d'utilisateurs dans le message en cours. Sans cet appel, les mentions d'utilisateurs dans le contenu du message ne notifieront pas les personnes concernées.
---

# $allowUserMentions[] — Autoriser les Mentions d'Utilisateurs

`$allowUserMentions[]` active la notification des utilisateurs lorsqu'ils sont mentionnés dans le message. Sans cet appel, les tags comme `<@userId>` apparaissent visuellement mais ne déclenchent **pas** de notification.

## Syntaxe

```
$allowUserMentions
```

## Paramètres

Aucun paramètre.

## Valeur de retour

Active l'autorisation de mention d'utilisateurs pour le prochain message. Les utilisateurs mentionnés recevront une notification.

## Utilisation

### Notification personnelle

```bdfd
$allowUserMentions
$sendMessage[<@$authorID> Votre profil a été mis à jour avec succès !]
```

### Réponse à une commande

```bdfd
$allowUserMentions
$title[Confirmation]
$description[<@$authorID>, votre commande #$var[orderId] a été confirmée.]
$addField[Statut;En préparation;yes]
$color[#2ECC71]
```

### Mention multiple

```bdfd
$allowUserMentions
$sendMessage[<@$var[winner1]> et <@$var[winner2]> ont gagné le giveaway ! 🎉]
```

### Combinaison avec RoleMentions

```bdfd
$allowUserMentions
$allowRoleMentions
$sendMessage[<@$authorID> a suggéré une idée. <@&$roleID[Admin]> merci de vérifier.]
```

### Conditionnel

```bdfd
$if[$var[notify]==yes]
$allowUserMentions
$sendMessage[<@$var[targetId]> Vous avez un nouveau message !]
$else
$noMentions
$sendMessage[Vous avez un nouveau message (notification silencieuse)]
$endif
```

## Contrôle des mentions

| Fonction | Effet |
|----------|-------|
| `$allowRoleMentions` | Active les notifications pour les mentions de rôles |
| `$allowUserMentions` | Active les notifications pour les mentions d'utilisateurs |
| `$allowMentions` | Active toutes les mentions (rôles + utilisateurs) |
| `$noMentions` | Désactive toutes les notifications de mentions |

## Notes

- Sans cette fonction, `<@userId>` s'affiche comme mention visuelle mais sans ping sonore/notification.
- L'effet est **ponctuel** : il ne s'applique qu'au prochain message envoyé.
- Pour les annonces importantes, combinez avec `$allowRoleMentions[]`.
- Pour envoyer un message totalement silencieux (même pour les utilisateurs mentionnés), utilisez `$noMentions[]`.
- Respectez les règles de votre serveur concernant les pings abusifs.
