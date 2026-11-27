---
layout: doc
title: $NQlookup[]
translation_key: docs
category: "Image & Canvas"
function_name: NQlookup
syntax: $NQlookup[name;idx]
description: "Returns the color [r, g, b, a] at an index of the color map."
---
# $NQlookup — Returns the color [r, g, b, a] at an index of the color map.

## Syntax

```
$NQlookup[name;idx]
```

## Parameters

- **name** *(String, required)* — Instance name
- **idx** *(Number, required)* — Index

## Return Value

- Json.

## Usage

```
$NQlookup[name;idx] → result
```

## Example

```bdfd
$sendMessage[$NQlookup[name;idx]]
```
