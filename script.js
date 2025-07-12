const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('menu-open');
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('dropdown-open');
});

// Show tooltip on tap/click and fade out automatically (desktop and mobile)
const navLinks = document.querySelectorAll('.nav-links a[data-tooltip]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    link.classList.add('show-tooltip');
    link.classList.remove('fading-tooltip');
    setTimeout(() => {
      link.classList.remove('show-tooltip');
      link.classList.add('fading-tooltip');
      setTimeout(() => {
        link.classList.remove('fading-tooltip');
      }, 500); // match CSS transition
    }, 1200);
  });
});

// Sticky header with animated main title on scroll
const header = document.querySelector('header');
const scrollMenuBtn = document.getElementById('scroll-menu-btn');
const scrollMenuOverlay = document.getElementById('scroll-menu-overlay');
const closeScrollMenu = document.getElementById('close-scroll-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 32) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    if (scrollMenuOverlay) scrollMenuOverlay.classList.remove('open');
  }
});

if (scrollMenuBtn && scrollMenuOverlay && closeScrollMenu) {
  scrollMenuBtn.addEventListener('click', () => {
    scrollMenuOverlay.classList.add('open');
  });
  closeScrollMenu.addEventListener('click', () => {
    scrollMenuOverlay.classList.remove('open');
  });
  // Hide overlay on click outside nav
  scrollMenuOverlay.addEventListener('click', (e) => {
    if (e.target === scrollMenuOverlay) {
      scrollMenuOverlay.classList.remove('open');
    }
  });
  // Show/fade tooltip on overlay menu links
  scrollMenuOverlay.querySelectorAll('a[data-tooltip]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      link.classList.add('show-tooltip');
      link.classList.remove('fading-tooltip');
      setTimeout(() => {
        link.classList.remove('show-tooltip');
        link.classList.add('fading-tooltip');
        setTimeout(() => {
          link.classList.remove('fading-tooltip');
        }, 500);
      }, 1200);
    });
  });
}

// Centered Menu button logic
const centeredMenuBtn = document.getElementById('centered-menu-btn');
const centeredMenuBtnWrapper = document.querySelector('.centered-menu-btn-wrapper');

function showCenteredMenuBtn(show) {
  if (centeredMenuBtnWrapper) {
    if (show) {
      centeredMenuBtnWrapper.classList.remove('hide');
    } else {
      centeredMenuBtnWrapper.classList.add('hide');
    }
  }
}

// Show/hide centered Menu button based on scroll position and floating button visibility
window.addEventListener('scroll', () => {
  const scrollMenuBtn = document.getElementById('scroll-menu-btn');
  if (window.scrollY > 32 && scrollMenuBtn && getComputedStyle(scrollMenuBtn).display !== 'none') {
    showCenteredMenuBtn(false);
  } else {
    showCenteredMenuBtn(true);
  }
});

// Open overlay menu from centered Menu button
if (centeredMenuBtn) {
  centeredMenuBtn.addEventListener('click', () => {
    if (scrollMenuOverlay) {
      scrollMenuOverlay.classList.add('open');
    }
  });
}

// Animate the white light border on the sign-up box
// No JS needed for the CSS conic-gradient animation, but this is a placeholder for future interactive effects if desired.

// Removed AJAX Formspree handler, revert to default form submission

// Animate the 'Custom Coaching Packages' heading with a pulsing effect
function pulseHeadingLoop() {
  const heading = document.getElementById('packages-heading');
  if (!heading) return;
  heading.classList.add('pulse');
  setTimeout(() => {
    heading.classList.remove('pulse');
    setTimeout(pulseHeadingLoop, 900); // Wait before pulsing again
  }, 400);
}
window.addEventListener('DOMContentLoaded', pulseHeadingLoop);

// Stripe Checkout integration for Buy Now button
const buyNowBtn = document.getElementById('buy-now-btn');
const buyEmail = document.getElementById('buy-email');

if (buyNowBtn && buyEmail) {
  buyNowBtn.addEventListener('click', async function(e) {
    e.preventDefault();
    const email = buyEmail.value.trim();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      buyEmail.style.borderColor = 'red';
      buyEmail.focus();
      return;
    }
    buyNowBtn.disabled = true;
    buyNowBtn.textContent = 'Redirecting...';
    try {
      const response = await fetch('https://discipline-built-28cw-hrm8rs529-davud-bunyatovs-projects.vercel.app/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error: ' + (data.error || 'Could not start checkout.'));
        buyNowBtn.disabled = false;
        buyNowBtn.textContent = 'Buy Now';
      }
    } catch (err) {
      alert('Network error. Please try again.');
      buyNowBtn.disabled = false;
      buyNowBtn.textContent = 'Buy Now';
    }
  });
}