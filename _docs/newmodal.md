
---

# $newModal[] — Create a Modal

`$newModal[]` starts a modal (a pop-up form) that the bot will open as the response to an interaction. The components are then added with the `$addModal*` functions.

## Syntax

```text
$newModal[customId;title]
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `customId` | Custom ID of the modal (1 to 100 characters, otherwise `Modal ID must contain 1 to 100 characters.`). Read with `$customID` when the modal is submitted. Required. |
| `title` | Title displayed at the top of the modal (1 to 45 characters, otherwise `Modal title must contain 1 to 45 characters.`). Required. |

The **first** argument is the ID and the second is the title.

## Return Value

Returns an empty string. It creates the modal that the `$addModal*` functions fill.

## Behavior

- Only one modal can be built per script: a second `$newModal[]` (or a `$newModal[]` after an `$addModal*` function created the default modal) fails with `A modal is already being built.`
- It fails with `Modal must be the first interaction response.` if the interaction was already answered.
- The modal is sent when the script ends. It must hold 1 to 5 components (`A modal requires 1 to 5 inputs.`), and the script must not also produce text, embeds or component rows (`A modal cannot be combined with a message response.`).
- It can only answer a slash-command or component interaction that has not been answered yet (`A modal requires an unacknowledged interaction.`, `This interaction cannot open a modal.`). When a script contains `$newModal`, `$callWorkflow`, `$eval` or `$funcCall`, the engine does not automatically acknowledge the interaction before running it.

## Examples

### Basic Modal

```bdfd
$newModal[signup_modal;Registration]
$addModalTextInput[Username;;username;short;3;32;yes;;Enter your username]
$addModalTextInput[Email;;email;short;5;100;yes;;example@email.com]
```

### Modal with display text

```bdfd
$newModal[confirm_modal;Confirmation]
$addModalTextDisplay[Please check the information before confirming.]
$addModalTextInput[Verification code;;code;short;4;4;yes]
```

### Reading the submission

```bdfd
$if[$customID==signup_modal]
  Welcome $input[username]
$endif
```

## Notes

- The components available in a modal are `$addModalTextInput`, `$addModalTextDisplay`, `$addModalSelect`, `$addModalFileUpload`, `$addModalRadioGroup`, `$addModalCheckboxGroup` and `$addModalCheckbox`.
