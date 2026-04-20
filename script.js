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
    title: 'Gazebo and enclosed outdoor living space',
    caption: 'Custom structure work that adds shade, comfort, and more usable space outdoors.',
    category: 'structures'
  },
  {
    filename: 'IMG_0227.jpeg',
    title: 'Pressure-treated deck build',
    caption: 'A clean, durable deck designed for everyday family use and long-term performance.',
    category: 'decks'
  },
  {
    filename: 'IMG_0362.jpeg',
    title: 'Exterior carpentry and finish detail',
    caption: 'Trim, framing, and finishing work completed with a polished, practical result.',
    category: 'general'
  },
  {
    filename: 'IMG_0390.jpeg',
    title: 'Backyard living area upgrade',
    caption: 'An outdoor project built to improve flow, comfort, and day-to-day use of the space.',
    category: 'general'
  },
  {
    filename: 'IMG_0524.jpeg',
    title: 'Accessibility ramp with safe entry access',
    caption: 'Mobility-focused ramp construction built for easier access, stability, and confidence.',
    category: 'ramps'
  },
  {
    filename: 'IMG_0539.jpeg',
    title: 'Privacy fence installation',
    caption: 'A strong, clean-lined fence installation built for privacy, durability, and curb appeal.',
    category: 'fences'
  },
  {
    filename: 'IMG_0553.jpeg',
    title: 'Property upgrade and exterior improvements',
    caption: 'General contracting work that improved both the look of the property and how it functions.',
    category: 'general'
  },
  {
    filename: 'IMG_1193.jpeg',
    title: 'Completed exterior build and finishing',
    caption: 'Exterior contracting completed with careful finishing details and a long-lasting result.',
    category: 'general'
  },
  {
    filename: 'IMG_7246.jpeg',
    title: 'Finished construction detail',
    caption: 'A closer look at the fit, finish, and workmanship behind a completed Capco project.',
    category: 'general'
  },
  {
    filename: 'IMG_7251.jpeg',
    title: 'Custom carpentry and structure detail',
    caption: 'Detail-focused carpentry completed for a practical build with a polished final look.',
    category: 'structures'
  },
  {
    filename: 'IMG_7445.jpeg',
    title: 'Outdoor structure and finishing work',
    caption: 'Exterior project work built for everyday use, solid performance, and lasting value.',
    category: 'structures'
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
      <img src="${assetBase}${item.filename}" width="1200" height="1600" loading="lazy" alt="${item.title}">
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
      filterButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
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

const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = quoteForm.querySelector('#quoteName')?.value.trim() || '';
    const phone = quoteForm.querySelector('#quotePhone')?.value.trim() || '';
    const email = quoteForm.querySelector('#quoteEmail')?.value.trim() || '';
    const location = quoteForm.querySelector('#quoteLocation')?.value.trim() || '';
    const project = quoteForm.querySelector('#quoteProject')?.value.trim() || '';
    const details = quoteForm.querySelector('#quoteDetails')?.value.trim() || '';

    const subject = encodeURIComponent(`Estimate request from ${name || 'website visitor'}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Project location: ${location}\n` +
      `Project type: ${project}\n\n` +
      `Project details:\n${details}`
    );

    window.location.href = `mailto:capcoscape@hotmail.com?subject=${subject}&body=${body}`;
  });
}
