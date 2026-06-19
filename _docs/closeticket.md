---
layout: doc
title: $closeTicket
translation_key: docs
category: "Moderation"
function_name: closeTicket
syntax: $closeTicket[(errorMessage)]
description: Ferme et supprime le ticket (canal) courant. Si le canal n'est pas un ticket, un message d'erreur optionnel peut être affiché.
---

# $closeTicket

La fonction `$closeTicket[]` permet de **fermer et supprimer un ticket** (le canal courant). Équivalent à `$deleteChannels[$channelID]` avec vérification.

## Syntaxe

```
$closeTicket[(errorMessage)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `errorMessage` | Optionnel - Message si la commande n'est pas dans un ticket. Défaut : "Ce canal n'est pas un ticket." |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Supprime le canal dans lequel la commande est exécutée.
- Conçu pour être utilisé dans des canaux créés par `$newTicket[]`.
- Si le canal n'est pas un ticket reconnu, affiche le message d'erreur.
- Le bot doit avoir `MANAGE_CHANNELS`.

## Exemples

### Fermeture simple

```bdfd
$closeTicket
```

### Fermeture avec confirmation

```bdfd
$sendMessage[Fermeture du ticket dans 5 secondes...]
$wait[5]
$closeTicket
```

### Fermeture avec log

```bdfd
$let[logChannel;123456789]
$channelSendMessage[$logChannel;Ticket fermé par $username.]
$closeTicket
```

### Fermeture conditionnelle

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $closeTicket
$else
  $closeTicket[Seuls les administrateurs et modérateurs peuvent fermer ce ticket.]
$endif
```

### Fermeture avec sauvegarde

```bdfd
$let[transcript;$getChannelMessages[$channelID;100]]
$setUserVar[lastTicketTranscript;$transcript]
$channelSendMessage[$logChannel;Transcript sauvegardé. Ticket fermé par $username.]
$closeTicket
```

## Notes

- `$closeTicket[]` supprime le canal — action irréversible.
- Sauvegardez les informations importantes avant fermeture (transcript, logs).
- Le message d'erreur personnalisé permet d'éviter les fermetures accidentelles.
- Pour une fermeture sans suppression, archivez plutôt le canal avec `$modifyChannel[]`.
