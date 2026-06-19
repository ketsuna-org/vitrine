---
layout: doc
title: "Système — BDFD Signature Hints"
translation_key: docs
category: systems
description: >
  Documentation du système d'inférence de signatures de fonctions BDFD. Couvre
  l'algorithme de parcours des tokens pour identifier la fonction englobante
  au caret, le mapping de 160+ fonctions et leurs paramètres ordonnés.
---

# Système — BDFD Signature Hints

Le système de **Signature Hints** fournit l'inférence de contexte nécessaire à l'autocomplétion et à l'affichage des signatures de fonctions dans l'éditeur BDFD. Il est implémenté dans `packages/shared/lib/utils/bdfd_signature_hints.dart` (644 lignes).

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────┐
│                 INFÉRENCE DE SIGNATURE AU CARET                   │
│                                                                   │
│  Source + caretOffset + lexerResult                               │
│       │                                                           │
│       ▼                                                           │
│  Parcours des tokens (stack de _SigFrame)                        │
│       │                                                           │
│       ▼                                                           │
│  BdfdSignatureContext {                                           │
│    functionName: "$addField"                                      │
│    parameters: ["Name", "Value", "Inline? (opt)", "Index (opt)"]  │
│    activeIndex: 1     ← le caret est dans le 2ème paramètre      │
│  }                                                                │
└──────────────────────────────────────────────────────────────────┘
```

---

## BdfdSignatureContext

Décrit le contexte de fonction actif à une position de caret donnée.

| Champ          | Type           | Description                                                       |
|----------------|----------------|-------------------------------------------------------------------|
| `functionName` | `String`       | Nom brut de la fonction, **incluant le `$`** (ex: `$addField`)    |
| `parameters`   | `List<String>` | Liste ordonnée des labels de paramètres pour cette fonction       |
| `activeIndex`  | `int`          | Index 0-based du paramètre dans lequel se trouve le caret         |

---

## `bdfdSignatureContextAt(source, caretOffset, lexerResult)` → `BdfdSignatureContext?`

Fonction principale. Retourne le contexte de signature pour une position de caret donnée, ou `null` si le caret n'est pas dans la liste d'arguments d'une fonction connue.

### Algorithme

#### 1. Validation du caret

```dart
if (caretOffset <= 0 || caretOffset > source.length) {
  return null;
}
```

Le caret doit être strictement positif et ne pas dépasser la longueur du source.

#### 2. Parcours des tokens avec une stack de frames

L'algorithme parcourt tous les tokens du `lexerResult` et maintient une **stack** de `_SigFrame`. Chaque frame représente un appel de fonction avec ses parenthèses ouvrantes.

**Structure `_SigFrame`** (classe privée) :

| Champ          | Type      | Description                                          |
|----------------|-----------|------------------------------------------------------|
| `funcName`     | `String?` | Nom de la fonction (extraite du token précédant `(`) |
| `bracketStart` | `int`     | Position de fin du token `(` (offset dans le source) |
| `argIndex`     | `int`     | Index de l'argument courant (0-based)                |

**Règles de parcours :**

- **EOF** : break immédiat
- **`openBracket`** : 
  1. Identifie le token immédiatement précédent
  2. Si c'est un token de type `function` → capture `prev.lexeme` comme `funcName`
  3. Push une nouvelle `_SigFrame` sur la stack avec `argIndex = 0` et `bracketStart = token.end`
- **`closeBracket`** :
  1. Si le caret est à l'intérieur (le début du token `)` est **après ou égal** au caret) → break (arrêt du parcours, la frame courante est la bonne)
  2. Sinon → pop de la stack (on sort de cet appel de fonction)
- **`semicolon`** et stack non vide :
  1. Si le `;` est **avant** le caret → incrémente `argIndex` de la frame au sommet de la stack
  2. Si le `;` est après le caret → ignoré (le caret est avant ce séparateur)

#### 3. Détermination de la frame active

Après le parcours :
- Si la stack est vide → `null` (le caret n'est dans aucun appel de fonction)
- La frame au sommet de la stack est la fonction **la plus imbriquée** contenant le caret
- Vérification : le caret doit être **après** le `bracketStart` de la frame

#### 4. Lookup dans la map des signatures

```dart
final key = funcName.substring(1).toLowerCase(); // strip '$'
final params = bdfdSignatureHints[key];
```

- Le `$` est retiré du nom de fonction
- Le nom est passé en minuscules
- Recherche dans la map statique `bdfdSignatureHints`
- Si non trouvé → `null`

#### 5. Construction du contexte

```dart
return BdfdSignatureContext(
  functionName: funcName,
  parameters: params,
  activeIndex: params.isEmpty ? 0 : frame.argIndex.clamp(0, params.length - 1),
);
```

L'`activeIndex` est clampé entre 0 et `params.length - 1` pour éviter tout dépassement si le nombre d'arguments dépasse le nombre de paramètres déclarés.

---

## `bdfdSignatureHints` — Map des signatures

Map statique constante associant les noms de fonctions (en minuscules, sans `$`) à leurs paramètres ordonnés. Contient **160+ fonctions** organisées par catégories.

### Messages & contenu

| Fonction              | Paramètres                                                                                     |
|-----------------------|------------------------------------------------------------------------------------------------|
| `addbutton`           | `[New row, Button ID/URL, Label, Style, Disabled (opt), Emoji (opt), Message ID (opt)]`       |
| `addcmdreactions`     | `[emoji1, emoji2 (opt), ...]`                                                                  |
| `addfield`            | `[Name, Value, Inline? (opt), Index (opt)]`                                                    |
| `addmessagereactions` | `[messageID, emoji1, emoji2 (opt), ...]`                                                       |
| `addreactions`        | `[emoji1, emoji2 (opt), ...]`                                                                  |
| `addselectmenuoption` | `[Menu option ID, Label, Value, Description, Default (opt), Emoji (opt), Message ID (opt)]`    |
| `addtextinput`        | `[Text Input ID, Style, Label, Min length (opt), Max length (opt), Required (opt), Value (opt), Placeholder (opt)]` |
| `addtimestamp`        | `[timestamp (opt)]`                                                                            |
| `afktimeout`          | `[Guild ID (opt)]`                                                                             |
| `allowmention`        | `[]`                                                                                           |
| `allowrolementions`   | `[roleID1, roleID2 (opt), ...]`                                                                |
| `allowusermentions`   | `[userID1, userID2 (opt), ...]`                                                                |
| `argcount`            | `[Text]`                                                                                       |
| `args`                | `[index]`                                                                                      |
| `argscheck`           | `[condition, errorMessage]`                                                                    |
| `author`              | `[Text, Icon URL (opt), Hyperlink (opt)]`                                                     |
| `authoricon`          | `[Image URL, Index (opt)]`                                                                    |
| `authorurl`           | `[URL, Index (opt)]`                                                                          |
| `authorofmessage`     | `[Channel ID, Message ID]`                                                                    |
| `awaitfunc`           | `[name, userID (opt), channelID (opt)]`                                                       |

### Modération

| Fonction     | Paramètres                         |
|-------------|------------------------------------|
| `ban`        | `[userID, reason (opt)]`           |
| `banid`      | `[userID, reason (opt)]`           |
| `kick`       | `[userID, reason (opt)]`           |
| `kickmention`| `[reason (opt)]`                   |
| `mute`       | `[userID, duration, reason (opt)]` |
| `timeout`    | `[userID, duration, reason (opt)]` |
| `unmute`     | `[userID]`                         |
| `untimeout`  | `[userID]`                         |
| `unban`      | `[userID]`                         |
| `unbanid`    | `[userID]`                         |

### Math

| Fonction      | Paramètres                |
|---------------|---------------------------|
| `calculate`   | `[expression]`            |
| `ceil`        | `[number]`                |
| `divide`      | `[num1, num2]`            |
| `floor`       | `[number]`                |
| `max`         | `[num1, num2]`            |
| `min`         | `[num1, num2]`            |
| `modulo`      | `[num1, num2]`            |
| `multi`       | `[num1, num2]`            |
| `random`      | `[min, max]`              |
| `randomstring`| `[length]`                |
| `round`       | `[number]`                |
| `sort`        | `[values, order (opt)]`   |
| `sqrt`        | `[number]`                |
| `sub`         | `[num1, num2]`            |
| `sum`         | `[num1, num2]`            |

### Variables

| Fonction                | Paramètres                                         |
|-------------------------|---------------------------------------------------|
| `getchannelvar`         | `[name, channelID (opt)]`                         |
| `getguildmembervar`     | `[name, userID (opt), guildID (opt)]`             |
| `getguildvar`           | `[name, guildID (opt)]`                           |
| `getleaderboardposition`| `[varName, userID (opt), type (opt)]`             |
| `getleaderboardvalue`   | `[varName, position, type (opt)]`                 |
| `getmembervar`          | `[name, userID (opt)]`                            |
| `getmessagevar`         | `[name, messageID (opt)]`                         |
| `getservervar`          | `[name, serverID (opt)]`                          |
| `getuservar`            | `[name, userID (opt), guildID (opt)]`             |
| `getvar`                | `[name]`                                          |
| `setchannelvar`         | `[name, value, channelID (opt)]`                  |
| `setguildmembervar`     | `[name, value, userID (opt), guildID (opt)]`      |
| `setguildvar`           | `[name, value, guildID (opt)]`                    |
| `setmembervar`          | `[name, value, userID (opt)]`                     |
| `setmessagevar`         | `[name, value, messageID (opt)]`                  |
| `setservervar`          | `[name, value, serverID (opt)]`                   |
| `setuservar`            | `[name, value, userID (opt), guildID (opt)]`      |
| `setvar`                | `[name, value]`                                   |
| `resetuservar`          | `[name, userID (opt), guildID (opt)]`             |
| `resetchannelvar`       | `[name, channelID (opt)]`                         |
| `resetguildmembervar`   | `[name, userID (opt), guildID (opt)]`             |
| `resetguildvar`         | `[name, guildID (opt)]`                           |
| `resetmembervar`        | `[name, userID (opt)]`                            |
| `resetservervar`        | `[name, serverID (opt)]`                          |
| `var`                   | `[name, value]`                                   |
| `varexists`             | `[name]`                                          |
| `listvar`               | `[Separator]`                                     |
| `variablescount`        | `[Type]`                                          |

### Embed building

| Fonction       | Paramètres                           |
|----------------|--------------------------------------|
| `color`        | `[Color hex, Index (opt)]`           |
| `description`  | `[Message, Index (opt)]`             |
| `embeddedurl`  | `[Link, Index (opt)]`                |
| `footer`       | `[text, index (opt)]`                |
| `footericon`   | `[url]`                              |
| `image`        | `[url]`                              |
| `thumbnail`    | `[url]`                              |
| `title`        | `[text, index (opt)]`                |

### Channels

| Fonction              | Paramètres                                                                                       |
|-----------------------|--------------------------------------------------------------------------------------------------|
| `categorychannels`    | `[Category ID, Separator, Option (opt)]`                                                         |
| `categorycount`       | `[Guild ID (opt)]`                                                                               |
| `categoryid`          | `[Category name]`                                                                                |
| `channelid`           | `[Channel name]`                                                                                 |
| `channelname`         | `[Channel ID (opt)]`                                                                             |
| `channelnames`        | `[Separator (opt), Guild ID (opt)]`                                                              |
| `channelposition`     | `[Channel ID (opt)]`                                                                             |
| `channelsendmessage`  | `[Channel ID, Message, Return Message ID (opt)]`                                                 |
| `channeltopic`        | `[Channel ID (opt)]`                                                                             |
| `channeltype`         | `[Channel ID (opt)]`                                                                             |
| `clear`               | `[count]`                                                                                        |
| `createchannel`       | `[name, type, categoryID (opt)]`                                                                 |
| `deletechannels`      | `[channelID1, channelID2 (opt), ...]`                                                            |
| `deletechannelsbyname`| `[name]`                                                                                         |
| `modifychannel`       | `[channelID, name (opt), topic (opt), nsfw (opt), slowmode (opt), position (opt)]`               |
| `modifychannelperms`  | `[channelID, allow, deny, roleOrUserID]`                                                         |
| `editchannelperms`    | `[channelID, permissions, roleOrUserID]`                                                         |
| `slowmode`            | `[seconds]`                                                                                      |
| `startthread`         | `[name, channelID (opt), messageID (opt), archiveDuration (opt), private (opt)]`                 |
| `threadaddmember`     | `[threadID, userID]`                                                                             |
| `threadremovemember`  | `[threadID, userID]`                                                                             |

### Roles

| Fonction         | Paramètres                                                                   |
|------------------|------------------------------------------------------------------------------|
| `colorrole`      | `[roleID, hexColor]`                                                         |
| `createrole`     | `[name, color (opt), hoisted (opt), mentionable (opt), position (opt)]`      |
| `deleterole`     | `[roleID]`                                                                   |
| `giverole`       | `[userID, roleID]`                                                           |
| `giveroles`      | `[userID, roleID1, roleID2 (opt), ...]`                                      |
| `hasrole`        | `[roleID]`                                                                   |
| `modifyrole`     | `[roleID, name (opt), color (opt), hoisted (opt), mentionable (opt), position (opt)]` |
| `modifyroleperms`| `[roleID, permissions]`                                                      |
| `rolegrant`      | `[userID, roleID, grant (opt)]`                                              |
| `setuserroles`   | `[roleID1, roleID2 (opt), ...]`                                              |
| `takerole`       | `[userID, roleID]`                                                           |
| `takeroles`      | `[userID, roleID1, roleID2 (opt), ...]`                                      |

### Messages

| Fonction           | Paramètres                                                                    |
|--------------------|-------------------------------------------------------------------------------|
| `deletein`         | `[seconds]`                                                                   |
| `deletemessage`    | `[channelID, messageID]`                                                      |
| `dm`               | `[userID, message]`                                                           |
| `editembedin`      | `[time, title (opt), description (opt), footer (opt), color (opt)]`           |
| `editin`           | `[channelID, messageID, content]`                                             |
| `editmessage`      | `[messageID, content]`                                                        |
| `getmessage`       | `[channelID, messageID]`                                                      |
| `mentioned`        | `[index, returnSelf (opt)]`                                                   |
| `mentionedchannels`| `[index]`                                                                     |
| `message`          | `[index (opt)]`                                                               |
| `pinmessage`       | `[messageID (opt)]`                                                           |
| `publishmessage`   | `[messageID (opt)]`                                                           |
| `unpinmessage`     | `[messageID]`                                                                 |
| `reply`            | `[channelID (opt), messageID (opt)]`                                          |
| `replyin`          | `[duration]`                                                                  |
| `repeatmessage`    | `[times, message]`                                                            |
| `sendmessage`      | `[text, returnMessageID (opt)]`                                               |
| `sendembedmessage` | `[channelID, content]`                                                        |
| `tts`              | `[enabled]`                                                                   |

### String / Texte

| Fonction                 | Paramètres                                     |
|--------------------------|------------------------------------------------|
| `charcount`              | `[text]`                                       |
| `contains`               | `[text, substring]`                            |
| `checkcontains`          | `[text, value1, value2 (opt), ...]`            |
| `croptext`               | `[text, maxLength, suffix (opt)]`              |
| `input`                  | `[index]`                                      |
| `joinsplittext`          | `[separator]`                                  |
| `linescount`             | `[text]`                                       |
| `numberseparator`        | `[number, separator (opt)]`                    |
| `randomtext`             | `[option1, option2, ...]`                      |
| `removecontains`         | `[text, substring]`                            |
| `removelinks`            | `[text]`                                       |
| `replacetext`            | `[text, search, replacement]`                  |
| `splittext`              | `[index]`                                      |
| `editsplittext`          | `[index, value]`                               |
| `removesplittextelement` | `[index]`                                      |
| `textsplit`              | `[text, separator]`                            |
| `tolowercase`            | `[text]`                                       |
| `totitlecase`            | `[text]`                                       |
| `touppercase`            | `[text]`                                       |
| `trimspace`              | `[text]`                                       |
| `unescape`               | `[text]`                                       |

### JSON

| Fonction            | Paramètres                    |
|---------------------|-------------------------------|
| `json`              | `[value (opt)]`               |
| `jsonarray`         | `[key, separator (opt)]`      |
| `jsonarrayappend`   | `[key, value]`                |
| `jsonarraycount`    | `[key]`                       |
| `jsonarrayindex`    | `[key, index]`                |
| `jsonarraypop`      | `[key]`                       |
| `jsonarrayreverse`  | `[key]`                       |
| `jsonarrayshift`    | `[key]`                       |
| `jsonarraysort`     | `[key, order (opt)]`          |
| `jsonarrayunshift`  | `[key, value]`                |
| `jsonclear`         | `[]`                          |
| `jsonexists`        | `[key]`                       |
| `jsonjoinarray`     | `[key, separator]`            |
| `jsonparse`         | `[json]`                      |
| `jsonpretty`        | `[indent (opt)]`              |
| `jsonset`           | `[key, value]`                |
| `jsonsetstring`     | `[key, value]`                |
| `jsonstringify`     | `[]`                          |
| `jsonunset`         | `[key]`                       |

### HTTP

| Fonction        | Paramètres                |
|-----------------|---------------------------|
| `httpaddheader` | `[name, value]`           |
| `url`           | `[Mode, Text]`            |
| `httpdelete`    | `[url]`                   |
| `httpget`       | `[url]`                   |
| `httppatch`     | `[url, body (opt)]`       |
| `httppost`      | `[url, body (opt)]`       |
| `httpput`       | `[url, body (opt)]`       |
| `httpresult`    | `[key (opt)]`             |

### Control flow

| Fonction               | Paramètres                                          |
|------------------------|-----------------------------------------------------|
| `and`                  | `[Conditions, ...]`                                 |
| `c`                    | `[Comment]`                                         |
| `or`                   | `[Conditions, ...]`                                 |
| `if`                   | `[condition]`                                       |
| `elseif`               | `[condition]`                                       |
| `enabled`              | `[Enabled, Error message (opt)]`                    |
| `enabledecimals`       | `[Enable?]`                                         |
| `onlyif`               | `[value1, operator, value2, errorMessage (opt)]`    |
| `checkcondition`       | `[condition, trueValue, falseValue]`                |
| `checkuserperms`       | `[permission, errorMessage (opt)]`                  |
| `checkusersperms`      | `[userID, permission, errorMessage (opt)]`          |
| `cooldown`             | `[duration, errorMessage (opt)]`                    |
| `globalcooldown`       | `[duration, errorMessage (opt)]`                    |
| `servercooldown`       | `[duration, errorMessage (opt)]`                    |
| `equals`               | `[value1, value2]`                                  |
| `eval`                 | `[code]`                                            |
| `for`                  | `[iterations OR init;condition;update]`             |
| `loop`                 | `[iterations OR init;condition;update]`             |
| `suppresserrors`       | `[message (opt)]`                                   |
| `embedsuppresserrors`  | `[message (opt)]`                                   |
| `callworkflow`         | `[name, args (opt)]`                                |
| `workflowresponse`     | `[value (opt)]`                                     |

### Select menus

| Fonction                | Paramètres                                                                                    |
|-------------------------|-----------------------------------------------------------------------------------------------|
| `newselectmenu`         | `[Menu ID, Min, Max, Placeholder (opt), Message ID (opt)]`                                    |
| `editselectmenu`        | `[Menu ID, Min, Max, Placeholder (opt), Message ID (opt)]`                                    |
| `editselectmenuoption`  | `[Menu option ID, Label, Value, Description, Default (opt), Emoji (opt), Message ID (opt)]`   |
| `editbutton`            | `[Button ID/URL, Label, Style, Disabled (opt), Emoji (opt), Message ID (opt)]`                |
| `removecomponent`       | `[id]`                                                                                        |

### Modals

| Fonction   | Paramètres       |
|------------|------------------|
| `newmodal` | `[id, title]`    |

### Tickets

| Fonction     | Paramètres                          |
|-------------|-------------------------------------|
| `newticket`  | `[subject (opt), channelName (opt)]`|
| `closeticket`| `[]`                                |

### Leaderboards

| Fonction                 | Paramètres                                            |
|--------------------------|-------------------------------------------------------|
| `globaluserleaderboard`  | `[varName, type (opt), page (opt), separator (opt)]`  |
| `serverleaderboard`      | `[varName, type (opt), page (opt), separator (opt)]`  |
| `userleaderboard`        | `[varName, type (opt), page (opt), separator (opt)]`  |

### Autres (CV2, containers, galleries, etc.)

| Fonction                    | Paramètres                                                                                         |
|-----------------------------|----------------------------------------------------------------------------------------------------|
| `addactionrow`              | `[ID, Container ID (opt)]`                                                                         |
| `addbuttoncv2`              | `[Button ID/URL, Label, Style, Disabled, Emoji, Action Row ID / Section ID]`                      |
| `addcontainer`              | `[ID, Color (opt), Spoiler (opt)]`                                                                 |
| `addmediagallery`           | `[ID, Container ID (opt)]`                                                                         |
| `addmediagalleryitem`       | `[Media URL, Description, Spoiler, Gallery ID]`                                                    |
| `addmentionableselect`      | `[Select Menu ID, Placeholder, Min Values, Max Values, Disabled, Action Row ID]`                  |
| `addroleselect`             | `[Select Menu ID, Placeholder, Min Values, Max Values, Disabled, Action Row ID]`                  |
| `addsection`                | `[ID, Container ID (opt)]`                                                                         |
| `addseparator`              | `[Divider (opt), Spacing (opt), Container ID (opt)]`                                              |
| `addtextdisplay`            | `[Content, Container/Section ID (opt)]`                                                            |
| `addthumbnail`              | `[Image URL, Image description, Spoiler, Section ID]`                                             |
| `adduserselect`             | `[Select Menu ID, Placeholder, Min Values, Max Values, Disabled, Action Row ID]`                  |
| `addchannelselect`          | `[Select Menu ID, Placeholder, Min Values, Max Values, Disabled, Action Row ID, Channel Types (opt)]` |
| `addemoji`                  | `[Name, Image URL, Return emoji (opt)]`                                                            |
| `addstringselect`           | `[Select Menu ID, Placeholder, Min Values, Max Values, Disabled, Action Row ID]`                  |
| `addstringselectoption`     | `[Label, Value, Description, Emoji, Default, Select Menu ID]`                                     |
| `boostcount`                | `[Guild ID (opt)]`                                                                                 |
| `botcommands`               | `[Separator (opt)]`                                                                                |
| `botleave`                  | `[Guild ID (opt)]`                                                                                 |
| `botlistdescription`        | `[Text]`                                                                                           |
| `bottyping`                 | `[]`                                                                                               |
| `bytecount`                 | `[text]`                                                                                           |
| `changecooldowntime`        | `[type, commandName, duration]`                                                                    |
| `changeusername`            | `[newName]`                                                                                        |
| `changeusernamewithid`      | `[userID, newName]`                                                                                |
| `customemoji`               | `[nameOrID]`                                                                                       |
| `defer`                     | `[ephemeral (opt)]`                                                                                |
| `deletecommand`             | `[]`                                                                                               |
| `ephemeral`                 | `[]`                                                                                               |
| `findchannel`               | `[name]`                                                                                           |
| `finduser`                  | `[nameOrID]`                                                                                       |
| `findrole`                  | `[nameOrID]`                                                                                       |
| `getattachments`            | `[index (opt)]`                                                                                    |
| `getbanreason`              | `[userID]`                                                                                         |
| `getchannelselectchannelid` | `[Index]`                                                                                          |
| `getchannelselectchannelids`| `[Separator, Limit (opt)]`                                                                         |
| `getcooldown`               | `[type, commandName]`                                                                              |
| `getembeddata`              | `[messageID, field]`                                                                               |
| `getmentionableselectuserid`| `[Index]`                                                                                          |
| `getmentionableselectuserids`| `[Separator, Limit (opt)]`                                                                        |
| `getreactions`              | `[channelID, messageID, emoji]`                                                                    |
| `getrolecolor`              | `[roleID]`                                                                                         |
| `getroleselectroleid`       | `[Index]`                                                                                          |
| `getroleselectroleids`      | `[Separator, Limit (opt)]`                                                                         |
| `getstringselectvalue`      | `[Index]`                                                                                          |
| `getstringselectvalues`     | `[Separator, Limit (opt)]`                                                                         |
| `gettextsplitindex`         | `[value]`                                                                                          |
| `getuserselectuserid`       | `[Index]`                                                                                          |
| `getuserselectuserids`      | `[Separator, Limit (opt)]`                                                                         |
| `ignorechannels`            | `[channelID1, channelID2 (opt), ...]`                                                              |
| `isboolean`                 | `[value]`                                                                                          |
| `isinteger`                 | `[value]`                                                                                          |
| `isnumber`                  | `[value]`                                                                                          |
| `isvalidhex`                | `[value]`                                                                                          |
| `isbanned`                  | `[userID]`                                                                                         |
| `ismentioned`               | `[userID]`                                                                                         |
| `log`                       | `[Log message, Log level (opt)]`                                                                   |
| `onlyadmin`                 | `[errorMessage (opt)]`                                                                             |
| `onlybotchannelperms`       | `[permission, errorMessage (opt)]`                                                                 |
| `onlybotperms`              | `[permission, errorMessage (opt)]`                                                                 |
| `onlyforcategories`         | `[categoryID1, categoryID2 (opt), ...]`                                                            |
| `onlyforchannels`           | `[channelID1, channelID2 (opt), ...]`                                                              |
| `onlyforids`                | `[userID1, userID2 (opt), ...]`                                                                    |
| `onlyforroleids`            | `[roleID1, roleID2 (opt), ...]`                                                                    |
| `onlyforroles`              | `[roleName1, roleName2 (opt), ...]`                                                                |
| `onlyforservers`            | `[serverID1, serverID2 (opt), ...]`                                                                |
| `onlyforusers`              | `[userID1, userID2 (opt), ...]`                                                                    |
| `onlyifmessagecontains`     | `[substring, errorMessage (opt)]`                                                                  |
| `onlynsfw`                  | `[errorMessage (opt)]`                                                                             |
| `onlyperms`                 | `[permission, errorMessage (opt)]`                                                                 |
| `removeallcomponents`       | `[]`                                                                                               |
| `removebuttons`             | `[]`                                                                                               |
| `removeemoji`               | `[nameOrID]`                                                                                       |
| `usechannel`                | `[channelID]`                                                                                      |
| `userreacted`               | `[channelID, messageID, emoji]`                                                                    |
| `userswithrole`             | `[roleID]`                                                                                         |
| `webhookcreate`             | `[channelID, name, avatar (opt)]`                                                                  |
| `webhookdelete`             | `[webhookID]`                                                                                      |
| `webhooksend`               | `[webhookID, content]`                                                                             |
| `webhookavatarurl`          | `[webhookID]`                                                                                      |
| `webhookcolor`              | `[hexColor]`                                                                                       |
| `webhookcontent`            | `[text]`                                                                                           |
| `webhookdescription`        | `[text]`                                                                                           |
| `webhookfooter`             | `[text, iconURL (opt)]`                                                                            |
| `webhooktitle`              | `[text]`                                                                                           |
| `webhookusername`           | `[name]`                                                                                           |
| `blacklistids`              | `[userID1, userID2 (opt), ...]`                                                                    |
| `blacklistroleids`          | `[roleID1, roleID2 (opt), ...]`                                                                    |
| `blacklistroles`            | `[roleName1, roleName2 (opt), ...]`                                                                |
| `blacklistrolesids`         | `[roleID1, roleID2 (opt), ...]`                                                                    |
| `blacklistservers`          | `[serverID1, serverID2 (opt), ...]`                                                                |
| `blacklistusers`            | `[userID1, userID2 (opt), ...]`                                                                    |
| `clearreactions`            | `[messageID (opt), emoji (opt)]`                                                                   |
| `roleinfo`                  | `[roleID]`                                                                                         |
| `roleid`                    | `[roleName]`                                                                                       |
| `rolename`                  | `[roleID]`                                                                                         |
| `roleperms`                 | `[roleID]`                                                                                         |
| `roleposition`              | `[roleID]`                                                                                         |
| `roleexists`                | `[roleID]`                                                                                         |
| `channelexists`             | `[channelID]`                                                                                      |
| `channelidfromname`         | `[Channel name]`                                                                                   |
| `emojicount`                | `[guildID (opt)]`                                                                                  |
| `emojiexists`               | `[nameOrID]`                                                                                       |
| `emojiname`                 | `[emojiID]`                                                                                        |
| `emotecount`                | `[guildID (opt)]`                                                                                  |
| `getinviteinfo`             | `[inviteCode, field]`                                                                              |
| `getserverinvite`           | `[guildID (opt)]`                                                                                  |
| `guildexists`               | `[guildID]`                                                                                        |
| `hostingexpiretime`         | `[format (opt)]`                                                                                   |
| `isbooster`                 | `[userID (opt)]`                                                                                   |
| `isbot`                     | `[userID (opt)]`                                                                                   |
| `isemojianimated`           | `[nameOrID]`                                                                                       |
| `ishoisted`                 | `[roleID]`                                                                                         |
| `ismentionable`             | `[roleID]`                                                                                         |
| `isnsfw`                    | `[channelID (opt)]`                                                                                |
| `ismessageedited`           | `[channelID, messageID]`                                                                           |
| `istimedout`                | `[userID (opt)]`                                                                                   |
| `memberid`                  | `[index (opt)]`                                                                                    |
| `membernick`                | `[userID (opt)]`                                                                                   |
| `discriminator`             | `[User ID (opt)]`                                                                                  |
| `displayname`               | `[userID (opt)]`                                                                                   |
| `displayName`               | `[userID (opt)]`                                                                                   |
| `dmchannelid`               | `[User ID (opt)]`                                                                                  |
| `stickercount`              | `[guildID (opt)]`                                                                                  |
| `userexists`                | `[userID]`                                                                                         |
| `userinfo`                  | `[userID (opt), field]`                                                                            |
| `serverinfo`                | `[guildID (opt), field]`                                                                           |
| `creationdate`              | `[snowflakeID, format (opt)]`                                                                      |
| `date`                      | `[format (opt), timezone (opt)]`                                                                   |
| `usersinchannel`            | `[channelID (opt), separator (opt)]`                                                               |
| `voiceuserlimit`            | `[channelID]`                                                                                      |
| `userjoined`                | `[userID (opt), format (opt)]`                                                                     |
| `userjoineddiscord`         | `[userID (opt), format (opt)]`                                                                     |
| `suppresserrorlogging`      | `[]`                                                                                               |

---

## Gestion des fonctions sans arguments

Certaines fonctions comme `allowmention`, `bottyping`, `deletecommand`, `ephemeral`, `removeallcomponents`, `removebuttons`, `closeticket` et `suppresserrorlogging` ont une liste vide `[]`. Pour ces fonctions :

- Le `BdfdSignatureContext` retourné aura `parameters: []` et `activeIndex: 0`
- Cela signifie « fonction reconnue mais sans paramètres attendus »

---

## Cas particuliers

### Fonctions avec variante de casse

La fonction `displayName` existe en deux entrées distinctes dans la map :

```dart
'displayname': ['userID (opt)'],
'displayName': ['userID (opt)'],
```

Cela garantit que la recherche insensible à la casse (`toLowerCase()`) fonctionne pour `displayname` tandis que la variante camelCase est également supportée.

### Fonctions à paramètres variadiques

Plusieurs fonctions acceptent un nombre variable d'arguments, indiqué par `...` comme dernier paramètre :

- `addcmdreactions` : `[emoji1, emoji2 (opt), ...]`
- `onlyforids` : `[userID1, userID2 (opt), ...]`
- `blacklistids` : `[userID1, userID2 (opt), ...]`

L'`activeIndex` sera clampé à `params.length - 1` pour ces fonctions, l'utilisateur verra donc le dernier paramètre `...` comme actif pour tous les arguments au-delà.

---

## Intégration dans l'éditeur

Le flux complet dans l'éditeur BDFD :

1. L'utilisateur tape `$addField[Name;|` (curseur après le `;`)
2. Le source est parsé par le lexer → `lexerResult`
3. `bdfdSignatureContextAt(source, caretOffset, lexerResult)` est appelé
4. L'algorithme identifie la frame `$addField` avec `argIndex = 1`
5. Lookup → `['Name', 'Value', 'Inline? (opt)', 'Index (opt)']`
6. Retour : `BdfdSignatureContext(functionName: '$addField', parameters: [...], activeIndex: 1)`
7. L'UI affiche : `$addField[Name, ▸Value◂, Inline? (opt), Index (opt)]`
