// App JS for Victoria Used Parts
// - EmailJS init
// - Quote form validation & submission
// - Mobile Navigation & Dropdown Toggles

(function(){
  document.addEventListener('DOMContentLoaded', function(){
    // Year stamp in footer
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- MOBILE NAV TOGGLE (Hamburger) ---
    var nav = document.querySelector('.primary-nav');
    var navToggle = document.querySelector('.nav-toggle');
    
    if (nav && navToggle) {
      var toggleNav = function(){
        var isOpen = nav.classList.contains('is-open');
        nav.classList.toggle('is-open', !isOpen);
        navToggle.setAttribute('aria-expanded', !isOpen);
        navToggle.classList.toggle('is-active', !isOpen);
      };

      navToggle.addEventListener('click', toggleNav);

      // Close menu when clicking outside
      document.addEventListener('click', function(evt){
        if (!nav.classList.contains('is-open')) return;
        if (nav.contains(evt.target) || navToggle.contains(evt.target)) return;
        
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
      });
    }

    // --- MOBILE DROPDOWN TOGGLES ---
    // This finds all links that have a dropdown menu next to them
    var dropdownParents = document.querySelectorAll('.has-dropdown > a');
    
    dropdownParents.forEach(function(link) {
      link.addEventListener('click', function(e) {
        // Only trigger this toggle behavior on mobile screens (<= 900px)
        if (window.matchMedia('(max-width: 900px)').matches) {
          e.preventDefault(); // Stop the link from loading a new page
          
          var parentLi = this.parentElement;
          
          // Toggle the 'active' class (CSS will use this to show/hide the menu)
          parentLi.classList.toggle('active');
        }
      });
    });

    // --- EMAILJS FORM SUBMISSION ---
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

        // Honeypot check
        var hp = document.getElementById('_hp');
        if (hp && hp.value) return;

        var formValues = {
          name: document.getElementById('name').value.trim(),
          mobile: document.getElementById('mobile').value.trim(),
          email: document.getElementById('email').value.trim(),
          suburb: document.getElementById('suburb').value.trim(),
          car: document.getElementById('car').value.trim(),
          notes: document.getElementById('notes').value.trim()
        };

        if (!formValues.name || !formValues.mobile || !formValues.car || !formValues.suburb) {
          if (status) status.textContent = 'Please fill in all required fields.';
          return;
        }

        var data = {
          name: formValues.name,
          mobile: formValues.mobile,
          email: formValues.email,
          suburb: formValues.suburb,
          car: formValues.car,
          notes: formValues.notes || '—'
        };

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
            if (status) status.textContent = 'Form sent (demo mode). Please call 0469 934 580.';
          }
        } catch (err) {
          console.error(err);
          if (status) status.textContent = 'Sorry, something went wrong. Please call 0469 934 580.';
        } finally {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Request my part'; }
        }
      });
    }

    // Track tel: clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
      a.addEventListener('click', function(){
        if (window.gtag) gtag('event','click',{event_category:'engagement',event_label:'tel'});
      });
    });
  });
})();