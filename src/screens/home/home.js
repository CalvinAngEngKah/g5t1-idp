/**
 * Screen: Tab 1 — Home Module
 */

window.App = window.App || {};

window.App.registerScreen('home', {
  id: 'screen-home',
  title: 'Home — Daily Budget Pacing',

  render() {
    return `
      <section class="screen app-tab-screen" id="screen-home">
        <!-- Mini Simulator Bar inside Home for live UI testing -->
        <div class="simulator-strip">
          <span style="font-weight: 700; font-size: 11px;">Limit State:</span>
          <div class="simulator-pills-row">
            <button class="sim-pill active" id="sim-state-within">Within Limit</button>
            <button class="sim-pill amber" id="sim-state-warning">Warning</button>
            <button class="sim-pill rose" id="sim-state-over">Over Limit</button>
          </div>
        </div>

        <!-- Topbar -->
        <header class="home-topbar">
          <div class="home-brand-title">
            Save Now
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sn-emerald-500); display: inline-block;"></span>
          </div>
          <!-- Streak Pill -->
          <button class="home-streak-pill" data-goto="screen-social">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
            </svg>
            98-DAY STREAK
          </button>
        </header>

        <!-- Dynamic Circular Gauge (Within Limit · Print.png) -->
        <div class="hero-ring-wrapper">
          <div class="ring-svg-container">
            <svg class="ring-svg" viewBox="0 0 220 220">
              <circle class="ring-bg-track" cx="110" cy="110" r="100"/>
              <circle class="ring-fill-bar" id="home-ring-fill" cx="110" cy="110" r="100" stroke-dasharray="628.3" stroke-dashoffset="82"/>
            </svg>

            <div class="ring-center-content">
              <div class="ring-eyebrow">SPENT TODAY</div>
              <div class="ring-big-num" id="gauge-spent-today">$17.40</div>
              <div class="ring-diff-sub" id="gauge-diff-text">$2.60 under your $20 limit</div>
            </div>
          </div>
        </div>

        <!-- Nudge Banner Pill -->
        <div class="nudge-pill-banner" id="home-nudge-banner">
          <div class="nudge-left">
            <span class="nudge-icon">!</span>
            <span id="home-nudge-text">$2.60 left today. Plan your dinner &rsaquo;</span>
          </div>
        </div>

        <!-- Saved Month Card -->
        <div class="saved-metric-card" data-goto="screen-insights">
          <div>
            <div class="saved-label">SAVED · MONTH</div>
            <div class="saved-value">$190</div>
          </div>
          <div class="ontrack-badge">
            <span>&uarr;</span> on track
          </div>
        </div>

        <!-- Latest Expense Section -->
        <div class="expense-section-heading">LATEST EXPENSE</div>
        <div id="home-latest-expense-list"></div>
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
    document.querySelectorAll('.sim-pill').forEach(b => b.classList.remove('active'));
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
        if (ringFill) ringFill.style.stroke = 'var(--sn-amber-500)';
        if (diffEl) diffEl.textContent = `$${remaining.toFixed(2)} under your $${limit.toFixed(0)} limit`;
        if (nudgeText) nudgeText.textContent = `$${remaining.toFixed(2)} left today. Stay mindful! ›`;
        if (nudgeBanner) {
          nudgeBanner.style.background = 'var(--sn-amber-50)';
          nudgeBanner.style.borderColor = 'var(--sn-amber-500)';
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
      if (ringFill) ringFill.style.stroke = 'var(--sn-rose-500)';
      if (diffEl) diffEl.textContent = `$${overAmt.toFixed(2)} over your $${limit.toFixed(0)} limit`;
      if (nudgeText) nudgeText.textContent = `$${overAmt.toFixed(2)} over limit · Apply 4-day catch up plan ›`;
      if (nudgeBanner) {
        nudgeBanner.style.background = 'var(--sn-rose-50)';
        nudgeBanner.style.borderColor = 'var(--sn-rose-500)';
      }
    }
  },

  renderExpenses() {
    const container = document.getElementById('home-latest-expense-list');
    if (!container) return;

    container.innerHTML = '';
    window.App.state.home.latestExpenses.slice(0, 3).forEach(exp => {
      const item = document.createElement('div');
      item.className = 'latest-expense-item';
      item.innerHTML = `
        <div class="expense-left-meta">
          <div class="expense-avatar-box">${exp.initials}</div>
          <div>
            <div class="expense-title">${window.App.escapeHTML(exp.title)}</div>
            <div class="expense-subtitle">${window.App.escapeHTML(exp.sub)}</div>
          </div>
        </div>
        <div class="expense-right-amount">$${exp.amount.toFixed(2)}</div>
      `;
      container.appendChild(item);
    });
  }
});
