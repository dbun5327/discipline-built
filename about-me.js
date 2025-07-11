// about-me.js
// JS for About Me (hero-spacer) section only
// Add all About Me/hero-spacer interactivity and logic here

document.addEventListener('DOMContentLoaded', function() {
  // Animate the glow behind the About Me card
  const glow = document.querySelector('.about-me-glow');
  if (glow) {
    let t = 0;
    function animateGlow() {
      t += 0.015;
      // Animate position and brightness for a subtle, organic effect
      const x = 60 + Math.sin(t * 0.7) * 10;
      const y = 40 + Math.cos(t * 0.5) * 8;
      const brightness = 1.15 + Math.sin(t * 0.9) * 0.08;
      glow.style.background = `radial-gradient(circle at ${x}% ${y}%, #6bb6ff55 0%, #b6c7e622 60%, transparent 100%)`;
      glow.style.filter = `blur(60px) brightness(${brightness})`;
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // About Me photo grid interactivity: No fade, just scale/z-index on hover
  // (No JS needed for opacity or pointer-events)

  // Add hover color effect to TikTok and Instagram icons
  const tiktok = document.querySelector('.tiktok-icon svg');
  const insta = document.querySelector('.instagram-icon svg');

  if (tiktok) {
    document.querySelector('.tiktok-icon').addEventListener('mouseenter', function() {
      tiktok.querySelector('circle').setAttribute('fill', '#25F4EE'); // TikTok blue
      tiktok.querySelector('path').setAttribute('fill', '#FE2C55'); // TikTok pink
    });
    document.querySelector('.tiktok-icon').addEventListener('mouseleave', function() {
      tiktok.querySelector('circle').setAttribute('fill', '#000');
      tiktok.querySelector('path').setAttribute('fill', '#fff');
    });
  }

  if (insta) {
    document.querySelector('.instagram-icon').addEventListener('mouseenter', function() {
      insta.querySelector('rect').setAttribute('fill', 'url(#ig-gradient)');
      insta.querySelector('rect').setAttribute('stroke', '#fd1d1d');
      insta.querySelector('circle[fill="#000"]')?.setAttribute('fill', '#fd1d1d');
    });
    document.querySelector('.instagram-icon').addEventListener('mouseleave', function() {
      insta.querySelector('rect').setAttribute('fill', '#fff');
      insta.querySelector('rect').setAttribute('stroke', '#000');
      insta.querySelector('circle[fill="#fd1d1d"]')?.setAttribute('fill', '#000');
    });
  }

  // Animate TikTok and Instagram icons: scale up and color transition on hover

  document.addEventListener('DOMContentLoaded', function() {
    const tiktokIcon = document.querySelector('.tiktok-icon');
    const tiktokSVG = tiktokIcon?.querySelector('svg');
    const instaIcon = document.querySelector('.instagram-icon');
    const instaSVG = instaIcon?.querySelector('svg');

    // Set both icons to the same size via JS for consistency
    [tiktokSVG, instaSVG].forEach(svg => {
      if (svg) {
        svg.setAttribute('width', '74');
        svg.setAttribute('height', '74');
        svg.style.width = '74px';
        svg.style.height = '74px';
        svg.style.transition = 'filter 0.45s cubic-bezier(.4,1.4,.6,1)';
      }
    });
    [tiktokIcon, instaIcon].forEach(icon => {
      if (icon) icon.style.transition = 'transform 0.45s cubic-bezier(.4,1.4,.6,1)';
    });

    // TikTok hover effect
    if (tiktokIcon && tiktokSVG) {
      tiktokIcon.addEventListener('mouseenter', function() {
        tiktokIcon.style.transform = 'scale(1.18)';
        tiktokSVG.querySelector('circle').setAttribute('fill', '#25F4EE');
        tiktokSVG.querySelector('path').setAttribute('fill', '#FE2C55');
      });
      tiktokIcon.addEventListener('mouseleave', function() {
        tiktokIcon.style.transform = 'scale(1)';
        tiktokSVG.querySelector('circle').setAttribute('fill', '#000');
        tiktokSVG.querySelector('path').setAttribute('fill', '#fff');
      });
    }

    // Instagram hover effect (animated gradient)
    if (instaIcon && instaSVG) {
      // Add defs for gradient if not present
      let grad = instaSVG.querySelector('#ig-gradient');
      if (!grad) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        grad.setAttribute('id', 'ig-gradient');
        grad.setAttribute('x1', '0%');
        grad.setAttribute('y1', '0%');
        grad.setAttribute('x2', '100%');
        grad.setAttribute('y2', '100%');
        grad.innerHTML = `
          <stop offset="0%" stop-color="#fd5">
            <animate attributeName="stop-color" values="#fd5;#f58529;#fd5" dur="1.2s" repeatCount="indefinite" />
          </stop>
          <stop offset="50%" stop-color="#ff543e">
            <animate attributeName="stop-color" values="#ff543e;#e1306c;#ff543e" dur="1.2s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stop-color="#c837ab">
            <animate attributeName="stop-color" values="#c837ab;#405de6;#c837ab" dur="1.2s" repeatCount="indefinite" />
          </stop>
        `;
        defs.appendChild(grad);
        instaSVG.insertBefore(defs, instaSVG.firstChild);
      }
      const rect = instaSVG.querySelector('rect');
      const igDot = instaSVG.querySelector('circle[fill="#000"]');
      instaIcon.addEventListener('mouseenter', function() {
        instaIcon.style.transform = 'scale(1.18)';
        rect.setAttribute('fill', 'url(#ig-gradient)');
        rect.setAttribute('stroke', '#c837ab');
        if (igDot) igDot.setAttribute('fill', '#fd5');
      });
      instaIcon.addEventListener('mouseleave', function() {
        instaIcon.style.transform = 'scale(1)';
        rect.setAttribute('fill', '#fff');
        rect.setAttribute('stroke', '#000');
        if (igDot) igDot.setAttribute('fill', '#000');
      });
    }
  });
});
