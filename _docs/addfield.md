---
layout: doc
title: $addField[]
translation_key: docs
category: "Embed & Message"
function_name: addField
syntax: $addField[name;value;(inline);(index)]
description: Adds a field to a Discord embed. The fields help structure information as name/value pairs in the embed.
---

# $addField[]

The `$addField[]` function ajoute un **champ** (field) to a Discord embed. The fields are displayed sous la description and allow présenter of data structurées as name/value pairs.

## Syntax

```
$addField[name;value;(inline);(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Title of the field. Max 256 becauseactères. |
| `value` | Content of the field. Max 1024 becauseactères. Supports the markdown. |
| `inline` | Optional. `yes` pour inline (côte to côte), `no` by default. |
| `index` | Optional. Position of insertion (0 = début). Without index, ajoute to the end. |

## Return value

Modifies the response in progress of construction. Returns nothing.

## Behavior

- Un embed can contain up to **25 fields**.
- Les fields **inline** s'affichent côte to côte : up to **3 par ligne**.
- Les fields **non-inline** (default) occupent toute la largeur.
- L'index allows insérer un field to une position précise (0 = very beginning).

## Examples

### Full-width fields (non-inline)

```bdfd
$title[Profil user]
$description[Informations détaillées]
$addField[Nom of user;$username]
$addField[ID;$authorID]
$addField[Date of création;$creationDate[$authorID]]
$color[#5865F2]
$sendMessage[]
```

### Inline fields (3 par ligne)

```bdfd
$title[Scores]
$addField[Alice;1500 pts;yes]
$addField[Bob;1200 pts;yes]
$addField[Charlie;980 pts;yes]
$color[#57F287]
$sendMessage[]
```

### Mixed inline and non-inline

```bdfd
$title[Fiche server]
$description[Informations on the server]
$addField[Nom;$serverName]
$addField[Members;$membersCount;yes]
$addField[Channels;$channelCount;yes]
$addField[ID Server;$guildID;yes]
$addField[Description;Un super server communautaire !]
$color[#5865F2]
$sendMessage[]
```

### Inserves at a specific position

```bdfd
$addField[Premier;Contenu 1]
$addField[Troisième;Contenu 3]
$addField[Deuxième;Contenu 2;no;1]

$title[Ordre fields]
$description[Le field 2 has been inserted en position 1.]
$color[#5865F2]
$sendMessage[]
```

## Notes

- The name and the value supports the markdown Discord.
- Combinez inline and non-inline pour mises en page complexs.
- L'index 0 correspond at the beginning (before all other fields).
- If the index dépasses the namebre of fields existings, le field is added to the end.
