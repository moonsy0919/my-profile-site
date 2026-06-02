/* ===== Typing animation ===== */
const roles = ['풀스택 개발자', '웹 개발자', '문제 해결사', 'JavaScript 개발자'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
  const current = roles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();

/* ===== Navbar scroll effect ===== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
}, { passive: true });

/* ===== Active nav link on scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function updateActiveNavLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  [...navLinks, ...mobileNavLinks].forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ===== Mobile menu ===== */
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuBtn.classList.toggle('open');
  menuBtn.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
});

// Close mobile menu on link click
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-label', '메뉴 열기');
  });
});

/* ===== Fade-in on scroll (IntersectionObserver) ===== */
const fadeEls = document.querySelectorAll('.fade-in-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ===== Avatar upload ===== */
const avatarInput = document.getElementById('avatar-input');
const avatarImg = document.getElementById('avatar-img');
const avatarPlaceholder = document.getElementById('avatar-placeholder');
const heroAvatarImg = document.getElementById('hero-avatar-img');
const heroAvatarPlaceholder = document.getElementById('hero-avatar-placeholder');

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file || !file.type.startsWith('image/')) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const src = evt.target.result;

    // About section avatar
    avatarImg.src = src;
    avatarImg.classList.remove('hidden');
    avatarPlaceholder.classList.add('hidden');

    // Hero section avatar
    heroAvatarImg.src = src;
    heroAvatarImg.classList.remove('hidden');
    heroAvatarPlaceholder.classList.add('hidden');
  };
  reader.readAsDataURL(file);
});
