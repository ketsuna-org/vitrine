
---

# $addModalCheckbox[] — Modal Checkbox

`$addModalCheckbox[]` adds a single checkbox to the modal being built with `$newModal[]`. Unlike `$addModalCheckboxGroup[]`, which creates a group of options, this function creates one isolated checkbox.

## Syntax

```text
$addModalCheckbox[label;description;customId;(default)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `label` | Yes | — | Text of the checkbox. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`). |
| `customId` | Yes | — | Identifier used to retrieve the state. |
| `default` | No | `no` | `yes`/`true` if checked by default, `no`/`false` otherwise (empty gives `no`). |

## Return value

Returns an empty string. The checkbox is added to the current modal. After submission, `$input[customId]` returns the boolean state sent by the SDK as text (expected `true` or `false`; not run against Discord).

## Behavior

- The component is added to the modal being built with `$newModal[]`. Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`), and a `$newModal[]` called after that fails with `A modal is already being built.`: always call `$newModal[]` first.
- A boolean argument other than `yes`/`true`/`no`/`false` is an error (`Expected yes or no, got "<value>".`).
- The engine does not check the length of the label, description or placeholder when the function runs.
- The modal is sent when the script ends. It must hold 1 to 5 components (`A modal requires 1 to 5 inputs.`; `$addModalTextDisplay[]` counts too), and the script must not also produce text, embeds or component rows (`A modal cannot be combined with a message response.`). It can only answer a slash-command or component interaction that has not been answered yet.
- When the modal is submitted, the values are read with `$input[customId]` and the modal ID with `$customID`.

## Examples

### Simple checkbox

```bdfd
$newModal[register_modal;Registration]
$addModalTextInput[Name;;name;short;2;50;yes]
$addModalCheckbox[Subscribe to newsletter;;newsletter;yes]
$addModalCheckbox[Accept Terms of Service;;tos;no]
```

## Notes

- For groups of checkboxes with multiple options, use `$addModalCheckboxGroup[]` and `$addCheckboxGroupOption[]`.
- An individual checkbox counts towards the limit of 5 components per modal.
- `$newModal[]` takes the modal ID first, then its title.
