---
layout: doc
title: $setVar[]
category: "Variables"
function_name: setVar
syntax: $setVar[name;value;(User ID)]
description: "Crée ou met à jour une variable globale ou une variable d'utilisateur dans le stockage persistant du bot."
locale: fr
lang: fr
content_language: fr
translation_key: doc-setvar
permalink: /fr/docs/setvar/
sidebar_context: docs_fr
category_key: "Variables"
---

$setVar écrit des valeurs dans la base de données persistante du bot. C'est la contrepartie de `$getVar`, utilisée pour toute donnée qui doit survivre au-delà de l'exécution de la commande en cours.

## Variables globales et variables d'utilisateur

Le troisième paramètre détermine la portée :

- **Omis ou vide** : la variable est stockée comme **globale**, accessible depuis n'importe quelle commande, n'importe quel utilisateur, n'importe quel serveur. À utiliser avec modération, pour de la configuration ou des données partagées.
- **ID d'utilisateur fourni** : la variable est **propre à l'utilisateur** (une valeur par utilisateur, partagée par tous les serveurs) : chaque utilisateur obtient sa propre copie indépendante. Idéal pour les pièces, l'XP, les réglages et toute donnée propre à un utilisateur. Relisez-la avec `$getVar[name;User ID]`.

## Points importants

- **Toutes les valeurs sont du texte**. Si vous avez besoin d'opérations numériques, utilisez `$sum`, `$sub`, `$multi`, `$divide` pour calculer avant de stocker.
- **Écrasement** : appeler `$setVar` sur une variable existante remplace sa valeur, il n'existe pas de mode ajout.
- **Sensibilité à la casse** : `$setVar[Score;100]` et `$setVar[score;200]` écrivent deux variables différentes. Le nom est nettoyé de ses espaces en début et en fin et ne peut pas être vide.
- **Pas de valeur de retour** : cette fonction retourne une chaîne vide ; utilisez-la comme instruction autonome.
- **Déclaration** : avec un ID d'utilisateur, si aucune variable d'utilisateur de ce nom n'est encore déclarée, la première écriture la déclare avec la valeur écrite comme valeur par défaut, de sorte que les autres utilisateurs qui n'ont pas de valeur stockée lisent cette première valeur. Une écriture globale (sans ID d'utilisateur) ne déclare rien.

## Exemples

### Enregistrer une variable globale

```bdfd
$setVar[announcementBanner;Welcome all new members!]
$title[Global Variable Set]
$description[Saved global banner: **$getVar[announcementBanner]**]
$color[#5865F2]
```
