---
title: "Maîtriser les Variables de Base de Données Persistantes en BDFD"
description: Apprenez à déclarer, modifier et récupérer des valeurs persistantes en base de données pour les utilisateurs et serveurs afin de concevoir des économies, systèmes de niveaux ou profils personnalisés.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-db-guide
locale: fr
content_language: fr
layout: post
category: User
toc: true
function_syntax: $getUserVar[varName;userID]
---

Pour concevoir des bots Discord attrayants, vous devez pouvoir stocker des données qui persistent même après un redémarrage du bot. Qu'il s'agisse de suivre le solde monétaire d'une économie, l'expérience (XP) pour un système de niveaux, ou des descriptions de profils personnalisés, le stockage persistant est essentiel.

Bot Designer for Discord (BDFD) / Bot Creator gère cela nativement grâce à ses variables de base de données intégrées. Dans ce guide, nous allons voir comment déclarer des variables, lire et écrire des valeurs pour les membres ou les serveurs, et concevoir une commande de profil complète.

---

## 🗄️ Comprendre la Portée (Scope) des Variables

Avant de coder, il est primordial de choisir la bonne portée de variable en fonction de l'entité que vous souhaitez suivre :

| Portée (Scope) | Paire de Fonctions | Entité Ciblée | Exemple d'utilisation |
| :--- | :--- | :--- | :--- |
| **Portée Utilisateur** | `$getUserVar` / `$setUserVar` | Un utilisateur spécifique (**globalement** ou **par serveur**). | Solde d'économie, points d'XP, titres de profils. |
| **Portée Serveur (Guild)** | `$getVar` / `$setVar` | Le serveur Discord actuel. | Préfixe personnalisé, salon de logs, paramètres du serveur. |

---

## 1. Déclarer les Variables dans le Panel

Avant de pouvoir appeler une variable de base de données dans vos scripts BDFD, **vous devez obligatoirement l'enregistrer dans l'interface web de Bot Creator / BDFD** :

1. Ouvrez le tableau de bord de votre bot.
2. Allez dans l'onglet **Variables** (généralement dans la barre latérale).
3. Cliquez sur **Créer une Variable**.
4. Configurez son **Nom** (ex: `money`, `level`, `xp`, `prefix`).
5. Définissez sa **Valeur par Défaut** (ex: `0` pour les nombres, ou `none` pour du texte).
6. Cliquez sur **Sauvegarder**.

> [!WARNING]
> Si vous tentez d'appeler une variable dans vos scripts sans l'avoir préalablement enregistrée dans le panel, le bot renverra une chaîne vide ou déclenchera une erreur de compilation.

---

## 2. Gérer les Variables Utilisateur (`$getUserVar` / `$setUserVar`)

### Écrire une donnée (`$setUserVar`)
Enregistre une valeur dans la base de données associée à un membre spécifique.

```bdfd
$setUserVar[nomDeLaVariable;nouvelleValeur;userID]
```
* **`nomDeLaVariable`** : Le nom exact de la variable tel qu'enregistré dans le panel.
* **`nouvelleValeur`** : La chaîne ou le nombre à sauvegarder.
* **`userID`** : (Optionnel) L'identifiant Discord du membre ciblé. Si omis, prend par défaut la valeur de `$authorID` (l'auteur de la commande).

### Lire une donnée (`$getUserVar`)
Récupère la valeur précédemment enregistrée.

```bdfd
$getUserVar[nomDeLaVariable;userID]
```
* **`nomDeLaVariable`** : Le nom exact de la variable.
* **`userID`** : (Optionnel) Le membre ciblé. Si omis, cible par défaut `$authorID`.

---

## 3. Exemple Concret : Créer un Système d'Économie

Créons une commande classique de récompense journalière `!daily` qui ajoute `500` pièces au solde d'un utilisateur :

### Commande : `!daily`
* **Prérequis** : Une variable nommée `money` enregistrée dans le panel avec une valeur par défaut de `0`.

```bdfd
$cooldown[24h;⏱️ Vous avez déjà récupéré vos pièces quotidiennes ! Revenez dans %time%.]

$var[argentActuel;$getUserVar[money]]
$var[nouvelArgent;$calculate[$var[argentActuel] + 500]]

$setUserVar[money;$var[nouvelArgent]]

$title[💰 Récompense Récupérée !]
$color[#10b981]
$description[
Bonjour $username ! Vous venez de recevoir vos **500 pièces** quotidiennes !
* **Ancien solde** : `$var[argentActuel]` pièces
* **Nouveau solde** : `$var[nouvelArgent]` pièces
]
$addTimestamp
```

---

## 4. Gérer les Paramètres de Serveurs (`$getVar` / `$setVar`)

Pour configurer les préférences globales d'un serveur (comme un préfixe de commande alternatif), utilisez la portée serveur :

### Commande : `!setprefix`
* **Prérequis** : Une variable nommée `prefix` dans le panel avec la valeur par défaut `!`.

```bdfd
$nomention
$onlyPerms[administrator;❌ Seuls les administrateurs peuvent modifier le préfixe sur ce serveur !]

$if[$message==]
  ❌ Veuillez spécifier un nouveau préfixe. Exemple : `!setprefix ?`
$else
  $setVar[prefix;$message]
  $title[⚙️ Préfixe Modifié !]
  $color[#3b82f6]
  $description[Le préfixe des commandes pour ce serveur est désormais : **`$message`**]
$endif
```

---

## 🛠️ Bonnes Pratiques & Astuces Avancées

### A. Opérations Mathématiques sur les Variables
Pour additionner ou soustraire, extrayez d'abord la valeur, effectuez le calcul dans `$calculate`, puis réinjectez le résultat :
```bdfd
$setUserVar[xp;$calculate[$getUserVar[xp] + 25]]
```

### B. Validation des Chaînes de Caractères
Si une variable textuelle est vide ou possède sa valeur par défaut, traitez ce cas avant de l'afficher :
```bdfd
$if[$getUserVar[bio]==none]
  Ce membre n'a pas encore rédigé de biographie ! Utilisez `!setbio` pour l'ajouter.
$else
  $getUserVar[bio]
$endif
```

### C. Portée Utilisateur Locale au Serveur
Par défaut, `$getUserVar` stocke la valeur globalement sur tous les serveurs partagés par le bot. Si vous voulez des données **locales à un serveur** (par exemple, un niveau unique par serveur), concaténez l'identifiant du serveur `$guildID` ou configurez la portée dans les paramètres avancés du tableau de bord.
