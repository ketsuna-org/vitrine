---
layout: default
title: Build Discord bots with a visual workspace
description: Bot Creator helps teams build commands, manage workflows, and run Discord bots from one professional app.
locale: en
translation_key: home
content_language: en
---
{% assign t = site.data.locales[page.locale] %}
{% assign downloads = site.data.downloads %}
{% assign latest_posts = site.posts | where: "locale", "en" | slice: 0, 3 %}

<section class="site-grid page-section pb-24">
  <div class="page-hero rounded-3xl" data-reveal>
    <div class="hero-layout" style="grid-template-columns: minmax(0, 1.1fr) minmax(24rem, 1.3fr); align-items: center;">
      <div class="hero-copy">
        <div class="eyebrow-row mb-2">
          <span class="eyebrow-pill shadow-[0_0_15px_rgba(143,43,223,0.3)]">Professional Builder</span>
          <span class="meta-chip border-white/10 bg-white/5">Local control</span>
        </div>
        <h1 class="text-transparent bg-clip-text bg-gradient-to-br from-white to-purple-200 tracking-tight leading-[1.05] pb-2">
          Ship Discord automation without the chaos.
        </h1>
        <p class="lede text-purple-100/70 text-lg mb-6">
          Bot Creator helps teams build commands, manage workflows, and run Discord bots from one premium workspace. Keep runtime operations and logs local until you need server hosting.
        </p>
        <div class="button-row mb-8">
          <a class="button button-primary px-8 py-3 text-lg" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
          <a class="button button-secondary px-8 py-3 text-lg bg-white/5" href="{{ t.paths.guides | relative_url }}">Read the docs</a>
        </div>
        <div class="hero-points flex flex-wrap gap-3">
          <span class="hero-point bg-white/5 border-white/10 text-white shadow-sm">Visual command design</span>
          <span class="hero-point bg-white/5 border-white/10 text-white shadow-sm">Integrated dashboard</span>
          <span class="hero-point bg-white/5 border-white/10 text-white shadow-sm">Mobile & Desktop apps</span>
        </div>
      </div>

      <div class="hero-visual relative perspective-1000">
        <!-- Glowing aura behind the mockup -->
        <div class="absolute inset-0 bg-purple-600/30 blur-[80px] rounded-full transform scale-90 translate-y-4 pointer-events-none"></div>
        
        <!-- Desktop App Mockup -->
        <div class="relative w-full rounded-2xl overflow-hidden shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(114,20,199,0.3)] border border-white/10 bg-[#0d0716] flex flex-col h-[520px] transform transition-transform hover:scale-[1.02] duration-500">
          
          <!-- Titlebar -->
          <div class="h-8 bg-[#0a0512] flex items-center justify-between px-4 border-b border-white/5 flex-shrink-0">
            <div class="flex gap-2">
              <div class="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            </div>
            <div class="text-[11px] font-bold tracking-wider text-white/30 uppercase">bot_creator</div>
            <div class="w-12"></div>
          </div>
          
          <!-- App Layout -->
          <div class="flex flex-1 overflow-hidden">
            <!-- Sidebar -->
            <div class="w-[180px] bg-[#0c0614] border-r border-white/5 flex flex-col pt-5 pb-3 px-3 flex-shrink-0">
              <div class="text-white font-bold px-3 mb-5 text-[13px] tracking-wide">JeanMichel</div>
              <div class="flex flex-col gap-1.5">
                <div class="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-[10px] px-3 py-2.5 text-[13px] font-medium flex items-center gap-3 shadow-[0_4px_15px_rgba(147,51,234,0.3)]">
                  <svg class="w-4 h-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  Home
                </div>
                <div class="text-white/40 hover:text-white/90 hover:bg-white/5 rounded-[10px] px-3 py-2.5 text-[13px] font-medium flex items-center gap-3 transition-colors cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Commands
                </div>
                <div class="text-white/40 hover:text-white/90 hover:bg-white/5 rounded-[10px] px-3 py-2.5 text-[13px] font-medium flex items-center gap-3 transition-colors cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Globals
                </div>
                <div class="text-white/40 hover:text-white/90 hover:bg-white/5 rounded-[10px] px-3 py-2.5 text-[13px] font-medium flex items-center gap-3 transition-colors cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                  Dashboard
                </div>
              </div>
            </div>
            
            <!-- Main Content Area -->
            <div class="flex-1 bg-[#150a25] flex flex-col relative overflow-hidden">
               <!-- Content topbar -->
               <div class="h-10 bg-gradient-to-r from-[#6b1e9e] to-[#4c1275] flex justify-center items-center px-4 rounded-tl-[16px] shadow-sm relative z-20">
                  <span class="text-white font-bold text-sm tracking-wide">JeanMichel</span>
               </div>
               
               <div class="flex-1 p-6 flex flex-col items-center overflow-y-auto z-10">
                  <!-- Avatar -->
                  <div class="w-16 h-16 rounded-full bg-[#fbd141] flex items-center justify-center text-[#150a25] text-xl font-bold mb-3 shadow-[0_0_20px_rgba(251,209,65,0.3)] mt-2">
                     JM
                  </div>
                  <h2 class="text-white text-[22px] font-bold mb-5 tracking-tight">JeanMichel</h2>
                  
                  <button class="w-full max-w-[340px] bg-gradient-to-b from-[#58b76a] to-[#439651] hover:from-[#62c976] hover:to-[#4aa95b] text-white font-bold py-3 px-4 rounded-[12px] flex items-center justify-center gap-2 mb-8 shadow-[0_8px_20px_rgba(67,150,81,0.3)] border border-green-400/30 transition-all cursor-pointer">
                     <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                     Start Bot
                  </button>
                  
                  <!-- Quick Access Grid -->
                  <div class="w-full max-w-[340px] mb-5">
                     <div class="text-white/50 text-[11px] font-bold tracking-widest uppercase mb-3 px-1">Quick Access</div>
                     <div class="grid grid-cols-3 gap-3">
                        <div class="bg-white/[0.03] border border-white/[0.06] rounded-[16px] aspect-square flex flex-col items-center justify-center gap-2 hover:bg-white/[0.06] transition-colors cursor-pointer shadow-sm">
                           <span class="text-2xl opacity-90 drop-shadow-md">😃</span>
                           <span class="text-[11px] text-white/50 font-medium">Emojis</span>
                        </div>
                        <div class="bg-white/[0.03] border border-white/[0.06] rounded-[16px] aspect-square flex flex-col items-center justify-center gap-2 hover:bg-white/[0.06] transition-colors cursor-pointer shadow-sm">
                           <svg class="w-7 h-7 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                           <span class="text-[11px] text-white/50 font-medium">Dashboard</span>
                        </div>
                        <div class="bg-white/[0.03] border border-white/[0.06] rounded-[16px] aspect-square flex flex-col items-center justify-center gap-2 hover:bg-white/[0.06] transition-colors cursor-pointer shadow-sm">
                           <svg class="w-7 h-7 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                           <span class="text-[11px] text-white/50 font-medium">Settings</span>
                        </div>
                     </div>
                  </div>
                  
                  <!-- List actions -->
                  <div class="w-full max-w-[340px] flex flex-col gap-2.5">
                     <div class="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded-[10px] py-2.5 px-4 flex items-center justify-center text-white/70 text-[13px] font-medium cursor-pointer transition-colors shadow-sm">
                       <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                       View bot logs
                     </div>
                     <div class="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded-[10px] py-2.5 px-4 flex items-center justify-center text-white/70 text-[13px] font-medium cursor-pointer transition-colors shadow-sm">
                       <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                       View bot stats
                     </div>
                     
                     <div class="h-[1px] bg-white/5 my-1"></div>
                     
                     <div class="bg-gradient-to-b from-[#3ba55c]/20 to-transparent hover:from-[#3ba55c]/30 border border-[#3ba55c]/30 rounded-[10px] py-2.5 px-4 flex items-center justify-center text-green-300 text-[13px] font-medium cursor-pointer transition-colors shadow-sm">
                       Invite Bot
                     </div>
                     <div class="bg-gradient-to-b from-red-500/20 to-red-600/10 hover:from-red-500/30 border border-red-500/30 rounded-[10px] py-2.5 px-4 flex items-center justify-center text-red-300 text-[13px] font-medium cursor-pointer transition-colors shadow-sm mt-1 mb-8">
                       <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                       Delete App
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section-shell relative z-10" data-reveal>
    <div class="section-header">
      <p class="section-label">Why Bot Creator</p>
      <h2 class="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">A clearer way to ship Discord automation.</h2>
      <p class="section-intro">The product is built for teams that want a reliable workflow from first setup to daily bot operations.</p>
    </div>
    <div class="feature-grid mt-8">
      <article class="feature-card">
        <h2 class="text-purple-100 flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]"><svg class="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg></div> Visual command design</h2>
        <p class="mt-4">Build slash commands, options, and response logic without losing track of permissions, variables, or flows.</p>
      </article>
      <article class="feature-card">
        <h2 class="text-purple-100 flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.3)]"><svg class="w-4 h-4 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg></div> Script with BDScript</h2>
        <p class="mt-4">Write your code using BDScript, the famously accessible and powerful scripting language of Bot Designer For Discord.</p>
      </article>
      <article class="feature-card">
        <h2 class="text-purple-100 flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]"><svg class="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg></div> Day-to-day control</h2>
        <p class="mt-4">Keep startup actions, logs, sync, and runtime checks in the same product your team already uses to build the bot.</p>
      </article>
      <article class="feature-card">
        <h2 class="text-purple-100 flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.3)]"><svg class="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg></div> Growth without early infrastructure</h2>
        <p class="mt-4">Start locally, validate the workflow, and add Linux or Docker only when hosting becomes an operational need.</p>
      </article>
    </div>
  </section>

  <section class="section-shell relative z-10" data-reveal>
    <div class="split-grid">
      <article class="panel-card flex flex-col justify-center">
        <p class="section-label">Control & ownership</p>
        <h2 class="text-3xl font-bold mt-4 mb-4">Keep your bot workflow understandable.</h2>
        <p class="mb-6 text-purple-100/70">Bot Creator keeps editing, runtime control, and data handling in one product so you do not have to piece together scripts, dashboards, and hosting glue.</p>
        <ul class="space-y-4">
          <li class="flex gap-3">
             <svg class="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
             <span class="text-white/80">Local storage is the default for commands, workflows, variables, and logs.</span>
          </li>
          <li class="flex gap-3">
             <svg class="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
             <span class="text-white/80">Google Drive backup is optional when you want portability across devices.</span>
          </li>
          <li class="flex gap-3">
             <svg class="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
             <span class="text-white/80">The Docker runner is available once remote Linux uptime becomes necessary.</span>
          </li>
        </ul>
      </article>

      <div class="panel-stack">
        <article class="panel-card pb-8">
          <p class="section-label">Seamless ecosystem</p>
          <h2 class="text-2xl font-bold mt-4 mb-3">Use the same product everywhere.</h2>
          <p class="mb-6">Start with the platform that fits your day-to-day work.</p>
          <div class="flex flex-wrap gap-2">
            <a class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition" href="{{ downloads.stores.android_play.url }}" target="_blank" rel="noopener noreferrer">Android</a>
            <a class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition" href="{{ downloads.stores.ios_appstore.url }}" target="_blank" rel="noopener noreferrer">iOS</a>
            <a class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition" href="{{ downloads.stores.steam.url }}" target="_blank" rel="noopener noreferrer">Windows / Mac / Linux</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <div class="cta-banner relative overflow-hidden flex flex-col items-center text-center py-16 mt-12" data-reveal>
    <div class="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent"></div>
    <div class="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
      <p class="section-label mb-6">Ready to build?</p>
      <h2 class="text-4xl font-bold mb-6 tracking-tight">Create a bot workflow that scales easily.</h2>
      <p class="text-lg text-purple-100/70 mb-8 max-w-xl">Start in the app, keep control local, and add runner infrastructure only when it gives your team a real operational benefit.</p>
      <div class="flex flex-wrap justify-center gap-4">
        <a class="button button-primary px-8 py-3 text-lg" href="{{ t.paths.download | relative_url }}">{{ t.shell.primary_cta }}</a>
        <a class="button button-secondary px-8 py-3 text-lg" href="{{ t.paths.guides | relative_url }}">{{ t.nav.guides }}</a>
      </div>
    </div>
  </div>
</section>
