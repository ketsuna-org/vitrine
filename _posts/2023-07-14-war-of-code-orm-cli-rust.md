---
title: WAR OF CODE - ORM & CLI rust !
description: Le cahier des charge du premier event war of code
date: 2023-07-14T21:34:10.846Z
tags:
  - Rust
thumbnail: assets/11-database-drivers-and-orms-for-rust-that-are-ready-for-production.avif
author: Garder500
layout: post
toc: false
category: war_of_code
---
## La première partie du défi reposera sur la confection d'un ORM

L'orm doit contenir la possibilité de géré ces tables SQL via le code.
En faisant usage de struct et d'impl vous devrez implémenter les méthodes save/update/delete/find pour CHAQUE tables (via une sorte d'extensions pour chaque tables)
l'ORM doit aussi posséder un query builder "basique" qui permettra au minimum de faire un "WHERE thing LIKES" ou "WHERE thing >=" ect...

## La seconde partie reposera sur un CLI

Le cli fera usage de l'ORM, en créant lui même ces "tables"
le cli implémentera plusieurs commands :

* `config` (Setup un fichier .env avec la base de donnée)
* `make:table` (Démarre un questionnaire pour créer une entité, l'implémentation est libre, vous pouvez aussi le faire en une seule ligne)
* `make:migration` (Créer un fichier SQL à l'aide des fichier rust contenant les tables, (prévoyez une architecture de fichier facile à utilisé pour éviter tout problème) qui sera utilisé pour la commande suivante.
* `migrate --up` | `migrate --down` (Vous devrez donc créer 2 fichier SQL, 1 qui crée VOS commande, et 1 qui permet de les ANNULER)

PS : La migration doit vérifier votre base de donnée au préalable, afin de ne pas refaire TOUTE les commandes, qui ne serais pas forcément nescessaire.
