---
layout: doc
title: Qu'est-ce que BibiScript ?
category: "Général"
category_key: "Meta"
description: "BibiScript est le langage de script texte de Bot Creator, un langage natif qui mélange des fonctions de type BDFD, de type ForgeScript et ses propres fonctions."
locale: fr
lang: fr
content_language: fr
translation_key: doc-bibiscript
permalink: /fr/docs/bibiscript/
sidebar_context: docs_fr
---

# Qu'est-ce que BibiScript ?

**BibiScript** est le langage texte que tu écris dans Bot Creator quand une commande ou un workflow est en mode *script*. Un script est du texte avec des `$fonctions` : le texte est envoyé comme réponse, et chaque fonction fait quelque chose (lire une valeur, envoyer un message, donner un rôle, appeler la base de données...).

```
Salut $username ! Il y a $membersCount membres ici.
$giveRole[$authorID;$findRole[Membre]]
```

## D'où vient-il

BibiScript n'est pas la copie d'un autre langage. C'est un langage à part, exécuté par l'interpréteur natif de Bot Creator, construit à partir de trois sources :

| Source | Ce que BibiScript en prend |
|---|---|
| **BDFD** (Bot Designer For Discord) | La syntaxe `$fonction[arg;arg]` et le catalogue de fonctions BDFD. La plupart des scripts BDFD tournent sans changement. |
| **ForgeScript** | Les fonctions de ForgeScript qui n'existent pas dans BDFD sont ajoutées en natif au fil du temps, avec la même idée et le même nom. |
| **Bot Creator lui-même** | Des fonctions qui n'existent nulle part ailleurs : base de données (`$db*`), modules, traductions (`$t`), vocal, canvas, workflows (`$callWorkflow`)... |

Comme les trois familles partagent une seule syntaxe, tu peux les mélanger dans le même script. Il n'y a pas de « mode BDFD » ou « mode Forge » à choisir.

## Les trois façons d'écrire une commande

| Mode | Langage | À utiliser quand |
|---|---|---|
| **Blocs** | Actions visuelles et workflows | Tu préfères construire en cliquant. |
| **BibiScript** | Texte et `$fonctions` | Tu veux des scripts courts et lisibles. |
| **JavaScript** | API `bc.*`, code `async` | Tu as besoin de boucles ou de structures de données. |

BibiScript et JavaScript sont tenus au même niveau : ce qu'une fonction permet, l'API JavaScript le permet aussi, et inversement.

## Bon à savoir

- Les noms de fonctions ne tiennent pas compte des majuscules ; les noms de variables temporaires, si.
- Là où Bot Creator se comporte autrement que BDFD, la page [Différences avec BDFD](/docs/bdfd-differences/) (en anglais) le liste.
- [`$scriptLanguage`](/docs/scriptlanguage/) (en anglais) renvoie `BibiScript`.
- La liste complète des fonctions est dans la [référence des fonctions](/docs/) (en anglais) ; le déroulement d'un script est dans le [modèle d'exécution](/docs/execution-model/) (en anglais).
- Tu peux essayer un script sans bot dans le [playground](/fr/playground/).
