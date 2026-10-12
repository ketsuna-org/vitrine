---
layout: doc
title: $getVar[]
category: "Variables"
function_name: getVar
syntax: $getVar[name;(User ID)]
description: "Lit une variable globale ou une variable d'utilisateur dans le stockage persistant du bot."
locale: fr
lang: fr
content_language: fr
translation_key: doc-getvar
permalink: /fr/docs/getvar/
sidebar_context: docs_fr
category_key: "Variables"
---

$getVar récupère des valeurs dans le stockage persistant du bot. Contrairement aux variables temporaires (`$var`), les variables globales et les variables d'utilisateur survivent d'une exécution de commande à l'autre et aux redémarrages du bot. Elles sont stockées dans la base de données du bot.

## Variables globales et variables d'utilisateur

Le deuxième paramètre détermine la portée :

- **Omis ou vide** : la variable est traitée comme **globale**, accessible depuis n'importe quelle commande, n'importe quel utilisateur, n'importe quel serveur.
- **ID d'utilisateur fourni** : la variable est **propre à l'utilisateur** (la valeur est partagée par tous les serveurs pour cet utilisateur) : chaque utilisateur a sa propre valeur indépendante pour un même nom de variable. Utilisez `$authorID` pour désigner l'utilisateur actuel. Il s'agit d'un stockage différent de `$getUserVar` (qui lit la valeur du membre dans un serveur, sauf pour les bots qui utilisent encore l'ancien réglage des variables d'utilisateur).

## Détails du stockage

- Les valeurs écrites par `$setVar` sont stockées sous forme de texte. À la lecture, vous recevez exactement la chaîne qui a été stockée.
- Le nom est nettoyé de ses espaces en début et en fin. Les noms sont sensibles à la casse pour les valeurs stockées : `Score` et `score` sont deux variables différentes. Un nom vide lève une erreur.
- Une variable globale qui n'a jamais été définie retourne une chaîne vide, et sa lecture la crée avec une valeur vide (elle existe alors pour `$varExists`).
- Une variable d'utilisateur qui n'a pas de valeur pour cet utilisateur retourne la valeur par défaut déclarée pour elle (voir ci-dessous), ou une chaîne vide s'il n'y en a pas.
- La valeur par défaut d'une variable d'utilisateur est déclarée dans le catalogue des variables, ou automatiquement par la première écriture `$setVar[name;value;User ID]` pour ce nom, qui utilise la valeur écrite comme valeur par défaut pour tous les utilisateurs qui n'ont pas de valeur stockée.

## Comparaison avec $var

| Aspect | $var | $getVar |
|--------|------|---------|
| Persistance | Exécution uniquement | Persistant (stockage du bot) |
| Portée | Locale | Globale ou utilisateur |
| Cas d'usage | Calculs temporaires | Stockage à long terme |

## Exemples

### Lire une variable globale

```bdfd
$title[Global Setting]
$description[Maintenance mode: `$getVar[maintenanceMode]`]
$color[#5865F2]
```
