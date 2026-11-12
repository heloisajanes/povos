// ===== NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== INK DROPS =====
function createInkDrops() {
  const container = document.getElementById('inkDrops');
  const count = 14;

  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'ink-drop';
    const size = 2 + Math.random() * 6;
    drop.style.width = size + 'px';
    drop.style.height = size + 'px';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.top = Math.random() * 20 + '%';
    drop.style.animationDuration = 6 + Math.random() * 10 + 's';
    drop.style.animationDelay = Math.random() * 12 + 's';

    const colors = ['#8b1a1a', '#a32b2b', '#cc4b2c', '#2d2d2d'];
    drop.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(drop);
  }
}
createInkDrops();

// ===== INTERSECTION OBSERVER =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-section, .fade-slide').forEach(el => {
  observer.observe(el);
});

// ===== TIMELINE LINE FILL =====
const timelineLine = document.getElementById('timelineLine');
const timelineItems = document.querySelectorAll('.timeline-item');

function updateTimeline() {
  if (!timelineLine || timelineItems.length === 0) return;

  const timelineSection = document.getElementById('enredo');
  const sectionRect = timelineSection.getBoundingClientRect();
  const sectionTop = sectionRect.top;
  const sectionHeight = sectionRect.height;
  const windowHeight = window.innerHeight;

  const scrollProgress = Math.max(0, Math.min(1,
    (windowHeight - sectionTop) / (sectionHeight + windowHeight)
  ));

  let fillBar = timelineLine.querySelector('.timeline-fill');
  if (!fillBar) {
    fillBar = document.createElement('div');
    fillBar.className = 'timeline-fill';
    timelineLine.appendChild(fillBar);
  }
  fillBar.style.height = Math.round(scrollProgress * 100) + '%';

  // Animate markers
  timelineItems.forEach((item, index) => {
    const rect = item.getBoundingClientRect();
    const isVisible = rect.top < windowHeight - 100 && rect.bottom > 0;
    if (isVisible) {
      item.querySelector('.timeline-marker')?.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', updateTimeline);

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-menu a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < 300) {
      current = section.getAttribute('id') || 'inicio';
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    const href = link.getAttribute('href')?.replace('#', '');
    if (href === current) {
      link.style.color = 'var(--terracota)';
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ===== PARALLAX KISS ON SCROLL =====
const kissGroup = document.querySelector('.kiss-group');
if (kissGroup) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;
    const progress = Math.min(1, scrollY / maxScroll);
    kissGroup.style.opacity = 1 - progress * 0.4;
  });
}

// ===== REVEAL ON SCROLL FOR TIMELINE CARDS =====
const timelineCards = document.querySelectorAll('.timeline-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

timelineCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  cardObserver.observe(card);
});

// ===== INITIALIZE =====
updateTimeline();
updateActiveNav();