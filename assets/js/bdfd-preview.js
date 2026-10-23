/**
 * BDFD Visual Blocks & Discord Message Simulator Engine
 * Automatically parses BDFD / BDScript code blocks in documentation and generates:
 * 1. A syntax-highlighted script panel with a Copy button
 * 2. Realistic Discord Simulator Preview (Bot avatar, embeds, buttons, select menus, attachments)
 */

(function (global) {
  'use strict';

  // Texts drawn by the preview itself: English by default, French on pages whose <html lang> is "fr".
  var FR = typeof document !== 'undefined' && (document.documentElement.lang || 'en').slice(0, 2) === 'fr';
  function T(en, fr) { return FR ? fr : en; }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
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
          simulatedFeedback = T(`🔨 **@User** has been banned from the server. (Reason: ${args[1] || 'No reason provided'})`, `🔨 **@User** a été banni du serveur. (Raison : ${args[1] || 'Aucune raison indiquée'})`);
        } else if (fnLower === 'kick') {
          simulatedFeedback = T(`👢 **@User** has been kicked from the server.`, `👢 **@User** a été expulsé du serveur.`);
        } else if (fnLower === 'timeout') {
          simulatedFeedback = T(`⏳ **@User** has been timed out for ${args[1] || '10m'}.`, `⏳ **@User** est mis en sourdine pour ${args[1] || '10m'}.`);
        } else if (fnLower === 'giverole') {
          simulatedFeedback = T(`🛡️ Role granted to **@User**.`, `🛡️ Rôle attribué à **@User**.`);
        } else if (fnLower === 'takerole') {
          simulatedFeedback = T(`❌ Role removed from **@User**.`, `❌ Rôle retiré à **@User**.`);
        } else if (fnLower === 'clear') {
          simulatedFeedback = T(`🧹 Cleared **${args[0] || '10'}** messages.`, `🧹 **${args[0] || '10'}** messages supprimés.`);
        } else if (fnLower === 'playmusic') {
          simulatedFeedback = T(`🎵 Queued and playing: **${args[0] || 'Requested Track'}**`, `🎵 En file d'attente et en lecture : **${args[0] || 'Piste demandée'}**`);
        } else if (fnLower === 'pausemusic') {
          simulatedFeedback = T(`⏸️ Playback paused.`, `⏸️ Lecture en pause.`);
        } else if (fnLower === 'resumemusic') {
          simulatedFeedback = T(`▶️ Playback resumed.`, `▶️ Lecture reprise.`);
        } else if (fnLower === 'stopmusic') {
          simulatedFeedback = T(`⏹️ Music stopped and queue cleared.`, `⏹️ Musique arrêtée et file d'attente vidée.`);
        } else if (fnLower === 'setvar' || fnLower === 'setservervar' || fnLower === 'setuservar') {
          simulatedFeedback = T(`💾 Stored variable \`${args[0] || 'data'}\` set to \`${args[1] || 'value'}\`.`, `💾 Variable \`${args[0] || 'data'}\` enregistrée avec la valeur \`${args[1] || 'value'}\`.`);
        } else if (fnLower === 'calculate' || fnLower === 'ceil' || fnLower === 'floor' || fnLower === 'round' || fnLower === 'sum' || fnLower === 'sub' || fnLower === 'multi' || fnLower === 'divide') {
          simulatedFeedback = T(`🔢 Calculation result: \`${args[0] || 'expression'}\``, `🔢 Résultat du calcul : \`${args[0] || 'expression'}\``);
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
   * Renders the realistic Discord Message Simulator Frame.
   */
  function renderDiscordSimulator(parsed) {
    const { embed, buttons, selectMenu, messageText, isEphemeral, attachment, simulatedFeedback } = parsed;

    const effectiveText = messageText || simulatedFeedback || (embed ? '' : T('✅ Command executed successfully.', '✅ Commande exécutée avec succès.'));

    let html = `
      <div class="discord-preview-badge-header">
        <span>${T('Discord Simulator Live Preview', 'Aperçu Discord en direct')}</span>
        <span class="badge-tag">
          <svg class="pxicon text-[13px]" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/pixelarticons.svg#smart_toy"></use></svg>
          ${T('Bot Simulator', 'Simulateur')}
        </span>
      </div>
      <div class="discord-simulator-frame">
        <div class="discord-msg-row">
          <div class="discord-avatar">🤖</div>
          <div class="discord-msg-content w-full">
            <div class="discord-header">
              <span class="discord-username">${T('Bot Creator Assistant', 'Assistant Bot Creator')}</span>
              <span class="discord-bot-tag">BOT ✔</span>
              <span class="discord-timestamp">${T('Today at 2:32 PM', 'Aujourd\'hui à 14:32')}</span>
            </div>
    `;

    if (effectiveText) {
      html += `<div class="text-[14px] leading-relaxed mb-2">${formatDiscordMarkdown(effectiveText)}</div>`;
    }

    if (attachment) {
      html += `
        <div class="discord-attachment-file mb-2">
          <svg class="pxicon file-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/pixelarticons.svg#attachment"></use></svg>
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
            ${btn.style === 'link' ? '<svg class="pxicon text-[13px]" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/pixelarticons.svg#open_in_new"></use></svg>' : ''}
          </button>
        `;
      });
      html += `</div>`;
    }

    if (selectMenu) {
      html += `
        <div class="discord-select-menu mt-2">
          <span>${escapeHtml(selectMenu.placeholder)}</span>
          <svg class="pxicon text-base" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/pixelarticons.svg#expand_more"></use></svg>
        </div>
      `;
    }

    if (isEphemeral) {
      html += `
        <div class="discord-ephemeral-notice mt-2">
          <svg class="pxicon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/pixelarticons.svg#visibility_off"></use></svg>
          <span>${T('Only you can see this', 'Visible uniquement par vous')} • <a href="#" class="underline hover:text-white" onclick="return false;">${T('Dismiss message', 'Ignorer le message')}</a></span>
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

      // A BDFD snippet is not shown as app blocks: the app runs BDFD code as code
      // (command mode "BDFD Code"), so no block can honestly stand for it.
      const dualView = document.createElement('div');
      dualView.className = 'dual-view-tabs';

      const nav = document.createElement('div');
      nav.className = 'dual-view-nav';
      nav.innerHTML = `
        <span class="dual-tab-btn active">
          <svg class="pxicon tab-accent" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/pixelarticons.svg#code"></use></svg>
          <span>Script (BDFD / BDScript)</span>
        </span>
        <div class="dual-tab-actions">
          <button class="dual-copy-btn" type="button" title="Copy code snippet">
            <svg class="pxicon text-[14px]" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/pixelarticons.svg#content_copy"></use></svg>
            <span>Copy</span>
          </button>
        </div>
      `;

      const panelScript = document.createElement('div');
      panelScript.className = 'dual-tab-panel active';
      panelScript.appendChild(preContainer.cloneNode(true));

      dualView.appendChild(nav);
      dualView.appendChild(panelScript);

      const discordPreview = document.createElement('div');
      discordPreview.innerHTML = renderDiscordSimulator(parsed);

      const copyBtn = nav.querySelector('.dual-copy-btn');
      if (copyBtn) {
        const status = document.createElement('p');
        status.className = 'copy-feedback text-xs';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        status.hidden = true;
        nav.after(status);
        copyBtn.addEventListener('click', async () => {
          const label = copyBtn.querySelector('span:last-child');
          try {
            await navigator.clipboard.writeText(rawCode);
            if (label) { label.textContent = 'Copied!'; setTimeout(() => { label.textContent = 'Copy'; }, 2000); }
            status.textContent = 'Code copied to clipboard.';
            status.classList.remove('text-error');
          } catch {
            status.textContent = 'Could not copy. Open Script View and select the code to copy it manually.';
            status.classList.add('text-error');
          }
          status.hidden = false;
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
    renderDiscordSimulator,
    initBdfdPreviews
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
