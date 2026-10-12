---
layout: doc
title: Premiers pas
category: "Général"
category_key: "Meta"
description: "Commencez ici : configurez un bot, écrivez votre première commande et trouvez la bonne section de la documentation."
locale: fr
lang: fr
content_language: fr
translation_key: doc-getting-started
permalink: /fr/docs/getting-started/
sidebar_context: docs_fr
---
{% assign onboarding_guide_0 = site.posts | where_exp: 'post', "post.url contains 'how-to-create-a-bot-token-bot-creator'" | first %}
{% assign onboarding_guide_1 = site.posts | where_exp: 'post', "post.url contains 'how-to-create-a-command-in-bot-creator-step-by-step'" | first %}
{% assign onboarding_guide_2 = site.posts | where_exp: 'post', "post.url contains 'how-to-create-a-perfect-ping-command-in-bdfd'" | first %}
{% assign onboarding_guide_3 = site.posts | where_exp: 'post', "post.url contains 'mastering-persistent-database-variables-in-bdfd'" | first %}
{% assign onboarding_guide_4 = site.posts | where_exp: 'post', "post.url contains 'handling-rich-interactions-in-bot-creator-buttons-select-menus-modals'" | first %}

Bienvenue dans la documentation de Bot Creator. Cette page présente le chemin le plus rapide pour passer de zéro à une commande en fonctionnement.

## 1. Installer Bot Creator

Téléchargez l'application pour [mobile ou ordinateur](/download/). Créez une application Discord et un jeton de bot : consultez le guide [Create a Discord Bot Token]({{ onboarding_guide_0.url | relative_url }}).

## 2. Choisir votre mode de script

| Mode | Quand l'utiliser | Documentation |
|------|-------------|---------------|
| **Blocs** | Actions visuelles et workflows | [Référence des blocs](/docs/blocks/) |
| **BDScript** | Texte et `$functions`, exécutés par l'interpréteur BDFD natif | [Référence des fonctions BDFD](/docs/) |
| **BDJS (JavaScript)** | Toute la puissance du script | [API JavaScript](/docs/javascript/) |

En BDScript, [$scriptLanguage](/docs/scriptlanguage/) (en anglais) renvoie le langage de l'interpréteur natif (`BDScript 2`).

Lisez [Execution model and compatibility](/docs/execution-model/) (en anglais) avant de copier des exemples : les réponses aux commandes slash sont implicites, et `$closeTicket` est signalée comme une fonction de compatibilité incomplète.

## 3. Créer votre première commande

- **BDScript :** [Create a Command step-by-step]({{ onboarding_guide_1.url | relative_url }}) → [Perfect ping command]({{ onboarding_guide_2.url | relative_url }})
- **JavaScript :** ajoutez un bloc JavaScript et utilisez `await interaction.reply("pong")` ou `await message.reply("pong")`

## 4. Données persistantes

- **BDScript :** `$getUserVar` / `$setUserVar` : consultez [Variables](/docs/#variables) (en anglais) et le [guide des variables de base de données]({{ onboarding_guide_3.url | relative_url }})
- **JavaScript :** `await db.user.get('key')` / `await db.user.set('key', value)` : consultez [db.user](/docs/javascript/db-user/) (en anglais)

## 5. Déployer et surveiller

Hébergez votre bot depuis le tableau de bord de l'application. Pour les runners auto-hébergés, consultez [Deployment & hosting](/docs/deployment/) (en anglais) et le guide [Docker Runner API](/guides/runner-docker-api-only/).

## Références populaires

- [Événements et variables](/fr/docs/events-and-placeholders/) : bots pilotés par les événements et variables `((...))`
- [Interactions overview](/docs/interactions-overview/) (en anglais) : boutons, menus de sélection, modals
- [Handling rich interactions]({{ onboarding_guide_4.url | relative_url }}) : présentation complète pas à pas
- [MCP server](/docs/mcp/) (en anglais) : intégration d'outils d'IA pour cette documentation
