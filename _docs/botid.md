---
layout: doc
title: $botID
translation_key: docs
category: "Entity Info"
function_name: botID
syntax: $botID
description: Retourne l'ID utilisateur du bot.
parameters: []
returns:
  - type: string
    description: L'ID Discord du bot (snowflake).
related:
  - $botName
  - $botOwnerID
  - $botAvatar
examples:
  - description: Afficher l'ID du bot
    code: |
      $sendMessage[Mon ID est $botID.]
  - description: Lien d'invitation dynamique
    code: |
      $sendMessage[https://discord.com/oauth2/authorize?client_id=$botID&permissions=8&scope=bot]
---

# $botID

La fonction `$botID` **retourne l'ID Discord (snowflake) du bot**. Cet identifiant est unique et permanent.

## Syntaxe

```
$botID
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- L'ID Discord du bot (17-20 chiffres). Ex: `1234567890123456789`.

## Comportement

- L'ID est attribué par Discord à la création de l'application.
- Il ne change jamais, même si le bot est renommé.
- Utilisable pour les mentions (`<@ID>`), les invitations, les API.

## Exemples

### Debug / Information

```bdfd
$title[🔍 Informations techniques]
$description[
**Nom :** $botName
**ID :** $botID
**Owner :** $botOwnerID
**Node :** $botNode
]
$footer[Bot ID: $botID]
$sendMessage[]
```

### Lien d'invitation personnalisé

```bdfd
$sendMessage[🔗 **Invitez-moi :**
https://discord.com/oauth2/authorize?client_id=$botID&permissions=8&scope=bot%20applications.commands]
```

### Vérification d'identité

```bdfd
$if[$authorID==$botID]
  $sendMessage[Je ne réponds pas à mes propres messages !]
  $stop
$endif

$sendMessage[Message reçu, $userName !]
```

### Emoji personnalisé avec ID

```bdfd
$sendMessage[🤖 <@$botID> est en ligne !]
```

## Notes

- `$botID` est constant et ne change jamais.
- Pour obtenir l'ID du propriétaire, utilisez `$botOwnerID`.
- Pour le nom, utilisez `$botName`.
- Mention du bot : `<@$botID>`.
