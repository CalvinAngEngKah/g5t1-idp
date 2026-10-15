/**
 * Screen: Tab 4 — Settings Module
 * Formatted strictly according to Apple HIG UITableViewStyleInsetGrouped specifications
 */

window.App = window.App || {};

window.App.registerScreen('settings', {
  id: 'screen-settings',
  title: 'Settings',

  render() {
    return `
      <section class="screen app-tab-screen" id="screen-settings">
        <!-- iOS Navigation Bar -->
        <header class="ios-nav-bar">
          <span class="ios-nav-title">Settings</span>
        </header>

        <div class="screen-scrollable-body" style="padding-top: 0;">
          <h1 class="ios-large-title">Settings</h1>

          <!-- User Profile Inset Card -->
          <div class="ios-inset-group">
            <div class="ios-list-row" style="padding: 14px 16px;">
              <div class="ios-row-left">
                <div class="ios-icon-box emerald" style="width: 44px; height: 44px; border-radius: 50%; font-size: 18px; font-weight: 700;">
                  BT
                </div>
                <div>
                  <div class="ios-row-title" style="font-size: 18px; font-weight: 600;">Bob Tan</div>
                  <div class="ios-row-sub">@bobsaves &middot; SGD Singapore</div>
                </div>
              </div>
              <div class="ios-row-right">
                <svg class="ios-disclosure" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- MAZE A/B TESTING CARD -->
          <div class="ios-section-header">MAZE USABILITY &amp; A/B TESTING</div>
          <div class="ios-inset-group">
            <div style="padding: 16px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 15px;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--sn-emerald-500);"></span>
                  <span>Maze Analytics</span>
                </div>
                <span class="maze-status-tag" id="maze-status-badge">Snippet Ready</span>
              </div>
              <p style="font-size: 13px; color: var(--sn-text-secondary); margin: 0 0 12px; line-height: 1.4;">
                Collect quantitative heatmaps, click paths, and mission completion rates directly via Maze.
              </p>

              <div class="maze-key-input-row" style="margin-bottom: 12px;">
                <input type="text" class="input-outline-field" id="maze-api-key-input" placeholder="Paste Maze API Key" style="background: var(--ios-fill); padding: 8px 12px; border-radius: 8px; font-size: 13px;">
                <button class="btn btn-primary" id="btn-save-maze-key" style="height: 36px; font-size: 13px; flex: none; padding: 0 14px;">Save</button>
              </div>

              <!-- iOS Segmented Control for Variant A/B -->
              <div style="font-size: 12px; font-weight: 600; color: var(--ios-gray-1); margin-bottom: 4px;">ACTIVE A/B TEST VARIANT:</div>
              <div class="ios-segmented-control" style="margin-bottom: 12px;">
                <button class="ios-segment-btn active" id="btn-var-a" onclick="window.App.maze.switchVariant('A')">Variant A</button>
                <button class="ios-segment-btn" id="btn-var-b" onclick="window.App.maze.switchVariant('B')">Variant B</button>
              </div>

              <button class="btn btn-outline" id="btn-copy-maze-url" style="width: 100%; height: 40px; font-size: 13px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Copy Test URL for Maze
              </button>
            </div>
          </div>

          <!-- Section: YOUR MONEY -->
          <div class="ios-section-header">YOUR MONEY</div>
          <div class="ios-inset-group">
            <!-- Goal & Budget -->
            <div class="ios-list-row" data-goto="screen-setup-2">
              <div class="ios-row-left">
                <div class="ios-icon-box orange">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                </div>
                <div>
                  <div class="ios-row-title">Goal &amp; budget</div>
                  <div class="ios-row-sub">MacBook Pro &middot; $20 daily limit</div>
                </div>
              </div>
              <div class="ios-row-right">
                <svg class="ios-disclosure" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>

            <!-- Connected Accounts -->
            <div class="ios-list-row" data-goto="screen-setup-1">
              <div class="ios-row-left">
                <div class="ios-icon-box blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 10h20v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10zm0-5l10-4 10 4v3H2V5z"/>
                  </svg>
                </div>
                <div>
                  <div class="ios-row-title">Connected accounts</div>
                  <div class="ios-row-sub">DBS connected</div>
                </div>
              </div>
              <div class="ios-row-right">
                <svg class="ios-disclosure" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>

            <!-- Recurring Expenses -->
            <div class="ios-list-row" data-goto="screen-setup-3">
              <div class="ios-row-left">
                <div class="ios-icon-box purple">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                </div>
                <div>
                  <div class="ios-row-title">Recurring expenses</div>
                  <div class="ios-row-sub">1 expense &middot; $6.48 / month</div>
                </div>
              </div>
              <div class="ios-row-right">
                <svg class="ios-disclosure" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Section: PREFERENCES -->
          <div class="ios-section-header">PREFERENCES</div>
          <div class="ios-inset-group">
            <!-- Privacy & Sharing -->
            <div class="ios-list-row" onclick="window.App.showToast('Privacy preferences updated')">
              <div class="ios-row-left">
                <div class="ios-icon-box blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                </div>
                <div>
                  <div class="ios-row-title">Privacy &amp; sharing</div>
                  <div class="ios-row-sub">You choose what friends see</div>
                </div>
              </div>
              <div class="ios-row-right">
                <svg class="ios-disclosure" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>

            <!-- Notifications with iOS Switch -->
            <div class="ios-list-row">
              <div class="ios-row-left">
                <div class="ios-icon-box red">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22a2.98 2.98 0 0 0 2.82-2H9.18A2.98 2.98 0 0 0 12 22zm7-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a2.5 2.5 0 0 0-5 0v.68C6.63 5.36 5 7.92 5 11v5l-2 2v1h18v-1l-2-2z"/>
                  </svg>
                </div>
                <div>
                  <div class="ios-row-title">Near-limit alerts</div>
                  <div class="ios-row-sub">Push notifications on limit risk</div>
                </div>
              </div>
              <div class="ios-row-right">
                <label class="ios-switch">
                  <input type="checkbox" checked onchange="window.App.showToast('Push notifications ' + (this.checked ? 'enabled' : 'disabled'))">
                  <span class="ios-switch-slider"></span>
                </label>
              </div>
            </div>

            <!-- Restart Setup Flow -->
            <div class="ios-list-row" data-goto="screen-onboarding">
              <div class="ios-row-left">
                <div class="ios-icon-box gray">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="1 4 1 10 7 10"/>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                  </svg>
                </div>
                <div>
                  <div class="ios-row-title">Restart Setup Flow</div>
                  <div class="ios-row-sub">Return to onboarding test screen</div>
                </div>
              </div>
              <div class="ios-row-right">
                <svg class="ios-disclosure" viewBox="0 0 8 13" fill="none" stroke="currentColor">
                  <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    window.App.maze.bindSettingsPanel();
  }
});
