/**
 * Savenow Core — Router & Screen Manager
 * Manages screen registration, mounts, transitions, and Maze hash-based URL paths.
 */

window.App = window.App || {};

window.App.screens = {};

window.App.registerScreen = function(screenName, screenModule) {
  window.App.screens[screenName] = screenModule;
};

window.App.router = {
  mainTabs: ['screen-home', 'screen-insights', 'screen-social', 'screen-settings'],

  init() {
    this.mountAllScreens();
    this.bindGlobalNavigation();
    this.handleInitialRoute();

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const screenId = 'screen-' + hash;
        if (document.getElementById(screenId) && screenId !== window.App.state.currentScreen) {
          this.navigateTo(screenId, 'none', false);
        }
      }
    });
  },

  mountAllScreens() {
    const container = document.getElementById('screens-viewport');
    if (!container) return;

    // Render HTML for all registered screens
    Object.keys(window.App.screens).forEach(key => {
      const screen = window.App.screens[key];
      if (typeof screen.render === 'function') {
        const screenHtml = screen.render();
        container.insertAdjacentHTML('beforeend', screenHtml);
      }
    });

    // Run init lifecycle for each screen
    Object.keys(window.App.screens).forEach(key => {
      const screen = window.App.screens[key];
      if (typeof screen.init === 'function') {
        screen.init();
      }
    });
  },

  bindGlobalNavigation() {
    document.addEventListener('click', (e) => {
      const gotoBtn = e.target.closest('[data-goto]');
      if (gotoBtn) {
        e.preventDefault();
        const targetScreen = gotoBtn.getAttribute('data-goto');
        this.navigateTo(targetScreen);
      }
    });
  },

  handleInitialRoute() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const screenId = 'screen-' + hash;
      if (document.getElementById(screenId)) {
        this.navigateTo(screenId, 'none', false);
        return;
      }
    }
    this.updateBottomNavVisibility(window.App.state.currentScreen);
  },

  navigateTo(targetId, direction = 'forward', updateHash = true) {
    const state = window.App.state;
    const current = document.getElementById(state.currentScreen);
    const target = document.getElementById(targetId);

    if (!target || targetId === state.currentScreen) return;

    if (current) {
      current.classList.remove('active');
      if (direction === 'forward') {
        current.classList.add('sliding-back');
        setTimeout(() => current.classList.remove('sliding-back'), 250);
      }
    }

    state.previousScreen = state.currentScreen;
    state.currentScreen = targetId;

    target.classList.add('active');
    target.scrollTop = 0;

    // Sync hash URL for Maze A/B testing missions
    if (updateHash) {
      const cleanHash = targetId.replace('screen-', '');
      history.pushState(null, null, '#' + cleanHash);
    }

    this.updateBottomNavVisibility(targetId);

    // Call onEnter lifecycle if defined
    const cleanKey = targetId.replace('screen-', '');
    if (window.App.screens[cleanKey] && typeof window.App.screens[cleanKey].onEnter === 'function') {
      window.App.screens[cleanKey].onEnter();
    }
  },

  updateBottomNavVisibility(screenId) {
    const nav = document.getElementById('app-bottom-nav');
    if (!nav) return;

    if (this.mainTabs.includes(screenId)) {
      nav.style.display = 'flex';
      
      document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        const tabTarget = btn.getAttribute('data-goto');
        if (tabTarget === screenId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    } else {
      nav.style.display = 'none';
    }
  }
};
