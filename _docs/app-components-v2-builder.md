---
layout: doc
title: "App — Éditeur Visuel de Components Discord V2"
translation_key: docs
category: app
description: >
  Documentation de l'éditeur visuel de components Discord V2 (Component V2 Builder).
  Couvre l'éditeur de messages enrichis, l'éditeur de modales, l'éditeur de nœuds
  individuels, la factory de création et l'éditeur de components traditionnels (ActionRows).
---

# App — Éditeur Visuel de Components Discord V2

Le **Component V2 Builder** est l'éditeur visuel permettant de construire des messages Discord interactifs utilisant les composants modernes Discord : containers, sections, galeries média, modales, menus de sélection, boutons et champs de saisie. Il remplace l'ancien système limité aux ActionRows de boutons par une arborescence riche et imbriquée de components.

## Fichiers source

```
packages/app/lib/features/components_v2/presentation/component_v2_builder/
├── component_v2_editor.dart          — Éditeur principal de messages V2
├── component_node_factory.dart       — Factory de création des nœuds
├── component_node_editor.dart        — Éditeur de propriétés d'un nœud individuel
├── modal_builder.dart                — Builder de modales Discord
└── normal_component_editor.dart      — Éditeur de components traditionnels (ActionRows)
```

**Types partagés** : `packages/shared/lib/types/component.dart`

**Classes principales** : `ComponentV2EditorWidget`, `ComponentNodeEditor`, `ModalBuilderWidget`, `NormalComponentEditorWidget`, `ComponentNodeFactory`

---

## Architecture générale

L'éditeur repose sur un modèle de données arborescent où chaque élément d'interface est un `ComponentNode`. La racine est une `ComponentV2Definition` qui contient :

- `content` : texte brut du message
- `components` : liste de `ComponentNode` racines
- `ephemeral` : visibilité du message (éphémère ou public)

Le système distingue deux modes d'édition :

| Mode | Widget | Usage |
|------|--------|-------|
| **Layout V2** | `ComponentV2EditorWidget` | Messages enrichis avec tous les types de components |
| **Normal (legacy)** | `NormalComponentEditorWidget` | Uniquement des ActionRows contenant boutons et selects |
| **Modal** | `ModalBuilderWidget` | Modales avec champs de saisie et actions |

---

## Hiérarchie des types de components

### Enum `ComponentV2Type` (20 types)

| Type | Nœud | Description |
|------|------|-------------|
| `actionRow` | `ActionRowNode` | Ligne horizontale de components interactifs (max 5 par message) |
| `button` | `ButtonNode` | Bouton (5 styles : primary, secondary, success, danger, link) |
| `stringSelect` | `SelectMenuNode` | Menu déroulant avec options textuelles |
| `userSelect` | `SelectMenuNode` | Sélecteur d'utilisateur |
| `roleSelect` | `SelectMenuNode` | Sélecteur de rôle |
| `mentionableSelect` | `SelectMenuNode` | Sélecteur utilisateur/rôle |
| `channelSelect` | `SelectMenuNode` | Sélecteur de salon |
| `section` | `SectionNode` | Section avec texte + accessory (thumbnail/bouton) |
| `textDisplay` | `TextDisplayNode` | Texte formaté Markdown |
| `thumbnail` | `ThumbnailNode` | Vignette image avec description |
| `mediaGallery` | `MediaGalleryNode` | Galerie d'images |
| `file` | `FileNode` | Fichier attaché |
| `separator` | `SeparatorNode` | Séparateur visuel (ligne ou espacement) |
| `container` | `ContainerNode` | Conteneur avec couleur d'accent et contenu imbriqué |
| `label` | `LabelNode` | Label wrappant un component (utilisé dans les modales) |
| `textInput` | `ModalTextInputNode` | Champ de saisie texte (short ou paragraph) |
| `fileUpload` | `FileUploadNode` | Upload de fichier dans une modale |
| `radioGroup` | `RadioGroupNode` | Groupe de boutons radio |
| `checkboxGroup` | `CheckboxGroupNode` | Groupe de cases à cocher |
| `checkbox` | `CheckboxNode` | Case à cocher unique |

---

## 1. ComponentV2EditorWidget — Éditeur principal de layout

**Fichier** : `component_v2_editor.dart` (254 lignes)

Le `ComponentV2EditorWidget` est l'éditeur visuel complet pour les messages V2. Il gère une `ComponentV2Definition` et notifie les changements via le callback `onChanged`.

### Structure de l'interface

L'éditeur est organisé en sections :

1. **Barre d'en-tête** (dégradé de marque) : icône, titre "Layout", description et badge du nombre de components
2. **Toggle Ephemeral** : switch pour rendre le message visible uniquement par l'utilisateur qui exécute la commande
3. **Liste des components racines** : chaque nœud est rendu via `ComponentNodeEditor`
4. **Bouton "Add Root Component"** : menu dropdown permettant d'ajouter les types racines suivants :
   - Container, ActionRow, Section, TextDisplay, MediaGallery, File, Separator

### Gestion d'état

- L'état local (`_components`, `_ephemeral`) est initialisé par deep copy JSON depuis `widget.definition`
- `didUpdateWidget` resynchronise si la référence externe change
- Chaque modification appelle `_emit()` qui reconstruit une `ComponentV2Definition` et notifie le parent

### Types racines vs enfants

Les components pouvant être ajoutés à la racine sont limités aux types structurels. Les types interactifs (boutons, selects, inputs) ne peuvent être ajoutés qu'à l'intérieur d'un `ActionRow` ou d'une modale.

---

## 2. ComponentNodeFactory — Création des nœuds

**Fichier** : `component_node_factory.dart` (93 lignes)

Factory centralisée pour créer des instances de `ComponentNode` avec des valeurs par défaut cohérentes.

### Méthode `create(type)`

Utilise un switch exhaustif sur `ComponentV2Type`. Chaque type reçoit des valeurs par défaut appropriées :

- **ActionRow** : liste vide de components
- **Button** : label "Button", style primary, customId auto-généré
- **SelectMenu** (stringSelect) : 1 option par défaut, placeholder "Select an option..."
- **SelectMenu** (autres types) : sans options (basés sur l'API Discord)
- **Section** : contient un `TextDisplayNode` par défaut
- **Container** : contient un `TextDisplayNode` par défaut
- **MediaGallery** : 1 item vide par défaut
- **Label** : label localisé + `TextDisplayNode` wrappé
- **RadioGroup / CheckboxGroup** : 1 option par défaut

### Méthode `labelFor(type)`

Convertit un nom de type camelCase en libellé lisible (ex: `actionRow` → "Action Row", `stringSelect` → "String Select").

---

## 3. ComponentNodeEditor — Éditeur de nœud individuel

**Fichier** : `component_node_editor.dart` (2484 lignes)

C'est le cœur du système d'édition. Chaque nœud de l'arborescence est rendu par un `ComponentNodeEditor` qui affiche :

### Rendu visuel

- **Bordure gauche colorée** selon la profondeur d'imbrication (niveau 0 = gris, 1 = info, 2 = success, 3 = warning, 4 = brand)
- **Badge de profondeur** (L0, L1, L2...) pour les nœuds enfants
- **Icône** spécifique au type de component
- **Boutons d'action** : monter, descendre, supprimer (avec confirmation)

### Sections repliables (Mini-blocs)

L'éditeur utilise un système de **MiniBlockContainer** qui permet de masquer/afficher des sections optionnelles :

- Les propriétés essentielles sont toujours visibles
- Les propriétés optionnelles (emoji, disabled, plage de sélection...) sont masquées par défaut si vides
- Un menu "Add Section" permet d'ajouter des sections optionnelles
- Chaque section optionnelle a un bouton de suppression pour la retirer

### Éditeurs par type

Le dispatch `_buildEditorBody` route vers l'éditeur spécialisé selon le type de nœud :

| Nœud | Éditeur | Propriétés éditables |
|------|---------|---------------------|
| `ActionRowNode` | `_buildActionRowEditor` | Components enfants (boutons/selects), validation des règles Discord |
| `ButtonNode` | `_buildButtonEditor` | Label, style (5 choix), customId ou URL, emoji, disabled, actions inline |
| `SelectMenuNode` | `_buildSelectMenuEditor` | CustomId, placeholder, options (pour stringSelect), min/max values, disabled, actions inline |
| `TextDisplayNode` | `_buildTextDisplayEditor` | Contenu Markdown multiligne |
| `SeparatorNode` | `_buildSeparatorEditor` | Type (divider/spacer), espacement (small/large) |
| `SectionNode` | `_buildSectionEditor` | TextDisplay enfants + accessory optionnel |
| `ContainerNode` | `_buildContainerEditor` | Components enfants, couleur d'accent (color picker), spoiler |
| `LabelNode` | `_buildLabelEditor` | Label texte, description, component wrappé |
| `CheckboxNode` | `_buildCheckboxEditor` | CustomId, état par défaut |
| `ModalTextInputNode` | `_buildModalTextInputEditor` | CustomId, style (short/paragraph), label, placeholder, valeur, required, min/max length |
| `RadioGroupNode` | `_buildRadioGroupEditor` | CustomId, options (label/valeur/description/défaut), required |
| `CheckboxGroupNode` | `_buildCheckboxGroupEditor` | CustomId, options, min/max values, required |
| `FileUploadNode` | `_buildFileUploadEditor` | CustomId, min/max values, required |
| `FileNode` | `_buildFileEditor` | URL du fichier, spoiler |
| `ThumbnailNode` | `_buildThumbnailEditor` | URL du média, description, spoiler |
| `MediaGalleryNode` | `_buildMediaGalleryEditor` | Liste d'items (URL + description chacun) |

### Règles métier ActionRow

L'éditeur `ActionRow` applique les contraintes Discord :
- **Maximum 5 ActionRows** par message
- Un ActionRow ne peut contenir **qu'un seul SelectMenu**
- Si un SelectMenu est présent, **aucun bouton** ne peut être ajouté
- **Maximum 5 boutons** par ActionRow (si pas de select)
- Les types disponibles dans le dropdown "Add" s'adaptent dynamiquement

### Actions inline

Les boutons et SelectMenus supportent des **actions inline** (workflows) :
- Configurables via `ActionsBuilderPage`
- Non disponibles en contexte modal (`isModalContext`)
- Supportent la rétrocompatibilité avec l'ancien format `workflowName/workflowEntryPoint/workflowArguments`

### Responsive design

La méthode `_buildResponsiveTwoFieldRow` adapte la disposition :
- Écrans larges (≥520px) : deux champs côte à côte
- Écrans étroits : empilement vertical

---

## 4. ModalBuilderWidget — Builder de modales

**Fichier** : `modal_builder.dart` (741 lignes)

Le `ModalBuilderWidget` est l'éditeur dédié aux **modales Discord** (fenêtres popup interactives). Il gère une `ModalDefinition`.

### Structure d'une modale

Une `ModalDefinition` contient :
- `title` : titre de la modale
- `customId` : identifiant unique
- `inputs` (legacy) : anciens champs texte uniquement
- `components` (V2) : liste de `LabelNode` wrappant des components modaux
- `actions` : actions inline exécutées à la soumission

### Interface de l'éditeur

1. **En-tête** avec icône, titre "Modal Builder" et compteur de champs (max 5)
2. **Bloc Identité** : champs Title et Custom ID obligatoires
3. **Champs** : chaque champ est soit :
   - Un `ComponentNodeEditor` en mode modal (`isModalContext: true`) pour le format V2
   - Un `_InputEditor` legacy pour l'ancien format
4. **Bouton "Add Field"** : dropdown avec les types éligibles en modale :
   - TextInput, Dropdown Selection, User/Role/Channel Selectors, File Upload, Radio Buttons, Checkbox Group, Single Checkbox
5. **Bouton "Configure Submit Actions"** : ouvre `ActionsBuilderPage` pour configurer le workflow de soumission

### Migration automatique legacy → V2

Lors du premier ajout d'un component V2 dans une modale legacy :
- Tous les `ModalTextInputDefinition` existants sont automatiquement convertis en `LabelNode(ModalTextInputNode)`
- Les `inputs` legacy sont vidés
- Cette migration est transparente et irréversible

### Suggestions de variables

Les champs de la modale sont automatiquement ajoutés aux suggestions de variables (préfixe `modal.`) pour l'autocomplétion dans les actions de soumission.

---

## 5. NormalComponentEditorWidget — Éditeur legacy

**Fichier** : `normal_component_editor.dart` (382 lignes)

Éditeur simplifié pour les messages utilisant uniquement l'ancien format Discord (ActionRows de boutons/selects). Il est utilisé quand le flag `IS_COMPONENTS_V2` n'est pas activé.

### Restrictions

- **Uniquement des ActionRows** à la racine (filtre `.whereType<ActionRowNode>()`)
- **Maximum 5 ActionRows**
- Chaque ActionRow ne peut contenir que des **boutons** et **SelectMenus**
- Pas de types riches (containers, sections, médias...)

### Interface

- Barre d'en-tête bleue avec compteur `x/5`
- Chaque ActionRow est une carte avec bouton de suppression
- Bouton "Add Button / Select Menu" avec dropdown filtré dynamiquement
- Bouton "Add Action Row" pour ajouter une nouvelle ligne

---

## Flux de données

```
ComponentV2Definition
  └── ComponentV2EditorWidget (ou NormalComponentEditorWidget)
        └── ComponentNodeEditor (récursif par profondeur)
              └── MiniBlockContainer × N (sections repliables)
                    └── VariableTextField / DropdownButton / ColorPicker / Switch...

ModalDefinition
  └── ModalBuilderWidget
        ├── ComponentNodeEditor (isModalContext: true)
        │     └── LabelNode wrapper
        └── ActionsBuilderPage (submit actions)
```

Chaque modification d'un nœud remonte via le callback `onChanged` jusqu'au widget racine, qui reconstruit la définition complète et la transmet au parent.

---

## Points techniques notables

### Deep copy par sérialisation JSON

Tous les widgets utilisent une deep copy via `ComponentNode.fromJson(c.toJson())` pour éviter les mutations accidentelles de l'état partagé.

### Gestion des clés

- `ModalBuilderWidget` utilise des `UniqueKey` pour préserver l'état des `_InputEditor` lors des réorganisations
- `ComponentNodeEditor` réinitialise ses sections forcées quand le type du nœud change

### Rétrocompatibilité

Le parsing de `ComponentV2Definition.fromJson` supporte 3 formats :
1. **Format V2 standard** : clé `components` avec arborescence complète
2. **Format BDFD flat** : clé `items` avec reconstruction de la hiérarchie (boutons → ActionRows)
3. **Format legacy rows** : clé `rows` avec l'ancienne structure plate

### Rétrocompatibilité des workflows

Les anciens champs `workflowName`, `onClickWorkflow`, `onSelectWorkflow`, `onSubmitWorkflow` sont automatiquement convertis en format `actions` inline lors du parsing.
