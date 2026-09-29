/* African Girl Guide — site behaviour
   ---------------------------------------------------------------
   SETTINGS: fill these in when your services are ready.
   - DONATE_URL: your hosted checkout link (e.g. a Stripe Payment Link,
     PayPal, Givebutter or Donorbox page). Leave '' to show the
     thank-you preview instead of redirecting.
   - NEWSLETTER_ENDPOINT: a form endpoint that accepts POSTed emails
     (e.g. Formspree, Mailchimp embedded-form URL, Kit). Leave '' to
     only show a confirmation message.
   - WHATSAPP_NUMBER: your WhatsApp number in international format,
     digits only, no + or spaces (e.g. Nigeria 2348012345678,
     US 13125551234). Leave '' to hide the WhatsApp buttons.
   - WHATSAPP_MESSAGE: the message pre-filled when someone taps it.
   --------------------------------------------------------------- */
const SETTINGS = {
  DONATE_URL: '',
  NEWSLETTER_ENDPOINT: '',
  WHATSAPP_NUMBER: '',
  WHATSAPP_MESSAGE: 'Hello African Girl Guide! I would like to learn more about your work.'
};

document.addEventListener('DOMContentLoaded', () => {
  /* Footer year */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* WhatsApp links */
  const waDigits = String(SETTINGS.WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '');
  document.querySelectorAll('[data-whatsapp]').forEach((a) => {
    if (!waDigits) {
      const item = a.closest('[data-wa-wrap]') || a;
      item.hidden = true;
      return;
    }
    a.href = `https://wa.me/${waDigits}?text=${encodeURIComponent(SETTINGS.WHATSAPP_MESSAGE)}`;
  });

  /* Mobile menu */
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      menu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
    }));
  }

  /* Program tabs (ARIA tabs with arrow-key support) */
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', (e) => {
      let next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') next = tabs[0];
      if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });

  /* Newsletter */
  document.querySelectorAll('[data-newsletter]').forEach((form) => {
    const msg = form.querySelector('.form-msg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = (input.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.textContent = 'Enter a valid email address, like name@example.com.';
        input.focus();
        return;
      }
      if (SETTINGS.NEWSLETTER_ENDPOINT) {
        try {
          const res = await fetch(SETTINGS.NEWSLETTER_ENDPOINT, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
          });
          if (!res.ok) throw new Error('bad status');
        } catch (err) {
          msg.textContent = 'We couldn’t subscribe you just now. Try again, or email info@africangirlguide.org.';
          return;
        }
      }
      msg.textContent = 'You’re subscribed. Look out for stories of girls rising.';
      form.reset();
    });
  });

  /* Donation form */
  const form = document.getElementById('give-form');
  if (form) {
    const btn = document.getElementById('give-btn');
    const note = document.getElementById('give-note');
    const custom = document.getElementById('custom-amt');
    const customWrap = document.getElementById('custom-wrap');
    const thanks = document.getElementById('thanks');
    const thanksText = document.getElementById('thanks-text');
    const again = document.getElementById('again');
    const money = (n) => '$' + n.toLocaleString('en-US');

    const read = () => {
      const data = new FormData(form);
      const customVal = (custom.value || '').replace(/[^0-9]/g, '');
      const amount = customVal ? Number(customVal) : Number(data.get('amount') || 0);
      return { monthly: data.get('freq') === 'monthly', amount, fund: data.get('fund'), usingCustom: !!customVal };
    };

    const render = () => {
      const s = read();
      customWrap.classList.toggle('active', s.usingCustom);
      form.querySelectorAll('input[name="amount"]').forEach((r) => {
        r.closest('label').style.opacity = s.usingCustom ? '0.55' : '1';
      });
      btn.textContent = s.amount > 0 ? `Give ${money(s.amount)} ${s.monthly ? 'every month' : 'today'}` : 'Enter an amount';
      btn.disabled = !(s.amount > 0);
      note.textContent = s.monthly
        ? 'Monthly gifts give programmes the steady footing to plan a full school year. Cancel anytime.'
        : 'Prefer to give by bank transfer or cheque? Email info@africangirlguide.org.';
    };

    custom.addEventListener('input', () => {
      custom.value = custom.value.replace(/[^0-9]/g, '');
      render();
    });
    form.querySelectorAll('input[name="amount"]').forEach((r) => r.addEventListener('change', () => { custom.value = ''; render(); }));
    form.addEventListener('change', render);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const s = read();
      if (!(s.amount > 0)) { custom.focus(); return; }
      if (SETTINGS.DONATE_URL) {
        const url = new URL(SETTINGS.DONATE_URL);
        url.searchParams.set('amount', String(s.amount));
        url.searchParams.set('frequency', s.monthly ? 'monthly' : 'once');
        url.searchParams.set('fund', s.fund);
        window.location.href = url.toString();
        return;
      }
      thanksText.textContent = `Your ${s.monthly ? 'monthly ' : ''}gift of ${money(s.amount)} is directed to “${s.fund}”. A receipt will follow by email.`;
      form.hidden = true;
      thanks.hidden = false;
      thanks.focus();
    });

    again.addEventListener('click', () => {
      thanks.hidden = true;
      form.hidden = false;
      btn.focus();
    });

    render();
  }
});
