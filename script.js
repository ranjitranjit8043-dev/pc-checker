const gameRequirements = {
  valorant: { minCpu: 4, minGpu: 4, minRam: 8, label: 'Valorant' },
  fortnite: { minCpu: 5, minGpu: 5, minRam: 16, label: 'Fortnite' },
  gta5: { minCpu: 6, minGpu: 6, minRam: 8, label: 'GTA V' },
  apex: { minCpu: 6, minGpu: 6, minRam: 16, label: 'Apex Legends' },
  pubg: { minCpu: 6, minGpu: 6, minRam: 16, label: 'PUBG' },
  warzone: { minCpu: 7, minGpu: 7, minRam: 16, label: 'Call of Duty: Warzone' },
  overwatch2: { minCpu: 5, minGpu: 5, minRam: 8, label: 'Overwatch 2' },
  cyberpunk: { minCpu: 8, minGpu: 8, minRam: 16, label: 'Cyberpunk 2077' },
  hogwarts: { minCpu: 7, minGpu: 7, minRam: 16, label: 'Hogwarts Legacy' },
  alanwake2: { minCpu: 9, minGpu: 9, minRam: 32, label: 'Alan Wake 2' },
  baldursgate3: { minCpu: 8, minGpu: 8, minRam: 16, label: "Baldur's Gate 3" },
  rocketleague: { minCpu: 4, minGpu: 4, minRam: 8, label: 'Rocket League' }
};

const form = document.getElementById('checker-form');
const result = document.getElementById('result');
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  const icon = themeToggle.querySelector('.toggle-icon');
  const text = themeToggle.querySelector('.toggle-text');

  if (theme === 'dark') {
    icon.textContent = '☀️';
    text.textContent = 'Light mode';
  } else {
    icon.textContent = '🌙';
    text.textContent = 'Dark mode';
  }

  localStorage.setItem('game-checker-theme', theme);
}

function getInitialTheme() {
  const saved = localStorage.getItem('game-checker-theme');
  if (saved) return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const game = document.getElementById('game').value;
  const cpu = Number(document.getElementById('cpu').value);
  const gpu = Number(document.getElementById('gpu').value);
  const ram = Number(document.getElementById('ram').value);

  const req = gameRequirements[game];
  const cpuOk = cpu >= req.minCpu;
  const gpuOk = gpu >= req.minGpu;
  const ramOk = ram >= req.minRam;
  const canRun = cpuOk && gpuOk && ramOk;

  let status = '';
  let message = '';

  if (canRun) {
    status = '✅ Likely playable';
    message = `${req.label} should run on your laptop with these specs.`;
  } else {
    status = '⚠️ Probably not enough';
    message = `${req.label} may be too demanding for your current setup.`;
  }

  result.innerHTML = `
    <h2>${status}</h2>
    <p>${message}</p>
    <p><strong>Requirements:</strong> CPU ${req.minCpu}/10, GPU ${req.minGpu}/10, RAM ${req.minRam} GB</p>
    <p><strong>Your specs:</strong> CPU ${cpu}/10, GPU ${gpu}/10, RAM ${ram} GB</p>
  `;
});

themeToggle.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
});

applyTheme(getInitialTheme());
