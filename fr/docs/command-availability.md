---
layout: doc
title: Où une commande est disponible
category: "Général"
category_key: "Meta"
description: "Choisir où une commande Bot Creator peut être utilisée sur Discord. Serveurs, messages privés avec le bot, groupes, installation par l'utilisateur. Ce que demande l'option canal privé et que faire quand Discord refuse une commande."
locale: fr
lang: fr
content_language: fr
translation_key: doc-command-availability
permalink: /fr/docs/command-availability/
sidebar_context: docs_fr
---

Chaque commande slash a un réglage de disponibilité qui dit à Discord où elle peut être utilisée. Vous le trouvez dans l'éditeur de commande, sous **Où cette commande peut être utilisée**.

## Type d'installation

- **Installation serveur.** Le bot est ajouté à un serveur et la commande fonctionne dans ce serveur.
- **Installation utilisateur.** Une personne installe le bot sur son propre compte et peut utiliser la commande partout, y compris dans des serveurs où le bot n'a jamais été ajouté.

## Contextes

- **Serveur.** Les salons d'un serveur.
- **MP du bot.** La conversation privée entre une personne et le bot.
- **Groupe / autre.** Les conversations de groupe et les messages privés entre personnes. Cela demande l'installation utilisateur, car le bot n'est pas membre de ces conversations.

Une commande sans réglage garde le comportement habituel : elle fonctionne uniquement dans les serveurs.

## Canal privé demande l'installation utilisateur

L'option **canal privé** rend une commande utilisable dans les messages privés entre utilisateurs. Elle ne fonctionne que si **l'installation utilisateur** est activée. Si vous enregistrez une commande avec le canal privé mais sans installation utilisateur, Bot Creator enregistre la commande, retire l'option canal privé et vous le dit, pour que vous puissiez activer l'installation utilisateur.

## Quand Discord refuse une commande

Enregistrer une commande dans l'app ou dans le Studio la publie aussi sur Discord. Si Discord la refuse (nom interdit, description trop longue, limite atteinte), l'éditeur dit désormais que la commande est enregistrée mais pas encore disponible, et affiche l'erreur de Discord. Corrigez l'erreur et enregistrez de nouveau.

## Le Copilot et votre propre IA

Le Copilot IA et la connexion MCP utilisateur peuvent régler les mêmes options : types d'installation et contextes, validés avant l'enregistrement. Demandez simplement, par exemple « fais fonctionner /ping en message privé avec le bot ».
