const urlInput = document.getElementById('urlInput');
const openBtn = document.getElementById('openBtn');
const clearBtn = document.getElementById('clearBtn');
const feedback = document.getElementById('feedback');
const urlCount = document.getElementById('urlCount');
const newWindowToggle = document.getElementById('newWindowToggle');
const dedupeToggle = document.getElementById('dedupeToggle');

function getURLs() {
  let urls = urlInput.value
    .split('\n')
    .map(u => u.trim())
    .filter(u => u.length > 0);

  if (dedupeToggle.checked) {
    urls = [...new Set(urls)];
  }
  return urls;
}

function updateCount() {
  const count = getURLs().length;
  urlCount.textContent = count;
  clearBtn.classList.toggle('visible', urlInput.value.trim().length > 0);
}

function showFeedback(message, type) {
  const icons = {
    error:   '✕',
    success: '✓',
    warning: '⚠',
  };
  feedback.className = `feedback show ${type}`;
  feedback.innerHTML = `<span style="font-size:15px;line-height:1">${icons[type]}</span> ${message}`;
}

urlInput.addEventListener('input', updateCount);

clearBtn.addEventListener('click', () => {
  urlInput.value = '';
  updateCount();
  feedback.className = 'feedback';
});

openBtn.addEventListener('click', async () => {
  feedback.className = 'feedback';

  const raw = getURLs();

  if (raw.length === 0) {
    showFeedback('Please enter at least one URL.', 'error');
    return;
  }

  // Ripple animation
  openBtn.classList.remove('ripple');
  void openBtn.offsetWidth;
  openBtn.classList.add('ripple');
  setTimeout(() => openBtn.classList.remove('ripple'), 500);

  let opened = 0;
  let skipped = 0;

  if (newWindowToggle.checked) {
    const validURLs = [];
    for (let url of raw) {
      try {
        if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
        const validated = new URL(url);
        validURLs.push(validated.href);
        opened++;
      } catch (e) {
        skipped++;
      }
    }
    if (validURLs.length > 0) {
      chrome.windows.create({ url: validURLs });
    }
  } else {
    for (let url of raw) {
      try {
        if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
        const validated = new URL(url);
        chrome.tabs.create({ url: validated.href });
        opened++;
      } catch (e) {
        skipped++;
      }
    }
  }

  if (opened === 0) {
    showFeedback('No valid URLs found. Check your input.', 'error');
  } else if (skipped > 0) {
    showFeedback(`${opened} tab${opened > 1 ? 's' : ''} opened · ${skipped} invalid skipped`, 'warning');
  } else {
    showFeedback(`${opened} tab${opened > 1 ? 's' : ''} opened successfully!`, 'success');
  }
});
