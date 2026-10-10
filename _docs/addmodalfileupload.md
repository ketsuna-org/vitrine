---
layout: doc
title: $addModalFileUpload[]
translation_key: docs
category: "Components & Interactions"
function_name: addModalFileUpload
syntax: $addModalFileUpload[label;description;customId;(minFiles);(maxFiles);(required)]
description: Adds a file upload component (Components V2) to the modal being built.
---

# $addModalFileUpload[] — Modal File Upload

`$addModalFileUpload[]` adds a file upload component to the modal being built with `$newModal[]`.

## Syntax

```
$addModalFileUpload[label;description;customId;(minFiles);(maxFiles);(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `label` | Yes | — | Text displayed above the field. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`). |
| `customId` | Yes | — | Identifier of the field. |
| `minFiles` | No | `1` | Minimum number of files (integer from 0 to 10). |
| `maxFiles` | No | `1` | Maximum number of files (integer from 1 to 10). |
| `required` | No | `yes` | `yes`/`true` or `no`/`false`. |

## Return value

Returns an empty string. The component is added to the current modal.

## Errors

- Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`) to receive the input.
- `required`/`disabled` values other than yes/no/true/false and out-of-range numbers are errors.
- When the modal is sent, it must contain 1 to 5 inputs (text displays count as inputs).

## Examples

### Upload required

```bdfd
$newModal[apply_modal;Application]
$addModalTextDisplay[Please attach your CV in PDF format.]
$addModalTextInput[Cover letter;;motivation;paragraph;50;1000;yes]
$addModalFileUpload[Your CV (PDF);;cv;1;1;yes]
```

### Optional upload with other fields

```bdfd
$newModal[report_modal;Report]
$addModalTextInput[Description of the problem;;description;paragraph;20;1000;yes]
$addModalFileUpload[Screenshot (optional);;screenshot;0;1;no]
```

## Notes

- `$newModal[]` takes the modal ID first, then its title.
- This component is only available in modals (not in regular messages).
