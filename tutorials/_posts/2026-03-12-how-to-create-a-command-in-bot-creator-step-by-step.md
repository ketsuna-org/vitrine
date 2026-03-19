---
title: How to Create a Command in Bot Creator (Step-by-Step)
description: Learn how to create a clean, reliable slash command in Bot Creator, from basic setup to advanced response workflows and actions.
date: 2026-03-12T22:12:00.000+01:00
author: Garder500
layout: post
toc: true
locale: en
translation_key: guide-create-command
content_language: en
categories: [commands, workflow]
---
If you want your bot to feel professional, every command should be clear, predictable, and easy to maintain.
This guide shows you exactly how to build a command in Bot Creator.

## 1. Open the Command Builder
1. Go to **Commands**.
2. Click **Create command**.

## 2. Fill in Command Info
1. Set the **Name**.
2. Set the **Description**.
3. Choose where the command can be installed:
- **Guild Install**
- **User Install**
4. Choose command **Contexts**:
- **Guild**
- **Bot DM**
- **Group DM / Other**
5. Optional: set **Default Member Permissions**.

### Name Rules
- Max 32 characters
- No spaces
- Letters, numbers, and underscores only
- Do not start with special characters like `_`, `!`, `/`, `#`, `@`, `&`, `%`

## 3. Configure the Command Reply
Choose one response type:
- **Normal Reply**
- **Component V2**
- **Modal Form**

For text replies, use variables like:
- `((userName))`
- `((commandName))`
- `((opts.yourOptionName))`

Open **Configure Response Workflow** if you want:
- Public vs Ephemeral response
- Auto-defer while actions run
- Conditional THEN and ELSE responses

## 4. Add Command Options
In **Command Options**, click **Add Option** and configure:
- Name
- Description
- Type: String, Integer, Boolean, User, Channel, Role, Mentionable, Number, or Attachment
- Required or optional
- Choices, if applicable

Keep options focused. Only add parameters users actually need.

## 5. Add Runtime Actions
In **Actions**, click **Build Actions** to define what happens after the command is triggered.

You can also:
- Save actions as a reusable workflow
- Reuse global variables
- Link command behavior with workflow logic

## 6. Save and Test
1. Click **Create command**.
2. Go to Discord and run `/your_command_name`.
3. Verify:
- Reply content
- Variables resolution
- Option values
- Visibility: public or ephemeral
- Action execution

## Best Practices
- Use short, readable command names.
- Write user-facing descriptions, not technical notes.
- Keep the first version minimal, then iterate.
- Prefer reusable workflows for repeated logic.
- Test in both Guild and DM contexts when relevant.

## Common Errors
- "Please fill all fields": Name or description is missing.
- Command does not appear: check install type, context, and bot permissions.
- Variables are not replaced: confirm syntax is exactly `((variableName))`.
- Wrong action result: test actions step-by-step in the builder.
