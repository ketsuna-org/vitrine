---
layout: doc
title: "App — Système de thème (Design System)"
translation_key: docs
category: app
description: >
  Documentation du Design System de l'application Flutter Bot Creator :
  thèmes Material 3 light/dark, tokens de design (couleurs, espacements, typographie),
  composants réutilisables (AppBar, dialogues, bottom sheets, status pills).
---

# App — Système de thème (Design System)

Le fichier `app_theme.dart` constitue la **source unique de vérité** pour tous les tokens visuels de l'application Bot Creator. Aucune couleur, rayon, espacement ou style typographique ne doit être défini en dur dans les widgets — toute référence passe par cette classe.

## Fichier source

```
packages/app/lib/core/theme/
└── app_theme.dart  — Design System complet (631 lignes)
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DESIGN SYSTEM — AppTheme                         │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  Couleurs        │  │  Espacements     │  │  Composants      │  │
│  │                  │  │  & Rayons        │  │  réutilisables   │  │
│  │ • Marque         │  │                  │  │                  │  │
│  │ • Sémantiques    │  │ • spacingXs→Xxl  │  │ • brandAppBar    │  │
│  │ • Syntaxe        │  │ • radiusXs→Pill  │  │ • statusPill     │  │
│  │ • Discord        │  │ • cardShape      │  │ • showConfirm    │  │
│  │ • Surfaces       │  │ • dialogShape    │  │ • showAdaptive   │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                     │                     │             │
│           └─────────────────────┼─────────────────────┘             │
│                                 │                                    │
│                    ┌────────────▼────────────┐                      │
│                    │     ThemeData M3         │                      │
│                    │                          │                      │
│                    │  lightTheme()            │                      │
│                    │  darkTheme()             │                      │
│                    └──────────────────────────┘                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tokens de design

### Couleurs de marque

| Token | Valeur | Usage |
|-------|--------|-------|
| `brandPrimary` | `#6A0FA2` (violet foncé) | Couleur principale, seed du ColorScheme M3 |
| `brandSecondary` | `#9B30FF` (violet vif) | Gradients, accents |
| `brandGradient` | `LinearGradient` | AppBar, FAB, éléments de marque |

### Couleurs sémantiques

| Token | Valeur | Usage |
|-------|--------|-------|
| `success` | `#2E7D32` | Succès standard |
| `successLight` | `#4CAF50` | Succès clair |
| `successAccent` | `#69F0AE` | Accent succès (greenAccent) |
| `error` | `#E53935` | Erreur standard |
| `errorLight` | `#EF5350` | Erreur claire |
| `warning` | `#FFA726` | Avertissements |
| `premiumGold` | `Colors.amber` | Éléments d'abonnement Pro |
| `info` | `#1976D2` | Information |
| `discord` | `#5865F2` | Bleu « blurple » Discord |
| `discordLight` | `#7983F5` | Variant clair Discord |
| `discordDarkBg` | `#2B2D31` | Fond dark Discord |
| `discordDarkerBg` | `#1E1F22` | Fond dark profond Discord |
| `discordBorder` | `#404249` | Bordures style Discord |
| `discordText` | `#B5BAC1` | Texte style Discord |

### Couleurs de syntaxe (éditeurs BDFD)

| Token | Valeur | Usage |
|-------|--------|-------|
| `syntaxOrange` | `#FF9800` | Mots-clés, avertissements |
| `syntaxRed` | `#EF5350` | Erreurs |
| `syntaxCyan` | `#00ACC1` | Types, informations |
| `syntaxGrey` | `#E0E0E0` | Texte secondaire, bordures |

### Surfaces sombres

| Token | Valeur | Usage |
|-------|--------|-------|
| `darkSurface` | `#2C2C3A` | BotCard, surfaces sombres |
| `darkSurfaceVariant` | `#3A3A4A` | Variante surface sombre |
| `codeSurface` | `#1E1E1E` | Fond éditeur de code |
| `codeSurfaceVariant` | `#263238` | Variante éditeur |
| `codeSurfaceDarcula` | `#2B2B2B` | Fond style Darcula |
| `botCardOnlineGradient` | `[#1B5E20, #2E7D32]` | Dégradé bot en ligne |
| `botCardOfflineGradient` | `[darkSurface, darkSurfaceVariant]` | Dégradé bot hors ligne |

---

### Espacements

| Token | Valeur |
|-------|--------|
| `spacingXs` | `4.0` |
| `spacingSm` | `8.0` |
| `spacingMd` | `12.0` |
| `spacingLg` | `16.0` |
| `spacingXl` | `20.0` |
| `spacingXxl` | `24.0` |

### Rayons de bordure

| Token | Valeur | Usage |
|-------|--------|-------|
| `radiusXs` | `4.0` | Micro éléments |
| `radiusSm` | `8.0` | Badges, tags, chips |
| `radiusMd` | `12.0` | Cartes, boutons, inputs |
| `radiusLg` | `16.0` | Modals, grandes cartes |
| `radiusPill` | `999.0` | Pills, capsules |

### Formes prédéfinies

| Token | Type | Usage |
|-------|------|-------|
| `cardShape` | `RoundedRectangleBorder(radiusMd)` | Cartes |
| `dialogShape` | `RoundedRectangleBorder(radiusLg)` | Dialogues |
| `buttonShape` | `RoundedRectangleBorder(radiusMd)` | Boutons |

---

### Breakpoints responsive

| Token | Valeur | Méthode associée |
|-------|--------|-------------------|
| `smallPhoneWidth` | `420.0` | `isSmallPhone(context)` |
| `compactWidth` | `600.0` | `isCompact(context)` |
| `mediumWidth` | `900.0` | — |
| `expandedWidth` | `1200.0` | `isExpanded(context)` |

Les méthodes `isSmallPhone()`, `isCompact()` et `isExpanded()` prennent un `BuildContext` et retournent un booléen basé sur `MediaQuery.sizeOf(context).width`.

### Élévations

| Token | Valeur |
|-------|--------|
| `elevationNone` | `0.0` |
| `elevationLow` | `1.0` |
| `elevationMedium` | `3.0` |
| `elevationHigh` | `6.0` |

### Typographie (compléments M3)

| Token | Valeur |
|-------|--------|
| `fontWeightSemiBold` | `FontWeight.w600` |
| `fontWeightBold` | `FontWeight.w700` |

### Opacités standard

| Token | Valeur | Usage |
|-------|--------|-------|
| `opacityDisabled` | `0.38` | Éléments désactivés |
| `opacitySubtle` | `0.10` | Très discret |
| `opacityOverlay` | `0.15` | Overlays |
| `opacitySecondaryText` | `0.60` | Texte secondaire |
| `opacityPrimaryText` | `0.90` | Texte principal |

### Durées d'animation

| Token | Valeur |
|-------|--------|
| `animFast` | `200ms` |
| `animNormal` | `300ms` |

---

## Thèmes Material 3

### Thème clair — `lightTheme()`

```dart
static ThemeData lightTheme() {
  final colorScheme = ColorScheme.fromSeed(seedColor: brandPrimary);
  return ThemeData(
    useMaterial3: true,
    colorScheme: colorScheme,
    // ...
  );
}
```

- **ColorScheme** généré depuis `brandPrimary` (`#6A0FA2`) comme seed
- **AppBar** : fond violet, texte blanc, centré, sans élévation
- **Cards** : shape `cardShape`, élévation `elevationMedium`, clip anti-alias, sans surfaceTintColor
- **ListTile** : style `list` pour éviter les conflits avec des `DecoratedBox` parents
- **Dialogs** : shape `dialogShape`
- **Bottom sheets** : drag handle visible
- **Boutons** : tous les types (filled, text, elevated, outlined) utilisent `buttonShape` et des padding cohérents
- **Inputs** : fond `surfaceContainerHighest` à 50% d'opacité, bordures arrondies `radiusMd`, bordure focused en `primary` 2px
- **Chips** : shape arrondie `radiusSm`
- **SnackBars** : floating, shape arrondie `radiusSm`

### Thème sombre — `darkTheme()`

```dart
static ThemeData darkTheme() {
  final baseScheme = ColorScheme.fromSeed(
    seedColor: brandPrimary,
    brightness: Brightness.dark,
  );
  final colorScheme = baseScheme.copyWith(
    surface: Color(0xFF2B2D31),
    onSurface: Color(0xFFF2F3F5),
    surfaceContainer: Color(0xFF2B2D31),
    surfaceContainerLow: Color(0xFF1E1F22),
    surfaceContainerHigh: Color(0xFF313338),
    surfaceContainerHighest: Color(0xFF35363C),
    outline: Color(0xFF404249),
    outlineVariant: Color(0xFF4E5058),
  );
  // ...
}
```

- Mêmes composants que le thème clair
- **ColorScheme** overridé avec une palette sombre harmonisée (tons Discord-like)
- `scaffoldBackgroundColor` et `canvasColor` en `#1E1F22`
- Les inputs en mode sombre utilisent `#1E1F22` comme fond et `#404249` comme bordure
- Les boutons, cartes, chips et snackbars partagent les mêmes formes que le thème clair

---

## Composants réutilisables

### `showConfirmDialog`

Affiche un dialogue de confirmation avec icône, titre, contenu et deux boutons (annuler / confirmer).

```dart
static Future<bool> showConfirmDialog(
  BuildContext context, {
  required String title,
  required String content,
  required String confirmLabel,
  String? cancelLabel,
  bool isDestructive = false,
  IconData? icon,
})
```

- Si `isDestructive` est `true`, le bouton de confirmation est rouge (`colorScheme.error`)
- Icône par défaut : `warning_amber_rounded` (destructif) ou `help_outline_rounded` (standard)
- Retourne `true` si l'utilisateur confirme, `false` sinon
- Le label du bouton Annuler utilise automatiquement `MaterialLocalizations` si non fourni

### `showAdaptiveSheet`

Affiche un composant adaptatif selon la largeur d'écran :

- **Mobile** (`isCompact`) : `showModalBottomSheet` avec titre
- **Desktop** : `AlertDialog` avec bouton Fermer

```dart
static Future<T?> showAdaptiveSheet<T>({
  required BuildContext context,
  required String title,
  required Widget Function(BuildContext) builder,
  double dialogWidth = 520,
})
```

### `statusPill`

Construit un badge pill (capsule) avec un point coloré et un label texte.

```dart
static Widget statusPill({
  required String label,
  required Color dotColor,
  Color? backgroundColor,
  Color textColor = Colors.white,
})
```

- Layout horizontal : point coloré (7×7, cercle) + espacement + texte
- Fond semi-transparent blanc par défaut (`opacityOverlay`)
- Typographie : 10px, semi-bold, opacité `opacityPrimaryText`

### `brandAppBar`

Construit une AppBar avec le gradient de marque `brandGradient` en fond.

```dart
static PreferredSizeWidget brandAppBar({
  required String title,
  List<Widget>? actions,
  Widget? leading,
  bool automaticallyImplyLeading = true,
  PreferredSizeWidget? bottom,
})
```

- Fond : `Container` avec décoration `BoxDecoration(gradient: brandGradient)`
- Titre centré
- Supporte un `bottom` (typiquement un `TabBar`)

---

## Convention d'usage

```dart
import 'package:bot_creator/core/theme/app_theme.dart';

// Couleurs
Container(color: AppTheme.brandPrimary)
Text('Succès', style: TextStyle(color: AppTheme.success))

// Espacements
SizedBox(height: AppTheme.spacingLg)

// Rayons
ClipRRect(borderRadius: BorderRadius.circular(AppTheme.radiusMd))

// Composants
AppTheme.brandAppBar(title: 'Mon Titre')
AppTheme.statusPill(label: 'Online', dotColor: AppTheme.successAccent)
```
