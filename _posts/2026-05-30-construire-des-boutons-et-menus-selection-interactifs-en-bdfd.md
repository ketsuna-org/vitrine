---
title: "Construire des Boutons et Menus de Sélection Interactifs en BDFD"
description: Exploitez la puissance des composants d'interface de Discord. Apprenez à concevoir des boutons cliquables et des menus de sélection déroulants dans vos commandes BDFD.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-components-guide
locale: fr
content_language: fr
layout: post
category: Components
toc: true
function_syntax: $addButton[newRow;customID;label;style;disabled;emoji]
---

Les messages textuels classiques sont formidables, mais les bots Discord modernes reposent désormais sur les **Interactions Riches**. L'ajout de **Boutons** graphiques et de **Menus de Sélection** déroulants transforme votre bot en une application véritablement interactive, évitant ainsi à vos utilisateurs de devoir saisir des paramètres de commande complexes et sujets aux erreurs.

Dans ce guide, nous allons voir comment attacher des boutons fonctionnels et des listes déroulantes aux réponses de votre bot avec Bot Designer for Discord (BDFD) / Bot Creator.

---

## 🔘 Attacher des Boutons Cliquables (`$addButton`)

Les boutons sont des éléments interactifs positionnés au bas d'un message ou d'un embed. BDFD vous permet d'ajouter jusqu'à 25 boutons par message (répartis sur 5 lignes de 5 boutons chacune) :

```bdfd
$addButton[nouvelleLigne;customIDouURL;libellé;style;désactivé;émoji]
```
* **`nouvelleLigne`** : (`yes` ou `no`). Mettez `yes` pour forcer ce bouton à s'afficher sur une nouvelle ligne dédiée.
* **`customIDouURL`** : L'identifiant unique de ce bouton (ex: `btn_verify`), ou un lien web si vous utilisez le style redirection.
* **`libellé`** : Le texte affiché sur le bouton.
* **`style`** : La couleur thématique du bouton :
  * `primary` (Bleu / Violet)
  * `secondary` (Gris)
  * `success` (Vert)
  * `danger` (Rouge)
  * `link` (Gris avec icône de redirection, nécessite une URL web à la place du customID)
* **`désactivé`** : (`yes` ou `no`). Mettez `yes` pour rendre le bouton incliquable.
* **`émoji`** : (Optionnel) Le nom ou l'ID d'un émoji à afficher à côté du texte.

---

## 🔽 Créer des Menus Déroulants (`$addSelectMenu`)

Les menus de sélection permettent aux utilisateurs de choisir une ou plusieurs options dans une liste déroulante élégante. Un menu peut contenir jusqu'à 25 choix :

### Étape 1 : Initialiser le Menu
```bdfd
$addSelectMenu[customID;placeholder;valeursMin;valeursMax;désactivé]
```
* **`customID`** : Identifiant unique de ce menu déroulant.
* **`placeholder`** : Le texte d'aide gris affiché par défaut.
* **`valeursMin` / `valeursMax`** : Le nombre d'options minimum et maximum que l'utilisateur peut sélectionner. Mettez `1` pour un menu à choix unique standard.

### Étape 2 : Ajouter les Options de Choix
Immédiatement après l'initialisation du menu, définissez ses options avec `$addSelectMenuOption` :
```bdfd
$addSelectMenuOption[menuID;libellé;valeur;description;parDéfaut;émoji]
```

---

## 🛠️ Traitement des Clics : Le Cycle d'Événement

Lorsqu'un utilisateur clique sur un bouton ou choisit une option, Discord déclenche un **Événement d'Interaction**. Pour traiter ces actions :

1. Créez une commande dédiée à l'écoute du `customID` de vos composants.
2. Dans Bot Creator, le runner redirige ces actions vers l'événement `interactionCreate`.
3. Récupérez les entrées à l'aide des variables de contexte comme `((interaction.customId))` ou `((interaction.stringSelect.value))`.

---

## 🏆 Exemple de Code : Attribution de Rôles Automatique

Créons un panneau de configuration de rôles fonctionnel. Les utilisateurs peuvent cliquer sur des boutons pour obtenir des rôles instantanément, sans aucune commande textuelle !

### Commande Initiale : `!roles`
Génère l'embed avec les boutons cliquables.

```bdfd
$nomention
$title[🎭 Choisissez vos rôles !]
$color[#6366f1]
$description[
Cliquez sur les boutons ci-dessous pour obtenir ou retirer vos rôles instantanément :

* 💻 **Rôle Développeur**
* 🎨 **Rôle Graphiste**
]

$addButton[no;role_dev;Développeur;primary;no;💻]
$addButton[no;role_design;Graphiste;success;no;🎨]
```

### Commande d'Écoute d'Interaction (Handler)
* **Déclencheur (Trigger)** : Configurez l'écoute sur les Custom IDs correspondants (`role_dev` et `role_design`).
* **Code** :

```bdfd
$nomention
$if[((interaction.customId))==role_dev]
  $giveRole[((interaction.userId));112233445566778899]
  $sendResponse[✅ Le rôle **Développeur** a été ajouté à votre profil ! // ephemeral]
$endif

$if[((interaction.customId))==role_design]
  $giveRole[((interaction.userId));998877665544332211]
  $sendResponse[✅ Le rôle **Graphiste** a été ajouté à votre profil ! // ephemeral]
$endif
```

> [!IMPORTANT]
> Répondez toujours aux interactions en mode privé/éphémère (à l'aide du commentaire `// ephemeral` ou des paramètres de workflow) pour éviter de polluer les salons de discussion pour les autres membres !
