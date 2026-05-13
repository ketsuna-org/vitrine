---
title: Comment creer un token de bot Discord pour Bot Creator
description: Creez un token de bot Discord, securisez-le correctement et ajoutez-le a Bot Creator avec une configuration propre.
date: 2025-05-18T18:09:00.000Z
thumbnail: assets/icon.png
author: Garder500
layout: post
toc: true
locale: fr
translation_key: guide-create-bot-token
content_language: fr
categories: [setup, securite]
---
# Comment creer un token de bot Discord

Un token de bot est l'identifiant qui permet a Bot Creator de se connecter a votre application Discord.
Ce guide vous accompagne dans la configuration, de la creation de l'application au stockage securise du token dans l'application.

## Prerequis

- Un compte Discord valide
- Un navigateur web
- Les permissions Administrateur sur le serveur ou vous voulez ajouter le bot

## Etape 1 : Acceder au Discord Developer Portal

1. Ouvrez le portail developpeur : [https://discord.com/developers/applications](https://discord.com/developers/applications)
2. Connectez-vous avec vos identifiants Discord.
3. Creez une nouvelle application :
   - Cliquez sur **New Application**.
   - Entrez un nom descriptif, comme `MonBotUtilitaire`.
   - Acceptez les conditions d'utilisation.
   - Cliquez sur **Create**.

> Astuce : Choisissez un nom d'application clair qui reflete l'usage du bot.

## Etape 2 : Configurer votre application

### Informations generales
- Ajoutez une description claire.
- Telechargez un avatar.
- Ajoutez des tags pertinents si besoin.

### Parametres avances
- Notez l'**Application ID** si vous en avez besoin plus tard.
- Desactivez **Public Bot** si vous seul devez pouvoir inviter le bot.

## Etape 3 : Creer l'utilisateur Bot

1. Ouvrez l'onglet **Bot** dans la barre latérale gauche.
2. Cliquez sur **Add Bot**.
3. Confirmez avec **Yes, do it!**
4. Personnalisez le bot si besoin :
   - Nom d'utilisateur
   - Avatar
   - Banniere

## Etape 4 : Generer et securiser le token

### Generation du token
1. Dans la section **Token**, cliquez sur **Reset Token**.
2. Confirmez l'action. Cela invalide tout token precedent.
3. Copiez le nouveau token immediatement.
4. Stockez-le de maniere securisee dans Bot Creator.

### Mesures de securite critiques

Regles de securite :
- Ne partagez jamais votre token publiquement.
- Ne montrez jamais le token dans des captures d'ecran ou des videos.
- Gardez le token prive a l'interieur de Bot Creator.
- Regenerez le token immediatement si vous pensez qu'il a ete expose.

## Etape 5 : Configurer les permissions

### Permissions du Bot
1. Allez dans l'onglet **Bot** -> **Privileged Gateway Intents**.
2. Activez les intents dont vous avez reellement besoin :
   - **Presence Intent**
   - **Server Members Intent**
   - **Message Content Intent**

### Permissions OAuth2
1. Allez dans **OAuth2** -> **URL Generator**.
2. Selectionnez les scopes `bot` et `applications.commands`.
3. Choisissez les permissions requises pour votre bot.
4. Copiez l'URL d'invitation generee et utilisez-la pour ajouter le bot a votre serveur.

## Etape 6 : Ajouter le token a Bot Creator

1. Ouvrez Bot Creator.
2. Accedez a la zone de configuration du bot.
3. Collez le token dans le champ prevu.
4. Enregistrez la configuration.
5. Testez la connexion pour verifier que cela fonctionne.

## Depannage

### Problemes courants

| Erreur | Cause probable | Solution |
|--------|----------------|----------|
| `Invalid Token` | Token incorrect ou expire | Regenerez le token |
| `Missing Permissions` | Permissions insuffisantes | Verifiez les permissions OAuth2 |
| `Missing Access` | Bot non invite sur le serveur | Utilisez l'URL d'invitation |
| `Connection Failed` | Probleme reseau ou de token | Verifiez le token et la connexion internet |

## Securite et Bonnes Pratiques

Tratez votre token de bot comme un mot de passe. Ne le partagez jamais. Si vous avez un doute, regenerez-le immediatement dans le portail Discord.
