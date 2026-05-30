---
title: "Building Interactive Buttons and Select Menus in BDFD"
description: Harness the power of Discord's rich UI components. Learn to construct clickable buttons and dropdown select menus inside BDFD commands.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-components-guide
locale: en
content_language: en
layout: post
category: Components
toc: true
function_syntax: $addButton[newRow;customID;label;style;disabled;emoji]
---

Standard message text is great, but modern Discord bots are built on **Rich Interactions**. Adding visual **Buttons** and **Dropdown Select Menus** turns your bot into a highly interactive application, removing the need for users to type complex, error-prone parameters.

In this guide, we will learn how to attach functional buttons and select menus to your bot responses using Bot Designer for Discord (BDFD) / Bot Creator.

---

## 🔘 Attaching Clickable Buttons (`$addButton`)

Buttons are interactive attachments that appear at the bottom of any message or embed. BDFD lets you add up to 25 buttons per message (split across 5 rows of 5 buttons each):

```bdfd
$addButton[newRow;customIDOrURL;label;style;disabled;emoji]
```
* **`newRow`**: (`yes` or `no`). Set to `yes` to force this button onto a brand new row.
* **`customIDOrURL`**: The unique identifier for this button (e.g. `btn_verify`), or a web URL if utilizing the link style.
* **`label`**: The text displayed directly on the button.
* **`style`**: The color theme of the button:
  * `primary` (Blurple)
  * `secondary` (Grey)
  * `success` (Green)
  * `danger` (Red)
  * `link` (Grey with redirect icon, requires a URL instead of customID)
* **`disabled`**: (`yes` or `no`). Set to `yes` to make the button unclickable.
* **`emoji`**: (Optional) The name or ID of a custom emoji to render beside the label.

---

## 🔽 Constructing Dropdown Menus (`$addSelectMenu`)

Select menus let users pick an option from a sleek, scrollable list. A single menu can contain up to 25 choices:

### Step 1: Initialize the Menu
```bdfd
$addSelectMenu[customID;placeholder;minValues;maxValues;disabled]
```
* **`customID`**: Unique identifier for this menu block.
* **`placeholder`**: The grey helper text shown when nothing is selected.
* **`minValues` / `maxValues`**: The minimum and maximum options a user must pick. Set both to `1` for standard single-choice menus.

### Step 2: Populate the Choices
Immediately after initializing the menu, add options using `$addSelectMenuOption`:
```bdfd
$addSelectMenuOption[menuID;label;value;description;default;emoji]
```

---

## 🛠️ Handling Interactions: The Event Workflow

When a user clicks a button or selects an option, Discord triggers an **Interaction Event**. To process these clicks:

1. Create a command dedicated to handling the unique `customID` of your components.
2. In Bot Creator, the event dispatcher maps component actions to the `interactionCreate` event.
3. Access values using context variables like `((interaction.customId))` or `((interaction.stringSelect.value))`.

---

## 🏆 Production Example: Role Self-Assign Menu

Let's build a clean, fully functional self-role assignment embed. Users can click buttons to assign themselves roles without typing any commands!

### Initial Command: `!roles`
Spawns the menu with buttons.

```bdfd
$nomention
$title[🎭 Select Your Roles!]
$color[#6366f1]
$description[
Click the buttons below to assign or remove roles instantly:

* 💻 **Developer Role**
* 🎨 **Designer Role**
]

$addButton[no;role_dev;Developer;primary;no;💻]
$addButton[no;role_design;Designer;success;no;🎨]
```

### The Interaction Handler Command
* **Trigger Type**: Set trigger matching the custom IDs (`role_dev` and `role_design`).
* **Code**:

```bdfd
$nomention
$if[((interaction.customId))==role_dev]
  $giveRole[((interaction.userId));112233445566778899]
  $sendResponse[✅ The **Developer** role has been added to your profile! // ephemeral]
$endif

$if[((interaction.customId))==role_design]
  $giveRole[((interaction.userId));998877665544332211]
  $sendResponse[✅ The **Designer** role has been added to your profile! // ephemeral]
$endif
```

> [!IMPORTANT]
> Always mark interaction responses as `ephemeral` (using `// ephemeral` comments or settings) when you want the success message to be private, visible only to the clicking user. This prevents channel clutter!
