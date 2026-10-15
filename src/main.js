/**
 * Savenow Application Bootstrap & Global Modal Handlers
 * Boots routing, Maze analytics, global modals (quick add, category picker), and toast notifications.
 */

window.App = window.App || {};

// Global HTML Escaper
window.App.escapeHTML = function(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Global Toast System
let toastTimeout = null;
window.App.showToast = function(message) {
  const toast = document.getElementById('app-toast');
  if (!toast) return;

  toast.innerHTML = `<span>&#9679;</span> ${window.App.escapeHTML(message)}`;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
};

// Global Quick Add Modal (Center (+) Button in Bottom Nav)
function initGlobalModals() {
  const addCenterBtn = document.getElementById('nav-add-expense-btn');
  const addModal = document.getElementById('add-expense-modal');
  const addConfirmBtn = document.getElementById('confirm-add-expense-btn');

  if (addCenterBtn && addModal) {
    addCenterBtn.addEventListener('click', () => {
      addModal.classList.add('open');
    });

    addModal.addEventListener('click', (e) => {
      if (e.target === addModal) addModal.classList.remove('open');
    });
  }

  if (addConfirmBtn) {
    addConfirmBtn.addEventListener('click', () => {
      const titleInput = document.getElementById('quick-exp-title');
      const amtInput = document.getElementById('quick-exp-amt');
      const catSelect = document.getElementById('quick-exp-cat');

      const title = (titleInput && titleInput.value.trim()) || 'Coffee & snack';
      const amt = parseFloat(amtInput && amtInput.value.replace(/[^0-9.]/g, '')) || 4.20;
      const cat = (catSelect && catSelect.value) || 'food';

      window.App.state.home.spentToday += amt;
      window.App.state.home.latestExpenses.unshift({
        id: 'exp_' + Date.now(),
        title: title,
        sub: 'Nearby · Just now',
        initials: title.substring(0, 2).toUpperCase(),
        amount: amt,
        category: cat
      });

      window.App.state.emit('budgetChange');

      if (addModal) addModal.classList.remove('open');
      if (titleInput) titleInput.value = '';
      if (amtInput) amtInput.value = '';
      window.App.showToast(`Recorded $${amt.toFixed(2)} for ${title}`);
    });
  }

  // Theme toggle button in desktop preview bar
  const themeBtn = document.getElementById('toggle-theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      window.App.state.theme = window.App.state.theme === 'light' ? 'dark' : 'light';
      document.body.setAttribute('data-theme', window.App.state.theme);
      themeBtn.innerHTML = window.App.state.theme === 'light' ? '&#9790; Dark' : '&#9788; Light';
    });
  }
}

// App Entry Point
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Maze A/B testing
  if (window.App.maze && typeof window.App.maze.init === 'function') {
    window.App.maze.init();
  }

  // Initialize Global Modals & Notifications
  initGlobalModals();

  // Initialize Modular Screen Router
  if (window.App.router && typeof window.App.router.init === 'function') {
    window.App.router.init();
  }
});
