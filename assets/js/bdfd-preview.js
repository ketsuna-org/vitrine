/**
 * BDFD Visual Blocks & Discord Message Simulator Engine
 * Automatically parses BDFD / BDScript code blocks in documentation and generates:
 * 1. Dual-View Tabs (Scratch-like Blocks View vs Syntax-highlighted Script View)
 * 2. Realistic Discord Simulator Preview (Bot avatar, embeds, buttons, select menus, attachments)
 */

(function (global) {
  'use strict';

  // Category mapping for BDFD functions
  const CATEGORY_MAP = {
    // Messages & Embeds
    title: 'messages',
    description: 'messages',
    color: 'messages',
    addfield: 'messages',
    footer: 'messages',
    author: 'messages',
    thumbnail: 'messages',
    image: 'messages',
    sendmessage: 'messages',
    channelsendmessage: 'messages',
    editmessage: 'messages',
    deletemessage: 'messages',
    pinmessage: 'messages',
    unpinmessage: 'messages',
    addfile: 'messages',
    attachimage: 'messages',
    sendembedmessage: 'messages',
    reply: 'messages',
    dm: 'messages',

    // Reactions
    addreaction: 'reactions',
    addmessagereactions: 'reactions',
    clearreactions: 'reactions',

    // Channels
    createchannel: 'channels',
    deletechannels: 'channels',
    deletechannelsbyname: 'channels',
    editchannelperms: 'channels',
    usechannel: 'channels',
    slowmode: 'channels',
    channelid: 'channels',
    channelname: 'channels',

    // Moderation
    ban: 'moderation',
    unban: 'moderation',
    kick: 'moderation',
    timeout: 'moderation',
    untimeout: 'moderation',
    giverole: 'moderation',
    takerole: 'moderation',
    clear: 'moderation',
    checkusersperms: 'moderation',
    hasrole: 'moderation',

    // Components & Interactions
    addbutton: 'components',
    addbuttoncv2: 'components',
    addactionrow: 'components',
    addselectmenu: 'components',
    addselectmenuoption: 'components',
    addstringselect: 'components',
    addstringselectoption: 'components',
    addchannelselect: 'components',
    addroleselect: 'components',
    adduserselect: 'components',
    addmentionableselect: 'components',
    addseparator: 'components',
    addtextdisplay: 'components',
    ephemeral: 'interactions',
    defer: 'interactions',
    editbutton: 'components',
    newmodal: 'components',
    addtextinput: 'components',

    // Variables & Workflows
    var: 'workflows',
    setvar: 'workflows',
    getvar: 'workflows',
    setservervar: 'workflows',
    getservervar: 'workflows',
    setchannelvar: 'workflows',
    getchannelvar: 'workflows',
    setguildvar: 'workflows',
    getguildvar: 'workflows',
    setmembervar: 'workflows',
    getmembervar: 'workflows',
    setuservar: 'workflows',
    getuservar: 'workflows',
    resetvar: 'workflows',
    resettablevar: 'workflows',
    callworkflow: 'workflows',
    varexists: 'workflows',
    varexisterror: 'workflows',

    // HTTP & JSON
    httpget: 'http',
    httppost: 'http',
    httpaddheader: 'http',
    httpdelete: 'http',
    httppatch: 'http',
    httpput: 'http',
    httpresult: 'http',
    httpstatus: 'http',
    jsonparse: 'http',
    jsonvalue: 'http',
    jsonset: 'http',
    jsonstringify: 'http',

    // Music
    playmusic: 'music',
    pausemusic: 'music',
    stopmusic: 'music',
    skipmusic: 'music',
    resumemusic: 'music',
    joinvoice: 'music',
    leavevoice: 'music',
    seekmusic: 'music',
    setmusicvolume: 'music',
    setmusicloop: 'music',

    // Canvas
    canvascreate: 'messages',
    canvasdrawtext: 'messages',
    canvasdrawrect: 'messages',
    canvasdrawcircle: 'messages',
    canvasdrawline: 'messages',
    canvasloadimage: 'messages',
    canvascompositeimage: 'messages',

    // Logic & Math
    calculate: 'logic',
    if: 'logic',
    endif: 'logic',
    else: 'logic',
    try: 'logic',
    catch: 'logic',
    endtry: 'logic',
    for: 'logic',
    endfor: 'logic',
    loop: 'logic',
    endloop: 'logic',
    and: 'logic',
    or: 'logic',
    checkcondition: 'logic',
    checkcontains: 'logic',
    sum: 'logic',
    sub: 'logic',
    multi: 'logic',
    divide: 'logic',
    round: 'logic',
    ceil: 'logic',
    floor: 'logic',
    sqrt: 'logic',
    max: 'logic',
    min: 'logic',
    modulo: 'logic',
    log: 'logic',

    // Entrypoint & Meta
    cooldown: 'entrypoint',
    globalcooldown: 'entrypoint',
    servercooldown: 'entrypoint',
    nomentionmessage: 'entrypoint',
    argscheck: 'entrypoint',
    argcount: 'entrypoint',
    stop: 'entrypoint'
  };

  // Icon mapping for actions
  const ICON_MAP = {
    title: 'format_size',
    description: 'description',
    color: 'palette',
    addfield: 'view_column',
    footer: 'vertical_align_bottom',
    author: 'person',
    thumbnail: 'image',
    image: 'panorama',
    sendmessage: 'send',
    channelsendmessage: 'forward_to_inbox',
    editmessage: 'edit_note',
    deletemessage: 'delete_sweep',
    pinmessage: 'push_pin',
    addfile: 'attach_file',
    attachimage: 'image',
    addreaction: 'add_reaction',
    createchannel: 'add_box',
    deletechannels: 'delete',
    editchannelperms: 'lock_open',
    usechannel: 'arrow_forward',
    slowmode: 'speed',
    ban: 'gavel',
    unban: 'lock_open',
    kick: 'person_remove',
    timeout: 'timer_off',
    untimeout: 'timer',
    giverole: 'shield_person',
    takerole: 'remove_moderator',
    clear: 'delete_sweep',
    addbutton: 'smart_button',
    addbuttoncv2: 'smart_button',
    addactionrow: 'table_rows',
    addselectmenu: 'menu_open',
    addselectmenuoption: 'checklist',
    addstringselect: 'menu_open',
    addchannelselect: 'tag',
    addroleselect: 'shield',
    adduserselect: 'account_circle',
    addmentionableselect: 'alternate_email',
    ephemeral: 'visibility_off',
    defer: 'pending',
    var: 'data_array',
    setvar: 'database',
    getvar: 'inventory_2',
    setservervar: 'dns',
    getservervar: 'dns',
    setuservar: 'account_circle',
    getuservar: 'account_circle',
    httpget: 'cloud_sync',
    httppost: 'cloud_upload',
    jsonparse: 'data_object',
    jsonvalue: 'key',
    playmusic: 'play_arrow',
    pausemusic: 'pause',
    stopmusic: 'stop',
    skipmusic: 'skip_next',
    resumemusic: 'play_arrow',
    canvascreate: 'brush',
    canvasdrawtext: 'draw',
    calculate: 'calculate',
    sum: 'add',
    sub: 'remove',
    multi: 'close',
    divide: 'percent',
    round: 'rounded_corner',
    ceil: 'arrow_upward',
    floor: 'arrow_downward',
    sqrt: 'square_foot',
    cooldown: 'schedule',
    globalcooldown: 'public',
    servercooldown: 'domain',
    nomentionmessage: 'terminal',
    if: 'alt_route',
    else: 'alt_route',
    endif: 'commit',
    try: 'security',
    catch: 'warning',
    for: 'restart_alt',
    stop: 'cancel'
  };

  // Human parameter labels
  const PARAM_LABELS = {
    title: ['Title text', 'Embed index'],
    description: ['Description text', 'Embed index'],
    color: ['Sidebar color (HEX)', 'Embed index'],
    addfield: ['Field name', 'Field value', 'Inline (yes/no)', 'Embed index'],
    footer: ['Footer text', 'Footer icon URL', 'Embed index'],
    author: ['Author name', 'Author icon URL', 'URL', 'Embed index'],
    thumbnail: ['Thumbnail URL', 'Embed index'],
    image: ['Image URL', 'Embed index'],
    sendmessage: ['Message text', 'Target channel ID'],
    channelsendmessage: ['Target channel ID', 'Message text'],
    addfile: ['File URL', 'Spoiler (yes/no)'],
    attachimage: ['Canvas name'],
    addbutton: ['New row (yes/no)', 'Custom ID', 'Label', 'Style (primary/secondary/success/danger/link)', 'Emoji', 'Disabled'],
    addbuttoncv2: ['Custom ID', 'Button label', 'Style', 'Emoji', 'Disabled'],
    addactionrow: ['Row Custom ID'],
    addselectmenu: ['Row', 'Custom ID', 'Placeholder', 'Min options', 'Max options', 'Disabled'],
    addstringselect: ['Custom ID', 'Placeholder', 'Min options', 'Max options', 'Disabled'],
    addchannelselect: ['Custom ID', 'Placeholder', 'Min', 'Max', 'Disabled', 'Channel types'],
    addroleselect: ['Custom ID', 'Placeholder', 'Min', 'Max', 'Disabled'],
    adduserselect: ['Custom ID', 'Placeholder', 'Min', 'Max', 'Disabled'],
    addmentionableselect: ['Custom ID', 'Placeholder', 'Min', 'Max', 'Disabled'],
    createchannel: ['Channel name', 'Channel type', 'Category ID'],
    deletechannels: ['Channel ID'],
    editchannelperms: ['Channel ID', 'Target ID', 'Permissions'],
    usechannel: ['Channel ID'],
    ban: ['User ID', 'Reason', 'Delete message days'],
    unban: ['User ID', 'Reason'],
    kick: ['User ID', 'Reason'],
    timeout: ['User ID', 'Duration', 'Reason'],
    untimeout: ['User ID'],
    giverole: ['User ID', 'Role ID'],
    takerole: ['User ID', 'Role ID'],
    clear: ['Message count', 'Channel ID'],
    var: ['Variable name', 'Value'],
    setvar: ['Variable name', 'Value', 'User ID'],
    getvar: ['Variable name', 'User ID'],
    setservervar: ['Variable name', 'Value', 'Guild ID'],
    getservervar: ['Variable name', 'Guild ID'],
    setuservar: ['Variable name', 'Value', 'User ID'],
    getuservar: ['Variable name', 'User ID'],
    setchannelvar: ['Variable name', 'Value', 'Channel ID'],
    getchannelvar: ['Variable name', 'Channel ID'],
    setguildvar: ['Variable name', 'Value', 'Guild ID'],
    getguildvar: ['Variable name', 'Guild ID'],
    setmembervar: ['Variable name', 'Value', 'User ID', 'Guild ID'],
    getmembervar: ['Variable name', 'User ID', 'Guild ID'],
    httpget: ['Request URL'],
    httppost: ['Request URL', 'JSON Payload'],
    httpaddheader: ['Header name', 'Header value'],
    jsonparse: ['JSON string'],
    jsonvalue: ['Key path'],
    playmusic: ['Search query or URL', 'Channel ID', 'User ID'],
    setmusicvolume: ['Volume (1-150)'],
    seekmusic: ['Position (seconds)'],
    canvascreate: ['Canvas name', 'Width', 'Height', 'Background color'],
    canvasdrawtext: ['Canvas name', 'Text', 'X coordinate', 'Y coordinate', 'Font size', 'Color'],
    calculate: ['Mathematical expression'],
    sum: ['Numbers or expressions...'],
    sub: ['Value 1', 'Value 2'],
    multi: ['Value 1', 'Value 2'],
    divide: ['Numerator', 'Denominator'],
    round: ['Decimal number'],
    ceil: ['Decimal number'],
    floor: ['Decimal number'],
    cooldown: ['Duration', 'Error message'],
    globalcooldown: ['Duration', 'Error message'],
    servercooldown: ['Duration', 'Error message'],
    argscheck: ['Condition (e.g. >2)', 'Error message'],
    wait: ['Duration']
  };

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatVariables(text) {
    if (!text) return '';
    let escaped = escapeHtml(text);
    escaped = escaped.replace(/(\$[a-zA-Z0-9_]+(?:\[[^\]]*\])?)/g, '<span class="var-tag">$1</span>');
    escaped = escaped.replace(/(\(\([a-zA-Z0-9._\-]+\)\))/g, '<span class="var-tag">$1</span>');
    return escaped;
  }

  function formatDiscordMarkdown(text) {
    if (!text) return '';
    let s = escapeHtml(text);
    // User mentions
    s = s.replace(/&lt;@!?([0-9]+)&gt;/g, '<span class="bg-[#5865F2]/20 text-[#B19DF7] px-1 rounded font-semibold">@User</span>');
    // Channel mentions
    s = s.replace(/&lt;#([0-9]+)&gt;/g, '<strong class="text-[#B19DF7] font-semibold">#ticket-channel</strong>');
    // Role mentions
    s = s.replace(/&lt;@&amp;([0-9]+)&gt;/g, '<span class="bg-[#5865F2]/20 text-[#B19DF7] px-1 rounded font-semibold">@Role</span>');
    // BDScript Placeholders
    s = s.replace(/\$authorID/g, '<span class="bg-[#5865F2]/20 text-[#B19DF7] px-1 rounded font-semibold">@User</span>');
    s = s.replace(/\$username/g, '<span class="bg-[#5865F2]/20 text-[#B19DF7] px-1 rounded font-semibold">User</span>');
    s = s.replace(/\$guildName|\$serverName/g, '<strong>Community Server</strong>');
    s = s.replace(/\$ping|\$botPing/g, '<strong>24 ms</strong>');
    s = s.replace(/\$messageID/g, '<code>1029384756</code>');
    s = s.replace(/\$channelID/g, '<strong class="text-[#B19DF7] font-semibold">#current-channel</strong>');
    // Discord Markdown
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    s = s.replace(/__([^_]+)__/g, '<u>$1</u>');
    s = s.replace(/~~([^~]+)~~/g, '<s>$1</s>');
    s = s.replace(/`([^`]+)`/g, '<code class="bg-[#1e1f22] text-[#e0e0e0] px-1 py-0.5 rounded text-xs font-mono">$1</code>');
    s = s.replace(/\\n|\n/g, '<br>');
    return s;
  }

  /**
   * Robust Tokenizer & Parser for BDFD scripts:
   * Correctly supports multi-line functions, arbitrary bracket nesting, and parameter splitting.
   */
  function parseBdfd(code) {
    const actions = [];
    const embed = { fields: [] };
    const buttons = [];
    let selectMenu = null;
    let messageText = '';
    let isEphemeral = false;
    let attachment = null;
    let simulatedFeedback = '';

    let i = 0;
    const len = code.length;

    while (i < len) {
      // Check for comment line
      if ((code[i] === ';' && code[i + 1] === ';') || (code[i] === '/' && code[i + 1] === '/')) {
        const endOfLine = code.indexOf('\n', i);
        const lineEnd = endOfLine === -1 ? len : endOfLine;
        const comment = code.slice(i, lineEnd).replace(/^[;/]+\s*/, '').trim();
        if (comment.length > 2) {
          actions.push({ type: 'comment', title: comment });
        }
        i = lineEnd + 1;
        continue;
      }

      // Check for BDFD function ($fn or $fn[...])
      if (code[i] === '$') {
        i++; // skip $
        const startName = i;
        while (i < len && /[a-zA-Z0-9_]/.test(code[i])) {
          i++;
        }
        const fnName = code.slice(startName, i);
        if (!fnName) {
          messageText += '$';
          continue;
        }
        const fnLower = fnName.toLowerCase();

        const INLINE_PLACEHOLDERS = new Set([
          'authorid', 'username', 'ping', 'botping', 'guildname', 'servername',
          'channelid', 'channelname', 'messageid', 'message', 'useravatar', 'authoravatar',
          'date', 'time', 'memberscount', 'membercount', 'guildid', 'serverid',
          'botid', 'botcount', 'creationdate', 'discriminator'
        ]);

        let hasBrackets = false;
        let args = [];
        if (i < len && code[i] === '[') {
          hasBrackets = true;
          i++; // skip [
          let depth = 1;
          let currentArg = '';
          while (i < len && depth > 0) {
            if (code[i] === '[') {
              depth++;
              currentArg += '[';
            } else if (code[i] === ']') {
              depth--;
              if (depth > 0) {
                currentArg += ']';
              }
            } else if (code[i] === ';' && depth === 1) {
              args.push(currentArg.trim());
              currentArg = '';
            } else {
              currentArg += code[i];
            }
            i++;
          }
          if (currentArg.length > 0 || args.length > 0) {
            args.push(currentArg.trim());
          }
        }

        if (!hasBrackets && INLINE_PLACEHOLDERS.has(fnLower)) {
          messageText += '$' + fnName;
          continue;
        }

        actions.push({
          type: 'function',
          name: fnName,
          nameLower: fnLower,
          args: args
        });

        // Simulator extraction
        if (fnLower === 'title') {
          embed.title = args[0] || 'Embed Title';
        } else if (fnLower === 'description') {
          embed.description = args[0] || '';
        } else if (fnLower === 'color') {
          embed.color = args[0] || '#5865F2';
        } else if (fnLower === 'addfield') {
          if (args[0] || args[1]) {
            embed.fields.push({
              name: args[0] || 'Field',
              value: args[1] || 'Value',
              inline: (args[2] || '').toLowerCase() === 'yes'
            });
          }
        } else if (fnLower === 'footer') {
          embed.footer = args[0] || '';
        } else if (fnLower === 'author') {
          embed.author = args[0] || '';
        } else if (fnLower === 'thumbnail') {
          embed.thumbnail = args[0] || '';
        } else if (fnLower === 'image') {
          embed.image = args[0] || '';
        } else if (fnLower === 'addbutton') {
          buttons.push({
            row: args[0] === 'yes' ? 'new' : '1',
            id: args[1] || 'btn_action',
            label: args[2] || 'Button',
            style: (args[3] || 'primary').toLowerCase(),
            emoji: args[5] || args[4] || ''
          });
        } else if (fnLower === 'addbuttoncv2') {
          buttons.push({
            row: '1',
            id: args[0] || 'btn_action',
            label: args[1] || 'Button',
            style: (args[2] || 'primary').toLowerCase(),
            emoji: args[3] || ''
          });
        } else if (fnLower === 'addselectmenu' || fnLower === 'addstringselect' || fnLower === 'addchannelselect' || fnLower === 'addroleselect' || fnLower === 'adduserselect' || fnLower === 'addmentionableselect') {
          selectMenu = {
            id: args[0] || 'select_menu',
            placeholder: args[1] || 'Select an option...'
          };
        } else if (fnLower === 'ephemeral') {
          isEphemeral = true;
        } else if (fnLower === 'addfile' || fnLower === 'attachimage') {
          attachment = {
            name: args[0] ? args[0].split('/').pop() : 'attachment.png',
            url: args[0]
          };
        } else if (fnLower === 'sendmessage' || fnLower === 'channelsendmessage' || fnLower === 'reply') {
          const content = fnLower === 'channelsendmessage' ? args[1] : args[0];
          if (content) {
            messageText += (messageText ? '\n' : '') + content;
          }
        } else if (fnLower === 'ban') {
          simulatedFeedback = `🔨 **@User** has been banned from the server. (Reason: ${args[1] || 'No reason provided'})`;
        } else if (fnLower === 'kick') {
          simulatedFeedback = `👢 **@User** has been kicked from the server.`;
        } else if (fnLower === 'timeout') {
          simulatedFeedback = `⏳ **@User** has been timed out for ${args[1] || '10m'}.`;
        } else if (fnLower === 'giverole') {
          simulatedFeedback = `🛡️ Role granted to **@User**.`;
        } else if (fnLower === 'takerole') {
          simulatedFeedback = `❌ Role removed from **@User**.`;
        } else if (fnLower === 'clear') {
          simulatedFeedback = `🧹 Cleared **${args[0] || '10'}** messages.`;
        } else if (fnLower === 'playmusic') {
          simulatedFeedback = `🎵 Queued and playing: **${args[0] || 'Requested Track'}**`;
        } else if (fnLower === 'pausemusic') {
          simulatedFeedback = `⏸️ Playback paused.`;
        } else if (fnLower === 'resumemusic') {
          simulatedFeedback = `▶️ Playback resumed.`;
        } else if (fnLower === 'stopmusic') {
          simulatedFeedback = `⏹️ Music stopped and queue cleared.`;
        } else if (fnLower === 'setvar' || fnLower === 'setservervar' || fnLower === 'setuservar') {
          simulatedFeedback = `💾 Stored variable \`${args[0] || 'data'}\` set to \`${args[1] || 'value'}\`.`;
        } else if (fnLower === 'calculate' || fnLower === 'ceil' || fnLower === 'floor' || fnLower === 'round' || fnLower === 'sum' || fnLower === 'sub' || fnLower === 'multi' || fnLower === 'divide') {
          simulatedFeedback = `🔢 Calculation result: \`${args[0] || 'expression'}\``;
        }
        continue;
      }

      // Plain text outside function calls
      const nextSpecial = code.slice(i).search(/[$;\/]/);
      if (nextSpecial === -1) {
        messageText += code.slice(i);
        break;
      } else if (nextSpecial === 0) {
        messageText += code[i];
        i++;
      } else {
        messageText += code.slice(i, i + nextSpecial);
        i += nextSpecial;
      }
    }

    const hasEmbed = !!(embed.title || embed.description || embed.fields.length > 0 || embed.footer || embed.author || embed.image || embed.thumbnail);
    if (hasEmbed && !embed.color) {
      embed.color = '#5865F2';
    }

    return {
      actions,
      embed: hasEmbed ? embed : null,
      buttons,
      selectMenu,
      messageText: messageText.trim(),
      isEphemeral,
      attachment,
      simulatedFeedback
    };
  }

  /**
   * Renders the Scratch-like Block Canvas matching blocks.md and tickets.md design system.
   */
  function renderBlocksCanvas(actions) {
    if (!actions || actions.length === 0) {
      return '<div class="p-4 text-xs text-on-surface-variant font-mono">No actions defined.</div>';
    }

    let html = '<div class="block-flow-canvas">';

    // Entry point block
    html += `
      <div class="scratch-block-card block-cat-entrypoint">
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <span class="material-symbols-outlined scratch-block-icon">terminal</span>
          <span class="scratch-block-title">DISCORD TRIGGER / COMMAND</span>
          <span class="scratch-block-badge">Entry</span>
        </div>
        <div class="scratch-block-body">
          <div class="text-xs text-on-surface-variant">Triggered when command or event runs in Discord bot engine.</div>
        </div>
      </div>
      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <span class="material-symbols-outlined scratch-block-connector-arrow">arrow_drop_down</span>
        <div class="scratch-block-connector-add">+</div>
      </div>
    `;

    const filteredActions = actions.filter(a => a.type === 'function');
    filteredActions.forEach((act, idx) => {
      const cat = CATEGORY_MAP[act.nameLower] || 'messages';
      const icon = ICON_MAP[act.nameLower] || 'tune';
      const catClass = `block-cat-${cat}`;
      const title = act.name.replace(/([A-Z])/g, ' $1').toUpperCase();
      const labels = PARAM_LABELS[act.nameLower] || [];

      html += `
        <div class="scratch-block-card ${catClass}">
          <div class="scratch-block-header">
            <div class="scratch-block-strip"></div>
            <span class="material-symbols-outlined scratch-block-icon">${icon}</span>
            <span class="scratch-block-title">${escapeHtml(title)}</span>
            <span class="scratch-block-badge">${cat}</span>
          </div>
          <div class="scratch-block-body">
      `;

      if (act.args.length === 0) {
        html += `<div class="text-xs text-on-surface-variant font-mono">$${escapeHtml(act.name)}[]</div>`;
      } else {
        act.args.forEach((argVal, aIdx) => {
          const label = labels[aIdx] || `Parameter ${aIdx + 1}`;
          html += `
            <div class="scratch-block-field">
              <span class="scratch-block-label">${escapeHtml(label)}</span>
              <div class="scratch-block-input">${formatVariables(argVal)}</div>
            </div>
          `;
        });
      }

      html += `
          </div>
        </div>
      `;

      if (idx < filteredActions.length - 1) {
        html += `
          <div class="scratch-block-connector">
            <div class="scratch-block-connector-line"></div>
            <span class="material-symbols-outlined scratch-block-connector-arrow">arrow_drop_down</span>
            <div class="scratch-block-connector-add">+</div>
          </div>
        `;
      }
    });

    html += '</div>';
    return html;
  }

  /**
   * Renders the realistic Discord Message Simulator Frame.
   */
  function renderDiscordSimulator(parsed) {
    const { embed, buttons, selectMenu, messageText, isEphemeral, attachment, simulatedFeedback } = parsed;

    const effectiveText = messageText || simulatedFeedback || (embed ? '' : '✅ Command executed successfully.');

    let html = `
      <div class="discord-preview-badge-header">
        <span>Discord Simulator Live Preview</span>
        <span class="badge-tag">
          <span class="material-symbols-outlined text-[13px]">smart_toy</span>
          Bot Simulator
        </span>
      </div>
      <div class="discord-simulator-frame">
        <div class="discord-msg-row">
          <div class="discord-avatar">🤖</div>
          <div class="discord-msg-content w-full">
            <div class="discord-header">
              <span class="discord-username">Bot Creator Assistant</span>
              <span class="discord-bot-tag">BOT ✔</span>
              <span class="discord-timestamp">Today at 2:32 PM</span>
            </div>
    `;

    if (effectiveText) {
      html += `<div class="text-[14px] leading-relaxed mb-2">${formatDiscordMarkdown(effectiveText)}</div>`;
    }

    if (attachment) {
      html += `
        <div class="discord-attachment-file mb-2">
          <span class="material-symbols-outlined file-icon">attachment</span>
          <div class="file-info">
            <span class="file-name">${escapeHtml(attachment.name)}</span>
            <span class="file-size">142.5 KB</span>
          </div>
        </div>
      `;
    }

    if (embed) {
      const color = embed.color || '#5865F2';
      html += `
        <div class="discord-embed" style="--embed-color: ${escapeHtml(color)};">
      `;

      if (embed.author) {
        html += `
          <div class="discord-embed-author">
            <div class="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-[10px] text-primary">★</div>
            <span>${escapeHtml(embed.author)}</span>
          </div>
        `;
      }

      if (embed.thumbnail) {
        html += `<img src="${escapeHtml(embed.thumbnail)}" alt="Thumbnail" class="discord-embed-thumb" onerror="this.style.display='none'">`;
      }

      if (embed.title) {
        html += `<div class="discord-embed-title">${formatDiscordMarkdown(embed.title)}</div>`;
      }

      if (embed.description) {
        html += `<div class="discord-embed-desc">${formatDiscordMarkdown(embed.description)}</div>`;
      }

      if (embed.fields && embed.fields.length > 0) {
        html += `<div class="discord-embed-fields">`;
        embed.fields.forEach(f => {
          html += `
            <div class="${f.inline ? 'inline-block mr-4 mb-2' : 'block mb-2'}">
              <div class="discord-embed-field-name">${formatDiscordMarkdown(f.name)}</div>
              <div class="discord-embed-field-val">${formatDiscordMarkdown(f.value)}</div>
            </div>
          `;
        });
        html += `</div>`;
      }

      if (embed.image) {
        html += `<img src="${escapeHtml(embed.image)}" alt="Embed Image" class="discord-embed-image" onerror="this.style.display='none'">`;
      }

      if (embed.footer) {
        html += `
          <div class="discord-embed-footer">
            <span>${formatDiscordMarkdown(embed.footer)}</span>
          </div>
        `;
      }

      html += `</div>`;
    }

    if (buttons && buttons.length > 0) {
      html += `<div class="discord-components-row mt-2">`;
      buttons.forEach(btn => {
        let styleClass = 'discord-btn-primary';
        if (btn.style === 'secondary' || btn.style === 'gray') styleClass = 'discord-btn-secondary';
        else if (btn.style === 'success' || btn.style === 'green') styleClass = 'discord-btn-success';
        else if (btn.style === 'danger' || btn.style === 'red') styleClass = 'discord-btn-danger';
        else if (btn.style === 'link') styleClass = 'discord-btn-link';

        html += `
          <button class="discord-btn ${styleClass}" type="button" onclick="return false;">
            ${btn.emoji ? `<span>${escapeHtml(btn.emoji)}</span>` : ''}
            <span>${escapeHtml(btn.label)}</span>
            ${btn.style === 'link' ? '<span class="material-symbols-outlined text-[13px]">open_in_new</span>' : ''}
          </button>
        `;
      });
      html += `</div>`;
    }

    if (selectMenu) {
      html += `
        <div class="discord-select-menu mt-2">
          <span>${escapeHtml(selectMenu.placeholder)}</span>
          <span class="material-symbols-outlined text-base">expand_more</span>
        </div>
      `;
    }

    if (isEphemeral) {
      html += `
        <div class="discord-ephemeral-notice mt-2">
          <span class="material-symbols-outlined">visibility_off</span>
          <span>Only you can see this • <a href="#" class="underline hover:text-white" onclick="return false;">Dismiss message</a></span>
        </div>
      `;
    }

    html += `
          </div>
        </div>
      </div>
    `;

    return html;
  }

  /**
   * Initializes the auto-transformation of BDFD code snippets into Dual-View Tabs + Discord Preview.
   */
  function initBdfdPreviews() {
    if (typeof document === 'undefined') return;

    const article = document.querySelector('article.bg-surface-container-low') || document.querySelector('.article-prose');
    if (!article) return;

    const syntaxContainer = document.getElementById('syntax');
    const codeBlocks = article.querySelectorAll('pre > code.language-bdfd, pre.language-bdfd > code, pre > code.language-bds, pre.language-bds > code, .highlighter-rouge.language-bdfd pre code, .highlighter-rouge.language-bds pre code');

    codeBlocks.forEach((codeEl) => {
      if (syntaxContainer && syntaxContainer.contains(codeEl)) return;
      if (codeEl.closest('.dual-view-tabs') || codeEl.closest('.dual-tab-panel')) return;
      if (codeEl.closest('.no-preview')) return;

      const preContainer = codeEl.closest('.highlighter-rouge') || codeEl.closest('pre');
      if (!preContainer) return;

      const rawCode = codeEl.textContent.trim();
      if (!rawCode) return;

      const parsed = parseBdfd(rawCode);
      if (!parsed.actions.length && !parsed.messageText) return;

      const dualView = document.createElement('div');
      dualView.className = 'dual-view-tabs';

      const nav = document.createElement('div');
      nav.className = 'dual-view-nav';
      nav.innerHTML = `
        <button class="dual-tab-btn active" type="button">
          <span class="material-symbols-outlined tab-accent">dashboard</span>
          <span>Blocks View (App Mode)</span>
        </button>
        <button class="dual-tab-btn" type="button">
          <span class="material-symbols-outlined tab-accent">code</span>
          <span>Script View (BDFD / BDScript)</span>
        </button>
        <div class="dual-tab-actions">
          <button class="dual-copy-btn" type="button" title="Copy code snippet">
            <span class="material-symbols-outlined text-[14px]">content_copy</span>
            <span>Copy</span>
          </button>
        </div>
      `;

      const panelBlocks = document.createElement('div');
      panelBlocks.className = 'dual-tab-panel active';
      panelBlocks.innerHTML = renderBlocksCanvas(parsed.actions);

      const panelScript = document.createElement('div');
      panelScript.className = 'dual-tab-panel';
      const scriptClone = preContainer.cloneNode(true);
      panelScript.appendChild(scriptClone);

      dualView.appendChild(nav);
      dualView.appendChild(panelBlocks);
      dualView.appendChild(panelScript);

      const discordPreview = document.createElement('div');
      discordPreview.innerHTML = renderDiscordSimulator(parsed);

      const tabBtns = nav.querySelectorAll('.dual-tab-btn');
      const panels = [panelBlocks, panelScript];
      tabBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          tabBtns.forEach(b => b.classList.remove('active'));
          panels.forEach(p => p.classList.remove('active'));
          btn.classList.add('active');
          panels[idx].classList.add('active');
        });
      });

      const copyBtn = nav.querySelector('.dual-copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(rawCode).then(() => {
              const span = copyBtn.querySelector('span:last-child');
              if (span) {
                const original = span.textContent;
                span.textContent = 'Copied!';
                setTimeout(() => { span.textContent = original; }, 2000);
              }
            }).catch(() => {});
          }
        });
      }

      const parent = preContainer.parentNode;
      parent.insertBefore(dualView, preContainer);
      parent.insertBefore(discordPreview, preContainer);
      parent.removeChild(preContainer);
    });
  }

  const engine = {
    parseBdfd,
    renderBlocksCanvas,
    renderDiscordSimulator,
    initBdfdPreviews,
    CATEGORY_MAP,
    ICON_MAP,
    PARAM_LABELS
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = engine;
  }

  if (typeof window !== 'undefined') {
    window.BdfdPreviewEngine = engine;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initBdfdPreviews);
    } else {
      initBdfdPreviews();
    }
  }

})(typeof globalThis !== 'undefined' ? globalThis : this);
