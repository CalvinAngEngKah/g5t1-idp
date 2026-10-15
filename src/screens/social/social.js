/**
 * Screen: Tab 3 — Social Module
 * Formatted with Apple iOS HIG Large Titles and Inset Grouped Friend Activity
 */

window.App = window.App || {};

window.App.registerScreen('social', {
  id: 'screen-social',
  title: 'Social — Keep Your Streak',

  render() {
    return `
      <section class="screen app-tab-screen" id="screen-social">
        <!-- iOS Navigation Bar -->
        <header class="ios-nav-bar">
          <span class="ios-nav-title">Social</span>
        </header>

        <div class="screen-scrollable-body" style="padding-top: 0;">
          <h1 class="ios-large-title">Social</h1>
          <p class="ios-large-subtitle">Stay within budget. Keep your streak.</p>

          <!-- Big Streak Inset Card with SF Symbol flame.fill -->
          <div class="ios-inset-group" style="text-align: center; padding: 24px 16px;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 50%; background: var(--sn-streak-100); color: var(--ios-system-orange); margin-bottom: 8px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 23c6.075 0 10-4.043 10-9.61 0-4.66-3.08-8.23-6.62-10.42a1 1 0 0 0-1.48.97c.21 2.45-.63 4.2-2.12 5.37C10.74 8.13 9.4 6.7 8.7 5.03a1 1 0 0 0-1.8.18C5.23 9.24 2 13.06 2 16.39 2 20.95 5.925 23 12 23z"/>
              </svg>
            </div>
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ios-gray-1);">CURRENT STREAK</div>
            <div style="font-size: 60px; font-weight: 900; font-family: var(--font-mono); line-height: 1.1; margin: 4px 0; color: var(--sn-text-primary);">98</div>
            <div style="font-size: 14px; color: var(--sn-text-secondary); font-weight: 500;">days within your daily budget</div>
            <button class="btn btn-outline" style="width: 100%; margin-top: 18px; height: 44px; font-size: 15px;" data-goto="screen-home">View Today's Budget</button>
          </div>

          <p style="font-size: 12px; color: var(--ios-gray-1); text-align: center; margin: -6px 12px 18px; line-height: 1.4;">
            Tracked automatically against your $20 daily limit. A day over limit breaks the streak.
          </p>

          <!-- Friends' Activity Section (iOS Inset Group) -->
          <div class="ios-section-header">FRIENDS' ACTIVITY</div>
          <div class="ios-inset-group">
            <div class="ios-list-row">
              <div class="ios-row-left">
                <div class="ios-icon-box orange" style="border-radius: 50%; font-weight: 700;">M</div>
                <div>
                  <div class="ios-row-title">Maya reached 30 days</div>
                  <div class="ios-row-sub">Within budget · 2 hours ago</div>
                </div>
              </div>
              <div class="ios-row-right">
                <button class="btn-cheer" onclick="window.App.screens['social'].cheer(this, 'Maya')" style="background: var(--ios-tertiary-fill); border: none; border-radius: var(--ios-radius-capsule); padding: 5px 12px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px; color: var(--sn-text-primary);">
                  Cheer &#128079;
                </button>
              </div>
            </div>

            <div class="ios-list-row">
              <div class="ios-row-left">
                <div class="ios-icon-box blue" style="border-radius: 50%; font-weight: 700;">J</div>
                <div>
                  <div class="ios-row-title">Jon reached 7 days</div>
                  <div class="ios-row-sub">Within budget · Yesterday</div>
                </div>
              </div>
              <div class="ios-row-right">
                <button class="btn-cheer" onclick="window.App.screens['social'].cheer(this, 'Jon')" style="background: var(--ios-tertiary-fill); border: none; border-radius: var(--ios-radius-capsule); padding: 5px 12px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px; color: var(--sn-text-primary);">
                  Cheer &#128079;
                </button>
              </div>
            </div>

            <div class="ios-list-row">
              <div class="ios-row-left">
                <div class="ios-icon-box purple" style="border-radius: 50%; font-weight: 700;">S</div>
                <div>
                  <div class="ios-row-title">Samantha joined Campus Savers</div>
                  <div class="ios-row-sub">3-day streak active</div>
                </div>
              </div>
              <div class="ios-row-right">
                <button class="btn-cheer" onclick="window.App.screens['social'].cheer(this, 'Samantha')" style="background: var(--ios-tertiary-fill); border: none; border-radius: var(--ios-radius-capsule); padding: 5px 12px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px; color: var(--sn-text-primary);">
                  Cheer &#128079;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  cheer(button, friendName) {
    if (button) {
      button.textContent = 'Cheered! ✓';
      button.style.color = 'var(--sn-emerald-600)';
      button.disabled = true;
    }
    window.App.showToast(`Sent cheers to ${friendName}! 👏`);
  }
});
