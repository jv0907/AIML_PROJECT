// Simple SPA navigation
const panels = document.querySelectorAll('.panel');
const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    panels.forEach((p) => p.classList.remove('active'));
    document.querySelector(target).classList.add('active');
  });
});

// Mood suggestions mapping
const moodSuggestions = {
  happy: [
    'Capture this feeling with a quick gratitude note.',
    'Share a positive message with a friend.',
    'Channel energy into a short walk or stretch.'
  ],
  neutral: [
    'Try 4-7-8 breathing for 2 minutes to reset.',
    'Listen to soft music or a nature soundscape.',
    'Write one intention for the next hour.'
  ],
  surprised: [
    'Pause and breathe; note what surprised you.',
    'Use curiosity—what can you learn from this?',
    'Ground yourself: look around and name 5 things.'
  ],
  angry: [
    'Do 10 slow breaths; relax shoulders and jaw.',
    'Write a reframing: what’s in your control?',
    'Take a quick break and walk for 3 minutes.'
  ],
  fearful: [
    'Try a calming visualization of a safe place.',
    'Remind yourself of one past challenge you overcame.',
    'Call or message someone you trust.'
  ],
  disgusted: [
    'Note the trigger and one constructive response.',
    'Change context: hydrate and step outside briefly.',
    'Journal how you’d advise a friend here.'
  ],
  sad: [
    'Name the feeling and its cause—validate yourself.',
    'Play comforting music and do gentle stretches.',
    'Write one kind thing to do for yourself today.'
  ]
};

// Face detection and mood estimation
const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const statusEl = document.getElementById('status');
const moodEl = document.getElementById('mood');
const suggestionsEl = document.getElementById('suggestions-list');

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => resolve();
  });
}

async function tryLoadModelsFrom(base) {
  await faceapi.nets.tinyFaceDetector.loadFromUri(base);
  await faceapi.nets.faceExpressionNet.loadFromUri(base);
}

async function loadModels() {
  const candidates = [
    // Local folder (for offline usage if models are placed under smart-mood/models)
    '/models/',
    // Original CDN
    'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/',
    // Alternative CDN mirrors
    'https://unpkg.com/face-api.js@0.22.2/weights/',
    // Maintained fork hosting models
    'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model/',
    'https://unpkg.com/@vladmandic/face-api@1.7.12/model/'
  ];

  let lastError = null;
  for (const base of candidates) {
    try {
      statusEl.textContent = `Loading models from: ${base}`;
      await tryLoadModelsFrom(base);
      statusEl.textContent = 'Models loaded.';
      return;
    } catch (e) {
      lastError = e;
      console.warn('Model load failed from', base, e);
    }
  }
  throw lastError || new Error('Model load failed for all sources');
}

function bestExpression(expressions) {
  if (!expressions) return 'neutral';
  let best = 'neutral';
  let score = -Infinity;
  Object.entries(expressions).forEach(([k, v]) => {
    if (v > score) { score = v; best = k; }
  });
  return best;
}

async function startDetection() {
  statusEl.textContent = 'Initializing camera...';
  try {
    await setupCamera();
  } catch (e) {
    statusEl.textContent = 'Camera access denied. Use Journal tab for text sentiment.';
    return;
  }
  statusEl.textContent = 'Loading models...';
  try {
    await loadModels();
  } catch (e) {
    statusEl.innerHTML = 'Model load failed across sources.<br>1) Check internet access and refresh.<br>2) Or download models to <code>smart-mood/models</code> and reload.';
    return;
  }
  statusEl.textContent = 'Detecting...';
  overlay.width = video.videoWidth;
  overlay.height = video.videoHeight;
  const ctx = overlay.getContext('2d');

  async function tick() {
    try {
      const result = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.4 }))
        .withFaceExpressions();
      ctx.clearRect(0, 0, overlay.width, overlay.height);
      if (result) {
        const { x, y, width, height } = result.detection.box;
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        const mood = bestExpression(result.expressions);
        moodEl.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
        renderSuggestions(mood);
      } else {
        moodEl.textContent = 'No face detected';
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(tick, 600);
    }
  }
  tick();
}

function renderSuggestions(mood) {
  const items = moodSuggestions[mood] || moodSuggestions['neutral'];
  suggestionsEl.innerHTML = '';
  items.forEach((s) => {
    const li = document.createElement('li');
    li.textContent = s;
    suggestionsEl.appendChild(li);
  });
}

// Breathing module: 4-7-8 cycle
const circle = document.getElementById('breathing-circle');
const startBreathingBtn = document.getElementById('start-breathing');
const stopBreathingBtn = document.getElementById('stop-breathing');
const breathingStatus = document.getElementById('breathing-status');
let breathingTimer = null;

function runBreathingCycle() {
  circle.className = 'breathing-circle inhale';
  breathingStatus.textContent = 'Inhale (4s)';
  setTimeout(() => {
    circle.className = 'breathing-circle hold';
    breathingStatus.textContent = 'Hold (7s)';
    setTimeout(() => {
      circle.className = 'breathing-circle exhale';
      breathingStatus.textContent = 'Exhale (8s)';
    }, 7000);
  }, 4000);
}

startBreathingBtn.addEventListener('click', () => {
  if (breathingTimer) return;
  runBreathingCycle();
  breathingTimer = setInterval(runBreathingCycle, 4000 + 7000 + 8000);
});

stopBreathingBtn.addEventListener('click', () => {
  clearInterval(breathingTimer);
  breathingTimer = null;
  circle.className = 'breathing-circle';
  breathingStatus.textContent = 'Press Start to begin 4-7-8 breathing.';
});

// Journal sentiment analysis (naive lexicon)
const analyzeBtn = document.getElementById('analyze-text');
const journalText = document.getElementById('journal-text');
const journalSentiment = document.getElementById('journal-sentiment');
const journalSuggestions = document.getElementById('journal-suggestions');

const posWords = ['happy','joy','glad','good','great','excellent','love','excited','optimistic','calm','peace','hope','proud'];
const negWords = ['sad','angry','mad','bad','terrible','hate','upset','anxious','worried','fear','tired','lonely','disappointed'];

function simpleSentiment(text) {
  const tokens = text.toLowerCase().match(/[a-z']+/g) || [];
  let score = 0;
  tokens.forEach((t) => {
    if (posWords.includes(t)) score += 1;
    if (negWords.includes(t)) score -= 1;
  });
  return score;
}

function sentimentToMood(score) {
  if (score >= 2) return 'happy';
  if (score <= -2) return 'sad';
  return score > 0 ? 'neutral' : 'neutral';
}

analyzeBtn.addEventListener('click', () => {
  const text = journalText.value.trim();
  if (!text) {
    journalSentiment.textContent = 'Sentiment: N/A';
    journalSuggestions.innerHTML = '';
    return;
  }
  const score = simpleSentiment(text);
  const mood = sentimentToMood(score);
  const label = score > 0 ? `Positive (${score})` : score < 0 ? `Negative (${score})` : 'Neutral (0)';
  journalSentiment.textContent = `Sentiment: ${label}`;
  journalSuggestions.innerHTML = '';
  (moodSuggestions[mood] || moodSuggestions['neutral']).forEach((s) => {
    const li = document.createElement('li');
    li.textContent = s;
    journalSuggestions.appendChild(li);
  });
  try {
    const logs = JSON.parse(localStorage.getItem('journalLogs') || '[]');
    logs.push({ ts: Date.now(), text, score });
    localStorage.setItem('journalLogs', JSON.stringify(logs));
  } catch (e) {}
});

// Start detector when its panel becomes active initially
startDetection();