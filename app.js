// Initialize Lucide Icons
lucide.createIcons();

// Mock Data
const playlists = [
  "Morning Devotion", "Praise & Worship", "Hillsong Classics", "Nigerian Gospel",
  "Sunday Vibes", "Quiet Time", "Gospel Anthems", "Afro Gospel"
];

const featuredAlbums = [
  { id: 1, title: "Way Maker", artist: "Sinach", img: "https://ui-avatars.com/api/?name=WM&background=4c1d95&color=fff&size=150" },
  { id: 2, title: "There Is More", artist: "Hillsong Worship", img: "https://ui-avatars.com/api/?name=TM&background=8b5cf6&color=fff&size=150" },
  { id: 3, title: "Olowogbogboro", artist: "Nathaniel Bassey", img: "https://ui-avatars.com/api/?name=OL&background=1e40af&color=fff&size=150" },
  { id: 4, title: "Satisfied", artist: "Mercy Chinwo", img: "https://ui-avatars.com/api/?name=SA&background=9f1239&color=fff&size=150" }
];

const recentlyPlayed = [
  ...featuredAlbums,
  { id: 5, title: "Crossover: Live", artist: "Travis Greene", img: "https://ui-avatars.com/api/?name=TG&background=ea580c&color=fff&size=150" },
  { id: 6, title: "Graves Into Gardens", artist: "Elevation Worship", img: "https://ui-avatars.com/api/?name=GG&background=0284c7&color=fff&size=150" },
  { id: 7, title: "God Will Make A Way", artist: "Don Moen", img: "https://ui-avatars.com/api/?name=DM&background=eab308&color=fff&size=150" },
  { id: 8, title: "Alabaster Box", artist: "CeCe Winans", img: "https://ui-avatars.com/api/?name=CW&background=000&color=fff&size=150" }
];

const queue = [
  {
    id: 1,
    title: "Way Maker - Live",
    artist: "Sinach",
    duration: 125, // seconds mock
    img: "https://ui-avatars.com/api/?name=WM&background=8b5cf6&color=fff&size=150",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    lyrics: "You are here, moving in our midst<br/>I worship You, I worship You<br/><br/>You are here, working in this place<br/>I worship You, I worship You<br/><br/>(Chorus)<br/>Way Maker, Miracle Worker<br/>Promise Keeper, Light in the darkness<br/>My God, that is who You are!"
  },
  {
    id: 2,
    title: "What A Beautiful Name",
    artist: "Hillsong Worship",
    duration: 180,
    img: "https://ui-avatars.com/api/?name=WB&background=312e81&color=fff&size=150",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    lyrics: "You were the Word at the beginning<br/>One with God the Lord Most High<br/>Your hidden glory in creation<br/>Now revealed in You our Christ<br/><br/>(Chorus)<br/>What a beautiful Name it is<br/>What a beautiful Name it is<br/>The Name of Jesus Christ my King!"
  },
  {
    id: 3,
    title: "Imela",
    artist: "Nathaniel Bassey",
    duration: 140,
    img: "https://ui-avatars.com/api/?name=IM&background=14532d&color=fff&size=150",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    lyrics: "When I think upon Your goodness<br/>And Your faithfulness each day<br/>I'm convinced it's not because I am worthy<br/>To receive the kind of love that You give<br/><br/>But I'm grateful for Your mercy<br/>And I'm grateful for Your grace<br/>And because of how You've poured out Yourself<br/>I have come to sing this song out in praise<br/><br/>Imela, Imela<br/>Okaka, Onyekeruwa!"
  }
];

// DOM Elements
const sidebarPlaylistsEl = document.getElementById('sidebar-playlists');
const featuredGridEl = document.getElementById('featured-grid');
const recentlyPlayedEl = document.getElementById('recently-played');

const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const audioPlayer = document.getElementById('audio-player');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const timeCurrentEl = document.getElementById('time-current');
const timeTotalEl = document.getElementById('time-total');

const currentTitleEl = document.getElementById('current-title');
const currentArtistEl = document.getElementById('current-artist');
const currentAlbumArtEl = document.getElementById('current-album-art');
const greetingEl = document.getElementById('greeting');
const btnFav = document.getElementById('btn-fav');
const btnRepeat = document.getElementById('btn-repeat');
const btnSpeed = document.getElementById('btn-speed');

const btnLyrics = document.getElementById('btn-lyrics');
const btnCloseLyrics = document.getElementById('btn-close-lyrics');
const lyricsPanel = document.getElementById('lyrics-panel');
const lyricsContent = document.getElementById('lyrics-content');

const volumeContainer = document.getElementById('volume-container');
const volumeBar = document.getElementById('volume-bar');

// Application State
let currentTrackIndex = 0;
let isPlaying = false;
let isRepeat = false;
let playbackSpeeds = [1, 1.25, 1.5, 2];
let speedIndex = 0;

let isLyricsOpen = false;
let savedVolume = localStorage.getItem('playerVolume') ? parseFloat(localStorage.getItem('playerVolume')) : 1.0;

// Initialization
function init() {
  populateSidebar();
  populateMainContent();
  setGreeting();
  
  // Set saved volume
  audioPlayer.volume = savedVolume;
  volumeBar.style.width = `${Math.round(savedVolume * 100)}%`;
  
  // Setup MediaSession for hardware controls
  setupMediaSession();
  
  loadTrack(currentTrackIndex);
  
  // Re-initialize Lucide Icons for dynamic content
  lucide.createIcons();

  // Attempt auto-play on load (some browsers block this without interaction)
  setTimeout(() => {
    audioPlayer.play().then(() => {
      togglePlay(true);
    }).catch(e => console.log('Autoplay blocked by browser until user touches page.'));
  }, 200);
}

function setupMediaSession() {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => togglePlay(true));
    navigator.mediaSession.setActionHandler('pause', () => togglePlay(false));
    navigator.mediaSession.setActionHandler('previoustrack', playPrev);
    navigator.mediaSession.setActionHandler('nexttrack', playNext);
  }
}

function updateMediaSessionMetadata(track) {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: 'Gospel Collection',
      artwork: [ { src: track.img.replace('150', '512'), sizes: '512x512', type: 'image/png' } ]
    });
  }
}

// UI Population
function populateSidebar() {
  sidebarPlaylistsEl.innerHTML = playlists.map(p => `
    <a href="#" class="block px-2 py-1.5 text-sm text-gray-400 hover:text-white truncate transition">
      ${p}
    </a>
  `).join('');
}

function populateMainContent() {
  featuredGridEl.innerHTML = featuredAlbums.map(album => `
    <div class="bg-white/5 hover:bg-white/20 transition rounded overflow-hidden flex items-center group cursor-pointer h-16 shadow">
      <img src="${album.img}" class="h-16 w-16" alt="${album.title}" />
      <span class="font-bold text-sm px-4 truncate">${album.title}</span>
      <button class="ml-auto mr-4 bg-brand text-black rounded-full p-3 opacity-0 group-hover:opacity-100 hover:scale-105 transition shadow-lg shrink-0" onclick="playMockTrack(event)">
        <i data-lucide="play" class="w-4 h-4 fill-current"></i>
      </button>
    </div>
  `).join('');

  recentlyPlayedEl.innerHTML = recentlyPlayed.map(item => `
    <div class="bg-surface-elevated hover:bg-surface-highlight transition p-4 rounded-md cursor-pointer group flex flex-col gap-3">
      <div class="relative w-full aspect-square bg-surface-highlight rounded shadow-md overflow-hidden">
        <img src="${item.img}" class="w-full h-full object-cover" alt="${item.title}" />
        <button class="absolute bottom-2 right-2 bg-brand text-black rounded-full p-3 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 hover:scale-105 transition-all shadow-lg duration-300" onclick="playMockTrack(event)">
          <i data-lucide="play" class="w-4 h-4 fill-current"></i>
        </button>
      </div>
      <div class="flex flex-col">
        <span class="font-bold text-sm truncate">${item.title}</span>
        <span class="text-xs text-gray-400 truncate mt-1">${item.artist}</span>
      </div>
    </div>
  `).join('');
}

function setGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  greetingEl.innerText = greeting;
}

// Mock play random audio for UX interaction on cards
function playMockTrack(e) {
  e.stopPropagation();
  const randomTrack = Math.floor(Math.random() * queue.length);
  currentTrackIndex = randomTrack;
  loadTrack(currentTrackIndex);
  togglePlay(true);
}

// Audio Player Logic
function loadTrack(index) {
  const track = queue[index];
  audioPlayer.src = track.url;
  currentTitleEl.innerText = track.title;
  currentArtistEl.innerText = track.artist;
  currentAlbumArtEl.src = track.img;
  
  // Inject Lyrics
  lyricsContent.innerHTML = track.lyrics || "No lyrics available for this track.";
  
  // Update Media Session native OS player
  updateMediaSessionMetadata(track);
  
  // Set total time based on array or metadata
  timeTotalEl.innerText = formatTime(track.duration);
  progressBar.style.width = '0%';
  timeCurrentEl.innerText = '0:00';
}

function togglePlay(forcePlay) {
  if (typeof forcePlay === 'boolean') {
    isPlaying = forcePlay;
  } else {
    isPlaying = !isPlaying;
  }

  if (isPlaying) {
    audioPlayer.play();
    btnPlay.innerHTML = '<i data-lucide="pause" class="w-5 h-5 fill-current ml-0"></i>';
  } else {
    audioPlayer.pause();
    btnPlay.innerHTML = '<i data-lucide="play" class="w-5 h-5 fill-current ml-0.5"></i>';
  }
  lucide.createIcons();
}

function playNext() {
  currentTrackIndex = (currentTrackIndex + 1) % queue.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) togglePlay(true);
}

function playPrev() {
  // If > 3 seconds, just restart song
  if (audioPlayer.currentTime > 3) {
    audioPlayer.currentTime = 0;
  } else {
    currentTrackIndex = currentTrackIndex === 0 ? queue.length - 1 : currentTrackIndex - 1;
    loadTrack(currentTrackIndex);
  }
  if (isPlaying) togglePlay(true);
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event Listeners
btnPlay.addEventListener('click', () => togglePlay());
btnNext.addEventListener('click', playNext);
btnPrev.addEventListener('click', playPrev);

btnFav.addEventListener('click', () => {
  btnFav.classList.toggle('text-brand');
  const icon = btnFav.querySelector('i');
  if (btnFav.classList.contains('text-brand')) {
    icon.classList.add('fill-brand');
  } else {
    icon.classList.remove('fill-brand');
  }
});

btnRepeat.addEventListener('click', () => {
  isRepeat = !isRepeat;
  audioPlayer.loop = isRepeat;
  btnRepeat.classList.toggle('text-brand', isRepeat);
});

btnSpeed.addEventListener('click', () => {
  speedIndex = (speedIndex + 1) % playbackSpeeds.length;
  const speed = playbackSpeeds[speedIndex];
  audioPlayer.playbackRate = speed;
  btnSpeed.innerText = speed + 'x';
});

audioPlayer.addEventListener('timeupdate', () => {
  const { currentTime, duration } = audioPlayer;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  timeCurrentEl.innerText = formatTime(currentTime);
  // Optional: update total time once audio is loaded if relying on real duration
  if (duration && !isNaN(duration)) {
    timeTotalEl.innerText = formatTime(duration);
  }
});

audioPlayer.addEventListener('ended', playNext);

progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;
  
  if (duration && !isNaN(duration)) {
    audioPlayer.currentTime = (clickX / width) * duration;
  }
});

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    togglePlay();
  }
});

// Lyrics Event Listeners
function updateLyricsPanelUI() {
  if(isLyricsOpen) {
    lyricsPanel.classList.remove('hidden');
    lyricsPanel.classList.add('flex');
    btnLyrics.classList.add('text-brand');
  } else {
    lyricsPanel.classList.add('hidden');
    lyricsPanel.classList.remove('flex');
    btnLyrics.classList.remove('text-brand');
  }
}

btnLyrics.addEventListener('click', () => {
  isLyricsOpen = !isLyricsOpen;
  updateLyricsPanelUI();
});

btnCloseLyrics.addEventListener('click', () => {
  isLyricsOpen = false;
  updateLyricsPanelUI();
});

// Interactive Volume Slider Logic
let isDraggingVolume = false;

function updateVolume(e) {
  const width = volumeContainer.clientWidth;
  let clickX = e.offsetX;
  
  if(e.type === 'mousemove' && e.target !== volumeContainer) {
    const rect = volumeContainer.getBoundingClientRect();
    clickX = e.clientX - rect.left;
  }
  
  clickX = Math.max(0, Math.min(clickX, width)); 
  const newVol = clickX / width;
  
  audioPlayer.volume = newVol;
  volumeBar.style.width = `${newVol * 100}%`;
  localStorage.setItem('playerVolume', newVol);
}

volumeContainer.addEventListener('mousedown', (e) => {
  isDraggingVolume = true;
  updateVolume(e);
});

window.addEventListener('mousemove', (e) => {
  if (isDraggingVolume) updateVolume(e);
});

window.addEventListener('mouseup', () => {
  isDraggingVolume = false;
});

// Start app
init();
