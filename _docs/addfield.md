---
layout: doc
title: $addField[]
translation_key: docs
category: "Embed & Message"
function_name: addField
syntax: $addField[name;value;(inline);(index)]
description: Ajoute un champ (field) à un embed Discord. Les fields permettent de structurer des informations en paires nom/valeur dans l'embed.
parameters:
  - name: name
    description: Titre/nom du field. Longueur maximale : 256 caractères.
  - name: value
    description: Valeur/contenu du field. Longueur maximale : 1024 caractères. Supporte le markdown.
  - name: inline
    description: "Optionnel. 'yes' pour afficher le field en ligne (côte à côte, max 3 par ligne), 'no' (défaut) pour un field pleine largeur."
  - name: index
    description: "Optionnel. Position d'insertion du field (0 = début). Sans index, le field est ajouté à la fin."
returns:
  - type: void
    description: Modifie la réponse en cours de construction.
related:
  - $title[]
  - $description[]
  - $footer[]
  - $sendMessage[]
examples:
  - description: Fields simples non-inline
    code: |
      $title[Statistiques]
      $description[Voici vos statistiques.]
      $addField[Parties jouées;42]
      $addField[Victoires;28]
      $addField[Défaites;14]
      $color[#5865F2]
  - description: Fields inline (côte à côte, 3 par ligne)
    code: |
      $title[Classement]
      $addField[🥇 1er;Alice;yes]
      $addField[🥈 2ème;Bob;yes]
      $addField[🥉 3ème;Charlie;yes]
      $color[#FEE75C]
  - description: Insertion à une position spécifique
    code: |
      $addField[Field 1;Premier field]
      $addField[Field 3;Troisième field]
      $addField[Field 2;Deuxième field;no;1]
---

# $addField[]

La fonction `$addField[]` ajoute un **champ** (field) à un embed Discord. Les fields sont affichés sous la description et permettent de présenter des données structurées en paires nom/valeur.

## Syntaxe

```
$addField[name;value;(inline);(index)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Titre du field. Max 256 caractères. |
| `value` | Contenu du field. Max 1024 caractères. Supporte le markdown. |
| `inline` | Optionnel. `yes` pour inline (côte à côte), `no` par défaut. |
| `index` | Optionnel. Position d'insertion (0 = début). Sans index, ajoute à la fin. |

## Valeur de retour

Modifie la réponse en cours de construction. Ne retourne rien.

## Comportement

- Un embed peut contenir jusqu'à **25 fields**.
- Les fields **inline** s'affichent côte à côte : jusqu'à **3 par ligne**.
- Les fields **non-inline** (défaut) occupent toute la largeur.
- L'index permet d'insérer un field à une position précise (0 = tout début).

## Exemples

### Fields pleine largeur (non-inline)

```bdfd
$title[Profil utilisateur]
$description[Informations détaillées]
$addField[Nom d'utilisateur;$username]
$addField[ID;$authorID]
$addField[Date de création;$creationDate[$authorID]]
$color[#5865F2]
$sendMessage[]
```

### Fields inline (3 par ligne)

```bdfd
$title[Scores]
$addField[Alice;1500 pts;yes]
$addField[Bob;1200 pts;yes]
$addField[Charlie;980 pts;yes]
$color[#57F287]
$sendMessage[]
```

### Mix inline et non-inline

```bdfd
$title[Fiche serveur]
$description[Informations sur le serveur]
$addField[Nom;$serverName]
$addField[Membres;$membersCount;yes]
$addField[Salons;$channelCount;yes]
$addField[ID Serveur;$guildID;yes]
$addField[Description;Un super serveur communautaire !]
$color[#5865F2]
$sendMessage[]
```

### Insertion à une position spécifique

```bdfd
$addField[Premier;Contenu 1]
$addField[Troisième;Contenu 3]
$addField[Deuxième;Contenu 2;no;1]

$title[Ordre des fields]
$description[Le field 2 a été inséré en position 1.]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Le nom et la valeur supportent le markdown Discord.
- Combinez inline et non-inline pour des mises en page complexes.
- L'index 0 correspond au début (avant tous les autres fields).
- Si l'index dépasse le nombre de fields existants, le field est ajouté à la fin.
