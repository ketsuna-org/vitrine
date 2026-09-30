---
layout: doc
title: Blocks — Visual No-Code Programming Reference
category: "Blocks"
api_type: blocks
description: Comprehensive guide to the Bot Creator visual Blocks system. Learn block anatomy, mobile canvas workflow, beginner tutorials, and bidirectional equivalence with BDScript.
permalink: /docs/blocks/
---

# Blocks — Visual No-Code Programming

The **Blocks** system is Bot Creator's visual programming engine. Inspired by modular block environments (like Scratch), it enables users on iOS, Android, and Desktop to build sophisticated Discord bots without writing raw code.

Blocks run natively on the high-performance Dart engine. Each block compiles into a structured, type-safe `Action` with deterministic inputs, outputs, and lifecycle error handling.

---

## 1. Anatomy of a Block

In the mobile editor, blocks appear as stacked, interlocking cards connected top-to-bottom.

```text
┌──────────────────────────────────────────────────────────────┐
│ [Icon]  ACTION NAME                                   [Key]  │  <── Header (Category Color)
├──────────────────────────────────────────────────────────────┤
│  Input Field 1 : [ Value / Placeholder ((...))             ] │
│  Dropdown      : [ Selected Option                        ▼] │
│  Toggle Switch : [✔ Enabled]                                 │
├──────────────────────────────────────────────────────────────┤
│  ⚙ Paramètres avancés : Dépendances, Gestion des erreurs    │  <── Lifecycle Controls
└──────────────────────────────────────────────────────────────┘
                               │
                               ▼ (Connecteur de flux)
```

### JSON Structure Under the Hood

When saved or synchronized, every block is serialized into a JSON `Action` object:

```json
{
  "type": "respondWithMessage",
  "key": "welcome_reply",
  "enabled": true,
  "depend_on": [],
  "error": {
    "mode": "stop",
    "jumpToActionId": null,
    "skipCount": 0
  },
  "payload": {
    "content": "Bonjour ((user.username)) ! Bienvenue sur ((guild.name)).",
    "ephemeral": true
  }
}
```

### Field Definitions

| Champ | Type | Description |
|---|---|---|
| `type` | String | Identifiant exact du bloc (ex: `sendMessage`, `createChannel`, `ifBlock`). Sensible à la casse. |
| `payload` | Object | Dictionnaire des paramètres spécifiques au bloc (noms, IDs, contenus, booléens). |
| `key` | String | Identifiant unique optionnel attribué au résultat du bloc (ex: `ticket_chan`). |
| `enabled` | Boolean | Défaut: `true`. Si `false`, le moteur saute l'exécution du bloc sans lever d'erreur. |
| `depend_on` | Array<String> | Liste des clés d'actions dont ce bloc dépend avant d'être exécuté. |
| `error` | Object | Politique de gestion d'erreur : `mode` (`stop`, `continue`, `jump`, `skip`), `jumpToActionId`, `skipCount`. |

---

## 2. Entrées, Sorties et Variables de Contexte

### Variables de Contexte Discord `((...))`
Les blocs ont un accès direct aux métadonnées de l'événement en cours grâce aux balises de template :
- **Utilisateur** : `((user.id))`, `((user.username))`, `((user.avatar))`
- **Serveur** : `((guild.id))`, `((guild.name))`, `((guild.memberCount))`
- **Salon** : `((channel.id))`, `((channel.name))`
- **Options Slash** : `((opts.nom_argument))` (ou `((opts.nom_argument.id))` pour les membres/salons/rôles)
- **Interaction** : `((interaction.customId))`, `((interaction.userId))`

### Sorties de Blocs `((action.<key>))`
Lorsqu'un bloc produit un résultat (par exemple, `createChannel` crée un salon et retourne son Snowflake ID, ou `httpRequest` retourne une réponse JSON), assignez-lui un **Key** dans l'éditeur (ex: `mon_salon`).
Les blocs suivants peuvent alors référencer cette valeur :
```text
((action.mon_salon))
```

---

## 3. Guide pas-à-pas pour les débutants : Créer son bot sans coder

Voici 3 projets fondamentaux montrant la transcription exacte entre l'interface visuelle mobile, le JSON des blocs et le code BDScript.

---

### Projet 1 : La commande Slash `/ping`

**Objectif :** Créer une commande qui répond avec la latence du bot dans un bel embed.

#### Rendu Visuel (UI Mobile)
```text
[ Événement : Commande Slash /ping ]
   │
   └── [ Action : Répondre à l'interaction ]
          ├── Contenu : ""
          ├── Éphémère : Non
          └── Embeds :
                 └── [ Embed 1 ]
                        ├── Titre : "🏓 Pong !"
                        ├── Description : "Latence API : **((bot.ping))ms**"
                        └── Couleur : #5865F2 (Bleu Discord)
```

#### Équivalence Bi-directionnelle

:::: tabs

::: tab Blocks (JSON)
```json
[
  {
    "type": "respondWithMessage",
    "key": "ping_reply",
    "payload": {
      "content": "",
      "ephemeral": false,
      "embeds": [
        {
          "title": "🏓 Pong !",
          "description": "Latence API : **((bot.ping))ms**",
          "color": "#5865F2"
        }
      ]
    }
  }
]
```
:::

::: tab BDScript (BDFD)
```bdfd
$title[🏓 Pong !]
$description[Latence API : **$ping ms**]
$color[#5865F2]
```
:::

::::

---

### Projet 2 : Message de Bienvenue Automatique

**Objectif :** Lorsqu'un nouveau membre rejoint le serveur, envoyer un message de bienvenue personnalisé dans le salon `#bienvenue`.

#### Rendu Visuel (UI Mobile)
```text
[ Événement : Nouveau membre rejoint (guildMemberAdd) ]
   │
   └── [ Action : Envoyer un message ]
          ├── Salon : 112233445566778899 (ID du salon #bienvenue)
          └── Contenu : "Bienvenue <@((user.id))> sur **((guild.name))** ! 🎉\nNous sommes désormais ((guild.memberCount)) membres !"
```

#### Équivalence Bi-directionnelle

:::: tabs

::: tab Blocks (JSON)
```json
[
  {
    "type": "sendMessage",
    "payload": {
      "channelId": "112233445566778899",
      "content": "Bienvenue <@((user.id))> sur **((guild.name))** ! 🎉\nNous sommes désormais ((guild.memberCount)) membres !"
    }
  }
]
```
:::

::: tab BDScript (BDFD)
```bdfd
$useChannel[112233445566778899]
Bienvenue <@$authorID> sur **$serverName** ! 🎉
Nous sommes désormais $membersCount membres !
```
:::

::::

---

### Projet 3 : Rôle interactif par Bouton (Auto-Rôle)

**Objectif :** Un message comporte un bouton "Devenir Membre". Quand un utilisateur clique, il reçoit le rôle sans spammer le salon.

#### 1. Envoi du message initial
```text
[ Événement : Commande Slash /setup-roles ]
   │
   ├── [ Action : Envoyer un message ]
   │      ├── Salon : ((channel.id))
   │      ├── Contenu : "Cliquez sur le bouton ci-dessous pour obtenir le rôle Membre :"
   │      └── Boutons :
   │             └── [ Bouton Vert : "Vérifier mon profil" | ID: btn_auto_role ]
   │
   └── [ Action : Répondre à l'interaction ]  ─── Éphémère : Oui
          └── Contenu : "Panneau de rôle déployé !"
```

#### 2. Workflow de clic de bouton
```text
[ Événement : Clic de Bouton (interactionCreate) ]
   │
   ├── [ Condition : ((interaction.customId)) == btn_auto_role ]
   │      │
   │      ├── [ Action : Ajouter un rôle ]
   │      │      ├── Utilisateur : ((interaction.userId))
   │      │      └── Rôle : 998877665544332211 (ID du rôle Membre)
   │      │
   │      └── [ Action : Répondre à l'interaction ]
   │             ├── Contenu : "✅ Vous avez reçu le rôle Membre !"
   │             └── Éphémère : Oui
```

#### Équivalence Bi-directionnelle

:::: tabs

::: tab Blocks (JSON)
```json
[
  {
    "type": "ifBlock",
    "payload": {
      "condition.variable": "((interaction.customId))",
      "condition.operator": "equals",
      "condition.value": "btn_auto_role",
      "thenActions": [
        {
          "type": "addRole",
          "payload": {
            "userId": "((interaction.userId))",
            "roleId": "998877665544332211"
          }
        },
        {
          "type": "respondWithMessage",
          "payload": {
            "content": "✅ Vous avez reçu le rôle Membre !",
            "ephemeral": true
          }
        }
      ]
    }
  }
]
```
:::

::: tab BDScript (BDFD)
```bdfd
$if[((interaction.customId))==btn_auto_role]
  $giveRole[((interaction.userId));998877665544332211]
  $ephemeral
  ✅ Vous avez reçu le rôle Membre !
$endif
```
:::

::::

---

## 4. Explorer les Blocs par Catégorie

Pour consulter la liste exhaustive des **112 blocs** disponibles dans l'application mobile avec leurs champs détaillés :

- 📖 **[Dictionnaire complet des Blocks](/docs/blocks-dictionary/)** — Catalogue exhaustif de tous les blocs et paramètres.
- 💬 **[Blocs Messages & Réponses](/docs/blocks-messages/)** — `sendMessage`, `respondWithMessage`, embeds et composants.
- 📁 **[Blocs Salons & Permissions](/docs/blocks-channels/)** — Création, permissions, modération et suppression de salons.
- 🔀 **[Blocs Contrôle de Flux](/docs/blocks-control-flow/)** — Conditions `ifBlock`, boucles `forLoop`, attentes et appels de workflows.
- 🎫 **[Système de Tickets](/docs/tickets/)** — Système complet et robuste de tickets privés en Blocks et BDFD.
