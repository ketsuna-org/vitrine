---
layout: doc
title: $addField[]
translation_key: docs
category: "Embed & Message"
function_name: addField
syntax: $addField[name;value;(inline);(embedIndex)]
description: Adds a field to a Discord embed. The fields help structure information as name/value pairs in the embed.
---

# $addField[]

The `$addField[]` function adds a **field** to a Discord embed. Fields are displayed below the description and allow presenting structured data as name/value pairs.

## Syntax

```
$addField[name;value;(inline);(embedIndex)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Title of the field. Required, not empty, max 256 characters. |
| `value` | Content of the field. Required, not empty, max 1024 characters. Supports markdown. |
| `inline` | Optional. `yes` (or `true`) for inline (side-by-side), `no` (or `false`) by default. Any other value is an error ("Field inline flag must be yes or no."). |
| `embedIndex` | Optional. Index of the embed that receives the field, from 1 to 10 (1 by default, also when empty). Any other value is an error. |

## Return value

Modifies the response currently being constructed. Returns nothing.

## Behavior

- An embed can contain up to **25 fields**; a 26th field is an error. Fields are kept in the order of the calls and appended at the end: there is no insertion position.
- An empty name or an empty value is an error ("Embed field name and value are required.").
- **Inline** fields are displayed side-by-side: up to **3 per row**.
- **Non-inline** fields (default) occupy the full width.

## Examples

### Full-width fields (non-inline)

```bdfd
$title[User Profile]
$description[Detailed Information]
$addField[Username;$username]
$addField[ID;$authorID]
$addField[Creation Date;$creationDate[$authorID]]
$color[#5865F2]
```

### Inline fields (3 per row)

```bdfd
$title[Scores]
$addField[Alice;1500 pts;yes]
$addField[Bob;1200 pts;yes]
$addField[Charlie;980 pts;yes]
$color[#57F287]
```

### Mixed inline and non-inline

```bdfd
$title[Server Info]
$description[Information about the server]
$addField[Name;$serverName]
$addField[Members;$membersCount;yes]
$addField[Channels;$channelCount;yes]
$addField[Server ID;$guildID;yes]
$addField[Description;A great community server!]
$color[#5865F2]
```

### Fields on the second embed

```bdfd
$title[First embed;1]
$addField[Name;Value;no;1]
$title[Second embed;2]
$addField[Name;Value;yes;2]
$color[#5865F2;2]
```

## Notes

- Both the name and value support Discord markdown.
- Combine inline and non-inline fields for complex layouts.
- The fourth argument selects the embed, not a position inside the embed.

