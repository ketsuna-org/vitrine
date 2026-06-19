---
layout: doc
title: $getServerInvite
translation_key: docs
category: "Moderation"
function_name: getServerInvite
syntax: $getServerInvite[(guildID)]
description: Génère ou retourne une invitation permanente pour le serveur. Si aucun ID n'est fourni, crée une invitation pour le serveur courant.
parameters:
  - name: guildID
    description: (Optionnel) L'ID du serveur pour lequel créer l'invitation. Défaut : serveur courant.
returns:
  - type: string
    description: L'URL d'invitation du serveur. Format : https://discord.gg/CODE ou chaîne vide si échec.
related:
  - $getBotInvite
  - $getInviteInfo
  - $serverNames
examples:
  - description: Invitation du serveur courant
    code: $getServerInvite
  - description: Invitation d'un serveur spécifique
    code: $getServerInvite[123456789]
---

# $getServerInvite

La fonction `$getServerInvite[]` permet de **générer ou récupérer une invitation** pour un serveur Discord.

## Syntaxe

```
$getServerInvite[(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `guildID` | Optionnel - ID du serveur. Défaut : serveur où la commande est exécutée. |

## Valeur de retour

- **Type** : String (URL)
- L'URL d'invitation du serveur (format `https://discord.gg/CODE`).
- Chaîne vide si le bot n'a pas la permission `CREATE_INSTANT_INVITE`.

## Comportement

- Le bot doit avoir la permission `CREATE_INSTANT_INVITE` sur le serveur cible.
- L'invitation créée est généralement permanente (sans expiration).
- Si une invitation existe déjà, elle peut être réutilisée.

## Exemples

### Lien d'invitation serveur

```bdfd
$title[🌐 Invitation serveur]
$description[
Voici le lien d'invitation pour **$serverName** :

```
$getServerInvite
```

Partagez-le avec vos amis !
]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendMessage[]
```

### Afficher dans un message de bienvenue

```bdfd
$title[👋 Bienvenue sur $serverName !]
$description[
**Invite tes amis :**
$getServerInvite

Nous sommes maintenant **$membersCount** membres !
]
$color[#57F287]
$sendMessage[]
```

### Information serveur complète

```bdfd
$title[📊 Informations du serveur]
$description[
**Nom :** $serverName
**Membres :** $membersCount
**Boost :** Niveau $boostLevel
**Invitation :** $getServerInvite
]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendMessage[]
```

## Notes

- L'invitation créée utilise le canal où la commande est exécutée (ou le canal système).
- Pour inviter le bot lui-même, utilisez `$getBotInvite[]`.
- Pour obtenir des informations sur une invitation, utilisez `$getInviteInfo[]`.
