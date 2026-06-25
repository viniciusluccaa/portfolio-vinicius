function loadImg(event, el) {
  const file = event.target.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = e => {
    el.innerHTML = '';
    const img = document.createElement('img');
    img.src = e.target.result;
    el.appendChild(img);
    el.style.cssText = 'border:none;background:transparent;cursor:default';
  };
  r.readAsDataURL(file);
}
function loadImgChapter(event, el) {
  const file = event.target.files[0]; if (!file) return;
  const r = new FileReader();
  r.onload = e => {
    el.innerHTML = '';
    const img = document.createElement('img');
    img.src = e.target.result;
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;opacity:0.22;';
    el.appendChild(img);
    el.style.border = 'none';
  };
  r.readAsDataURL(file);
}
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.fu').forEach(el => obs.observe(el));

// Leads chart — months ago/2025 to mar/2026
const meses = ['Ago','Set','Out','Nov','Dez','Jan','Fev','Mar'];
const perdidos = [59, 59, 57, 42, 32, 68, 66, 85];
const abertos  = [5,  5,  6,  4,  3,  14, 10, 13];
const ganhos   = [2,  5,  1,  4,  3,  7,  10, 2 ];

const ctx = document.getElementById('leadsChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: meses,
    datasets: [
      {
        label: 'Perdido',
        data: perdidos,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239,68,68,0.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#EF4444',
        pointRadius: 5, pointHoverRadius: 7,
        tension: 0.35, fill: false
      },
      {
        label: 'Aberto',
        data: abertos,
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245,158,11,0.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#F59E0B',
        pointRadius: 5, pointHoverRadius: 7,
        tension: 0.35, fill: false
      },
      {
        label: 'Ganho',
        data: ganhos,
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34,197,94,0.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#22C55E',
        pointRadius: 5, pointHoverRadius: 7,
        tension: 0.35, fill: false
      }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(8,24,41,0.95)',
        borderColor: 'rgba(0,212,245,0.3)', borderWidth: 1,
        titleColor: '#00D4F5', titleFont: { family: "'Plus Jakarta Sans'", weight: '700', size: 11 },
        bodyColor: 'rgba(255,255,255,0.75)', bodyFont: { family: "'Plus Jakarta Sans'", size: 12 },
        padding: 14, cornerRadius: 2
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
        ticks: { color: 'rgba(255,255,255,0.4)', font: { family: "'Plus Jakarta Sans'", size: 11, weight: '600' }, letterSpacing: '0.1em' }
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
        ticks: { color: 'rgba(255,255,255,0.3)', font: { family: "'Plus Jakarta Sans'", size: 11 } },
        beginAtZero: true
      }
    }
  }
});