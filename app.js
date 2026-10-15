/**
 * Savenow Mobile Web App — Phase 1 Application Logic
 * Full 5-Tab Navigation, Maze A/B Testing, Micro-Interactions, Real-time SVG Ring
 */

// Application State Store
const state = {
  currentScreen: 'screen-onboarding',
  previousScreen: null,
  theme: 'light',
  mazeVariant: 'A', // 'A' | 'B'
  
  // Step 1: Banks
  connectedBanks: {
    dbs: false,
    ocbc: false,
    uob: false,
    trust: false,
    sc: false
  },

  // Step 2: Goal & Budget
  goal: {
    purpose: 'Buy a MacBook Pro',
    amount: 2000,
    date: '12/2026'
  },
  budget: {
    daily: 20,
    weekly: 140,
    monthly: 600,
    incomeMonthly: 800
  },

  // Step 3: Recurring Expenses
  recurringExpenses: [
    {
      id: 'rec_spotify',
      name: 'SPOTIFY',
      category: 'MUSIC',
      amount: 6.48,
      day: 17,
      frequency: 'MONTH'
    }
  ],

  // Step 4: Socials
  socials: [
    { id: 's1', name: 'Campus Savers', type: 'group', icon: 'CS' },
    { id: 's2', name: 'Marcus Tan (@marcus)', type: 'user', icon: 'MT' }
  ],

  // Home Screen Real-Time State
  home: {
    spentToday: 17.40,
    dailyLimit: 20.00,
    streakDays: 98,
    monthlySaved: 190.00,
    presetState: 'within-limit',
    latestExpenses: [
      {
        id: 'exp_1',
        title: 'Bubble tea',
        sub: 'Grab · 6:40pm',
        initials: 'BT',
        amount: 3.40,
        category: 'food'
      },
      {
        id: 'exp_2',
        title: 'Lunch Bowl',
        sub: 'Subway · 1:15pm',
        initials: 'SW',
        amount: 8.50,
        category: 'food'
      },
      {
        id: 'exp_3',
        title: 'MRT Ride',
        sub: 'SimplyGo · 8:30am',
        initials: 'SG',
        amount: 1.80,
        category: 'transport'
      }
    ]
  }
};

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initBankConnections();
  initGoalBudget();
  initRecurringExpenses();
  initSocials();
  initHomeScreen();
  initThemeAndSimulators();
  initMazeIntegration();
  handleInitialHash();
  renderAll();
});

/* ==========================================================================
   1. Screen Navigation, URL Hash Syncing for Maze Tracking
   ========================================================================== */
function initNavigation() {
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetScreen = btn.getAttribute('data-goto');
      navigateTo(targetScreen);
    });
  });

  // Listen to browser / Maze URL hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const screenId = 'screen-' + hash;
      if (document.getElementById(screenId) && screenId !== state.currentScreen) {
        navigateTo(screenId, 'none', false);
      }
    }
  });
}

function handleInitialHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const screenId = 'screen-' + hash;
    if (document.getElementById(screenId)) {
      navigateTo(screenId, 'none', false);
      return;
    }
  }
  updateBottomNavVisibility(state.currentScreen);
}

function navigateTo(targetId, direction = 'forward', updateHash = true) {
  const current = document.getElementById(state.currentScreen);
  const target = document.getElementById(targetId);

  if (!target || targetId === state.currentScreen) return;

  if (current) {
    current.classList.remove('active');
    if (direction === 'forward') {
      current.classList.add('sliding-back');
      setTimeout(() => current.classList.remove('sliding-back'), 250);
    }
  }

  state.previousScreen = state.currentScreen;
  state.currentScreen = targetId;

  target.classList.add('active');
  target.scrollTop = 0;

  // Sync URL hash so Maze tracks individual mission paths & clicks!
  if (updateHash) {
    const cleanHash = targetId.replace('screen-', '');
    history.pushState(null, null, '#' + cleanHash);
  }

  // Update Bottom Nav Bar visibility & active tabs
  updateBottomNavVisibility(targetId);

  // If entering home screen, refresh gauge animation
  if (targetId === 'screen-home') {
    renderHomeGauge();
  }
}

const MAIN_TAB_SCREENS = ['screen-home', 'screen-insights', 'screen-social', 'screen-settings'];

function updateBottomNavVisibility(screenId) {
  const nav = document.getElementById('app-bottom-nav');
  if (!nav) return;

  if (MAIN_TAB_SCREENS.includes(screenId)) {
    nav.style.display = 'flex';
    
    // Update active tab button
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      const tabTarget = btn.getAttribute('data-goto');
      if (tabTarget === screenId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  } else {
    // Hide bottom nav on Onboarding and Setup steps
    nav.style.display = 'none';
  }
}

/* ==========================================================================
   2. Step 1: Bank Connection Flow (DBS, OCBC, UOB, Trust, Standard Chartered)
   ========================================================================== */
function initBankConnections() {
  const bankButtons = document.querySelectorAll('.btn-bank-connect');
  const splash = document.getElementById('bank-auth-splash');
  const splashText = document.getElementById('bank-auth-status-text');

  bankButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const bankKey = btn.getAttribute('data-bank');
      const bankCard = btn.closest('.bank-item-card');

      if (state.connectedBanks[bankKey]) {
        state.connectedBanks[bankKey] = false;
        btn.classList.remove('connected');
        btn.textContent = 'CONNECT';
        bankCard.classList.remove('connected');
        showToast(`Disconnected bank account`);
        return;
      }

      if (splash) {
        splash.classList.add('open');
        splashText.textContent = `Authenticating securely with ${bankKey.toUpperCase()}...`;
        
        setTimeout(() => {
          splashText.textContent = 'Retrieving transaction permissions...';
        }, 600);

        setTimeout(() => {
          splash.classList.remove('open');
          state.connectedBanks[bankKey] = true;
          btn.classList.add('connected');
          btn.innerHTML = '&#10003; CONNECTED';
          bankCard.classList.add('connected');
          showToast(`Successfully linked ${bankKey.toUpperCase()}!`);
        }, 1300);
      }
    });
  });
}

/* ==========================================================================
   3. Step 2: Goal & Budget Input Engine
   ========================================================================== */
function initGoalBudget() {
  const purposeInput = document.getElementById('goal-purpose-input');
  const amountInput = document.getElementById('goal-amount-input');
  const dateInput = document.getElementById('goal-date-input');
  const dailyInput = document.getElementById('budget-daily-input');
  const weeklyInput = document.getElementById('budget-weekly-input');
  const monthlyInput = document.getElementById('budget-monthly-input');
  const incomeInput = document.getElementById('income-monthly-input');

  if (purposeInput) {
    purposeInput.value = state.goal.purpose;
    purposeInput.addEventListener('input', e => state.goal.purpose = e.target.value);
  }
  if (amountInput) {
    amountInput.value = `$${state.goal.amount.toLocaleString()}`;
    amountInput.addEventListener('change', e => {
      const val = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0;
      state.goal.amount = val;
      e.target.value = `$${val.toLocaleString()}`;
    });
  }
  if (dateInput) {
    dateInput.value = state.goal.date;
    dateInput.addEventListener('input', e => state.goal.date = e.target.value);
  }
  if (dailyInput) {
    dailyInput.value = `$${state.budget.daily}`;
    dailyInput.addEventListener('change', e => {
      const val = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 20;
      state.budget.daily = val;
      state.home.dailyLimit = val;
      e.target.value = `$${val}`;
      renderHomeGauge();
    });
  }
  if (weeklyInput) {
    weeklyInput.value = `$${state.budget.weekly}`;
    weeklyInput.addEventListener('change', e => {
      const val = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 140;
      state.budget.weekly = val;
      e.target.value = `$${val}`;
    });
  }
  if (monthlyInput) {
    monthlyInput.value = `$${state.budget.monthly}`;
    monthlyInput.addEventListener('change', e => {
      const val = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 600;
      state.budget.monthly = val;
      e.target.value = `$${val}`;
    });
  }
  if (incomeInput) {
    incomeInput.value = `$${state.budget.incomeMonthly}`;
    incomeInput.addEventListener('change', e => {
      const val = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 800;
      state.budget.incomeMonthly = val;
      e.target.value = `$${val}`;
    });
  }
}

/* ==========================================================================
   4. Step 3: Recurring Expenses
   ========================================================================== */
function initRecurringExpenses() {
  const addBtn = document.getElementById('add-recurring-btn');
  const catTrigger = document.getElementById('category-picker-trigger');
  const catValueEl = document.getElementById('category-picker-value');
  const catModal = document.getElementById('category-modal');
  const nameInput = document.getElementById('rec-name-input');
  const amountInput = document.getElementById('rec-amount-input');
  const dayInput = document.getElementById('rec-day-input');

  let selectedCategory = 'MUSIC';

  if (catTrigger && catModal) {
    catTrigger.addEventListener('click', () => {
      catModal.classList.add('open');
    });

    document.querySelectorAll('.category-option-item').forEach(item => {
      item.addEventListener('click', () => {
        selectedCategory = item.getAttribute('data-cat');
        if (catValueEl) catValueEl.textContent = selectedCategory;
        catModal.classList.remove('open');
      });
    });

    catModal.addEventListener('click', (e) => {
      if (e.target === catModal) catModal.classList.remove('open');
    });
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const name = (nameInput && nameInput.value.trim()) || 'SUBSCRIPTION';
      const amtStr = (amountInput && amountInput.value.replace(/[^0-9.]/g, '')) || '9.99';
      const amt = parseFloat(amtStr) || 9.99;
      const day = parseInt(dayInput && dayInput.value) || 1;

      const newItem = {
        id: 'rec_' + Date.now(),
        name: name.toUpperCase(),
        category: selectedCategory,
        amount: amt,
        day: day,
        frequency: 'MONTH'
      };

      state.recurringExpenses.push(newItem);
      renderRecurringExpensesList();

      if (nameInput) nameInput.value = '';
      if (amountInput) amountInput.value = '';
      showToast(`Added ${newItem.name} ($${amt.toFixed(2)})`);
    });
  }

  renderRecurringExpensesList();
}

function renderRecurringExpensesList() {
  const container = document.getElementById('recurring-items-container');
  const emptyState = document.getElementById('empty-recurring-state');
  const swipeHint = document.getElementById('swipe-hint-text');

  if (!container) return;
  container.innerHTML = '';

  if (state.recurringExpenses.length === 0) {
    if (emptyState) emptyState.style.display = 'flex';
    if (swipeHint) swipeHint.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (swipeHint) swipeHint.style.display = 'block';

  state.recurringExpenses.forEach(item => {
    const card = document.createElement('div');
    card.className = 'recurring-expense-card';
    card.setAttribute('data-id', item.id);

    card.innerHTML = `
      <div class="recurring-main-row">
        <div>
          <div class="rec-title">${escapeHTML(item.name)}</div>
          <div class="rec-cat">${escapeHTML(item.category)}</div>
        </div>
        <div>
          <div class="rec-amount">$${item.amount.toFixed(2)}</div>
          <div class="rec-freq">${item.day}th / ${item.frequency}</div>
        </div>
      </div>
      <div class="rec-actions-row">
        <button class="rec-action-link edit" onclick="editRecurringExpense('${item.id}')">Edit</button>
        <button class="rec-action-link remove" onclick="deleteRecurringExpense('${item.id}')">Remove</button>
      </div>
    `;

    // Swipe Left
    let startX = 0;
    card.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].clientX - startX;
      if (diffX < -50) {
        deleteRecurringExpense(item.id);
      }
    });

    container.appendChild(card);
  });
}

window.deleteRecurringExpense = function(id) {
  const idx = state.recurringExpenses.findIndex(i => i.id === id);
  if (idx !== -1) {
    const removed = state.recurringExpenses.splice(idx, 1)[0];
    renderRecurringExpensesList();
    showToast(`Removed ${removed.name}`);
  }
};

window.editRecurringExpense = function(id) {
  const item = state.recurringExpenses.find(i => i.id === id);
  if (!item) return;
  const newName = prompt('Edit expense name:', item.name);
  if (newName) {
    item.name = newName.toUpperCase();
    renderRecurringExpensesList();
  }
};

/* ==========================================================================
   5. Step 4: Socials Integration Flow
   ========================================================================== */
function initSocials() {
  const btnGroup = document.getElementById('social-btn-group');
  const btnContacts = document.getElementById('social-btn-contacts');
  const btnUser = document.getElementById('social-btn-user');

  if (btnGroup) {
    btnGroup.addEventListener('click', () => {
      const groupName = prompt('Join a Community Group:', 'NUS Savers Club');
      if (groupName) {
        state.socials.push({
          id: 'grp_' + Date.now(),
          name: groupName,
          type: 'group',
          icon: groupName.substring(0, 2).toUpperCase()
        });
        renderSocialsList();
        showToast(`Joined ${groupName}`);
      }
    });
  }

  if (btnContacts) {
    btnContacts.addEventListener('click', () => {
      showToast('Synced 3 contacts from your phonebook!');
      state.socials.push(
        { id: 'c1', name: 'Samantha Lee', type: 'contact', icon: 'SL' },
        { id: 'c2', name: 'Darren Tan', type: 'contact', icon: 'DT' }
      );
      renderSocialsList();
    });
  }

  if (btnUser) {
    btnUser.addEventListener('click', () => {
      const uname = prompt('Enter username to add accountability buddy:', '@charlie_k');
      if (uname) {
        state.socials.push({
          id: 'u_' + Date.now(),
          name: uname,
          type: 'user',
          icon: uname.substring(1, 3).toUpperCase()
        });
        renderSocialsList();
        showToast(`Connected with ${uname}!`);
      }
    });
  }

  renderSocialsList();
}

function renderSocialsList() {
  const listEl = document.getElementById('socials-list-container');
  if (!listEl) return;
  listEl.innerHTML = '';

  state.socials.forEach(s => {
    const item = document.createElement('div');
    item.className = 'social-member-chip';
    item.innerHTML = `
      <div class="member-left">
        <div class="member-avatar">${s.icon}</div>
        <div>
          <div style="font-size: 13.5px; font-weight: 700; color: var(--sn-text-primary);">${escapeHTML(s.name)}</div>
          <div style="font-size: 11px; color: var(--sn-text-secondary); text-transform: uppercase;">${s.type}</div>
        </div>
      </div>
      <span style="font-size: 11px; font-weight: 700; color: var(--sn-emerald-600); background: var(--sn-emerald-50); padding: 3px 8px; border-radius: var(--radius-pill);">&#10003; Active</span>
    `;
    listEl.appendChild(item);
  });
}

window.cheerFriend = function(btnEl, friendName) {
  if (btnEl) {
    btnEl.classList.add('cheered');
    btnEl.innerHTML = 'Cheered &#10003;';
  }
  showToast(`Sent cheers to ${friendName}! &#128079;`);
};

/* ==========================================================================
   6. Home Screen & Real-Time Dynamic Gauge
   ========================================================================== */
function initHomeScreen() {
  // Center (+) Quick Add Expense modal
  const addCenterBtn = document.getElementById('nav-add-expense-btn');
  const addModal = document.getElementById('add-expense-modal');
  const addConfirmBtn = document.getElementById('confirm-add-expense-btn');

  if (addCenterBtn && addModal) {
    addCenterBtn.addEventListener('click', () => {
      addModal.classList.add('open');
    });

    addModal.addEventListener('click', (e) => {
      if (e.target === addModal) addModal.classList.remove('open');
    });
  }

  if (addConfirmBtn) {
    addConfirmBtn.addEventListener('click', () => {
      const titleInput = document.getElementById('quick-exp-title');
      const amtInput = document.getElementById('quick-exp-amt');
      const catSelect = document.getElementById('quick-exp-cat');

      const title = (titleInput && titleInput.value.trim()) || 'Coffee & snack';
      const amt = parseFloat(amtInput && amtInput.value.replace(/[^0-9.]/g, '')) || 4.20;
      const cat = (catSelect && catSelect.value) || 'food';

      state.home.spentToday += amt;
      state.home.latestExpenses.unshift({
        id: 'exp_' + Date.now(),
        title: title,
        sub: 'Nearby · Just now',
        initials: title.substring(0, 2).toUpperCase(),
        amount: amt,
        category: cat
      });

      renderHomeScreenExpenses();
      renderHomeGauge();
      if (addModal) addModal.classList.remove('open');
      if (titleInput) titleInput.value = '';
      if (amtInput) amtInput.value = '';
      showToast(`Recorded $${amt.toFixed(2)} for ${title}`);
    });
  }

  const nudgeBanner = document.getElementById('home-nudge-banner');
  if (nudgeBanner) {
    nudgeBanner.addEventListener('click', () => {
      showToast('Opening meal & dinner planner...');
    });
  }

  renderHomeScreenExpenses();
}

function renderHomeGauge() {
  const ringFill = document.getElementById('home-ring-fill');
  const spentTodayEl = document.getElementById('gauge-spent-today');
  const diffEl = document.getElementById('gauge-diff-text');
  const nudgeText = document.getElementById('home-nudge-text');
  const nudgeBanner = document.getElementById('home-nudge-banner');

  const spent = state.home.spentToday;
  const limit = state.home.dailyLimit;
  const remaining = limit - spent;

  if (spentTodayEl) spentTodayEl.textContent = `$${spent.toFixed(2)}`;

  const circumference = 628.3;
  const ratio = Math.min(spent / limit, 1);
  const offset = circumference - (ratio * circumference);

  if (ringFill) {
    ringFill.style.strokeDashoffset = offset;
  }

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
}

function renderHomeScreenExpenses() {
  const container = document.getElementById('home-latest-expense-list');
  if (!container) return;

  container.innerHTML = '';
  state.home.latestExpenses.slice(0, 3).forEach(exp => {
    const item = document.createElement('div');
    item.className = 'latest-expense-item';
    item.innerHTML = `
      <div class="expense-left-meta">
        <div class="expense-avatar-box">${exp.initials}</div>
        <div>
          <div class="expense-title">${escapeHTML(exp.title)}</div>
          <div class="expense-subtitle">${escapeHTML(exp.sub)}</div>
        </div>
      </div>
      <div class="expense-right-amount">$${exp.amount.toFixed(2)}</div>
    `;
    container.appendChild(item);
  });
}

/* ==========================================================================
   7. Simulators, Theme Switcher & Maze A/B Testing Integration
   ========================================================================== */
function initThemeAndSimulators() {
  const themeBtn = document.getElementById('toggle-theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', state.theme);
      themeBtn.innerHTML = state.theme === 'light' ? '&#9790; Dark' : '&#9788; Light';
    });
  }

  const simWithin = document.getElementById('sim-state-within');
  const simWarning = document.getElementById('sim-state-warning');
  const simOver = document.getElementById('sim-state-over');

  if (simWithin) {
    simWithin.addEventListener('click', () => {
      state.home.spentToday = 17.40;
      state.home.dailyLimit = 20.00;
      setActiveSimPill(simWithin);
      renderHomeGauge();
      showToast('Simulating: Within Limit ($17.40 / $20)');
    });
  }

  if (simWarning) {
    simWarning.addEventListener('click', () => {
      state.home.spentToday = 19.20;
      state.home.dailyLimit = 20.00;
      setActiveSimPill(simWarning);
      renderHomeGauge();
      showToast('Simulating: Daily Budget Warning ($19.20 / $20)');
    });
  }

  if (simOver) {
    simOver.addEventListener('click', () => {
      state.home.spentToday = 23.80;
      state.home.dailyLimit = 20.00;
      setActiveSimPill(simOver);
      renderHomeGauge();
      showToast('Simulating: Over Limit ($23.80 / $20)');
    });
  }
}

function setActiveSimPill(activeBtn) {
  document.querySelectorAll('.sim-pill').forEach(b => b.classList.remove('active'));
  if (activeBtn) activeBtn.classList.add('active');
}

/* ==========================================================================
   8. Maze A/B Testing Logic
   ========================================================================== */
function initMazeIntegration() {
  const keyInput = document.getElementById('maze-api-key-input');
  const saveBtn = document.getElementById('btn-save-maze-key');
  const copyBtn = document.getElementById('btn-copy-maze-url');
  const statusBadge = document.getElementById('maze-status-badge');

  // Check stored key
  const savedKey = localStorage.getItem('savenow_maze_api_key');
  if (savedKey && keyInput) {
    keyInput.value = savedKey;
    if (statusBadge) {
      statusBadge.textContent = 'Active (Live)';
      statusBadge.style.color = 'var(--sn-emerald-600)';
    }
  }

  // Check URL variant parameter (?variant=A or ?variant=B)
  const urlParams = new URLSearchParams(window.location.search);
  const variantParam = urlParams.get('variant');
  if (variantParam && (variantParam === 'A' || variantParam === 'B')) {
    switchVariant(variantParam);
  }

  if (saveBtn && keyInput) {
    saveBtn.addEventListener('click', () => {
      const keyVal = keyInput.value.trim();
      if (keyVal) {
        localStorage.setItem('savenow_maze_api_key', keyVal);
        if (statusBadge) {
          statusBadge.textContent = 'Key Saved ✓';
          statusBadge.style.color = 'var(--sn-emerald-600)';
        }
        showToast('Maze API Key saved! Refresh to load tracking.');
      }
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const baseUrl = window.location.origin + window.location.pathname;
      const testUrl = `${baseUrl}?variant=${state.mazeVariant}#onboarding`;
      navigator.clipboard.writeText(testUrl).then(() => {
        showToast('Copied test link for Maze!');
      }).catch(() => {
        prompt('Copy this Maze test URL:', testUrl);
      });
    });
  }
}

window.switchVariant = function(variantCode) {
  state.mazeVariant = variantCode;
  document.querySelectorAll('.maze-variant-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('btn-var-' + variantCode.toLowerCase());
  if (activeBtn) activeBtn.classList.add('active');
  showToast(`Switched to A/B Test Variant ${variantCode}`);
};

/* ==========================================================================
   Toast Helper
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('app-toast');
  if (!toast) return;

  toast.innerHTML = `<span>&#9679;</span> ${escapeHTML(message)}`;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderAll() {
  renderHomeGauge();
  renderRecurringExpensesList();
  renderSocialsList();
}
