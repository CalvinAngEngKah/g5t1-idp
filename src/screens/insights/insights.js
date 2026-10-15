/**
 * Screen: Tab 2 — Insights Module
 * Conforming to Apple iOS HIG Data Visualizations and Inset Grouped Tables
 */

window.App = window.App || {};

window.App.registerScreen('insights', {
  id: 'screen-insights',
  title: 'Insights — Spending Breakdown',

  render() {
    return `
      <section class="screen app-tab-screen" id="screen-insights">
        <!-- iOS Navigation Bar -->
        <header class="ios-nav-bar">
          <span class="ios-nav-title">Insights</span>
          <span style="font-size: 13px; font-weight: 600; color: var(--ios-gray-1);">SEP 2026</span>
        </header>

        <div class="screen-scrollable-body" style="padding-top: 0;">
          <h1 class="ios-large-title">Insights</h1>

          <!-- iOS Segmented Control (Time Range) -->
          <div class="ios-segmented-control" style="margin-bottom: 16px;">
            <button class="ios-segment-btn">Week</button>
            <button class="ios-segment-btn active">Month</button>
            <button class="ios-segment-btn">Year</button>
          </div>

          <!-- Card 1: Categories Donut (iOS Inset Group) -->
          <div class="ios-section-header">CATEGORY SPENDING</div>
          <div class="ios-inset-group">
            <div style="padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <div style="font-size: 32px; font-weight: 800; font-family: var(--font-mono); color: var(--sn-text-primary);">$584</div>
                  <div style="font-size: 13px; color: var(--sn-text-secondary);">spent last month · August</div>
                </div>
                <!-- 5-Category Donut Chart -->
                <div class="donut-chart-wrap">
                  <div class="insights-donut">
                    <div class="insights-donut-hole">
                      <span>$584</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="insights-cat-tags">
                <span class="cat-tag-pill food" style="border-radius: var(--ios-radius-capsule);">Food 34%</span>
                <span class="cat-tag-pill transport" style="border-radius: var(--ios-radius-capsule);">Transport 22%</span>
                <span class="cat-tag-pill shopping" style="border-radius: var(--ios-radius-capsule);">Shop 20%</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Timeline Bar Chart (iOS Inset Group) -->
          <div class="ios-section-header">WEEKLY PACE &amp; TIMELINE</div>
          <div class="ios-inset-group">
            <div style="padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 12px;">
                <div>
                  <div style="font-size: 28px; font-weight: 800; color: var(--sn-emerald-600); font-family: var(--font-mono);">&minus;18%</div>
                  <div style="font-size: 13px; color: var(--sn-text-secondary);">less than last week</div>
                </div>

                <div class="insights-bars-container">
                  <div class="day-bar-col"><div class="day-bar" style="height: 28px;"></div><span>M</span></div>
                  <div class="day-bar-col"><div class="day-bar" style="height: 38px;"></div><span>T</span></div>
                  <div class="day-bar-col"><div class="day-bar" style="height: 22px;"></div><span>W</span></div>
                  <div class="day-bar-col"><div class="day-bar highlight" style="height: 52px; background: var(--sn-emerald-500);"></div><span>T</span></div>
                  <div class="day-bar-col"><div class="day-bar" style="height: 32px;"></div><span>F</span></div>
                  <div class="day-bar-col"><div class="day-bar" style="height: 44px;"></div><span>S</span></div>
                  <div class="day-bar-col"><div class="day-bar" style="height: 36px;"></div><span>S</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 3: Small Purchases Tracker (iOS Inset Group) -->
          <div class="ios-section-header">MICRO-SPENDING BEHAVIOR</div>
          <div class="ios-inset-group">
            <div style="padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div>
                  <div style="font-size: 22px; font-weight: 800; font-family: var(--font-mono);">$64.10</div>
                  <div style="font-size: 13px; color: var(--sn-text-secondary);">27 purchases under $5 this week</div>
                </div>
                <div style="font-size: 17px; font-weight: 700; color: var(--ios-gray-1);">50%</div>
              </div>
              <div class="insights-bar-track" style="height: 8px; border-radius: 4px; background: var(--ios-fill);">
                <div class="insights-bar-fill" style="width: 50%; height: 100%; border-radius: 4px; background: var(--sn-emerald-500);"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    // Insights events if any
  }
});
