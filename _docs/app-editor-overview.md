---
layout: doc
title: "App — Éditeur de Bot : Vue d'ensemble"
translation_key: docs
category: app
description: >
  Documentation de l'éditeur de bot (App Editor) : page principale AppEditPage,
  page de création/édition de commandes CommandCreatePage, et shell d'édition
  (toolbar, badges, cartes de configuration).
---

# App — Éditeur de Bot : Vue d'ensemble

L'éditeur de bot est le cœur de l'application Flutter Bot Creator. Il permet de configurer chaque aspect d'un bot Discord : commandes, workflows, variables globales, planificateur, webhooks, emojis, serveurs, statistiques et paramètres. Ce document couvre la page principale de l'éditeur, la page de création de commandes et le shell d'édition.

## Fichiers source

```
packages/app/lib/features/bot_editor/presentation/screens/app_editor_page.dart
packages/app/lib/features/bot_editor/presentation/screens/bot_sub_pages/command.create.dart
packages/app/lib/features/bot_editor/presentation/screens/bot_sub_pages/command.create.edit_shell.dart
```

**Classes principales** : `AppEditPage` (StatefulWidget), `CommandCreatePage` (StatefulWidget, 2765 lignes).

---

## Page principale : `AppEditPage`

`AppEditPage` est le conteneur de navigation principal pour l'édition d'un bot. Elle est construite autour de 3 concepts clés :

### 1. Connexion Discord REST

Au chargement, la page extrait le token du bot depuis le stockage local et tente une connexion REST via le client Nyxx :

- Si le token est absent → mode **hors-ligne dégradé** avec un message explicatif
- Si la connexion échoue → mode **local** avec possibilité de saisir/corriger le token
- Si la connexion réussit → mode **complet** avec toutes les fonctionnalités

### 2. Navigation par onglets (Rail/Drawer)

La navigation est responsive :

- **Desktop** (`_isDesktopPlatform`) : barre latérale fixe de 248px avec icônes et labels
- **Mobile** : Drawer accessible via un bouton hamburger

Les onglets disponibles (mode complet) :

| Icône | Onglet | Description |
|-------|--------|-------------|
| Home | Accueil | Dashboard du bot (statut, infos) |
| Add | Commandes | Liste et création de commandes |
| Key | Variables globales | Gestion des variables persistantes |
| Tree | Workflows | Workflows réutilisables |
| Clock | Planificateur | Tâches planifiées |
| Webhook | Webhooks | Webhooks entrants |
| Emoji | Emojis | Émojis du bot |
| DNS | Serveurs | Liste des guildes |
| Chart | Dashboard | Statistiques de commandes |
| Settings | Paramètres | Configuration du bot |

En mode dégradé, seuls les onglets Récupération, Paramètres et Commandes sont disponibles.

### 3. États de chargement et dégradation

```
┌──────────────────────────────────────────────────────────┐
│                    AppEditPage                            │
│                                                          │
│  initState() → _init()                                   │
│       │                                                  │
│       ├─ Token absent  → _degradedReason = "Token        │
│       │                   missing..."                     │
│       │                                                  │
│       ├─ Connexion fail → _degradedReason = "Discord     │
│       │                   connection failed..."           │
│       │                                                  │
│       └─ Connexion OK   → client = NyxxRest(token)       │
│                                                          │
│  build() →                                               │
│       _isLoading ? spinner                               │
│       client == null ? recovery page                     │
│       : sidebar + pages[selectedIndex]                   │
└──────────────────────────────────────────────────────────┘
```

---

## Page de création/édition : `CommandCreatePage`

`CommandCreatePage` (2765 lignes) est la page la plus complexe de l'éditeur. Elle gère à la fois la création et l'édition de commandes Discord.

### Architecture interne (fichiers `part`)

```
command.create.dart
 ├── command.create.edit_shell.dart      ← Shell d'édition (toolbar, badges)
 ├── command.create.bdfd.dart            ← Mode script BDFD
 ├── command.create.block_editor.dart    ← Éditeur visuel par blocs
 ├── command.create.serialization.dart   ← Sérialisation JSON (export/import)
 ├── command.create.validation.dart      ← Validation des entrées
 ├── command.create.variable_suggestions.dart ← Suggestions de variables
 ├── command.create.workflow.dart        ← Gestion des workflows
 └── command.create.wizard.dart          ← Assistant de création
```

### État global de la commande

L'état est géré via un `CommandEditorNotifier` (ChangeNotifier) accessible via Provider :

```dart
final notifier = context.watch<CommandEditorNotifier>();
final name = context.select((CommandEditorNotifier n) => n.state.commandName);
```

Les propriétés principales de l'état incluent :

- `commandName`, `commandDescription` — Nom et description
- `commandType` — Type (chatInput, user, message)
- `options` — Options de commande (paramètres)
- `actions` — Liste des actions (workflow visuel)
- `executionMode` — Mode d'exécution (`workflow` ou `bdfd_script`)
- `bdfdScriptContent` — Contenu du script BDFD
- `legacyModeEnabled`, `localOnlyCommand` — Mode legacy prefix
- `folder` — Dossier de classement
- `subcommandWorkflows` — Workflows des sous-commandes

### Modes d'édition

| Mode | Description |
|------|-------------|
| **Workflow** (visuel) | Éditeur par blocs Scratch-like, glisser-déposer |
| **BDFD Script** | Éditeur de code texte avec coloration syntaxique |

### Types de commandes supportés

| Type | Icône | Description |
|------|-------|-------------|
| Slash (chatInput) | Bolt | Commande slash standard Discord |
| Legacy (prefix) | History | Commande par préfixe (mode compatibilité BDFD) |
| User | Person | Menu contextuel utilisateur |
| Message | Chat | Menu contextuel message |

---

## Shell d'édition : `_CommandCreateEditShell`

Le shell d'édition (`command.create.edit_shell.dart`, 364 lignes) est l'interface qui enveloppe l'éditeur de commande. Il est structuré en sections :

### Carte de résumé (`_EditSummaryCard`)

Affiche le titre de la commande (ou "Sans titre"), un sous-titre, et des badges :

| Badge | Icône | Condition |
|-------|-------|-----------|
| Type de commande | Bolt/Person/Chat/History | Toujours |
| Nombre de routes | Route | Sous-commandes présentes |
| Local uniquement | Offline | `_localOnlyCommand` |
| Brouillon local | Cloud off | `_isLocalOnlyCommand` |
| Non sauvegardé | Circle | `_isDirty` |

Un bouton **Enregistrer** est présent dans l'en-tête (responsive : à droite sur desktop, en dessous sur mobile).

### Sections extensibles

```
┌─────────────────────────────────────────────┐
│  _EditSummaryCard                           │
│  ┌───────────────────────────────────────┐  │
│  │ Titre         [Badges]    [Enregistrer]│  │
│  └───────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│  ▼ Paramètres de la commande               │
│     BasicInfoCard (nom, description, type)  │
│     Champ dossier (autocomplete)            │
├─────────────────────────────────────────────┤
│  ▼ Déclencheurs et entrées                 │
│     Options de commande                     │
│     Mode legacy (switch + préfixe)          │
│     Mode d'exécution (workflow / BDFD)      │
├─────────────────────────────────────────────┤
│  Corps de la commande                       │
│     Si BDFD : éditeur de code + diagnostics │
│     Si workflow : ActionsCard (blocs)       │
└─────────────────────────────────────────────┘
```

### Gestion des sous-commandes

Quand des sous-commandes ou groupes sont configurés, un sélecteur de route apparaît. Chaque sous-commande possède son propre workflow d'actions, persisté indépendamment :

```dart
_subcommandWorkflows = {
  'sub1': { 'actions': [...] },
  'groupe/sub2': { 'actions': [...] },
};
```

Le changement de route persiste le workflow actif puis charge celui de la nouvelle route.

---

## Cycle de vie d'édition

1. **Initialisation** : chargement depuis le stockage local (via `appManager`)
2. **Édition** : modifications en temps réel, `_applyStateUpdate()` pour notifier
3. **Validation** : `_validateCommandInputs()` avant sauvegarde
4. **Sauvegarde** : construction du payload via `_buildCommandDataPayload()` → `botPayloadBuilder`
5. **Synchronisation** : le `bot_payload_builder.dart` envoie les mises à jour au runner

### État "dirty"

L'éditeur utilise un snapshot JSON initial (`initialEditSnapshot`) pour détecter si des modifications ont été apportées. La propriété `_isDirty` est calculée en comparant le snapshot courant avec le snapshot initial.

---

## Points clés

- **Resilience** : le mode dégradé permet l'édition hors-ligne avec resynchronisation ultérieure
- **Responsive** : sidebar fixe sur desktop, drawer sur mobile
- **Modulaire** : chaque aspect de l'édition est dans un fichier `part` séparé
- **State management** : `CommandEditorNotifier` (ChangeNotifier) + sélecteurs pour des rebuilds granulaires
- **Deux paradigmes** : workflow visuel (blocs) et script BDFD (code) coexistent
