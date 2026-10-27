---
layout: doc
title: Statut du bot et statut personnalisé
category: "Général"
category_key: "Meta"
description: "Comment définir le statut de votre bot Discord (Joue à, Streame, Écoute, Regarde, Participe ou statut personnalisé), faire tourner plusieurs statuts, et ce qui change pour le statut personnalisé, disponible pour tous les bots, Premium ou non."
locale: fr
lang: fr
content_language: fr
translation_key: doc-bot-status
permalink: /fr/docs/bot-status/
sidebar_context: docs_fr
---

Chaque bot a une présence : un état (en ligne, absent, ne pas déranger, invisible) et une ou plusieurs activités affichées sous son nom. Vous les réglez dans les paramètres du bot de l'app ou du Studio, avec le copilote IA, ou dans la section `presence` d'un bot JavaScript.

## Types d'activité

| Type | Ce que voient les membres |
|---|---|
| `playing` | Joue à *texte* |
| `streaming` | Streame *texte* (demande une URL `http` ou `https` valide, sinon retombe sur « Joue à ») |
| `listening` | Écoute *texte* |
| `watching` | Regarde *texte* |
| `competing` | Participe à *texte* |
| `custom` | Le texte seul, sans verbe, comme le statut personnalisé d'un utilisateur |

## Statut personnalisé

Le statut personnalisé est l'activité Discord de type 4. Il n'affiche que votre texte, sans « Joue à » ni « Regarde » devant, par exemple `Prêt à aider, tapez /help`.

- Il est disponible pour **tous les bots**, Premium ou non, Dart ou JavaScript.
- Le texte est le nom d'activité saisi dans l'éditeur (128 caractères au maximum). Bot Creator l'envoie à Discord dans le champ `state` et met le nom requis à `Custom Status`, que Discord n'affiche pas.
- Le champ URL est ignoré pour ce type.
- Discord n'affiche qu'un seul statut personnalisé par bot. Vous pouvez le mélanger à d'autres activités dans la même rotation : chaque étape remplace la précédente.

## Plusieurs statuts et rotation

Ajoutez plusieurs activités pour alterner entre elles. Chacune a un intervalle minimum et maximum en secondes; le changement suivant a lieu après un délai aléatoire dans cette plage. Discord limite la fréquence des changements de présence, donc le runner ne change jamais plus vite que toutes les 15 secondes.

Le texte peut contenir des variables d'exécution comme `((bot.uptime))` ou `((bot.guildCount))` sur les bots Dart.

## Dans l'app et le Studio

Ouvrez le bot, puis **Paramètres**, puis la section du statut. Choisissez le type **Statut personnalisé** dans la liste, saisissez votre texte et enregistrez. Le changement est appliqué au bot en cours d'exécution.

## Avec un bot JavaScript

```json
{
  "presence": {
    "status": "online",
    "activities": [
      { "type": "custom", "name": "Prêt à aider, tapez /help" }
    ]
  }
}
```

## Avec le copilote IA

Demandez-le simplement, par exemple « mets le statut de mon bot sur le statut personnalisé *Je reviens dans 5 minutes* ». Le copilote et un assistant IA connecté utilisent le même type `custom`.
