---
layout: doc
title: AI Copilot
category: "Meta"
api_type: general
description: What the Bot Creator AI Copilot can read and change on your bot, how you stay in control of every action, and how AI credits are counted.
permalink: /docs/ai-copilot/
locale: en
translation_key: doc-ai-copilot
---

The AI Copilot is an assistant built into the Bot Creator app. You describe what you want in plain words, and it looks at your bot, writes or fixes commands and workflows, and prepares the changes for you. It never changes anything without your approval.

## Where to find it

Open it from the home screen, from a bot card, from the bot page or from the bot editor navigation. A conversation can be global or tied to one bot. In a bot conversation, the Copilot can only act on that bot.

Conversations belong to your account. They are stored on the Manager, synced across your devices and kept until you delete them. Other collaborators and administrators cannot read your personal conversations. You can search them by title, rename, archive, export them as Markdown and delete them.

The Copilot is not available in the Steam build of the app.

## What it can do

- **Check a bot.** Read its settings, commands, workflows, variables and recent errors, then explain what is wrong.
- **Create and edit commands.** Write a command as a BDFD script (or in JavaScript on a JavaScript bot), validate it, then save it. It can also patch an existing command instead of rewriting it.
- **Create workflows.** Build event workflows and scheduled workflows, including a repeat interval or a cron schedule on JavaScript bots.
- **Change bot settings.** Status, nickname, avatar and text-command prefix.
- **Start and stop a bot**, and restore an earlier version of a command or workflow.
- **Explain a feature.** It looks up the official documentation and the function reference before answering, so its examples use real functions.

Before it writes anything, the Copilot plans the command, uses only functions that exist, and validates the script. If validation fails, it fixes the errors and tries again.

## You stay in control

Every tool call appears as a card in the conversation: reading, waiting for validation, running, done, refused, or not confirmed. Anything that changes your bot (saving, deleting, starting, stopping) needs your approval for that exact action. If you refuse, nothing is changed.

- An approved action is never run twice. Reopening a conversation does not replay anything.
- If the app or the server stops during an action, the result may stay "not confirmed". Check the bot, then close the step yourself.
- If the Copilot repeats the same calls with the same results three times in a row, the loop is stopped.
- Very long conversations offer a summary that you confirm. Your visible history stays as it is.

## AI credits

The Copilot uses AI credits. **1 credit equals 1,000 tokens.** Input tokens that are not served from the cache and output tokens are counted; cached tokens are free. The cost depends on what you ask, so there is no fixed price per command.

Before each request the server reserves a safe budget, then releases the unused part once the real usage is known. If your balance is not enough, the request is refused. Your current balance is shown in the app.

## Privacy

Your messages and the context needed to answer (bot configuration, commands, tool results) are sent to the AI provider used by Bot Creator. Credentials such as Discord tokens, API keys and webhook URLs, and email addresses, are masked before sending, but other personal data is not recognized automatically: do not paste tokens or personal data about other people into a conversation. The Copilot asks for your consent before its first use. The full details are in the [privacy policy]({{ '/privacy-policy/' | relative_url }}).

## Good to know

- The Copilot can be wrong. Read what it proposes, especially before approving a change on a bot that is running for a community.
- It follows the same rules as the rest of the app: it cannot reach bots outside your account or the bot of the conversation.
- To learn the building blocks it uses, see [Getting started]({{ '/docs/getting-started/' | relative_url }}) and the [BDFD function reference]({{ '/docs/' | relative_url }}).
