/**
 * BDFD Visual Blocks & Discord Message Simulator Engine
 * Automatically parses BDFD / BDScript code blocks in documentation and generates:
 * 1. A syntax-highlighted script panel with a Copy button
 * 2. Realistic Discord Simulator Preview (Bot avatar, embeds, buttons, select menus, attachments)
 */

(function (global) {
  'use strict';

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
   * Renders the realistic Discord Message Simulator Frame.
   */
  function renderDiscordSimulator(parsed) {
    const { embed, buttons, selectMenu, messageText, isEphemeral, attachment, simulatedFeedback } = parsed;

    const effectiveText = messageText || simulatedFeedback || (embed ? '' : '✅ Command executed successfully.');

    let html = `
      <div class="discord-preview-badge-header">
        <span>Discord Simulator Live Preview</span>
        <span class="badge-tag">
          <svg class="reicon text-[13px]" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/reicon.svg#smart_toy"></use></svg>
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
          <svg class="reicon file-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/reicon.svg#attachment"></use></svg>
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
            ${btn.style === 'link' ? '<svg class="reicon text-[13px]" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/reicon.svg#open_in_new"></use></svg>' : ''}
          </button>
        `;
      });
      html += `</div>`;
    }

    if (selectMenu) {
      html += `
        <div class="discord-select-menu mt-2">
          <span>${escapeHtml(selectMenu.placeholder)}</span>
          <svg class="reicon text-base" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/reicon.svg#expand_more"></use></svg>
        </div>
      `;
    }

    if (isEphemeral) {
      html += `
        <div class="discord-ephemeral-notice mt-2">
          <svg class="reicon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/reicon.svg#visibility_off"></use></svg>
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

      // A BDFD snippet is not shown as app blocks: the app runs BDFD code as code
      // (command mode "BDFD Code"), so no block can honestly stand for it.
      const dualView = document.createElement('div');
      dualView.className = 'dual-view-tabs';

      const nav = document.createElement('div');
      nav.className = 'dual-view-nav';
      nav.innerHTML = `
        <span class="dual-tab-btn active">
          <svg class="reicon tab-accent" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/reicon.svg#code"></use></svg>
          <span>Script (BDFD / BDScript)</span>
        </span>
        <div class="dual-tab-actions">
          <button class="dual-copy-btn" type="button" title="Copy code snippet">
            <svg class="reicon text-[14px]" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="/assets/icons/reicon.svg#content_copy"></use></svg>
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
