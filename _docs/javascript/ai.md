---
layout: doc
title: bc.ai
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: AI functions for JavaScript bots (ask, decide, agent, quota), billed on your AI credits.
permalink: /docs/javascript/ai/
---

`bc.ai` gives your JavaScript bot the same AI functions as the BDFD `$ai` family. Each call spends AI credits from the account that owns the bot (the tokens of the prompt that are not served from the cache plus the tokens of the answer, 1 credit = 1000 tokens). Free and Premium accounts can use it.

## Functions

| Call | BDFD equivalent | Returns |
|------|-----------------|---------|
| `await bc.ai.ask(prompt, { system, maxTokens })` | `$ai` | the answer (string) |
| `await bc.ai.askWithContext(prompt, { system, maxTokens })` | `$aiWithCtx` | the answer, knowing the triggering message |
| `await bc.ai.decide(content, question)` | `$aiDecide` | `true` or `false` |
| `await bc.ai.decideWithContext(question)` | `$aiDecideWithCtx` | `true` or `false` |
| `await bc.ai.agent(prompt, { system, tools, functions, maxTokens })` | `$aiAgent` | the final answer |
| `await bc.ai.quota()` | `$aiQuota` | AI credits left (number) |
| `bc.ai.error` | `$aiError` | error code of the last call, `''` if it worked |

```javascript
const answer = await bc.ai.ask('What is 2+5?', { system: 'You are a math teacher' });
if (bc.ai.error) {
  return `The AI is unavailable (${bc.ai.error}).`;
}
return answer;
```

## Agent

The AI can call the tools you give it, in up to 10 rounds, then answers. `tools` are functions of this call; `functions` lists names of your bot's function library (`fn`), called with the `args` the AI provides.

```javascript
return await bc.ai.agent(message.content, {
  system: "Answer using the user's stored score if needed.",
  tools: {
    getScore: {
      description: 'Score of the current user',
      run: async () => String((await variables.get('score')) ?? 0),
    },
  },
});
```

Only the tools you list can be called. A user can write a message that makes the AI call a tool on their behalf (prompt injection): do not give an agent powerful tools in a command anyone can use.

## Limits and errors

- Answers are capped (500 tokens by default, 1500 at most), 20 calls per minute and per bot.
- A failed call returns `''` (or `false`, or `0`) and sets `bc.ai.error`: `ai_unavailable`, `ai_insufficient_tokens`, `ai_consent_required`, `ai_spending_blocked`, `ai_rate_limited`, `ai_provider_failure` or `ai_context_limit`.
- Not available on a self-hosted runner: `bc.ai.error` is `ai_unavailable`.
- The account must have accepted the AI consent (the same as the Copilot). Tokens, API keys and e-mail addresses are masked before the prompt is sent to the AI provider.
- A script that already declares its own `bc` keeps it and does not get `bc.ai`.

See the BDFD functions [$ai](/docs/ai/), [$aiAgent](/docs/aiagent/) and [$aiQuota](/docs/aiquota/).
