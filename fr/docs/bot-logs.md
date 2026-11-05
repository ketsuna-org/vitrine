---
layout: doc
title: Journal des bots
category: "Meta"
api_type: general
description: Où lire ce que votre bot a fait. La vue en direct, l'historique de 30 jours, les traces sur demande, ce qui est enregistré et ce qui ne l'est jamais, la durée de conservation et qui peut le lire.
permalink: /fr/docs/bot-logs/
locale: fr
translation_key: doc-bot-logs
---

Chaque bot garde un journal de ce qu'il a fait. Vous le lisez dans l'application Bot Creator et dans le Studio, dans l'écran **Logs** d'un bot.

## En direct et historique

- **En direct** affiche les dernières lignes au fur et à mesure, comme avant.
- **Historique (30 jours)** lit le journal conservé d'un bot hébergé sur les serveurs Bot Creator. Les lignes arrivent de la plus récente à la plus ancienne, 100 à la fois : appuyez sur **Charger plus** pour remonter plus loin.

L'historique propose une recherche (texte du message), un filtre sur le nom de la commande et un filtre de niveau (tous, avertissements et erreurs, erreurs seulement).

## Ce que vous voyez par défaut

L'historique montre les lignes qui vous sont destinées : ce que votre bot écrit avec `$log` ou l'action de log, les erreurs de script et les commandes en échec. Le détail de chaque commande, bouton et événement (les **traces**) est masqué par défaut. Activez **Afficher les traces** quand vous voulez suivre une commande pas à pas.

Les mesures de performance ne sont jamais montrées aux utilisateurs.

## Ce qui est enregistré, et ce qui ne l'est jamais

Une ligne porte une heure, un niveau, un message et, selon le cas, le nom de la commande, le serveur, le salon, l'identifiant Discord de l'utilisateur, la durée et un code d'erreur. Les jetons et autres secrets sont masqués avant l'enregistrement. **Le contenu des messages Discord n'est jamais enregistré.**

Un bot peut écrire au plus 20 000 lignes utilisateur et 20 000 autres lignes par jour. Au-delà, les lignes en trop sont ignorées et comptées ; votre bot n'est jamais ralenti ni arrêté par son journal.

## Durée de conservation

| Lignes | Conservées |
|--------|------------|
| Vos lignes, avertissements et erreurs | 30 jours |
| Traces et le reste | 7 jours |

Supprimer un bot supprime son journal. Supprimer votre compte supprime les journaux de vos bots.

## Qui peut le lire

Vous et les membres de l'équipe du bot lisez les lignes utilisateur et, sur demande, les traces. L'équipe Bot Creator peut chercher dans le journal pour vous aider au support. Si une personne demande l'effacement des lignes qui citent son identifiant Discord, écrivez-nous : nous les supprimons par identifiant. Voir la [politique de confidentialité](/privacy-policy.html).

## Ce qui change pour les applications installées

Les anciennes versions de l'application gardent leur vue en direct telle quelle ; l'historique apparaît avec la version qui l'inclut. Rien n'est à migrer.
