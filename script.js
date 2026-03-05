// ================================
//  CYBER SECURITY PORTFOLIO
//  script.js
// ================================

/* ---- Utility: set active nav link ---- */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

/* ---- Navbar shrink on scroll ---- */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shrunk', window.scrollY > 40);
  });
}

/* ---- Hamburger ---- */
function initHamburger() {
  const btn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!btn || !mobileNav) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
}

/* ---- Page fade-in ---- */
function initPageTransition() {
  document.body.classList.add('page-transition');
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease';
      setTimeout(() => { window.location.href = href; }, 300);
    });
  });
}

/* ==============================
   LOADING SCREEN (index only)
============================== */
function initLoadingScreen() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  const lines = [
    'Initializing Security Interface...',
    'Loading Cyber Modules...',
    'Authenticating User...',
    'Scanning System...',
    'Access Granted.',
    'Loading Portfolio Dashboard...',
  ];

  const consoleEl = document.querySelector('.loading-console');
  const bar = document.querySelector('.loading-progress-bar');
  const status = document.querySelector('.loading-status');

  let i = 0;
  function nextLine() {
    if (i >= lines.length) {
      setTimeout(() => {
        screen.style.opacity = '0';
        screen.style.transition = 'opacity 0.6s ease';
        setTimeout(() => { screen.style.display = 'none'; }, 600);
      }, 400);
      return;
    }
    const p = document.createElement('p');
    p.className = 'console-line';
    p.textContent = '> ' + lines[i];
    p.style.animationDelay = '0s';
    consoleEl.appendChild(p);

    const pct = Math.round(((i + 1) / lines.length) * 100);
    if (bar) bar.style.width = pct + '%';
    if (status) status.textContent = pct + '% complete';

    i++;
    setTimeout(nextLine, 420);
  }
  nextLine();
}

/* ==============================
   MATRIX RAIN
============================== */
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコ';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(3, 11, 15, 0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px Share Tech Mono, monospace';

    columns = Math.floor(canvas.width / fontSize);
    if (drops.length < columns) {
      drops = drops.concat(Array(columns - drops.length).fill(1));
    }

    for (let i = 0; i < columns; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = i % 5 === 0 ? '#00e5ff' : '#00ff88';
      ctx.globalAlpha = Math.random() * 0.7 + 0.3;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      ctx.globalAlpha = 1;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 50);
}

/* ==============================
   TYPING ANIMATION
============================== */
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Junior Cyber Security',
    'Penetration Testing Enthusiast',
    'CTF Player',
    'Network Security Learner',
  ];

  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.substring(0, ci + 1);
      ci++;
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = phrase.substring(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 60 : 80);
  }
  type();
}

/* ==============================
   TERMINAL SIMULATION
============================== */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const body  = document.getElementById('terminal-body');
  if (!input || !body) return;

  const commands = {
    help: () => [
      '<span class="t-comment">Available commands:</span>',
      '<span class="t-out">  about    — who am I</span>',
      '<span class="t-out">  skills   — my tech stack</span>',
      '<span class="t-out">  projects — what I built</span>',
      '<span class="t-out">  contact  — how to reach me</span>',
      '<span class="t-out">  clear    — clear terminal</span>',
    ],
    whoami: () => ['<span class="t-out">bayu_aji_prasetya</span>'],
    about: () => [
      '<span class="t-out">Name   : Bayu Aji Prasetya</span>',
      '<span class="t-out">School : SMK Negeri 1 Banyumas (TKJ)</span>',
      '<span class="t-out">Focus  : Penetration Testing, Network Security</span>',
      '<span class="t-out">Status : CTF Player | Cyber Security Enthusiast</span>',
    ],
    skills: () => [
      '<span class="t-out">OS         : Linux</span>',
      '<span class="t-out">Networking : TCP/IP, Routing, Mikrotik</span>',
      '<span class="t-out">Tools      : Nmap, Wireshark, Nikto</span>',
      '<span class="t-out">Languages  : Python (Basic), Bash</span>',
      '<span class="t-out">Cloud      : AWS Basic</span>',
    ],
    projects: () => [
      '<span class="t-out">[1] IoT Smart Pet Feeder — Telegram Bot integration</span>',
      '<span class="t-out">[2] Linux Hardening Lab — Virtual security lab</span>',
      '<span class="t-out">[3] Web PenTest — Found DB leak in school website</span>',
    ],
    contact: () => [
      '<span class="t-out">GitHub   : github.com/bayyslowly</span>',
      '<span class="t-out">LinkedIn : linkedin.com/in/bayu-aji-prasetya-9632b5362</span>',
    ],
    clear: () => { body.innerHTML = ''; return null; },
  };

  function addLine(html) {
    const p = document.createElement('p');
    p.className = 't-line';
    p.innerHTML = html;
    body.appendChild(p);
    body.scrollTop = body.scrollHeight;
  }

  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim().toLowerCase();
    input.value = '';

    addLine(`<span class="t-prompt">root@bayu-sec:~$ </span><span class="t-cmd">${cmd}</span>`);

    if (!cmd) return;

    if (commands[cmd]) {
      const out = commands[cmd]();
      if (out) out.forEach(line => addLine(line));
    } else {
      addLine(`<span class="t-err">command not found: ${cmd}. Type 'help'</span>`);
    }
  });

  // Initial welcome
  setTimeout(() => {
    ['<span class="t-comment">// Cyber Security Terminal v1.0</span>',
     '<span class="t-comment">// Type \'help\' for commands</span>',
    ].forEach(l => addLine(l));
  }, 500);
}

/* ==============================
   SCANNER ANIMATION
============================== */
function initScanner() {
  const wrap = document.querySelector('.scanner-body');
  if (!wrap) return;

  const items = [
    { icon: 'check', text: 'Checking open ports...' },
    { icon: 'check', text: 'Detecting services...' },
    { icon: 'check', text: 'Analyzing vulnerabilities...' },
    { icon: 'warn',  text: 'Minor risk detected: port 8080' },
    { icon: 'check', text: 'Running CVE database lookup...' },
    { icon: 'info',  text: 'Firewall: Active' },
    { icon: 'check', text: 'Security assessment complete.' },
  ];

  function renderItems() {
    wrap.innerHTML = `<p style="color:var(--cyan);margin-bottom:0.75rem;">Scanning target: <strong>system.local</strong></p>`;
    const div = document.createElement('div');

    items.forEach((item, i) => {
      const el = document.createElement('div');
      el.className = 'scan-item';
      el.style.animationDelay = (i * 0.5) + 's';
      el.innerHTML = `<span class="${item.icon}">${item.icon === 'check' ? '[✔]' : item.icon === 'warn' ? '[⚠]' : '[ℹ]'}</span><span>${item.text}</span>`;
      div.appendChild(el);
    });

    wrap.appendChild(div);

    setTimeout(() => {
      const done = document.createElement('p');
      done.style.cssText = 'margin-top:0.75rem;color:var(--green);font-weight:700;';
      done.textContent = '> All checks complete. System secure.';
      wrap.appendChild(done);

      // loop
      setTimeout(renderItems, 5000);
    }, items.length * 500 + 800);
  }

  renderItems();
}

/* ==============================
   NETWORK MAP
============================== */
function initNetworkMap() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const nodes = [
    { id: 'Internet',  x: 0.5,  y: 0.1,  color: '#ff3355' },
    { id: 'Firewall',  x: 0.5,  y: 0.32, color: '#ffe700' },
    { id: 'Router',    x: 0.5,  y: 0.55, color: '#00e5ff' },
    { id: 'Server',    x: 0.2,  y: 0.78, color: '#00ff88' },
    { id: 'Database',  x: 0.5,  y: 0.85, color: '#00ff88' },
    { id: 'Client',    x: 0.8,  y: 0.78, color: '#00ff88' },
  ];

  const edges = [
    [0,1],[1,2],[2,3],[2,4],[2,5],
  ];

  let packets = [];
  let t = 0;

  function spawnPacket() {
    const edge = edges[Math.floor(Math.random() * edges.length)];
    const dir = Math.random() > 0.5 ? 1 : -1;
    packets.push({ edge, progress: dir === 1 ? 0 : 1, dir, speed: 0.008 + Math.random() * 0.008, color: Math.random() > 0.5 ? '#00ff88' : '#00e5ff' });
  }

  setInterval(spawnPacket, 600);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const W = canvas.width, H = canvas.height;

    // edges
    edges.forEach(([a, b]) => {
      const na = nodes[a], nb = nodes[b];
      ctx.beginPath();
      ctx.moveTo(na.x * W, na.y * H);
      ctx.lineTo(nb.x * W, nb.y * H);
      ctx.strokeStyle = 'rgba(0,255,136,0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // packets
    packets = packets.filter(p => p.progress >= 0 && p.progress <= 1);
    packets.forEach(p => {
      p.progress += p.speed * p.dir;
      const [a, b] = p.edge;
      const na = nodes[a], nb = nodes[b];
      const x = (na.x + (nb.x - na.x) * p.progress) * W;
      const y = (na.y + (nb.y - na.y) * p.progress) * H;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // nodes
    nodes.forEach(n => {
      const x = n.x * W, y = n.y * H;

      // glow ring
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = n.color + '33';
      ctx.lineWidth = 1;
      ctx.stroke();

      // node
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '22';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = n.color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = n.color;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // label
      ctx.font = '11px Share Tech Mono, monospace';
      ctx.fillStyle = '#c8ffe8';
      ctx.textAlign = 'center';
      ctx.fillText(n.id, x, y + 26);
    });

    t++;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ==============================
   SKILL BARS ANIMATION
============================== */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = el.dataset.width || '0%';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
}

/* ==============================
   CYBER TICKER
============================== */
function initTicker() {
  const ticker = document.querySelector('.ticker-inner');
  if (!ticker) return;
  // already in HTML
}

/* ==============================
   INIT
============================== */
document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  setActiveNav();
  initNavbar();
  initHamburger();
  initLoadingScreen();
  initMatrixRain();
  initTyping();
  initTerminal();
  initScanner();
  initNetworkMap();
  initSkillBars();
  initTicker();
});
