// App JS for Victoria Used Parts
// - EmailJS init
// - Quote form validation & submission
// - Small UX helpers

(function(){
  document.addEventListener('DOMContentLoaded', function(){
    // Year stamp in footer
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile nav toggle
    var nav = document.querySelector('.primary-nav');
    var navToggle = document.querySelector('.nav-toggle');
    if (nav && navToggle) {
      var setNavState = function(open){
        nav.classList.toggle('is-open', open);
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        navToggle.classList.toggle('is-active', open);
      };

      var closeNav = function(){
        setNavState(false);
      };

      var toggleNav = function(){
        var shouldOpen = !nav.classList.contains('is-open');
        setNavState(shouldOpen);
      };

      navToggle.addEventListener('click', function(){
        toggleNav();
      });

      nav.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click', function(){
          closeNav();
        });
      });

      document.addEventListener('click', function(evt){
        if (!nav.classList.contains('is-open')) return;
        if (nav.contains(evt.target) || navToggle.contains(evt.target)) return;
        closeNav();
      });

      document.addEventListener('keydown', function(evt){
        if (evt.key === 'Escape') {
          closeNav();
        }
      });

      var mq = window.matchMedia('(max-width: 900px)');
      var handleViewportChange = function(e){
        if (!e.matches) {
          closeNav();
        }
      };
      handleViewportChange(mq);
      if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', handleViewportChange);
      } else if (typeof mq.addListener === 'function') {
        mq.addListener(handleViewportChange);
      }
    }

    // EmailJS
    if (window.emailjs && typeof emailjs.init === 'function') {
      try { emailjs.init({ publicKey: '-NZcQAN4ItYp9mRtu' }); } catch(e) { console.warn('EmailJS init failed', e); }
    } else {
      console.warn('EmailJS SDK not found.');
    }

    var form = document.getElementById('quote-form');
    var status = document.getElementById('formStatus');
    var submitBtn = document.getElementById('submitBtn');

    if (form) {
      form.addEventListener('submit', async function(e){
        e.preventDefault();

        // Honeypot: if filled, likely a bot
        var hp = document.getElementById('_hp');
        if (hp && hp.value) return;

        var data = {
          name: document.getElementById('name').value.trim(),
          mobile: document.getElementById('mobile').value.trim(),
          email: document.getElementById('email').value.trim(),
          suburb: document.getElementById('suburb').value.trim(),
          vehicle: document.getElementById('vehicle').value.trim(),
          part: document.getElementById('part').value.trim(),
          urgency: document.getElementById('urgency').value,
          notes: document.getElementById('notes').value.trim()
        };

        if (!data.name || !data.mobile || !data.vehicle || !data.suburb || !data.part || !data.urgency) {
          if (status) status.textContent = 'Please fill in all required fields.';
          return;
        }

        // Legacy template variables for EmailJS compatibility
        data.car = data.vehicle;
        data.rego = data.urgency;

        try {
          if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
          if (status) status.textContent = 'Sending your request…';

          var SERVICE_ID = 'service_elffr9m';
          var TEMPLATE_ID = 'template_015hpab';

          if (window.emailjs && emailjs.send) {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, data);
            if (status) status.textContent = "Thanks! We'll confirm availability shortly.";
            form.reset();
          } else {
            if (status) status.textContent = 'Form sent (demo mode). Please call 0469 934 580 if you do not hear from us.';
          }
        } catch (err) {
          console.error(err);
          if (status) status.textContent = 'Sorry, something went wrong. Please call 0469 934 580.';
        } finally {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Request my part'; }
        }
      });
    }

    // Track tel: clicks in GA4 if present
    document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
      a.addEventListener('click', function(){
        if (window.gtag) gtag('event','click',{event_category:'engagement',event_label:'tel'});
      });
    });
  });
})();