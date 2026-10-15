/**
 * Screen: Tab 3 — Social Module
 */

window.App = window.App || {};

window.App.registerScreen('social', {
  id: 'screen-social',
  title: 'Social — Keep Your Streak',

  render() {
    return `
      <section class="screen app-tab-screen" id="screen-social">
        <header class="home-topbar">
          <div class="home-brand-title">Savenow</div>
        </header>

        <h2 class="tab-page-title">Social</h2>
        <p class="tab-page-subtitle">Stay within budget. Keep your streak.</p>

        <!-- Big Streak Card -->
        <div class="social-hero-streak-card">
          <div class="social-streak-label">CURRENT STREAK</div>
          <div class="social-huge-streak-num">98</div>
          <div class="social-streak-sub">days within your daily budget</div>
          <button class="btn btn-outline" style="width: 100%; margin-top: 18px;" data-goto="screen-home">View today's budget</button>
        </div>

        <p class="social-disclaimer-text">
          Tracked automatically against your $20 daily limit. A day over your limit breaks the streak.
        </p>

        <!-- Friends' Activity -->
        <div class="social-activity-header">Friends' activity</div>

        <div class="social-activity-list">
          <div class="social-friend-row">
            <div class="social-friend-avatar">M</div>
            <div class="social-friend-info">
              <div class="social-friend-name">Maya reached 30 days</div>
              <div class="social-friend-sub">Within budget · 2 hours ago</div>
            </div>
            <button class="btn-cheer" onclick="window.App.screens['social'].cheer(this, 'Maya')">Cheer &#128079;</button>
          </div>

          <div class="social-friend-row">
            <div class="social-friend-avatar" style="background: var(--sn-cat-transport); color: #FFF;">J</div>
            <div class="social-friend-info">
              <div class="social-friend-name">Jon reached 7 days</div>
              <div class="social-friend-sub">Within budget · Yesterday</div>
            </div>
            <button class="btn-cheer" onclick="window.App.screens['social'].cheer(this, 'Jon')">Cheer &#128079;</button>
          </div>

          <div class="social-friend-row">
            <div class="social-friend-avatar" style="background: var(--sn-cat-shopping); color: #FFF;">S</div>
            <div class="social-friend-info">
              <div class="social-friend-name">Samantha joined Campus Savers</div>
              <div class="social-friend-sub">3 days streak active</div>
            </div>
            <button class="btn-cheer" onclick="window.App.screens['social'].cheer(this, 'Samantha')">Cheer &#128079;</button>
          </div>
        </div>

        <button class="btn btn-outline" style="width: 100%; margin-top: 14px;" data-goto="screen-setup-4">Find friends &rsaquo;</button>
        <p class="social-privacy-sub">Friends see shared streaks, never spending amounts.</p>
      </section>
    `;
  },

  init() {
    // Social events
  },

  cheer(btnEl, friendName) {
    if (btnEl) {
      btnEl.classList.add('cheered');
      btnEl.innerHTML = 'Cheered &#10003;';
    }
    window.App.showToast(`Sent cheers to ${friendName}! &#128079;`);
  }
});
