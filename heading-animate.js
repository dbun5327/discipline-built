// Animate each letter of the heading to #7f9feb, and on per-letter hover to #2a4a6a (darker blue)
window.addEventListener('DOMContentLoaded', function() {
  const heading = document.getElementById('animated-heading');
  if (!heading) return;
  const text = heading.textContent;
  heading.innerHTML = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ') {
      heading.innerHTML += ' ';
    } else {
      heading.innerHTML += `<span class="heading-letter" style="color:#7f9feb; transition:color 0.25s;">${char}</span>`;
    }
  }

  // Add per-letter hover effect
  heading.querySelectorAll('.heading-letter').forEach(function(span) {
    span.addEventListener('mouseenter', function() {
      span.style.color = '#2a4a6a'; // darker blue
    });
    span.addEventListener('mouseleave', function() {
      span.style.color = '#7f9feb';
    });
  });
});
