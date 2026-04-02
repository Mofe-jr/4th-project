// Initialize Lucide Icons
lucide.createIcons();

// Mock Data
const playlists = [
  "Daily Mix 1", "Discover Weekly", "Release Radar", "Synthwave 2026",
  "Chill Lofi", "Deep Focus", "Rock Classics", "Coding Mode"
];

const featuredAlbums = [
  { id: 1, title: "Midnight Memories", artist: "The Midnight", img: "https://ui-avatars.com/api/?name=MM&background=4c1d95&color=fff&size=150" },
  { id: 2, title: "Neon Nights", artist: "FM-84", img: "https://ui-avatars.com/api/?name=NN&background=8b5cf6&color=fff&size=150" },
  { id: 3, title: "Electric Blue", artist: "Kavinsky", img: "https://ui-avatars.com/api/?name=EB&background=1e40af&color=fff&size=150" },
  { id: 4, title: "Retro Wave", artist: "Gunship", img: "https://ui-avatars.com/api/?name=RW&background=9f1239&color=fff&size=150" }
];

const recentlyPlayed = [
  ...featuredAlbums,
  { id: 5, title: "Outrun", artist: "Kavinsky", img: "https://ui-avatars.com/api/?name=OR&background=ea580c&color=fff&size=150" },
  { id: 6, title: "Atlas", artist: "FM-84", img: "https://ui-avatars.com/api/?name=AT&background=0284c7&color=fff&size=150" },
  { id: 7, title: "Endless Summer", artist: "The Midnight", img: "https://ui-avatars.com/api/?name=ES&background=eab308&color=fff&size=150" },
  { id: 8, title: "Dark All Day", artist: "Gunship", img: "https://ui-avatars.com/api/?name=DA&background=000&color=fff&size=150" }
];

const queue = [
  {
    id: 1,
    title: "Vaporwave Beat",
    artist: "Synthmaster",
    duration: 125, // seconds
    img: "https://ui-avatars.com/api/?name=VB&background=8b5cf6&color=fff&size=150",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Lofi Chillscape",
    artist: "Rainy Days",
    duration: 180,
    img: "https://ui-avatars.com/api/?name=LC&background=312e81&color=fff&size=150",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Upbeat Corporate",
    artist: "StockMusic",
    duration: 140,
    img: "https://ui-avatars.com/api/?name=UC&background=14532d&color=fff&size=150",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
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

// Application State
let currentTrackIndex = 0;
let isPlaying = false;

// Initialization
function init() {
  populateSidebar();
  populateMainContent();
  setGreeting();
  loadTrack(currentTrackIndex);
  
  // Re-initialize Lucide Icons for dynamic content
  lucide.createIcons();
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
btnPlay.addEventListener('click', togglePlay);
btnNext.addEventListener('click', playNext);
btnPrev.addEventListener('click', playPrev);

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

// Start app
init();
