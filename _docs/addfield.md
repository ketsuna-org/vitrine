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

The `$addField[]` function adds a **field** to a Discord embed. Fields are displayed below the description and allow presenting structured data as name/value pairs.

## Syntax

```
$addField[name;value;(inline);(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Title of the field. Max 256 characters. |
| `value` | Content of the field. Max 1024 characters. Supports markdown. |
| `inline` | Optional. `yes` for inline (side-by-side), `no` by default. |
| `index` | Optional. Insertion position (0 = start). Without an index, it is added to the end. |

## Return value

Modifies the response currently being constructed. Returns nothing.

## Behavior

- An embed can contain up to **25 fields**.
- **Inline** fields are displayed side-by-side: up to **3 per row**.
- **Non-inline** fields (default) occupy the full width.
- The index allows inserting a field at a precise position (0 = very beginning).

## Examples

### Full-width fields (non-inline)

```bdfd
$title[User Profile]
$description[Detailed Information]
$addField[Username;$username]
$addField[ID;$authorID]
$addField[Creation Date;$creationDate[$authorID]]
$color[#5865F2]
$sendMessage[]
```

### Inline fields (3 per row)

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
$title[Server Info]
$description[Information about the server]
$addField[Name;$serverName]
$addField[Members;$membersCount;yes]
$addField[Channels;$channelCount;yes]
$addField[Server ID;$guildID;yes]
$addField[Description;A great community server!]
$color[#5865F2]
$sendMessage[]
```

### Insertion at a specific position

```bdfd
$addField[First;Content 1]
$addField[Third;Content 3]
$addField[Second;Content 2;no;1]

$title[Field Order]
$description[Field 2 has been inserted at position 1.]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Both the name and value support Discord markdown.
- Combine inline and non-inline fields for complex layouts.
- Index 0 corresponds to the beginning (before all other fields).
- If the index exceeds the number of existing fields, the field is added to the end.

