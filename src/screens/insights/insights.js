/**
 * Screen: Tab 2 — Insights Module
 */

window.App = window.App || {};

window.App.registerScreen('insights', {
  id: 'screen-insights',
  title: 'Insights — Spending Breakdown',

  render() {
    return `
      <section class="screen app-tab-screen" id="screen-insights">
        <!-- Topbar -->
        <header class="home-topbar">
          <div class="home-brand-title">Savenow</div>
          <div class="date-period-pill">SEP 2026</div>
        </header>

        <h2 class="tab-page-title">Insights</h2>
        <p class="tab-page-subtitle">Learn more about how you spend</p>

        <!-- Card 1: Categories Donut -->
        <div class="insights-card">
          <div class="insights-card-header">
            <div class="insights-card-title-row">
              <span class="insights-dot-icon">&#9678;</span>
              <span class="insights-card-title">Categories</span>
            </div>
            <span class="insights-card-link">View all &rsaquo;</span>
          </div>

          <div class="insights-breakdown-row">
            <div>
              <div class="insights-big-stat">$584</div>
              <div class="insights-stat-sub">spent last month · August</div>
              <div class="insights-cat-tags">
                <span class="cat-tag-pill food">Food 34%</span>
                <span class="cat-tag-pill transport">Transport 22%</span>
              </div>
            </div>

            <!-- 5-Category Donut Chart from design system -->
            <div class="donut-chart-wrap">
              <div class="insights-donut">
                <div class="insights-donut-hole">
                  <span>$584</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2: Timeline Bar Chart -->
        <div class="insights-card">
          <div class="insights-card-header">
            <div class="insights-card-title-row">
              <span class="insights-dot-icon">&#9646;</span>
              <span class="insights-card-title">Timeline</span>
            </div>
            <span class="insights-card-link">7 days &rsaquo;</span>
          </div>

          <div class="insights-timeline-row">
            <div>
              <div class="insights-big-stat" style="color: var(--sn-emerald-600);">&minus;18%</div>
              <div class="insights-stat-sub">less than last week</div>
            </div>

            <div class="insights-bars-container">
              <div class="day-bar-col"><div class="day-bar" style="height: 28px;"></div><span>M</span></div>
              <div class="day-bar-col"><div class="day-bar" style="height: 38px;"></div><span>T</span></div>
              <div class="day-bar-col"><div class="day-bar" style="height: 22px;"></div><span>W</span></div>
              <div class="day-bar-col"><div class="day-bar highlight" style="height: 52px;"></div><span>T</span></div>
              <div class="day-bar-col"><div class="day-bar" style="height: 32px;"></div><span>F</span></div>
              <div class="day-bar-col"><div class="day-bar" style="height: 44px;"></div><span>S</span></div>
              <div class="day-bar-col"><div class="day-bar" style="height: 36px;"></div><span>S</span></div>
            </div>
          </div>
        </div>

        <!-- Card 3: Small purchases -->
        <div class="insights-card">
          <div class="insights-card-header">
            <div class="insights-card-title-row">
              <span class="insights-dot-icon">&#9670;</span>
              <span class="insights-card-title">Small purchases</span>
            </div>
            <span class="insights-card-link">Details &rsaquo;</span>
          </div>

          <div class="insights-progress-row">
            <div>
              <div class="insights-big-stat">$64.10</div>
              <div class="insights-stat-sub">27 purchases under $5 this week</div>
            </div>
            <div style="text-align: right; min-width: 110px;">
              <div style="font-size: 19px; font-weight: 800; color: var(--sn-text-primary);">50%</div>
              <div class="insights-bar-track">
                <div class="insights-bar-fill" style="width: 50%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 4: Goal trade-off -->
        <div class="insights-card">
          <div class="insights-card-header">
            <div class="insights-card-title-row">
              <span class="insights-dot-icon">&#9671;</span>
              <span class="insights-card-title">Goal trade-off</span>
            </div>
            <span class="insights-card-link">Details &rsaquo;</span>
          </div>

          <div>
            <div class="insights-big-stat">4.5%</div>
            <div class="insights-stat-sub">$90.00 of your $2,000 goal · August</div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    // Interactivity for Insights charts if needed
  }
});
