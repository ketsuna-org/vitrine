#!/usr/bin/env python3
"""
Translate BDFD documentation files from French to English.
Handles structural translations and common French patterns.
"""
import re, os, sys

DOCS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '')

# Structural substitutions (applied line by line)
STRUCTURAL = {
    '## Syntaxe': '## Syntax',
    '## Paramètres': '## Parameters',  
    '## Retourne': '## Returns',
    '## Exemples': '## Examples',
    '## Fonctions liées': '## Related Functions',
    '## Valeur de retour': '## Return Value',
    '## Comportement': '## Behavior',
    '## Utilisation': '## Usage',
    '## Propriétés disponibles': '## Available properties',
    '## Interprétation': '## Interpretation',
    '| Paramètre | Obligatoire | Défaut | Description |': '| Parameter | Required | Default | Description |',
    '| Paramètre | Type | Description |': '| Parameter | Type | Description |',
    '| Paramètre | Obligatoire | Description |': '| Parameter | Required | Description |',
    '| Paramètre | Description |': '| Parameter | Description |',
    '|---|---|---|': '|---|---|---|',
    '| Propriété | Description | Équivalent |': '| Property | Description | Equivalent |',
    '|-----------|------|-------------|': '|-----------|------|-------------|',
}

# Line-based text substitutions (order matters - process longest first)
FR_TO_EN = [
    # -----------------------------------------------------------------------
    # Frontmatter description patterns
    # -----------------------------------------------------------------------
    ("description: Fonction guard qui arrête l'exécution si le channel courant n'appartient pas à l'une des catégories spécifiées.",
     "description: Guard function that stops execution if the current channel does not belong to one of the specified categories."),

    ("description: Fonction guard qui arrête l'exécution si la commande n'est pas exécutée dans l'un des channels spécifiés.",
     "description: Guard function that stops execution if the command is not executed in one of the specified channels."),

    ("description: Fonction guard qui arrête l'exécution si l'ID de l'utilisateur n'est pas dans la liste autorisée.",
     "description: Guard function that stops execution if the user ID is not in the allowed list."),

    ("description: Fonction guard qui arrête l'exécution si l'utilisateur n'a pas l'un des roles spécifiés (par ID).",
     "description: Guard function that stops execution if the user does not have one of the specified roles (by ID)."),

    ("description: Fonction guard qui arrête l'exécution si l'utilisateur n'a pas l'un des roles spécifiés (par nom).",
     "description: Guard function that stops execution if the user does not have one of the specified roles (by name)."),

    ("description: Fonction guard qui arrête l'exécution si la commande n'est pas exécutée dans l'un des serveurs spécifiés.",
     "description: Guard function that stops execution if the command is not executed in one of the specified servers."),

    ("description: Fonction guard qui arrête l'exécution si l'utilisateur n'est pas dans la liste autorisée.",
     "description: Guard function that stops execution if the user is not in the allowed list."),

    ("description: Fonction guard qui arrête l'exécution si le channel courant n'est pas NSFW.",
     "description: Guard function that stops execution if the current channel is not NSFW."),

    ("description: Fonction guard qui arrête l'exécution si l'utilisateur n'a pas les permissions spécifiées.",
     "description: Guard function that stops execution if the user does not have the specified permissions."),

    ("description: Fonction guard qui arrête l'exécution si l'utilisateur a activé l'option de désinscription.",
     "description: Guard function that stops execution if the user has enabled the opt-out option."),

    ("description: Retourne la latence WebSocket du bot en millisecondes.",
     "description: Returns the bot WebSocket latency in milliseconds."),

    ("description: Génère un nombre entier aléatoire entre min et max (inclus). La valeur est évaluée au compile-time uniquement.",
     "description: Generates a random integer between min and max (inclusive). The value is evaluated at compile-time only."),

    # -----------------------------------------------------------------------
    # H1 Title translation patterns (after $functionName)
    # -----------------------------------------------------------------------
    ("# $onlyForCategories\n", "# $onlyForCategories\n"),
    ("# $onlyForChannels\n", "# $onlyForChannels\n"),

    # -----------------------------------------------------------------------
    # Common sentence starters
    # -----------------------------------------------------------------------
    ("La fonction guard `$onlyForCategories` vérifie que le channel où la commande est exécutée appartient à l'une des catégories Discord spécifiées. Si le channel ne fait pas partie des catégories autorisées, la commande est interrompue.",
     "The guard function `$onlyForCategories` checks that the channel where the command is executed belongs to one of the specified Discord categories. If the channel is not part of the authorized categories, the command is interrupted."),

    ("La fonction guard `$onlyForChannels` limite l'exécution d'une commande à un ou plusieurs channels Discord spécifiques. Si la commande est exécutée ailleurs, elle est interrompue.",
     "The guard function `$onlyForChannels` restricts command execution to one or more specific Discord channels. If the command is executed elsewhere, it is interrupted."),

    # -----------------------------------------------------------------------
    # Specific long paragraphs (translated as whole blocks)
    # -----------------------------------------------------------------------
    # These are generic patterns that should match many files
]

def apply_translations(line):
    """Apply French-to-English translations to a single line."""
    result = line
    
    # First apply structural translations
    for fr, en in STRUCTURAL.items():
        if result.strip() == fr or result.strip().startswith(fr):
            result = result.replace(fr, en, 1)
    
    # Apply exact matches
    for fr, en in FR_TO_EN:
        if fr in result:
            result = result.replace(fr, en)
    
    return result


def apply_regex_translations(text):
    """Apply regex-based translations to the full text (not line-by-line)."""
    
    # Section headers
    text = re.sub(r'^## Syntaxe\s*$', '## Syntax', text, flags=re.MULTILINE)
    text = re.sub(r'^## Paramètres\s*$', '## Parameters', text, flags=re.MULTILINE)
    text = re.sub(r'^## Retourne\s*$', '## Returns', text, flags=re.MULTILINE)
    text = re.sub(r'^## Exemples\s*$', '## Examples', text, flags=re.MULTILINE)
    text = re.sub(r'^## Fonctions liées\s*$', '## Related Functions', text, flags=re.MULTILINE)
    text = re.sub(r'^## Valeur de retour\s*$', '## Return Value', text, flags=re.MULTILINE)
    text = re.sub(r'^## Comportement\s*$', '## Behavior', text, flags=re.MULTILINE)
    text = re.sub(r'^## Utilisation\s*$', '## Usage', text, flags=re.MULTILINE)
    text = re.sub(r'^## Propriétés disponibles\s*$', '## Available properties', text, flags=re.MULTILINE)
    text = re.sub(r'^## Interprétation\s*$', '## Interpretation', text, flags=re.MULTILINE)
    
    # Table headers
    text = re.sub(r'\| Paramètre \| Obligatoire \| Défaut \| Description \|',
                  '| Parameter | Required | Default | Description |', text)
    text = re.sub(r'\| Paramètre \| Type \| Description \|',
                  '| Parameter | Type | Description |', text)
    text = re.sub(r'\| Paramètre \| Obligatoire \| Description \|',
                  '| Parameter | Required | Description |', text)
    text = re.sub(r'\| Paramètre \| Description \|',
                  '| Parameter | Description |', text)
    text = re.sub(r'\| Propriété \| Description \| Équivalent \|',
                  '| Property | Description | Equivalent |', text)
    
    # Table cell values
    text = re.sub(r'\| Non \|', '| No |', text)
    text = re.sub(r'\| Oui \|', '| Yes |', text)
    
    # Frontmatter description
    text = re.sub(r'^description: (.+)$', lambda m: 'description: ' + translate_sentence(m.group(1)), text, flags=re.MULTILINE)
    
    # H1 title after $functionName
    text = re.sub(r'^(# \$[^\n]+) — (.+)$', r'\1 — ' + 'EN_PLACEHOLDER', text, flags=re.MULTILINE)
    
    # Common French patterns
    text = re.sub(r'La fonction `([^`]+)` retourne (.+?)\.', r'The `\1` function returns \2.', text)
    text = re.sub(r'La fonction `([^`]+)` génère (.+?)\.', r'The `\1` function generates \2.', text)
    text = re.sub(r'La fonction `([^`]+)` envoie (.+?)\.', r'The `\1` function sends \2.', text)
    text = re.sub(r'La fonction `([^`]+)` permet (.+?)\.', r'The `\1` function allows \2.', text)
    text = re.sub(r'La fonction `([^`]+)` récupère (.+?)\.', r'The `\1` function retrieves \2.', text)
    text = re.sub(r'La fonction `([^`]+)` crée (.+?)\.', r'The `\1` function creates \2.', text)
    text = re.sub(r'La fonction `([^`]+)` supprime (.+?)\.', r'The `\1` function deletes \2.', text)
    text = re.sub(r'La fonction `([^`]+)` vérifie (.+?)\.', r'The `\1` function checks \2.', text)
    text = re.sub(r'La fonction `([^`]+)` modifie (.+?)\.', r'The `\1` function modifies \2.', text)
    text = re.sub(r'La fonction `([^`]+)` exécute (.+?)\.', r'The `\1` function executes \2.', text)
    text = re.sub(r'La fonction `([^`]+)` ajoute (.+?)\.', r'The `\1` function adds \2.', text)
    text = re.sub(r'La fonction `([^`]+)` convertit (.+?)\.', r'The `\1` function converts \2.', text)
    text = re.sub(r'La fonction `([^`]+)` calcule (.+?)\.', r'The `\1` function calculates \2.', text)
    text = re.sub(r'La fonction `([^`]+)` lit (.+?)\.', r'The `\1` function reads \2.', text)
    text = re.sub(r'La fonction guard `([^`]+)` vérifie que (.+?)\.', r'The guard function `\1` checks that \2.', text)
    text = re.sub(r'La fonction guard `([^`]+)` limite (.+?)\.', r'The guard function `\1` restricts \2.', text)
    text = re.sub(r'La fonction guard `([^`]+)` arrête (.+?)\.', r'The guard function `\1` stops \2.', text)
    text = re.sub(r'La fonction guard `([^`]+)` empêche (.+?)\.', r'The guard function `\1` prevents \2.', text)
    
    # `$xxx` est une fonction qui...
    text = re.sub(r'`([^`]+)` est une fonction (.+?)\.', r'`\1` is a function \2.', text)
    text = re.sub(r'`([^`]+)` permet (.+?)\.', r'`\1` allows \2.', text)
    
    # Common verb patterns
    text = re.sub(r'\bretourne la\b', 'returns the', text)
    text = re.sub(r'\bretourne le\b', 'returns the', text)
    text = re.sub(r"\bretourne l'\b", "returns the ", text)
    text = re.sub(r'\bRetourne la\b', 'Returns the', text)
    text = re.sub(r'\bRetourne le\b', 'Returns the', text)
    text = re.sub(r"\bRetourne l'\b", "Returns the ", text)
    text = re.sub(r'\bretourne un\b', 'returns a', text)
    text = re.sub(r'\bretourne une\b', 'returns a', text)
    text = re.sub(r'\brenvoie la\b', 'returns the', text)
    text = re.sub(r'\brenvoie le\b', 'returns the', text)
    text = re.sub(r'\brenvoie un\b', 'returns a', text)
    text = re.sub(r'\brenvoie une\b', 'returns a', text)
    
    # Common nouns/phrases
    text = re.sub(r'\bla commande est interrompue\b', 'the command is interrupted', text)
    text = re.sub(r'\bla commande continue normalement\b', 'the command continues normally', text)
    text = re.sub(r'\bla commande continue\b', 'the command continues', text)
    text = re.sub(r'\bla commande sera\b', 'the command will be', text)
    text = re.sub(r"\bl'exécution d'une commande\b", "the execution of a command", text)
    text = re.sub(r"\bl'exécution de la commande\b", "the execution of the command", text)
    text = re.sub(r"\bd'une commande\b", "of a command", text)
    text = re.sub(r'\bLa commande\b', 'The command', text)
    text = re.sub(r'\bla commande\b', 'the command', text)
    text = re.sub(r'\bune commande\b', 'a command', text)
    
    text = re.sub(r'\ble channel courant\b', 'the current channel', text)
    text = re.sub(r'\bdu channel courant\b', 'of the current channel', text)
    text = re.sub(r'\bau channel courant\b', 'to the current channel', text)
    text = re.sub(r'\bdans le channel courant\b', 'in the current channel', text)
    text = re.sub(r'\bdans un canal spécifique\b', 'in a specific channel', text)
    text = re.sub(r'\bdans un canal Discord\b', 'in a Discord channel', text)
    text = re.sub(r'\bdans un canal\b', 'in a channel', text)
    text = re.sub(r'\bdans le canal\b', 'in the channel', text)
    text = re.sub(r'\bdans les salons\b', 'in the channels', text)
    text = re.sub(r'\bdans le salon\b', 'in the channel', text)
    
    text = re.sub(r'\ble serveur courant\b', 'the current server', text)
    text = re.sub(r'\bdu serveur courant\b', 'of the current server', text)
    text = re.sub(r'\bsur le serveur\b', 'on the server', text)
    text = re.sub(r'\bdu serveur\b', 'of the server', text)
    
    text = re.sub(r"\bl'utilisateur courant\b", "the current user", text)
    text = re.sub(r"\bl'utilisateur spécifié\b", "the specified user", text)
    text = re.sub(r"\bl'utilisateur exécutant\b", "the user executing", text)
    text = re.sub(r"\bde l'utilisateur\b", "of the user", text)
    text = re.sub(r"\bpar l'utilisateur\b", "by the user", text)
    text = re.sub(r'\bchaque utilisateur\b', 'each user', text)
    text = re.sub(r'\bun utilisateur\b', 'a user', text)
    text = re.sub(r'\bles utilisateurs\b', 'users', text)
    
    text = re.sub(r'\ble message courant\b', 'the current message', text)
    text = re.sub(r'\bdu message courant\b', 'of the current message', text)
    text = re.sub(r'\bdu message\b', 'of the message', text)
    text = re.sub(r'\bun message\b', 'a message', text)
    text = re.sub(r'\ble message\b', 'the message', text)
    text = re.sub(r'\bce message\b', 'this message', text)
    text = re.sub(r'\bles messages\b', 'messages', text)
    
    text = re.sub(r'\ble rôle spécifié\b', 'the specified role', text)
    text = re.sub(r'\bdu rôle\b', 'of the role', text)
    text = re.sub(r'\bun rôle\b', 'a role', text)
    text = re.sub(r'\bles rôles\b', 'roles', text)
    text = re.sub(r'\bdes rôles\b', 'roles', text)
    
    # Other common words
    text = re.sub(r"\bl'ID du\b", "the ID of the", text)
    text = re.sub(r"\bl'ID de la\b", "the ID of the", text)
    text = re.sub(r"\bl'ID de l'\b", "the ID of the", text)
    
    text = re.sub(r'\bla liste fournie\b', 'the provided list', text)
    text = re.sub(r'\bla liste autorisée\b', 'the allowed list', text)
    text = re.sub(r'\bla liste spécifiée\b', 'the specified list', text)
    text = re.sub(r'\bla liste\b', 'the list', text)
    
    # Optional/required
    text = re.sub(r'\(optionnel\)', '(optional)', text)
    text = re.sub(r'\(Optionnel\)', '(Optional)', text)
    text = re.sub(r'\(obligatoire\)', '(required)', text)
    text = re.sub(r'\(Obligatoire\)', '(Required)', text)
    
    # Time units
    text = re.sub(r'\ben millisecondes\b', 'in milliseconds', text)
    text = re.sub(r'\ben secondes\b', 'in seconds', text)
    text = re.sub(r'\ben minutes\b', 'in minutes', text)
    text = re.sub(r'\ben heures\b', 'in hours', text)
    text = re.sub(r'\ben jours\b', 'in days', text)
    text = re.sub(r'\ben octets\b', 'in bytes', text)
    
    # Formatted strings
    text = re.sub(r'\bexprimée en\b', 'expressed in', text)
    text = re.sub(r'\bexprimé en\b', 'expressed in', text)
    
    # Includes/exclusive
    text = re.sub(r'\bsont incluses\b', 'are inclusive', text)
    text = re.sub(r'\bsont inclus\b', 'are inclusive', text)
    text = re.sub(r'\best incluse\b', 'is inclusive', text)
    text = re.sub(r'\best inclus\b', 'is inclusive', text)
    text = re.sub(r'\bbornes incluses\b', 'inclusive bounds', text)
    
    # No parameters
    text = re.sub(r'\bne prend aucun paramètre\b', 'takes no parameters', text)
    text = re.sub(r'\bne prend pas de paramètres\b', 'takes no parameters', text)
    text = re.sub(r'\bprend un paramètre\b', 'takes a parameter', text)
    text = re.sub(r'\bprend deux paramètres\b', 'takes two parameters', text)
    
    # sous forme de
    text = re.sub(r'\bsous forme de chaîne de caractères\b', 'as a string', text)
    text = re.sub(r'\bsous forme de chaîne\b', 'as a string', text)
    
    # Misc common
    text = re.sub(r'\bsans argument\b', 'without arguments', text)
    text = re.sub(r'\bSans argument\b', 'Without arguments', text)
    text = re.sub(r'\bavec un nom de propriété\b', 'with a property name', text)
    text = re.sub(r'\bpar défaut\b', 'by default', text)
    text = re.sub(r'\bPar défaut\b', 'By default', text)
    text = re.sub(r'\bc\'est-à-dire\b', 'i.e.', text)
    text = re.sub(r'\bpar exemple\b', 'for example', text)
    text = re.sub(r'\bPar exemple\b', 'For example', text)
    
    text = re.sub(r'\btout le texte après\b', 'all text after', text)
    text = re.sub(r'\bpendant la durée\b', 'for the duration', text)
    text = re.sub(r'\bdepuis la création\b', 'since creation', text)
    text = re.sub(r'\bà partir de\b', 'from', text)
    text = re.sub(r'\bjusqu\'à\b', 'until', text)
    
    text = re.sub(r'\bdans le cas contraire\b', 'otherwise', text)
    text = re.sub(r'\bdans le cas où\b', 'in the case where', text)
    text = re.sub(r'\bdans ce cas\b', 'in this case', text)
    
    # Important notes
    text = re.sub(r'\*\*Important :\*\*', '**Important:**', text)
    text = re.sub(r'\*\*Note :\*\*', '**Note:**', text)
    text = re.sub(r'> \*\*Note :\*\*', '> **Note:**', text)
    
    # mode développeur
    text = re.sub(r'Mode Développeur', 'Developer Mode', text)
    text = re.sub(r'mode développeur', 'developer mode', text)
    
    # Utility words
    text = re.sub(r'\butile pour\b', 'useful for', text)
    text = re.sub(r'\butilisez\b', 'use', text)
    text = re.sub(r'\bUtilisez\b', 'Use', text)
    text = re.sub(r'\bcombinez avec\b', 'combine with', text)
    text = re.sub(r'\bCombinez avec\b', 'Combine with', text)
    text = re.sub(r'\bpréférez\b', 'prefer', text)
    text = re.sub(r'\bPréférez\b', 'Prefer', text)
    
    # Comparatives
    text = re.sub(r'\bplus large que\b', 'broader than', text)
    text = re.sub(r'\bplus rapide que\b', 'faster than', text)
    text = re.sub(r'\bplus lent que\b', 'slower than', text)
    text = re.sub(r'\bplus précis\b', 'more precise', text)
    text = re.sub(r'\bplus efficace\b', 'more efficient', text)
    
    # faire attention
    text = re.sub(r'\bfaire attention\b', 'be careful', text)
    text = re.sub(r'\bAttention :\b', 'Caution:', text)
    text = re.sub(r'\bAttention !\b', 'Warning!', text)
    
    # est disponible / n'est pas disponible
    text = re.sub(r"\bn'est pas disponible\b", 'is not available', text)
    text = re.sub(r'\bne sont pas disponibles\b', 'are not available', text)
    text = re.sub(r'\best disponible\b', 'is available', text)
    text = re.sub(r'\bsont disponibles\b', 'are available', text)
    
    # est équivalent / identique
    text = re.sub(r'\best identique à\b', 'is identical to', text)
    text = re.sub(r'\best équivalent à\b', 'is equivalent to', text)
    
    # recommandé / déconseillé
    text = re.sub(r'\best recommandé\b', 'is recommended', text)
    text = re.sub(r'\best déconseillé\b', 'is not recommended', text)
    
    # modal / dialog
    text = re.sub(r'\baffiche une modale\b', 'displays a modal', text)
    text = re.sub(r'\bcrée une modale\b', 'creates a modal', text)
    
    # erreur
    text = re.sub(r'\baffiche une erreur\b', 'displays an error', text)
    text = re.sub(r'\bgénère une erreur\b', 'generates an error', text)
    
    # Variables
    text = re.sub(r'\bvariable temporaire\b', 'temporary variable', text)
    text = re.sub(r'\bvariable globale\b', 'global variable', text)
    text = re.sub(r'\bvariable utilisateur\b', 'user variable', text)
    text = re.sub(r'\bvariable de serveur\b', 'server variable', text)
    text = re.sub(r'\bvariable de channel\b', 'channel variable', text)
    text = re.sub(r'\bvariable de message\b', 'message variable', text)
    text = re.sub(r'\bvariable de membre\b', 'member variable', text)
    
    # Permissions
    text = re.sub(r'\bpermissions du bot\b', 'bot permissions', text)
    text = re.sub(r'\bpermissions de l\'utilisateur\b', 'user permissions', text)
    text = re.sub(r'\bpermissions du rôle\b', 'role permissions', text)
    text = re.sub(r'\bpermissions du channel\b', 'channel permissions', text)
    
    # Components
    text = re.sub(r'\bbouton interactif\b', 'interactive button', text)
    text = re.sub(r'\bmenu de sélection\b', 'select menu', text)
    text = re.sub(r'\bmenu déroulant\b', 'dropdown menu', text)
    text = re.sub(r'\bchamp de texte\b', 'text field', text)
    text = re.sub(r'\bzone de texte\b', 'text area', text)
    
    # emoji
    text = re.sub(r'\bémoji personnalisé\b', 'custom emoji', text)
    text = re.sub(r'\bémoji animé\b', 'animated emoji', text)
    
    # Numbers / math
    text = re.sub(r'\bnombre aléatoire\b', 'random number', text)
    text = re.sub(r'\bchaîne aléatoire\b', 'random string', text)
    text = re.sub(r'\btexte aléatoire\b', 'random text', text)
    text = re.sub(r'\barrondit le nombre\b', 'rounds the number', text)
    text = re.sub(r'\barrondit à l\'entier\b', 'rounds to the integer', text)
    text = re.sub(r'\bcalcule la racine carrée\b', 'calculates the square root', text)
    text = re.sub(r'\badditionne\b', 'adds', text)
    text = re.sub(r'\bsoustrait\b', 'subtracts', text)
    text = re.sub(r'\bmultiplie\b', 'multiplies', text)
    text = re.sub(r'\bdivise\b', 'divides', text)
    text = re.sub(r'\ble reste de la division\b', 'the remainder of the division', text)
    
    # color
    text = re.sub(r'\bcouleur du rôle\b', 'role color', text)
    text = re.sub(r'\bcouleur hexadécimale\b', 'hexadecimal color', text)
    text = re.sub(r'\bcode couleur\b', 'color code', text)
    
    # date
    text = re.sub(r'\bdate de création\b', 'creation date', text)
    text = re.sub(r'\bdate et heure\b', 'date and time', text)
    text = re.sub(r'\bhorodatage\b', 'timestamp', text)
    
    # Ban/kick
    text = re.sub(r'\bbannit l\'utilisateur\b', 'bans the user', text)
    text = re.sub(r'\bexpulse l\'utilisateur\b', 'kicks the user', text)
    text = re.sub(r'\bdébannit l\'utilisateur\b', 'unbans the user', text)
    
    # Salons / categories
    text = re.sub(r'\bsalon Discord\b', 'Discord channel', text)
    text = re.sub(r'\bsalon textuel\b', 'text channel', text)
    text = re.sub(r'\bsalon vocal\b', 'voice channel', text)
    text = re.sub(r'\bcatégorie Discord\b', 'Discord category', text)
    text = re.sub(r'\bserveur Discord\b', 'Discord server', text)
    
    # Various action verbs
    text = re.sub(r'\bcrée un nouveau\b', 'creates a new', text)
    text = re.sub(r'\bsupprime le\b', 'deletes the', text)
    text = re.sub(r'\bmodifie le\b', 'modifies the', text)
    text = re.sub(r'\bajoute un\b', 'adds a', text)
    text = re.sub(r'\benvoie un\b', 'sends a', text)
    text = re.sub(r'\brécupère le\b', 'retrieves the', text)
    text = re.sub(r'\brécupère la\b', 'retrieves the', text)
    text = re.sub(r'\bvérifie si\b', 'checks if', text)
    text = re.sub(r'\bconvertit le texte\b', 'converts the text', text)
    text = re.sub(r'\bconvertit la chaîne\b', 'converts the string', text)
    
    # HTTP
    text = re.sub(r'\beffectue une requête HTTP\b', 'performs an HTTP request', text)
    text = re.sub(r'\benvoie une requête\b', 'sends a request', text)
    text = re.sub(r'\brécupère le contenu\b', 'retrieves the content', text)
    text = re.sub(r'\bajoute un en-tête HTTP\b', 'adds an HTTP header', text)
    
    # Execution
    text = re.sub(r"\bl'exécution est interrompue\b", "execution is interrupted", text)
    text = re.sub(r"\bl'exécution continue\b", "execution continues", text)
    text = re.sub(r"\bl'exécution du code\b", "code execution", text)
    
    # Condition
    text = re.sub(r'\bsi la condition est vraie\b', 'if the condition is true', text)
    text = re.sub(r'\bsi la condition est fausse\b', 'if the condition is false', text)
    text = re.sub(r'\bla condition est évaluée\b', 'the condition is evaluated', text)
    
    # Function descriptors
    text = re.sub(r'\best une fonction polyvalente qui permet\b', 'is a versatile function that allows', text)
    text = re.sub(r'\best la fonction principale pour\b', 'is the main function for', text)
    text = re.sub(r'\bdans BDFD\b', 'in BDFD', text)
    
    # Send/display verbs
    text = re.sub(r'\best envoyé\b', 'is sent', text)
    text = re.sub(r'\bsont envoyés\b', 'are sent', text)
    text = re.sub(r'\best affiché\b', 'is displayed', text)
    text = re.sub(r'\bsont affichés\b', 'are displayed', text)
    
    # est optionnel/obligatoire
    text = re.sub(r'\best optionnel\b', 'is optional', text)
    text = re.sub(r'\bsont optionnels\b', 'are optional', text)
    text = re.sub(r'\best obligatoire\b', 'is required', text)
    text = re.sub(r'\bsont obligatoires\b', 'are required', text)
    
    # C'est la méthode
    text = re.sub(r"\bC'est la méthode principale pour\b", 'It is the main method for', text)
    text = re.sub(r"\bc'est la méthode\b", 'it is the method', text)
    
    # Webhooks
    text = re.sub(r'\bEnvoie un message via un webhook\b', 'Sends a message via a webhook', text)
    text = re.sub(r'\bCrée un webhook\b', 'Creates a webhook', text)
    text = re.sub(r'\bSupprime un webhook\b', 'Deletes a webhook', text)
    
    # Misc
    text = re.sub(r'\bde manière ciblée\b', 'in a targeted way', text)
    text = re.sub(r'\bdistincte de\b', 'distinct from', text)
    text = re.sub(r'\bcomportement à éviter\b', 'behavior to avoid', text)
    text = re.sub(r'\ble message sera vide\b', 'the message will be empty', text)
    text = re.sub(r'\bdes messages riches\b', 'rich messages', text)
    text = re.sub(r"\bL'embed doit être construit\b", 'The embed must be built', text)
    
    return text


def translate_sentence(fr_text):
    """Translate a French sentence to English using available patterns."""
    # Apply the same regex patterns to the sentence
    result = apply_regex_translations(fr_text)
    return result


def translate_file(filepath):
    """Translate a single French documentation file to English."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply full-text regex translations
    content = apply_regex_translations(content)
    
    # Apply line-by-line exact match translations  
    lines = content.split('\n')
    result_lines = []
    in_code_block = False
    
    for line in lines:
        stripped = line.strip()
        
        # Track code blocks
        if stripped.startswith('```'):
            in_code_block = not in_code_block
            result_lines.append(line)
            continue
        
        # Don't translate code blocks
        if in_code_block:
            result_lines.append(line)
            continue
        
        # Apply exact match translations
        result = apply_translations(line)
        result_lines.append(result)
    
    content = '\n'.join(result_lines)
    
    # Fix any H1 title placeholders
    content = re.sub(r' — EN_PLACEHOLDER', '', content)
    
    return content


def is_french_file(filepath):
    """Check if a file contains French content."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Strong French indicators
    if re.search(r'## Syntaxe|## Paramètres|## Retourne|## Exemples|## Fonctions liées', content):
        return True
    if re.search(r'Fonction guard|La fonction.*retourne|La fonction.*génère|La fonction.*permet', content):
        return True
    if re.search(r'\|\s*Paramètre\s*\|', content):
        return True
    return False


def main():
    all_files = sorted([f for f in os.listdir(DOCS_DIR) if f.endswith('.md')])
    
    start_idx = None
    end_idx = None
    for i, f in enumerate(all_files):
        if f == 'onlyforcategories.md':
            start_idx = i
        if f == 'year.md':
            end_idx = i
            break
    
    if start_idx is None or end_idx is None:
        print(f"ERROR: Range not found. onlyforcategories.md={start_idx}, year.md={end_idx}")
        sys.exit(1)
    
    files_to_process = all_files[start_idx:end_idx + 1]
    print(f"Files in range: {len(files_to_process)}")
    
    translated = 0
    skipped = 0
    errors = 0
    
    for filename in files_to_process:
        filepath = os.path.join(DOCS_DIR, filename)
        
        if not is_french_file(filepath):
            # print(f"SKIP (EN): {filename}")
            skipped += 1
            continue
        
        try:
            print(f"TRANSLATE: {filename}")
            new_content = translate_file(filepath)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            translated += 1
        except Exception as e:
            print(f"  ERROR: {filename}: {e}")
            errors += 1
    
    print(f"\nDone! Translated: {translated}, Skipped (EN): {skipped}, Errors: {errors}")


if __name__ == '__main__':
    main()
