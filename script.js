/* ============================================================
   SCRIPT.JS — Portfolio SPA
   Router + Markdown Renderer + GSAP Animations + Lenis
   ============================================================ */

'use strict';

// ──────────────────────────────────────────────────────────────
// PROJECT METADATA (synced with content/projects/*.md)
// ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'bai-1',
    num: '01',
    tag: 'BÀI TẬP 01',
    title: 'Máy tính và các thiết bị ngoại vi',
    subtitle: 'Bài 1 — Phần cứng máy tính',
    excerpt: 'Tìm hiểu cấu trúc máy tính và hệ sinh thái thiết bị ngoại vi — nền tảng để sử dụng hiệu quả các công cụ số trong học tập và làm việc kinh doanh hiện đại.',
    objective: 'Nắm vững cấu trúc và vai trò từng thành phần phần cứng; lựa chọn thiết bị phù hợp với nhu cầu công việc.',
    process: 'Nghiên cứu lý thuyết, khảo sát thực tế, phân tích tiêu chí chọn thiết bị văn phòng cho sinh viên kinh doanh.',
    deliverables: ['Báo cáo PDF', 'Bảng so sánh thiết bị', 'Slide thuyết trình'],
    thumb: 'assets/images/bai1-thumb.png',
  },
  {
    id: 'bai-2',
    num: '02',
    tag: 'BÀI TẬP 02',
    title: 'Khai thác dữ liệu và thông tin',
    subtitle: 'Bài 2 — Thông tin số',
    excerpt: 'Xây dựng kỹ năng tìm kiếm, đánh giá và tổ chức thông tin số — kỹ năng then chốt trong nghiên cứu thị trường, phân tích đối thủ và ra quyết định kinh doanh.',
    objective: 'Thành thạo kỹ thuật tìm kiếm nâng cao; đánh giá độ tin cậy nguồn thông tin theo SIFT Method.',
    process: 'Thực hành tìm kiếm trên Google Scholar, Statista, VCCI; phân tích mini case study thị trường digital marketing.',
    deliverables: ['Báo cáo PDF', 'SIFT Checklist', 'Mini Research Report'],
    thumb: 'assets/images/bai2-thumb.png',
  },
  {
    id: 'bai-3',
    num: '03',
    tag: 'BÀI TẬP 03',
    title: 'Tổng quan về trí tuệ nhân tạo',
    subtitle: 'Bài 3 — Trí tuệ nhân tạo',
    excerpt: 'Khám phá cách AI đang định hình lại kinh doanh toàn cầu — từ phân tích hành vi khách hàng, tự động hóa quy trình đến dự báo xu hướng thị trường.',
    objective: 'Hiểu AI từ góc độ quản trị kinh doanh; phân tích cơ hội và rủi ro AI mang lại cho từng ngành.',
    process: 'Nghiên cứu báo cáo McKinsey, WEF; thực hành dùng ChatGPT và Gemini cho phân tích SWOT và tóm tắt tài liệu.',
    deliverables: ['Báo cáo PDF', 'Mind map AI trong kinh doanh', 'Slide thuyết trình'],
    thumb: 'assets/images/bai3-thumb.png',
  },
  {
    id: 'bai-4',
    num: '04',
    tag: 'BÀI TẬP 04',
    title: 'Giao tiếp và hợp tác trong môi trường số',
    subtitle: 'Bài 4 — Cộng tác số',
    excerpt: 'Thực hành các kỹ năng giao tiếp chuyên nghiệp và cộng tác nhóm qua các nền tảng số — kỹ năng cốt lõi trong môi trường làm việc hybrid của doanh nghiệp hiện đại.',
    objective: 'Thành thạo Google Workspace, Teams; nắm nguyên tắc email chuyên nghiệp và xây dựng LinkedIn profile.',
    process: 'Dự án nhóm 4 người thực hiện hoàn toàn online: họp, phân công, cộng tác tài liệu và trình bày qua Google Meet.',
    deliverables: ['Báo cáo PDF', 'Email Guide', 'Mini Case Study F&B'],
    thumb: 'assets/images/bai4-thumb.png',
  },
  {
    id: 'bai-5',
    num: '05',
    tag: 'BÀI TẬP 05',
    title: 'Sáng tạo nội dung số',
    subtitle: 'Bài 5 — Nội dung sáng tạo',
    excerpt: 'Thực hành sản xuất nội dung số đa định dạng phục vụ truyền thông và marketing — từ bài viết, infographic đến video ngắn — áp dụng tư duy storytelling kinh doanh.',
    objective: 'Nắm vững content strategy; thực hành 3 định dạng: LinkedIn article, infographic Canva, video TikTok/Reels.',
    process: 'Lên kế hoạch nội dung, brainstorm với AI, sản xuất và phân tích hiệu quả theo content production workflow.',
    deliverables: ['LinkedIn Article', 'Infographic PNG', 'Video 45 giây'],
    thumb: 'assets/images/bai5-thumb.png',
  },
  {
    id: 'bai-6',
    num: '06',
    tag: 'BÀI TẬP 06',
    title: 'An toàn và liêm chính học thuật trong môi trường số',
    subtitle: 'Bài 6 — An toàn số',
    excerpt: 'Nghiên cứu bảo mật thông tin cá nhân và liêm chính học thuật trong thời đại AI — xây dựng nền tảng đạo đức số cho người học và người làm kinh doanh.',
    objective: 'Thực hiện Personal Security Audit; xây dựng framework sử dụng AI có đạo đức trong học tập và công việc.',
    process: 'Kiểm tra và nâng cấp toàn bộ thói quen bảo mật cá nhân; nghiên cứu case study phishing, deepfake trong kinh doanh.',
    deliverables: ['Báo cáo PDF', 'Security Audit Checklist', 'AI Ethics Framework'],
    thumb: 'assets/images/bai6-thumb.png',
  },
];



// ──────────────────────────────────────────────────────────────
// GLOBAL STATE
// ──────────────────────────────────────────────────────────────
let lenis = null;
let currentView = 'home';
let isTransitioning = false;

// Detect reduced-motion preference for accessibility & performance
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Detect low-power device heuristic (touch device = likely mobile/battery)
const isLowPower = navigator.maxTouchPoints > 0 || window.innerWidth < 768;
// Skip heavy effects on low-power or reduced-motion
const useHeavyFX = !prefersReducedMotion && !isLowPower;

// ──────────────────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initCursor();
  initSplitting();
  initHeroAnimations();
  initScrollAnimations();
  buildProjectCards();
  initRouter();
  initNavigation();
  initHoverEffects();
});

// ──────────────────────────────────────────────────────────────
// LENIS SMOOTH SCROLL
// ──────────────────────────────────────────────────────────────
function initLenis() {
  lenis = new Lenis({
    duration: 1.0,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 1.5,
  });

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Use single RAF loop for Lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Link scroll to ScrollTrigger updates
  lenis.on('scroll', ScrollTrigger.update);
}

// ──────────────────────────────────────────────────────────────
// CUSTOM CURSOR
// ──────────────────────────────────────────────────────────────
function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  // Detect mobile viewports or touch capability and disable custom cursor
  const isMobileOrTouch = window.innerWidth <= 900 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isMobileOrTouch) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    document.body.classList.remove('cursor-hover');
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(cursor, { x: mouseX, y: mouseY });
  });

  // Follower with lag
  (function followCursor() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    gsap.set(follower, { x: followerX, y: followerY });
    requestAnimationFrame(followCursor);
  })();

  // Hover effect on interactive elements
  const interactiveSelector = 'a, button, .project-card, .nav-link, .hero__scroll-cta';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

// ──────────────────────────────────────────────────────────────
// SPLITTING.JS TEXT REVEAL
// ──────────────────────────────────────────────────────────────
function initSplitting() {
  if (typeof Splitting !== 'undefined') {
    Splitting();
  }
}

// ──────────────────────────────────────────────────────────────
// HERO ANIMATIONS
// ──────────────────────────────────────────────────────────────
function initHeroAnimations() {
  if (prefersReducedMotion) {
    // Just show everything instantly
    gsap.set(['#hero-title .char', '.hero__pill', '.hero__scroll-cta'], { opacity: 1, y: 0 });
    gsap.set('#hero-title .char', { transform: 'none' });
    return;
  }

  const tl = gsap.timeline({ delay: 0.2 });

  // Hero title chars stagger
  const heroChars = document.querySelectorAll('#hero-title .char');
  if (heroChars.length) {
    tl.to(heroChars, {
      y: '0%',
      stagger: 0.03,
      duration: 1,
      ease: 'power4.out',
    });
  }

  // Rules fade in
  tl.from('.hero__rule', {
    scaleX: 0,
    transformOrigin: 'center',
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15,
  }, '-=0.6');

  // Pills + CTA
  tl.to('.hero__pill', {
    opacity: 1, y: 0,
    stagger: 0.1, duration: 0.7, ease: 'power3.out'
  }, '-=0.4')
  .to('.hero__scroll-cta', {
    opacity: 1, y: 0,
    duration: 0.7, ease: 'power3.out'
  }, '-=0.4');

  // Decorative circles gentle pulse — CSS handles via animation
  // No scroll-based parallax on hero (removed for performance)
}

// ──────────────────────────────────────────────────────────────
// SCROLL ANIMATIONS (About Section)
// ──────────────────────────────────────────────────────────────
function initScrollAnimations() {
  if (prefersReducedMotion) return;

  // About title chars
  const aboutChars = document.querySelectorAll('.about__title .char');
  if (aboutChars.length) {
    gsap.to(aboutChars, {
      y: '0%',
      stagger: 0.02,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.about__title',
        start: 'top 85%',
      }
    });
  }

  // About text blocks — simple fade+slide, no parallax
  const aboutAnims = ['.about__lead', '.about__body', '.about__goals', '.about__image-col'];
  aboutAnims.forEach((sel, i) => {
    gsap.to(sel, {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: i * 0.08,
      scrollTrigger: {
        trigger: sel,
        start: 'top 88%',
      }
    });
  });

  // Portrait subtle scale — only on non-mobile
  if (useHeavyFX) {
    gsap.to('#about-portrait', {
      y: '-6%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.about__image-frame',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });
  }
}

// ──────────────────────────────────────────────────────────────
// REFLECTIONS ANIMATIONS
// ──────────────────────────────────────────────────────────────
function initReflectionsAnimations() {
  // Title chars
  const refChars = document.querySelectorAll('.reflections__title .char');
  if (refChars.length) {
    gsap.to(refChars, {
      y: '0%',
      stagger: 0.02,
      duration: 1.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.reflections__title',
        start: 'top 85%',
      }
    });
  }

  // Reflection blocks
  document.querySelectorAll('.reflection-block').forEach(block => {
    gsap.to(block, {
      opacity: 1, y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: block,
        start: 'top 85%',
      }
    });
  });
}

// ──────────────────────────────────────────────────────────────
// BUILD PROJECT BLOCKS (editorial collage layout)
// ──────────────────────────────────────────────────────────────
function buildProjectCards() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  PROJECTS.forEach((proj, idx) => {
    const isOdd = idx % 2 !== 0; // odd index = flipped layout

    const block = document.createElement('article');
    block.className = `project-block ${isOdd ? 'project-block--odd' : 'project-block--even'}`;
    block.setAttribute('data-id', proj.id);
    block.id = `block-${proj.id}`;

    const deliverablesList = (proj.deliverables || [])
      .map(d => `<li>${d}</li>`).join('');

    block.innerHTML = `
      <!-- Content side -->
      <div class="project-block__content">
        <div class="project-block__tag">${proj.tag}</div>
        <h2 class="project-block__title">${proj.title}</h2>
        <p class="project-block__excerpt">${proj.excerpt}</p>

        <div class="project-block__specs">
          <div class="project-block__spec">
            <span class="project-block__spec-label">Objective</span>
            <p>${proj.objective || ''}</p>
          </div>
          <div class="project-block__spec">
            <span class="project-block__spec-label">Process</span>
            <p>${proj.process || ''}</p>
          </div>
          <div class="project-block__spec">
            <span class="project-block__spec-label">Final Deliverables</span>
            <ul>${deliverablesList}</ul>
          </div>
        </div>

        <button class="project-block__cta" data-id="${proj.id}" id="cta-${proj.id}">
          <span class="project-block__cta-label">Xem chi tiết</span>
          <span class="project-block__cta-arrow" aria-hidden="true">→</span>
        </button>
      </div>

      <!-- Collage image side -->
      <div class="project-block__collage">
        <div class="project-block__img-wrap">
          <div class="project-block__img-frame project-block__img-frame--a">
            <img src="${proj.thumb}" alt="${proj.title}" loading="lazy" />
          </div>
          <div class="project-block__img-frame project-block__img-frame--b">
            <img src="${proj.thumb}" alt="" loading="lazy" aria-hidden="true" />
          </div>
          <div class="project-block__num-badge">${proj.num}</div>
        </div>
        <div class="project-block__dots" aria-hidden="true">●●●</div>
      </div>
    `;

    // Click CTA → navigate to detail
    block.querySelector('.project-block__cta').addEventListener('click', (e) => {
      e.stopPropagation();
      navigateTo(`project/${proj.id}`);
    });

    grid.appendChild(block);
  });
}

// ──────────────────────────────────────────────────────────────
// ANIMATE PROJECT BLOCKS
// ──────────────────────────────────────────────────────────────
function animateProjectCards() {
  if (prefersReducedMotion) {
    document.querySelectorAll('.project-block').forEach(b => {
      gsap.set(b, { opacity: 1, y: 0 });
    });
    return;
  }

  document.querySelectorAll('.project-block').forEach((block) => {
    const content  = block.querySelector('.project-block__content');
    const tag      = block.querySelector('.project-block__tag');
    const title    = block.querySelector('.project-block__title');
    const excerpt  = block.querySelector('.project-block__excerpt');
    const specs    = block.querySelector('.project-block__specs');
    const cta      = block.querySelector('.project-block__cta');
    const imgA     = block.querySelector('.project-block__img-frame--a');
    const imgB     = block.querySelector('.project-block__img-frame--b');
    const dots     = block.querySelector('.project-block__dots');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top 82%',
      }
    });

    tl.from(tag,    { opacity: 0, y: 12,  duration: 0.5, ease: 'power3.out' })
      .from(title,  { opacity: 0, y: 24,  duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .from(excerpt,{ opacity: 0, y: 16,  duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from(specs,  { opacity: 0, y: 12,  duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from(cta,    { opacity: 0, x: -8,  duration: 0.4, ease: 'power3.out' }, '-=0.3')
      .from(imgA,   { opacity: 0, scale: 0.94, rotate: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
      .from(imgB,   { opacity: 0, scale: 0.9,  y: 20,     duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from(dots,   { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');
  });
}



// ──────────────────────────────────────────────────────────────
// HASH-BASED ROUTER
// ──────────────────────────────────────────────────────────────
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // initial load
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '') || 'home';

  if (hash.startsWith('project/')) {
    const id = hash.split('/')[1];
    showView('detail', () => loadProjectDetail(id));
  } else {
    switch (hash) {
      case 'projects':
        showView('projects', () => {
          ScrollTrigger.refresh();
          animateProjectCards();
        });
        break;
      case 'reflections':
        showView('reflections', () => {
          Splitting();
          ScrollTrigger.refresh();
          initReflectionsAnimations();
        });
        break;
      default:
        showView('home', () => {
          ScrollTrigger.refresh();
        });
        break;
    }
  }
}

// ──────────────────────────────────────────────────────────────
// VIEW SWITCHER WITH GSAP TRANSITION
// ──────────────────────────────────────────────────────────────
const VIEWS = {
  home:        'view-home',
  projects:    'view-projects',
  detail:      'view-detail',
  reflections: 'view-reflections',
};

const DARK_VIEWS = ['projects', 'detail'];

function showView(viewKey, onComplete) {
  if (isTransitioning) return;
  isTransitioning = true;

  const allViews = Object.values(VIEWS);
  const targetId = VIEWS[viewKey];

  // Transition overlay
  const tl = gsap.timeline({
    onComplete: () => {
      isTransitioning = false;
      if (onComplete) onComplete();
      updateNavState(viewKey);
      updateDotNav(viewKey);
      updateTheme(viewKey);
      // scroll to top
      if (lenis) lenis.scrollTo(0, { immediate: true });
    }
  });

  // Fade out current
  tl.to('#app', {
    opacity: 0, y: -20,
    duration: 0.35,
    ease: 'power2.in',
    onComplete: () => {
      // Hide all, show target
      allViews.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('hidden', id !== targetId);
      });
    }
  })
  // Fade in new
  .set('#app', { y: 20 })
  .to('#app', {
    opacity: 1, y: 0,
    duration: 0.55,
    ease: 'power3.out',
  });

  currentView = viewKey;
}

// ──────────────────────────────────────────────────────────────
// THEME SWITCHING (cream / dark burgundy)
// ──────────────────────────────────────────────────────────────
function updateTheme(viewKey) {
  const isDark = DARK_VIEWS.includes(viewKey);
  document.body.classList.toggle('on-dark', isDark);

  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.classList.toggle('dark', isDark);
  if (footer) footer.classList.toggle('dark', isDark);
}

// ──────────────────────────────────────────────────────────────
// NAVIGATION STATE
// ──────────────────────────────────────────────────────────────
function updateNavState(viewKey) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const section = link.getAttribute('data-section');
    const isActive = section === viewKey || (viewKey === 'detail' && section === 'projects');
    link.classList.toggle('active', isActive);
  });
}

function updateDotNav(viewKey) {
  const dotMap = { home: 'dot-home', projects: 'dot-projects', detail: 'dot-projects', reflections: 'dot-reflections' };
  document.querySelectorAll('.dot-nav__item').forEach(dot => dot.classList.remove('active'));
  const activeDot = document.getElementById(dotMap[viewKey]);
  if (activeDot) activeDot.classList.add('active');
}

// ──────────────────────────────────────────────────────────────
// NAVIGATION CLICK HANDLERS
// ──────────────────────────────────────────────────────────────
function initNavigation() {
  // Header nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      navigateTo(section);
    });
  });

  // Dot nav
  document.querySelectorAll('.dot-nav__item').forEach(dot => {
    dot.addEventListener('click', () => {
      const target = dot.getAttribute('data-target');
      navigateTo(target);
    });
  });

  // About → Projects CTA
  const gotoProjects = document.getElementById('goto-projects');
  if (gotoProjects) {
    gotoProjects.addEventListener('click', e => {
      e.preventDefault();
      navigateTo('projects');
    });
  }

  // Hero scroll CTA
  const heroScrollCta = document.getElementById('hero-scroll-cta');
  if (heroScrollCta) {
    heroScrollCta.addEventListener('click', () => {
      const aboutEl = document.getElementById('about');
      if (aboutEl && lenis) lenis.scrollTo(aboutEl, { duration: 1.5 });
    });
  }

  // Back button in detail
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => navigateTo('projects'));
  }
}

function navigateTo(route) {
  window.location.hash = route;
}

// ──────────────────────────────────────────────────────────────
// LOAD & RENDER PROJECT DETAIL
// ──────────────────────────────────────────────────────────────
async function loadProjectDetail(id) {
  const proj = PROJECTS.find(p => p.id === id);
  if (!proj) {
    showDetailError('Không tìm thấy bài tập này.');
    return;
  }

  // Update static fields immediately
  document.getElementById('detail-pill').textContent  = proj.tag;
  document.getElementById('detail-title').textContent = proj.title;
  document.getElementById('detail-breadcrumb').textContent = `Dự án / ${proj.tag}`;

  const thumb = document.getElementById('detail-thumb');
  const thumbWrap = document.getElementById('detail-thumb-wrap');
  if (thumb && proj.thumb) {
    thumb.src = proj.thumb;
    thumb.alt = proj.title;
    thumbWrap.style.display = 'block';
  }

  // Show loading spinner
  const contentEl = document.getElementById('markdown-content');
  contentEl.innerHTML = `
    <div class="detail__loading" id="detail-loading">
      <div class="detail__loading-dot"></div>
      <div class="detail__loading-dot"></div>
      <div class="detail__loading-dot"></div>
    </div>
  `;

  // Fetch markdown
  try {
    const res = await fetch(`content/projects/${id}.md`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.text();
    const { content } = parseFrontmatter(raw);
    renderMarkdown(content, contentEl);
    animateDetailEntry();
  } catch (err) {
    showDetailError(`Không thể tải nội dung. (${err.message})<br>Hãy đảm bảo mở file qua Live Server hoặc local server.`);
  }
}

// ──────────────────────────────────────────────────────────────
// FRONTMATTER PARSER (simple YAML-like)
// ──────────────────────────────────────────────────────────────
function parseFrontmatter(raw) {
  const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match   = raw.match(fmRegex);
  const meta    = {};

  if (match) {
    const fmLines = match[1].split('\n');
    fmLines.forEach(line => {
      const [key, ...val] = line.split(':');
      if (key && val.length) meta[key.trim()] = val.join(':').trim();
    });
    return { meta, content: raw.slice(match[0].length) };
  }

  return { meta, content: raw };
}

// ──────────────────────────────────────────────────────────────
// RENDER MARKDOWN
// ──────────────────────────────────────────────────────────────
function renderMarkdown(mdText, container) {
  if (typeof marked === 'undefined') {
    container.innerHTML = '<p>marked.js not loaded.</p>';
    return;
  }

  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  container.innerHTML = marked.parse(mdText);

  // Make all links open in new tab
  container.querySelectorAll('a[href]').forEach(a => {
    if (!a.href.startsWith('#')) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// ──────────────────────────────────────────────────────────────
// DETAIL PAGE ANIMATION
// ──────────────────────────────────────────────────────────────
function animateDetailEntry() {
  const tl = gsap.timeline();
  tl.from('.detail__back-bar',    { opacity: 0, y: -20, duration: 0.5, ease: 'power3.out' })
    .from('.detail__meta',        { opacity: 0, y: 20,  duration: 0.5, ease: 'power3.out' }, '-=0.2')
    .from('.detail__title',       { opacity: 0, y: 30,  duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .from('.detail__thumb-wrap',  { opacity: 0, scale: 0.97, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .from('.markdown-content',    { opacity: 0, y: 20,  duration: 0.8, ease: 'power3.out' }, '-=0.3');
}

// ──────────────────────────────────────────────────────────────
// ERROR STATE
// ──────────────────────────────────────────────────────────────
function showDetailError(msg) {
  const el = document.getElementById('markdown-content');
  if (el) {
    el.innerHTML = `
      <div style="padding: 48px 0; opacity: 0.6;">
        <p style="font-size:14px; line-height:1.8;">${msg}</p>
        <p style="margin-top:16px; font-size:12px; opacity:0.5;">
          Tip: Mở terminal và chạy <code>python -m http.server 8000</code> trong thư mục dự án, sau đó truy cập <code>http://localhost:8000</code>
        </p>
      </div>
    `;
  }
}

// ──────────────────────────────────────────────────────────────
// HOVER EFFECTS (lightweight — removed heavy 3D magnetic effect)
// ──────────────────────────────────────────────────────────────
function initHoverEffects() {
  if (!useHeavyFX) return; // Skip entirely on mobile / reduced-motion

  // Simple subtle lift on project cards (no 3D rotate — was too heavy)
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -4, duration: 0.35, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power3.out' });
    });
  });
}

// ──────────────────────────────────────────────────────────────
// SCROLL-BASED HEADER HIGHLIGHT
// ──────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const aboutEl = document.getElementById('about');
  if (!aboutEl) return;
  const inAbout = aboutEl.getBoundingClientRect().top < window.innerHeight / 2;
  // Additional scroll logic can go here
}, { passive: true });
