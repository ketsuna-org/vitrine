---
layout: doc
title: $addFileUpload[]
translation_key: docs
category: "Components & Interactions"
function_name: addFileUpload
syntax: $addFileUpload[customID;(minvalues);(maxvalues);(required)]
description: "Adds a new file upload component to the newest modal label"
---
# $addFileUpload — Adds a new file upload component to the newest modal label

## Syntax

```
$addFileUpload[customID;(minvalues);(maxvalues);(required)]
```

## Parameters

- **customID** *(id, required)* — The custom id for this field
- **minvalues** *(number, optional)* — The min values of file uploads
- **maxvalues** *(number, optional)* — The max values of file uploads
- **required** *(boolean, optional)* — Whether this field is required

## Return Value

- String.

## Usage

```
$addFileUpload[customID;(minvalues);(maxvalues);(required)] → result
```

## Example

```bdfd
$newModal[form;Profile]$addLabel[Files;Send;$addFileUpload[files;1;3;false]]
```
