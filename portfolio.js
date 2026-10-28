const projects = Array.isArray(window.LEMURY_PORTFOLIO) ? window.LEMURY_PORTFOLIO : [];
const grid = document.querySelector('#portfolio-grid');
const viewer = document.querySelector('#project-viewer');
let activeProject = 0;

function showProject(index) {
  activeProject = (index + projects.length) % projects.length;
  const project = projects[activeProject];
  document.querySelector('#viewer-title').textContent = project.title;
  document.querySelector('#viewer-category').textContent = project.category || 'Portfólio Lemury';
  const image = document.querySelector('#viewer-image');
  image.src = project.image;
  image.alt = project.alt || project.title;
  const description = document.querySelector('#viewer-description');
  description.textContent = project.description || '';
  description.hidden = !project.description;
  document.querySelector('#viewer-position').textContent = (activeProject + 1) + ' / ' + projects.length;
  document.querySelector('#viewer-contact').href = 'https://wa.me/5564992711557?text=' + encodeURIComponent('Olá, vi o projeto "' + project.title + '" no portfólio da Lemury e gostaria de conversar sobre meu e-commerce.');
  document.querySelector('#viewer-prev').disabled = projects.length < 2;
  document.querySelector('#viewer-next').disabled = projects.length < 2;
  if (!viewer.open) viewer.showModal();
}

projects.forEach((project, index) => {
  const card = document.createElement('button');
  card.className = 'portfolio-project';
  card.type = 'button';
  card.setAttribute('aria-haspopup', 'dialog');
  const visual = document.createElement('span');
  visual.className = 'project-thumbnail';
  const image = document.createElement('img');
  image.src = project.image;
  image.alt = project.alt || project.title;
  image.loading = 'lazy';
  image.decoding = 'async';
  visual.append(image);
  const info = document.createElement('span');
  info.className = 'project-info';
  const text = document.createElement('span');
  const category = document.createElement('span');
  category.className = 'eyebrow';
  category.textContent = project.category || 'E-commerce';
  const title = document.createElement('span');
  title.className = 'project-title';
  title.textContent = project.title;
  text.append(title, category);
  const arrow = document.createElement('span');
  arrow.className = 'project-arrow';
  arrow.textContent = '↗';
  arrow.setAttribute('aria-hidden', 'true');
  info.append(text, arrow);
  card.append(info, visual);
  card.addEventListener('click', () => showProject(index));
  grid.append(card);
});
document.querySelector('#portfolio-empty').hidden = projects.length > 0;
document.querySelector('#catalog-hint').hidden = projects.length === 0;
document.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
document.querySelector('#viewer-prev').addEventListener('click', () => showProject(activeProject - 1));
document.querySelector('#viewer-next').addEventListener('click', () => showProject(activeProject + 1));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' && projects.length > 1) { event.preventDefault(); showProject(activeProject - 1); }
  if (event.key === 'ArrowRight' && projects.length > 1) { event.preventDefault(); showProject(activeProject + 1); }
});
viewer.addEventListener('click', event => {
  if (event.target !== viewer) return;
  const rect = viewer.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
});

