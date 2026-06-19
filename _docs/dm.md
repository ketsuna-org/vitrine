---
layout: doc
title: $dm
translation_key: docs
category: "Messages & DM"
function_name: dm
syntax: $dm[userID;content]
description: Envoie un message privé (DM) à un utilisateur. Le bot doit pouvoir DM l'utilisateur cible.
---
# $dm

La fonction `$dm[]` permet d'**envoyer un message privé** à un utilisateur Discord.

## Syntaxe

```
$dm[userID;content]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur destinataire. |
| `content` | Le contenu du message (markdown, mentions supportés). |

## Valeur de retour

- **Type** : Snowflake (chaîne)
- L'ID du message envoyé.
- Chaîne vide si le DM est impossible (utilisateur bloqué, DMs fermés).

## Comportement

- Le bot doit pouvoir envoyer des DMs à l'utilisateur (pas bloqué, DMs ouverts).
- Les embeds définis avant `$dm[]` sont inclus.
- Si l'utilisateur a fermé ses DMs, la fonction échoue silencieusement.

## Exemples

### DM simple à l'auteur

```bdfd
$dm[$authorID;Merci d'avoir utilisé la commande !]
```

### DM avec embed

```bdfd
$title[📬 Notification]
$description[Votre demande a bien été prise en compte.\n\nUn modérateur vous répondra sous peu.]
$color[#5865F2]
$footer[Équipe $serverName]
$dm[$authorID;]
```

### DM à un utilisateur mentionné

```bdfd
$if[$mentioned[1]!=]
  $dm[$mentioned[1];$username vous a envoyé ce message : $noMentionMessage]
  $sendMessage[DM envoyé avec succès !]
$else
  $sendMessage[Mentionnez un utilisateur.]
$endif
```

## Notes

- Contrairement à `$sendMessage`, le DM n'apparaît pas dans le canal courant.
- Limite de 2000 caractères par message.
- Pour les DM de bienvenue, vérifiez que l'utilisateur accepte les DMs.
