document.addEventListener('DOMContentLoaded', function () {
  // Auto-fill copyright years on all pages
  const years = [ 'year', 'year-2', 'year-3', 'year-4', 'year-5' ];
  const y = new Date().getFullYear();
  years.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });

  // Navigation toggles (for each page we have unique IDs to avoid collisions)
  const toggles = [
    { btn: 'nav-toggle', nav: 'main-nav' },
    { btn: 'nav-toggle-2', nav: 'main-nav-2' },
    { btn: 'nav-toggle-3', nav: 'main-nav-3' },
    { btn: 'nav-toggle-4', nav: 'main-nav-4' },
    { btn: 'nav-toggle-5', nav: 'main-nav-5' }
  ];
  toggles.forEach(pair => {
    const btn = document.getElementById(pair.btn);
    const nav = document.getElementById(pair.nav);
    if (btn && nav) {
      btn.addEventListener('click', () => {
        const shown = nav.style.display === 'flex' || nav.style.display === 'block';
        nav.style.display = shown ? 'none' : 'flex';
        if (!shown) nav.style.flexDirection = 'column';
      });

      // close nav if clicked outside
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && e.target !== btn && window.innerWidth <= 800) {
          nav.style.display = 'none';
        }
      });
    }
  });

  // Quiz logic (on modern.html)
  const checkBtn = document.getElementById('check-quiz');
  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      const answers = { q1: 'b', q2: 'a', q3: 'b', q4: 'b' };
      let score = 0;
      let total = Object.keys(answers).length;
      let missed = [];
      Object.keys(answers).forEach(q => {
        const radios = document.getElementsByName(q);
        let selected = null;
        for (let r of radios) if (r.checked) selected = r.value;
        if (selected === answers[q]) score++;
        else missed.push(q);
      });

      const result = document.getElementById('quiz-result');
      if (!result) return;
      result.textContent = `You scored ${score} / ${total}.`;
      if (missed.length > 0) {
        const hints = {
          q1: 'Parang is associated with royalty and resilience.',
          q2: 'Truntum symbolizes growing love.',
          q3: 'Batik tulis is the hand-drawn technique using a canting.',
          q4: 'Mega Mendung originates from coastal styles like Pekalongan/Cirebon.'
        };
        const hintList = missed.map(m => hints[m]).join(' ');
        const hintNode = document.createElement('p');
        hintNode.style.marginTop = '0.5rem';
        hintNode.style.fontSize = '.95rem';
        hintNode.style.color = '#444';
        hintNode.textContent = hintList;
        // remove old hint if exists
        const old = document.querySelector('#quiz-result p');
        if (old) old.remove();
        result.appendChild(hintNode);
      }
    });
  }
});
