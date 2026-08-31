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
// Category Metadata & Strong Hero Visuals
// -------------------------------------------------------------
const categoryMetadata = {
  "Hillsong United": {
    name: "Hillsong United & Worship",
    shortName: "Hillsong United",
    badge: "GLOBAL ANTHEM",
    tagline: "Atmospheric Arena Worship & Oceans of Faith",
    description: "Soaring guitars, heartfelt congregational devotion, and timeless anthems of faith that unite millions worldwide.",
    heroImg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80",
    accentColor: "#8b5cf6",
    gradient: "from-purple-900/90 via-indigo-950/70 to-[#121212]",
    listeners: "3.4M monthly listeners",
    songsCount: 5,
    folder: "music/Gospel/Hillsong_United"
  },
  "Tasha Cobbs": {
    name: "Tasha Cobbs Leonard",
    shortName: "Tasha Cobbs",
    badge: "GRAMMY® WINNER",
    tagline: "Powerhouse Gospel & Anointed Praise",
    description: "High-impact gospel anthems that break every chain with transcendent vocal resonance and glorious choir arrangements.",
    heroImg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80",
    accentColor: "#ec4899",
    gradient: "from-pink-950/90 via-rose-950/70 to-[#121212]",
    listeners: "2.1M monthly listeners",
    songsCount: 5,
    folder: "music/Gospel/Tasha_Cobbs"
  },
  "Elevation Worship": {
    name: "Elevation Worship",
    shortName: "Elevation Worship",
    badge: "ARENA LIVE",
    tagline: "Dynamic Stadium Praise & Faith Anthems",
    description: "Electrifying live worship recordings, vibrant energetic declarations, and unforgettable melodies transforming graves into gardens.",
    heroImg: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80",
    accentColor: "#06b6d4",
    gradient: "from-cyan-950/90 via-blue-950/70 to-[#121212]",
    listeners: "4.2M monthly listeners",
    songsCount: 5,
    folder: "music/Gospel/Elevation_Worship"
  },
  "Phil Thompson": {
    name: "Phil Thompson",
    shortName: "Phil Thompson",
    badge: "DEVOTIONAL",
    tagline: "Heartfelt Intimacy & Authentic Worship",
    description: "Deeply personal, acoustic-infused declarations of devotion and grace that usher listeners into peaceful reflection.",
    heroImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    accentColor: "#f97316",
    gradient: "from-amber-950/90 via-orange-950/70 to-[#121212]",
    listeners: "1.2M monthly listeners",
    songsCount: 5,
    folder: "music/Gospel/Phil_Thompson"
  },
  "Travis Greene": {
    name: "Travis Greene",
    shortName: "Travis Greene",
    badge: "CONTEMPORARY GOSPEL",
    tagline: "Bold Modern Sound & Energetic Praise",
    description: "Fusing contemporary brass, gospel roots, and explosive stage energy with infectious messages of triumph.",
    heroImg: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    accentColor: "#eab308",
    gradient: "from-yellow-950/90 via-amber-950/70 to-[#121212]",
    listeners: "1.5M monthly listeners",
    songsCount: 5,
    folder: "music/Gospel/Travis_Greene"
  },
  "CeCe Winans": {
    name: "CeCe Winans",
    shortName: "CeCe Winans",
    badge: "LIVING LEGEND",
    tagline: "Legendary Voice of Grace & Devotion",
    description: "Timeless gospel excellence and celestial harmonies from one of the most celebrated and decorated voices in music history.",
    heroImg: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    accentColor: "#10b981",
    gradient: "from-emerald-950/90 via-teal-950/70 to-[#121212]",
    listeners: "2.8M monthly listeners",
    songsCount: 5,
    folder: "music/Gospel/CeCe_Winans"
  },
  "Nathaniel Bassey": {
    name: "Nathaniel Bassey",
    shortName: "Nathaniel Bassey",
    badge: "SPIRITUAL PRAISE",
    tagline: "Sound of the Trumpet & High Praise",
    description: "Spiritual revival, trumpet fanfares, and deeply moving melodies of gratitude that awaken heartfelt devotion.",
    heroImg: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    accentColor: "#3b82f6",
    gradient: "from-blue-950/90 via-indigo-950/70 to-[#121212]",
    listeners: "1.9M monthly listeners",
    songsCount: 5,
    folder: "music/Gospel/Nathaniel_Bassey"
  },
  "Sinach": {
    name: "Sinach",
    shortName: "Sinach",
    badge: "GLOBAL WORSHIP",
    tagline: "Global Anthems of Faith & Victory",
    description: "World-renowned worship songwriter behind transformative anthems sung in hundreds of languages across the globe.",
    heroImg: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    accentColor: "#a855f7",
    gradient: "from-purple-950/90 via-violet-950/70 to-[#121212]",
    listeners: "2.5M monthly listeners",
    songsCount: 5,
    folder: "music/Gospel/Sinach"
  },
  "Mercy Chinwo": {
    name: "Mercy Chinwo",
    shortName: "Mercy Chinwo",
    badge: "AFRO GOSPEL",
    tagline: "Radiant Afro-Gospel & Celebration",
    description: "Joyous rhythms, infectious celebratory grooves, and passionate praise full of rich African cultural vibrancy.",
    heroImg: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    accentColor: "#f43f5e",
    gradient: "from-rose-950/90 via-pink-950/70 to-[#121212]",
    listeners: "1.7M monthly listeners",
    songsCount: 5,
    folder: "music/Gospel/Mercy_Chinwo"
  },
  "Don Moen": {
    name: "Don Moen",
    shortName: "Don Moen",
    badge: "PEACE & WORSHIP",
    tagline: "Peaceful Reflections & Timeless Hymns",
    description: "Gentle piano compositions, comforting acoustic melodies, and inspirational arrangements of hope for every soul.",
    heroImg: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    accentColor: "#fbbf24",
    gradient: "from-amber-950/90 via-yellow-950/70 to-[#121212]",
    listeners: "1.4M monthly listeners",
    songsCount: 5,
    folder: "music/Gospel/Don_Moen"
  },
  "Gospel Jazz": {
    name: "Gospel Jazz Café",
    shortName: "Gospel Jazz",
    badge: "JAZZ LOUNGE",
    tagline: "Velvet Saxophone, Smooth Grooves & Ambient Keys",
    description: "Warm candlelit lounge ambiance, golden brass improvisation, and soulful reharmonized spiritual melodies.",
    heroImg: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    accentColor: "#d97706",
    gradient: "from-amber-950/90 via-yellow-950/70 to-[#121212]",
    listeners: "950K monthly listeners",
    songsCount: 5,
    folder: "music/Jazz/Gospel_Jazz"
  },
  "Blues Devotional": {
    name: "Delta Blues Devotional",
    shortName: "Blues Devotional",
    badge: "ROOTS & BLUES",
    tagline: "Raw Acoustic Resonator & Deep Southern Soul",
    description: "Rustic resonator slide guitar, raw harmonica notes, and heartfelt southern blues ballads filled with spiritual emotion.",
    heroImg: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=300&q=80",
    accentColor: "#b45309",
    gradient: "from-amber-950/90 via-orange-950/70 to-[#121212]",
    listeners: "680K monthly listeners",
    songsCount: 5,
    folder: "music/Blues/Gospel_Blues"
  },
  "Classical Worship": {
    name: "Classical Symphony Worship",
    shortName: "Classical Worship",
    badge: "PHILHARMONIC",
    tagline: "Grand Philharmonic Symphony & Majestic Strings",
    description: "Awe-inspiring orchestral arrangements, lush concert violins, and grand piano concertos recorded in historic acoustic halls.",
    heroImg: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=300&q=80",
    accentColor: "#6366f1",
    gradient: "from-indigo-950/90 via-slate-950/70 to-[#121212]",
    listeners: "1.1M monthly listeners",
    songsCount: 5,
    folder: "music/Classical/Symphony_Worship"
  },
  "RnB Worship": {
    name: "RnB Soul Sanctuary",
    shortName: "RnB Worship",
    badge: "NEO-SOUL & RNB",
    tagline: "Smooth Soul, Neo-Gospel & Midnight Harmonies",
    description: "Warm vintage Rhodes keys, lush vocal stacks, contemporary 808 rhythms, and deep neo-soul devotional grooves.",
    heroImg: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=80",
    avatarImg: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=300&q=80",
    accentColor: "#ec4899",
    gradient: "from-pink-950/90 via-purple-950/70 to-[#121212]",
    listeners: "1.3M monthly listeners",
    songsCount: 5,
    folder: "music/RnB/RnB_Gospel"
  }
};

// -------------------------------------------------------------
// Comprehensive Song Catalog (70 Songs)
// -------------------------------------------------------------
const allSongs = [
  // 1. Hillsong United
  {
    id: 1,
    title: "Oceans (Where Feet May Fail)",
    artist: "Hillsong United",
    album: "Zion",
    category: "Hillsong United",
    folder: "music/Gospel/Hillsong_United",
    duration: 538,
    img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "You call me out upon the waters<br/>The great unknown where feet may fail<br/>And there I find You in the mystery<br/>In oceans deep, my faith will stand<br/><br/>(Chorus)<br/>And I will call upon Your name<br/>And keep my eyes above the waves<br/>When oceans rise, my soul will rest in Your embrace<br/>For I am Yours and You are mine"
  },
  {
    id: 2,
    title: "So Will I (100 Billion X)",
    artist: "Hillsong United",
    album: "Empires / Wonder",
    category: "Hillsong United",
    folder: "music/Gospel/Hillsong_United",
    duration: 428,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "God of creation, there at the start<br/>Before the beginning of time<br/>With no point of reference, You spoke to the dark<br/>And fleshed out the wonder of light<br/><br/>(Chorus)<br/>And as You speak<br/>A hundred billion galaxies are born<br/>In the vapour of Your breath the planets form<br/>If the stars were made to worship so will I"
  },
  {
    id: 3,
    title: "Touch of Heaven",
    artist: "Hillsong Worship",
    album: "There Is More",
    category: "Hillsong United",
    folder: "music/Gospel/Hillsong_United",
    duration: 427,
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "How I live for the moments where I'm still in Your presence<br/>All the noise dies down<br/>Lord, speak to me now<br/><br/>(Chorus)<br/>All I want is just a touch of Heaven<br/>Just a moment in Your embrace"
  },
  {
    id: 4,
    title: "What A Beautiful Name",
    artist: "Hillsong Worship",
    album: "Let There Be Light",
    category: "Hillsong United",
    folder: "music/Gospel/Hillsong_United",
    duration: 341,
    img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "You were the Word at the beginning<br/>One with God the Lord Most High<br/>Your hidden glory in creation<br/>Now revealed in You our Christ<br/><br/>(Chorus)<br/>What a beautiful Name it is<br/>What a beautiful Name it is<br/>The Name of Jesus Christ my King"
  },
  {
    id: 5,
    title: "Good Grace",
    artist: "Hillsong United",
    album: "People",
    category: "Hillsong United",
    folder: "music/Gospel/Hillsong_United",
    duration: 358,
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    lyrics: "People come together<br/>Strange as neighbours, our souls feel like friends<br/>We've got one hope, one foundation<br/><br/>(Chorus)<br/>Don't let your heart be troubled<br/>Hold your head up high, don't fear no evil<br/>God is so good, His grace is enough!"
  },

  // 2. Tasha Cobbs
  {
    id: 6,
    title: "Break Every Chain",
    artist: "Tasha Cobbs",
    album: "Grace",
    category: "Tasha Cobbs",
    folder: "music/Gospel/Tasha_Cobbs",
    duration: 485,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "There is power in the name of Jesus<br/>To break every chain, break every chain, break every chain!"
  },
  {
    id: 7,
    title: "You Know My Name",
    artist: "Tasha Cobbs",
    album: "Heart. Passion. Pursuit.",
    category: "Tasha Cobbs",
    folder: "music/Gospel/Tasha_Cobbs",
    duration: 524,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "He knows my name, He knows my name<br/>And oh how He walks with me, and oh how He talks with me!"
  },
  {
    id: 8,
    title: "For Your Glory",
    artist: "Tasha Cobbs",
    album: "Grace",
    category: "Tasha Cobbs",
    folder: "music/Gospel/Tasha_Cobbs",
    duration: 400,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "Lord, if I find favor in Your sight<br/>For Your glory, I will do anything<br/>Just to see You, to behold You as my King!"
  },
  {
    id: 9,
    title: "Fill Me Up / Overflow",
    artist: "Tasha Cobbs",
    album: "One Place Live",
    category: "Tasha Cobbs",
    folder: "music/Gospel/Tasha_Cobbs",
    duration: 354,
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "You provide the fire, I'll provide the sacrifice<br/>Fill me up God, fill me up God!"
  },
  {
    id: 10,
    title: "In Spite of Me (feat. Ciara)",
    artist: "Tasha Cobbs",
    album: "Royalty: Live at The Ryman",
    category: "Tasha Cobbs",
    folder: "music/Gospel/Tasha_Cobbs",
    duration: 266,
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "Every time I look back over my life<br/>All I can see is Your mercy and grace<br/>Loving me, in spite of me!"
  },

  // 3. Elevation Worship
  {
    id: 11,
    title: "Graves Into Gardens",
    artist: "Elevation Worship",
    album: "Graves Into Gardens",
    category: "Elevation Worship",
    folder: "music/Gospel/Elevation_Worship",
    duration: 452,
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "You turn mourning to dancing<br/>You give beauty for ashes<br/>You turn shame into glory<br/>You turn graves into gardens!"
  },
  {
    id: 12,
    title: "The Blessing (Live)",
    artist: "Elevation Worship",
    album: "Graves Into Gardens",
    category: "Elevation Worship",
    folder: "music/Gospel/Elevation_Worship",
    duration: 507,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    lyrics: "The Lord bless you and keep you<br/>Make His face shine upon you and be gracious to you<br/>Amen, amen, amen!"
  },
  {
    id: 13,
    title: "Jireh (feat. Maverick City)",
    artist: "Elevation Worship",
    album: "Old Church Basement",
    category: "Elevation Worship",
    folder: "music/Gospel/Elevation_Worship",
    duration: 590,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "Jireh, You are enough<br/>And I will be content in every circumstance<br/>Jireh, You are enough!"
  },
  {
    id: 14,
    title: "RATTLE!",
    artist: "Elevation Worship",
    album: "Graves Into Gardens",
    category: "Elevation Worship",
    folder: "music/Gospel/Elevation_Worship",
    duration: 453,
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "This is the sound of dry bones rattling!<br/>This is the praise make a dead man walk again<br/>Open the graves, I'm coming out!"
  },
  {
    id: 15,
    title: "Praise (feat. Brandon Lake)",
    artist: "Elevation Worship",
    album: "CAN YOU IMAGINE?",
    category: "Elevation Worship",
    folder: "music/Gospel/Elevation_Worship",
    duration: 312,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    lyrics: "Let everything that has breath praise the Lord!<br/>I'll praise in the valley, praise on the mountain!"
  },

  // 4. Phil Thompson
  {
    id: 16,
    title: "My Worship",
    artist: "Phil Thompson",
    album: "My Worship",
    category: "Phil Thompson",
    folder: "music/Gospel/Phil_Thompson",
    duration: 615,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "Here is my worship, all of my worship<br/>Receive my worship, all of my worship<br/>As long as I am breathing, I will not keep silent!"
  },
  {
    id: 17,
    title: "Atmosphere Shift",
    artist: "Phil Thompson",
    album: "My Worship",
    category: "Phil Thompson",
    folder: "music/Gospel/Phil_Thompson",
    duration: 344,
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    lyrics: "Atmosphere shift now, chains be broken<br/>Holy Spirit come, overflow this place!"
  },
  {
    id: 18,
    title: "Lion of Judah",
    artist: "Phil Thompson",
    album: "Lion of Judah",
    category: "Phil Thompson",
    folder: "music/Gospel/Phil_Thompson",
    duration: 380,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "The Lion of Judah has conquered the grave<br/>He is high and lifted up!"
  },
  {
    id: 19,
    title: "Jesus",
    artist: "Phil Thompson",
    album: "My Worship",
    category: "Phil Thompson",
    folder: "music/Gospel/Phil_Thompson",
    duration: 322,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "Jesus, Jesus, sweetest name I know<br/>Fills my every longing, keeps me singing as I go!"
  },
  {
    id: 20,
    title: "You Ransom Me",
    artist: "Phil Thompson",
    album: "Lion of Judah",
    category: "Phil Thompson",
    folder: "music/Gospel/Phil_Thompson",
    duration: 350,
    img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "You paid the ultimate price for my freedom<br/>You ransom me, You rescued me!"
  },

  // 5. Travis Greene
  {
    id: 21,
    title: "Made A Way",
    artist: "Travis Greene",
    album: "The Hill",
    category: "Travis Greene",
    folder: "music/Gospel/Travis_Greene",
    duration: 595,
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "You made a way when our backs were against the wall<br/>And we're standing here only because You made a way!"
  },
  {
    id: 22,
    title: "Intentional",
    artist: "Travis Greene",
    album: "The Hill",
    category: "Travis Greene",
    folder: "music/Gospel/Travis_Greene",
    duration: 315,
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "All things are working for my good<br/>He's intentional, never failing!"
  },
  {
    id: 23,
    title: "You Waited",
    artist: "Travis Greene",
    album: "Crossover",
    category: "Travis Greene",
    folder: "music/Gospel/Travis_Greene",
    duration: 408,
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    lyrics: "When I was far away, You waited for me<br/>When I was lost in sin, You called my name!"
  },
  {
    id: 24,
    title: "Won't Let Go",
    artist: "Travis Greene",
    album: "Broken Record",
    category: "Travis Greene",
    folder: "music/Gospel/Travis_Greene",
    duration: 324,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    lyrics: "Your love won't let go, Your hands won't let go<br/>Even in the fire, even in the flood!"
  },
  {
    id: 25,
    title: "Good & Loved",
    artist: "Travis Greene",
    album: "Broken Record",
    category: "Travis Greene",
    folder: "music/Gospel/Travis_Greene",
    duration: 385,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "I am good and loved, You are kind and true<br/>My soul will rest securely in You!"
  },

  // 6. CeCe Winans
  {
    id: 26,
    title: "Goodness of God",
    artist: "CeCe Winans",
    album: "Believe For It",
    category: "CeCe Winans",
    folder: "music/Gospel/CeCe_Winans",
    duration: 300,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "'Cause all my life You have been faithful<br/>And all my life You have been so, so good<br/>With every breath that I am able<br/>Oh, I will sing of the goodness of God!"
  },
  {
    id: 27,
    title: "Believe For It",
    artist: "CeCe Winans",
    album: "Believe For It",
    category: "CeCe Winans",
    folder: "music/Gospel/CeCe_Winans",
    duration: 242,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "Move the impossible, break every chain<br/>I will believe for it!"
  },
  {
    id: 28,
    title: "Alabaster Box",
    artist: "CeCe Winans",
    album: "Alabaster Box",
    category: "CeCe Winans",
    folder: "music/Gospel/CeCe_Winans",
    duration: 336,
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "And you don't know the cost of the oil in my alabaster box!"
  },
  {
    id: 29,
    title: "Mercy Said No",
    artist: "CeCe Winans",
    album: "Throne Room",
    category: "CeCe Winans",
    folder: "music/Gospel/CeCe_Winans",
    duration: 290,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "Sin had demanded my soul, but mercy said no<br/>I am not gonna let you go!"
  },
  {
    id: 30,
    title: "That's My King",
    artist: "CeCe Winans",
    album: "More Than This",
    category: "CeCe Winans",
    folder: "music/Gospel/CeCe_Winans",
    duration: 284,
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    lyrics: "He's the Lion and the Lamb, the Alpha and Omega<br/>That's my King, that's my Lord!"
  },

  // 7. Nathaniel Bassey
  {
    id: 31,
    title: "Yahweh Sabaoth",
    artist: "Nathaniel Bassey",
    album: "Hallelujah Live",
    category: "Nathaniel Bassey",
    folder: "music/Gospel/Nathaniel_Bassey",
    duration: 326,
    img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "The Lord of Hosts is with us, Yahweh Sabaoth!<br/>High praise and blessings to the Most High!"
  },
  {
    id: 32,
    title: "Olowogbogboro",
    artist: "Nathaniel Bassey",
    album: "Jesus: The Resurrection",
    category: "Nathaniel Bassey",
    folder: "music/Gospel/Nathaniel_Bassey",
    duration: 370,
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "Olowogbogboro is turning things around for my good!<br/>The outstretched arm of God is working for me!"
  },
  {
    id: 33,
    title: "Tobechukwu",
    artist: "Nathaniel Bassey & Mercy Chinwo",
    album: "Hallelujah Live",
    category: "Nathaniel Bassey",
    folder: "music/Gospel/Nathaniel_Bassey",
    duration: 410,
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    lyrics: "See how far He brought us, see what God has done<br/>Tobechukwu, praise the Lord for His loving kindness!"
  },
  {
    id: 34,
    title: "Onise Iyanu (Awesome Wonder)",
    artist: "Nathaniel Bassey",
    album: "This God is Too Good",
    category: "Nathaniel Bassey",
    folder: "music/Gospel/Nathaniel_Bassey",
    duration: 385,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    lyrics: "Onise Iyanu, You are the God of awesome wonders<br/>I've tasted of Your power!"
  },
  {
    id: 35,
    title: "The King Is On The Way",
    artist: "Nathaniel Bassey",
    album: "Names of God",
    category: "Nathaniel Bassey",
    folder: "music/Gospel/Nathaniel_Bassey",
    duration: 340,
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "Prepare the way of the Lord<br/>The King of glory is on the way!"
  },

  // 8. Sinach
  {
    id: 36,
    title: "Way Maker - Live",
    artist: "Sinach",
    album: "Way Maker",
    category: "Sinach",
    folder: "music/Gospel/Sinach",
    duration: 312,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Sinach/Way Maker Devotion.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "Way Maker, Miracle Worker, Promise Keeper<br/>Light in the darkness, my God, that is who You are!"
  },
  {
    id: 37,
    title: "I Know Who I Am",
    artist: "Sinach",
    album: "Shout It Loud",
    category: "Sinach",
    folder: "music/Gospel/Sinach",
    duration: 320,
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Sinach/Way Maker Devotion.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "We are a chosen generation<br/>Called forth to show His excellence<br/>I know who I am!"
  },
  {
    id: 38,
    title: "Great Are You Lord",
    artist: "Sinach",
    album: "The Name of Jesus",
    category: "Sinach",
    folder: "music/Gospel/Sinach",
    duration: 360,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Sinach/Way Maker Devotion.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    lyrics: "Holy are You Lord, all creation calls You God<br/>Great are You Lord!"
  },
  {
    id: 39,
    title: "He Did It Again",
    artist: "Sinach",
    album: "Greatest Hits",
    category: "Sinach",
    folder: "music/Gospel/Sinach",
    duration: 290,
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Sinach/Way Maker Devotion.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    lyrics: "I testify that God is good, He did it again!"
  },
  {
    id: 40,
    title: "There's An Overflow",
    artist: "Sinach",
    album: "There's An Overflow",
    category: "Sinach",
    folder: "music/Gospel/Sinach",
    duration: 315,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Sinach/Way Maker Devotion.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "There is an overflow of blessings, overflow of grace!"
  },

  // 9. Mercy Chinwo
  {
    id: 41,
    title: "Excess Love",
    artist: "Mercy Chinwo",
    album: "The Cross: My Gaze",
    category: "Mercy Chinwo",
    folder: "music/Gospel/Mercy_Chinwo",
    duration: 345,
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "Jesus, You love me too much o<br/>Too much o, excess love o!"
  },
  {
    id: 42,
    title: "Chinedum",
    artist: "Mercy Chinwo",
    album: "The Cross: My Gaze",
    category: "Mercy Chinwo",
    folder: "music/Gospel/Mercy_Chinwo",
    duration: 260,
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "Chinedum, God is leading me<br/>Anywhere You lead, I will follow!"
  },
  {
    id: 43,
    title: "Obinasom",
    artist: "Mercy Chinwo",
    album: "Satisfied",
    category: "Mercy Chinwo",
    folder: "music/Gospel/Mercy_Chinwo",
    duration: 245,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    lyrics: "My heart is happy, Obinasom<br/>See the love that Jesus has given me!"
  },
  {
    id: 44,
    title: "Na You Dey Reign",
    artist: "Mercy Chinwo",
    album: "Satisfied",
    category: "Mercy Chinwo",
    folder: "music/Gospel/Mercy_Chinwo",
    duration: 320,
    img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "Na You dey reign forevermore, King of Kings!"
  },
  {
    id: 45,
    title: "Amazing God",
    artist: "Mercy Chinwo",
    album: "Overwhelming Victory",
    category: "Mercy Chinwo",
    folder: "music/Gospel/Mercy_Chinwo",
    duration: 298,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    lyrics: "You are an amazing God, miracle worker, faithful friend!"
  },

  // 10. Don Moen
  {
    id: 46,
    title: "God Will Make A Way",
    artist: "Don Moen",
    album: "God Will Make A Way",
    category: "Don Moen",
    folder: "music/Gospel/Don_Moen",
    duration: 280,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    lyrics: "God will make a way where there seems to be no way<br/>He works in ways we cannot see, He will make a way for me!"
  },
  {
    id: 47,
    title: "Give Thanks",
    artist: "Don Moen",
    album: "Give Thanks",
    category: "Don Moen",
    folder: "music/Gospel/Don_Moen",
    duration: 240,
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    lyrics: "Give thanks with a grateful heart, give thanks to the Holy One!"
  },
  {
    id: 48,
    title: "Thank You Lord",
    artist: "Don Moen",
    album: "Thank You Lord",
    category: "Don Moen",
    folder: "music/Gospel/Don_Moen",
    duration: 310,
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "Thank You Lord for the trials that come my way<br/>In that way I can see Your power!"
  },
  {
    id: 49,
    title: "I Will Sing",
    artist: "Don Moen",
    album: "I Will Sing",
    category: "Don Moen",
    folder: "music/Gospel/Don_Moen",
    duration: 295,
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "Lord You seem so far away, a million miles or more it feels today<br/>Yet I will sing of Your steadfast love!"
  },
  {
    id: 50,
    title: "Our Father",
    artist: "Don Moen",
    album: "Praise & Worship",
    category: "Don Moen",
    folder: "music/Gospel/Don_Moen",
    duration: 330,
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "Our Father in heaven, hallowed be Your name<br/>Your kingdom come, Your will be done!"
  },

  // 11. Gospel Jazz
  {
    id: 51,
    title: "Black Bottom Stomp Jazz Session",
    artist: "Jelly Roll Morton",
    album: "Classic Jazz Gems",
    category: "Gospel Jazz",
    folder: "music/Jazz/Gospel_Jazz",
    duration: 195,
    img: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Jazz/Jelly Roll Morton Black Bottom Stomp.mp3",
    fallbackAudioSrc: "music/Jazz/Jelly Roll Morton Black Bottom Stomp.mp3",
    lyrics: "Smooth instrumental jazz with lively syncopation and rich brass horns."
  },
  {
    id: 52,
    title: "Midnight Gospel Saxophone",
    artist: "Gospel Jazz Quartet",
    album: "Velvet Sanctuary",
    category: "Gospel Jazz",
    folder: "music/Jazz/Gospel_Jazz",
    duration: 240,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Jazz/Jelly Roll Morton Black Bottom Stomp.mp3",
    fallbackAudioSrc: "music/RnB/Rhythm and Blues Classic.mp3",
    lyrics: "Soothing saxophone notes over warm Rhodes piano chords."
  },
  {
    id: 53,
    title: "Soulful Brass Improvisation",
    artist: "Blue Horizon Brass",
    album: "New Orleans Praise",
    category: "Gospel Jazz",
    folder: "music/Jazz/Gospel_Jazz",
    duration: 210,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Jazz/Jelly Roll Morton Black Bottom Stomp.mp3",
    fallbackAudioSrc: "music/Blues/Memphis Blues.mp3",
    lyrics: "Improvisational jazz horn lines and spiritual rhythmic swing."
  },
  {
    id: 54,
    title: "Ambient Keys & Sunday Morning",
    artist: "Quiet Waters Trio",
    album: "Acoustic Lounge",
    category: "Gospel Jazz",
    folder: "music/Jazz/Gospel_Jazz",
    duration: 275,
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Jazz/Jelly Roll Morton Black Bottom Stomp.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    lyrics: "Gentle upright bass and brush drums ushering in a peaceful morning."
  },
  {
    id: 55,
    title: "Café Devotion Grooves",
    artist: "Harbor Light Collective",
    album: "Jazz at Twilight",
    category: "Gospel Jazz",
    folder: "music/Jazz/Gospel_Jazz",
    duration: 230,
    img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Jazz/Jelly Roll Morton Black Bottom Stomp.mp3",
    fallbackAudioSrc: "music/RnB/Rhythm and Blues Classic.mp3",
    lyrics: "Rich harmony changes with mellow guitar fingerpicking and jazz piano."
  },

  // 12. Blues Devotional
  {
    id: 56,
    title: "Memphis Blues Devotion",
    artist: "Delta Blues Ensemble",
    album: "Southern Heritage",
    category: "Blues Devotional",
    folder: "music/Blues/Gospel_Blues",
    duration: 188,
    img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Blues/Memphis Blues.mp3",
    fallbackAudioSrc: "music/Blues/Memphis Blues.mp3",
    lyrics: "Raw resonator slide guitar and Mississippi delta acoustic blues."
  },
  {
    id: 57,
    title: "Crossroads Gospel Slide",
    artist: "Old River Band",
    album: "Dusty Roads",
    category: "Blues Devotional",
    folder: "music/Blues/Gospel_Blues",
    duration: 215,
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Blues/Memphis Blues.mp3",
    fallbackAudioSrc: "music/RnB/Rhythm and Blues Classic.mp3",
    lyrics: "Acoustic harmonica and slide guitar testifying of redemption."
  },
  {
    id: 58,
    title: "Muddy River Spiritual",
    artist: "Bayou Bluesmen",
    album: "Deep Roots",
    category: "Blues Devotional",
    folder: "music/Blues/Gospel_Blues",
    duration: 240,
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Blues/Memphis Blues.mp3",
    fallbackAudioSrc: "music/Jazz/Jelly Roll Morton Black Bottom Stomp.mp3",
    lyrics: "Soul-stirring southern blues spiritual sung with raw passion."
  },
  {
    id: 59,
    title: "Morning Sun Blues",
    artist: "Cedar Hill Blues",
    album: "Sunday Reverie",
    category: "Blues Devotional",
    folder: "music/Blues/Gospel_Blues",
    duration: 195,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Blues/Memphis Blues.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "Warm acoustic fingerstyle picking and comforting blues rhythms."
  },
  {
    id: 60,
    title: "Precious Grace Ballad",
    artist: "Delta Blues Ensemble",
    album: "Southern Heritage",
    category: "Blues Devotional",
    folder: "music/Blues/Gospel_Blues",
    duration: 220,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Blues/Memphis Blues.mp3",
    fallbackAudioSrc: "music/Blues/Memphis Blues.mp3",
    lyrics: "Heartfelt acoustic ballad celebrating grace through all trials."
  },

  // 13. Classical Worship
  {
    id: 61,
    title: "Philharmonic Praise & Strings",
    artist: "Symphony of Praise Orchestra",
    album: "Cathedral Strings",
    category: "Classical Worship",
    folder: "music/Classical/Symphony_Worship",
    duration: 360,
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    lyrics: "Majestic concert orchestra featuring grand violins, cellos, and brass fanfares."
  },
  {
    id: 62,
    title: "Sanctuary Grand Piano Concerto",
    artist: "London Worship Philharmonic",
    album: "Acoustic Halls",
    category: "Classical Worship",
    folder: "music/Classical/Symphony_Worship",
    duration: 410,
    img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "Grand piano soloist performing soaring spiritual melodies with full strings."
  },
  {
    id: 63,
    title: "Adagio for Solitude and Prayer",
    artist: "Royal Chamber Players",
    album: "Peaceful Reflections",
    category: "Classical Worship",
    folder: "music/Classical/Symphony_Worship",
    duration: 380,
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "Serene string adagio fostering quiet prayer and contemplative meditation."
  },
  {
    id: 64,
    title: "Ode to Joy Symphonic Overture",
    artist: "Heritage Philharmonic",
    album: "Anthems of the Ages",
    category: "Classical Worship",
    folder: "music/Classical/Symphony_Worship",
    duration: 320,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Hillsong United.mp3",
    lyrics: "Triumphant full orchestra arrangement echoing through sacred halls."
  },
  {
    id: 65,
    title: "Lullaby of Grace (Violin & Flute)",
    artist: "Grace Chamber Ensemble",
    album: "Quiet Waters",
    category: "Classical Worship",
    folder: "music/Classical/Symphony_Worship",
    duration: 290,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "Delicate solo flute and acoustic violin weaving peaceful harmonies."
  },

  // 14. RnB Worship
  {
    id: 66,
    title: "Rhythm & Blues Gospel Classic",
    artist: "Neo-Soul Sanctuary",
    album: "Midnight Worship",
    category: "RnB Worship",
    folder: "music/RnB/RnB_Gospel",
    duration: 330,
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/RnB/Rhythm and Blues Classic.mp3",
    fallbackAudioSrc: "music/RnB/Rhythm and Blues Classic.mp3",
    lyrics: "Lush electric piano chords, silky basslines, and smooth contemporary gospel harmonies."
  },
  {
    id: 67,
    title: "Midnight Soul Devotion",
    artist: "Sanctuary Vocal Stack",
    album: "Neo-Gospel Chronicles",
    category: "RnB Worship",
    folder: "music/RnB/RnB_Gospel",
    duration: 295,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/RnB/Rhythm and Blues Classic.mp3",
    fallbackAudioSrc: "music/Jazz/Jelly Roll Morton Black Bottom Stomp.mp3",
    lyrics: "Vintage Rhodes warmth, layered choir stacks, and uplifting lyrics of faith."
  },
  {
    id: 68,
    title: "Golden Hour Harmonies",
    artist: "Soul Symphony",
    album: "Afternoon Light",
    category: "RnB Worship",
    folder: "music/RnB/RnB_Gospel",
    duration: 310,
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/RnB/Rhythm and Blues Classic.mp3",
    fallbackAudioSrc: "music/Blues/Memphis Blues.mp3",
    lyrics: "Smooth syncopated grooves and rich multi-voice harmonies."
  },
  {
    id: 69,
    title: "Velvet Groove Praise",
    artist: "Urban Light Project",
    album: "Higher Frequency",
    category: "RnB Worship",
    folder: "music/RnB/RnB_Gospel",
    duration: 280,
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/RnB/Rhythm and Blues Classic.mp3",
    fallbackAudioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3",
    lyrics: "Rhythmic bass and warm keys crafting an intimate worship experience."
  },
  {
    id: 70,
    title: "Rivers of Grace (Neo-Soul)",
    artist: "Neo-Soul Sanctuary",
    album: "Midnight Worship",
    category: "RnB Worship",
    folder: "music/RnB/RnB_Gospel",
    duration: 340,
    img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=500&q=80",
    audioSrc: "music/RnB/Rhythm and Blues Classic.mp3",
    fallbackAudioSrc: "music/RnB/Rhythm and Blues Classic.mp3",
    lyrics: "Deep neo-soul chord progressions and comforting spiritual lyrics."
  }
];

// Playlists metadata
const playlistsData = [
  { name: "Hillsong United & Worship", category: "Hillsong United", count: 5 },
  { name: "Tasha Cobbs Anointed Anthems", category: "Tasha Cobbs", count: 5 },
  { name: "Elevation Worship Anthems", category: "Elevation Worship", count: 5 },
  { name: "Phil Thompson Worship Room", category: "Phil Thompson", count: 5 },
  { name: "Travis Greene Essentials", category: "Travis Greene", count: 5 },
  { name: "CeCe Winans Devotional", category: "CeCe Winans", count: 5 },
  { name: "Nathaniel Bassey Praise", category: "Nathaniel Bassey", count: 5 },
  { name: "Sinach Worship Collection", category: "Sinach", count: 5 },
  { name: "Mercy Chinwo Hits", category: "Mercy Chinwo", count: 5 },
  { name: "Don Moen Hymns & Praises", category: "Don Moen", count: 5 },
  { name: "Gospel Jazz Café", category: "Gospel Jazz", count: 5 },
  { name: "Delta Blues Devotional", category: "Blues Devotional", count: 5 },
  { name: "Symphony & Classical Worship", category: "Classical Worship", count: 5 },
  { name: "RnB Soul Sanctuary", category: "RnB Worship", count: 5 }
];

// Folders metadata
const foldersData = [
  { name: "music/Gospel/Hillsong_United", label: "Hillsong United (5 songs)", filter: "Hillsong United" },
  { name: "music/Gospel/Tasha_Cobbs", label: "Tasha Cobbs (5 songs)", filter: "Tasha Cobbs" },
  { name: "music/Gospel/Elevation_Worship", label: "Elevation Worship (5 songs)", filter: "Elevation Worship" },
  { name: "music/Gospel/Phil_Thompson", label: "Phil Thompson (5 songs)", filter: "Phil Thompson" },
  { name: "music/Gospel/Travis_Greene", label: "Travis Greene (5 songs)", filter: "Travis Greene" },
  { name: "music/Gospel/CeCe_Winans", label: "CeCe Winans (5 songs)", filter: "CeCe Winans" },
  { name: "music/Gospel/Nathaniel_Bassey", label: "Nathaniel Bassey (5 songs)", filter: "Nathaniel Bassey" },
  { name: "music/Gospel/Sinach", label: "Sinach (5 songs)", filter: "Sinach" },
  { name: "music/Gospel/Mercy_Chinwo", label: "Mercy Chinwo (5 songs)", filter: "Mercy Chinwo" },
  { name: "music/Gospel/Don_Moen", label: "Don Moen (5 songs)", filter: "Don Moen" },
  { name: "music/Jazz/Gospel_Jazz", label: "Gospel Jazz (5 songs)", filter: "Gospel Jazz" },
  { name: "music/Blues/Gospel_Blues", label: "Blues Devotional (5 songs)", filter: "Blues Devotional" },
  { name: "music/Classical/Symphony_Worship", label: "Classical Symphony (5 songs)", filter: "Classical Worship" },
  { name: "music/RnB/RnB_Gospel", label: "RnB Worship (5 songs)", filter: "RnB Worship" }
];

// Artists metadata
const artistsData = [
  { name: "Hillsong United", songs: 5, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=150&q=80" },
  { name: "Tasha Cobbs", songs: 5, img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=150&q=80" },
  { name: "Elevation Worship", songs: 5, img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=150&q=80" },
  { name: "Phil Thompson", songs: 5, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
  { name: "Travis Greene", songs: 5, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
  { name: "CeCe Winans", songs: 5, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
  { name: "Nathaniel Bassey", songs: 5, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" },
  { name: "Sinach", songs: 5, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" },
  { name: "Mercy Chinwo", songs: 5, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" },
  { name: "Don Moen", songs: 5, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" }
];

// Top Featured Grid Albums
const featuredAlbums = [
  { id: 1, title: "Oceans (Where Feet May Fail)", artist: "Hillsong United", img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=300&q=80" },
  { id: 6, title: "Break Every Chain", artist: "Tasha Cobbs", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80" },
  { id: 11, title: "Graves Into Gardens", artist: "Elevation Worship", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80" },
  { id: 16, title: "My Worship", artist: "Phil Thompson", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80" },
  { id: 21, title: "Made A Way", artist: "Travis Greene", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=300&q=80" },
  { id: 26, title: "Goodness of God", artist: "CeCe Winans", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=300&q=80" },
  { id: 31, title: "Yahweh Sabaoth", artist: "Nathaniel Bassey", img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=300&q=80" },
  { id: 36, title: "Way Maker", artist: "Sinach", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80" }
];

// -------------------------------------------------------------
// Fallback Ambient Worship Synth (Web Audio API)
// Guarantees rich, soothing worship music even if offline or missing files
// -------------------------------------------------------------
class WebAudioSynthPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.gainNode = null;
    this.timer = null;
    this.chordIndex = 0;
    
    // Lush worship chord progressions in D Major / B Minor
    this.chords = [
      [146.83, 220.00, 293.66, 369.99, 440.00], // D Major 9
      [123.47, 185.00, 246.94, 293.66, 369.99], // B Minor 7
      [130.81, 196.00, 261.63, 329.63, 392.00], // G Major 9
      [110.00, 164.81, 220.00, 277.18, 329.63]  // A Major 11
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
      console.warn("Synth player initialization notice:", e);
    }
  }

  playChord(freqs) {
    if (!this.ctx || !this.isPlaying) return;
    
    const now = this.ctx.currentTime;
    
    // Master gain with smooth envelope
    if (!this.gainNode) {
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.08, now);
      
      // Gentle low-pass filter for warm analog tone
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
      
      // Gentle fade-in
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
  
  // Try fallback audio source or smooth Synth mode
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
  const mobilePauseIcon = '<i data-lucide="pause" class="w-4 h-4 fill-current ml-0"></i>';
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
  
  // Update titles & artwork
  if (currentTitleEl) currentTitleEl.innerText = track.title;
  if (currentArtistEl) currentArtistEl.innerText = track.artist;
  if (currentAlbumArtEl) currentAlbumArtEl.src = track.img;
  
  if (mobileSheetTitle) mobileSheetTitle.innerText = track.title;
  if (mobileSheetArtist) mobileSheetArtist.innerText = track.artist;
  if (mobileSheetArt) mobileSheetArt.src = track.img;
  if (mobileSheetBgArt) mobileSheetBgArt.src = track.img;
  if (mobileSheetCategory) mobileSheetCategory.innerText = track.category || 'StreamHub Worship';

  // Inject Lyrics
  const lyricsHtml = track.lyrics || "No lyrics available for this track.";
  if (lyricsContent) lyricsContent.innerHTML = lyricsHtml;
  
  updateMediaSessionMetadata(track);
  syncFavoriteState(track.id);
  
  updateDurationDisplays(track.duration);
  updateProgressUI(0, track.duration);
  
  // Set audio source
  activePlaybackMode = 'file';
  clearInterval(synthTimer);
  synthPlayer.pause();
  
  const srcToLoad = track.audioSrc || track.fallbackAudioSrc || "music/Gospel/Hillsong/Hillsong United - So Will I.mp3";
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
  const foundIndex = queue.findIndex(s => s.id === id);
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
// Volume Slider Controls (Desktop & Mobile Touch)
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
      icon.setAttribute('data-lucide', clamped === 0 ? 'volume-x' : clamped < 0.5 ? 'volume-1' : 'volume-2');
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

  let isDraggingVol = false;
  const startVolDrag = (e) => { isDraggingVol = true; handleVolumeClick(e, container); };
  const moveVolDrag = (e) => { if (isDraggingVol) handleVolumeClick(e, container); };
  const stopVolDrag = () => { isDraggingVol = false; };

  container.addEventListener('mousedown', startVolDrag);
  window.addEventListener('mousemove', moveVolDrag);
  window.addEventListener('mouseup', stopVolDrag);

  container.addEventListener('touchstart', startVolDrag, { passive: true });
  window.addEventListener('touchmove', moveVolDrag, { passive: true });
  window.addEventListener('touchend', stopVolDrag);
});

// -------------------------------------------------------------
// Favorites Persistence
// -------------------------------------------------------------
function syncFavoriteState(trackId) {
  const favs = JSON.parse(localStorage.getItem('favs') || '[]');
  const isFav = favs.includes(trackId);

  [btnFav, btnMobileSheetFav].forEach(btn => {
    if (!btn) return;
    btn.classList.toggle('text-brand', isFav);
    const icon = btn.querySelector('i');
    if (icon) icon.classList.toggle('fill-brand', isFav);
  });
}

function toggleFavorite() {
  const currentTrackId = queue[currentTrackIndex]?.id;
  if (!currentTrackId) return;

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
      s.category.toLowerCase().includes(activeCategoryFilter.toLowerCase()) || 
      s.artist.toLowerCase().includes(activeCategoryFilter.toLowerCase()) ||
      s.folder.toLowerCase().includes(activeCategoryFilter.toLowerCase())
    );
  }
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(s => 
      s.title.toLowerCase().includes(q) || 
      s.artist.toLowerCase().includes(q) || 
      s.album.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.folder.toLowerCase().includes(q)
    );
  }
  return list;
}

function playCategory(categoryName, shuffle = false) {
  const categorySongs = allSongs.filter(s => s.category.toLowerCase().includes(categoryName.toLowerCase()) || s.folder.toLowerCase().includes(categoryName.toLowerCase()));
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
  
  if (activeCategoryFilter !== 'all' || searchQuery.trim() !== '') {
    const catMeta = categoryMetadata[activeCategoryFilter] || {
      name: activeCategoryFilter,
      badge: "FEATURED COLLECTION",
      tagline: "Curated Playlist & Tracks",
      description: `Explore all ${songs.length} worship tracks in this specialized collection.`,
      heroImg: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80",
      accentColor: "#8b5cf6",
      gradient: "from-purple-950/90 via-indigo-950/70 to-[#121212]",
      listeners: "Featured StreamHub Playlist",
      songsCount: songs.length
    };

    dynamicSectionsEl.innerHTML = `
      <div>
        ${!searchQuery ? `
          <div class="category-hero-banner relative rounded-2xl overflow-hidden mb-6 md:mb-8 border border-white/10 shadow-2xl min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex flex-col justify-end p-4 sm:p-6 md:p-8" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(18,18,18,0.85) 60%, #121212 100%), url('${catMeta.heroImg}'); background-size: cover; background-position: center;">
            <div class="relative z-10 max-w-3xl">
              <div class="flex items-center gap-2 mb-2 sm:mb-3">
                <span class="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-0.5 rounded-full text-white bg-black/60 backdrop-blur-md border border-white/20 shadow-md">
                  <i data-lucide="sparkles" class="w-3 h-3 inline mr-1 text-yellow-400"></i> ${catMeta.badge}
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
                  <i data-lucide="play" class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current"></i> Play All
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
        ` : `
          <div class="flex items-center justify-between mb-5 pb-2 border-b border-white/10">
            <div>
              <h2 class="text-xl sm:text-2xl font-bold font-outfit text-white">
                Search Results for "${searchQuery}"
              </h2>
              <p class="text-xs text-gray-400 mt-0.5">${songs.length} tracks found matching your query</p>
            </div>
            <button onclick="resetFilters()" class="text-xs text-brand hover:underline font-semibold flex items-center gap-1.5 bg-brand/10 hover:bg-brand/20 px-3 py-1.5 rounded-full border border-brand/30 transition">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Reset Filter
            </button>
          </div>
        `}

        ${songs.length === 0 ? `
          <div class="p-8 sm:p-12 text-center text-gray-400 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
            <i data-lucide="music" class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-gray-600"></i>
            <p class="text-base sm:text-lg font-semibold text-white">No songs match your search</p>
            <p class="text-xs sm:text-sm text-gray-500 mt-1">Try another artist name or category filter</p>
          </div>
        ` : `
          <div class="mb-6 sm:mb-8">
            <h3 class="text-base sm:text-lg font-outfit font-bold mb-3 text-white flex items-center gap-2">
              <i data-lucide="layout-grid" class="w-4 h-4 text-brand"></i> Category Picks
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
              ${songs.map(song => renderSongCard(song)).join('')}
            </div>
          </div>

          <div class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden p-2 sm:p-4 shadow-xl">
            <div class="text-[11px] sm:text-xs text-gray-400 font-semibold px-3 sm:px-4 py-2 flex items-center border-b border-white/10 uppercase tracking-wider">
              <span class="w-6 sm:w-8">#</span>
              <span class="flex-1">Title & Artist</span>
              <span class="w-40 hidden md:block">Album / Category</span>
              <span class="w-14 sm:w-16 text-right">Time</span>
            </div>
            <div class="divide-y divide-white/5">
              ${songs.map((song, i) => renderSongRow(song, i + 1)).join('')}
            </div>
          </div>
        `}
      </div>
    `;
  } else {
    const categoriesList = Object.keys(categoryMetadata);
    const spotlightCategory = categoryMetadata["Hillsong United"];

    dynamicSectionsEl.innerHTML = `
      <div class="category-hero-banner relative rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-10 border border-white/10 shadow-2xl min-h-[240px] sm:min-h-[280px] md:min-h-[340px] flex flex-col justify-end p-4 sm:p-6 md:p-10" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(18,18,18,0.85) 50%, #121212 100%), url('${spotlightCategory.heroImg}'); background-size: cover; background-position: center 30%;">
        <div class="relative z-10 max-w-3xl">
          <div class="flex items-center gap-2 mb-2 sm:mb-3">
            <span class="text-[9px] sm:text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full text-white bg-gradient-to-r from-brand to-purple-600 shadow-lg shadow-purple-900/50">
              <i data-lucide="flame" class="w-3 h-3 inline mr-1 text-yellow-300"></i> FEATURED SPOTLIGHT
            </span>
            <span class="text-xs text-purple-200/90 font-medium">3.4M Monthly Listeners</span>
          </div>
          <h1 class="text-2xl sm:text-3xl md:text-5xl font-outfit font-black tracking-tight text-white drop-shadow-xl mb-1 sm:mb-2">
            ${spotlightCategory.name}
          </h1>
          <p class="text-xs sm:text-sm md:text-base font-semibold text-purple-200 drop-shadow mb-1 sm:mb-2">${spotlightCategory.tagline}</p>
          <p class="text-xs md:text-sm text-gray-300 leading-relaxed drop-shadow line-clamp-2 max-w-2xl mb-4 sm:mb-6">${spotlightCategory.description}</p>
          
          <div class="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <button onclick="playCategory('Hillsong United', false)" class="bg-brand hover:bg-brand-hover active:scale-95 text-white font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transition shadow-xl shadow-brand/40 text-xs sm:text-sm">
              <i data-lucide="play" class="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current"></i> Listen Now
            </button>
            <button onclick="filterByCategory('Hillsong United')" class="bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md text-white font-semibold px-4 sm:px-5 py-2.5 sm:py-3 rounded-full flex items-center gap-2 transition border border-white/15 text-xs sm:text-sm">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300"></i> View All Tracks
            </button>
          </div>
        </div>
      </div>

      <div class="mb-8 md:mb-12">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <h2 class="text-xl sm:text-2xl font-outfit font-black text-white flex items-center gap-2">
              <i data-lucide="compass" class="w-5 h-5 text-brand"></i> Explore Categories & Genres
            </h2>
            <p class="text-[11px] sm:text-xs text-gray-400 mt-0.5">Select a category to view full track collections</p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          ${categoriesList.map(catKey => {
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
                    <span class="text-[9px] sm:text-[10px] text-gray-300 font-mono block mt-0.5">5 tracks</span>
                  </div>
                  <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand text-white flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-lg shrink-0">
                    <i data-lucide="play" class="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5"></i>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="space-y-8 md:space-y-12">
        ${categoriesList.map(catKey => {
          const meta = categoryMetadata[catKey];
          const sectionSongs = allSongs.filter(s => s.category === catKey || s.folder === meta.folder);

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
  }

  lucide.createIcons();
}

function renderSongCard(song) {
  const isCurrent = queue[currentTrackIndex]?.id === song.id;
  return `
    <div onclick="playSongById(${song.id})" class="bg-white/5 hover:bg-white/10 active:scale-95 backdrop-blur-md border ${isCurrent ? 'border-brand shadow-[0_0_20px_rgba(139,92,246,0.35)]' : 'border-white/5'} transition-all duration-300 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl cursor-pointer group flex flex-col gap-2 shadow-lg">
      <div class="relative w-full aspect-square bg-surface-highlight rounded-lg sm:rounded-xl shadow-inner overflow-hidden">
        <img src="${song.img}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${song.title}" />
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
  const isCurrent = queue[currentTrackIndex]?.id === song.id;
  return `
    <div onclick="playSongById(${song.id})" class="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-white/10 active:bg-white/15 cursor-pointer rounded-xl transition group ${isCurrent ? 'bg-brand/15 text-brand' : 'text-gray-200'}">
      <span class="w-6 sm:w-8 text-xs text-gray-400 group-hover:hidden">
        ${isCurrent && isPlaying ? `
          <div class="playing-equalizer">
            <span></span><span></span><span></span>
          </div>
        ` : index}
      </span>
      <span class="w-6 sm:w-8 text-xs text-white hidden group-hover:inline-block"><i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i></span>
      
      <div class="flex items-center gap-2.5 sm:gap-3 flex-1 overflow-hidden">
        <img src="${song.img}" class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-cover shrink-0 border border-white/10" alt="${song.title}" />
        <div class="flex flex-col overflow-hidden pr-2">
          <span class="text-xs font-semibold truncate ${isCurrent ? 'text-brand font-bold' : 'text-white'}">${song.title}</span>
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
    } else {
      if (searchClear) searchClear.classList.add('hidden');
    }
    renderMainSections();
  });

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.classList.add('hidden');
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
            <i data-lucide="disc" class="w-4 h-4 text-brand"></i>
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
          <i data-lucide="folder" class="w-4 h-4 text-yellow-500"></i>
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
    <div onclick="playSongById(${album.id})" class="bg-white/5 hover:bg-white/10 active:scale-95 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-300 rounded-xl overflow-hidden flex items-center group cursor-pointer h-14 sm:h-16 shadow-md hover:shadow-[0_4px_20px_rgba(139,92,246,0.25)]">
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
      fallbackAudioSrc: 'music/Gospel/Hillsong/Hillsong United - So Will I.mp3',
      lyrics: 'Imported from your device storage.'
    }));

    uploadedSongs.push(...newSongs);
    allSongs.push(...newSongs);
    queue.push(...newSongs);
    renderLocalFilesSection();
    event.target.value = '';

    // Automatically play first imported song
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
      album: track.album || 'StreamHub Worship',
      artwork: [ { src: track.img, sizes: '512x512', type: 'image/jpeg' } ]
    });
  }
}

// -------------------------------------------------------------
// Global Event Listeners Wiring
// -------------------------------------------------------------
function setupEventListeners() {
  // Mobile drawer
  if (btnMobileMenu) btnMobileMenu.addEventListener('click', openMobileSidebar);
  if (btnCloseSidebar) btnCloseSidebar.addEventListener('click', closeMobileSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeMobileSidebar);

  // Mobile Expanded Player Sheet
  if (nowPlayingClickableArea) {
    nowPlayingClickableArea.addEventListener('click', (e) => {
      // Don't expand if clicking fav button
      if (e.target.closest('#btn-fav')) return;
      if (window.innerWidth < 768) openMobilePlayerSheet();
    });
  }
  if (btnMobileExpand) btnMobileExpand.addEventListener('click', openMobilePlayerSheet);
  if (btnCloseMobileSheet) btnCloseMobileSheet.addEventListener('click', closeMobilePlayerSheet);

  // Desktop Controls
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

  // Mobile Bar Controls
  if (btnMobilePlay) btnMobilePlay.addEventListener('click', () => togglePlay());
  if (btnMobileNext) btnMobileNext.addEventListener('click', playNext);
  if (btnMobileLyrics) btnMobileLyrics.addEventListener('click', toggleLyricsPanel);

  // Mobile Sheet Controls
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

  // Lyrics
  if (btnLyrics) btnLyrics.addEventListener('click', toggleLyricsPanel);
  if (btnCloseLyrics) btnCloseLyrics.addEventListener('click', toggleLyricsPanel);

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && (e.target === document.body || e.target.tagName !== 'INPUT')) {
      e.preventDefault();
      togglePlay();
    } else if (e.code === 'ArrowRight' && e.ctrlKey) {
      playNext();
    } else if (e.code === 'ArrowLeft' && e.ctrlKey) {
      playPrev();
    }
  });
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
}

// Start StreamHub
init();
