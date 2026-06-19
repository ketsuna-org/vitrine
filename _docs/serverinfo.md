---
layout: doc
title: $serverInfo[]
translation_key: docs
category: "Entity Info"
function_name: serverInfo
syntax: $serverInfo[property]
description: Returns a specific property of the server object (or the entire object without arguments). Allows dynamic access to server information.
---

# $serverInfo[] — Server Information

`$serverInfo[]` is a versatile function that allows you to access server information. Without arguments, it returns the complete raw server object; with a property name, it returns that specific value.

## Syntax

```
$serverInfo
$serverInfo[property]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `property` | No | — | Name of the property to retrieve. |

## Properties Available

| Property | Description | Equivalent |
|-----------|-------------|------------|
| `name` | Name of the server | `$serverName` |
| `id` | ID of the server | `$serverID` |
| `icon` | URL of the icon | `$serverIcon` |
| `ownerID` | ID of the owner | `$serverOwner` |
| `description` | Description of the server | `$serverDescription` |
| `region` | Region of the server | `$serverRegion` |
| `verificationLevel` | Verification level | `$serverVerificationLevel` |
| `memberCount` | Number of members | `$membersCount` |
| `boostCount` | Number of boosts | `$serverBoostCount` |
| `boostLevel` | Boost level | `$boostLevel` |
| `emojiCount` | Number of emojis | `$emojiCount` |
| `banner` | URL of the banner | `$serverBanner` |
| `vanityURL` | Custom invite URL code | `$serverVanityURL` |

## Usage

### Retrieve a property

```bdfd
$sendMessage[Server Name: **$serverInfo[name]**]
$sendMessage[Owner: <@$serverInfo[ownerID]>]
```

### Retrieve all information

```bdfd
$title[Complete Server Information]
$description[Raw server data]
$addField[Server Object;$serverInfo;no]
$color[#5865F2]
$sendEmbedMessage
```

### Dynamic usage

```bdfd
$var[prop;$message[1]]
$if[$var[prop]!=]
  $sendMessage[$serverInfo[$var[prop]]]
$else
  $sendMessage[Usage: !serverinfo <property>]
$endif
```

### Summary Embed

```bdfd
$title[$serverInfo[name]]
$description[$serverInfo[description]]
$addField[🆔 ID;$serverInfo[id];yes]
$addField[👑 Owner;<@$serverInfo[ownerID]>;yes]
$addField[👥 Members;$serverInfo[memberCount];yes]
$addField[🚀 Boosts;$serverInfo[boostCount] (Lvl. $serverInfo[boostLevel]);yes]
$addField[🎨 Emojis;$serverInfo[emojiCount];yes]
$addField[🔒 Verification;$serverInfo[verificationLevel];yes]
$thumbnail[$serverInfo[icon]]
$image[$serverInfo[banner]]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- `$serverInfo[]` without arguments returns a raw JSON object — useful for debugging or logging.
- Property names are case-sensitive (camelCase).
- Prefer dedicated functions (`$serverName`, `$serverID`, etc.) for simple usage — `$serverInfo[]` is best for dynamic access.
- Not all properties are always available (e.g. `banner` if the boost level is insufficient).
