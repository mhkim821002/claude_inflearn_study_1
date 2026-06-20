/* ============================================================
   app.js — 프로필 사이트 인터랙션 (의존성 없음)
   - 모바일 네비 햄버거 토글
   - 앵커 부드러운 스크롤 (스티키 헤더 높이 보정)
   - IntersectionObserver 기반 스크롤 리빌
   - 푸터 현재 연도 자동 주입
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconMenu = document.getElementById('iconMenu');
  const iconClose = document.getElementById('iconClose');
  const header = document.querySelector('header');

  // ---------- 모바일 메뉴 열기/닫기 ----------
  const closeMenu = () => {
    mobileMenu.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', '메뉴 열기');
  };

  const toggleMenu = () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      closeMenu();
    } else {
      mobileMenu.classList.remove('hidden');
      iconMenu.classList.add('hidden');
      iconClose.classList.remove('hidden');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', '메뉴 닫기');
    }
  };

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  // 모바일 메뉴 링크 클릭 시 닫기
  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // ---------- 앵커 부드러운 스크롤 (헤더 높이 보정) ----------
  const headerHeight = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- 스크롤 리빌 ----------
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target); // 한 번만 실행
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // IntersectionObserver 미지원 환경: 즉시 표시
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // ---------- 푸터 현재 연도 ----------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
