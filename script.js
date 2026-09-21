(function () {
  'use strict';

  var headerEl = document.querySelector('header');

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var headerHeight = headerEl ? headerEl.offsetHeight : 0;
      var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });


  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -100px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('active'); });
  }

  var glowsEl = document.querySelector('.glows');
  var heroSection = document.getElementById('hero');
  if (glowsEl && heroSection && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        glowsEl.style.opacity = entry.isIntersecting ? '1' : '0';
      });
    }).observe(heroSection);
  }

  // --- Cookie consent + Google Tag Manager (Consent Mode v2) ---
  var GTM_ID = 'GTM-M4VHW3CL';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  if (!window.gtmScriptLoaded) {
    window.gtmScriptLoaded = true;
    (function (w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({
        'gtm.start':
          new Date().getTime(), event: 'gtm.js'
      }); var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', GTM_ID);
  }

  var cookieBar = document.getElementById('cookie-bar');
  var CONSENT_KEY = 'cookie-consent';

  if (cookieBar) {
    var consent = localStorage.getItem(CONSENT_KEY);

    if (consent === 'accepted') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    } else if (consent !== 'declined') {
      setTimeout(function () { cookieBar.classList.add('visible'); }, 800);
    }

    document.getElementById('cookie-accept').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      cookieBar.classList.remove('visible');
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    });

    document.getElementById('cookie-decline').addEventListener('click', function () {
      localStorage.setItem(CONSENT_KEY, 'declined');
      cookieBar.classList.remove('visible');
    });
  }

})();
