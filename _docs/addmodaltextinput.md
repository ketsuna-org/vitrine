
---

# $addModalTextInput[] — Modal Text Input

`$addModalTextInput[]` adds a text input field to the modal being built with `$newModal[]`. The input is wrapped in a label with an optional description.

## Syntax

```text
$addModalTextInput[label;description;customId;(style);(minLength);(maxLength);(required);(default);(placeholder)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `label` | Yes | — | Label text above the field. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`), in which case no description is sent. |
| `customId` | Yes | — | Identifier used to retrieve the value after submission. |
| `style` | No | `short` | `paragraph` gives a multi-line field; an empty value, `short` or any other value gives a single-line field. |
| `minLength` | No | `0` | Minimum number of characters (integer from 0 to 4000, otherwise `Expected an integer from 0 to 4000.`). |
| `maxLength` | No | `4000` | Maximum number of characters (integer from 1 to 4000, otherwise `Expected an integer from 1 to 4000.`). |
| `required` | No | `yes` | `yes`/`true` or `no`/`false` (empty gives `yes`). |
| `default` | No | empty | Pre-filled value. |
| `placeholder` | No | empty | Placeholder text. |

## Return value

Returns an empty string. The input is added to the current modal; its value is read with `$input[customId]` once the modal is submitted.

## Behavior

- The component is added to the modal being built with `$newModal[]`. Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`), and a `$newModal[]` called after that fails with `A modal is already being built.`: always call `$newModal[]` first.
- A boolean argument other than `yes`/`true`/`no`/`false` is an error (`Expected yes or no, got "<value>".`). An integer out of range is an error too.
- The engine does not check the length of the label, description or placeholder when the function runs.
- The modal is sent when the script ends. It must hold 1 to 5 components (`A modal requires 1 to 5 inputs.`; `$addModalTextDisplay[]` counts too), and the script must not also produce text, embeds or component rows (`A modal cannot be combined with a message response.`). It can only answer a slash-command or component interaction that has not been answered yet.
- When the modal is submitted, the values are read with `$input[customId]` and the modal ID with `$customID`.

## Examples

### Required short field

```bdfd
$newModal[contact_form;Contact]
$addModalTextInput[Full name;;name;short;2;50;yes;;John Doe]
$addModalTextInput[Email address;;email;short;5;100;yes;;contact@site.com]
```

### Free text area

```bdfd
$newModal[feedback_form;Feedback]
$addModalTextInput[Your comments;Tell us what you think;comments;paragraph;10;1000;yes;;Write your message here...]
```

### Optional field with placeholder

```bdfd
$newModal[profile_form;Profile]
$addModalTextInput[Website;;website;short;0;200;no;;https://...]
```

## Notes

- `$newModal[]` takes the modal ID first, then its title.
- A modal sent to Discord must contain 1 to 5 components.
