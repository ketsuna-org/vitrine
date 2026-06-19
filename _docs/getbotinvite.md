---
layout: doc
title: $getBotInvite
translation_key: docs
category: "Moderation"
function_name: getBotInvite
syntax: $getBotInvite[(guildID)]
description: Génère et retourne le lien d'invitation du bot avec les permissions nécessaires. Si un guildID est fourni, le lien est pré-rempli pour ce serveur.
parameters:
  - name: guildID
    description: (Optionnel) L'ID du serveur pour lequel générer l'invite. Si omis, lien générique.
returns:
  - type: string
    description: L'URL d'invitation du bot avec les permissions configurées.
related:
  - $getServerInvite
  - $getInviteInfo
  - $botLeave
examples:
  - description: Lien d'invitation générique
    code: $getBotInvite
  - description: Lien pour un serveur spécifique
    code: $getBotInvite[$guildID]
---

# $getBotInvite

La fonction `$getBotInvite[]` permet de **générer le lien d'invitation du bot** avec les permissions nécessaires à son fonctionnement.

## Syntaxe

```
$getBotInvite[(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `guildID` | Optionnel - ID du serveur pour pré-sélectionner le serveur dans l'interface d'invitation. |

## Valeur de retour

- **Type** : String (URL)
- L'URL d'invitation complète du bot.
- Format : `https://discord.com/oauth2/authorize?client_id=ID&permissions=...&scope=bot`

## Comportement

- Les permissions incluses dans le lien correspondent à celles configurées pour le bot.
- Si un guildID est fourni, le sélecteur de serveur est pré-rempli.
- Le lien inclut le scope `bot` et `applications.commands` automatiquement.

## Exemples

### Commande d'invitation

```bdfd
$title[📨 Inviter le bot]
$description[
Cliquez sur le lien ci-dessous pour inviter le bot sur votre serveur :

[$getBotInvite]

**Permissions requises :**
- Gérer les messages
- Envoyer des messages
- Intégrer des liens
- Lire l'historique
]
$color[#5865F2]
$sendMessage[]
```

### Lien pour ce serveur

```bdfd
$title[🔗 Lien d'invitation]
$description[
Partagez ce lien pour inviter le bot sur **$serverName** :

```
$getBotInvite[$guildID]
```
]
$sendMessage[]
```

### Commande info + invite

```bdfd
$title[🤖 Informations du bot]
$description[
**Nom :** $botName
**Serveurs :** $guildCount
**Utilisateurs :** $membersCount

[🔗 Inviter le bot]($getBotInvite)
]
$thumbnail[$botAvatar]
$color[#57F287]
$sendMessage[]
```

## Notes

- Les permissions dans le lien sont définies dans la configuration de l'application Discord.
- Le lien ne fonctionne que si le bot est public ou si l'utilisateur a accès au serveur.
- Pour une invitation de serveur (pas du bot), utilisez `$getServerInvite[]`.
