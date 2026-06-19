---
layout: doc
title: $getInviteInfo
translation_key: docs
category: "Moderation"
function_name: getInviteInfo
syntax: $getInviteInfo[code]
description: Récupère des informations sur une invitation Discord à partir de son code. Retourne des détails comme le nom du serveur, le nombre de membres, etc.
parameters:
  - name: code
    description: Le code d'invitation Discord (la partie après discord.gg/). Exemple : "abc123".
returns:
  - type: string
    description: Informations formatées sur l'invitation (serveur, membres, etc.) ou chaîne vide si l'invitation est invalide.
related:
  - $getServerInvite
  - $getBotInvite
  - $serverNames
examples:
  - description: Infos sur une invitation
    code: $getInviteInfo[abc123]
  - description: Infos sur une URL complète
    code: $getInviteInfo[$message]
---

# $getInviteInfo

La fonction `$getInviteInfo[]` permet de **récupérer des informations** sur une invitation Discord à partir de son code.

## Syntaxe

```
$getInviteInfo[code]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `code` | Le code d'invitation (ex: `abc123` pour `discord.gg/abc123`). |

## Valeur de retour

- **Type** : String
- Informations sur l'invitation : nom du serveur, description, nombre de membres, etc.
- Chaîne vide si l'invitation est invalide ou expirée.

## Comportement

- Fonctionne avec n'importe quel code d'invitation Discord valide.
- Ne nécessite pas que le bot soit sur le serveur cible.
- Retourne des informations publiques uniquement.

## Exemples

### Vérifier une invitation

```bdfd
$let[info;$getInviteInfo[$message[1]]]
$if[$info!=]
  $sendMessage[Informations sur l'invitation :
>>> $info]
$else
  $sendMessage[❌ Invitation invalide ou expirée.]
$endif
```

### Détection de spam d'invitation

```bdfd
$if[$checkContains[$message;discord.gg]==true]
  $deleteCommand
  $let[code;$replaceText[$message;https://discord.gg/;]]
  $let[info;$getInviteInfo[$code]]
  $if[$info!=]
    $sendMessage[⚠️ $username, les invitations externes ne sont pas autorisées. \
(Invitation vers : $info)]
  $else
    $sendMessage[⚠️ $username, les invitations ne sont pas autorisées.]
  $endif
$endif
```

## Notes

- L'invitation doit être valide et non expirée.
- Utile pour la modération anti-spam d'invitations.
- Les informations retournées dépendent de ce que le serveur rend public.
