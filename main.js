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

  // Contact form -> Web3Forms receiver
  var form = document.getElementById('project-form');
  var note = document.getElementById('form-note');

  if (form && note) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var btnLabel = submitBtn ? submitBtn.textContent : '';

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.reportValidity()) { return; }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      note.textContent = '';

      fetch(form.action, { method: 'POST', body: new FormData(form) })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (res_ok(result)) {
            note.textContent = '';
            form.innerHTML =
              '<p class="form-success">Thanks! Your request is on its way - we\'ll reply within one business day.</p>';
          } else {
            fail(result);
          }
        })
        .catch(function () {
          fail(null);
        });

      function res_ok(result) {
        return result && result.success === true;
      }

      function fail(result) {
        note.textContent =
          (result && result.message) ||
          'Something went wrong. Please email hello@software.studio instead.';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = btnLabel;
        }
      }
    });
  }
})();
