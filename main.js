// Software Studio - landing page behaviours
(function () {
  'use strict';

  // Mobile nav toggle
  var header = document.querySelector('.site-header');
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.querySelector('.nav');

  if (menuBtn && header && nav) {
    menuBtn.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close the menu when a link inside it is used
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        header.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveal (respects prefers-reduced-motion via CSS fallback)
  var reveals = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Footer year
  var year = document.getElementById('year');
  if (year) { year.textContent = String(new Date().getFullYear()); }

  // Contact form -> mailto handoff
  // Interim receiver until a hosted form backend (Web3Forms / Netlify Forms) is chosen.
  var form = document.getElementById('project-form');
  var note = document.getElementById('form-note');

  if (form && note) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.reportValidity()) { return; }

      var data = new FormData(form);
      var body =
        'Name: ' + data.get('name') + '\n' +
        'Email: ' + data.get('email') + '\n' +
        'Wants to build: ' + data.get('build') + '\n' +
        'Budget: ' + data.get('budget');

      var subject = 'Project inquiry from ' + data.get('name');
      note.textContent = 'Opening your email app...';
      window.location.href =
        'mailto:hello@software.studio?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
