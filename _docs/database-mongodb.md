---
layout: doc
title: MongoDB (mongo)
translation_key: docs
category: "Database"
function_name: mongo
syntax: mongo.collection(name) | mongo.db(name?)
description: Store and query documents in an external MongoDB database using the mongo keyword in JavaScript scripts.
---

# MongoDB (`mongo`)

When MongoDB is configured in your bot settings, the global `mongo` object provides direct access to an official MongoDB client connected to your database cluster (including MongoDB Atlas).

## Syntax

```js
// Access a collection on the default database
const col = mongo.collection('collectionName');

// Access a specific database
const customDb = mongo.db('analytics');
const col = customDb.collection('logs');
```

## Methods & Properties

| Name | Type | Description |
|---|---|---|
| `mongo.collection(name)` | Method | Returns a MongoDB `Collection` on the default configured database. |
| `mongo.db([name])` | Method | Returns a MongoDB `Db` instance for the specified or default database name. |
| `mongo.client` | Property | Direct reference to the underlying `MongoClient` instance. |

## Examples

### 1. Insert & Find Documents
```js
const users = mongo.collection('users');

// Find a user document
let user = await users.findOne({ userId: message.author.id });

if (!user) {
  // Create profile
  await users.insertOne({
    userId: message.author.id,
    username: message.author.username,
    level: 1,
    xp: 0,
    inventory: ['starter_sword', 'health_potion'],
    createdAt: new Date(),
  });
  user = await users.findOne({ userId: message.author.id });
}

console.log(`User level: ${user.level}, Items: ${user.inventory.join(', ')}`);
```

### 2. Update with Atomic Operators
```js
const users = mongo.collection('users');

// Increment XP and add item atomically
await users.updateOne(
  { userId: interaction.user.id },
  {
    $inc: { xp: 25 },
    $addToSet: { badges: 'quest_completed' },
    $set: { updatedAt: new Date() },
  },
  { upsert: true }
);

await interaction.reply('✨ Quest completed! +25 XP and earned the **Quest Completed** badge.');
```

### 3. Server Configuration / Guild Settings
```js
const guildSettings = mongo.collection('guild_settings');

// Fetch guild configuration
const config = await guildSettings.findOne({ guildId: interaction.guild.id }) || {
  welcomeChannelId: null,
  autoRole: null,
  prefix: '!',
};

await interaction.reply({
  content: `⚙️ **Welcome Channel:** ${config.welcomeChannelId ? `<#${config.welcomeChannelId}>` : 'Not set'}`,
  ephemeral: true,
});
```

### 4. Aggregation Pipeline (Leaderboard)
```js
const users = mongo.collection('users');

const topUsers = await users.aggregate([
  { $sort: { xp: -1 } },
  { $limit: 10 },
  { $project: { userId: 1, username: 1, level: 1, xp: 1 } }
]).toArray();

const lines = topUsers.map((u, i) => `#${i + 1} **${u.username}** — Level ${u.level} (${u.xp} XP)`);

await interaction.reply({
  embeds: [{
    title: '🏆 Global Leaderboard',
    description: lines.join('\n') || 'No players yet.',
    color: 0x00ED64, // MongoDB green
  }],
});
```
