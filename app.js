// Supabase Configuration
const SUPABASE_URL = 'https://woodsdwveicynllmxbnn.supabase.co'; // <-- INSERT YOUR URL HERE
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvb2RzZHd2ZWljeW5sbG14Ym5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMzk5MDYsImV4cCI6MjA5MDcxNTkwNn0.PEfmjh_OXd82l0a6R3uP8Wx-loZISLHQ0SWbuZZvfMg'; // <-- INSERT YOUR KEY HERE
const supabase = (window.supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL') 
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

// Unique Anonymous Session ID for Persistent Favorites
let deviceId = localStorage.getItem('deviceId');
if (!deviceId) {
  deviceId = crypto.randomUUID ? crypto.randomUUID() : 'id_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('deviceId', deviceId);
}

// Initialize Lucide Icons
lucide.createIcons();

// Placeholder Extended Mock Data
let playlists = [
  "Morning Devotion", "Praise & Worship", "Hillsong Classics", "Nigerian Gospel",
  "Sunday Vibes", "Quiet Time", "Gospel Anthems", "Afro Gospel", "Classical Worship", "Gospel Jazz", "Blues Devotional", "RnB Worship"
];

let featuredAlbums = [
  { id: 1, title: "Way Maker", artist: "Sinach", img: "https://ui-avatars.com/api/?name=WM&background=4c1d95&color=fff&size=150" },
  { id: 2, title: "There Is More", artist: "Hillsong Worship", img: "https://ui-avatars.com/api/?name=TM&background=8b5cf6&color=fff&size=150" },
  { id: 3, title: "Olowogbogboro", artist: "Nathaniel Bassey", img: "https://ui-avatars.com/api/?name=OL&background=1e40af&color=fff&size=150" },
  { id: 4, title: "Satisfied", artist: "Mercy Chinwo", img: "https://ui-avatars.com/api/?name=SA&background=9f1239&color=fff&size=150" },
  { id: 9, title: "Smooth Jazz Devotional", artist: "Jazz Vibes", img: "https://ui-avatars.com/api/?name=JV&background=1e40af&color=fff&size=150" },
  { id: 10, title: "Classical Redemption", artist: "Symphony Orchestra", img: "https://ui-avatars.com/api/?name=CR&background=047857&color=fff&size=150" }
];

let recentlyPlayed = [
  ...featuredAlbums,
  { id: 5, title: "Crossover: Live", artist: "Travis Greene", img: "https://ui-avatars.com/api/?name=TG&background=ea580c&color=fff&size=150" },
  { id: 6, title: "Graves Into Gardens", artist: "Elevation Worship", img: "https://ui-avatars.com/api/?name=GG&background=0284c7&color=fff&size=150" },
  { id: 7, title: "God Will Make A Way", artist: "Don Moen", img: "https://ui-avatars.com/api/?name=DM&background=eab308&color=fff&size=150" },
  { id: 8, title: "Alabaster Box", artist: "CeCe Winans", img: "https://ui-avatars.com/api/?name=CW&background=000&color=fff&size=150" },
  { id: 11, title: "RnB Praise", artist: "Soul Chorus", img: "https://ui-avatars.com/api/?name=RB&background=be123c&color=fff&size=150" }
];

let queue = [
  {
    id: 1,
    title: "Way Maker - Live",
    artist: "Sinach",
    duration: 312, // seconds mock
    img: "https://ui-avatars.com/api/?name=WM&background=8b5cf6&color=fff&size=150",
    youtubeId: "n4XWfwLHeLM",
    lyrics: "You are here, moving in our midst<br/>I worship You, I worship You<br/><br/>You are here, working in this place<br/>I worship You, I worship You<br/><br/>(Chorus)<br/>Way Maker, Miracle Worker<br/>Promise Keeper, Light in the darkness<br/>My God, that is who You are!"
  },
  {
    id: 2,
    title: "What A Beautiful Name",
    artist: "Hillsong Worship",
    duration: 341,
    img: "https://ui-avatars.com/api/?name=WB&background=312e81&color=fff&size=150",
    youtubeId: "nQWFzMvCfLE",
    lyrics: "You were the Word at the beginning<br/>One with God the Lord Most High<br/>Your hidden glory in creation<br/>Now revealed in You our Christ<br/><br/>(Chorus)<br/>What a beautiful Name it is<br/>What a beautiful Name it is<br/>The Name of Jesus Christ my King!"
  },
  {
    id: 3,
    title: "Imela",
    artist: "Nathaniel Bassey",
    duration: 326,
    img: "https://ui-avatars.com/api/?name=IM&background=14532d&color=fff&size=150",
    youtubeId: "EnYZQfS3SVE",
    lyrics: "When I think upon Your goodness<br/>And Your faithfulness each day<br/>I'm convinced it's not because I am worthy<br/>To receive the kind of love that You give<br/><br/>But I'm grateful for Your mercy<br/>And I'm grateful for Your grace<br/>And because of how You've poured out Yourself<br/>I have come to sing this song out in praise<br/><br/>Imela, Imela<br/>Okaka, Onyekeruwa!"
  },
  {
    id: 4,
    title: "Classical Worship Anthem",
    artist: "Symphony Orchestra",
    duration: 160,
    img: "https://ui-avatars.com/api/?name=CW&background=047857&color=fff&size=150",
    youtubeId: "d8jcb6I5KGs",
    lyrics: "Instrumental - Classical Symphony"
  }
];

// DOM Elements
const sidebarPlaylistsEl = document.getElementById('sidebar-playlists');
const featuredGridEl = document.getElementById('featured-grid');
const recentlyPlayedEl = document.getElementById('recently-played');

const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const ytPlayerEl = document.getElementById('youtube-player');
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

let ytPlayer = null;
let ytInterval = null;
let ytReady = false;

// YouTube IFrame Initialization Boilerplate
window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('youtube-player', {
    videoId: '',
    playerVars: { 'autoplay': 0, 'controls': 0, 'disablekb': 1, 'playsinline': 1 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerReady(event) {
  ytReady = true;
  if(ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(Math.round(savedVolume * 100));
  // Initially load track once player driver mounts
  loadTrack(currentTrackIndex);
  
  // Auto-play attempt
  setTimeout(() => { togglePlay(true); }, 300);
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    startProgressInterval();
    syncUI();
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.CUED) {
    isPlaying = false;
    stopProgressInterval();
    syncUI();
  } else if (event.data === YT.PlayerState.ENDED) {
    if(isRepeat) {
      if(ytPlayer && ytPlayer.seekTo) ytPlayer.seekTo(0);
      if(ytPlayer && ytPlayer.playVideo) ytPlayer.playVideo();
    } else {
      playNext();
    }
  }
}

function syncUI() {
  if (isPlaying) {
    btnPlay.innerHTML = '<i data-lucide="pause" class="w-5 h-5 fill-current ml-0"></i>';
  } else {
    btnPlay.innerHTML = '<i data-lucide="play" class="w-5 h-5 fill-current ml-0.5"></i>';
  }
  lucide.createIcons();
}

// Initialization
async function init() {
  if (supabase) {
    try {
      const { data: dbQueue } = await supabase.from('queue').select('*');
      if (dbQueue && dbQueue.length > 0) {
        queue = dbQueue;
      }
    } catch (e) {
      console.warn("Supabase fetch failed. Falling back to local/placeholder queue.");
    }
  }

  populateSidebar();
  populateMainContent();
  setGreeting();
  
  volumeBar.style.width = `${Math.round(savedVolume * 100)}%`;
  setupMediaSession();
  lucide.createIcons();
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
  currentTitleEl.innerText = track.title;
  currentArtistEl.innerText = track.artist;
  currentAlbumArtEl.src = track.img;
  
  // Inject Lyrics
  lyricsContent.innerHTML = track.lyrics || "No lyrics available for this track.";
  
  updateMediaSessionMetadata(track);
  
  // Track Favorite State
  let favs = JSON.parse(localStorage.getItem('favs') || '[]');
  const isFav = favs.includes(track.id);
  btnFav.classList.toggle('text-brand', isFav);
  const icon = btnFav.querySelector('i');
  if (isFav) icon.classList.add('fill-brand');
  else icon.classList.remove('fill-brand');
  
  timeTotalEl.innerText = formatTime(track.duration);
  progressBar.style.width = '0%';
  timeCurrentEl.innerText = '0:00';
  
  if (ytReady && ytPlayer && track.youtubeId) {
    if (isPlaying) {
      ytPlayer.loadVideoById(track.youtubeId);
    } else {
      ytPlayer.cueVideoById(track.youtubeId);
    }
  }
}

function togglePlay(forcePlay) {
  if (!ytReady || !ytPlayer) return;
  
  if (typeof forcePlay === 'boolean') {
    if(forcePlay && !isPlaying) {
       if(ytPlayer.playVideo) ytPlayer.playVideo();
    } else if (!forcePlay && isPlaying) {
       if(ytPlayer.pauseVideo) ytPlayer.pauseVideo();
    }
    return;
  }
  
  if (isPlaying) {
    if(ytPlayer.pauseVideo) ytPlayer.pauseVideo();
  } else {
    if(ytPlayer.playVideo) ytPlayer.playVideo();
  }
}

function playNext() {
  currentTrackIndex = (currentTrackIndex + 1) % queue.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) togglePlay(true);
}

function playPrev() {
  if (ytReady && ytPlayer && ytPlayer.getCurrentTime && ytPlayer.getCurrentTime() > 3) {
    ytPlayer.seekTo(0);
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

btnFav.addEventListener('click', async () => {
  const currentTrackId = queue[currentTrackIndex].id;
  btnFav.classList.toggle('text-brand');
  const isNowFav = btnFav.classList.contains('text-brand');
  const icon = btnFav.querySelector('i');
  
  if (isNowFav) {
    icon.classList.add('fill-brand');
    // Save to LocalStorage
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');
    if(!favs.includes(currentTrackId)) favs.push(currentTrackId);
    localStorage.setItem('favs', JSON.stringify(favs));
    
    // Attempt Supabase Sync (Silent)
    if(supabase) supabase.from('favorites').insert([{ device_id: deviceId, song_id: currentTrackId }]).catch(()=>{});
  } else {
    icon.classList.remove('fill-brand');
    // Remove from LocalStorage
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');
    favs = favs.filter(id => id !== currentTrackId);
    localStorage.setItem('favs', JSON.stringify(favs));
    
    // Attempt Supabase Sync (Silent)
    if(supabase) supabase.from('favorites').delete().match({ device_id: deviceId, song_id: currentTrackId }).catch(()=>{});
  }
});

btnRepeat.addEventListener('click', () => {
  isRepeat = !isRepeat;
  btnRepeat.classList.toggle('text-brand', isRepeat);
});

btnSpeed.addEventListener('click', () => {
  speedIndex = (speedIndex + 1) % playbackSpeeds.length;
  const speed = playbackSpeeds[speedIndex];
  if(ytReady && ytPlayer && ytPlayer.setPlaybackRate) {
    ytPlayer.setPlaybackRate(speed);
  }
  btnSpeed.innerText = speed + 'x';
});

// YouTube Interval Sync Logic
function startProgressInterval() {
  stopProgressInterval();
  ytInterval = setInterval(updateProgress, 500);
}

function stopProgressInterval() {
  if(ytInterval) clearInterval(ytInterval);
}

function updateProgress() {
  if(!ytReady || !ytPlayer || !ytPlayer.getCurrentTime) return;
  const currentTime = ytPlayer.getCurrentTime() || 0;
  let duration = queue[currentTrackIndex]?.duration || 0;
  if(ytPlayer.getDuration && ytPlayer.getDuration() > 0) duration = ytPlayer.getDuration();
  
  if (duration > 0) {
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    timeCurrentEl.innerText = formatTime(currentTime);
    timeTotalEl.innerText = formatTime(duration);
  }
}

progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  let duration = queue[currentTrackIndex]?.duration || 0;
  if(ytReady && ytPlayer && ytPlayer.getDuration && ytPlayer.getDuration() > 0) duration = ytPlayer.getDuration();
  
  if (duration > 0 && ytReady && ytPlayer) {
    const newTime = (clickX / width) * duration;
    ytPlayer.seekTo(newTime, true);
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
  
  if (ytReady && ytPlayer && ytPlayer.setVolume) {
     ytPlayer.setVolume(Math.round(newVol * 100));
  }
  
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
