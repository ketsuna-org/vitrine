---
layout: doc
title: Tâches planifiées
category: "Général"
category_key: "Meta"
description: "Comment fonctionnent les tâches planifiées de Bot Creator. Répéter toutes les N minutes ou avec un cron, choisir une heure de départ, pourquoi tout est en UTC, ce qui se passe au redémarrage du bot et comment lancer une tâche tout de suite."
locale: fr
lang: fr
content_language: fr
translation_key: doc-scheduled-tasks
permalink: /fr/docs/scheduled-tasks/
sidebar_context: docs_fr
---

Une tâche planifiée lance un workflow toute seule, à intervalles réguliers, sans que personne n'envoie de commande. Les tâches planifiées font partie de l'offre Premium.

## Créer une tâche

Ouvrez l'onglet **Planificateur** de votre bot, ajoutez une tâche, choisissez le workflow à lancer et la fréquence. Il existe deux types de planification :

- **Toutes les N minutes.** Disponible sur tous les bots.
- **Cron.** Une expression à 5 champs (minute, heure, jour du mois, mois, jour de la semaine) avec un fuseau horaire. Le cron est réservé aux bots JavaScript. Un bot Dart utilise « toutes les N minutes ».

Si un cron n'a pas de fuseau horaire, il s'exécute en UTC.

## Tout est en UTC

Toutes les horloges de la plateforme sont en UTC. L'éditeur affiche les heures dans votre heure locale mais les enregistre en UTC : une tâche ne bouge donc pas quand vous voyagez ou quand l'heure d'été change. Le prochain tir est affiché sur la carte de la tâche.

## Choisir une heure de départ

Par défaut, une tâche répétée toutes les N minutes tombe sur une grille fixe comptée depuis l'époque Unix en UTC (par exemple toutes les 60 minutes veut dire à l'heure pile). Cette grille ne dépend pas du moment où le bot a démarré.

Le champ **Commencer à** permet de choisir votre propre ancre. Le premier tir a lieu à cette heure (si elle est dans le futur), puis toutes les N minutes à partir de là : avec un départ à 09:30 et une période de 60 minutes, la tâche tourne à 09:30, 10:30, 11:30, etc. Pour un cron, **Commencer à** signifie « pas avant » : la tâche ne tourne jamais plus tôt que cette date. **Pas d'heure de départ** ramène à la grille par défaut.

## Redémarrages et tirs manqués

- **Un redémarrage ne lance pas la tâche.** Redémarrer le bot ou le runner ne lance rien tout seul et ne décale pas le prochain tir, car la planification se calcule d'après l'horloge et pas d'après l'heure de démarrage du bot.
- **Pas de rattrapage.** Si le bot était arrêté quand un tir était dû, ce tir est sauté. Le suivant a lieu à son heure normale.
- **Lancer au démarrage.** Activez **Lancer aussi au démarrage du bot** si vous voulez un tir supplémentaire au premier chargement de la planification. Il s'ajoute aux heures habituelles.
- L'heure du dernier tir est conservée, y compris après un redémarrage du runner.

## Exécuter maintenant

Le bouton **Exécuter maintenant** lance la tâche immédiatement. Il ne déplace pas le minuteur : le prochain tir planifié garde son heure. Le bot doit être démarré et, comme les tâches planifiées, cela demande le Premium.

## Ce qu'affiche la carte

Chaque tâche affiche son prochain tir, son dernier tir et sa dernière erreur. Ces informations viennent du runner quand le bot tourne. Quand le bot est arrêté ou que son runner est injoignable, la carte le dit au lieu d'afficher une heure.

## Bon à savoir

- Les intervalles sont en minutes. Gardez vos workflows courts pour qu'un tir soit fini avant le suivant.
- Les bots JavaScript et Dart suivent les mêmes règles pour la grille, l'heure de départ et les redémarrages. La différence est le cron, que seuls les bots JavaScript gèrent.
