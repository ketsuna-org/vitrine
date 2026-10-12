---
layout: doc
title: $cooldown[] / $globalCooldown[] / $serverCooldown[]
category: "Contrôle de flux"
function_name: cooldown
syntax: $cooldown[duration;errorMessage]
description: "Impose un cooldown (délai d'attente) à l'exécution d'une commande. Trois variantes : $cooldown (par utilisateur et par serveur), $serverCooldown (par serveur) et $globalCooldown (par utilisateur, tous serveurs confondus)."
locale: fr
lang: fr
content_language: fr
translation_key: doc-cooldown
permalink: /fr/docs/cooldown/
sidebar_context: docs_fr
category_key: "Control Flow"
---

La famille cooldown (délai d'attente) évite le spam de commandes en imposant un délai entre deux utilisations successives. Le moteur propose trois variantes, avec des clés différentes. Toutes sont suivies **par commande** (l'ID de la commande en cours d'exécution).

## Variantes du cooldown

| Fonction | Clé du cooldown (par commande) | Signification |
|----------|----------------------------|---------|
| `$cooldown` | utilisateur + serveur | Un cooldown par utilisateur dans chaque serveur. Le fait que l'utilisateur A soit en cooldown n'empêche pas l'utilisateur B. |
| `$serverCooldown` | serveur | Un cooldown par serveur : tout utilisateur qui le déclenche fait attendre tout le monde dans ce serveur. |
| `$globalCooldown` | utilisateur | Un cooldown par utilisateur, partagé par **tous les serveurs** (le serveur ne fait pas partie de sa clé). Il ne verrouille **pas** l'ensemble du bot. |

`$cooldown` et `$serverCooldown` ont besoin de l'ID du serveur : dans un contexte sans serveur (un message privé), elles échouent avec `Invalid Discord ID.` `$globalCooldown` n'en a pas besoin. Les trois ont besoin d'un ID de commande (sinon `Cooldown requires a bot and command ID.`).

## Syntaxe

```text
$cooldown[duration;errorMessage]
$serverCooldown[duration;errorMessage]
$globalCooldown[duration;errorMessage]
```

Les deux paramètres sont obligatoires : l'appel est refusé avec moins de deux arguments.

## Format de durée

Les durées utilisent un format lisible. Chaque unité est un nombre suivi d'une unité :

| Unité | Lettre | Exemple |
|------|--------|---------|
| Millisecondes | `ms` | `500ms` = 500 millisecondes |
| Secondes | `s` | `10s` = 10 secondes |
| Minutes | `m` | `5m` = 5 minutes |
| Heures | `h` | `1h` = 1 heure |
| Jours | `d` | `2d` = 2 jours |
| Semaines | `w` | `1w` = 1 semaine |
| Années | `y` | `1y` = 1 an |

Les noms d'unités complets (`seconds`, `minutes`, `hours`, `days`...) sont également acceptés, et un nombre simple est lu en secondes. Vous pouvez combiner les unités : `2m30s` = 2 minutes et 30 secondes. Une durée illisible, ou égale à zéro, lève l'erreur `Invalid cooldown duration.`

## Fonctionnement

1. Lorsque la fonction s'exécute, elle vérifie si un cooldown est actif pour sa clé.
2. Si **aucun cooldown n'est actif** → un nouveau cooldown démarre pour la durée indiquée, et l'exécution continue normalement. Rappeler la fonction pendant qu'il est actif ne le prolonge pas.
3. Si **un cooldown est actif** → le script s'arrête. La réponse écrite jusqu'ici est abandonnée et `errorMessage` est envoyé comme réponse. Aucun autre code n'est exécuté.

Le cooldown démarre dès que la fonction réussit : si une ligne ultérieure du script échoue, le cooldown reste actif.

## Message d'erreur

Le second paramètre est obligatoire et n'est évalué que lorsque le cooldown est actif :

- **Avec message** : `$cooldown[10s;Please wait 10 seconds.]` : envoie le message et s'arrête.
- **Message vide** : `$cooldown[10s;]` : lorsque le cooldown est actif, la fonction lève l'erreur `Command is on cooldown.` au lieu d'envoyer un message.

Le message peut contenir les variables `%time%` (temps restant dans la plus grande unité au moins égale à 1, ou en secondes), `%time-d%`, `%time-h%`, `%time-m%` et `%time-s%`. Les valeurs sont arrondies à une décimale et suivies d'un libellé d'unité (par exemple `1.5 Minutes`, `90 Seconds`). Les libellés d'unités peuvent être modifiés avec `$changeCooldownTime`. `$getCooldown[type]` (`normal`, `server` ou `global`) retourne le temps restant en secondes.

## Emplacement

Comme `$onlyIf` et `$argsCheck`, placez les fonctions de cooldown tout **en haut** de votre script, avant tout effet de bord (écritures en base de données, appels d'API, etc.), afin que rien ne soit exécuté lorsque le cooldown est actif.

## Exemple : commande complète avec cooldown

```bdfd
$cooldown[30s;Cooldown is active. Try again in %time-s%.]
$onlyIf[$message!=;You must provide a message.]
Processing your message: $message
```

## Exemple : deux portées combinées

```bdfd
$serverCooldown[10s;This server must wait %time%.]
$cooldown[1m;You must wait %time%.]
Action complete!
```
