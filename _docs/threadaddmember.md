---
layout: doc
title: $threadAddMember
translation_key: docs
category: "Moderation"
function_name: threadAddMember
syntax: $threadAddMember[threadID;userID]
description: Ajoute un membre à un fil de discussion (thread). Utile pour les threads privés où les membres doivent être ajoutés manuellement.
---

# $threadAddMember

La fonction `$threadAddMember[]` permet d'**ajouter un utilisateur à un thread**. Particulièrement utile pour les threads privés.

## Syntaxe

```
$threadAddMember[threadID;userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `threadID` | L'ID du thread cible. |
| `userID` | L'ID de l'utilisateur à ajouter. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Pour les threads publics, les utilisateurs peuvent rejoindre librement ; cette fonction est rarement nécessaire.
- Pour les threads privés, seuls les membres ajoutés peuvent voir et participer au thread.
- Le bot doit avoir la permission `MANAGE_THREADS` ou être le créateur du thread privé.

## Exemples

### Ajouter le créateur

```bdfd
$let[thread;$startThread[Support - $username;1440]]
$threadAddMember[$thread;$authorID]
$channelSendMessage[$thread;Votre thread de support est prêt, $username !]
```

### Ajouter des modérateurs

```bdfd
$threadAddMember[$threadID;$mentioned[1]]
$sendMessage[<$mentioned[1]> a été ajouté au thread.]
```

### Ajout automatique d'équipe

```bdfd
$let[thread;$startThread[Ticket #$random[1000;9999];1440]]
$threadAddMember[$thread;$authorID]
$threadAddMember[$thread;MODERATOR_ROLE_ID_1]
$threadAddMember[$thread;MODERATOR_ROLE_ID_2]
$channelSendMessage[$thread;Bienvenue ! Un membre de l'équipe vous assistera.]
```

## Notes

- Dans les threads publics, les membres peuvent rejoindre sans invitation.
- `$threadAddMember[]` n'envoie pas de notification à l'utilisateur ajouté.
- Pour retirer un membre, utilisez `$threadRemoveMember[]`.
