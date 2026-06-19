---
layout: doc
title: $getAttachments
translation_key: docs
category: "Entity Info"
function_name: getAttachments
syntax: $getAttachments[messageID]
description: Récupère les URLs des pièces jointes d'un message spécifique. Retourne une liste d'URLs séparées par des virgules.
---

# $getAttachments

La fonction `$getAttachments[]` permet de **récupérer les URLs des pièces jointes** (images, fichiers, vidéos) d'un message Discord.

## Syntaxe

```
$getAttachments[messageID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `messageID` | L'ID du message contenant les pièces jointes à récupérer. |

## Valeur de retour

- **Type** : String
- Les URLs complètes des pièces jointes, séparées par `, `.
- Chaîne vide si le message ne contient aucune pièce jointe.

## Comportement

- Retourne toutes les URLs des fichiers attachés au message.
- Fonctionne avec tous les types de fichiers supportés par Discord (images, vidéos, documents, etc.).
- Chaque URL est une URL directe vers le fichier sur les serveurs Discord.

## Exemples

### Récupération simple

```bdfd
$let[atts;$getAttachments[$messageID]]
$if[$atts!=]
  Pièces jointes : $atts
$else
  Aucune pièce jointe dans ce message.
$endif
```

### Boucle sur les pièces jointes

```bdfd
$let[atts;$getAttachments[$messageID]]
$if[$atts!=]
  $textSplit[$atts;, ]
    📎 Pièce jointe $index : $splitText[$index]
  $endTextSplit
$endif
```

### Sauvegarde d'image

```bdfd
$let[url;$getAttachments[$noMentionMessage]]
$if[$url!=]
  $let[first;$splitText[$url;, ;1]]
  $image[$first]
  $sendMessage[Image récupérée :]
$else
  $sendMessage[Aucune image trouvée.]
$endif
```

## Notes

- Les URLs Discord expirent après un certain temps (quelques heures à quelques jours).
- Pour un usage permanent, téléchargez et hébergez les fichiers ailleurs.
- Utilisez `$textSplit[]` pour traiter chaque pièce jointe individuellement.
