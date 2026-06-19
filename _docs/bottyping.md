---
layout: doc
title: $botTyping
translation_key: docs
category: "Moderation"
function_name: botTyping
syntax: $botTyping
description: Déclenche l'indicateur de saisie (typing indicator) dans le canal courant. Montre aux utilisateurs que le bot est en train d'écrire.
---

# $botTyping

La fonction `$botTyping[]` permet de **déclencher l'indicateur de saisie** ("Bot is typing...") dans le canal où la commande est exécutée.

## Syntaxe

```
$botTyping
```

## Paramètres

Cette fonction ne prend aucun paramètre.

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- L'indicateur de saisie dure environ 10 secondes ou jusqu'à l'envoi d'un message.
- Utile pour simuler un délai de traitement ou donner un feedback visuel.
- L'indicateur s'arrête automatiquement si un message est envoyé.

## Exemples

### Traitement avec feedback

```bdfd
$botTyping
$wait[3]
$sendMessage[Traitement terminé ! Voici les résultats...]
```

### Simulation de recherche

```bdfd
$botTyping
$wait[2]
$sendMessage[🔍 Recherche dans la base de données...]
$botTyping
$wait[2]
$sendMessage[✅ Résultats trouvés !]
```

### Enchaînement avec action longue

```bdfd
$botTyping
$let[result;$httpGet[https://api.example.com/data]]
$if[$result!=]
  $sendMessage[Données récupérées avec succès.]
$else
  $sendMessage[Erreur lors de la récupération.]
$endif
```

## Notes

- L'indicateur est purement cosmétique, aucun effet sur le traitement réel.
- Particulièrement utile pour les commandes avec `$wait[]` ou des appels API.
- Ne fonctionne que dans les canaux texte.
