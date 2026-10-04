const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menu.hidden = false;
navigation.classList.add('menu-ready');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    menu.focus();
  }
});
const planner = document.querySelector('#planner');
const date = planner.elements.date;
const today = new Date();
date.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
document.querySelector('#year').textContent = today.getFullYear();
document.querySelectorAll('[data-package]').forEach(link => {
  link.addEventListener('click', () => {
    planner.elements.package.value = link.dataset.package;
    document.querySelector('#inquiry').hidden = true;
  });
});
planner.addEventListener('input', () => { document.querySelector('#inquiry').hidden = true; });
planner.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(planner);
  const eventDate = new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
  document.querySelector('#summary').value = `Hello JC Java! I'd like to ask about coffee service.\nEvent: ${data.get('event')}\nDate: ${eventDate}\nExpected guests: ${data.get('guests')}\nLocation: ${data.get('location').trim()}\nPackage: ${data.get('package')}\nPlease let me know your availability and next steps.`;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#inquiry').hidden = false;
  document.querySelector('#summary').focus();
});
document.querySelector('#copy').addEventListener('click', async () => {
  const summary = document.querySelector('#summary');
  try {
    await navigator.clipboard.writeText(summary.value);
    document.querySelector('#copy-status').textContent = 'Copied. Open the contact form to share your inquiry.';
  } catch {
    summary.focus();
    summary.select();
    document.querySelector('#copy-status').textContent = 'Your details are selected. Use your device’s copy command, then open the contact form.';
  }
});
