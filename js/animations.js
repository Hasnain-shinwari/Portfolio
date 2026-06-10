/**
 * Cybersecurity Portfolio Scroll Reveals & Cyber Interactive Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll-Triggered Reveal Animations using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .fade-in-up');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Once revealed, we can unobserve if we want it to stay permanent
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // Viewport
    rootMargin: '0px 0px -80px 0px', // Trigger slightly before entering fully
    threshold: 0.1 // 10% visible
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Custom Spotlight Cursor Glow (Interactive Background Element)
  const cursorGlow = document.getElementById('cursor-glow');
  
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) { // Only run on devices with a mouse
    window.addEventListener('mousemove', (e) => {
      // Use requestAnimationFrame to optimize mouse tracking performance
      window.requestAnimationFrame(() => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
      });
    });

    // Make glow expand slightly on clicking
    window.addEventListener('mousedown', () => {
      cursorGlow.style.width = '450px';
      cursorGlow.style.height = '450px';
    });

    window.addEventListener('mouseup', () => {
      cursorGlow.style.width = '400px';
      cursorGlow.style.height = '400px';
    });
  } else if (cursorGlow) {
    // Hide glow on mobile touch devices
    cursorGlow.style.display = 'none';
  }

  // 3. Holographic/Dynamic Glow Border on Glassmorphic Cards
  const cards = document.querySelectorAll('.cyber-card, .stat-item');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse x position relative to card
      const y = e.clientY - rect.top;  // Mouse y position relative to card

      // Assign mouse position as CSS custom variables to update gradient borders
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 4. Glitch Effect Trigger for Main Headers
  const glitchHeaders = document.querySelectorAll('.section-title');
  glitchHeaders.forEach(header => {
    // Add random glitch intervals on hover
    header.addEventListener('mouseenter', () => {
      header.classList.add('glitching');
      setTimeout(() => {
        header.classList.remove('glitching');
      }, 1000);
    });
  });
});
