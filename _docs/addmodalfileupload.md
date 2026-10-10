
---

# $addModalFileUpload[] — Modal File Upload

`$addModalFileUpload[]` adds a file upload component to the modal being built with `$newModal[]`.

## Syntax

```text
$addModalFileUpload[label;description;customId;(minFiles);(maxFiles);(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `label` | Yes | — | Text displayed above the field. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`). |
| `customId` | Yes | — | Identifier of the field. |
| `minFiles` | No | `1` | Minimum number of files (integer from 0 to 10, otherwise `Expected an integer from 0 to 10.`). |
| `maxFiles` | No | `1` | Maximum number of files (integer from 1 to 10, otherwise `Expected an integer from 1 to 10.`). |
| `required` | No | `yes` | `yes`/`true` or `no`/`false` (empty gives `yes`). |

## Return value

Returns an empty string. The component is added to the current modal. After submission, `$input[customId]` returns the IDs of the uploaded files joined by commas (the SDK exposes them as a list of IDs).

## Behavior

- The component is added to the modal being built with `$newModal[]`. Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`), and a `$newModal[]` called after that fails with `A modal is already being built.`: always call `$newModal[]` first.
- A boolean argument other than `yes`/`true`/`no`/`false` is an error (`Expected yes or no, got "<value>".`). An integer out of range is an error too.
- The engine does not check the length of the label, description or placeholder when the function runs.
- The modal is sent when the script ends. It must hold 1 to 5 components (`A modal requires 1 to 5 inputs.`; `$addModalTextDisplay[]` counts too), and the script must not also produce text, embeds or component rows (`A modal cannot be combined with a message response.`). It can only answer a slash-command or component interaction that has not been answered yet.
- When the modal is submitted, the values are read with `$input[customId]` and the modal ID with `$customID`.

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
- This component is only used in modals.
