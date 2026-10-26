---
layout: doc
title: Copilote IA
category: "Général"
category_key: "Meta"
description: "Ce que le copilote IA de Bot Creator peut lire et modifier sur votre bot, comment vous gardez la main sur chaque action et comment les crédits IA sont comptés."
locale: fr
lang: fr
content_language: fr
translation_key: doc-ai-copilot
permalink: /fr/docs/ai-copilot/
sidebar_context: docs_fr
---

Le copilote IA est un assistant intégré à l'application Bot Creator. Vous décrivez ce que vous voulez avec vos mots, et il examine votre bot, écrit ou corrige des commandes et des workflows, puis prépare les changements. Il ne modifie jamais rien sans votre accord.

## Où le trouver

Ouvrez-le depuis l'accueil, depuis une carte de bot, depuis la fiche du bot ou depuis la navigation de l'éditeur. Une discussion peut être globale ou liée à un seul bot. Dans une discussion de bot, le copilote ne peut agir que sur ce bot.

Les discussions appartiennent à votre compte. Elles sont enregistrées sur le Manager, synchronisées entre vos appareils et conservées jusqu'à ce que vous les supprimiez. Les collaborateurs et les administrateurs ne peuvent pas lire vos discussions personnelles. Vous pouvez les chercher par titre, les renommer, les archiver, les exporter en Markdown et les supprimer.

Le copilote n'est pas disponible dans la version Steam de l'application.

## Ce qu'il sait faire

- **Vérifier un bot.** Lire ses réglages, ses commandes, ses workflows, ses variables et ses erreurs récentes, puis expliquer ce qui ne va pas.
- **Créer et modifier des commandes.** Écrire une commande en script BDFD (ou en JavaScript sur un bot JavaScript), la valider, puis l'enregistrer. Il peut aussi corriger une commande existante au lieu de la réécrire.
- **Créer des workflows.** Construire des workflows d'événements et des workflows planifiés, avec un intervalle ou, sur les bots JavaScript, un planning cron.
- **Changer les réglages du bot.** Statut, pseudo, avatar et préfixe des commandes texte.
- **Démarrer et arrêter un bot**, et restaurer une version précédente d'une commande ou d'un workflow.
- **Expliquer une fonction.** Il consulte la documentation officielle et la référence des fonctions avant de répondre, donc ses exemples utilisent de vraies fonctions.

Avant d'écrire quoi que ce soit, le copilote planifie la commande, n'utilise que des fonctions qui existent et valide le script. Si la validation échoue, il corrige les erreurs et réessaie.

## Vous gardez la main

Chaque appel d'outil apparaît sous forme de carte dans la discussion : lecture, attente de validation, exécution, terminé, refusé ou non confirmé. Tout ce qui modifie votre bot (enregistrer, supprimer, démarrer, arrêter) demande votre accord pour cette action précise. Si vous refusez, rien n'est modifié.

- Une action approuvée n'est jamais exécutée deux fois. Rouvrir une discussion ne rejoue rien.
- Si l'application ou le serveur s'arrête pendant une action, le résultat peut rester « non confirmé ». Vérifiez le bot, puis clôturez l'étape vous-même.
- Si le copilote répète trois fois de suite les mêmes appels avec les mêmes résultats, la boucle est arrêtée.
- Les très longues discussions proposent un résumé que vous confirmez. Votre historique visible reste inchangé.

## Crédits IA

Le copilote utilise des crédits IA. **1 crédit équivaut à 1 000 tokens.** Les tokens d'entrée non servis par le cache et les tokens de sortie sont comptés ; les tokens servis par le cache sont gratuits. Le coût dépend de ce que vous demandez, il n'y a donc pas de prix fixe par commande.

Avant chaque requête, le serveur réserve un budget prudent, puis libère la part inutilisée une fois l'usage réel connu. Si votre solde est insuffisant, la requête est refusée. Votre solde actuel est affiché dans l'application.

## Confidentialité

Vos messages et le contexte nécessaire pour répondre (configuration du bot, commandes, résultats d'outils) sont envoyés au fournisseur d'IA utilisé par Bot Creator. Les identifiants comme les jetons Discord, les clés d'API et les URL de webhook, ainsi que les adresses e-mail, sont masqués avant l'envoi, mais les autres données personnelles ne sont pas reconnues automatiquement : ne collez pas de jetons ni de données personnelles de tiers dans une discussion. Le copilote demande votre consentement avant sa première utilisation. Le détail complet est dans la [politique de confidentialité]({{ '/privacy-policy/' | relative_url }}).

## À savoir

- Le copilote peut se tromper. Relisez ce qu'il propose, surtout avant d'approuver un changement sur un bot qui tourne pour une communauté.
- Il suit les mêmes règles que le reste de l'application : il ne peut pas atteindre les bots hors de votre compte ni hors du bot de la discussion.
- Pour comprendre les briques qu'il utilise, voyez [Premiers pas]({{ '/fr/docs/getting-started/' | relative_url }}) et la [référence des fonctions BDFD]({{ '/fr/docs/' | relative_url }}).
