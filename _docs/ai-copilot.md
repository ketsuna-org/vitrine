---
layout: doc
title: AI Copilot
category: "Meta"
api_type: general
description: What the Bot Creator AI Copilot can read and change on your bot, what it can do on your Discord server, how to use it from your own AI, how you stay in control of every action, and how AI credits are counted.
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
- **Run your Discord server.** Organize channels, post rules and announcements, manage roles and settings, and moderate members (see [Manage your Discord server](#discord-server)).
- **Work from your own AI.** Connect Claude, ChatGPT or Cursor to your bots (see [Use it from your own AI](#user-mcp)).

Before it writes anything, the Copilot plans the command, uses only functions that exist, and validates the script. If validation fails, it fixes the errors and tries again.

## Manage your Discord server {#discord-server}

Beyond commands, the Copilot can help you run the Discord server itself. These server tools are rolling out and may not be available in every version of the app yet. They work on servers where your bot is present, and only for people who are allowed to manage the server (owner, Administrator or Manage Server). The bot must also have the matching permissions in Discord.

| What | What the Copilot does |
|------|-----------------------|
| Channels and categories | Create, rename, move and organize them. It can propose a whole server layout, shows you a preview, and only applies it after you confirm. It creates and never deletes in that step. |
| Undo a layout | A layout it applied can be undone within 14 days: the channels and categories it created are removed and the topics, age restriction and slowmode it changed are put back. You type the exact server name to confirm. Messages in deleted channels are lost. |
| Rules, welcome, FAQ, announcements | Write the message or the embed and post it as the bot, edit it or delete it. You can see the message before it is sent. Mentions are off unless you name the roles, and pinging everyone needs you to type it. |
| Banners and visuals | Draw a banner or a server icon. It is rendered on your device and you decide whether it is posted. |
| Server settings | Name, icon, system, rules and updates channels, AFK channel, verification level, default notifications, content filter and language. |
| Roles | Create, edit and delete roles and their permissions. Administrator is never granted, and powerful permissions need you to type the exact role name. |
| Moderation | Kick, ban, unban, timeout or remove a timeout for one member whose Discord ID you give. A reason is always required and is written in the server's audit log. |
| Real test of a text command | Your bot sends the command in a test channel that you chose, checks the answer, deletes its own messages and reports the result. |

Safety rules on these tools:

- You see a preview and confirm before anything is changed.
- Destructive actions ask you to type the exact name: deleting a channel or a role, kicking or banning a member (their ID), or undoing a layout (the server name). Rules, updates and system channels cannot be deleted.
- The Copilot never reads your members' messages and cannot list or search members. It can only read the messages that the bot itself wrote.
- Moderation is rate limited, and each action carries a reason.

## Use it from your own AI (user MCP) {#user-mcp}

You can also drive your bots from the AI assistant you already use, such as Claude, ChatGPT or Cursor, through an MCP connection. It exposes the same tools as the Copilot: read a bot, plan and validate a command, save commands and workflows, change settings and variables, start and stop a bot, and the Discord server tools above.

The address to give your assistant is:

```
https://api.bot-creator.fr/mcp/user
```

- **Claude and ChatGPT:** add it as a custom connector (in Claude: Settings, Connectors, Add custom connector), then sign in with Discord when asked.
- **Cursor:** add it to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "bot-creator": { "url": "https://api.bot-creator.fr/mcp/user" }
  }
}
```

- **Sign in with Discord only.** No password goes through the connection page.
- **You choose what to allow.** On the consent screen you pick the permissions and the bots the assistant may touch. The permissions are: view your bots, write commands, write workflows, change settings and variables, start and stop the bot, and for Discord: view, post messages, manage the server, moderate and test text commands.
- **You can take it back.** The list of connections in your account lets you remove one or change which bots it covers.
- **It follows the same safety rules.** Each call is checked against the permission, the bot you allowed and your real rights on that bot. Writes are limited to 60 per minute and reads to 600 per minute for each connection, and every write is logged.
- **Access expires.** An access lasts one hour and is renewed with a refresh credential valid for 30 days; reusing an old credential cancels the whole connection.

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

Your messages and the context needed to answer (bot configuration, commands, tool results) are sent to the AI provider used by Bot Creator. Credentials such as Discord tokens, API keys and webhook URLs, and email addresses, are masked before sending, but other personal data is not recognized automatically: do not paste tokens or personal data about other people into a conversation. When you moderate a member, that member's Discord ID and the reason you give are sent to the provider too. The Copilot asks for your consent before its first use. The full details are in the [privacy policy]({{ '/privacy-policy/' | relative_url }}).

## Good to know

- The Copilot can be wrong. Read what it proposes, especially before approving a change on a bot that is running for a community.
- It follows the same rules as the rest of the app: it cannot reach bots outside your account or the bot of the conversation.
- To learn the building blocks it uses, see [Getting started]({{ '/docs/getting-started/' | relative_url }}) and the [BDFD function reference]({{ '/docs/' | relative_url }}).
