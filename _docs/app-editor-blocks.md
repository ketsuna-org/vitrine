---
layout: doc
title: "App — Éditeur Visuel par Blocs (Scratch-like)"
translation_key: docs
category: app
description: >
  Documentation du système d'édition visuel par blocs (Scratch-like) : ScratchBlock,
  ScratchBlockCanvas, ScratchBlockPalette, ActionBlock, EntryPointBlock, MetadataBlock
  et ScratchBlockConnector. Couvre le glisser-déposer, les catégories d'actions,
  et le canevas de composition.
---

# App — Éditeur Visuel par Blocs (Scratch-like)

L'éditeur visuel par blocs est une interface inspirée de Scratch permettant de composer des commandes et workflows par assemblage de blocs d'actions. Les blocs sont organisés par catégories, empilables verticalement, et reliés par des connecteurs visuels.

## Fichiers source

```
packages/app/lib/features/bot_editor/presentation/widgets/scratch_blocks/
├── scratch_block.dart               ← Bloc de base (header + body repliable)
├── scratch_block_canvas.dart        ← Canevas défilant avec connecteurs
├── scratch_block_palette.dart       ← Palette d'actions par catégories
├── scratch_block_connector.dart     ← Connecteur visuel entre blocs
├── action_block.dart                ← Bloc d'action (wrapper ActionCard)
├── entry_point_block.dart           ← Bloc point d'entrée (commande/event)
└── metadata_block.dart              ← Bloc de métadonnées (nom, type, dossier)
```

---

## Architecture du système de blocs

```
┌──────────────────────────────────────────────────────────────┐
│                     ScratchBlockCanvas                        │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  MetadataBlock                    [required]  ▼/▲      │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ Nom: /ping    Description: Envoie un pong       │  │  │
│  │  │ Type: [Slash] [Legacy] [User] [Message]         │  │  │
│  │  │ Dossier: [Utils ▼]                              │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                        │  ▼  (ScratchBlockConnector)         │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  EntryPointBlock                  [required]  ▼/▲      │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ Écoute : [Interaction] [Message]                 │  │  │
│  │  │ Exécution : [Blocs] [BDFD Script]               │  │  │
│  │  │ ▶ Configuration legacy (prefix, réponse)        │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                        │  ▼                                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  ActionBlock: Send Message       [Messages]  ▼/▲  ✕   │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ Content: Hello World!                            │  │  │
│  │  │ Embeds: [Ajouter un embed]                       │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
│                        │  ▼                                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  ActionBlock: Respond        [Interactions]  ▼/▲  ✕   │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ Message: Pong! 🏓                                │  │  │
│  │  │ [█] Ephemeral                                    │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  │  ═══════════════ (bloc terminal) ═══════════════════  │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  [+ Ajouter une action]  → Ouvre ScratchBlockPalette  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## `ScratchBlock` — Bloc de base

Le widget `ScratchBlock` (235 lignes) est le composant fondamental. Chaque bloc est une carte Material avec :

### Structure visuelle

```
┌───────────────────────────────────────────────┐
│ ████  🏷️ Titre du bloc    [badge]  ▲ ▼ ✕  ▼  │  ← Header (cliquable)
├───────────────────────────────────────────────┤
│                                               │
│  Contenu du bloc (child)                      │  ← Body (repliable)
│                                               │
└───────────────────────────────────────────────┘
```

### Propriétés

| Propriété | Type | Description |
|-----------|------|-------------|
| `color` | `Color` | Couleur d'accent (bande gauche + icône) |
| `title` | `String` | Titre affiché dans le header |
| `icon` | `IconData` | Icône dans le header |
| `child` | `Widget` | Contenu du body |
| `required` | `bool` | Si true, pas de bouton supprimer |
| `isFinal` | `bool` | Bloc terminal (indicateur visuel en bas) |
| `collapsed` | `bool` | Corps replié/visible |
| `badge` | `Widget?` | Badge optionnel (ex: catégorie, "required") |
| `onDelete` | `VoidCallback?` | Suppression (masqué si `required`) |
| `onMoveUp` / `onMoveDown` | `VoidCallback?` | Réorganisation |
| `onToggleCollapse` | `VoidCallback?` | Clic header pour replier/déplier |

### Adaptations visuelles

- **Mode sombre** : couleurs de fond mélangées avec la couleur d'accent pour le header et le body
- **Header** : barre d'accent colorée de 4px à gauche, icône colorée, titre en gras
- **Body** : fond légèrement teinté, padding standard

### `ScratchBlockBadge`

Petit badge arrondi utilisé pour les étiquettes :

```dart
ScratchBlockBadge(label: 'Messages', color: AppTheme.success)
ScratchBlockBadge(label: 'required', color: getCategoryColor('EntryPoint'))
```

---

## `ScratchBlockCanvas` — Canevas

Le `ScratchBlockCanvas` (92 lignes) est le conteneur qui organise les blocs verticalement :

- Accepte une liste de widgets enfants (les blocs)
- Insère automatiquement des `ScratchBlockConnector` entre chaque paire
- Supporte `skipConnectorAfterIndices` pour les blocs terminaux (pas de connecteur après)
- Scroll vertical avec Scrollbar sur desktop

### Connecteur entre blocs

`ScratchBlockConnector` (39 lignes) est un widget minimaliste :
- Ligne verticale de 2px de large sur toute la hauteur (24px par défaut)
- Petite flèche vers le bas (`arrow_drop_down`) en bas
- Couleur configurable (par défaut : outline variant du thème)

---

## `ScratchBlockPalette` — Palette d'actions

La palette (627 lignes) est affichée via `showModalBottomSheet` ou en tant que dialogue. Elle liste toutes les actions disponibles, groupées par catégories.

### Catégories d'actions

| Catégorie | Couleur | Icône | Nb actions (approx.) |
|-----------|---------|-------|---------------------|
| **Messages** | Vert | message | 9 |
| **Reactions** | Orange | emoji_emotions | 3 |
| **Channels** | Bleu | tag | 10 |
| **Moderation** | Rouge | shield | 16 |
| **Components** | Brand | widgets | 2 |
| **Webhooks** | Teal | webhook | 5 |
| **Guild & Members** | Indigo | groups | 10 |
| **HTTP & Variables** | Cyan | http | 12 |
| **Workflows** | Brand | account_tree | 12 |
| **Logic & Flow** | Rose | fork_right | 11 |
| **Interactions** | Or | touch_app | 10 |
| **Music** | Deep Purple | music_note | 12 |

### Recherche et filtrage contextuel

La palette possède une barre de recherche. Selon le contexte, elle filtre automatiquement :

- **Contexte d'interaction** (`isInteraction: true`) : masque les actions non-interaction (ex: `respondWithModal`, `deferInteraction`)
- **Workflow** (`isWorkflow: true`) : toutes les actions sont disponibles
- **Contexte autocomplete** (`isAutocompleteContext: true`) : seules les actions de données/logique + `respondWithAutocomplete` sont affichées
- **Contexte modal** (`isModalContext: true`) : masque `deferInteraction` (non applicable aux modales)

### Actions terminales (`isFinalAction`)

Certaines actions sont **terminales** — elles mettent fin à l'exécution et rien ne doit suivre :

- `respondWithMessage` — Répondre avec un message
- `respondWithComponentV2` — Répondre avec un composant v2
- `respondWithModal` — Répondre avec une modale
- `respondWithAutocomplete` — Répondre à une autocomplétion
- `deferInteraction` — Différer l'interaction

### Actions "listener"

Ces actions créent des listeners d'interaction et sont masquées de la palette standard (utilisées dans des contextes spécifiques) :

- `listenForButtonClick`, `listenForSelectMenu`, `listenForModalSubmit`, `listenAndExecute`

---

## `ActionBlock` — Bloc d'action

`ActionBlock` (102 lignes) est le wrapper qui intègre une `ActionCard` (le formulaire d'édition d'action existant) dans un `ScratchBlock` :

- Détecte automatiquement la catégorie via `getCategoryForAction()`
- Applique la couleur de la catégorie
- Détecte si l'action est terminale (`isFinalAction`)
- Affiche un badge de catégorie
- Masque les contrôles propres à `ActionCard` (header, position, management)
- Supporte le repliement/dépliage

---

## `MetadataBlock` — Bloc de métadonnées

`MetadataBlock` (579 lignes) est un bloc fixe (`required: true`) qui affiche les métadonnées de la commande :

### Champs affichés

- **Nom** de la commande (TextFormField, validation, max 32 caractères)
- **Description** (conditionnelle, max 100 caractères)
- **Type de commande** : SegmentedButton (Slash / Legacy / User / Message)
- **Dossier** : Autocomplete avec liste des dossiers existants
- **Paramètres avancés** (repliables) : permissions, types d'intégration, contextes
- **Options de commande** : gestion des paramètres (type, nom, description, required)

### Fonctionnalités

- Compteur de paramètres avancés modifiés (badge numérique)
- Chargement des dossiers existants depuis `appManager`
- Adaptation responsive (compact < 420px : icônes seules dans le SegmentedButton)

---

## `EntryPointBlock` — Bloc point d'entrée

`EntryPointBlock` (403 lignes) est un bloc fixe (`required: true`) qui définit le déclencheur de la commande :

### Types de points d'entrée

| Type | Description |
|------|-------------|
| `interaction` | Commande slash Discord (Application Command) |
| `message` | Commande par préfixe legacy (message texte) |

### Contenu

- **Sélecteur de type** : SegmentedButton (Interaction / Message)
- **Sélecteur de mode d'exécution** : SegmentedButton (Blocs / BDFD Script)
- **Configuration legacy** (repliable) : activation, préfixe personnalisé, mode de réponse (reply / channelSend)

### `WorkflowEntryPointBlock`

Variante pour les workflows (non-commandes) :

- **Type général** : champ de saisie pour le nom du point d'entrée
- **Type event** : sélecteur de catégorie d'événement + sélecteur d'événement + aperçu des variables

---

## Cycle de vie d'un bloc d'action

1. **Ajout** : l'utilisateur ouvre la palette, sélectionne une action → `onActionSelected` est appelé
2. **Configuration** : l'utilisateur remplit les paramètres dans l'`ActionCard` intégrée
3. **Réorganisation** : flèches haut/bas ou glisser-déposer
4. **Repliement** : clic sur le header pour masquer/afficher le corps
5. **Suppression** : bouton ✕ (sauf si `required: true`)
6. **Actions imbriquées** : certaines actions (if, for, etc.) peuvent contenir des sous-actions

---

## Points clés

- **12 catégories** d'actions avec code couleur cohérent
- **Blocs fixes** (Metadata, EntryPoint) non supprimables, toujours en haut du canevas
- **Blocs terminaux** (Respond, Defer) marqués d'un indicateur visuel, pas de connecteur après
- **Filtrage contextuel** : la palette adapte les actions disponibles selon le type de workflow
- **Réorganisation** : flèches de déplacement dans chaque bloc
- **Repliable** : chaque bloc peut être réduit pour économiser l'espace vertical
- **Responsive** : les contrôles s'adaptent à la largeur disponible
