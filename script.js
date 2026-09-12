const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    let visibleCount = 0;
    projects.forEach((project) => {
      const visible = button.dataset.filter === 'all' || project.dataset.category.split(' ').includes(button.dataset.filter);
      project.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    document.querySelector('.project-count').textContent = `Showing ${visibleCount} project${visibleCount === 1 ? '' : 's'}`;
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
