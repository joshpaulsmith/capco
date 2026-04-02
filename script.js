const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const onPortfolioPage = document.body.classList.contains('portfolio-page');
const assetBase = onPortfolioPage ? '../assets/' : 'assets/';

const portfolioItems = [
  {
    filename: 'IMG_0144.jpeg',
    title: 'Gazebo & sunroom work',
    caption: 'Outdoor structure work designed to extend comfort and function.',
    category: 'structures'
  },
  {
    filename: 'IMG_0227.jpeg',
    title: 'Custom deck project',
    caption: 'Clean, durable deck construction built for everyday use.',
    category: 'decks'
  },
  {
    filename: 'IMG_0362.jpeg',
    title: 'Exterior woodwork detail',
    caption: 'Detailed carpentry and finishing for polished exterior spaces.',
    category: 'general'
  },
  {
    filename: 'IMG_0390.jpeg',
    title: 'Finished outdoor living area',
    caption: 'A finished project focused on function, flow, and curb appeal.',
    category: 'general'
  },
  {
    filename: 'IMG_0524.jpeg',
    title: 'Accessibility ramp',
    caption: 'Mobility-focused ramp construction for easier, safer access.',
    category: 'ramps'
  },
  {
    filename: 'IMG_0539.jpeg',
    title: 'Fence installation',
    caption: 'Privacy fencing built for strength, clean lines, and longevity.',
    category: 'fences'
  },
  {
    filename: 'IMG_0553.jpeg',
    title: 'Property upgrade project',
    caption: 'General contracting work that improves the look and use of a space.',
    category: 'general'
  }
];

const portfolioGrid = document.getElementById('portfolioGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
let currentFilter = 'all';

function renderPortfolioGrid(filter = 'all') {
  if (!portfolioGrid) return;
  portfolioGrid.innerHTML = '';

  const filteredItems = portfolioItems.filter((item) => filter === 'all' || item.category === filter);

  filteredItems.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'portfolio-card reveal is-visible';
    article.dataset.category = item.category;
    article.innerHTML = `
      <img src="${assetBase}${item.filename}" alt="${item.title}">
      <div class="portfolio-card-body">
        <span class="portfolio-card-meta">${item.category}</span>
        <h3>${item.title}</h3>
        <p>${item.caption}</p>
      </div>
    `;
    portfolioGrid.appendChild(article);
  });
}

if (portfolioGrid) {
  renderPortfolioGrid(currentFilter);
}

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      renderPortfolioGrid(currentFilter);
    });
  });
}

const featuredPortfolioImage = document.getElementById('featuredPortfolioImage');
const featuredPortfolioTitle = document.getElementById('featuredPortfolioTitle');
const featuredPortfolioCaption = document.getElementById('featuredPortfolioCaption');
const portfolioPrev = document.getElementById('portfolioPrev');
const portfolioNext = document.getElementById('portfolioNext');
let featuredIndex = 0;
let autoRotateId = null;

function updateFeaturedProject(index) {
  if (!featuredPortfolioImage || !featuredPortfolioTitle || !featuredPortfolioCaption) return;
  const item = portfolioItems[index];
  featuredPortfolioImage.src = `${assetBase}${item.filename}`;
  featuredPortfolioImage.alt = item.title;
  featuredPortfolioTitle.textContent = item.title;
  featuredPortfolioCaption.textContent = item.caption;
}

function moveFeaturedProject(direction) {
  featuredIndex = (featuredIndex + direction + portfolioItems.length) % portfolioItems.length;
  updateFeaturedProject(featuredIndex);
}

function startAutoRotate() {
  if (!featuredPortfolioImage) return;
  if (autoRotateId) window.clearInterval(autoRotateId);
  autoRotateId = window.setInterval(() => moveFeaturedProject(1), 4000);
}

if (featuredPortfolioImage) {
  updateFeaturedProject(featuredIndex);
  startAutoRotate();

  if (portfolioPrev) {
    portfolioPrev.addEventListener('click', () => {
      moveFeaturedProject(-1);
      startAutoRotate();
    });
  }

  if (portfolioNext) {
    portfolioNext.addEventListener('click', () => {
      moveFeaturedProject(1);
      startAutoRotate();
    });
  }
}
