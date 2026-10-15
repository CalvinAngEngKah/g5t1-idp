/**
 * Screen: Onboarding Module
 * Team members can edit this file exclusively without merge conflicts!
 */

window.App = window.App || {};

window.App.registerScreen('onboarding', {
  id: 'screen-onboarding',
  title: 'Save Now — Welcome',

  render() {
    return `
      <section class="screen onboarding-screen active" id="screen-onboarding">
        <div class="onboarding-content-wrap">
          <!-- Save Now Logo (Geometric Monogram from wireframe) -->
          <div class="brand-monogram-container">
            <svg width="90" height="116" viewBox="0 0 110 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Left Stem -->
              <path d="M14 140V34C14 15.2 29.2 0 48 0H48V140H14Z" fill="currentColor"/>
              <!-- Thin curve connector -->
              <path d="M48 48C68 48 76 66 76 88" stroke="currentColor" stroke-width="2.5" fill="none"/>
              <!-- Bottom Dot -->
              <circle cx="76" cy="116" r="22" fill="currentColor"/>
              <!-- Floating Coin Icon -->
              <g transform="translate(68, 6)">
                <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="3.5" fill="var(--sn-bg-card)"/>
                <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro', sans-serif" font-size="20" font-weight="900" text-anchor="middle" fill="currentColor">$</text>
              </g>
            </svg>
          </div>

          <h1 class="onboarding-title">Save Now</h1>
          <p class="onboarding-tagline">FINANCE MADE EASY</p>

          <div class="onboarding-pills">
            <span class="onboarding-chip"><span class="onboarding-chip-dot"></span> Live Bank Sync</span>
            <span class="onboarding-chip"><span class="onboarding-chip-dot"></span> $20 Daily Pace</span>
            <span class="onboarding-chip"><span class="onboarding-chip-dot"></span> Social Streaks</span>
          </div>
        </div>

        <!-- Bottom Action Buttons: Large, non-wide, thumb-friendly -->
        <div class="onboarding-bottom-actions">
          <button class="btn btn-hero btn-hero-primary" data-goto="screen-setup-1">Get Started</button>
          <button class="btn btn-hero btn-hero-outline" data-goto="screen-home">Login</button>
        </div>
      </section>
    `;
  },

  init() {
    // Screen specific logic if needed
  }
});
