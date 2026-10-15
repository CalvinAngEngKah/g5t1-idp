/**
 * Screen: Tab 4 — Settings Module
 */

window.App = window.App || {};

window.App.registerScreen('settings', {
  id: 'screen-settings',
  title: 'Settings & Maze Usability',

  render() {
    return `
      <section class="screen app-tab-screen" id="screen-settings">
        <header class="home-topbar">
          <div class="home-brand-title">Savenow</div>
        </header>

        <h2 class="tab-page-title">Settings</h2>
        <p class="tab-page-subtitle">Your account and preferences</p>

        <!-- User Card -->
        <div class="settings-profile-card">
          <div class="profile-name">Bob Tan</div>
          <div class="profile-handle">@bobsaves &middot; SGD &middot; Singapore</div>
        </div>

        <!-- MAZE A/B TESTING CARD -->
        <div class="maze-integration-card">
          <div class="maze-card-header">
            <div class="maze-card-title">
              <span class="maze-badge-dot"></span>
              <span>Maze A/B Testing</span>
            </div>
            <span class="maze-status-tag" id="maze-status-badge">Snippet Ready</span>
          </div>
          <p class="maze-card-desc">
            Collect quantitative heatmaps, click paths, and mission completion rates directly via Maze.
          </p>

          <div class="maze-key-input-row">
            <input type="text" class="maze-input-box" id="maze-api-key-input" placeholder="Paste Maze API Key">
            <button class="btn-maze-save" id="btn-save-maze-key">Save Key</button>
          </div>

          <div class="maze-variant-row">
            <span class="maze-variant-label">Active A/B Variant:</span>
            <div class="maze-toggle-group">
              <button class="maze-variant-btn active" id="btn-var-a" onclick="window.App.maze.switchVariant('A')">Variant A</button>
              <button class="maze-variant-btn" id="btn-var-b" onclick="window.App.maze.switchVariant('B')">Variant B</button>
            </div>
          </div>

          <button class="btn-copy-test-link" id="btn-copy-maze-url">
            <span>&#128279;</span> Copy Test URL for Maze
          </button>
        </div>

        <!-- Section: YOUR MONEY -->
        <div class="settings-section-heading">YOUR MONEY</div>
        <div class="settings-list-group">
          <div class="settings-nav-row" data-goto="screen-setup-2">
            <div>
              <div class="settings-row-title">Goal &amp; budget</div>
              <div class="settings-row-sub">MacBook Pro &middot; $20 daily limit</div>
            </div>
            <span class="settings-row-arrow">&rsaquo;</span>
          </div>

          <div class="settings-nav-row" data-goto="screen-setup-1">
            <div>
              <div class="settings-row-title">Connected accounts</div>
              <div class="settings-row-sub">DBS connected</div>
            </div>
            <span class="settings-row-arrow">&rsaquo;</span>
          </div>

          <div class="settings-nav-row" data-goto="screen-setup-3">
            <div>
              <div class="settings-row-title">Recurring expenses</div>
              <div class="settings-row-sub">1 expense &middot; $6.48 / month</div>
            </div>
            <span class="settings-row-arrow">&rsaquo;</span>
          </div>
        </div>

        <!-- Section: PREFERENCES -->
        <div class="settings-section-heading">PREFERENCES</div>
        <div class="settings-list-group">
          <div class="settings-nav-row" onclick="window.App.showToast('Privacy preferences updated')">
            <div>
              <div class="settings-row-title">Privacy &amp; sharing</div>
              <div class="settings-row-sub">You choose what friends see</div>
            </div>
            <span class="settings-row-arrow">&rsaquo;</span>
          </div>

          <div class="settings-nav-row" onclick="window.App.showToast('Notification settings opened')">
            <div>
              <div class="settings-row-title">Notifications</div>
              <div class="settings-row-sub">Near-limit alerts on</div>
            </div>
            <span class="settings-row-arrow">&rsaquo;</span>
          </div>

          <div class="settings-nav-row" data-goto="screen-onboarding">
            <div>
              <div class="settings-row-title">Restart Setup Flow</div>
              <div class="settings-row-sub">Return to onboarding test screen</div>
            </div>
            <span class="settings-row-arrow">&rsaquo;</span>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    window.App.maze.bindSettingsPanel();
  }
});
