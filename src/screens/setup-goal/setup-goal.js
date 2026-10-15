/**
 * Screen: Setup Step 2 — Goal & Budget Module
 */

window.App = window.App || {};

window.App.registerScreen('setup-2', {
  id: 'screen-setup-2',
  title: 'Set your goal & budget',

  render() {
    return `
      <section class="screen" id="screen-setup-2">
        <div class="screen-scrollable-body">
          <div class="step-stepper">
            <div class="step-dot done"></div>
            <div class="step-dot active"></div>
            <div class="step-dot"></div>
            <div class="step-dot"></div>
          </div>

          <div class="setup-header-group">
            <div class="setup-eyebrow">SETUP · STEP 2 OF 4</div>
            <h2 class="setup-title">Set your goal &amp; budget</h2>
            <p class="setup-subtitle">Set a goal and spending limits. You can edit these later in Settings.</p>
          </div>

          <!-- Section: GOAL -->
          <div class="form-section-title">GOAL</div>
          <div class="input-outline-box">
            <span class="input-outline-label">PURPOSE</span>
            <input type="text" class="input-outline-field" id="goal-purpose-input" value="Buy a MacBook Pro">
          </div>

          <div class="form-grid-2">
            <div class="input-outline-box">
              <span class="input-outline-label">GOAL AMOUNT</span>
              <input type="text" class="input-outline-field" id="goal-amount-input" value="$2,000">
            </div>
            <div class="input-outline-box">
              <span class="input-outline-label">GOAL DATE</span>
              <input type="text" class="input-outline-field" id="goal-date-input" value="12/2026">
            </div>
          </div>

          <!-- Section: BUDGET -->
          <div class="form-section-title">BUDGET</div>
          
          <div class="budget-row-item">
            <div class="input-outline-box">
              <span class="input-outline-label">DAILY</span>
              <input type="text" class="input-outline-field" id="budget-daily-input" value="$20">
            </div>
            <span class="budget-desc-text">Daily spending limit</span>
          </div>

          <div class="budget-row-item">
            <div class="input-outline-box">
              <span class="input-outline-label">WEEKLY</span>
              <input type="text" class="input-outline-field" id="budget-weekly-input" value="$140">
            </div>
            <span class="budget-desc-text">Any 7 consecutive days</span>
          </div>

          <div class="budget-row-item">
            <div class="input-outline-box">
              <span class="input-outline-label">MONTHLY</span>
              <input type="text" class="input-outline-field" id="budget-monthly-input" value="$600">
            </div>
            <span class="budget-desc-text">30-day spending limit</span>
          </div>

          <!-- Section: INCOME -->
          <div class="form-section-title">INCOME</div>
          <div class="budget-row-item">
            <div class="input-outline-box">
              <span class="input-outline-label">MONTHLY</span>
              <input type="text" class="input-outline-field" id="income-monthly-input" value="$800">
            </div>
            <span class="budget-desc-text">Expected take-home</span>
          </div>
        </div>

        <footer class="screen-footer-actions">
          <button class="btn btn-outline" data-goto="screen-setup-1">Back</button>
          <button class="btn btn-primary" data-goto="screen-setup-3">Continue</button>
        </footer>
      </section>
    `;
  },

  init() {
    const purposeInput = document.getElementById('goal-purpose-input');
    const amountInput = document.getElementById('goal-amount-input');
    const dateInput = document.getElementById('goal-date-input');
    const dailyInput = document.getElementById('budget-daily-input');
    const weeklyInput = document.getElementById('budget-weekly-input');
    const monthlyInput = document.getElementById('budget-monthly-input');
    const incomeInput = document.getElementById('income-monthly-input');

    if (purposeInput) {
      purposeInput.addEventListener('input', e => window.App.state.goal.purpose = e.target.value);
    }
    if (amountInput) {
      amountInput.addEventListener('change', e => {
        const val = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0;
        window.App.state.goal.amount = val;
        e.target.value = `$${val.toLocaleString()}`;
      });
    }
    if (dateInput) {
      dateInput.addEventListener('input', e => window.App.state.goal.date = e.target.value);
    }
    if (dailyInput) {
      dailyInput.addEventListener('change', e => {
        const val = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 20;
        window.App.state.budget.daily = val;
        window.App.state.home.dailyLimit = val;
        e.target.value = `$${val}`;
        window.App.state.emit('budgetChange', val);
      });
    }
    if (weeklyInput) {
      weeklyInput.addEventListener('change', e => {
        const val = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 140;
        window.App.state.budget.weekly = val;
        e.target.value = `$${val}`;
      });
    }
    if (monthlyInput) {
      monthlyInput.addEventListener('change', e => {
        const val = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 600;
        window.App.state.budget.monthly = val;
        e.target.value = `$${val}`;
      });
    }
    if (incomeInput) {
      incomeInput.addEventListener('change', e => {
        const val = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 800;
        window.App.state.budget.incomeMonthly = val;
        e.target.value = `$${val}`;
      });
    }
  }
});
