// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // <-- INSERT YOUR URL HERE
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // <-- INSERT YOUR KEY HERE
const supabaseClient = (window.supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL')
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

// Unique Anonymous Session ID for Persistent Favorites
let deviceId = localStorage.getItem('deviceId');
if (!deviceId) {
  deviceId = crypto.randomUUID ? crypto.randomUUID() : 'id_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('deviceId', deviceId);
}

// -------------------------------------------------------------
// Category Metadata & Hero Visuals
// -------------------------------------------------------------
const categoryMetadata = {
  "Trending Online": {
    name: "Audius Global Trending",
    shortName: "Trending Online",
    badge: "LIVE CLOUD STREAM",
    tagline: "Top Viral Tracks & Anthems Across the Open Audius Network",
    description: "Stream the most popular live tracks, indie artists, and trending releases updated continuously in real-time.",
    heroImg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
    accentColor: "#06b6d4",
    gradient: "from-cyan-950/90 via-blue-950/70 to-[#121212]",
    listeners: "Global Live Stream",
    songsCount: 15,
    isOnline: true
  },
  "Gospel Stream": {
    name: "Gospel & Worship Cloud Stream",
    shortName: "Gospel Stream",
    badge: "CLOUD WORSHIP",
    tagline: "Inspiring Devotional Melodies & Global Christian Praise",
    description: "Live gospel, choir vocals, acoustic reverence, and prayerful worship streamed directly from independent artists.",
    heroImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    accentColor: "#8b5cf6",
    gradient: "from-purple-950/90 via-indigo-950/70 to-[#121212]",
    listeners: "Curated Live Cloud",
    songsCount: 12,
    isOnline: true
  },
  "Ambient Stream": {
    name: "Ambient & Peaceful Meditation",
    shortName: "Ambient Stream",
    badge: "PEACE & CHILL",
    tagline: "Atmospheric Textures, Warm Pads & Deep Reflection",
    description: "Gentle soundscapes designed for focus, prayer, reading, and deep restorative tranquility.",
    heroImg: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=300&q=80",
    accentColor: "#6366f1",
    gradient: "from-indigo-950/90 via-slate-950/70 to-[#121212]",
    listeners: "Calm Stream",
    songsCount: 12,
    isOnline: true
  },
  "Jazz Stream": {
    name: "Jazz & Smooth Lounge Cloud",
    shortName: "Jazz Stream",
    badge: "JAZZ LOUNGE",
    tagline: "Velvet Brass, Soulful Keys & Modern Jazz Improvisations",
    description: "Relaxed grooves, sax solos, and syncopated harmony recordings from musicians worldwide.",
    heroImg: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=300&q=80",
    accentColor: "#d97706",
    gradient: "from-amber-950/90 via-yellow-950/70 to-[#121212]",
    listeners: "Lounge Stream",
    songsCount: 12,
    isOnline: true
  },
  "Classical Stream": {
    name: "Classical Symphony Cloud",
    shortName: "Classical Stream",
    badge: "PHILHARMONIC",
    tagline: "Grand Concertos, Lush Strings & Masterful Solos",
    description: "Timeless orchestral masterpieces and new classical works recorded with concert hall acoustic depth.",
    heroImg: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=300&q=80",
    accentColor: "#3b82f6",
    gradient: "from-blue-950/90 via-indigo-950/70 to-[#121212]",
    listeners: "Philharmonic Stream",
    songsCount: 12,
    isOnline: true
  },
  "Lofi Stream": {
    name: "Lo-Fi Study & Chill Cloud",
    shortName: "Lo-Fi Chill",
    badge: "CHILL & FOCUS",
    tagline: "Dusty Vinyl, Warm Rhodes & Relaxing Beats",
    description: "Cozy lo-fi hip hop, mellow keyboards, and gentle rhythm loops crafted for study, coding, and peaceful downtime.",
    heroImg: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=300&q=80",
    accentColor: "#10b981",
    gradient: "from-emerald-950/90 via-teal-950/70 to-[#121212]",
    listeners: "Study & Chill Stream",
    songsCount: 12,
    isOnline: true
  },
  "Acoustic Stream": {
    name: "Acoustic Folk & Devotion",
    shortName: "Acoustic & Folk",
    badge: "RAW ACOUSTIC",
    tagline: "Heartfelt Fingerpicking & Intimate Songwriting",
    description: "Pure acoustic wooden guitars, subtle cello strings, and soulful organic vocals.",
    heroImg: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&q=80",
    accentColor: "#f97316",
    gradient: "from-amber-950/90 via-orange-950/70 to-[#121212]",
    listeners: "Acoustic Stream",
    songsCount: 12,
    isOnline: true
  },
  "RnB Stream": {
    name: "Neo-Soul & RnB Sanctuary",
    shortName: "Neo-Soul & R&B",
    badge: "NEO-SOUL & RNB",
    tagline: "Velvet Grooves, Lush Harmonies & Soulful Keys",
    description: "Smooth contemporary R&B rhythms, rich chord changes, and comforting modern gospel soul.",
    heroImg: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=300&q=80",
    accentColor: "#ec4899",
    gradient: "from-pink-950/90 via-purple-950/70 to-[#121212]",
    listeners: "Neo-Soul Stream",
    songsCount: 12,
    isOnline: true
  },
  "Electronic Stream": {
    name: "Melodic Electronic & Synthwave",
    shortName: "Electronic & EDM",
    badge: "SYNTHWAVE",
    tagline: "Uplifting Arpeggiators, Dreamy Synths & Energy",
    description: "Vibrant electronic soundscapes, atmospheric synthwave, and positive melodic energy.",
    heroImg: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80",
    accentColor: "#06b6d4",
    gradient: "from-cyan-950/90 via-indigo-950/70 to-[#121212]",
    listeners: "Electronic Stream",
    songsCount: 12,
    isOnline: true
  },
  "Afrobeats Stream": {
    name: "Afrobeats & African Praise",
    shortName: "Afrobeats Praise",
    badge: "AFRO GOSPEL",
    tagline: "Joyous West African Grooves & High Energy Praise",
    description: "Infectious celebratory rhythms, radiant brass, and joyous uplifting African gospel anthems.",
    heroImg: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    accentColor: "#eab308",
    gradient: "from-yellow-950/90 via-amber-950/70 to-[#121212]",
    listeners: "Afrobeats Stream",
    songsCount: 12,
    isOnline: true
  },
  "Hillsong United": {
    name: "Hillsong United",
    shortName: "Hillsong United",
    badge: "WORSHIP",
    tagline: "Atmospheric Arena Worship & Oceans of Faith",
    description: "Soaring guitars, heartfelt congregational devotion, and timeless anthems of faith that unite millions worldwide.",
    heroImg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80",
    accentColor: "#8b5cf6",
    gradient: "from-purple-900/90 via-indigo-950/70 to-[#121212]",
    listeners: "3.4M monthly listeners",
    songsCount: 1,
    folder: "music/Gospel/Hillsong_United"
  },
  "Hillsong Worship": {
    name: "Hillsong Worship",
    shortName: "Hillsong Worship",
    badge: "WORSHIP",
    tagline: "Live Congregational Praise",
    description: "Live worship recordings by Hillsong Worship.",
    heroImg: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80",
    accentColor: "#8b5cf6",
    gradient: "from-purple-900/90 via-indigo-950/70 to-[#121212]",
    listeners: "2.8M monthly listeners",
    songsCount: 2,
    folder: "music/Gospel/Hillsong_Worship"
  },
  "Nathaniel Bassey": {
    name: "Nathaniel Bassey",
    shortName: "Nathaniel Bassey",
    badge: "GOSPEL",
    tagline: "Sound of the Trumpet & High Praise",
    description: "Spiritual revival, trumpet fanfares, and deeply moving melodies of gratitude.",
    heroImg: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    accentColor: "#3b82f6",
    gradient: "from-blue-950/90 via-indigo-950/70 to-[#121212]",
    listeners: "1.9M monthly listeners",
    songsCount: 1,
    folder: "music/Gospel/Nathaniel_Bassey"
  },
  "Paul Baloche": {
    name: "Paul Baloche",
    shortName: "Paul Baloche",
    badge: "WORSHIP",
    tagline: "Contemporary Worship Classics",
    description: "Inspiring acoustic worship compositions by Paul Baloche.",
    heroImg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
    accentColor: "#ec4899",
    gradient: "from-pink-950/90 via-rose-950/70 to-[#121212]",
    listeners: "950K monthly listeners",
    songsCount: 1,
    folder: "music/Gospel/Paul_Baloche"
  },
  "Ragtime": {
    name: "Classic Ragtime",
    shortName: "Ragtime",
    badge: "PUBLIC DOMAIN",
    tagline: "Classic Piano Ragtime",
    description: "Openly licensed piano ragtime recordings by Scott Joplin and pioneers.",
    heroImg: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=300&q=80",
    accentColor: "#d97706",
    gradient: "from-amber-950/90 via-yellow-950/70 to-[#121212]",
    listeners: "Public Domain",
    songsCount: 2,
    folder: "music/Public_Domain/Ragtime/Scott_Joplin"
  },
  "Classical": {
    name: "Classical Essentials",
    shortName: "Classical",
    badge: "PUBLIC DOMAIN",
    tagline: "Symphonic & Chamber Essentials",
    description: "Public-domain classical recordings from Beethoven, Bach, and Mozart.",
    heroImg: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=300&q=80",
    accentColor: "#6366f1",
    gradient: "from-indigo-950/90 via-slate-950/70 to-[#121212]",
    listeners: "Public Domain",
    songsCount: 1,
    folder: "music/Public_Domain/Classical/Ludwig_van_Beethoven"
  },
  "Blues": {
    name: "Delta Blues",
    shortName: "Blues",
    badge: "ROOTS & BLUES",
    tagline: "Roots, Blues & Slide Guitars",
    description: "Classic Blues recordings by W.C. Handy and acoustic pioneers.",
    heroImg: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&q=80",
    accentColor: "#b45309",
    gradient: "from-amber-950/90 via-orange-950/70 to-[#121212]",
    listeners: "Classic Blues",
    songsCount: 1,
    folder: "music/Blues"
  },
  "Jazz": {
    name: "Early Jazz Classics",
    shortName: "Jazz",
    badge: "JAZZ",
    tagline: "New Orleans Stomp & Early Syncopation",
    description: "Classic brass improvisations and early jazz recordings.",
    heroImg: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    accentColor: "#d97706",
    gradient: "from-amber-950/90 via-yellow-950/70 to-[#121212]",
    listeners: "Early Jazz",
    songsCount: 1,
    folder: "music/Jazz"
  }
};

// -------------------------------------------------------------
// Base Local Song Catalog
// -------------------------------------------------------------
const allSongs = [
  { id: 1, title: "So Will I (100 Billion X)", artist: "Hillsong United", album: "Wonder", category: "Hillsong United", folder: "music/Gospel/Hillsong_United", duration: 0, img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Hillsong_United/So Will I (100 Billion X).mp3" },
  { id: 2, title: "Hosanna (Live)", artist: "Hillsong Worship", album: "Saviour King (Live)", category: "Hillsong Worship", folder: "music/Gospel/Hillsong_Worship", duration: 0, img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Hillsong_Worship/Hosanna (Live).mp3" },
  { id: 3, title: "Let There Be Light", artist: "Hillsong Worship", album: "Let There Be Light", category: "Hillsong Worship", folder: "music/Gospel/Hillsong_Worship", duration: 0, img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Hillsong_Worship/Let There Be Light.mp3" },
  { id: 4, title: "Hosanna (Live)", artist: "Paul Baloche", album: "iWorship 24:7", category: "Paul Baloche", folder: "music/Gospel/Paul_Baloche", duration: 0, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Paul_Baloche/Hosanna (Live).mp3" },
  { id: 5, title: "Olowogbogboro", artist: "Nathaniel Bassey feat. Wale Adenuga", album: "Olowogbogboro", category: "Nathaniel Bassey", folder: "music/Gospel/Nathaniel_Bassey", duration: 0, img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro (feat. Wale Adenuga).mp3" },
  { id: 6, title: "Black Bottom Stomp", artist: "The Red Heads", album: "Pathé Actuelle 11289", category: "Jazz", folder: "music/Jazz/The_Red_Heads", duration: 138, img: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Jazz/The_Red_Heads/Black Bottom Stomp.mp3" },
  { id: 7, title: "Memphis Blues", artist: "W. C. Handy", album: "Memphis Blues", category: "Blues", folder: "music/Blues", duration: 0, img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Blues/Memphis Blues.mp3" },
  { id: 8, title: "The Entertainer", artist: "Scott Joplin · performed by I.E.", album: "Public-Domain Recording", category: "Ragtime", folder: "music/Public_Domain/Ragtime/Scott_Joplin", duration: 234, img: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Public_Domain/Ragtime/Scott_Joplin/The Entertainer.ogg" },
  { id: 9, title: "Maple Leaf Rag", artist: "Scott Joplin · performed by William J. Leslie", album: "Public-Domain Composition", category: "Ragtime", folder: "music/Public_Domain/Ragtime/Scott_Joplin", duration: 194, img: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Public_Domain/Ragtime/Scott_Joplin/Maple Leaf Rag.ogg" },
  { id: 10, title: "Ode to Joy", artist: "Ludwig van Beethoven", album: "Symphony No. 9", category: "Classical", folder: "music/Public_Domain/Classical/Ludwig_van_Beethoven", duration: 39, img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Public_Domain/Classical/Ludwig_van_Beethoven/Ode to Joy.ogg" },
  { id: 11, title: "Sound Trip na Yah!!!!!", artist: "Hillsong", album: "Hillsong Collection", category: "Hillsong", folder: "music/Gospel/Hillsong", duration: 122, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3" }
];

// Playlists metadata
const playlistsData = [
  { name: "Audius Global Trending", category: "Trending Online", count: "Live", isOnline: true },
  { name: "Gospel & Worship Cloud", category: "Gospel Stream", count: "Live", isOnline: true },
  { name: "Ambient & Peaceful Pad", category: "Ambient Stream", count: "Live", isOnline: true },
  { name: "Lo-Fi Study & Chill", category: "Lofi Stream", count: "Live", isOnline: true },
  { name: "Acoustic Folk & Devotion", category: "Acoustic Stream", count: "Live", isOnline: true },
  { name: "Neo-Soul & R&B", category: "RnB Stream", count: "Live", isOnline: true },
  { name: "Electronic & EDM", category: "Electronic Stream", count: "Live", isOnline: true },
  { name: "Afrobeats Praise", category: "Afrobeats Stream", count: "Live", isOnline: true },
  { name: "Jazz & Smooth Lounge", category: "Jazz Stream", count: "Live", isOnline: true },
  { name: "Classical Symphony", category: "Classical Stream", count: "Live", isOnline: true },
  { name: "Hillsong United", category: "Hillsong United", count: 1 },
  { name: "Hillsong Worship", category: "Hillsong Worship", count: 2 },
  { name: "Nathaniel Bassey", category: "Nathaniel Bassey", count: 1 },
  { name: "Paul Baloche", category: "Paul Baloche", count: 1 },
  { name: "Scott Joplin Ragtime", category: "Ragtime", count: 2 },
  { name: "Beethoven Classical", category: "Classical", count: 1 },
  { name: "Delta Blues", category: "Blues", count: 1 }
];

const foldersData = [
  { name: "cloud/Audius/Trending", label: "Audius Global Trending (Live)", filter: "Trending Online" },
  { name: "cloud/Audius/Gospel", label: "Gospel Cloud Stream (Live)", filter: "Gospel Stream" },
  { name: "cloud/Audius/Ambient", label: "Ambient Cloud Stream (Live)", filter: "Ambient Stream" },
  { name: "cloud/Audius/Lofi", label: "Lo-Fi Beats (Live)", filter: "Lofi Stream" },
  { name: "cloud/Audius/Acoustic", label: "Acoustic & Folk (Live)", filter: "Acoustic Stream" },
  { name: "cloud/Audius/RnB", label: "Neo-Soul & R&B (Live)", filter: "RnB Stream" },
  { name: "cloud/Audius/Electronic", label: "Electronic & EDM (Live)", filter: "Electronic Stream" },
  { name: "cloud/Audius/Afrobeats", label: "Afrobeats Praise (Live)", filter: "Afrobeats Stream" },
  { name: "cloud/Audius/Jazz", label: "Jazz Cloud Stream (Live)", filter: "Jazz Stream" },
  { name: "music/Gospel/Hillsong_United", label: "Hillsong United (1 song)", filter: "Hillsong United" },
  { name: "music/Gospel/Hillsong_Worship", label: "Hillsong Worship (2 songs)", filter: "Hillsong Worship" },
  { name: "music/Gospel/Nathaniel_Bassey", label: "Nathaniel Bassey (1 song)", filter: "Nathaniel Bassey" },
  { name: "music/Public_Domain/Ragtime", label: "Scott Joplin Ragtime (2 songs)", filter: "Ragtime" },
  { name: "music/Public_Domain/Classical", label: "Beethoven Classical (1 song)", filter: "Classical" },
  { name: "music/Blues", label: "Delta Blues (1 song)", filter: "Blues" }
];

const artistsData = [
  { name: "Audius Creators", songs: "Millions", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&q=80" },
  { name: "Hillsong United", songs: 1, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=150&q=80" },
  { name: "Hillsong Worship", songs: 2, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=150&q=80" },
  { name: "Nathaniel Bassey", songs: 1, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" },
  { name: "Paul Baloche", songs: 1, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&q=80" },
  { name: "Scott Joplin", songs: 2, img: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=150&q=80" },
  { name: "Ludwig van Beethoven", songs: 1, img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=150&q=80" }
];

// Top Featured Grid
const featuredAlbums = [
  { id: 1, title: "So Will I (100 Billion X)", artist: "Hillsong United", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80" },
  { id: 2, title: "Hosanna (Live)", artist: "Hillsong Worship", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80" },
  { id: 5, title: "Olowogbogboro", artist: "Nathaniel Bassey", img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=300&q=80" },
  { id: 8, title: "The Entertainer", artist: "Scott Joplin", img: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=300&q=80" }
];

// -------------------------------------------------------------
// Audius API Client & Service
// -------------------------------------------------------------
const AUDIUS_APP_NAME = 'STREAMHUB_APP';
let audiusEndpoint = 'https://api.audius.co';
let audiusTrendingTracks = [];
let audiusGenreTracks = {
  "Gospel Stream": [],
  "Ambient Stream": [],
  "Lofi Stream": [],
  "Acoustic Stream": [],
  "RnB Stream": [],
  "Electronic Stream": [],
  "Afrobeats Stream": [],
  "Jazz Stream": [],
  "Classical Stream": []
};
let audiusSearchResults = [];
let searchDebounceTimer = null;

async function initAudiusService() {
  try {
    const res = await fetch('https://api.audius.co', { cache: 'no-cache' });
    const data = await res.json();
    if (data && data.data && data.data.length > 0) {
      audiusEndpoint = data.data[0];
    }
  } catch (e) {
    audiusEndpoint = 'https://discoveryprovider.audius.co';
  }
  console.log('Connected to Audius Discovery Node:', audiusEndpoint);

  loadAudiusFeeds();
}

function formatAudiusTrack(t, customCategory = 'Trending Online') {
  const artwork = t.artwork ? (t.artwork['480x480'] || t.artwork['1000x1000'] || t.artwork['150x150']) : null;
  const defaultImg = "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80";
  const streamUrl = `${audiusEndpoint}/v1/tracks/${t.id}/stream?app_name=${AUDIUS_APP_NAME}`;

  return {
    id: `audius_${t.id}`,
    audiusId: t.id,
    title: t.title || 'Untitled Track',
    artist: (t.user && t.user.name) ? t.user.name : (t.user?.handle || 'Audius Artist'),
    album: t.genre ? `${t.genre} • Audius Cloud` : 'Audius Cloud Stream',
    category: customCategory,
    folder: 'Audius Live Stream',
    duration: Math.round(t.duration || 180),
    img: artwork || defaultImg,
    audioSrc: streamUrl,
    fallbackAudioSrc: streamUrl,
    isAudius: true,
    genre: t.genre || 'Music',
    playCount: t.play_count || 0,
    lyrics: `Streamed live from Audius Open Music Protocol.<br/>Artist: <strong>${t.user?.name || 'Artist'}</strong> (@${t.user?.handle || 'creator'})<br/>Genre: ${t.genre || 'Independent'}`
  };
}

async function fetchAudiusTrending(genre = '', limit = 15) {
  try {
    const genreParam = genre ? `&genre=${encodeURIComponent(genre)}` : '';
    const url = `${audiusEndpoint}/v1/tracks/trending?app_name=${AUDIUS_APP_NAME}&limit=${limit}${genreParam}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json && json.data) {
      return json.data.filter(t => t.is_streamable !== false).map(t => formatAudiusTrack(t, genre || 'Trending Online'));
    }
  } catch (err) {
    console.warn('Audius trending fetch notice:', err);
  }
  return [];
}

async function searchAudiusTracks(query, limit = 12) {
  if (!query || query.trim().length === 0) return [];
  try {
    const url = `${audiusEndpoint}/v1/tracks/search?query=${encodeURIComponent(query)}&app_name=${AUDIUS_APP_NAME}&limit=${limit}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json && json.data) {
      return json.data.filter(t => t.is_streamable !== false).map(t => formatAudiusTrack(t, 'Search Result'));
    }
  } catch (err) {
    console.warn('Audius search error:', err);
  }
  return [];
}

async function loadAudiusFeeds() {
  try {
    // 1. Trending Overall
    const trending = await fetchAudiusTrending('', 15);
    if (trending.length > 0) {
      audiusTrendingTracks = trending;
      trending.forEach(song => {
        if (!allSongs.some(s => s.id === song.id)) allSongs.push(song);
      });
      renderMainSections();
    }

    // 2. Gospel
    searchAudiusTracks('gospel worship', 10).then(gospel => {
      if (gospel.length) {
        audiusGenreTracks["Gospel Stream"] = gospel.map(s => ({ ...s, category: "Gospel Stream" }));
        gospel.forEach(song => { if (!allSongs.some(s => s.id === song.id)) allSongs.push(song); });
        renderMainSections();
      }
    });

    // 3. Ambient
    searchAudiusTracks('ambient meditation peaceful', 10).then(ambient => {
      if (ambient.length) {
        audiusGenreTracks["Ambient Stream"] = ambient.map(s => ({ ...s, category: "Ambient Stream" }));
        ambient.forEach(song => { if (!allSongs.some(s => s.id === song.id)) allSongs.push(song); });
      }
    });

    // 4. Lo-Fi
    searchAudiusTracks('lofi hip hop study beats', 10).then(lofi => {
      if (lofi.length) {
        audiusGenreTracks["Lofi Stream"] = lofi.map(s => ({ ...s, category: "Lofi Stream" }));
        lofi.forEach(song => { if (!allSongs.some(s => s.id === song.id)) allSongs.push(song); });
      }
    });

    // 5. Acoustic
    searchAudiusTracks('acoustic guitar folk worship', 10).then(acoustic => {
      if (acoustic.length) {
        audiusGenreTracks["Acoustic Stream"] = acoustic.map(s => ({ ...s, category: "Acoustic Stream" }));
        acoustic.forEach(song => { if (!allSongs.some(s => s.id === song.id)) allSongs.push(song); });
      }
    });

    // 6. R&B & Neo-Soul
    searchAudiusTracks('neo soul rnb groove', 10).then(rnb => {
      if (rnb.length) {
        audiusGenreTracks["RnB Stream"] = rnb.map(s => ({ ...s, category: "RnB Stream" }));
        rnb.forEach(song => { if (!allSongs.some(s => s.id === song.id)) allSongs.push(song); });
      }
    });

    // 7. Electronic & EDM
    searchAudiusTracks('melodic electronic synthwave', 10).then(edm => {
      if (edm.length) {
        audiusGenreTracks["Electronic Stream"] = edm.map(s => ({ ...s, category: "Electronic Stream" }));
        edm.forEach(song => { if (!allSongs.some(s => s.id === song.id)) allSongs.push(song); });
      }
    });

    // 8. Afrobeats Praise
    searchAudiusTracks('afrobeats praise afro gospel', 10).then(afro => {
      if (afro.length) {
        audiusGenreTracks["Afrobeats Stream"] = afro.map(s => ({ ...s, category: "Afrobeats Stream" }));
        afro.forEach(song => { if (!allSongs.some(s => s.id === song.id)) allSongs.push(song); });
      }
    });

    // 9. Jazz
    searchAudiusTracks('smooth jazz saxophone', 10).then(jazz => {
      if (jazz.length) {
        audiusGenreTracks["Jazz Stream"] = jazz.map(s => ({ ...s, category: "Jazz Stream" }));
        jazz.forEach(song => { if (!allSongs.some(s => s.id === song.id)) allSongs.push(song); });
      }
    });

    // 10. Classical
    searchAudiusTracks('classical piano symphony strings', 10).then(classical => {
      if (classical.length) {
        audiusGenreTracks["Classical Stream"] = classical.map(s => ({ ...s, category: "Classical Stream" }));
        classical.forEach(song => { if (!allSongs.some(s => s.id === song.id)) allSongs.push(song); });
        renderMainSections();
      }
    });

  } catch (e) {
    console.warn('Audius background feed loading notice:', e);
  }
}

function playTrendingAudius() {
  if (audiusTrendingTracks.length > 0) {
    playSongById(audiusTrendingTracks[0].id);
  } else {
    filterByCategory('Trending Online');
  }
}

// -------------------------------------------------------------
// Fallback Ambient Worship Synth (Web Audio API)
// -------------------------------------------------------------
class WebAudioSynthPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
    this.timer = null;
    this.chordIndex = 0;
    
    this.chords = [
      [146.83, 220.00, 293.66, 369.99, 440.00],
      [123.47, 185.00, 246.94, 293.66, 369.99],
      [130.81, 196.00, 261.63, 329.63, 392.00],
      [110.00, 164.81, 220.00, 277.18, 329.63]
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play() {
    try {
      this.initContext();
      this.isPlaying = true;
      this.stopOscillators();
      this.playChord(this.chords[this.chordIndex]);
      
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (!this.isPlaying) return;
        this.chordIndex = (this.chordIndex + 1) % this.chords.length;
        this.playChord(this.chords[this.chordIndex]);
      }, 4000);
    } catch (e) {
      console.warn("Synth player notice:", e);
    }
  }

  playChord(freqs) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    
    if (!this.gainNode) {
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.08, now);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, now);
      
      this.gainNode.connect(filter);
      filter.connect(this.ctx.destination);
    }

    this.stopOscillators();

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      
      oscGain.gain.setValueAtTime(0.001, now);
      oscGain.gain.exponentialRampToValueAtTime(0.025 / (idx + 1), now + 1.2);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 3.9);
      
      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start(now);
      osc.stop(now + 4);
      
      this.oscillators.push(osc);
    });
  }

  stopOscillators() {
    this.oscillators.forEach(osc => {
      try { osc.stop(); } catch(e) {}
    });
    this.oscillators = [];
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.timer);
    this.stopOscillators();
  }
}

const synthPlayer = new WebAudioSynthPlayer();

// -------------------------------------------------------------
// Application State & Queue
// -------------------------------------------------------------
let queue = [...allSongs];
let currentTrackIndex = 0;
let isPlaying = false;
let isRepeat = false;
let isShuffle = false;
let playbackSpeeds = [1, 1.25, 1.5, 2];
let speedIndex = 0;
let currentSidebarTab = 'playlists';
let activeCategoryFilter = 'all';
let searchQuery = '';
let isLyricsOpen = false;
let isMobilePlayerSheetOpen = false;
let isMobileSidebarOpen = false;
let isMuted = false;
let previousVolume = 1.0;
let savedVolume = localStorage.getItem('playerVolume') ? parseFloat(localStorage.getItem('playerVolume')) : 1.0;

let activePlaybackMode = 'file'; // 'file' or 'synth'
let synthCurrentTime = 0;
let synthTimer = null;
let uploadedSongs = [];
let nextUploadedSongId = 1000;

// -------------------------------------------------------------
// DOM Elements
// -------------------------------------------------------------
const sidebarEl = document.getElementById('sidebar');
const sidebarBackdrop = document.getElementById('sidebar-backdrop');
const btnMobileMenu = document.getElementById('btn-mobile-menu');
const btnCloseSidebar = document.getElementById('btn-close-sidebar');

const sidebarPlaylistsEl = document.getElementById('sidebar-playlists');
const sidebarFilterTabs = document.getElementById('sidebar-filter-tabs');
const featuredGridEl = document.getElementById('featured-grid');
const dynamicSectionsEl = document.getElementById('dynamic-sections');
const categoryChips = document.getElementById('category-chips');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const searchSpinner = document.getElementById('search-spinner');
const greetingEl = document.getElementById('greeting');
const musicFileInput = document.getElementById('music-file-input');
const localFilesSection = document.getElementById('local-files-section');

// Desktop Player Elements
const currentTitleEl = document.getElementById('current-title');
const currentArtistEl = document.getElementById('current-artist');
const currentAlbumArtEl = document.getElementById('current-album-art');
const audioPlayingIndicator = document.getElementById('audio-playing-indicator');
const btnFav = document.getElementById('btn-fav');
const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnShuffle = document.getElementById('btn-shuffle');
const btnRepeat = document.getElementById('btn-repeat');
const btnSpeed = document.getElementById('btn-speed');
const btnMute = document.getElementById('btn-mute');
const btnLyrics = document.getElementById('btn-lyrics');
const btnCloseLyrics = document.getElementById('btn-close-lyrics');
const lyricsPanel = document.getElementById('lyrics-panel');
const lyricsContent = document.getElementById('lyrics-content');
const progressBar = document.getElementById('progress-bar');
const progressThumb = document.getElementById('progress-thumb');
const progressContainer = document.getElementById('progress-container');
const timeCurrentEl = document.getElementById('time-current');
const timeTotalEl = document.getElementById('time-total');
const volumeContainer = document.getElementById('volume-container');
const volumeBar = document.getElementById('volume-bar');

// Mobile Bar Elements
const mobileProgressBar = document.getElementById('mobile-progress-bar');
const mobileProgressContainer = document.getElementById('mobile-progress-container');
const btnMobilePlay = document.getElementById('btn-mobile-play');
const btnMobileNext = document.getElementById('btn-mobile-next');
const btnMobileLyrics = document.getElementById('btn-mobile-lyrics');
const btnMobileExpand = document.getElementById('btn-mobile-expand');
const nowPlayingClickableArea = document.getElementById('now-playing-clickable-area');

// Expanded Mobile Sheet Elements
const mobilePlayerSheet = document.getElementById('mobile-player-sheet');
const btnCloseMobileSheet = document.getElementById('btn-close-mobile-sheet');
const mobileSheetArt = document.getElementById('mobile-sheet-art');
const mobileSheetBgArt = document.getElementById('mobile-sheet-bg-art');
const mobileSheetTitle = document.getElementById('mobile-sheet-title');
const mobileSheetArtist = document.getElementById('mobile-sheet-artist');
const mobileSheetCategory = document.getElementById('mobile-sheet-category');
const btnMobileSheetFav = document.getElementById('btn-mobile-sheet-fav');
const mobileSheetProgressBar = document.getElementById('mobile-sheet-progress-bar');
const mobileSheetProgressThumb = document.getElementById('mobile-sheet-progress-thumb');
const mobileSheetProgressContainer = document.getElementById('mobile-sheet-progress-container');
const mobileSheetTimeCurrent = document.getElementById('mobile-sheet-time-current');
const mobileSheetTimeTotal = document.getElementById('mobile-sheet-time-total');
const btnMobileSheetPlay = document.getElementById('btn-mobile-sheet-play');
const btnMobileSheetPrev = document.getElementById('btn-mobile-sheet-prev');
const btnMobileSheetNext = document.getElementById('btn-mobile-sheet-next');
const btnMobileSheetShuffle = document.getElementById('btn-mobile-sheet-shuffle');
const btnMobileSheetRepeat = document.getElementById('btn-mobile-sheet-repeat');
const btnMobileSheetSpeed = document.getElementById('btn-mobile-sheet-speed');
const btnMobileSheetLyrics = document.getElementById('btn-mobile-sheet-lyrics');
const mobileSheetVolumeContainer = document.getElementById('mobile-sheet-volume-container');
const mobileSheetVolumeBar = document.getElementById('mobile-sheet-volume-bar');

// HTML5 Audio element
const audioPlayer = document.getElementById('audio-player');

// -------------------------------------------------------------
// Audio Engine & Event Handlers
// -------------------------------------------------------------
audioPlayer.addEventListener('loadedmetadata', () => {
  if (activePlaybackMode !== 'file') return;
  const track = queue[currentTrackIndex];
  if (track && Number.isFinite(audioPlayer.duration) && audioPlayer.duration > 0) {
    track.duration = Math.round(audioPlayer.duration);
    updateDurationDisplays(track.duration);
  }
});

audioPlayer.addEventListener('timeupdate', () => {
  if (activePlaybackMode !== 'file' || !audioPlayer.duration) return;
  updateProgressUI(audioPlayer.currentTime, audioPlayer.duration);
});

audioPlayer.addEventListener('play', () => {
  isPlaying = true;
  syncPlaybackUI();
});

audioPlayer.addEventListener('pause', () => {
  isPlaying = false;
  syncPlaybackUI();
});

audioPlayer.addEventListener('ended', () => {
  if (isRepeat) {
    audioPlayer.currentTime = 0;
    audioPlayer.play().catch(() => {});
  } else {
    playNext();
  }
});

audioPlayer.addEventListener('error', () => {
  const track = queue[currentTrackIndex];
  console.warn("Audio file load notice:", track?.title);
  
  if (track && track.fallbackAudioSrc && audioPlayer.src !== encodeURI(new URL(track.fallbackAudioSrc, window.location.href).href)) {
    audioPlayer.src = encodeURI(track.fallbackAudioSrc);
    audioPlayer.load();
    if (isPlaying) audioPlayer.play().catch(() => switchToSynthPlayback(track));
  } else {
    switchToSynthPlayback(track);
  }
});

function switchToSynthPlayback(track) {
  activePlaybackMode = 'synth';
  synthCurrentTime = 0;
  clearInterval(synthTimer);
  
  if (isPlaying) {
    synthPlayer.play();
    startSynthTimer(track?.duration || 240);
  }
  syncPlaybackUI();
}

function startSynthTimer(duration) {
  clearInterval(synthTimer);
  synthTimer = setInterval(() => {
    if (!isPlaying) return;
    synthCurrentTime += 1;
    updateProgressUI(synthCurrentTime, duration);
    if (synthCurrentTime >= duration) {
      if (isRepeat) {
        synthCurrentTime = 0;
      } else {
        playNext();
      }
    }
  }, 1000);
}

function updateDurationDisplays(duration) {
  const formatted = formatTime(duration);
  if (timeTotalEl) timeTotalEl.innerText = formatted;
  if (mobileSheetTimeTotal) mobileSheetTimeTotal.innerText = formatted;
}

function updateProgressUI(current, total) {
  const percent = total > 0 ? (current / total) * 100 : 0;
  const currentFormatted = formatTime(current);
  const totalFormatted = formatTime(total);

  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressThumb) progressThumb.style.left = `${percent}%`;
  if (mobileProgressBar) mobileProgressBar.style.width = `${percent}%`;
  if (mobileSheetProgressBar) mobileSheetProgressBar.style.width = `${percent}%`;
  if (mobileSheetProgressThumb) mobileSheetProgressThumb.style.left = `${percent}%`;

  if (timeCurrentEl) timeCurrentEl.innerText = currentFormatted;
  if (timeTotalEl) timeTotalEl.innerText = totalFormatted;
  if (mobileSheetTimeCurrent) mobileSheetTimeCurrent.innerText = currentFormatted;
  if (mobileSheetTimeTotal) mobileSheetTimeTotal.innerText = totalFormatted;
}

function syncPlaybackUI() {
  const playIcon = '<i data-lucide="play" class="w-5 h-5 fill-current ml-0.5"></i>';
  const pauseIcon = '<i data-lucide="pause" class="w-5 h-5 fill-current ml-0"></i>';
  const mobilePlayIcon = '<i data-lucide="play" class="w-4 h-4 fill-current ml-0.5"></i>';
  const mobilePauseIcon = '<i data-lucide="pause" class="w-4 h-4 fill-current ml-0.5"></i>';
  const sheetPlayIcon = '<i data-lucide="play" class="w-8 h-8 fill-current ml-1"></i>';
  const sheetPauseIcon = '<i data-lucide="pause" class="w-8 h-8 fill-current ml-0"></i>';

  if (btnPlay) btnPlay.innerHTML = isPlaying ? pauseIcon : playIcon;
  if (btnMobilePlay) btnMobilePlay.innerHTML = isPlaying ? mobilePauseIcon : mobilePlayIcon;
  if (btnMobileSheetPlay) btnMobileSheetPlay.innerHTML = isPlaying ? sheetPauseIcon : sheetPlayIcon;

  if (audioPlayingIndicator) {
    audioPlayingIndicator.classList.toggle('hidden', !isPlaying);
    audioPlayingIndicator.classList.toggle('flex', isPlaying);
  }

  lucide.createIcons();
}

function loadTrack(index) {
  const track = queue[index];
  if (!track) return;
  
  if (currentTitleEl) currentTitleEl.innerText = track.title;
  if (currentArtistEl) currentArtistEl.innerText = track.artist;
  if (currentAlbumArtEl) currentAlbumArtEl.src = track.img;
  
  if (mobileSheetTitle) mobileSheetTitle.innerText = track.title;
  if (mobileSheetArtist) mobileSheetArtist.innerText = track.artist;
  if (mobileSheetArt) mobileSheetArt.src = track.img;
  if (mobileSheetBgArt) mobileSheetBgArt.src = track.img;
  if (mobileSheetCategory) mobileSheetCategory.innerText = track.category || 'StreamHub Worship';

  const lyricsHtml = track.lyrics || "No lyrics available for this track.";
  if (lyricsContent) lyricsContent.innerHTML = lyricsHtml;
  
  updateMediaSessionMetadata(track);
  syncFavoriteState(track.id);
  
  updateDurationDisplays(track.duration);
  updateProgressUI(0, track.duration);
  
  activePlaybackMode = 'file';
  clearInterval(synthTimer);
  synthPlayer.pause();
  
  const srcToLoad = track.audioSrc || track.fallbackAudioSrc || "music/Gospel/Hillsong_United/So Will I (100 Billion X).mp3";
  audioPlayer.pause();
  audioPlayer.src = encodeURI(srcToLoad);
  audioPlayer.load();
}

function togglePlay(forcePlay) {
  const track = queue[currentTrackIndex];
  if (!track) return;

  const shouldPlay = typeof forcePlay === 'boolean' ? forcePlay : !isPlaying;

  if (shouldPlay) {
    isPlaying = true;
    if (activePlaybackMode === 'file') {
      const playPromise = audioPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          switchToSynthPlayback(track);
        });
      }
    } else {
      synthPlayer.play();
      startSynthTimer(track.duration || 240);
      syncPlaybackUI();
    }
  } else {
    isPlaying = false;
    if (activePlaybackMode === 'file') {
      audioPlayer.pause();
    } else {
      synthPlayer.pause();
      clearInterval(synthTimer);
      syncPlaybackUI();
    }
  }
}

function playSongById(id) {
  let foundSong = queue.find(s => String(s.id) === String(id));
  if (!foundSong) {
    foundSong = allSongs.find(s => String(s.id) === String(id)) || 
                audiusSearchResults.find(s => String(s.id) === String(id)) || 
                audiusTrendingTracks.find(s => String(s.id) === String(id)) ||
                Object.values(audiusGenreTracks).flat().find(s => String(s.id) === String(id));
    
    if (foundSong) {
      if (!allSongs.some(s => String(s.id) === String(foundSong.id))) allSongs.push(foundSong);
      if (!queue.some(s => String(s.id) === String(foundSong.id))) queue.push(foundSong);
    }
  }

  const foundIndex = queue.findIndex(s => String(s.id) === String(id));
  if (foundIndex !== -1) {
    currentTrackIndex = foundIndex;
    loadTrack(currentTrackIndex);
    togglePlay(true);
    renderMainSections();
  }
}

function playNext() {
  if (isShuffle && queue.length > 1) {
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * queue.length);
    } while (nextIdx === currentTrackIndex);
    currentTrackIndex = nextIdx;
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % queue.length;
  }
  loadTrack(currentTrackIndex);
  togglePlay(true);
  renderMainSections();
}

function playPrev() {
  if (activePlaybackMode === 'file' && audioPlayer.currentTime > 3) {
    audioPlayer.currentTime = 0;
    return;
  }
  if (activePlaybackMode === 'synth' && synthCurrentTime > 3) {
    synthCurrentTime = 0;
    return;
  }
  currentTrackIndex = currentTrackIndex === 0 ? queue.length - 1 : currentTrackIndex - 1;
  loadTrack(currentTrackIndex);
  togglePlay(true);
  renderMainSections();
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// -------------------------------------------------------------
// Mobile Drawer & Expanded Sheet Management
// -------------------------------------------------------------
function openMobileSidebar() {
  if (!sidebarEl) return;
  isMobileSidebarOpen = true;
  sidebarEl.classList.remove('-translate-x-full');
  if (sidebarBackdrop) sidebarBackdrop.classList.remove('hidden');
}

function closeMobileSidebar() {
  if (!sidebarEl) return;
  isMobileSidebarOpen = false;
  sidebarEl.classList.add('-translate-x-full');
  if (sidebarBackdrop) sidebarBackdrop.classList.add('hidden');
}

function openMobilePlayerSheet() {
  if (!mobilePlayerSheet) return;
  isMobilePlayerSheetOpen = true;
  mobilePlayerSheet.classList.remove('sheet-closed');
  mobilePlayerSheet.classList.add('sheet-open');
}

function closeMobilePlayerSheet() {
  if (!mobilePlayerSheet) return;
  isMobilePlayerSheetOpen = false;
  mobilePlayerSheet.classList.remove('sheet-open');
  mobilePlayerSheet.classList.add('sheet-closed');
}

function toggleLyricsPanel() {
  isLyricsOpen = !isLyricsOpen;
  if (lyricsPanel) {
    lyricsPanel.classList.toggle('hidden', !isLyricsOpen);
    lyricsPanel.classList.toggle('flex', isLyricsOpen);
  }
  if (btnLyrics) btnLyrics.classList.toggle('text-brand', isLyricsOpen);
  if (btnMobileLyrics) btnMobileLyrics.classList.toggle('text-brand', isLyricsOpen);
  if (btnMobileSheetLyrics) btnMobileSheetLyrics.classList.toggle('text-brand', isLyricsOpen);
}

// -------------------------------------------------------------
// Interactive Scrubbing (Desktop & Mobile Touch)
// -------------------------------------------------------------
function seekToPercent(percent) {
  const clamped = Math.max(0, Math.min(1, percent));
  const track = queue[currentTrackIndex];
  const total = (activePlaybackMode === 'file' && audioPlayer.duration) ? audioPlayer.duration : (track?.duration || 240);

  if (activePlaybackMode === 'file' && audioPlayer.duration) {
    audioPlayer.currentTime = clamped * total;
  } else {
    synthCurrentTime = Math.round(clamped * total);
  }
  updateProgressUI(clamped * total, total);
}

function handleProgressClick(e, container) {
  const rect = container.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const percent = (clientX - rect.left) / rect.width;
  seekToPercent(percent);
}

[progressContainer, mobileProgressContainer, mobileSheetProgressContainer].forEach(container => {
  if (!container) return;
  container.addEventListener('click', (e) => handleProgressClick(e, container));
  
  let isDragging = false;
  const startDrag = (e) => { isDragging = true; handleProgressClick(e, container); };
  const moveDrag = (e) => { if (isDragging) handleProgressClick(e, container); };
  const stopDrag = () => { isDragging = false; };

  container.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', moveDrag);
  window.addEventListener('mouseup', stopDrag);

  container.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove', moveDrag, { passive: true });
  window.addEventListener('touchend', stopDrag);
});

// -------------------------------------------------------------
// Volume Slider Controls
// -------------------------------------------------------------
function setVolume(volume) {
  const clamped = Math.max(0, Math.min(1, volume));
  audioPlayer.volume = clamped;
  savedVolume = clamped;
  localStorage.setItem('playerVolume', clamped);

  const percent = clamped * 100;
  if (volumeBar) volumeBar.style.width = `${percent}%`;
  if (mobileSheetVolumeBar) mobileSheetVolumeBar.style.width = `${percent}%`;

  if (btnMute) {
    const icon = btnMute.querySelector('i');
    if (icon) {
      if (clamped === 0) icon.setAttribute('data-lucide', 'volume-x');
      else if (clamped < 0.5) icon.setAttribute('data-lucide', 'volume-1');
      else icon.setAttribute('data-lucide', 'volume-2');
      lucide.createIcons();
    }
  }
}

function handleVolumeClick(e, container) {
  const rect = container.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const percent = (clientX - rect.left) / rect.width;
  setVolume(percent);
}

[volumeContainer, mobileSheetVolumeContainer].forEach(container => {
  if (!container) return;
  container.addEventListener('click', (e) => handleVolumeClick(e, container));
  
  let isDragging = false;
  const startDrag = (e) => { isDragging = true; handleVolumeClick(e, container); };
  const moveDrag = (e) => { if (isDragging) handleVolumeClick(e, container); };
  const stopDrag = () => { isDragging = false; };

  container.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', moveDrag);
  window.addEventListener('mouseup', stopDrag);

  container.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove', moveDrag, { passive: true });
  window.addEventListener('touchend', stopDrag);
});

// -------------------------------------------------------------
// Favorites Management (Persistent via LocalStorage + Supabase)
// -------------------------------------------------------------
function syncFavoriteState(songId) {
  const favs = JSON.parse(localStorage.getItem('favs') || '[]');
  const isFav = favs.includes(songId);

  [btnFav, btnMobileSheetFav].forEach(btn => {
    if (!btn) return;
    btn.classList.toggle('text-rose-500', isFav);
    btn.classList.toggle('text-gray-400', !isFav);
    const icon = btn.querySelector('i');
    if (icon) {
      if (isFav) icon.classList.add('fill-current');
      else icon.classList.remove('fill-current');
    }
  });
  lucide.createIcons();
}

function toggleFavorite() {
  const currentTrack = queue[currentTrackIndex];
  if (!currentTrack) return;
  const currentTrackId = currentTrack.id;

  let favs = JSON.parse(localStorage.getItem('favs') || '[]');
  const isFav = favs.includes(currentTrackId);

  if (isFav) {
    favs = favs.filter(id => id !== currentTrackId);
    if (supabaseClient) supabaseClient.from('favorites').delete().match({ device_id: deviceId, song_id: currentTrackId }).catch(()=>{});
  } else {
    favs.push(currentTrackId);
    if (supabaseClient) supabaseClient.from('favorites').insert([{ device_id: deviceId, song_id: currentTrackId }]).catch(()=>{});
  }
  
  localStorage.setItem('favs', JSON.stringify(favs));
  syncFavoriteState(currentTrackId);
}

// -------------------------------------------------------------
// Dynamic Sections & Category Renderers
// -------------------------------------------------------------
function getFilteredSongs() {
  let list = allSongs;
  if (activeCategoryFilter !== 'all') {
    list = list.filter(s => 
      (s.category && s.category.toLowerCase().includes(activeCategoryFilter.toLowerCase())) || 
      (s.artist && s.artist.toLowerCase().includes(activeCategoryFilter.toLowerCase())) ||
      (s.folder && s.folder.toLowerCase().includes(activeCategoryFilter.toLowerCase()))
    );
  }
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(s => 
      (s.title && s.title.toLowerCase().includes(q)) || 
      (s.artist && s.artist.toLowerCase().includes(q)) || 
      (s.album && s.album.toLowerCase().includes(q)) ||
      (s.category && s.category.toLowerCase().includes(q)) ||
      (s.folder && s.folder.toLowerCase().includes(q))
    );
  }
  return list;
}

function playCategory(categoryName, shuffle = false) {
  const categorySongs = allSongs.filter(s => 
    (s.category && s.category.toLowerCase().includes(categoryName.toLowerCase())) || 
    (s.folder && s.folder.toLowerCase().includes(categoryName.toLowerCase()))
  );
  if (categorySongs.length === 0) return;
  
  if (shuffle) {
    const randomIndex = Math.floor(Math.random() * categorySongs.length);
    playSongById(categorySongs[randomIndex].id);
  } else {
    playSongById(categorySongs[0].id);
  }
}

function renderMainSections() {
  const songs = getFilteredSongs();
  
  // When Searching
  if (searchQuery.trim() !== '') {
    dynamicSectionsEl.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-5 pb-2 border-b border-white/10">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold font-outfit text-white flex items-center gap-2">
              <i data-lucide="search" class="w-5 h-5 text-brand"></i> Search Results for "${searchQuery}"
            </h2>
            <p class="text-xs text-gray-400 mt-0.5">${songs.length} local & cached tracks, plus live Audius cloud search</p>
          </div>
          <button onclick="resetFilters()" class="text-xs text-brand hover:underline font-semibold flex items-center gap-1.5 bg-brand/10 hover:bg-brand/20 px-3 py-1.5 rounded-full border border-brand/30 transition">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Clear Search
          </button>
        </div>

        ${audiusSearchResults.length > 0 ? `
          <div class="mb-8">
            <div class="flex items-center gap-2 mb-3">
              <span class="badge-audius text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <i data-lucide="cloud-lightning" class="w-3.5 h-3.5 text-cyan-400"></i> LIVE AUDIUS CLOUD RESULTS (${audiusSearchResults.length})
              </span>
              <span class="text-xs text-gray-400">Instant full-length stream</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
              ${audiusSearchResults.map(song => renderSongCard(song)).join('')}
            </div>
          </div>
        ` : ''}

        ${songs.length > 0 ? `
          <div class="mb-6 sm:mb-8">
            <h3 class="text-base sm:text-lg font-outfit font-bold mb-3 text-white flex items-center gap-2">
              <i data-lucide="library" class="w-4 h-4 text-brand"></i> Library & Curated Matches (${songs.length})
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
              ${songs.map(song => renderSongCard(song)).join('')}
            </div>
          </div>
        ` : (audiusSearchResults.length === 0 ? `
          <div class="p-8 sm:p-12 text-center text-gray-400 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
            <i data-lucide="music" class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-gray-600"></i>
            <p class="text-base sm:text-lg font-semibold text-white">Searching online & library...</p>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">Type an artist name (e.g. Hillsong, Jazz, Worship) to stream</p>
          </div>
        ` : '')}
      </div>
    `;
    lucide.createIcons();
    return;
  }

  // When Filtering by Category (other than 'all')
  if (activeCategoryFilter !== 'all') {
    const catMeta = categoryMetadata[activeCategoryFilter] || {
      name: activeCategoryFilter,
      badge: "STREAMHUB PLAYLIST",
      tagline: "Curated Playlist & Audio Collection",
      description: `Explore all ${songs.length} tracks in this collection.`,
      heroImg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
      accentColor: "#8b5cf6",
      gradient: "from-purple-950/90 via-indigo-950/70 to-[#121212]",
      listeners: "Specialized Stream",
      songsCount: songs.length
    };

    dynamicSectionsEl.innerHTML = `
      <div>
        <div class="category-hero-banner relative rounded-2xl overflow-hidden mb-6 md:mb-8 border border-white/10 shadow-2xl min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex flex-col justify-end p-4 sm:p-6 md:p-8" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(18,18,18,0.85) 60%, #121212 100%), url('${catMeta.heroImg}'); background-size: cover; background-position: center;">
          <div class="relative z-10 max-w-3xl">
            <div class="flex items-center gap-2 mb-2 sm:mb-3">
              <span class="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full text-white bg-black/60 backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1">
                <i data-lucide="sparkles" class="w-3 h-3 text-yellow-400"></i> ${catMeta.badge}
              </span>
              <span class="text-xs text-gray-300 font-mono flex items-center gap-1">
                <i data-lucide="music" class="w-3 h-3 text-brand"></i> ${songs.length} Tracks
              </span>
            </div>
            <h1 class="text-2xl sm:text-3xl md:text-5xl font-outfit font-black tracking-tight text-white drop-shadow-lg mb-1 sm:mb-2">
              ${catMeta.name}
            </h1>
            <p class="text-xs sm:text-sm md:text-base font-semibold text-purple-200 drop-shadow mb-1 sm:mb-2">${catMeta.tagline}</p>
            <p class="text-xs md:text-sm text-gray-300 leading-relaxed drop-shadow line-clamp-2 max-w-2xl mb-4 sm:mb-6">${catMeta.description}</p>
            
            <div class="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button onclick="playCategory('${activeCategoryFilter}', false)" class="bg-brand hover:bg-brand-hover active:scale-95 text-white font-bold px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm rounded-full flex items-center gap-2 transition shadow-xl shadow-brand/40">
                <i data-lucide="play" class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current"></i> Play Collection
              </button>
              <button onclick="playCategory('${activeCategoryFilter}', true)" class="bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md text-white font-semibold px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-full flex items-center gap-2 transition border border-white/15">
                <i data-lucide="shuffle" class="w-3.5 h-3.5 sm:w-4 sm:h-4"></i> Shuffle
              </button>
              <button onclick="resetFilters()" class="text-xs text-gray-400 hover:text-white px-3 py-2 rounded-full transition flex items-center gap-1.5 hover:bg-white/5 ml-auto">
                <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back to All
              </button>
            </div>
          </div>
        </div>

        <div class="mb-6 sm:mb-8">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
            ${songs.map(song => renderSongCard(song)).join('')}
          </div>
        </div>

        <div class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden p-2 sm:p-4 shadow-xl">
          <div class="text-[11px] sm:text-xs text-gray-400 font-semibold px-3 sm:px-4 py-2 flex items-center border-b border-white/10 uppercase tracking-wider">
            <span class="w-6 sm:w-8">#</span>
            <span class="flex-1">Title & Artist</span>
            <span class="w-40 hidden md:block">Source / Category</span>
            <span class="w-14 sm:w-16 text-right">Time</span>
          </div>
          <div class="divide-y divide-white/5">
            ${songs.map((song, i) => renderSongRow(song, i + 1)).join('')}
          </div>
        </div>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  // Home View (All)
  const categoriesList = Object.keys(categoryMetadata);
  const spotlightCategory = categoryMetadata["Trending Online"];

  dynamicSectionsEl.innerHTML = `
    <!-- Top Spotlight Banner -->
    <div class="category-hero-banner relative rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-10 border border-white/10 shadow-2xl min-h-[240px] sm:min-h-[280px] md:min-h-[340px] flex flex-col justify-end p-4 sm:p-6 md:p-10" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(18,18,18,0.85) 50%, #121212 100%), url('${spotlightCategory.heroImg}'); background-size: cover; background-position: center 30%;">
      <div class="relative z-10 max-w-3xl">
        <div class="flex items-center gap-2 mb-2 sm:mb-3">
          <span class="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full text-white bg-gradient-to-r from-cyan-500 to-brand shadow-lg shadow-cyan-900/50 flex items-center gap-1">
            <i data-lucide="cloud-lightning" class="w-3.5 h-3.5 text-yellow-300"></i> LIVE AUDIUS PROTOCOL
          </span>
          <span class="text-xs text-cyan-200/90 font-medium">Full Songs • Instant Streaming</span>
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-5xl font-outfit font-black tracking-tight text-white drop-shadow-xl mb-1 sm:mb-2">
          ${spotlightCategory.name}
        </h1>
        <p class="text-xs sm:text-sm md:text-base font-semibold text-cyan-200 drop-shadow mb-1 sm:mb-2">${spotlightCategory.tagline}</p>
        <p class="text-xs md:text-sm text-gray-300 leading-relaxed drop-shadow line-clamp-2 max-w-2xl mb-4 sm:mb-6">${spotlightCategory.description}</p>
        
        <div class="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button onclick="playTrendingAudius()" class="bg-gradient-to-r from-brand to-cyan-500 hover:opacity-90 active:scale-95 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transition shadow-xl shadow-brand/40 text-xs sm:text-sm">
            <i data-lucide="play" class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current"></i> Stream Trending Hits
          </button>
          <button onclick="filterByCategory('Trending Online')" class="bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md text-white font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transition border border-white/15 text-xs sm:text-sm">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300"></i> View All Stream Tracks
          </button>
        </div>
      </div>
    </div>

    <!-- Category Grid Navigation -->
    <div class="mb-8 md:mb-12">
      <div class="flex items-center justify-between mb-3 sm:mb-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-outfit font-black text-white flex items-center gap-2">
            <i data-lucide="compass" class="w-5 h-5 text-brand"></i> Explore Cloud Stations & Collections
          </h2>
          <p class="text-[11px] sm:text-xs text-gray-400 mt-0.5">Select any station to load dynamic live streams</p>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
        ${categoriesList.slice(0, 6).map(catKey => {
          const meta = categoryMetadata[catKey];
          return `
            <div onclick="filterByCategory('${catKey}')" class="category-card-hover group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer h-28 sm:h-36 border border-white/10 shadow-lg" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.9) 100%), url('${meta.heroImg}'); background-size: cover; background-position: center;">
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-brand/20 transition-all duration-300"></div>
              <div class="absolute top-2 left-2">
                <span class="text-[7px] sm:text-[8px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-full text-white bg-black/60 backdrop-blur-md border border-white/10">
                  ${meta.badge}
                </span>
              </div>
              <div class="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between">
                <div class="overflow-hidden pr-1">
                  <span class="font-outfit font-bold text-[11px] sm:text-xs text-white block truncate drop-shadow group-hover:text-purple-200 transition">${meta.shortName}</span>
                  <span class="text-[9px] sm:text-[10px] text-gray-300 font-mono block mt-0.5">${meta.isOnline ? '⚡ Live Stream' : meta.songsCount + ' tracks'}</span>
                </div>
                <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-lg shrink-0">
                  <i data-lucide="play" class="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 fill-current ml-0.5"></i>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Category Sections -->
    <div class="space-y-8 md:space-y-12">
      <!-- 1. Audius Trending Section -->
      ${audiusTrendingTracks.length > 0 ? `
        <section class="space-y-3">
          <div class="flex items-end justify-between">
            <div>
              <h2 class="text-lg sm:text-xl font-outfit font-bold text-white hover:text-cyan-300 transition cursor-pointer flex items-center gap-1.5 group" onclick="filterByCategory('Trending Online')">
                <i data-lucide="flame" class="w-5 h-5 text-yellow-400 inline"></i>
                <span>Audius Global Trending</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-cyan-300 transition-transform group-hover:translate-x-1"></i>
              </h2>
              <div class="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                <span class="badge-audius text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <i data-lucide="cloud-lightning" class="w-3 h-3 text-cyan-400"></i> LIVE STREAM
                </span>
                <span>Top trending tracks on the decentralized protocol</span>
              </div>
            </div>
            <button onclick="filterByCategory('Trending Online')" class="text-xs text-gray-400 font-semibold hover:text-white hover:underline flex items-center gap-1">
              Show all (${audiusTrendingTracks.length}) <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </button>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
            ${audiusTrendingTracks.slice(0, 5).map(song => renderSongCard(song)).join('')}
          </div>
        </section>
      ` : ''}

      <!-- 2. Gospel & Worship Section -->
      ${(audiusGenreTracks["Gospel Stream"] && audiusGenreTracks["Gospel Stream"].length > 0) ? `
        <section class="space-y-3">
          <div class="flex items-end justify-between">
            <div>
              <h2 class="text-lg sm:text-xl font-outfit font-bold text-white hover:text-purple-300 transition cursor-pointer flex items-center gap-1.5 group" onclick="filterByCategory('Gospel Stream')">
                <i data-lucide="sparkles" class="w-5 h-5 text-purple-400 inline"></i>
                <span>Gospel & Worship Cloud</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-purple-300 transition-transform group-hover:translate-x-1"></i>
              </h2>
              <div class="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                <span class="text-[9px] sm:text-[10px] uppercase font-bold text-purple-400 bg-purple-950/70 border border-purple-500/30 px-2 py-0.5 rounded-full">WORSHIP CLOUD</span>
                <span>Live uplifting spiritual melodies</span>
              </div>
            </div>
            <button onclick="filterByCategory('Gospel Stream')" class="text-xs text-gray-400 font-semibold hover:text-white hover:underline flex items-center gap-1">
              Show all (${audiusGenreTracks["Gospel Stream"].length}) <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </button>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
            ${audiusGenreTracks["Gospel Stream"].slice(0, 5).map(song => renderSongCard(song)).join('')}
          </div>
        </section>
      ` : ''}

      <!-- 3. Local Curated Artists -->
      ${["Hillsong United", "Hillsong Worship", "Nathaniel Bassey", "Paul Baloche", "Ragtime", "Classical"].map(catKey => {
        const meta = categoryMetadata[catKey];
        if (!meta) return '';
        const sectionSongs = allSongs.filter(s => s.category === catKey || s.folder === meta.folder);
        if (sectionSongs.length === 0) return '';

        return `
          <section class="space-y-3">
            <div class="flex items-end justify-between">
              <div>
                <h2 class="text-lg sm:text-xl font-outfit font-bold text-white hover:text-brand transition cursor-pointer flex items-center gap-1.5 group" onclick="filterByCategory('${catKey}')">
                  <span>${meta.name}</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-brand transition-transform group-hover:translate-x-1"></i>
                </h2>
                <div class="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                  <span class="text-[9px] sm:text-[10px] uppercase font-bold text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-full">${meta.badge}</span>
                </div>
              </div>
              <button onclick="filterByCategory('${catKey}')" class="text-xs text-gray-400 font-semibold hover:text-white hover:underline flex items-center gap-1">
                Show all (${sectionSongs.length}) <i data-lucide="arrow-right" class="w-3 h-3"></i>
              </button>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
              ${sectionSongs.map(song => renderSongCard(song)).join('')}
            </div>
          </section>
        `;
      }).join('')}
    </div>
  `;

  lucide.createIcons();
}

function renderSongCard(song) {
  const isCurrent = String(queue[currentTrackIndex]?.id) === String(song.id);
  const isOnline = song.isAudius || (song.id && String(song.id).startsWith('audius_'));

  return `
    <div onclick="playSongById('${song.id}')" class="bg-white/5 hover:bg-white/10 active:scale-95 backdrop-blur-md border ${isCurrent ? 'border-brand shadow-[0_0_20px_rgba(139,92,246,0.35)]' : 'border-white/5'} transition-all duration-300 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl cursor-pointer group flex flex-col gap-2 shadow-lg">
      <div class="relative w-full aspect-square bg-surface-highlight rounded-lg sm:rounded-xl shadow-inner overflow-hidden">
        <img src="${song.img}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${song.title}" loading="lazy" />
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        ${isOnline ? `
          <div class="absolute top-1.5 left-1.5">
            <span class="badge-audius text-[8px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
              <i data-lucide="cloud-lightning" class="w-2.5 h-2.5 text-cyan-400"></i> Cloud
            </span>
          </div>
        ` : ''}

        <button class="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-2.5 bg-brand text-white rounded-full p-2.5 sm:p-3 ${isCurrent && isPlaying ? 'opacity-100' : 'opacity-90 sm:opacity-0 sm:group-hover:opacity-100'} hover:scale-110 transition-all shadow-[0_0_20px_rgba(139,92,246,0.7)] duration-300">
          <i data-lucide="${isCurrent && isPlaying ? 'pause' : 'play'}" class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ${isCurrent && isPlaying ? '' : 'ml-0.5'}"></i>
        </button>
      </div>
      <div class="flex flex-col overflow-hidden">
        <span class="font-outfit font-bold text-xs truncate tracking-wide text-white ${isCurrent ? 'text-brand font-extrabold' : ''}">${song.title}</span>
        <span class="text-[10px] sm:text-[11px] text-gray-400 truncate mt-0.5">${song.artist}</span>
      </div>
    </div>
  `;
}

function renderSongRow(song, index) {
  const isCurrent = String(queue[currentTrackIndex]?.id) === String(song.id);
  const isOnline = song.isAudius || (song.id && String(song.id).startsWith('audius_'));

  return `
    <div onclick="playSongById('${song.id}')" class="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-white/10 active:bg-white/15 cursor-pointer rounded-xl transition group ${isCurrent ? 'bg-brand/15 text-brand' : 'text-gray-200'}">
      <span class="w-6 sm:w-8 text-xs text-gray-400 group-hover:hidden">
        ${isCurrent && isPlaying ? `
          <div class="playing-equalizer">
            <span></span><span></span><span></span>
          </div>
        ` : index}
      </span>
      <span class="w-6 sm:w-8 text-xs text-white hidden group-hover:inline-block"><i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i></span>
      
      <div class="flex items-center gap-2.5 sm:gap-3 flex-1 overflow-hidden">
        <img src="${song.img}" class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-cover shrink-0 border border-white/10" alt="${song.title}" loading="lazy" />
        <div class="flex flex-col overflow-hidden pr-2">
          <div class="flex items-center gap-1.5 overflow-hidden">
            <span class="text-xs font-semibold truncate ${isCurrent ? 'text-brand font-bold' : 'text-white'}">${song.title}</span>
            ${isOnline ? `<span class="badge-audius text-[7px] font-bold px-1 py-0.2 rounded shrink-0">AUDIUS</span>` : ''}
          </div>
          <span class="text-[10px] text-gray-400 truncate">${song.artist}</span>
        </div>
      </div>
      
      <div class="w-40 hidden md:flex flex-col text-[11px] text-gray-400 truncate">
        <span>${song.album}</span>
        <span class="text-[9px] text-gray-500 font-mono truncate">${song.category}</span>
      </div>
      
      <span class="w-14 sm:w-16 text-right text-xs text-gray-400 font-mono">${formatTime(song.duration)}</span>
    </div>
  `;
}

// -------------------------------------------------------------
// Filters & Search Handlers
// -------------------------------------------------------------
function setupFilterChipListeners() {
  if (!categoryChips) return;
  categoryChips.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.querySelectorAll('.chip').forEach(c => {
        c.className = 'chip bg-surface-highlight hover:bg-gray-700 text-gray-200 text-xs font-semibold px-3.5 py-1.5 rounded-full transition active:scale-95 whitespace-nowrap';
      });
      chip.className = 'chip active bg-white text-black font-semibold text-xs px-3.5 py-1.5 rounded-full transition active:scale-95 whitespace-nowrap shadow';
      activeCategoryFilter = chip.dataset.filter;
      renderMainSections();
    });
  });
}

function filterByCategory(cat) {
  activeCategoryFilter = cat;
  if (categoryChips) {
    categoryChips.querySelectorAll('.chip').forEach(c => {
      if (c.dataset.filter.toLowerCase() === cat.toLowerCase()) {
        c.className = 'chip active bg-white text-black font-semibold text-xs px-3.5 py-1.5 rounded-full transition active:scale-95 whitespace-nowrap shadow';
        c.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        c.className = 'chip bg-surface-highlight hover:bg-gray-700 text-gray-200 text-xs font-semibold px-3.5 py-1.5 rounded-full transition active:scale-95 whitespace-nowrap';
      }
    });
  }
  renderMainSections();
}

function resetFilters() {
  activeCategoryFilter = 'all';
  searchQuery = '';
  if (searchInput) searchInput.value = '';
  if (searchClear) searchClear.classList.add('hidden');
  if (searchSpinner) searchSpinner.classList.add('hidden');
  const allChip = categoryChips?.querySelector('[data-filter="all"]');
  if (allChip) allChip.click();
  else renderMainSections();
}

function setupSearchListeners() {
  if (!searchInput) return;
  
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (searchQuery.trim() !== '') {
      if (searchClear) searchClear.classList.remove('hidden');
      if (searchSpinner) searchSpinner.classList.remove('hidden');

      // Debounce live Audius search
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(async () => {
        const results = await searchAudiusTracks(searchQuery, 15);
        audiusSearchResults = results;
        if (searchSpinner) searchSpinner.classList.add('hidden');
        renderMainSections();
      }, 350);
    } else {
      if (searchClear) searchClear.classList.add('hidden');
      if (searchSpinner) searchSpinner.classList.add('hidden');
      audiusSearchResults = [];
    }
    renderMainSections();
  });

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      audiusSearchResults = [];
      searchClear.classList.add('hidden');
      if (searchSpinner) searchSpinner.classList.add('hidden');
      renderMainSections();
    });
  }
}

function setGreeting() {
  if (!greetingEl) return;
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  greetingEl.innerText = greeting;
}

// -------------------------------------------------------------
// Sidebar Views
// -------------------------------------------------------------
function populateSidebar() {
  if (!sidebarPlaylistsEl) return;

  if (currentSidebarTab === 'playlists') {
    sidebarPlaylistsEl.innerHTML = playlistsData.map(p => `
      <div onclick="filterByCategory('${p.category}'); closeMobileSidebar();" class="group flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-white/10 cursor-pointer transition text-gray-300 hover:text-white">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-brand/20 flex items-center justify-center shrink-0 border border-white/5 transition">
            <i data-lucide="${p.isOnline ? 'cloud-lightning' : 'disc'}" class="w-4 h-4 ${p.isOnline ? 'text-cyan-400' : 'text-brand'}"></i>
          </div>
          <span class="text-xs font-medium truncate">${p.name}</span>
        </div>
        <span class="text-[10px] text-gray-500 group-hover:text-gray-300 font-mono">${p.count}</span>
      </div>
    `).join('');
  } else if (currentSidebarTab === 'artists') {
    sidebarPlaylistsEl.innerHTML = artistsData.map(a => `
      <div onclick="filterByCategory('${a.name}'); closeMobileSidebar();" class="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-white/10 cursor-pointer transition text-gray-300 hover:text-white">
        <img src="${a.img}" class="w-8 h-8 rounded-full object-cover shrink-0 border border-white/10 group-hover:border-brand transition" alt="${a.name}" />
        <div class="flex flex-col overflow-hidden">
          <span class="text-xs font-semibold truncate group-hover:text-white">${a.name}</span>
          <span class="text-[10px] text-gray-500">${a.songs} songs</span>
        </div>
      </div>
    `).join('');
  } else if (currentSidebarTab === 'folders') {
    sidebarPlaylistsEl.innerHTML = foldersData.map(f => `
      <div onclick="filterByCategory('${f.filter}'); closeMobileSidebar();" class="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/10 cursor-pointer transition text-gray-300 hover:text-white">
        <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
          <i data-lucide="${f.name.startsWith('cloud') ? 'cloud' : 'folder'}" class="w-4 h-4 ${f.name.startsWith('cloud') ? 'text-cyan-400' : 'text-yellow-500'}"></i>
        </div>
        <div class="flex flex-col overflow-hidden">
          <span class="text-xs font-medium truncate group-hover:text-white">${f.label}</span>
          <span class="text-[9px] text-gray-500 truncate font-mono">${f.name}</span>
        </div>
      </div>
    `).join('');
  }
  lucide.createIcons();
}

function setupSidebarTabListeners() {
  if (!sidebarFilterTabs) return;
  sidebarFilterTabs.querySelectorAll('.sidebar-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      sidebarFilterTabs.querySelectorAll('.sidebar-tab').forEach(t => {
        t.className = 'sidebar-tab text-xs bg-surface-highlight text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-1 rounded-full cursor-pointer transition whitespace-nowrap';
      });
      tab.className = 'sidebar-tab text-xs bg-brand text-white font-medium px-3 py-1 rounded-full cursor-pointer transition shadow-sm whitespace-nowrap';
      currentSidebarTab = tab.dataset.tab;
      populateSidebar();
    });
  });
}

function renderFeaturedGrid() {
  if (!featuredGridEl) return;
  featuredGridEl.innerHTML = featuredAlbums.map(album => `
    <div onclick="playSongById('${album.id}')" class="bg-white/5 hover:bg-white/10 active:scale-95 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-300 rounded-xl overflow-hidden flex items-center group cursor-pointer h-14 sm:h-16 shadow-md hover:shadow-[0_4px_20px_rgba(139,92,246,0.25)]">
      <img src="${album.img}" class="h-14 w-14 sm:h-16 sm:w-16 object-cover shrink-0 group-hover:scale-105 transition duration-500" alt="${album.title}" />
      <div class="flex flex-col px-2.5 sm:px-3 overflow-hidden">
        <span class="font-outfit font-bold text-[11px] sm:text-xs truncate text-white">${album.title}</span>
        <span class="text-[10px] sm:text-[11px] text-gray-400 truncate">${album.artist}</span>
      </div>
      <button class="ml-auto mr-2 sm:mr-3 bg-brand text-white rounded-full p-2 sm:p-2.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 transition-all shadow-[0_0_15px_rgba(139,92,246,0.6)] shrink-0">
        <i data-lucide="play" class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5"></i>
      </button>
    </div>
  `).join('');
  lucide.createIcons();
}

function setupLocalFileImport() {
  if (!musicFileInput) return;
  
  musicFileInput.addEventListener('change', event => {
    const supportedFiles = [...event.target.files].filter(file =>
      file.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(file.name)
    );

    if (!supportedFiles.length) return;

    const newSongs = supportedFiles.map(file => ({
      id: nextUploadedSongId++,
      title: file.name.replace(/\.[^/.]+$/, ''),
      artist: 'Local Library',
      album: 'Imported Music',
      category: 'Local Library',
      folder: 'Your Device',
      duration: 200,
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80',
      audioSrc: URL.createObjectURL(file),
      fallbackAudioSrc: 'music/Gospel/Hillsong_United/So Will I (100 Billion X).mp3',
      lyrics: 'Imported from your device storage.'
    }));

    uploadedSongs.push(...newSongs);
    allSongs.push(...newSongs);
    queue.push(...newSongs);
    renderLocalFilesSection();
    event.target.value = '';

    if (newSongs.length > 0) {
      playSongById(newSongs[0].id);
    }
  });
}

function renderLocalFilesSection() {
  if (!localFilesSection) return;

  localFilesSection.innerHTML = `
    <div class="flex items-end justify-between gap-4 mb-3 sm:mb-4">
      <div>
        <p class="text-[9px] sm:text-[10px] font-extrabold tracking-[0.16em] text-brand uppercase">Your Device</p>
        <h2 class="font-outfit text-xl sm:text-2xl font-black text-white">Local Music Library</h2>
        <p class="mt-0.5 text-xs text-gray-400">Play MP3, WAV, M4A, or FLAC files directly from your phone or PC.</p>
      </div>
      <button type="button" onclick="document.getElementById('music-file-input').click()" class="shrink-0 rounded-full bg-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-black transition hover:scale-105 active:scale-95">
        Add files
      </button>
    </div>
    ${uploadedSongs.length ? `
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
        ${uploadedSongs.map(song => renderSongCard(song)).join('')}
      </div>
    ` : `
      <button type="button" onclick="document.getElementById('music-file-input').click()" class="w-full rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-4 sm:px-6 py-6 sm:py-9 text-left transition hover:border-brand/60 hover:bg-brand/5 active:scale-[0.99]">
        <span class="mb-2.5 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-brand/15 text-brand"><i data-lucide="folder-plus" class="w-5 h-5"></i></span>
        <span class="block text-xs sm:text-sm font-bold text-white">Add songs from your device</span>
        <span class="mt-0.5 block text-[11px] sm:text-xs text-gray-400">Tap to select one or more audio files to play right now.</span>
      </button>
    `}
  `;
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
      album: track.album || 'StreamHub Cloud',
      artwork: [ { src: track.img, sizes: '512x512', type: 'image/jpeg' } ]
    });
  }
}

// -------------------------------------------------------------
// Global Event Listeners Wiring
// -------------------------------------------------------------
function setupEventListeners() {
  if (btnMobileMenu) btnMobileMenu.addEventListener('click', openMobileSidebar);
  if (btnCloseSidebar) btnCloseSidebar.addEventListener('click', closeMobileSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileSidebar);

  if (nowPlayingClickableArea) {
    nowPlayingClickableArea.addEventListener('click', (e) => {
      if (e.target.closest('#btn-fav')) return;
      if (window.innerWidth < 768) openMobilePlayerSheet();
    });
  }
  if (btnMobileExpand) btnMobileExpand.addEventListener('click', openMobilePlayerSheet);
  if (btnCloseMobileSheet) btnCloseMobileSheet.addEventListener('click', closeMobilePlayerSheet);

  if (btnPlay) btnPlay.addEventListener('click', () => togglePlay());
  if (btnNext) btnNext.addEventListener('click', playNext);
  if (btnPrev) btnPrev.addEventListener('click', playPrev);
  if (btnFav) btnFav.addEventListener('click', toggleFavorite);
  
  if (btnShuffle) {
    btnShuffle.addEventListener('click', () => {
      isShuffle = !isShuffle;
      btnShuffle.classList.toggle('text-brand', isShuffle);
      if (btnMobileSheetShuffle) btnMobileSheetShuffle.classList.toggle('text-brand', isShuffle);
    });
  }

  if (btnRepeat) {
    btnRepeat.addEventListener('click', () => {
      isRepeat = !isRepeat;
      btnRepeat.classList.toggle('text-brand', isRepeat);
      if (btnMobileSheetRepeat) btnMobileSheetRepeat.classList.toggle('text-brand', isRepeat);
    });
  }

  if (btnSpeed) {
    btnSpeed.addEventListener('click', () => {
      speedIndex = (speedIndex + 1) % playbackSpeeds.length;
      const speed = playbackSpeeds[speedIndex];
      audioPlayer.playbackRate = speed;
      btnSpeed.innerText = speed + 'x';
      if (btnMobileSheetSpeed) btnMobileSheetSpeed.innerText = speed + 'x';
    });
  }

  if (btnMute) {
    btnMute.addEventListener('click', () => {
      isMuted = !isMuted;
      if (isMuted) {
        previousVolume = audioPlayer.volume || 1.0;
        setVolume(0);
      } else {
        setVolume(previousVolume || 1.0);
      }
    });
  }

  if (btnMobilePlay) btnMobilePlay.addEventListener('click', () => togglePlay());
  if (btnMobileNext) btnMobileNext.addEventListener('click', playNext);
  if (btnMobileLyrics) btnMobileLyrics.addEventListener('click', toggleLyricsPanel);

  if (btnMobileSheetPlay) btnMobileSheetPlay.addEventListener('click', () => togglePlay());
  if (btnMobileSheetNext) btnMobileSheetNext.addEventListener('click', playNext);
  if (btnMobileSheetPrev) btnMobileSheetPrev.addEventListener('click', playPrev);
  if (btnMobileSheetFav) btnMobileSheetFav.addEventListener('click', toggleFavorite);
  
  if (btnMobileSheetShuffle) {
    btnMobileSheetShuffle.addEventListener('click', () => {
      isShuffle = !isShuffle;
      btnMobileSheetShuffle.classList.toggle('text-brand', isShuffle);
      if (btnShuffle) btnShuffle.classList.toggle('text-brand', isShuffle);
    });
  }

  if (btnMobileSheetRepeat) {
    btnMobileSheetRepeat.addEventListener('click', () => {
      isRepeat = !isRepeat;
      btnMobileSheetRepeat.classList.toggle('text-brand', isRepeat);
      if (btnRepeat) btnRepeat.classList.toggle('text-brand', isRepeat);
    });
  }

  if (btnMobileSheetSpeed) {
    btnMobileSheetSpeed.addEventListener('click', () => {
      speedIndex = (speedIndex + 1) % playbackSpeeds.length;
      const speed = playbackSpeeds[speedIndex];
      audioPlayer.playbackRate = speed;
      btnMobileSheetSpeed.innerText = speed + 'x';
      if (btnSpeed) btnSpeed.innerText = speed + 'x';
    });
  }

  if (btnMobileSheetLyrics) {
    btnMobileSheetLyrics.addEventListener('click', () => {
      closeMobilePlayerSheet();
      toggleLyricsPanel();
    });
  }

  if (btnLyrics) btnLyrics.addEventListener('click', toggleLyricsPanel);
  if (btnCloseLyrics) btnCloseLyrics.addEventListener('click', toggleLyricsPanel);

  // Shortcuts Modal Buttons
  const btnHeaderShortcuts = document.getElementById('btn-header-shortcuts');
  const btnPlayerShortcuts = document.getElementById('btn-player-shortcuts');
  const btnCloseShortcuts = document.getElementById('btn-close-shortcuts');
  const shortcutsModal = document.getElementById('shortcuts-modal');

  if (btnHeaderShortcuts) btnHeaderShortcuts.addEventListener('click', () => toggleShortcutsModal());
  if (btnPlayerShortcuts) btnPlayerShortcuts.addEventListener('click', () => toggleShortcutsModal());
  if (btnCloseShortcuts) btnCloseShortcuts.addEventListener('click', () => toggleShortcutsModal(false));
  if (shortcutsModal) {
    shortcutsModal.addEventListener('click', (e) => {
      if (e.target === shortcutsModal) toggleShortcutsModal(false);
    });
  }

  // Comprehensive Player Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    const isInputFocused = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';

    // Global escape works even in inputs
    if (e.key === 'Escape') {
      if (shortcutsModal && !shortcutsModal.classList.contains('hidden')) {
        toggleShortcutsModal(false);
        return;
      }
      if (isLyricsOpen) {
        toggleLyricsPanel();
        return;
      }
      if (isMobilePlayerSheetOpen) {
        closeMobilePlayerSheet();
        return;
      }
      if (isInputFocused) {
        e.target.blur();
        return;
      }
      if (searchQuery) {
        resetFilters();
        return;
      }
    }

    // Ignore other shortcuts when user is actively typing in a text field
    if (isInputFocused) return;

    // ? or Shift + / -> Shortcuts Cheatsheet
    if (e.key === '?' || (e.shiftKey && e.code === 'Slash')) {
      e.preventDefault();
      toggleShortcutsModal();
      return;
    }

    // / -> Focus live search
    if (e.key === '/' || e.code === 'Slash') {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        showShortcutToast('Search activated', 'search');
      }
      return;
    }

    // Space or k -> Play / Pause
    if (e.code === 'Space' || e.key === 'k' || e.key === 'K') {
      e.preventDefault();
      togglePlay();
      showShortcutToast(isPlaying ? 'Playing' : 'Paused', isPlaying ? 'play' : 'pause');
      return;
    }

    // l or Ctrl + ArrowRight -> Next Track
    if (e.key === 'l' || e.key === 'L' || (e.ctrlKey && e.code === 'ArrowRight')) {
      e.preventDefault();
      playNext();
      showShortcutToast('Next Track', 'skip-forward');
      return;
    }

    // j or Ctrl + ArrowLeft -> Previous Track
    if (e.key === 'j' || e.key === 'J' || (e.ctrlKey && e.code === 'ArrowLeft')) {
      e.preventDefault();
      playPrev();
      showShortcutToast('Previous Track', 'skip-back');
      return;
    }

    // ArrowUp or Shift + ArrowUp -> Volume +10%
    if (e.code === 'ArrowUp') {
      e.preventDefault();
      const newVol = Math.min(1.0, (audioPlayer.volume || 1.0) + 0.1);
      setVolume(newVol);
      showShortcutToast(`Volume: ${Math.round(newVol * 100)}%`, 'volume-2');
      return;
    }

    // ArrowDown or Shift + ArrowDown -> Volume -10%
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      const newVol = Math.max(0.0, (audioPlayer.volume || 1.0) - 0.1);
      setVolume(newVol);
      showShortcutToast(`Volume: ${Math.round(newVol * 100)}%`, newVol === 0 ? 'volume-x' : 'volume-1');
      return;
    }

    // m -> Mute / Unmute
    if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      isMuted = !isMuted;
      if (isMuted) {
        previousVolume = audioPlayer.volume || 1.0;
        setVolume(0);
        showShortcutToast('Muted', 'volume-x');
      } else {
        setVolume(previousVolume || 1.0);
        showShortcutToast(`Unmuted: ${Math.round((previousVolume || 1.0) * 100)}%`, 'volume-2');
      }
      return;
    }

    // s -> Shuffle
    if (e.key === 's' || e.key === 'S') {
      e.preventDefault();
      isShuffle = !isShuffle;
      if (btnShuffle) btnShuffle.classList.toggle('text-brand', isShuffle);
      if (btnMobileSheetShuffle) btnMobileSheetShuffle.classList.toggle('text-brand', isShuffle);
      showShortcutToast(`Shuffle: ${isShuffle ? 'ON' : 'OFF'}`, 'shuffle');
      return;
    }

    // r -> Repeat
    if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      isRepeat = !isRepeat;
      if (btnRepeat) btnRepeat.classList.toggle('text-brand', isRepeat);
      if (btnMobileSheetRepeat) btnMobileSheetRepeat.classList.toggle('text-brand', isRepeat);
      showShortcutToast(`Repeat: ${isRepeat ? 'ON' : 'OFF'}`, 'repeat');
      return;
    }

    // f -> Favorite
    if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFavorite();
      const currentTrack = queue[currentTrackIndex];
      const favs = JSON.parse(localStorage.getItem('favs') || '[]');
      const isFav = currentTrack ? favs.includes(currentTrack.id) : false;
      showShortcutToast(isFav ? 'Added to Favorites' : 'Removed from Favorites', 'heart');
      return;
    }

    // c or x -> Playback speed
    if (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X') {
      e.preventDefault();
      speedIndex = (speedIndex + 1) % playbackSpeeds.length;
      const speed = playbackSpeeds[speedIndex];
      audioPlayer.playbackRate = speed;
      if (btnSpeed) btnSpeed.innerText = speed + 'x';
      if (btnMobileSheetSpeed) btnMobileSheetSpeed.innerText = speed + 'x';
      showShortcutToast(`Playback Speed: ${speed}x`, 'gauge');
      return;
    }

    // h -> Lyrics panel
    if (e.key === 'h' || e.key === 'H') {
      e.preventDefault();
      toggleLyricsPanel();
      showShortcutToast(isLyricsOpen ? 'Lyrics Opened' : 'Lyrics Closed', 'mic-2');
      return;
    }
  });
}

let toastTimeout = null;
function showShortcutToast(message, iconName = 'info') {
  const toast = document.getElementById('shortcut-toast');
  const toastMsg = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');
  if (!toast || !toastMsg) return;

  toastMsg.innerText = message;
  if (toastIcon && iconName) {
    toastIcon.setAttribute('data-lucide', iconName);
    lucide.createIcons();
  }
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 1400);
}

function toggleShortcutsModal(forceOpen) {
  const modal = document.getElementById('shortcuts-modal');
  if (!modal) return;
  const isHidden = modal.classList.contains('hidden');
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : isHidden;
  if (shouldOpen) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  } else {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// -------------------------------------------------------------
// App Initialization
// -------------------------------------------------------------
async function init() {
  if (supabaseClient) {
    try {
      const { data: dbQueue } = await supabaseClient.from('queue').select('*');
      if (dbQueue && dbQueue.length > 0) {
        queue = dbQueue;
      }
    } catch (e) {
      console.warn("Supabase fetch notice. Using local enhanced queue.");
    }
  }

  setVolume(savedVolume);
  populateSidebar();
  renderFeaturedGrid();
  renderMainSections();
  renderLocalFilesSection();
  setGreeting();
  setupSidebarTabListeners();
  setupFilterChipListeners();
  setupSearchListeners();
  setupLocalFileImport();
  setupEventListeners();
  setupMediaSession();
  loadTrack(currentTrackIndex);
  lucide.createIcons();

  // Initialize Audius Protocol in background
  initAudiusService();
}

// Start StreamHub
init();
