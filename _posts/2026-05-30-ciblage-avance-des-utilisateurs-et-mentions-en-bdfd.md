---
title: "Ciblage Avancé des Utilisateurs et Mentions en BDFD"
description: Apprenez à cibler dynamiquement les utilisateurs via des mentions, des identifiants (IDs) ou des recherches textuelles, avec des systèmes de repli (fallbacks) fiables dans Bot Designer for Discord.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-targeting-guide
locale: fr
content_language: fr
layout: post
category: User
toc: true
function_syntax: $findUser[query;fallbackToAuthor]
---

L'un des aspects les plus cruciaux des commandes interactives sur Discord consiste à identifier avec précision *qui* la commande doit cibler. Lorsqu'un utilisateur tape `!avatar @pseudo`, `!avatar 123456789012345678`, ou simplement `!avatar`, votre bot doit savoir traiter chacun de ces cas avec élégance.

Dans ce guide, nous allons explorer les techniques avancées de ciblage des utilisateurs avec Bot Designer for Discord (BDFD) / Bot Creator à l'aide de `$mentioned`, `$findUser`, `$findMember` et `$authorID`.

---

## 🔍 Comparatif des Fonctions de Ciblage

BDFD offre plusieurs fonctions pour extraire des identifiants (IDs) d'utilisateurs depuis les arguments d'une commande. Le choix de la fonction détermine la flexibilité de votre bot :

| Fonction | Description | Cas d'utilisation idéal |
| :--- | :--- | :--- |
| **`$authorID`** | Retourne instantanément l'ID de l'auteur de la commande. | Définir un repli (fallback) par défaut. |
| **`$mentioned[index]`** | Récupère l'ID de l'utilisateur directement **mentionné** (ping) dans le message. | Commandes strictes nécessitant uniquement un ping. |
| **`$findUser[query;fallback]`** | Recherche globale par texte (ID, pseudo, mention) et renvoie un ID. | Commandes utilitaires flexibles (`!whois`, `!avatar`). |
| **`$findMember[query;fallback]`** | Recherche restreinte uniquement au serveur Discord actuel. | Outils de modération (`!warn`, `!ban`, `!kick`). |

---

## 1. Analyse de Mentions Stricte (`$mentioned`)

Si vous souhaitez concevoir une commande qui ne doit s'exécuter que lorsqu'un utilisateur est explicitement mentionné à l'aide d'un ping Discord, utilisez `$mentioned` :

```bdfd
$mentioned[index;retournerAuteurSiVide]
```
* **`index`** : L'ordre de la mention (par exemple, `1` pour le premier ping, `2` pour le second).
* **`retournerAuteurSiVide`** : (Optionnel) Si configuré sur `yes`, retourne l'identifiant de l'auteur si aucun ping n'est présent.

### Exemple de Code : Commande d'Action Stricte
```bdfd
$nomention
$if[$mentioned[1]==]
  ❌ Vous devez mentionner un utilisateur pour exécuter cette commande ! Exemple : `!gifle @pseudo`
$else
  💥 $username a giflé $username[$mentioned[1]] ! Ça doit faire mal !
$endif
```

---

## 2. Recherche Globale d'Utilisateurs (`$findUser`)

La fonction `$findUser` est la référence absolue pour les commandes nécessitant une grande flexibilité de saisie. Elle analyse de manière intelligente une chaîne de caractères et tente de trouver un utilisateur n'importe où sur Discord :

```bdfd
$findUser[requête;repliSurAuteur]
```
* **`requête`** : Le texte à rechercher. Correspond généralement à `$message` ou à des arguments comme `$noMentionMessage`.
* **`repliSurAuteur`** : (Optionnel, `yes` ou `no`). Si `yes`, la fonction renvoie `$authorID` si la recherche ne donne rien ou est vide.

### Exemple de Code : Commande Avatar Flexible
Créons un afficheur d'avatar moderne capable de gérer les pings, les identifiants Snowflake bruts, les pseudos, ou de cibler l'auteur par défaut :

```bdfd
$nomention
$var[targetID;$findUser[$message;yes]]

$title[🖼️ Avatar de $username[$var[targetID]]]
$color[#3b82f6]
$image[$userAvatar[$var[targetID]]]
$footer[Demandé par $username; $authorAvatar]
$addTimestamp
```

---

## 3. Recherche Interne au Serveur (`$findMember`)

Pour les commandes de modération, cibler un utilisateur globalement ne suffit pas ; la cible **doit** faire partie du serveur. `$findMember` fonctionne de manière identique à `$findUser` mais limite sa recherche aux membres du serveur actuel :

```bdfd
$findMember[requête;repliSurAuteur]
```

### Exemple de Code : Commande d'Exclusion Locale (Kick)
```bdfd
$nomention
$onlyPerms[kickmembers;❌ Vous devez disposer de la permission d'exclure des membres !]

$var[targetID;$findMember[$message;no]]

$if[$var[targetID]==]
  ❌ Membre introuvable ! Veuillez fournir un pseudo valide, un pseudo de serveur, une mention ou un identifiant.
$else
    $if[$var[targetID]==$authorID]
      ❌ Vous ne pouvez pas vous exclure vous-même !
    $else
      $kick[$var[targetID]]
      ✅ **$username[$var[targetID]]** a été exclu du serveur avec succès.
    $endif
$endif
```

---

## 🛠️ Bonnes Pratiques de Conception

### A. Filtrer les Mentions dans les Arguments
Lorsque vous passez des arguments de message dans vos requêtes de recherche, utilisez `$noMentionMessage` pour éliminer les pings explicites. Cela évite les doubles résolutions lorsque les mentions sont interprétées comme du texte brut.

### B. Mises en Forme Élégantes des Pseudos
Lorsque vous affichez les noms des utilisateurs résolus, privilégiez `$username[userID]` ou `$displayName[userID]` au lieu d'afficher l'identifiant numérique brut afin de préserver une interface propre et lisible.
