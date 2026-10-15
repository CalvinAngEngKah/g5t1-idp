/**
 * Screen: Setup Step 4 — Add Socials Module
 */

window.App = window.App || {};

window.App.registerScreen('setup-4', {
  id: 'screen-setup-4',
  title: 'ADD SOCIALS',

  render() {
    return `
      <section class="screen" id="screen-setup-4">
        <div class="screen-scrollable-body">
          <div class="step-stepper">
            <div class="step-dot done"></div>
            <div class="step-dot done"></div>
            <div class="step-dot done"></div>
            <div class="step-dot active"></div>
          </div>

          <div class="setup-header-group">
            <div class="setup-eyebrow">SETUP · STEP 4 OF 4</div>
            <h2 class="setup-title">ADD SOCIALS</h2>
            <p class="setup-subtitle">CONTACTS OR USERS</p>
          </div>

          <div class="social-action-buttons">
            <button class="social-action-btn" id="social-btn-group">+ JOIN GROUP</button>
            <div class="social-split-row">
              <button class="social-action-btn" id="social-btn-contacts">+ CONTACTS</button>
              <button class="social-action-btn" id="social-btn-user">+ USERNAME</button>
            </div>
          </div>

          <div class="form-section-title" style="margin-top: 24px;">CONNECTED BUDDIES &amp; GROUPS</div>
          <div class="social-active-list" id="socials-list-container"></div>
        </div>

        <footer class="screen-footer-actions">
          <button class="btn btn-outline" data-goto="screen-setup-3">Back</button>
          <button class="btn btn-emerald" data-goto="screen-home">Finish Setup &rarr;</button>
        </footer>
      </section>
    `;
  },

  init() {
    const btnGroup = document.getElementById('social-btn-group');
    const btnContacts = document.getElementById('social-btn-contacts');
    const btnUser = document.getElementById('social-btn-user');

    if (btnGroup) {
      btnGroup.addEventListener('click', () => {
        const groupName = prompt('Join a Community Group:', 'NUS Savers Club');
        if (groupName) {
          window.App.state.socials.push({
            id: 'grp_' + Date.now(),
            name: groupName,
            type: 'group',
            icon: groupName.substring(0, 2).toUpperCase()
          });
          this.renderList();
          window.App.showToast(`Joined ${groupName}`);
        }
      });
    }

    if (btnContacts) {
      btnContacts.addEventListener('click', () => {
        window.App.showToast('Synced 3 contacts from your phonebook!');
        window.App.state.socials.push(
          { id: 'c1', name: 'Samantha Lee', type: 'contact', icon: 'SL' },
          { id: 'c2', name: 'Darren Tan', type: 'contact', icon: 'DT' }
        );
        this.renderList();
      });
    }

    if (btnUser) {
      btnUser.addEventListener('click', () => {
        const uname = prompt('Enter username to add accountability buddy:', '@charlie_k');
        if (uname) {
          window.App.state.socials.push({
            id: 'u_' + Date.now(),
            name: uname,
            type: 'user',
            icon: uname.substring(1, 3).toUpperCase()
          });
          this.renderList();
          window.App.showToast(`Connected with ${uname}!`);
        }
      });
    }

    this.renderList();
  },

  renderList() {
    const listEl = document.getElementById('socials-list-container');
    if (!listEl) return;
    listEl.innerHTML = '';

    window.App.state.socials.forEach(s => {
      const item = document.createElement('div');
      item.className = 'social-member-chip';
      item.innerHTML = `
        <div class="member-left">
          <div class="member-avatar">${s.icon}</div>
          <div>
            <div style="font-size: 13.5px; font-weight: 700; color: var(--sn-text-primary);">${window.App.escapeHTML(s.name)}</div>
            <div style="font-size: 11px; color: var(--sn-text-secondary); text-transform: uppercase;">${s.type}</div>
          </div>
        </div>
        <span style="font-size: 11px; font-weight: 700; color: var(--sn-emerald-600); background: var(--sn-emerald-50); padding: 3px 8px; border-radius: var(--radius-pill);">&#10003; Active</span>
      `;
      listEl.appendChild(item);
    });
  }
});
