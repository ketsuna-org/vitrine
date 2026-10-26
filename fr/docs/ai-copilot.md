---
layout: doc
title: Copilote IA
category: "Général"
category_key: "Meta"
description: "Ce que le copilote IA de Bot Creator peut lire et modifier sur votre bot, ce qu'il peut faire sur votre serveur Discord, comment l'utiliser depuis votre propre IA, comment vous gardez la main sur chaque action et comment les crédits IA sont comptés."
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
- **Gérer votre serveur Discord.** Organiser les salons, publier règles et annonces, gérer rôles et réglages, et modérer des membres (voir [Gérer votre serveur Discord](#discord-server)).
- **Travailler depuis votre propre IA.** Connecter Claude, ChatGPT ou Cursor à vos bots (voir [L'utiliser depuis votre propre IA](#user-mcp)).

Avant d'écrire quoi que ce soit, le copilote planifie la commande, n'utilise que des fonctions qui existent et valide le script. Si la validation échoue, il corrige les erreurs et réessaie.

## Gérer votre serveur Discord {#discord-server}

Au-delà des commandes, le copilote peut vous aider à gérer le serveur Discord lui-même. Ces outils de gestion de serveur sont en cours de déploiement et peuvent ne pas être disponibles dans toutes les versions de l'application. Ils fonctionnent sur les serveurs où votre bot est présent, et uniquement pour les personnes autorisées à gérer le serveur (propriétaire, Administrateur ou Gérer le serveur). Le bot doit aussi avoir les permissions correspondantes dans Discord.

| Quoi | Ce que fait le copilote |
|------|-------------------------|
| Salons et catégories | Les créer, les renommer, les déplacer et les organiser. Il peut proposer une structure complète de serveur, vous montre un aperçu et ne l'applique qu'après votre confirmation. À cette étape, il crée et ne supprime jamais. |
| Annuler une structure | Une structure qu'il a appliquée peut être annulée pendant 14 jours : les salons et catégories qu'il a créés sont supprimés et les sujets, la restriction d'âge et le mode lent qu'il a changés sont remis. Vous tapez le nom exact du serveur pour confirmer. Les messages des salons supprimés sont perdus. |
| Règles, bienvenue, FAQ, annonces | Rédiger le message ou l'embed et le publier avec le bot, le modifier ou le supprimer. Vous voyez le message avant son envoi. Les mentions sont désactivées sauf si vous nommez les rôles, et mentionner tout le monde demande que vous le tapiez. |
| Bannières et visuels | Dessiner une bannière ou une icône de serveur. Elle est rendue sur votre appareil et c'est vous qui décidez de la publier. |
| Réglages du serveur | Nom, icône, salons système, règlement et mises à jour, salon AFK, niveau de vérification, notifications par défaut, filtre de contenu et langue. |
| Rôles | Créer, modifier et supprimer des rôles et leurs permissions. Administrateur n'est jamais accordé, et les permissions puissantes demandent que vous tapiez le nom exact du rôle. |
| Modération | Expulser, bannir, débannir, exclure temporairement ou lever une exclusion pour un membre dont vous donnez l'identifiant Discord. Un motif est toujours exigé et il est inscrit dans le journal d'audit du serveur. |
| Vrai test d'une commande texte | Votre bot envoie la commande dans un salon de test que vous avez choisi, vérifie la réponse, supprime ses propres messages et donne le résultat. |

Règles de sécurité de ces outils :

- Vous voyez un aperçu et vous confirmez avant tout changement.
- Les actions destructrices demandent de taper le nom exact : supprimer un salon ou un rôle, expulser ou bannir un membre (son identifiant), ou annuler une structure (le nom du serveur). Les salons de règles, de mises à jour et système ne peuvent pas être supprimés.
- Le copilote ne lit jamais les messages de vos membres et ne peut ni lister ni rechercher les membres. Il ne peut lire que les messages écrits par le bot lui-même.
- La modération est limitée en fréquence, et chaque action porte un motif.

## L'utiliser depuis votre propre IA (MCP utilisateur) {#user-mcp}

Vous pouvez aussi piloter vos bots depuis l'assistant IA que vous utilisez déjà, comme Claude, ChatGPT ou Cursor, grâce à une connexion MCP. Elle expose les mêmes outils que le copilote : lire un bot, planifier et valider une commande, enregistrer des commandes et des workflows, changer les réglages et les variables, démarrer et arrêter un bot, et les outils de serveur Discord ci-dessus.

L'adresse à donner à votre assistant est :

```
https://api.bot-creator.fr/mcp/user
```

- **Claude et ChatGPT :** ajoutez-la comme connecteur personnalisé (dans Claude : Paramètres, Connecteurs, Ajouter un connecteur personnalisé), puis connectez-vous avec Discord quand on vous le demande.
- **Cursor :** ajoutez-la dans `~/.cursor/mcp.json` :

```json
{
  "mcpServers": {
    "bot-creator": { "url": "https://api.bot-creator.fr/mcp/user" }
  }
}
```

- **Connexion par Discord uniquement.** Aucun mot de passe ne transite par la page de connexion.
- **Vous choisissez ce qui est autorisé.** Sur l'écran de consentement, vous choisissez les permissions et les bots que l'assistant peut toucher. Les permissions sont : voir vos bots, écrire des commandes, écrire des workflows, modifier les réglages et les variables, démarrer et arrêter le bot, et côté Discord : voir, publier des messages, gérer le serveur, modérer et tester des commandes texte.
- **Vous pouvez reprendre la main.** La liste des connexions de votre compte permet d'en retirer une ou de changer les bots qu'elle couvre.
- **Mêmes règles de sécurité.** Chaque appel est contrôlé selon la permission, le bot autorisé et vos droits réels sur ce bot. Les écritures sont limitées à 60 par minute et les lectures à 600 par minute pour chaque connexion, et chaque écriture est journalisée.
- **L'accès expire.** Un accès dure une heure et se renouvelle avec un identifiant de rafraîchissement valable 30 jours ; réutiliser un ancien identifiant annule toute la connexion.

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

Vos messages et le contexte nécessaire pour répondre (configuration du bot, commandes, résultats d'outils) sont envoyés au fournisseur d'IA utilisé par Bot Creator. Les identifiants comme les jetons Discord, les clés d'API et les URL de webhook, ainsi que les adresses e-mail, sont masqués avant l'envoi, mais les autres données personnelles ne sont pas reconnues automatiquement : ne collez pas de jetons ni de données personnelles de tiers dans une discussion. Quand vous modérez un membre, son identifiant Discord et le motif que vous donnez sont aussi envoyés au fournisseur. Le copilote demande votre consentement avant sa première utilisation. Le détail complet est dans la [politique de confidentialité]({{ '/privacy-policy/' | relative_url }}).

## À savoir

- Le copilote peut se tromper. Relisez ce qu'il propose, surtout avant d'approuver un changement sur un bot qui tourne pour une communauté.
- Il suit les mêmes règles que le reste de l'application : il ne peut pas atteindre les bots hors de votre compte ni hors du bot de la discussion.
- Pour comprendre les briques qu'il utilise, voyez [Premiers pas]({{ '/fr/docs/getting-started/' | relative_url }}) et la [référence des fonctions BDFD]({{ '/fr/docs/' | relative_url }}).
