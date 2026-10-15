/**
 * Screen: Setup Step 3 — Recurring Expenses Module
 */

window.App = window.App || {};

window.App.registerScreen('setup-3', {
  id: 'screen-setup-3',
  title: 'ADD RECURRING EXPENSES',

  render() {
    return `
      <section class="screen" id="screen-setup-3">
        <header class="ios-nav-bar">
          <button class="ios-nav-back" data-goto="screen-setup-2">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 2L2 10L10 18"/>
            </svg>
            <span>Back</span>
          </button>
          <span class="ios-nav-title">Recurring Expenses</span>
          <span style="width: 48px;"></span>
        </header>
        <div class="screen-scrollable-body" style="padding-top: 0;">
          <div class="step-stepper">
            <div class="step-dot done"></div>
            <div class="step-dot done"></div>
            <div class="step-dot active"></div>
            <div class="step-dot"></div>
          </div>

          <div class="setup-header-group">
            <div class="setup-eyebrow">SETUP · STEP 3 OF 4</div>
            <h2 class="setup-title">ADD RECURRING EXPENSES</h2>
            <p class="setup-subtitle">Rent, Subscriptions, regular expenses, etc.</p>
          </div>

          <div class="input-outline-box">
            <span class="input-outline-label">PURPOSE/NAME</span>
            <input type="text" class="input-outline-field" id="rec-name-input" placeholder="e.g. SPOTIFY, NETFLIX">
          </div>

          <div class="form-grid-2">
            <div class="input-outline-box">
              <span class="input-outline-label">AMOUNT</span>
              <input type="text" class="input-outline-field" id="rec-amount-input" placeholder="$0.00">
            </div>
            <div class="input-outline-box" id="category-picker-trigger">
              <span class="input-outline-label">CATEGORY</span>
              <div class="category-dropdown-trigger">
                <span class="category-dropdown-value" id="category-picker-value">MUSIC</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          <div class="recurring-day-calendar-row">
            <div class="input-outline-box recurring-day-box">
              <span class="input-outline-label">DAY</span>
              <input type="number" class="input-outline-field" id="rec-day-input" value="17" min="1" max="31">
            </div>
            <span class="day-helper-text">th day of the</span>
            <div class="input-outline-box recurring-cal-box">
              <span class="input-outline-label">CALENDAR</span>
              <input type="text" class="input-outline-field" value="MONTH" readonly>
            </div>
          </div>

          <button class="btn btn-outline" id="add-recurring-btn" style="height: 42px; margin-bottom: 8px;">Add</button>

          <!-- Expense List Container -->
          <div class="expense-list-container">
            <span class="expense-list-container-label">EXPENSE LIST</span>

            <div id="recurring-items-container"></div>

            <div class="empty-expense-state" id="empty-recurring-state" style="display: none;">
              <div class="empty-expense-title">NO RECURRING EXPENSES YET</div>
              <div class="empty-expense-subtitle">ADD ONE ABOVE WHEN YOU'RE READY</div>
            </div>
          </div>

          <p class="swipe-hint-text" id="swipe-hint-text">SWIPE LEFT, OR USE EDIT / REMOVE</p>
        </div>

        <footer class="screen-footer-actions">
          <button class="btn btn-outline" data-goto="screen-setup-2">Back</button>
          <button class="btn btn-primary" data-goto="screen-setup-4">Continue</button>
        </footer>
      </section>
    `;
  },

  init() {
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

        window.App.state.recurringExpenses.push(newItem);
        this.renderList();

        if (nameInput) nameInput.value = '';
        if (amountInput) amountInput.value = '';
        window.App.showToast(`Added ${newItem.name} ($${amt.toFixed(2)})`);
      });
    }

    this.renderList();
  },

  renderList() {
    const container = document.getElementById('recurring-items-container');
    const emptyState = document.getElementById('empty-recurring-state');
    const swipeHint = document.getElementById('swipe-hint-text');

    if (!container) return;
    container.innerHTML = '';

    const list = window.App.state.recurringExpenses;

    if (list.length === 0) {
      if (emptyState) emptyState.style.display = 'flex';
      if (swipeHint) swipeHint.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (swipeHint) swipeHint.style.display = 'block';

    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'recurring-expense-card';
      card.setAttribute('data-id', item.id);

      card.innerHTML = `
        <div class="recurring-main-row">
          <div>
            <div class="rec-title">${window.App.escapeHTML(item.name)}</div>
            <div class="rec-cat">${window.App.escapeHTML(item.category)}</div>
          </div>
          <div>
            <div class="rec-amount">$${item.amount.toFixed(2)}</div>
            <div class="rec-freq">${item.day}th / ${item.frequency}</div>
          </div>
        </div>
        <div class="rec-actions-row">
          <button class="rec-action-link edit" onclick="window.App.screens['setup-3'].editItem('${item.id}')">Edit</button>
          <button class="rec-action-link remove" onclick="window.App.screens['setup-3'].removeItem('${item.id}')">Remove</button>
        </div>
      `;

      let startX = 0;
      card.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      card.addEventListener('touchend', (e) => {
        const diffX = e.changedTouches[0].clientX - startX;
        if (diffX < -50) {
          this.removeItem(item.id);
        }
      });

      container.appendChild(card);
    });
  },

  removeItem(id) {
    const list = window.App.state.recurringExpenses;
    const idx = list.findIndex(i => i.id === id);
    if (idx !== -1) {
      const removed = list.splice(idx, 1)[0];
      this.renderList();
      window.App.showToast(`Removed ${removed.name}`);
    }
  },

  editItem(id) {
    const list = window.App.state.recurringExpenses;
    const item = list.find(i => i.id === id);
    if (!item) return;
    const newName = prompt('Edit expense name:', item.name);
    if (newName) {
      item.name = newName.toUpperCase();
      this.renderList();
    }
  }
});
