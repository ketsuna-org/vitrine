---
layout: doc
title: "App — Marketplace de Templates"
translation_key: docs
category: app
description: >
  Documentation du marketplace de templates de l'application Flutter Bot Creator :
  navigation et recherche de templates, page de détail avec aperçu et application,
  et flux de publication d'un bot comme template.
---

# App — Marketplace de Templates

Le **marketplace** permet aux utilisateurs de Bot Creator de parcourir, rechercher et appliquer des templates de bots créés par la communauté. Il offre également un flux de publication complet pour partager ses propres bots sous forme de templates réutilisables, avec gestion des variables de configuration, sélection des commandes et workflows, et métadonnées descriptives.

## Fichiers source

```
packages/app/lib/features/marketplace/presentation/
├── marketplace_page.dart          — Page de navigation du marketplace (505 lignes)
├── marketplace_detail_page.dart   — Détail d'un template (1277 lignes)
└── publish_template_page.dart     — Publication d'un bot comme template (855 lignes)
```

---

## Architecture globale

```
┌──────────────────────────────────────────────────────────────────────┐
│                       MARKETPLACE                                     │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                    MarketplacePage                                │ │
│  │                                                                   │ │
│  │  • Liste des templates (ListView)                                │ │
│  │  • Barre de recherche                                            │ │
│  │  • Filtres par catégorie (chips horizontaux)                     │ │
│  │  • Filtre "Mes templates"                                        │ │
│  │  • Pull-to-refresh                                               │ │
│  │  • Authentification Discord requise                              │ │
│  └──────────────────────────┬───────────────────────────────────────┘ │
│                             │ navigation                              │
│              ┌──────────────┴──────────────┐                          │
│              ▼                              ▼                          │
│  ┌───────────────────────┐    ┌────────────────────────────────────┐ │
│  │ MarketplaceDetailPage │    │     PublishTemplatePage             │ │
│  │                       │    │                                     │ │
│  │ • En-tête (icône,     │    │  Étape 1 : Sélection               │ │
│  │   nom, auteur)        │    │  • Commandes (checkbox list)       │ │
│  │ • Statistiques        │    │  • Workflows (checkbox list)       │ │
│  │ • Description longue  │    │                                     │ │
│  │ • Variables requises  │    │  Étape 2 : Variables                │ │
│  │ • Aperçu commandes    │    │  • Activation par switch            │ │
│  │ • Aperçu workflows    │    │  • Marquage obligatoire            │ │
│  │ • Tags                │    │  • Ajout de variables custom       │ │
│  │ • Application (apply) │    │                                     │ │
│  │ • Édition/suppression │    │  Étape 3 : Métadonnées              │ │
│  │   (si propriétaire)   │    │  • Icône (emoji picker)            │ │
│  │ • Notation            │    │  • Nom, description                │ │
│  └───────────────────────┘    │  • Catégorie, tags, version        │ │
│                                │  • Carte résumé                    │ │
│                                │  • Publication (POST ou PUT)      │ │
│                                └────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

---

## `MarketplacePage` — Navigation et recherche

**Widget** : `MarketplacePage` (StatefulWidget)

Page principale du marketplace. Elle affiche la liste des templates disponibles et permet de les filtrer.

### États d'affichage

| État | Condition | Rendu |
|------|-----------|-------|
| `_loading` | Chargement initial | `CircularProgressIndicator` |
| `_needsLogin` | `apiClient == null` | Invitation à se connecter via Discord OAuth |
| `_error` | Erreur réseau/API | Message d'erreur + bouton réessayer |
| Contenu | Données chargées | Liste des templates |

### Flux d'authentification

```
1. Vérification de l'apiClient
   └─ Si null → affichage du prompt de connexion

2. L'utilisateur clique sur "Se connecter avec Discord"
   ├─ Vérifie la configuration MainApi
   ├─ MainApiAuthService.connectWithDiscord()
   ├─ Sauvegarde la session (MainApiSettingsStore.saveSession)
   └─ Recharge les templates (_fetch)
```

### Filtres

```dart
// Recherche textuelle (nom, description, tags)
if (_search.isNotEmpty) { ... }

// Filtre par catégorie (chips horizontaux)
if (_categoryFilter != null) { ... }

// Filtre "Mes templates uniquement"
if (_showMyTemplatesOnly && _currentUserId != null) { ... }
```

### Template Card

Chaque template est affiché dans une carte (`_TemplateCard`) contenant :

| Élément | Source |
|---------|--------|
| Icône | `template.icon` (emoji) |
| Nom | `template.name` |
| Description | `template.description` (2 lignes max) |
| Auteur | `template.authorName` |
| Téléchargements | `template.downloads` |
| Note | `template.rating` (1 décimale) |
| Variables requises | Compteur `globalVariables.where((v) => v.required)` |
| Commandes | `template.commands.length` |

---

## `MarketplaceDetailPage` — Détail d'un template

**Widget** : `MarketplaceDetailPage` (StatefulWidget)

Page de détail complète d'un template. Elle récupère les données fraîches depuis l'API (`getMarketplaceTemplate`) pour obtenir la version la plus à jour.

### Sections de la page

```
┌─────────────────────────────────────────┐
│  En-tête                                 │
│  ┌──────┐  Nom du template              │
│  │ icône│  Description courte            │
│  └──────┘  Par {auteur} · v{version}    │
├─────────────────────────────────────────┤
│  Statistiques                            │
│  📥 downloads  ⭐ rating  ▶ commands     │
│  🌳 workflows                            │
├─────────────────────────────────────────┤
│  À propos (descriptionLong)              │
├─────────────────────────────────────────┤
│  Configuration requise                   │
│  • Champs texte pour chaque variable    │
│  • Mode sensible (obscurcissement)      │
│  • Valeurs par défaut                   │
├─────────────────────────────────────────┤
│  Aperçu des commandes (5 max)           │
│  /nom  type · N options · M actions     │
├─────────────────────────────────────────┤
│  Aperçu des workflows (5 max)           │
├─────────────────────────────────────────┤
│  Variables globales non requises        │
├─────────────────────────────────────────┤
│  Tags (chips)                            │
├─────────────────────────────────────────┤
│  [Appliquer ce template]                │
│  [Modifier]  [Supprimer] (si auteur)   │
│  Notation ⭐                             │
└─────────────────────────────────────────┘
```

### Application d'un template

Le bouton "Appliquer" déclenche le processus d'import :

1. Récupération des données complètes du template
2. Instanciation des commandes, workflows et variables
3. Application des valeurs de configuration saisies par l'utilisateur
4. Navigation retour avec `Navigator.pop(true)` pour signaler le succès

### Gestion par le propriétaire

Si l'utilisateur connecté est l'auteur du template (`_isOwner`) :
- **Modifier** : navigation vers `PublishTemplatePage` en mode édition (pré-rempli avec `existingTemplate`)
- **Supprimer** : dialogue de confirmation → `deleteMarketplaceTemplate()` → retour à la liste

---

## `PublishTemplatePage` — Publication d'un template

**Widget** : `PublishTemplatePage` (StatefulWidget)

Flux de publication en 3 étapes avec barre de progression. Supporte le mode création et le mode édition (quand `existingTemplate` est fourni).

### Navigation par étapes

```
Étape 1/3 : Sélection du contenu
├─ Liste des commandes (checkbox)
│   └─ Sélectionner tout / Désélectionner tout
├─ Liste des workflows (checkbox)
│   └─ Sélectionner tout / Désélectionner tout
└─ Message si aucun contenu à publier

Étape 2/3 : Variables de configuration
├─ Switch par variable (inclure/exclure)
├─ Case à cocher "L'utilisateur doit définir cette valeur"
└─ Bouton "Ajouter une variable" (dialogue)

Étape 3/3 : Métadonnées
├─ Carte résumé (commandes, workflows, variables sélectionnés)
├─ Icône (emoji picker via GestureDetector)
├─ Nom du template
├─ Description courte (128 car. max)
├─ Description longue (markdown supporté)
├─ Catégorie
├─ Tags (séparés par des virgules)
└─ Version (format semver suggéré)
```

### Chargement des données

Au chargement, la page récupère :
- `appManager.listAppCommands(botId)` → liste des commandes
- `appManager.getApp(botId)` → données de l'app (workflows, variables globales)

### Mode édition

Quand `existingTemplate` est fourni :
- Tous les champs sont pré-remplis avec les valeurs existantes
- Les sélections de commandes/workflows sont restaurées
- Les variables sont pré-cochées avec leur statut required
- La publication utilise PUT au lieu de POST

### Dialogue d'ajout de variable

Permet d'ajouter des variables personnalisées qui ne font pas partie des variables globales du bot :
- Nom de la variable (obligatoire)
- Description (optionnelle)
- La variable est ajoutée à `_appData['globalVariables']` et à `_selectedVars`

### Publication

```dart
// Mode création
await client.createMarketplaceTemplate(payload);

// Mode édition
await client.updateMarketplaceTemplate(existingTemplate.id, payload);
```

Le payload contient :
- Les commandes et workflows sélectionnés (avec leurs données complètes)
- Les variables globales (avec leur statut required)
- Les métadonnées (nom, description, catégorie, tags, icône, version)
- L'ID et le nom de l'auteur

---

## Intégration API

Le marketplace communique avec le backend **Bot Creator Manager** via `MainApiClient` :

| Endpoint | Méthode | Usage |
|----------|---------|-------|
| `/marketplace/templates` | GET | Liste des templates |
| `/marketplace/templates/{id}` | GET | Détail d'un template |
| `/marketplace/templates` | POST | Création d'un template |
| `/marketplace/templates/{id}` | PUT | Mise à jour d'un template |
| `/marketplace/templates/{id}` | DELETE | Suppression d'un template |

### Modèle de données (`MarketplaceTemplate`)

```dart
class MarketplaceTemplate {
  final String id;
  final String name;
  final String description;
  final String? descriptionLong;
  final String authorId;
  final String authorName;
  final String icon;
  final String category;
  final List<String> tags;
  final String version;
  final int downloads;
  final double rating;
  final List<MarketplaceCommand> commands;
  final List<Map<String, dynamic>> workflows;
  final List<MarketplaceVariable> globalVariables;
}
```
