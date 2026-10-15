/**
 * Screen: Tab 1 — Home Module
 * Styled according to Apple iOS HIG (Segmented Controls, SF Symbols, Inset Grouped Lists)
 */

window.App = window.App || {};

window.App.registerScreen('home', {
  id: 'screen-home',
  title: 'Home — Daily Budget Pacing',

  render() {
    return `
      <section class="screen app-tab-screen" id="screen-home">
        <!-- iOS Navigation Bar -->
        <header class="ios-nav-bar" style="padding-top: 4px;">
          <div class="home-brand-title" style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; display: flex; align-items: center; gap: 6px;">
            Save Now
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sn-emerald-500); display: inline-block;"></span>
          </div>

          <!-- Streak Pill with SF Symbol flame.fill -->
          <button class="home-streak-pill" data-goto="screen-social" style="background: var(--ios-fill); border-radius: var(--ios-radius-capsule); padding: 5px 12px; font-size: 12px; font-weight: 700; color: var(--ios-system-orange); border: none; cursor: pointer; display: flex; align-items: center; gap: 5px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 23c6.075 0 10-4.043 10-9.61 0-4.66-3.08-8.23-6.62-10.42a1 1 0 0 0-1.48.97c.21 2.45-.63 4.2-2.12 5.37C10.74 8.13 9.4 6.7 8.7 5.03a1 1 0 0 0-1.8.18C5.23 9.24 2 13.06 2 16.39 2 20.95 5.925 23 12 23z"/>
            </svg>
            98-DAY STREAK
          </button>
        </header>

        <div class="screen-scrollable-body" style="padding-top: 4px;">
          <!-- iOS Segmented Control for Limit Simulator -->
          <div class="ios-segmented-control" style="margin-bottom: 14px;">
            <button class="ios-segment-btn active" id="sim-state-within">Within Limit</button>
            <button class="ios-segment-btn" id="sim-state-warning">Warning</button>
            <button class="ios-segment-btn" id="sim-state-over">Over Limit</button>
          </div>

          <!-- Dynamic Circular Gauge (Within Limit · Print.png) -->
          <div class="hero-ring-wrapper" style="margin: 4px 0 16px;">
            <div class="ring-svg-container">
              <svg class="ring-svg" viewBox="0 0 220 220">
                <circle class="ring-bg-track" cx="110" cy="110" r="100"/>
                <circle class="ring-fill-bar" id="home-ring-fill" cx="110" cy="110" r="100" stroke-dasharray="628.3" stroke-dashoffset="82"/>
              </svg>

              <div class="ring-center-content">
                <div class="ring-eyebrow" style="font-size: 11px; font-weight: 700; color: var(--ios-gray-1);">SPENT TODAY</div>
                <div class="ring-big-num" id="gauge-spent-today" style="font-family: var(--font-mono); font-size: 38px; font-weight: 700; letter-spacing: -0.5px;">$17.40</div>
                <div class="ring-diff-sub" id="gauge-diff-text" style="font-size: 13px; font-weight: 500;">$2.60 under your $20 limit</div>
              </div>
            </div>
          </div>

          <!-- iOS Notification Banner Pill -->
          <div class="nudge-pill-banner" id="home-nudge-banner" style="border-radius: var(--ios-radius-btn); margin-bottom: 16px;">
            <div class="nudge-left" style="display: flex; align-items: center; gap: 8px;">
              <span class="nudge-icon" style="background: var(--ios-system-orange); color: #FFFFFF; font-weight: 800; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 11px;">!</span>
              <span id="home-nudge-text" style="font-size: 13px; font-weight: 600;">$2.60 left today. Plan your dinner ›</span>
            </div>
          </div>

          <!-- Saved Month Card (iOS Inset Card) -->
          <div class="ios-inset-group" data-goto="screen-insights" style="margin-bottom: 18px; cursor: pointer;">
            <div style="padding: 16px; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--ios-gray-1); letter-spacing: 0.05em;">SAVED · THIS MONTH</div>
                <div style="font-size: 28px; font-weight: 800; font-family: var(--font-mono); margin-top: 2px;">$190</div>
              </div>
              <div style="background: var(--sn-emerald-100); color: var(--sn-emerald-600); padding: 4px 10px; border-radius: var(--ios-radius-capsule); font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 4px;">
                <span>&uarr;</span> on track
              </div>
            </div>
          </div>

          <!-- Latest Expense Section (iOS Inset Grouped Table) -->
          <div class="ios-section-header">LATEST TRANSACTIONS</div>
          <div class="ios-inset-group" id="home-latest-expense-list"></div>
        </div>
      </section>
    `;
  },

  init() {
    this.bindSimulators();
    this.renderGauge();
    this.renderExpenses();

    // Listen to global changes
    window.App.state.on('budgetChange', () => {
      this.renderGauge();
      this.renderExpenses();
    });
  },

  onEnter() {
    this.renderGauge();
    this.renderExpenses();
  },

  bindSimulators() {
    const simWithin = document.getElementById('sim-state-within');
    const simWarning = document.getElementById('sim-state-warning');
    const simOver = document.getElementById('sim-state-over');

    if (simWithin) {
      simWithin.addEventListener('click', () => {
        window.App.state.home.spentToday = 17.40;
        window.App.state.home.dailyLimit = 20.00;
        this.setActiveSim(simWithin);
        this.renderGauge();
        window.App.showToast('Simulating: Within Limit ($17.40 / $20)');
      });
    }

    if (simWarning) {
      simWarning.addEventListener('click', () => {
        window.App.state.home.spentToday = 19.20;
        window.App.state.home.dailyLimit = 20.00;
        this.setActiveSim(simWarning);
        this.renderGauge();
        window.App.showToast('Simulating: Daily Budget Warning ($19.20 / $20)');
      });
    }

    if (simOver) {
      simOver.addEventListener('click', () => {
        window.App.state.home.spentToday = 23.80;
        window.App.state.home.dailyLimit = 20.00;
        this.setActiveSim(simOver);
        this.renderGauge();
        window.App.showToast('Simulating: Over Limit ($23.80 / $20)');
      });
    }
  },

  setActiveSim(btn) {
    document.querySelectorAll('.ios-segment-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  },

  renderGauge() {
    const ringFill = document.getElementById('home-ring-fill');
    const spentTodayEl = document.getElementById('gauge-spent-today');
    const diffEl = document.getElementById('gauge-diff-text');
    const nudgeText = document.getElementById('home-nudge-text');
    const nudgeBanner = document.getElementById('home-nudge-banner');

    const spent = window.App.state.home.spentToday;
    const limit = window.App.state.home.dailyLimit;
    const remaining = limit - spent;

    if (spentTodayEl) spentTodayEl.textContent = `$${spent.toFixed(2)}`;

    const circumference = 628.3;
    const ratio = Math.min(spent / limit, 1);
    const offset = circumference - (ratio * circumference);

    if (ringFill) ringFill.style.strokeDashoffset = offset;

    if (remaining >= 0) {
      if (ratio > 0.85) {
        if (ringFill) ringFill.style.stroke = 'var(--ios-system-orange)';
        if (diffEl) diffEl.textContent = `$${remaining.toFixed(2)} under your $${limit.toFixed(0)} limit`;
        if (nudgeText) nudgeText.textContent = `$${remaining.toFixed(2)} left today. Stay mindful! ›`;
        if (nudgeBanner) {
          nudgeBanner.style.background = 'var(--sn-amber-50)';
          nudgeBanner.style.borderColor = 'var(--ios-system-orange)';
        }
      } else {
        if (ringFill) ringFill.style.stroke = 'var(--sn-emerald-500)';
        if (diffEl) diffEl.textContent = `$${remaining.toFixed(2)} under your $${limit.toFixed(0)} limit`;
        if (nudgeText) nudgeText.textContent = `$${remaining.toFixed(2)} left today. Plan your dinner ›`;
        if (nudgeBanner) {
          nudgeBanner.style.background = 'var(--sn-amber-50)';
          nudgeBanner.style.borderColor = 'var(--sn-obsidian-900)';
        }
      }
    } else {
      const overAmt = Math.abs(remaining);
      if (ringFill) ringFill.style.stroke = 'var(--ios-system-red)';
      if (diffEl) diffEl.textContent = `$${overAmt.toFixed(2)} over your $${limit.toFixed(0)} limit`;
      if (nudgeText) nudgeText.textContent = `$${overAmt.toFixed(2)} over limit · Apply recovery plan ›`;
      if (nudgeBanner) {
        nudgeBanner.style.background = 'var(--sn-rose-50)';
        nudgeBanner.style.borderColor = 'var(--ios-system-red)';
      }
    }
  },

  renderExpenses() {
    const container = document.getElementById('home-latest-expense-list');
    if (!container) return;

    container.innerHTML = '';
    window.App.state.home.latestExpenses.slice(0, 3).forEach(exp => {
      const item = document.createElement('div');
      item.className = 'ios-list-row';
      
      let iconColor = 'orange';
      let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 19h16v2H4zM20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-2V5h2v3z"/></svg>`;
      
      if (exp.category === 'transport') {
        iconColor = 'blue';
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-4.42 0-8 .5-8 4v10c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4zm-3.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM18 10H6V7h12v3z"/></svg>`;
      } else if (exp.category === 'shopping') {
        iconColor = 'purple';
        iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2z"/></svg>`;
      }

      item.innerHTML = `
        <div class="ios-row-left">
          <div class="ios-icon-box ${iconColor}">
            ${iconSvg}
          </div>
          <div>
            <div class="ios-row-title">${window.App.escapeHTML(exp.title)}</div>
            <div class="ios-row-sub">${window.App.escapeHTML(exp.sub)}</div>
          </div>
        </div>
        <div class="ios-row-right">
          <span style="font-family: var(--font-mono); font-weight: 700; font-size: 16px; color: var(--sn-text-primary);">$${exp.amount.toFixed(2)}</span>
          <svg class="ios-disclosure" viewBox="0 0 8 13" fill="none" stroke="currentColor">
            <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      `;
      container.appendChild(item);
    });
  }
});
