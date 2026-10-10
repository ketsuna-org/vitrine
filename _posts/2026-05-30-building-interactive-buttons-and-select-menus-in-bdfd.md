---
title: "Building Interactive Buttons and Select Menus in BDFD"
description: Harness the power of Discord's rich UI components. Learn to construct clickable buttons and dropdown select menus inside BDFD commands.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-components-guide
locale: en
content_language: en
layout: post
category: "Building Commands"
toc: true
function_syntax: $addButton[newRow;customID;label;style;(disabled);(emoji);(messageID)]
---

Standard message text is great, but modern Discord bots are built on **Rich Interactions**. Adding visual **Buttons** and **Dropdown Select Menus** turns your bot into a highly interactive application, removing the need for users to type complex, error-prone parameters.

In this guide, we will learn how to attach functional buttons and select menus to your bot responses using Bot Designer for Discord (BDFD) / Bot Creator.

---

## 🔘 Attaching Clickable Buttons (`$addButton`)

Buttons are interactive attachments that appear at the bottom of any message or embed. A message holds up to 5 rows of 5 buttons (25 buttons at most); a select menu takes a whole row to itself:

```bdfd
$addButton[newRow;customIDOrURL;label;style;(disabled);(emoji);(messageID)]
```
* **`newRow`**: (`yes` or `no`, also `true`/`false`). Set to `yes` to put this button on a brand new row. With `no`, the button joins the last row if that row only holds buttons and has fewer than 5 of them; otherwise a new row is started.
* **`customIDOrURL`**: The unique identifier for this button (e.g. `btn_verify`, at most 100 characters; two components cannot share the same ID), or an `http(s)` URL when using the `link` style.
* **`label`**: The text displayed directly on the button (at most 80 characters). It may be empty only if you give an emoji.
* **`style`**: **Required.** One of (lowercase): 
  * `primary` (Blurple)
  * `secondary` (Grey)
  * `success` (Green)
  * `danger` (Red)
  * `link` (Grey with redirect icon, requires an `http(s)` URL instead of a custom ID)
* **`disabled`**: (Optional, `yes` or `no`, default `no`). Set to `yes` to make the button unclickable.
* **`emoji`**: (Optional) A Unicode emoji (like `💻`) or a custom emoji written as `<:name:id>` (`<a:name:id>` for an animated one).
* **`messageID`**: (Optional) The ID of an existing message to add the button to, instead of the response being built.

---

## 🔽 Constructing Dropdown Menus (`$newSelectMenu`)

Select menus let users pick one or more options from a list. A single menu can contain up to 25 choices. BDFD does not have an `$addSelectMenu` function: you create the menu with `$newSelectMenu`, then fill it with `$addSelectMenuOption`.

### Step 1: Initialize the Menu
```bdfd
$newSelectMenu[customID;minValues;maxValues;(placeholder);(messageID)]
```
* **`customID`**: Unique identifier for this menu block (at most 100 characters).
* **`minValues` / `maxValues`**: The minimum (0 to 25) and maximum (1 to 25) options a user must pick; the minimum cannot exceed the maximum. Set both to `1` for standard single-choice menus.
* **`placeholder`**: (Optional) The grey helper text shown when nothing is selected (at most 150 characters).
* **`messageID`**: (Optional) The ID of an existing message to add the menu to.

### Step 2: Populate the Choices
Immediately after initializing the menu, add options using `$addSelectMenuOption`:
```bdfd
$addSelectMenuOption[menuID;label;value;description;(default);(emoji);(messageID)]
```
* **`menuID`**: The `customID` of the menu to fill.
* **`label` / `value`**: The text shown to the user and the value you receive when it is picked (1 to 100 characters each). Values must be unique inside a menu.
* **`description`**: Required argument, but it may be empty (up to 100 characters).
* **`default`**: (Optional, `yes` or `no`, default `no`). Only one option of a menu can be the default.
* **`emoji`**: (Optional) Same format as for buttons.

```bdfd
$newSelectMenu[colour_menu;1;1;Pick a colour]
$addSelectMenuOption[colour_menu;Red;red;The red option]
$addSelectMenuOption[colour_menu;Blue;blue;The blue option;yes]
```

---

## 🛠️ Handling Interactions: The Event Workflow

When a user clicks a button or selects an option, Discord triggers an **Interaction Event**. To process these clicks:

1. Give every component a unique `customID`.
2. In Bot Creator, a click that has no dedicated listener is handled by your `interactionCreate` event.
3. In that event, read the context variables like `((interaction.customId))` or `((interaction.stringSelect.value))` to know what was clicked or chosen.

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
Click the buttons below to assign roles instantly:

* 💻 **Developer Role**
* 🎨 **Designer Role**
]

$addButton[no;role_dev;Developer;primary;no;💻]
$addButton[no;role_design;Designer;success;no;🎨]
```

### The Interaction Handler Command
* **Trigger**: the `interactionCreate` event; the code tells the buttons apart with their custom IDs (`role_dev` and `role_design`).
* **Code**:

```bdfd
$nomention
$if[((interaction.customId))==role_dev]
  $giveRole[((interaction.userId));112233445566778899]
  $ephemeral
  ✅ The **Developer** role has been added to your profile!
$endif

$if[((interaction.customId))==role_design]
  $giveRole[((interaction.userId));998877665544332211]
  $ephemeral
  ✅ The **Designer** role has been added to your profile!
$endif
```

> [!IMPORTANT]
> Use [$ephemeral](/docs/ephemeral/) at the start of your interaction callback to make the success message private, visible only to the clicking user. This keeps public channels clean!
