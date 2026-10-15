/**
 * Savenow Core — State Management
 * Shared, reactive state store across all prototype screens.
 */

window.App = window.App || {};

window.App.state = {
  currentScreen: 'screen-onboarding',
  previousScreen: null,
  theme: 'light',
  mazeVariant: 'A', // 'A' | 'B'

  // Step 1: Banks
  connectedBanks: {
    dbs: false,
    ocbc: false,
    uob: false,
    trust: false,
    sc: false
  },

  // Step 2: Goal & Budget
  goal: {
    purpose: 'Buy a MacBook Pro',
    amount: 2000,
    date: '12/2026'
  },
  budget: {
    daily: 20,
    weekly: 140,
    monthly: 600,
    incomeMonthly: 800
  },

  // Step 3: Recurring Expenses
  recurringExpenses: [
    {
      id: 'rec_spotify',
      name: 'SPOTIFY',
      category: 'MUSIC',
      amount: 6.48,
      day: 17,
      frequency: 'MONTH'
    }
  ],

  // Step 4: Socials
  socials: [
    { id: 's1', name: 'Campus Savers', type: 'group', icon: 'CS' },
    { id: 's2', name: 'Marcus Tan (@marcus)', type: 'user', icon: 'MT' }
  ],

  // Home Screen & Dynamic Gauge
  home: {
    spentToday: 17.40,
    dailyLimit: 20.00,
    streakDays: 98,
    monthlySaved: 190.00,
    presetState: 'within-limit',
    latestExpenses: [
      {
        id: 'exp_1',
        title: 'Bubble tea',
        sub: 'Grab · 6:40pm',
        initials: 'BT',
        amount: 3.40,
        category: 'food'
      },
      {
        id: 'exp_2',
        title: 'Lunch Bowl',
        sub: 'Subway · 1:15pm',
        initials: 'SW',
        amount: 8.50,
        category: 'food'
      },
      {
        id: 'exp_3',
        title: 'MRT Ride',
        sub: 'SimplyGo · 8:30am',
        initials: 'SG',
        amount: 1.80,
        category: 'transport'
      }
    ]
  },

  // Simple Pub/Sub event emitter for prototyping screens
  _listeners: {},
  on(event, fn) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(fn);
  },
  emit(event, data) {
    if (this._listeners[event]) {
      this._listeners[event].forEach(fn => fn(data));
    }
  }
};
