---
layout: doc
title: BDFD et Graphe
category: "Général"
category_key: "Meta"
api_type: general
description: "Le pont entre le BDScript (BDFD) et le mode Graphe : convertir un script en graphe et un graphe en script, avec équivalence de comportement et avertissements."
locale: fr
lang: fr
content_language: fr
translation_key: doc-bdfd-graph
permalink: /fr/docs/bdfd-graph/
sidebar_context: docs_fr
---

# BDFD et Graphe

BDFD (script `$fonction[...]`) et le [mode Graphe](/fr/docs/graph/) tournent sur le même moteur natif. Bot Creator sait donc passer de l'un à l'autre, **dans les deux sens** :

- **BDFD vers Graphe** : le script devient un graphe de nœuds que l'on peut modifier visuellement.
- **Graphe vers BDFD** : le graphe devient un script que l'on peut lire, copier ou continuer à la main.

« Fidèle » veut dire **équivalent en comportement** (mêmes résultats, mêmes variables, mêmes effets), pas identique en texte : le script obtenu n'est pas celui qu'on aurait écrit à la main.

> Les boutons « Convertir en BDFD » et « Convertir en Graphe » de l'éditeur (application et Studio) et l'outil équivalent du Manager et du MCP arrivent **bientôt**. La conversion sera toujours une action explicite, jamais silencieuse, avec les avertissements affichés.

## BDFD vers Graphe

| Dans le script | Dans le graphe |
|---|---|
| `$if` / `$elseif` / `$else` / `$endif` | un nœud `ifBlock` (pins `then`, `elseif:<i>`, `else`) ; la fin de chaque branche se relie à l'instruction suivante |
| `$for`, boucles | un nœud `forLoop` (pins `body`, `done`) |
| `$try` / `$catch` | un nœud `tryCatch` (pins `try`, `catch`, `done`) |
| une fonction qui a un type de bloc (`$stop`, `$wait`, `$log`, messages…) | le nœud de ce type |
| texte hors fonction | un nœud `respondWithMessage` |
| toute autre fonction | le bloc de cette fonction (son nom, un champ par argument), exécuté par l'interpréteur natif |
| un fragment qui ne se découpe pas en appels simples | un bloc « Script BDFD (non convertible) » qui contient le fragment **exact** |

Un appel imbriqué dans un argument est remonté dans son propre nœud, et référencé par `((action.<clé>))`.

Rien n'est perdu ni silencieux. Chaque cas hors des nœuds dédiés laisse un avertissement :

- `bdfd_generic_call:<fonction>` : la fonction n'a pas encore de type de bloc dédié ; elle devient le bloc de cette fonction.
- `bdfd_passthrough:<fonction>` : le fragment est conservé tel quel dans un bloc « Script BDFD (non convertible) ».

L'objectif est de rendre ces deux cas inutiles : toute fonction BDFD fréquente doit avoir son type de bloc.

## Graphe vers BDFD

Le graphe est écrit dans l'ordre d'exécution déterministe du moteur (en profondeur, dans l'ordre des liens) :

| Dans le graphe | Dans le script |
|---|---|
| `ifBlock` | `$if` / `$elseif` / `$else` / `$endif` |
| boucles | `$for` ou équivalent |
| `tryCatch` | `$try` / `$catch` |
| `switch` | une chaîne de `$if` |
| jonction (plusieurs entrées) | le nœud n'est écrit qu'**une fois**, après la structure qui l'a précédé |

Ce qui ne se traduit pas exactement est signalé par un avertissement `graph_*` : nœud orphelin (`graph_orphan`), branches parallèles linéarisées (`graph_parallel`), lien qui ne mène nulle part (`graph_dangling_link`), graphe non structuré (`graph_unstructured`), nœud désactivé (`graph_disabled`), pin `error` relié (`graph_error_pin`), type de nœud ou champ sans équivalent BDFD (`graph_unmapped_node`, `graph_unmapped_field`).

Par défaut le script est compact : en BDFD, un saut de ligne est du texte de sortie, donc un script « joli » n'a pas tout à fait le même comportement.

## La garantie

Propriété visée : pour tout graphe de référence G, convertir G en script puis le script en graphe s'exécute comme G ; et pour tout script de référence S, convertir S en graphe puis en script s'exécute comme S. Ces corpus de référence sont partagés entre l'application, le Manager et la vitrine ; le test de conformité d'exécution est celui de l'application, la vitrine vérifie seulement que les graphes du corpus sont valides.
