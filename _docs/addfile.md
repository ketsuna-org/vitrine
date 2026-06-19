---
layout: doc
title: $addFile[]
translation_key: docs
category: "Embed & Message"
function_name: addFile
syntax: $addFile[url;(spoiler)]
description: Attache un fichier (image, document, etc.) à un message Discord en tant que composant visuel. Le fichier est affiché directement dans le message.
---

# $addFile[] — Pièce Jointe Fichier

`$addFile[]` attache un fichier (image, PDF, document, etc.) à un message. Le fichier est téléchargé depuis l'URL fournie et affiché comme pièce jointe dans le message Discord.

## Syntaxe

```
$addFile[url;(spoiler)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `url` | Oui | — | URL du fichier à joindre. |
| `spoiler` | Non | `no` | `yes` pour spoiler le fichier. |

## Valeur de retour

Ajoute le fichier comme pièce jointe au message. Discord affiche le fichier selon son type (aperçu pour les images, icône + nom pour les documents).

## Utilisation

### Joindre une image

```bdfd
$addFile[https://cdn.example.com/chart.png]
$sendMessage[Voici le graphique demandé]
```

### Document PDF

```bdfd
$addFile[https://docs.example.com/rapport-2024.pdf]
$sendMessage[Rapport annuel ci-joint]
```

### Fichier spoiler

```bdfd
$addFile[https://cdn.example.com/spoiler_endgame.png;yes]
$sendMessage[Attention : spoiler de fin !]
```

### Fichiers multiples

```bdfd
$addFile[https://files.example.com/logs.txt]
$addFile[https://files.example.com/config.json]
$sendMessage[Fichiers de configuration]
```

### Avec embed et fichier

```bdfd
$title[Rapport mensuel]
$description[Voici le rapport détaillé du mois]
$color[#5865F2]
$addFile[https://reports.example.com/monthly.pdf]
```

## Types de fichiers supportés

- Images : PNG, JPEG, GIF, WebP
- Documents : PDF, TXT, CSV, JSON, XML
- Archives : ZIP (limité)
- Taille max : ~25 Mo (selon le niveau de boost du serveur)

## Notes

- L'URL doit être accessible publiquement.
- Plusieurs `$addFile[]` peuvent être utilisés dans un même message.
- À ne pas confondre avec `$addModalFileUpload[]` qui est pour les modals interactifs.
- Le spoiler masque le fichier jusqu'à ce que l'utilisateur clique pour le révéler.
