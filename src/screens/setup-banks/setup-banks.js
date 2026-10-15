/**
 * Screen: Setup Step 1 — Bank Connections Module
 */

window.App = window.App || {};

window.App.registerScreen('setup-1', {
  id: 'screen-setup-1',
  title: 'Connect your bank account',

  render() {
    return `
      <section class="screen" id="screen-setup-1">
        <header class="ios-nav-bar">
          <button class="ios-nav-back" data-goto="screen-onboarding">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 2L2 10L10 18"/>
            </svg>
            <span>Back</span>
          </button>
          <span class="ios-nav-title">Connect Bank</span>
          <span style="width: 48px;"></span>
        </header>
        <div class="screen-scrollable-body" style="padding-top: 0;">
          <div class="step-stepper">
            <div class="step-dot active"></div>
            <div class="step-dot"></div>
            <div class="step-dot"></div>
            <div class="step-dot"></div>
          </div>

          <div class="setup-header-group">
            <div class="setup-eyebrow">SETUP · STEP 1 OF 4</div>
            <h2 class="setup-title">Connect your bank account</h2>
            <p class="setup-subtitle">Link your accounts to auto-categorize daily spending.</p>
          </div>

          <div class="bank-cards-list">
            <!-- DBS Bank -->
            <div class="bank-item-card" id="card-bank-dbs">
              <div class="bank-logo-wrap">
                <svg class="bank-logo-svg" viewBox="0 0 110 32" fill="currentColor">
                  <path d="M6 16L15 7L24 16L15 25L6 16Z" fill="#E11D48"/>
                  <path d="M15 16L24 7L33 16L24 25L15 16Z" fill="#0F172A"/>
                  <text x="42" y="23" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro', sans-serif" font-weight="900" font-size="20" letter-spacing="-0.03em" fill="currentColor">DBS</text>
                </svg>
              </div>
              <button class="btn-bank-connect" data-bank="dbs">CONNECT</button>
            </div>

            <!-- OCBC Bank -->
            <div class="bank-item-card" id="card-bank-ocbc">
              <div class="bank-logo-wrap">
                <svg class="bank-logo-svg" viewBox="0 0 110 32" fill="currentColor">
                  <circle cx="16" cy="16" r="12" fill="#E11D48"/>
                  <path d="M12 11H20M10 16H22M13 21H19" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                  <text x="36" y="23" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro', sans-serif" font-weight="900" font-size="19" letter-spacing="-0.03em" fill="currentColor">OCBC</text>
                </svg>
              </div>
              <button class="btn-bank-connect" data-bank="ocbc">CONNECT</button>
            </div>

            <!-- UOB Bank -->
            <div class="bank-item-card" id="card-bank-uob">
              <div class="bank-logo-wrap">
                <svg class="bank-logo-svg" viewBox="0 0 110 32" fill="currentColor">
                  <rect x="8" y="8" width="3" height="16" fill="#0284C7"/>
                  <rect x="13" y="8" width="3" height="16" fill="#0284C7"/>
                  <rect x="18" y="8" width="3" height="16" fill="#E11D48"/>
                  <rect x="23" y="8" width="3" height="16" fill="#0284C7"/>
                  <text x="36" y="23" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro', sans-serif" font-weight="900" font-size="19" letter-spacing="-0.03em" fill="currentColor">UOB</text>
                </svg>
              </div>
              <button class="btn-bank-connect" data-bank="uob">CONNECT</button>
            </div>

            <!-- Trust Bank -->
            <div class="bank-item-card" id="card-bank-trust">
              <div class="bank-logo-wrap">
                <svg class="bank-logo-svg" viewBox="0 0 110 32" fill="currentColor">
                  <rect x="8" y="9" width="14" height="14" rx="3" fill="#0284C7"/>
                  <text x="32" y="23" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro', sans-serif" font-weight="800" font-size="19" fill="currentColor">trust</text>
                </svg>
              </div>
              <button class="btn-bank-connect" data-bank="trust">CONNECT</button>
            </div>

            <!-- Standard Chartered -->
            <div class="bank-item-card" id="card-bank-sc">
              <div class="bank-logo-wrap">
                <svg class="bank-logo-svg" viewBox="0 0 130 32" fill="currentColor">
                  <path d="M12 9C15 9 17 11 17 14C17 18 10 18 10 22C10 24 12 25 15 25" stroke="#10B981" stroke-width="3" stroke-linecap="round" fill="none"/>
                  <path d="M18 9C21 9 23 11 23 14C23 18 16 18 16 22C16 24 18 25 21 25" stroke="#0284C7" stroke-width="3" stroke-linecap="round" fill="none"/>
                  <text x="32" y="16" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro', sans-serif" font-weight="700" font-size="10" fill="currentColor">standard</text>
                  <text x="32" y="26" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro', sans-serif" font-weight="700" font-size="10" fill="currentColor">chartered</text>
                </svg>
              </div>
              <button class="btn-bank-connect" data-bank="sc">CONNECT</button>
            </div>
          </div>
        </div>

        <footer class="screen-footer-actions">
          <button class="btn btn-outline" data-goto="screen-onboarding">Back</button>
          <button class="btn btn-primary" data-goto="screen-setup-2">Continue</button>
        </footer>
      </section>
    `;
  },

  init() {
    const bankButtons = document.querySelectorAll('.btn-bank-connect');
    const splash = document.getElementById('bank-auth-splash');
    const splashText = document.getElementById('bank-auth-status-text');

    bankButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const bankKey = btn.getAttribute('data-bank');
        const bankCard = btn.closest('.bank-item-card');

        if (window.App.state.connectedBanks[bankKey]) {
          window.App.state.connectedBanks[bankKey] = false;
          btn.classList.remove('connected');
          btn.textContent = 'CONNECT';
          bankCard.classList.remove('connected');
          window.App.showToast(`Disconnected bank account`);
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
            window.App.state.connectedBanks[bankKey] = true;
            btn.classList.add('connected');
            btn.innerHTML = '&#10003; CONNECTED';
            bankCard.classList.add('connected');
            window.App.showToast(`Successfully linked ${bankKey.toUpperCase()}!`);
          }, 1300);
        }
      });
    });
  }
});
