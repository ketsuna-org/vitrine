---
title: "Créer des Embeds Discord Sublimes en BDFD"
description: Maîtrisez l'art de concevoir des cartes d'embed structurées, esthétiques et haut de gamme pour vos commandes de bot grâce aux outils BDFD.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-embeds-guide
locale: fr
content_language: fr
layout: post
category: Embeds
toc: true
function_syntax: $title[text]
---

Les messages textuels standards conviennent aux conversations de base, mais ils manquent cruellement de structure. Si vous souhaitez que votre bot Discord ait l'air professionnel, moderne et lisible, vous devez maîtriser les **Embeds**. Les embeds sont des cartes formatées disposant de leurs propres couleurs, images, colonnes de données (champs), pieds de page et métadonnées.

Dans ce guide, nous allons explorer la suite complète d'outils BDFD / Bot Creator pour concevoir des embeds sublimes et hautement optimisés pour vos commandes.

---

## 🎨 Anatomie d'un Embed Discord

Un embed Discord est constitué de plusieurs blocs distincts. BDFD associe chacun de ces blocs à une fonction intuitive :

```mermaid
graph TD
    A[Structure de l'Embed] --> B[$author[nom;iconURL;url]]
    A --> C[$title[texte]]
    A --> D[$description[long_texte_markdown]]
    A --> E[$addField[titre;valeur;inline_true_ou_false]]
    A --> F[$thumbnail[imageURL]]
    A --> G[$image[grandeImageURL]]
    A --> H[$footer[texte;iconURL]]
    A --> I[$color[code_couleur_hex]]
    A --> J[$addTimestamp]
```

---

## 1. Poser les Fondations (Titre, Description et Couleur)

Tout bon embed commence par un titre clair et une description. Vous pouvez également attribuer une couleur thématique à votre bot :

* **`$title[texte]`** : Définit l'en-tête en gras de votre embed. Rédigez un titre court.
* **`$description[texte]`** : Le corps principal de votre embed. Supporte le Markdown Discord classique (gras, italique, listes, blocs de code, émojis).
* **`$color[code_hex]`** : Spécifie la couleur de la barre verticale située à gauche de l'embed. Doit être un code hexadécimal valide (ex: `#3b82f6` ou `3b82f6`).

### Exemple de Code : Embed Fondamental
```bdfd
$nomention
$title[📖 Règlement du Serveur]
$color[#f59e0b]
$description[
Bienvenue dans notre communauté ! Veuillez respecter les consignes suivantes :

1. **Soyez respectueux** : Traitez tout le monde avec bienveillance.
2. **Pas de spam** : Conservez des salons propres et lisibles.
3. **Bon sens** : Amusez-vous et respectez les autres !
]
```

---

## 2. Structurer les Données avec des Colonnes (`$addField`)

Les champs (fields) sont parfaits pour afficher des paires clé-valeur (listes de caractéristiques, statistiques de jeux, diagnostics système). En activant le paramètre de mise en ligne (`true`), les champs s'alignent horizontalement :

```bdfd
$addField[nom;valeur;inline]
```
* **`nom`** : Le titre en gras de la colonne.
* **`valeur`** : Le texte contenu dans la colonne.
* **`inline`** : Mettez `true` pour aligner les colonnes côte à côte (jusqu'à 3 par ligne sur PC). Mettez `false` pour afficher le champ sur sa propre ligne.

### Exemple de Code : Colonnes Alignées
```bdfd
$nomention
$title[📊 Diagnostics du Serveur]
$color[#10b981]

$addField[Usage CPU;🟢 `12%` / Normal;true]
$addField[Usage RAM;🟡 `64%` / Stable;true]
$addField[Uptime;⚡ `3j 12h 4m`;true]
```

---

## 3. Insérer des Images (`$thumbnail` et `$image`)

Les images dynamisent vos embeds. Vous pouvez en ajouter deux types sur n'importe quel embed :

* **`$thumbnail[url]`** : Place une petite image dans le coin supérieur droit. Idéal pour afficher des avatars de profils, des logos de serveurs ou des icônes d'état système.
* **`$image[url]`** : Affiche une grande image pleine largeur au bas de l'embed. Utile pour les bannières d'accueil, les graphiques statistiques ou les illustrations.

> [!TIP]
> Veillez à ce que vos liens d'images se terminent par des extensions valides (comme `.png`, `.jpg`, `.jpeg` ou `.gif`) pour que Discord les affiche correctement.

---

## 4. Pieds de page, Auteurs et Horodatages

Pour donner une touche finale ultra-professionnelle à vos cartes :

* **`$author[nom;iconURL;url]`** : Affiche un bloc de profil discret tout en haut. Idéal pour attribuer une action à un membre ou afficher le nom du bot.
* **`$footer[texte;iconURL]`** : Affiche un petit texte gris au bas de la carte.
* **`$addTimestamp`** : Ajoute automatiquement la date et l'heure actuelles au pied de page, certifiant le moment où l'information a été générée.

---

## 🏆 Modèle Premium : Commande Server Info Complète

Voici une commande `!serverinfo` prête pour la production combinant l'intégralité des fonctionnalités graphiques étudiées :

```bdfd
$nomention
$title[🏰 Informations du Serveur : $serverName]
$color[#6366f1]
$thumbnail[$serverIcon]

$author[Analyses Système;$userAvatar[$botID]]

$description[
Statistiques détaillées et aperçu des activités de **$serverName**.
]

$addField[👑 Propriétaire;<@$serverOwner>;true]
$addField[🗺️ Région;`$serverRegion`;true]
$addField[👥 Membres;`$membersCount` membres;true]

$addField[💬 Salons;📝 `$channelCount[text]` Texte / 🔊 `$channelCount[voice]` Vocal;true]
$addField[🎭 Rôles;`$roleCount` rôles personnalisés;true]
$addField[⚡ Niveau Boost;Niveau `$boostLevel` (`$boostCount` boosts);true]

$image[$serverSplash]

$footer[Demandé par $username; $authorAvatar]
$addTimestamp
```
