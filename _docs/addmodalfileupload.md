---
layout: doc
title: $addModalFileUpload[]
translation_key: docs
category: "Embed & Message"
function_name: addModalFileUpload
syntax: $addModalFileUpload[customId;label;(required)]
description: Adds a file upload component to a Discord modal. Allows the user to attach a file directly from the modal.
---

# $addModalFileUpload[] — Modal File Upload

`$addModalFileUpload[]` adds a component allowing the user to attach a file directly from a Discord modal. The uploaded file is then accessible in the interaction handler.

## Syntax

```
$addModalFileUpload[customId;label;(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier for the file field. |
| `label` | Yes | — | Text displayed above the field. |
| `required` | No | `yes` | `yes` if required, `no` otherwise. |

## Return value

Adds the upload component to the modal. The URL and metadata of the file are accessible via `$input[customId]` after submission.

## Usage

### Upload required

```bdfd
$newModal[Application;apply_modal]
$addModalTextDisplay[Please attach your CV in PDF format.]
$addModalTextInput[motivation;Cover letter;paragraph;;;yes;50;1000]
$addModalFileUpload[cv;Your CV (PDF);yes]
```

### Optional upload with other fields

```bdfd
$newModal[Report;report_modal]
$addModalTextInput[description;Description of the problem;paragraph;;;yes;20;1000]
$addModalFileUpload[screenshot;Screenshot (optional);no]
```

### Processing the file

```bdfd
$onInteraction[apply_submit]
$var[cv_url;$input[cv]]
$var[motivation;$input[motivation]]
$sendMessage[New application received!
CV: $var[cv_url]
Motivation: $var[motivation]]
$endInteraction
```

## Notes

- The file is temporarily hosted by Discord; the returned URL is a Discord CDN URL.
- The `customId` must be unique within the modal.
- The maximum size of the file is determined by Discord (usually 25 MB depending on the server's boost level).
- This component is only available in modals (not in regular messages).

