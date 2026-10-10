---
layout: doc
title: $addFile[]
translation_key: docs
category: "Embed & Message"
function_name: addFile
syntax: $addFile[url;(spoiler)]
description: Adds a file component (Components V2) to the message being built.
---

# $addFile[] — File Component

`$addFile[]` adds a **file component** to the message being built. The component points to the given URL; Discord displays it in the message.

## Syntax

```
$addFile[url;(spoiler)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `url` | Yes | — | URL of the file. The engine does not check or download it, it is passed as is to the component. |
| `spoiler` | No | `no` | `yes`/`true` to mark the file as a spoiler, `no`/`false` otherwise. An empty value means `no`; any other value is an error (`Expected yes or no, got "..."`). |

## Return value

None (empty string). The file component is added to the components of the pending message.

## Components V2 message

A file is a *rich* (Components V2) component. When the message contains one, it is sent as a Components V2 message, which **cannot carry text content or embeds**: the text of the message and the embeds are not sent. Put any text in a `$addTextDisplay[]` component instead.

## Examples

### Attaching a file

```bdfd
$addTextDisplay[Here is the requested chart]
$addFile[https://cdn.example.com/chart.png]
```

### Spoiler file

```bdfd
$addTextDisplay[Warning: ending spoiler!]
$addFile[https://cdn.example.com/spoiler_endgame.png;yes]
```

### Multiple files

```bdfd
$addTextDisplay[Configuration files]
$addFile[https://files.example.com/logs.txt]
$addFile[https://files.example.com/config.json]
```

## Notes

- Multiple `$addFile[]` calls can be used in the same message.
- Do not confuse this with `$addModalFileUpload[]`, which is for interactive modals.
- `$addFile[]` ends the section opened by a previous `$addSection`: following components are not added to it.
