// cursor glow
const glow = document.getElementById('cursorGlow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// spotlight on project cards
function spot(e, el) {
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  el.style.setProperty('--my', (e.clientY - r.top) + 'px');
}

// scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// typed terminal effect (used on homepage only)
function runTerminal(lines) {
  const container = document.getElementById('typedCode');
  if (!container) return;
  let li = 0;
  function typeLine() {
    if (li >= lines.length) {
      const c = document.createElement('span');
      c.className = 'caret';
      container.appendChild(c);
      return;
    }
    const div = document.createElement('div');
    container.appendChild(div);
    const text = lines[li];
    let i = 0;
    const speed = 14;
    function step() {
      i += 3;
      div.innerHTML = text.slice(0, i);
      if (i < text.length) {
        setTimeout(step, speed);
      } else {
        div.innerHTML = text;
        li++;
        setTimeout(typeLine, 120);
      }
    }
    step();
  }
  setTimeout(typeLine, 900);
}
