---
layout: doc
title: $removeAllComponents[]
translation_key: docs
category: "Embed & Message"
function_name: removeAllComponents
syntax: $removeAllComponents
description: Supprime tous les composants interactifs (boutons, menus, champs texte, etc.) d'un message en une seule opération.
parameters: []
returns:
  type: void
  description: Supprime tous les composants du message, le rendant entièrement statique.
related:
  - removeComponent
  - removeButtons
  - $editMessage
examples:
  - description: Nettoyer complètement un message après interaction
    code: |
      $onInteraction[final_submit]
      $removeAllComponents
      $editMessage[Formulaire soumis avec succès ✅]
      $endInteraction
  - description: Verrouiller un panneau après usage
    code: |
      $removeAllComponents
      $editMessage[Ce panneau n'est plus disponible]
---

# $removeAllComponents[] — Supprimer Tous les Composants

`$removeAllComponents[]` retire l'intégralité des composants interactifs d'un message. Après cette opération, le message devient purement statique — plus aucun bouton, menu, ou champ de saisie.

## Syntaxe

```
$removeAllComponents
```

## Paramètres

Aucun paramètre.

## Valeur de retour

Supprime tous les composants du message, le rendant non interactif.

## Utilisation

### Finalisation de formulaire

```bdfd
$onInteraction[submit_form]
$removeAllComponents
$var[name;$input[name_input]]
$var[email;$input[email_input]]
$editMessage[✅ Formulaire soumis !
**Nom :** $var[name]
**Email :** $var[email]]
$endInteraction
```

### Verrouillage après expiration

```bdfd
$onInteraction[timeout_event]
$removeAllComponents
$editMessage[⏰ Ce panneau a expiré. L'interaction n'est plus possible.]
$endInteraction
```

### Nettoyage complet

```bdfd
$addTextInput[query;Recherche;short;Rechercher...;;yes;2;100]
$addButton[search;Rechercher;Primary;;search_btn]
$addButton[cancel;Annuler;Danger;;cancel_btn]

$onInteraction[search_btn]
$removeAllComponents
$var[query;$input[query]]
$editMessage[Résultats pour **$var[query]** :\nAucun résultat trouvé.]
$endInteraction

$onInteraction[cancel_btn]
$removeAllComponents
$editMessage[Recherche annulée]
$endInteraction
```

### Panneau de configuration

```bdfd
$title[Configuration]
$description[Modifiez vos paramètres]
$addTextInput[nickname;Pseudo;short;$nickname;;no;2;32]
$addButton[save;Enregistrer;Success;;save_config]

$onInteraction[save_config]
$removeAllComponents
$var[nick;$input[nickname]]
$editMessage[✅ Pseudo mis à jour : **$var[nick]**]
$endInteraction
```

## Comparaison des fonctions de suppression

| Fonction | Effet |
|----------|-------|
| `$removeComponent[id]` | Supprime un composant spécifique |
| `$removeButtons` | Supprime tous les boutons uniquement |
| `$removeAllComponents` | Supprime **tous** les composants |

## Notes

- Après `$removeAllComponents[]`, le message ne peut plus recevoir d'interactions utilisateur.
- Utilisé pour "consommer" une interface après traitement.
- À utiliser dans les handlers `$onInteraction` avec `$editMessage[]` ou `$sendMessage[]`.
- Irréversible : une fois supprimés, les composants ne peuvent pas être restaurés sans renvoyer un nouveau message.
