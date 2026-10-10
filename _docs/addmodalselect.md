
---

# $addModalSelect[] — Modal Select Menu

`$addModalSelect[]` adds a select menu to the modal being built with `$newModal[]`. For a `string` menu, options are added afterwards with `$addSelectMenuOption[]`.

## Syntax

```text
$addModalSelect[type;label;description;customId;(placeholder);(minValues);(maxValues);(required);(disabled)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `type` | Yes | — | Menu type: `string`, `user`, `role`, `mentionable`, `channel`, `category` or `voice`. Any other value is sent as a `string` menu. |
| `label` | Yes | — | Text displayed above the menu. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`). |
| `customId` | Yes | — | Identifier of the menu; also used as the first argument of `$addSelectMenuOption[]`. |
| `placeholder` | No | empty | Placeholder text. |
| `minValues` | No | `1` | Minimum number of selections (integer from 0 to 25, otherwise `Expected an integer from 0 to 25.`). |
| `maxValues` | No | `1` | Maximum number of selections (integer from 1 to 25, otherwise `Expected an integer from 1 to 25.`). |
| `required` | No | `yes` | `yes`/`true` or `no`/`false` (empty gives `yes`). |
| `disabled` | No | `no` | `yes`/`true` or `no`/`false` (empty gives `no`). |

## Return value

Returns an empty string. The menu is added to the current modal; the selected values are read with `$input[customId]` (several values are joined by commas).

## Behavior

- The component is added to the modal being built with `$newModal[]`. Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`), and a `$newModal[]` called after that fails with `A modal is already being built.`: always call `$newModal[]` first.
- A boolean argument other than `yes`/`true`/`no`/`false` is an error (`Expected yes or no, got "<value>".`). An integer out of range is an error too.
- The engine does not check the length of the label, description or placeholder when the function runs.
- The modal is sent when the script ends. It must hold 1 to 5 components (`A modal requires 1 to 5 inputs.`; `$addModalTextDisplay[]` counts too), and the script must not also produce text, embeds or component rows (`A modal cannot be combined with a message response.`). It can only answer a slash-command or component interaction that has not been answered yet.
- When the modal is submitted, the values are read with `$input[customId]` and the modal ID with `$customID`.

## Examples

### Dropdown menu with options

```bdfd
$newModal[pref_modal;Preferences]
$addModalSelect[string;Language;;language;Choose your language...;1;1;yes]
$addSelectMenuOption[language;French;fr;French language]
$addSelectMenuOption[language;English;en;English language]
$addSelectMenuOption[language;Spanish;es;Spanish language]
```

### Optional menu

```bdfd
$newModal[survey_modal;Survey]
$addModalTextDisplay[Bonus question (optional):]
$addModalSelect[string;Operating system;;os;Select your OS;1;1;no]
$addSelectMenuOption[os;Windows;win;]
$addSelectMenuOption[os;macOS;mac;]
$addSelectMenuOption[os;Linux;linux;]
```

## Notes

- `$addSelectMenuOption[]` needs at least 4 arguments (`menuId;label;value;description`, the description may be empty); the first one is the `customId` of the menu.
- Only menus declared with the type `string` accept options (otherwise `Only string selects take options.`); a menu of another type is a user, role, mentionable, channel, category or voice picker.
- A `string` menu without any option is sent with a single placeholder option (label `Empty`, value `empty`).
- A select menu supports at most 25 options.
- `$newModal[]` takes the modal ID first, then its title.
