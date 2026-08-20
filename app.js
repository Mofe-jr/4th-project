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
// Comprehensive Song Catalog (70 Songs with High-Res Artwork)
// -------------------------------------------------------------
const allSongs = [
  // ===========================================================
  // 1. Hillsong United (music/Gospel/Hillsong_United) - 5 Songs
  // ===========================================================
  {
    id: 1,
    title: "Oceans (Where Feet May Fail)",
    artist: "Hillsong United",
    album: "Zion",
    category: "Hillsong United",
    folder: "music/Gospel/Hillsong_United",
    duration: 538,
    img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=500&q=80",
    youtubeId: "dy9nWe9_xOI",
    lyrics: "You call me out upon the waters<br/>The great unknown where feet may fail<br/>And there I find You in the mystery<br/>In oceans deep, my faith will stand<br/><br/>(Chorus)<br/>And I will call upon Your name<br/>And keep my eyes above the waves<br/>When oceans rise, my soul will rest in Your embrace<br/>For I am Yours and You are mine<br/><br/>Spirit lead me where my trust is without borders<br/>Let me walk upon the waters<br/>Wherever You would call me<br/>Take me deeper than my feet could ever wander<br/>And my faith will be made stronger<br/>In the presence of my Savior"
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
    youtubeId: "GfVd5x9W1Xc",
    lyrics: "God of creation, there at the start<br/>Before the beginning of time<br/>With no point of reference, You spoke to the dark<br/>And fleshed out the wonder of light<br/><br/>(Chorus)<br/>And as You speak<br/>A hundred billion galaxies are born<br/>In the vapour of Your breath the planets form<br/>If the stars were made to worship so will I<br/>I can see Your heart in everything You've made<br/>Every burning star a signal fire of grace<br/>If creation sings Your praises so will I"
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
    youtubeId: "_T2sW3Z7rF4",
    lyrics: "How I live for the moments where I'm still in Your presence<br/>All the noise dies down<br/>Lord, speak to me now<br/>In Your presence, in Your love<br/><br/>(Chorus)<br/>All I want is just a touch of Heaven<br/>Just a moment in Your embrace<br/>Nothing compares to the beauty of Your holiness<br/>My heart beats for You"
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
    youtubeId: "nQWFzMvCfLE",
    lyrics: "You were the Word at the beginning<br/>One with God the Lord Most High<br/>Your hidden glory in creation<br/>Now revealed in You our Christ<br/><br/>(Chorus)<br/>What a beautiful Name it is<br/>What a beautiful Name it is<br/>The Name of Jesus Christ my King<br/>What a beautiful Name it is, nothing compares to this<br/>What a beautiful Name it is, the Name of Jesus!"
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
    youtubeId: "bXkL61l-Q04",
    lyrics: "People come together<br/>Strange as neighbours, our souls feel like friends<br/>We've got one hope, one foundation<br/><br/>(Chorus)<br/>Don't let your heart be troubled<br/>Hold your head up high, don't fear no evil<br/>Fix your eyes on this one truth<br/>God is so good, His grace is enough!"
  },

  // ===========================================================
  // 2. Tasha Cobbs Leonard (music/Gospel/Tasha_Cobbs) - 5 Songs
  // ===========================================================
  {
    id: 6,
    title: "Break Every Chain",
    artist: "Tasha Cobbs",
    album: "Grace",
    category: "Tasha Cobbs",
    folder: "music/Gospel/Tasha_Cobbs",
    duration: 485,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
    youtubeId: "HMYJpB_47J0",
    lyrics: "There is power in the name of Jesus<br/>There is power in the name of Jesus<br/>There is power in the name of Jesus<br/><br/>(Chorus)<br/>To break every chain, break every chain, break every chain<br/>To break every chain, break every chain, break every chain<br/><br/>There's an army rising up<br/>To break every chain!"
  },
  {
    id: 7,
    title: "You Know My Name (feat. Jimi Cravity)",
    artist: "Tasha Cobbs",
    album: "Heart. Passion. Pursuit.",
    category: "Tasha Cobbs",
    folder: "music/Gospel/Tasha_Cobbs",
    duration: 524,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    youtubeId: "k9Zp1_3U3yM",
    lyrics: "He knows my name<br/>He knows my name<br/>He knows my name<br/>He knows my name<br/><br/>(Chorus)<br/>And oh how He walks with me<br/>And oh how He talks with me<br/>And oh how He tells me that I am His own<br/>No fire can burn me, no weapon can form<br/>No giant can defeat me because I am His own!"
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
    youtubeId: "Y4Uj1_n-eNk",
    lyrics: "Lord, if I find favor in Your sight<br/>Lord, please hear my heart's cry<br/>I'm desperately in love with You<br/><br/>(Chorus)<br/>For Your glory, I will do anything<br/>Just to see You, to behold You as my King<br/>I want to be where You are, I gotta be where You are!"
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
    youtubeId: "aQkP709q43Y",
    lyrics: "You provide the fire, I'll provide the sacrifice<br/>You provide the spirit, and I will open up inside<br/><br/>(Chorus)<br/>Fill me up God, fill me up God<br/>Fill me up God, fill me up!<br/>Love of God, overflow in this place!"
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
    youtubeId: "l2w03t6U86U",
    lyrics: "Every time I look back over my life<br/>All I can see is Your mercy and grace<br/>Loving me, keeping me, holding me<br/>In spite of me!"
  },

  // ===========================================================
  // 3. Elevation Worship (music/Gospel/Elevation_Worship) - 5 Songs
  // ===========================================================
  {
    id: 11,
    title: "Graves Into Gardens (feat. Brandon Lake)",
    artist: "Elevation Worship",
    album: "Graves Into Gardens",
    category: "Elevation Worship",
    folder: "music/Gospel/Elevation_Worship",
    duration: 452,
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80",
    youtubeId: "KwX1f2g50Oo",
    lyrics: "I searched the world but it couldn't fill me<br/>A man's empty praise and treasures that fade<br/>Are never enough<br/>Then You came along and You put me back together<br/>And every desire is now satisfied here in Your love<br/><br/>(Chorus)<br/>Oh, there's nothing better than You<br/>There's nothing better than You<br/>Lord there's nothing, nothing is better than You<br/><br/>You turn mourning to dancing<br/>You give beauty for ashes<br/>You turn shame into glory<br/>You're the only one who can<br/>You turn graves into gardens!"
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
    youtubeId: "Zp6aygmFZM4",
    lyrics: "The Lord bless you and keep you<br/>Make His face shine upon you and be gracious to you<br/>The Lord turn His face toward you and give you peace<br/><br/>(Chorus)<br/>Amen, amen, amen<br/>Amen, amen, amen<br/><br/>May His favor be upon you and a thousand generations<br/>And your family and your children, and their children, and their children"
  },
  {
    id: 13,
    title: "Jireh (feat. Maverick City Music)",
    artist: "Elevation Worship",
    album: "Old Church Basement",
    category: "Elevation Worship",
    folder: "music/Gospel/Elevation_Worship",
    duration: 590,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    youtubeId: "mC-zw0zCCtg",
    lyrics: "I'll never be more loved than I am right now<br/>Wasn't holding You up, so there's nothing I can do to let You down<br/>It doesn't take a trophy to make You proud<br/>I'll never be more loved than I am right now<br/><br/>(Chorus)<br/>Jireh, You are enough<br/>Jireh, You are enough<br/>And I will be content in every circumstance<br/>Jireh, You are enough!"
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
    youtubeId: "xrA3nnAMDY8",
    lyrics: "Saturday was silent, surely it was through<br/>Since when has impossible ever stopped You?<br/>Friday's disappointment is Sunday's empty tomb<br/>Since when has impossible ever stopped You?<br/><br/>(Chorus)<br/>This is the sound of dry bones rattling!<br/>This is the praise make a dead man walk again<br/>Open the graves, I'm coming out<br/>I'm gonna live, I'm gonna live again!"
  },
  {
    id: 15,
    title: "Praise (feat. Brandon Lake & Chandler Moore)",
    artist: "Elevation Worship",
    album: "CAN YOU IMAGINE?",
    category: "Elevation Worship",
    folder: "music/Gospel/Elevation_Worship",
    duration: 312,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
    youtubeId: "f2oxGYPUfq4",
    lyrics: "Let everything that has breath praise the Lord!<br/>I'll praise in the valley, praise on the mountain<br/>I'll praise when I'm sure, praise when I'm doubting<br/>I'll praise when it's easy, praise when it's hard<br/>Praise is the weapon that silences the enemy!"
  },

  // ===========================================================
  // 4. Phil Thompson (music/Gospel/Phil_Thompson) - 5 Songs
  // ===========================================================
  {
    id: 16,
    title: "My Worship",
    artist: "Phil Thompson",
    album: "My Worship",
    category: "Phil Thompson",
    folder: "music/Gospel/Phil_Thompson",
    duration: 615,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    youtubeId: "y7l3K1bA_bE",
    lyrics: "You thought I was worth saving<br/>So You came and changed my life<br/>You thought I was worth keeping<br/>So You cleaned me up inside<br/>You thought I was to die for<br/>So You sacrificed Your life<br/>So I could be free, so I could be whole<br/><br/>(Chorus)<br/>Here is my worship, all of my worship<br/>Receive my worship, all of my worship<br/>As long as I am breathing, I will not keep silent<br/>I will always worship You!"
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
    youtubeId: "h3nC5rZ09v0",
    lyrics: "There is only one name, only one name<br/>With power to save, with power to save<br/>Our God is champion, He reigns forevermore<br/><br/>(Chorus)<br/>Atmosphere shift now, chains be broken<br/>Holy Spirit come, overflow this place!"
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
    youtubeId: "BqL9v3f3e-U",
    lyrics: "The Lion of Judah has conquered the grave<br/>He is high and lifted up<br/>All glory, power and honor to the King of Kings!"
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
    youtubeId: "P6GgHhN97R8",
    lyrics: "Jesus, Jesus, sweetest name I know<br/>Fills my every longing, keeps me singing as I go<br/>Jesus, Jesus, holy is Your name!"
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
    youtubeId: "D6Mh2Y_V6W0",
    lyrics: "You paid the ultimate price for my freedom<br/>You ransom me, You rescued me<br/>Forever I will sing Your praise!"
  },

  // ===========================================================
  // 5. Travis Greene (music/Gospel/Travis_Greene) - 5 Songs
  // ===========================================================
  {
    id: 21,
    title: "Made A Way",
    artist: "Travis Greene",
    album: "The Hill",
    category: "Travis Greene",
    folder: "music/Gospel/Travis_Greene",
    duration: 595,
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
    youtubeId: "l5_yR705a_w",
    lyrics: "You made a way<br/>When our backs were against the wall<br/>And it looked as if it was over<br/>You made a way<br/>And we're standing here only because You made a way<br/><br/>(Chorus)<br/>You move mountains, You cause walls to fall<br/>With Your power, You perform miracles<br/>There is nothing that's impossible<br/>And I'm standing here only because You made a way!"
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
    youtubeId: "uK4rE7K4uLw",
    lyrics: "All things are working for my good<br/>He's intentional, never failing<br/>I know that all things are working for my good<br/><br/>(Chorus)<br/>He's intentional, He's intentional<br/>Never failing, never failing!"
  },
  {
    id: 23,
    title: "You Waited",
    artist: "Travis Greene",
    album: "Crossover: Live from Music City",
    category: "Travis Greene",
    folder: "music/Gospel/Travis_Greene",
    duration: 408,
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
    youtubeId: "eK9hQjP5kLs",
    lyrics: "When I was far away, You waited for me<br/>When I was lost in sin, You called my name<br/>You waited, You waited, You waited for me!"
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
    youtubeId: "1wQ9P7L5wYs",
    lyrics: "Your love won't let go, Your hands won't let go<br/>Even in the fire, even in the flood<br/>Your faithfulness remains through it all!"
  },
  {
    id: 25,
    title: "Good & Loved (feat. Steffany Gretzinger)",
    artist: "Travis Greene",
    album: "Broken Record",
    category: "Travis Greene",
    folder: "music/Gospel/Travis_Greene",
    duration: 385,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    youtubeId: "kQyQY9zW8t0",
    lyrics: "I am good and loved, You are kind and true<br/>My soul will rest securely in You!"
  },

  // ===========================================================
  // 6. CeCe Winans (music/Gospel/CeCe_Winans) - 5 Songs
  // ===========================================================
  {
    id: 26,
    title: "Goodness of God",
    artist: "CeCe Winans",
    album: "Believe For It",
    category: "CeCe Winans",
    folder: "music/Gospel/CeCe_Winans",
    duration: 300,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    youtubeId: "-f4MUKEWRMQ",
    lyrics: "I love You Lord, for Your mercy never fails me<br/>All my days, I've been held in Your hands<br/>From the moment that I wake up until I lay my head<br/>Oh, I will sing of the goodness of God<br/><br/>(Chorus)<br/>'Cause all my life You have been faithful<br/>And all my life You have been so, so good<br/>With every breath that I am able<br/>Oh, I will sing of the goodness of God!"
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
    youtubeId: "-m1e9M5c2u4",
    lyrics: "They say this mountain can't be moved<br/>They say these chains will never break<br/>But they don't know You like we do<br/>There is power in Your name!<br/><br/>(Chorus)<br/>Move the impossible, break every chain<br/>I will believe for it!"
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
    youtubeId: "vJzC7i6-h2w",
    lyrics: "Don't be angry if I wash His feet with my tears<br/>And I dry them with my hair<br/>You weren't there the night He found me<br/>You didn't feel what I felt when He wrapped His love around me<br/><br/>(Chorus)<br/>And you don't know the cost of the oil in my alabaster box!"
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
    youtubeId: "3b9r4w7uY8k",
    lyrics: "Sin had demanded my soul, but mercy said no<br/>I am not gonna let you go<br/>I'm gonna heal your heart, make you whole<br/>Mercy said no!"
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
    youtubeId: "z2pY5w8L1Xw",
    lyrics: "He's the Lion and the Lamb, the Alpha and Omega<br/>Ruler of the nations, healer of the broken<br/>That's my King, that's my Lord!"
  },

  // ===========================================================
  // 7. Nathaniel Bassey (music/Gospel/Nathaniel_Bassey) - 5 Songs
  // ===========================================================
  {
    id: 31,
    title: "Yahweh Sabaoth",
    artist: "Nathaniel Bassey",
    album: "Hallelujah Live",
    category: "Nathaniel Bassey",
    folder: "music/Gospel/Nathaniel_Bassey",
    duration: 326,
    img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80",
    youtubeId: "EnYZQfS3SVE",
    lyrics: "A worship anthem from Nathaniel Bassey."
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
    youtubeId: "nJ4o1q2m_k4",
    lyrics: "Olowogbogboro is turning things around for my good!<br/>The outstretched arm of God is working for me<br/>Turning my shame into glory!"
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
    youtubeId: "QoFwz1s8f_s",
    lyrics: "See how far He brought us, see what God has done<br/>Tobechukwu, praise the Lord for His loving kindness and tender mercies!"
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
    youtubeId: "f0M4P1_O2rM",
    lyrics: "Onise Iyanu, You are the God of awesome wonders<br/>I've tasted of Your power<br/>Onise Iyanu, You have shown me so much love!"
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
    youtubeId: "p5k1m_T6k8w",
    lyrics: "Prepare the way of the Lord<br/>Make straight His paths in the wilderness<br/>The King of glory is on the way!"
  },

  // ===========================================================
  // 8. Sinach (music/Gospel/Sinach) - 5 Songs
  // ===========================================================
  {
    id: 36,
    title: "Way Maker - Live",
    artist: "Sinach",
    album: "Way Maker",
    category: "Sinach",
    folder: "music/Gospel/Sinach",
    duration: 312,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
    youtubeId: "n4XWfwLHeLM",
    lyrics: "You are here, moving in our midst<br/>I worship You, I worship You<br/>You are here, working in this place<br/>I worship You, I worship You<br/><br/>(Chorus)<br/>Way Maker, Miracle Worker, Promise Keeper<br/>Light in the darkness, my God, that is who You are!"
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
    youtubeId: "38wT2gV63g8",
    lyrics: "We are a chosen generation<br/>Called forth to show His excellence<br/>All I require for life, God has given me<br/>And I know who I am!<br/><br/>(Chorus)<br/>I know who God says I am<br/>What He says I am, where He says I'm at<br/>I know who I am!"
  },
  {
    id: 38,
    title: "Great Are You Lord",
    artist: "Sinach",
    album: "The Name of Jesus: Live",
    category: "Sinach",
    folder: "music/Gospel/Sinach",
    duration: 360,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    youtubeId: "bW8X8k2T1f0",
    lyrics: "Holy are You Lord, all creation calls You God<br/>Worthy is Your name, we worship Your majesty<br/>Great are You Lord!"
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
    youtubeId: "m7p3X0y2r1A",
    lyrics: "I testify that God is good, He did it again!<br/>When people said it's impossible, God made a way<br/>He did it again!"
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
    youtubeId: "w8j3l_V7t9k",
    lyrics: "There is an overflow of blessings, overflow of grace<br/>Walking in abundance in every single place!"
  },

  // ===========================================================
  // 9. Mercy Chinwo (music/Gospel/Mercy_Chinwo) - 5 Songs
  // ===========================================================
  {
    id: 41,
    title: "Excess Love",
    artist: "Mercy Chinwo",
    album: "The Cross: My Gaze",
    category: "Mercy Chinwo",
    folder: "music/Gospel/Mercy_Chinwo",
    duration: 345,
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80",
    youtubeId: "Fk619W3bV3Y",
    lyrics: "Jesus, You love me too much o<br/>Too much o, too much o, excess love o!<br/>Your love is unconditional, Your grace is overflow!"
  },
  {
    id: 42,
    title: "Chinedum",
    artist: "Mercy Chinwo",
    album: "The Cross: My Gaze",
    category: "Mercy Chinwo",
    folder: "music/Gospel/Mercy_Chinwo",
    duration: 265,
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    youtubeId: "j4x8q1b9t4M",
    lyrics: "Anywhere You lead me I will go<br/>'Cause You're the way, the truth and the life<br/>Chinedum, God is leading me!"
  },
  {
    id: 43,
    title: "Obinasom",
    artist: "Mercy Chinwo",
    album: "Satisfied",
    category: "Mercy Chinwo",
    folder: "music/Gospel/Mercy_Chinwo",
    duration: 245,
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
    youtubeId: "m8u2n7L5k3Q",
    lyrics: "Obinasom, my heart is glad in the Lord<br/>See the good things Jesus has done in my life!"
  },
  {
    id: 44,
    title: "Na You Dey Reign",
    artist: "Mercy Chinwo",
    album: "Satisfied",
    category: "Mercy Chinwo",
    folder: "music/Gospel/Mercy_Chinwo",
    duration: 310,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80",
    youtubeId: "r9j2p3w8k0Y",
    lyrics: "Na You dey reign, power belongs to You<br/>You are exalted above all the earth!"
  },
  {
    id: 45,
    title: "Trust",
    artist: "Mercy Chinwo",
    album: "Overwhelming Victory",
    category: "Mercy Chinwo",
    folder: "music/Gospel/Mercy_Chinwo",
    duration: 280,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    youtubeId: "y5w2b8t1x7K",
    lyrics: "I put my trust in You Lord, I will never be put to shame!"
  },

  // ===========================================================
  // 10. Don Moen (music/Gospel/Don_Moen) - 5 Songs
  // ===========================================================
  {
    id: 46,
    title: "God Will Make A Way",
    artist: "Don Moen",
    album: "God Will Make A Way",
    category: "Don Moen",
    folder: "music/Gospel/Don_Moen",
    duration: 260,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    youtubeId: "1zo3fJYtS-o",
    lyrics: "God will make a way where there seems to be no way<br/>He works in ways we cannot see, He will make a way for me<br/>He will be my guide, hold me closely to His side<br/>With love and strength for each new day, He will make a way!"
  },
  {
    id: 47,
    title: "Give Thanks",
    artist: "Don Moen",
    album: "Give Thanks",
    category: "Don Moen",
    folder: "music/Gospel/Don_Moen",
    duration: 215,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    youtubeId: "X03Y_HqZk5E",
    lyrics: "Give thanks with a grateful heart, give thanks to the Holy One<br/>Give thanks because He's given Jesus Christ His Son<br/>And now let the weak say 'I am strong', let the poor say 'I am rich'<br/>Because of what the Lord has done for us, give thanks!"
  },
  {
    id: 48,
    title: "Thank You Lord",
    artist: "Don Moen",
    album: "Thank You Lord",
    category: "Don Moen",
    folder: "music/Gospel/Don_Moen",
    duration: 320,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    youtubeId: "k4u2n8y1b9M",
    lyrics: "Thank You Lord, for all that You've done in my life<br/>Thank You for saving my soul, thank You for making me whole!"
  },
  {
    id: 49,
    title: "I Offer My Life",
    artist: "Don Moen",
    album: "Rivers of Joy",
    category: "Don Moen",
    folder: "music/Gospel/Don_Moen",
    duration: 285,
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80",
    youtubeId: "h7p2q5m1w9A",
    lyrics: "Lord, an offering I bring of a heart transformed by grace<br/>Here is my life, I lay it down before Your throne!"
  },
  {
    id: 50,
    title: "God Is Good All The Time",
    artist: "Don Moen",
    album: "Let Your Glory Fall",
    category: "Don Moen",
    folder: "music/Gospel/Don_Moen",
    duration: 240,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=80",
    youtubeId: "z9w3b1x7r2K",
    lyrics: "God is good all the time, He put a song of praise in this heart of mine<br/>Through the darkest night His light will shine, God is good all the time!"
  },

  // ===========================================================
  // 11. Gospel Jazz (music/Jazz/Gospel_Jazz) - 5 Songs
  // ===========================================================
  {
    id: 51,
    title: "Smooth Jazz Devotional",
    artist: "Jazz Vibes",
    album: "Sunday Morning Jazz",
    category: "Gospel Jazz",
    folder: "music/Jazz/Gospel_Jazz",
    duration: 240,
    img: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=500&q=80",
    youtubeId: "JV1908_jazz1",
    lyrics: "Instrumental - Smooth Saxophone & Piano Gospel Jazz Melodies"
  },
  {
    id: 52,
    title: "Sunday Morning Sax Praise",
    artist: "Gospel Sax Ensemble",
    album: "Spiritual Grooves",
    category: "Gospel Jazz",
    folder: "music/Jazz/Gospel_Jazz",
    duration: 265,
    img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80",
    youtubeId: "gospel_sax_02",
    lyrics: "Instrumental - Melodic Tenor Saxophone Solo over Uplifting Chords"
  },
  {
    id: 53,
    title: "Midnight Prayer Grooves",
    artist: "Spiritual Jazz Collective",
    album: "Sanctuary Nights",
    category: "Gospel Jazz",
    folder: "music/Jazz/Gospel_Jazz",
    duration: 310,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    youtubeId: "jazz_prayer_03",
    lyrics: "Instrumental - Warm Rhodes Piano & Upright Bass Devotional Groove"
  },
  {
    id: 54,
    title: "Hallelujah in B-Flat",
    artist: "Miles of Grace",
    album: "Modern Hymns in Jazz",
    category: "Gospel Jazz",
    folder: "music/Jazz/Gospel_Jazz",
    duration: 280,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
    youtubeId: "miles_grace_04",
    lyrics: "Instrumental - Trumpet and Acoustic Trio Reharmonizing Classic Praise"
  },
  {
    id: 55,
    title: "Sweet Hour of Prayer (Jazz Trio)",
    artist: "Uplift Jazz Quartet",
    album: "Gospel Standards Reimagined",
    category: "Gospel Jazz",
    folder: "music/Jazz/Gospel_Jazz",
    duration: 295,
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=500&q=80",
    youtubeId: "uplift_jazz_05",
    lyrics: "Instrumental - Intimate Piano Trio Arrangement of Classic Hymns"
  },

  // ===========================================================
  // 12. Blues Devotional (music/Blues/Gospel_Blues) - 5 Songs
  // ===========================================================
  {
    id: 56,
    title: "Delta Grace Blues",
    artist: "Gospel Blues Trio",
    album: "Memphis Devotion",
    category: "Blues Devotional",
    folder: "music/Blues/Gospel_Blues",
    duration: 210,
    img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=500&q=80",
    youtubeId: "BL8890_blues1",
    lyrics: "Instrumental - Soulful Memphis Delta Blues with Resonator Guitar"
  },
  {
    id: 57,
    title: "Memphis Blues Praise",
    artist: "Delta River Band",
    album: "Highway 61 Praise",
    category: "Blues Devotional",
    folder: "music/Blues/Gospel_Blues",
    duration: 245,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    youtubeId: "delta_praise_02",
    lyrics: "Lord You picked me up out of the miry clay, set my feet on the rock to stay!"
  },
  {
    id: 58,
    title: "Crossroad Deliverance",
    artist: "Muddy Gospel Project",
    album: "Old Rugged Blues",
    category: "Blues Devotional",
    folder: "music/Blues/Gospel_Blues",
    duration: 270,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    youtubeId: "crossroad_03",
    lyrics: "Met the Lord at the crossroad, He washed my burden away!"
  },
  {
    id: 59,
    title: "Lord Help the Poor & Needy",
    artist: "Acoustic Soul Blues",
    album: "Gospel Roots",
    category: "Blues Devotional",
    folder: "music/Blues/Gospel_Blues",
    duration: 225,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    youtubeId: "acoustic_blues_04",
    lyrics: "Lord have mercy on the humble soul, make the broken spirit whole."
  },
  {
    id: 60,
    title: "Slide Guitar Tabernacle",
    artist: "Rev. Mississippi Blues",
    album: "Tabernacle Revival",
    category: "Blues Devotional",
    folder: "music/Blues/Gospel_Blues",
    duration: 260,
    img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=500&q=80",
    youtubeId: "slide_tabernacle_05",
    lyrics: "Instrumental - Upbeat Gospel Slide Guitar and Foot-Stomping Rhythm"
  },

  // ===========================================================
  // 13. Classical Symphony (music/Classical/Symphony_Worship) - 5 Songs
  // ===========================================================
  {
    id: 61,
    title: "Classical Worship Anthem",
    artist: "Symphony Orchestra",
    album: "Symphony of Grace",
    category: "Classical Worship",
    folder: "music/Classical/Symphony_Worship",
    duration: 280,
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=500&q=80",
    youtubeId: "d8jcb6I5KGs",
    lyrics: "Instrumental - Full Orchestral Symphony Praise & Classical Strings"
  },
  {
    id: 62,
    title: "Majesty in Adagio (Strings Suite)",
    artist: "Philharmonic Praise",
    album: "Sanctuary Symphony",
    category: "Classical Worship",
    folder: "music/Classical/Symphony_Worship",
    duration: 330,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80",
    youtubeId: "philh_adagio_02",
    lyrics: "Instrumental - Sweeping Violins and Woodwinds in Peaceful Devotion"
  },
  {
    id: 63,
    title: "Holy, Holy, Holy (Full Orchestra)",
    artist: "Royal Symphony Chorus",
    album: "Grand Cathedrals",
    category: "Classical Worship",
    folder: "music/Classical/Symphony_Worship",
    duration: 315,
    img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80",
    youtubeId: "royal_sym_03",
    lyrics: "Holy, Holy, Holy! Lord God Almighty! Early in the morning our song shall rise to Thee!"
  },
  {
    id: 64,
    title: "Cello Contemplation in G Minor",
    artist: "Chamber Worship Strings",
    album: "Sacred Chamber",
    category: "Classical Worship",
    folder: "music/Classical/Symphony_Worship",
    duration: 290,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    youtubeId: "cello_worship_04",
    lyrics: "Instrumental - Deep Emotive Cello Solo with Piano Accompaniment"
  },
  {
    id: 65,
    title: "Resurrection Fanfare & Brass",
    artist: "Cathedral Brass Ensemble",
    album: "Triumphant Joy",
    category: "Classical Worship",
    folder: "music/Classical/Symphony_Worship",
    duration: 250,
    img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80",
    youtubeId: "cathedral_brass_05",
    lyrics: "Instrumental - Glorious Trumpets, French Horns, and Timpani"
  },

  // ===========================================================
  // 14. RnB Worship (music/RnB/RnB_Gospel) - 5 Songs
  // ===========================================================
  {
    id: 66,
    title: "RnB Praise & Sanctuary",
    artist: "Soul Chorus",
    album: "Soulful Worship",
    category: "RnB Worship",
    folder: "music/RnB/RnB_Gospel",
    duration: 250,
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=500&q=80",
    youtubeId: "RB4412_rnb1",
    lyrics: "Soulful RnB praise harmonies and smooth vocal runs honoring God."
  },
  {
    id: 67,
    title: "Heavenly Harmonies",
    artist: "Nu Soul Praise",
    album: "Groove in the Spirit",
    category: "RnB Worship",
    folder: "music/RnB/RnB_Gospel",
    duration: 275,
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80",
    youtubeId: "nu_soul_02",
    lyrics: "Your love is sweeter than the morning sun, Jesus You are my number one!"
  },
  {
    id: 68,
    title: "Unfailing Melody",
    artist: "Urban Gospel Collective",
    album: "Urban Sanctuary",
    category: "RnB Worship",
    folder: "music/RnB/RnB_Gospel",
    duration: 260,
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80",
    youtubeId: "urban_gospel_03",
    lyrics: "Can't nobody love me like You do, forever I will stay true to You!"
  },
  {
    id: 69,
    title: "Late Night Devotion",
    artist: "Neo-Gospel Soul Band",
    album: "Quiet Place",
    category: "RnB Worship",
    folder: "music/RnB/RnB_Gospel",
    duration: 295,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80",
    youtubeId: "neo_gospel_04",
    lyrics: "In the stillness of the midnight hour, I feel Your peace and Your power."
  },
  {
    id: 70,
    title: "Grace Reimagined",
    artist: "Velvet Soul Choir",
    album: "Gospel Soul Sessions",
    category: "RnB Worship",
    folder: "music/RnB/RnB_Gospel",
    duration: 240,
    img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80",
    youtubeId: "velvet_soul_05",
    lyrics: "Amazing grace, how sweet the sound, saved a soul that was lost and found!"
  }
];

// Every catalogue item is played through the native audio element using a
// tracked local file, so playback never depends on an embedded third party player.
const additionalGospelTracks = [
  { id: 77, title: "Hosanna", artist: "Hillsong United", album: "All of the Above", category: "Hillsong United", folder: "music/Gospel/Hillsong_United", duration: 360, img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 78, title: "Mighty to Save", artist: "Hillsong Worship", album: "Mighty to Save", category: "Hillsong United", folder: "music/Gospel/Hillsong_United", duration: 330, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 79, title: "For Your Glory", artist: "Tasha Cobbs Leonard", album: "Grace", category: "Tasha Cobbs", folder: "music/Gospel/Tasha_Cobbs", duration: 350, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 80, title: "You Know My Name", artist: "Tasha Cobbs Leonard", album: "Heart. Passion. Pursuit.", category: "Tasha Cobbs", folder: "music/Gospel/Tasha_Cobbs", duration: 420, img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 81, title: "O Come to the Altar", artist: "Elevation Worship", album: "Here as in Heaven", category: "Elevation Worship", folder: "music/Gospel/Elevation_Worship", duration: 290, img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 82, title: "Do It Again", artist: "Elevation Worship", album: "There Is a Cloud", category: "Elevation Worship", folder: "music/Gospel/Elevation_Worship", duration: 400, img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 83, title: "All of My Worship", artist: "Phil Thompson", album: "My Worship", category: "Phil Thompson", folder: "music/Gospel/Phil_Thompson", duration: 300, img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 84, title: "Jesus", artist: "Phil Thompson", album: "My Worship", category: "Phil Thompson", folder: "music/Gospel/Phil_Thompson", duration: 275, img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 85, title: "Intentional", artist: "Travis Greene", album: "The Hill", category: "Travis Greene", folder: "music/Gospel/Travis_Greene", duration: 285, img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 86, title: "Won't Let Go", artist: "Travis Greene", album: "Crossover: Live from Music City", category: "Travis Greene", folder: "music/Gospel/Travis_Greene", duration: 310, img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 87, title: "Believe For It", artist: "CeCe Winans", album: "Believe For It", category: "CeCe Winans", folder: "music/Gospel/CeCe_Winans", duration: 340, img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 88, title: "Alabaster Box", artist: "CeCe Winans", album: "Alabaster Box", category: "CeCe Winans", folder: "music/Gospel/CeCe_Winans", duration: 300, img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 89, title: "See What the Lord Has Done", artist: "Nathaniel Bassey", album: "Hallelujah Live", category: "Nathaniel Bassey", folder: "music/Gospel/Nathaniel_Bassey", duration: 330, img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 90, title: "Yeshua Hamashiach", artist: "Nathaniel Bassey", album: "Hallelujah Live", category: "Nathaniel Bassey", folder: "music/Gospel/Nathaniel_Bassey", duration: 380, img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 91, title: "I Know Who I Am", artist: "Sinach", album: "Shout It Loud", category: "Sinach", folder: "music/Gospel/Sinach", duration: 320, img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 92, title: "The Name of Jesus", artist: "Sinach", album: "The Name of Jesus", category: "Sinach", folder: "music/Gospel/Sinach", duration: 305, img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 93, title: "Wonder", artist: "Mercy Chinwo", album: "Satisfied", category: "Mercy Chinwo", folder: "music/Gospel/Mercy_Chinwo", duration: 290, img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 94, title: "Akamdinelu", artist: "Mercy Chinwo", album: "Satisfied", category: "Mercy Chinwo", folder: "music/Gospel/Mercy_Chinwo", duration: 335, img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 95, title: "God Will Make a Way", artist: "Don Moen", album: "God Will Make a Way", category: "Don Moen", folder: "music/Gospel/Don_Moen", duration: 255, img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80", lyrics: "" },
  { id: 96, title: "Thank You Lord", artist: "Don Moen", album: "Thank You Lord", category: "Don Moen", folder: "music/Gospel/Don_Moen", duration: 275, img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80", lyrics: "" }
];

const localGospelTracks = [
  { id: 71, title: "Hillsong Worship", artist: "Hillsong", album: "Worship Sessions", category: "Hillsong United", folder: "music/Gospel/Hillsong", duration: 0, img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3", lyrics: "Local worship recording" },
  { id: 72, title: "Hillsong United", artist: "Hillsong", album: "Live Worship", category: "Hillsong United", folder: "music/Gospel/Hillsong", duration: 0, img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Hillsong/Hillsong United.mp3", lyrics: "Local worship recording" },
  { id: 73, title: "Integrity's iWorship 247", artist: "Hillsong", album: "iWorship", category: "Hillsong United", folder: "music/Gospel/Hillsong", duration: 0, img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3", lyrics: "Local worship recording" },
  { id: 74, title: "Sound Trip na Yah", artist: "Hillsong", album: "Worship Sessions", category: "Hillsong United", folder: "music/Gospel/Hillsong", duration: 0, img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3", lyrics: "Local worship recording" },
  { id: 75, title: "Way Maker Devotion", artist: "Sinach", album: "Devotion", category: "Sinach", folder: "music/Gospel/Sinach", duration: 0, img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Sinach/Way Maker Devotion.mp3", lyrics: "Local worship recording" },
  { id: 76, title: "Olowogbogboro Praise", artist: "Nathaniel Bassey", album: "Praise Collection", category: "Nathaniel Bassey", folder: "music/Gospel/Nathaniel_Bassey", duration: 0, img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=80", audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3", lyrics: "Local worship recording" }
];

allSongs.push(...additionalGospelTracks, ...localGospelTracks);

Object.assign(allSongs.find(song => song.id === 1), { audioSrc: "music/Gospel/Hillsong/Hillsong United.mp3" });
Object.assign(allSongs.find(song => song.id === 2), { audioSrc: "music/Gospel/Hillsong/Hillsong United - So Will I.mp3" });
Object.assign(allSongs.find(song => song.id === 3), { audioSrc: "music/Gospel/Hillsong/Hillsong - Worship.mp3" });
Object.assign(allSongs.find(song => song.id === 4), { audioSrc: "music/Gospel/Hillsong/Integrity's iWorship 247.mp3" });
Object.assign(allSongs.find(song => song.id === 5), { audioSrc: "music/Gospel/Hillsong/Sound Trip na Yah!!!!!.mp3" });
Object.assign(allSongs.find(song => song.id === 31), { audioSrc: "music/Gospel/Nathaniel_Bassey/Olowogbogboro Praise.mp3" });
Object.assign(allSongs.find(song => song.id === 36), { audioSrc: "music/Gospel/Sinach/Way Maker Devotion.mp3" });

const fallbackAudioByCategory = {
  "Gospel Jazz": "music/Jazz/Jelly Roll Morton Black Bottom Stomp.mp3",
  "Blues Devotional": "music/Blues/Memphis Blues.mp3",
  "RnB Worship": "music/Gospel/Hillsong/Hillsong - Worship.mp3"
};

allSongs.forEach(song => {
  song.fallbackAudioSrc = song.audioSrc || fallbackAudioByCategory[song.category] || "music/Gospel/Hillsong/Hillsong - Worship.mp3";
  song.audioSrc = song.audioSrc || song.fallbackAudioSrc;
});

// Active queue initialized with all songs
let queue = [...allSongs];

// Playlists metadata (5 songs in each playlist)
const playlistsData = [
  { name: "Hillsong United Classics", category: "Hillsong United", count: 5 },
  { name: "Tasha Cobbs Power Hour", category: "Tasha Cobbs", count: 5 },
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

// Folders metadata (14 Folders, 5 songs in each)
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

// Artists metadata with real high-res photography
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

// Top Featured Grid Albums with High-Res Art
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
// DOM Elements
// -------------------------------------------------------------
const sidebarPlaylistsEl = document.getElementById('sidebar-playlists');
const sidebarFilterTabs = document.getElementById('sidebar-filter-tabs');
const featuredGridEl = document.getElementById('featured-grid');
const dynamicSectionsEl = document.getElementById('dynamic-sections');
const categoryChips = document.getElementById('category-chips');
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');

const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
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
const audioPlayer = document.getElementById('audio-player');
const musicFileInput = document.getElementById('music-file-input');
const localFilesSection = document.getElementById('local-files-section');

// -------------------------------------------------------------
// Application State
// -------------------------------------------------------------
let currentTrackIndex = 0;
let isPlaying = false;
let isRepeat = false;
let playbackSpeeds = [1, 1.25, 1.5, 2];
let speedIndex = 0;
let currentSidebarTab = 'playlists';
let activeCategoryFilter = 'all';
let searchQuery = '';
let currentHeroIndex = 0;

let isLyricsOpen = false;
let savedVolume = localStorage.getItem('playerVolume') ? parseFloat(localStorage.getItem('playerVolume')) : 1.0;

let activePlayback = 'audio';
let uploadedSongs = [];
let nextUploadedSongId = 1000;

audioPlayer.addEventListener('loadedmetadata', () => {
  if (activePlayback !== 'audio') return;
  const track = queue[currentTrackIndex];
  if (track && Number.isFinite(audioPlayer.duration)) {
    track.duration = audioPlayer.duration;
    timeTotalEl.innerText = formatTime(audioPlayer.duration);
  }
});

audioPlayer.addEventListener('timeupdate', () => {
  if (activePlayback !== 'audio' || !audioPlayer.duration) return;
  const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  timeCurrentEl.innerText = formatTime(audioPlayer.currentTime);
  timeTotalEl.innerText = formatTime(audioPlayer.duration);
});

audioPlayer.addEventListener('play', () => { isPlaying = true; syncUI(); });
audioPlayer.addEventListener('pause', () => { isPlaying = false; syncUI(); });
audioPlayer.addEventListener('ended', () => { isRepeat ? audioPlayer.play() : playNext(); });
audioPlayer.addEventListener('error', () => {
  isPlaying = false;
  syncUI();
  console.warn('The selected local audio file could not be loaded.');
});

function syncUI() {
  if (isPlaying) {
    btnPlay.innerHTML = '<i data-lucide="pause" class="w-5 h-5 fill-current ml-0"></i>';
  } else {
    btnPlay.innerHTML = '<i data-lucide="play" class="w-5 h-5 fill-current ml-0.5"></i>';
  }
  lucide.createIcons();
}

// -------------------------------------------------------------
// Initialization
// -------------------------------------------------------------
async function init() {
  if (supabaseClient) {
    try {
      const { data: dbQueue } = await supabaseClient.from('queue').select('*');
      if (dbQueue && dbQueue.length > 0) {
        queue = dbQueue;
      }
    } catch (e) {
      console.warn("Supabase fetch failed. Using local queue with 70 enriched songs.");
    }
  }

  populateSidebar();
  renderFeaturedGrid();
  renderMainSections();
  renderLocalFilesSection();
  setGreeting();
  setupSidebarTabListeners();
  setupFilterChipListeners();
  setupSearchListeners();
  setupLocalFileImport();
  
  volumeBar.style.width = `${Math.round(savedVolume * 100)}%`;
  audioPlayer.volume = savedVolume;
  loadTrack(currentTrackIndex);
  setupMediaSession();
  lucide.createIcons();
}

function setupLocalFileImport() {
  musicFileInput.addEventListener('change', event => {
    const supportedFiles = [...event.target.files].filter(file =>
      file.type.startsWith('audio/') || /\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(file.name)
    );

    if (!supportedFiles.length) return;

    const newSongs = supportedFiles.map(file => ({
      id: nextUploadedSongId++,
      title: file.name.replace(/\.[^/.]+$/, ''),
      artist: 'Local library',
      album: 'Imported music',
      category: 'Local Library',
      folder: 'Your device',
      duration: 0,
      img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80',
      audioSrc: URL.createObjectURL(file),
      lyrics: 'Imported from your device. Lyrics are not available for local files.'
    }));

    uploadedSongs.push(...newSongs);
    allSongs.push(...newSongs);
    queue.push(...newSongs);
    renderLocalFilesSection();
    event.target.value = '';
  });
}

function renderLocalFilesSection() {
  if (!localFilesSection) return;

  localFilesSection.innerHTML = `
    <div class="flex items-end justify-between gap-4 mb-4">
      <div>
        <p class="text-[10px] font-extrabold tracking-[0.16em] text-brand uppercase">Your device</p>
        <h2 class="font-outfit text-2xl font-black text-white">Local music library</h2>
        <p class="mt-1 text-xs text-gray-400">Add MP3, WAV, M4A, AAC, OGG or FLAC files and play them instantly.</p>
      </div>
      <button type="button" onclick="document.getElementById('music-file-input').click()" class="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:scale-105">
        Add files
      </button>
    </div>
    ${uploadedSongs.length ? `
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        ${uploadedSongs.map(song => renderSongCard(song)).join('')}
      </div>
    ` : `
      <button type="button" onclick="document.getElementById('music-file-input').click()" class="w-full rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-6 py-9 text-left transition hover:border-brand/60 hover:bg-brand/5">
        <span class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand"><i data-lucide="music-2" class="w-5 h-5"></i></span>
        <span class="block text-sm font-bold text-white">Add songs from your music folder</span>
        <span class="mt-1 block text-xs text-gray-400">Select one or more audio files to add them to this listening session.</span>
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
      album: track.album || 'Gospel Collection',
      artwork: [ { src: track.img, sizes: '512x512', type: 'image/jpeg' } ]
    });
  }
}

// -------------------------------------------------------------
// Sidebar Views (Playlists / Artists / Folders)
// -------------------------------------------------------------
function populateSidebar() {
  if (currentSidebarTab === 'playlists') {
    sidebarPlaylistsEl.innerHTML = playlistsData.map(p => `
      <div onclick="filterByCategory('${p.category}')" class="group flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-white/10 cursor-pointer transition text-gray-300 hover:text-white">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-brand/20 flex items-center justify-center shrink-0 border border-white/5 transition">
            <i data-lucide="disc" class="w-4 h-4 text-brand"></i>
          </div>
          <span class="text-xs font-medium truncate">${p.name}</span>
        </div>
        <span class="text-[10px] text-gray-500 group-hover:text-gray-300 font-mono">${p.count} tracks</span>
      </div>
    `).join('');
  } else if (currentSidebarTab === 'artists') {
    sidebarPlaylistsEl.innerHTML = artistsData.map(a => `
      <div onclick="filterByCategory('${a.name}')" class="group flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-white/10 cursor-pointer transition text-gray-300 hover:text-white">
        <img src="${a.img}" class="w-8 h-8 rounded-full object-cover shrink-0 border border-white/10 group-hover:border-brand transition" alt="${a.name}" />
        <div class="flex flex-col overflow-hidden">
          <span class="text-xs font-semibold truncate group-hover:text-white">${a.name}</span>
          <span class="text-[10px] text-gray-500">${a.songs} songs • Artist</span>
        </div>
      </div>
    `).join('');
  } else if (currentSidebarTab === 'folders') {
    sidebarPlaylistsEl.innerHTML = foldersData.map(f => `
      <div onclick="filterByCategory('${f.filter}')" class="group flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/10 cursor-pointer transition text-gray-300 hover:text-white">
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
  sidebarFilterTabs.querySelectorAll('.sidebar-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      sidebarFilterTabs.querySelectorAll('.sidebar-tab').forEach(t => {
        t.className = 'sidebar-tab text-xs bg-surface-highlight text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-1 rounded-full cursor-pointer transition';
      });
      tab.className = 'sidebar-tab text-xs bg-brand text-white font-medium px-3 py-1 rounded-full cursor-pointer transition shadow-sm';
      currentSidebarTab = tab.dataset.tab;
      populateSidebar();
    });
  });
}

// -------------------------------------------------------------
// Top Featured Grid
// -------------------------------------------------------------
function renderFeaturedGrid() {
  featuredGridEl.innerHTML = featuredAlbums.map(album => `
    <div onclick="playSongById(${album.id})" class="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-300 rounded-xl overflow-hidden flex items-center group cursor-pointer h-16 shadow-lg hover:shadow-[0_4px_20px_rgba(139,92,246,0.25)] hover:-translate-y-0.5">
      <img src="${album.img}" class="h-16 w-16 object-cover shrink-0 group-hover:scale-105 transition duration-500" alt="${album.title}" />
      <div class="flex flex-col px-3 overflow-hidden">
        <span class="font-outfit font-bold text-xs truncate text-white">${album.title}</span>
        <span class="text-[11px] text-gray-400 truncate">${album.artist}</span>
      </div>
      <button class="ml-auto mr-3 bg-brand text-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all shadow-[0_0_15px_rgba(139,92,246,0.6)] shrink-0">
        <i data-lucide="play" class="w-4 h-4 fill-current ml-0.5"></i>
      </button>
    </div>
  `).join('');
  lucide.createIcons();
}

// -------------------------------------------------------------
// Dynamic Sections, Hero Banners & Category Cards
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
    // Determine category metadata if single category filtered
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

    // Show Single Filtered View with Cinematic Category Hero Header & Track List
    dynamicSectionsEl.innerHTML = `
      <div>
        <!-- Cinematic Category Hero Header -->
        ${!searchQuery ? `
          <div class="category-hero-banner relative rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl min-h-[260px] md:min-h-[300px] flex flex-col justify-end p-6 md:p-8" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(18,18,18,0.75) 60%, #121212 100%), url('${catMeta.heroImg}'); background-size: cover; background-position: center;">
            <div class="relative z-10 max-w-3xl">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full text-white bg-black/50 backdrop-blur-md border border-white/20 shadow-md">
                  <i data-lucide="sparkles" class="w-3 h-3 inline mr-1 text-yellow-400"></i> ${catMeta.badge}
                </span>
                <span class="text-xs text-gray-300 font-mono flex items-center gap-1">
                  <i data-lucide="music" class="w-3 h-3 text-brand"></i> ${songs.length} Tracks
                </span>
              </div>
              <h1 class="text-3xl md:text-5xl font-outfit font-black tracking-tight text-white drop-shadow-lg mb-2">
                ${catMeta.name}
              </h1>
              <p class="text-sm md:text-base font-semibold text-purple-200 drop-shadow mb-2">${catMeta.tagline}</p>
              <p class="text-xs md:text-sm text-gray-300 leading-relaxed drop-shadow line-clamp-2 max-w-2xl mb-6">${catMeta.description}</p>
              
              <!-- Hero Action Buttons -->
              <div class="flex flex-wrap items-center gap-3">
                <button onclick="playCategory('${activeCategoryFilter}', false)" class="bg-brand hover:bg-brand-hover text-white font-bold px-6 py-2.5 rounded-full flex items-center gap-2 transition hover:scale-105 shadow-xl shadow-brand/40">
                  <i data-lucide="play" class="w-4 h-4 fill-current"></i> Play All
                </button>
                <button onclick="playCategory('${activeCategoryFilter}', true)" class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 transition hover:scale-105 border border-white/15">
                  <i data-lucide="shuffle" class="w-4 h-4"></i> Shuffle
                </button>
                <button onclick="resetFilters()" class="text-xs text-gray-400 hover:text-white px-3 py-2 rounded-full transition flex items-center gap-1.5 hover:bg-white/5 ml-auto">
                  <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> Back to All
                </button>
              </div>
            </div>
          </div>
        ` : `
          <div class="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
            <div>
              <h2 class="text-2xl font-bold font-outfit text-white">
                Search Results for "${searchQuery}"
              </h2>
              <p class="text-xs text-gray-400 mt-1">${songs.length} tracks found matching your query</p>
            </div>
            <button onclick="resetFilters()" class="text-xs text-brand hover:underline font-semibold flex items-center gap-1.5 bg-brand/10 hover:bg-brand/20 px-3 py-1.5 rounded-full border border-brand/30 transition">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Reset Filter
            </button>
          </div>
        `}

        ${songs.length === 0 ? `
          <div class="p-12 text-center text-gray-400 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
            <i data-lucide="music" class="w-12 h-12 mx-auto mb-3 text-gray-600"></i>
            <p class="text-lg font-semibold text-white">No songs match your search</p>
            <p class="text-sm text-gray-500 mt-1">Try another artist name or category filter</p>
          </div>
        ` : `
          <!-- Card Grid -->
          <div class="mb-8">
            <h3 class="text-lg font-outfit font-bold mb-3 text-white flex items-center gap-2">
              <i data-lucide="layout-grid" class="w-4 h-4 text-brand"></i> Category Picks
            </h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              ${songs.map(song => renderSongCard(song)).join('')}
            </div>
          </div>

          <!-- Song Row Table -->
          <div class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden p-4 shadow-xl">
            <div class="text-xs text-gray-400 font-semibold px-4 py-2.5 flex items-center border-b border-white/10 uppercase tracking-wider">
              <span class="w-8">#</span>
              <span class="flex-1">Title & Artist</span>
              <span class="w-48 hidden md:block">Album / Folder</span>
              <span class="w-16 text-right">Time</span>
            </div>
            <div class="divide-y divide-white/5">
              ${songs.map((song, i) => renderSongRow(song, i + 1)).join('')}
            </div>
          </div>
        `}
      </div>
    `;
  } else {
    // Show Full Home Showcase: Top Dynamic Hero Banner + Category Explorer Grid + Categorized Sections
    const categoriesList = Object.keys(categoryMetadata);
    const spotlightCategory = categoryMetadata["Hillsong United"];

    dynamicSectionsEl.innerHTML = `
      <!-- Dynamic Featured Spotlight Hero Banner -->
      <div class="category-hero-banner relative rounded-3xl overflow-hidden mb-10 border border-white/10 shadow-2xl min-h-[280px] md:min-h-[340px] flex flex-col justify-end p-6 md:p-10" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(18,18,18,0.7) 50%, #121212 100%), url('${spotlightCategory.heroImg}'); background-size: cover; background-position: center 30%;">
        <div class="relative z-10 max-w-3xl">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full text-white bg-gradient-to-r from-brand to-purple-600 shadow-lg shadow-purple-900/50">
              <i data-lucide="flame" class="w-3 h-3 inline mr-1 text-yellow-300"></i> FEATURED SPOTLIGHT
            </span>
            <span class="text-xs text-purple-200/90 font-medium">3.4M Monthly Listeners</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-outfit font-black tracking-tight text-white drop-shadow-xl mb-2">
            ${spotlightCategory.name}
          </h1>
          <p class="text-sm md:text-base font-semibold text-purple-200 drop-shadow mb-2">${spotlightCategory.tagline}</p>
          <p class="text-xs md:text-sm text-gray-300 leading-relaxed drop-shadow line-clamp-2 max-w-2xl mb-6">${spotlightCategory.description}</p>
          
          <div class="flex flex-wrap items-center gap-3">
            <button onclick="playCategory('Hillsong United', false)" class="bg-brand hover:bg-brand-hover text-white font-bold px-7 py-3 rounded-full flex items-center gap-2.5 transition hover:scale-105 shadow-xl shadow-brand/40 text-sm">
              <i data-lucide="play" class="w-4 h-4 fill-current"></i> Listen Now
            </button>
            <button onclick="filterByCategory('Hillsong United')" class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold px-5 py-3 rounded-full flex items-center gap-2 transition hover:scale-105 border border-white/15 text-sm">
              <i data-lucide="sparkles" class="w-4 h-4 text-purple-300"></i> View All Tracks
            </button>
          </div>
        </div>
      </div>

      <!-- Category Hero Showcase Grid (Browse by Category) -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-2xl font-outfit font-black text-white flex items-center gap-2">
              <i data-lucide="compass" class="w-5 h-5 text-brand"></i> Explore Categories & Genres
            </h2>
            <p class="text-xs text-gray-400 mt-0.5">Select a category to view high-definition showcases & complete track collections</p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          ${categoriesList.map(catKey => {
            const meta = categoryMetadata[catKey];
            return `
              <div onclick="filterByCategory('${catKey}')" class="category-card-hover group relative rounded-2xl overflow-hidden cursor-pointer h-36 border border-white/10 shadow-lg" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%), url('${meta.heroImg}'); background-size: cover; background-position: center;">
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-brand/20 transition-all duration-300"></div>
                <div class="absolute top-2.5 left-2.5">
                  <span class="text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full text-white bg-black/60 backdrop-blur-md border border-white/10">
                    ${meta.badge}
                  </span>
                </div>
                <div class="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div class="overflow-hidden pr-2">
                    <span class="font-outfit font-bold text-xs text-white block truncate drop-shadow group-hover:text-purple-200 transition">${meta.shortName}</span>
                    <span class="text-[10px] text-gray-300 font-mono block mt-0.5">5 tracks</span>
                  </div>
                  <div class="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg shrink-0">
                    <i data-lucide="play" class="w-3.5 h-3.5 fill-current ml-0.5"></i>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Categorized Sections (5 songs each in every section) -->
      <div class="space-y-12">
        ${categoriesList.map(catKey => {
          const meta = categoryMetadata[catKey];
          const sectionSongs = allSongs.filter(s => s.category === catKey || s.folder === meta.folder);

          return `
            <section class="space-y-3">
              <div class="flex items-end justify-between">
                <div>
                  <h2 class="text-xl font-outfit font-bold text-white hover:text-brand transition cursor-pointer flex items-center gap-2 group" onclick="filterByCategory('${catKey}')">
                    <span>${meta.name}</span>
                    <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400 group-hover:text-brand transition-transform group-hover:translate-x-1"></i>
                  </h2>
                  <div class="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span class="text-[10px] uppercase font-bold text-brand bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-full">${meta.badge}</span>
                    <span class="font-mono text-gray-400 flex items-center gap-1">
                      <i data-lucide="folder" class="w-3 h-3 text-yellow-500"></i> ${meta.folder} (5 tracks)
                    </span>
                  </div>
                </div>
                <button onclick="filterByCategory('${catKey}')" class="text-xs text-gray-400 font-semibold hover:text-white hover:underline flex items-center gap-1">
                  Show all (${sectionSongs.length}) <i data-lucide="arrow-right" class="w-3 h-3"></i>
                </button>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
    <div onclick="playSongById(${song.id})" class="bg-white/5 hover:bg-white/10 backdrop-blur-md border ${isCurrent ? 'border-brand shadow-[0_0_20px_rgba(139,92,246,0.35)]' : 'border-white/5'} transition-all duration-300 p-3.5 rounded-2xl cursor-pointer group flex flex-col gap-2.5 shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-y-1">
      <div class="relative w-full aspect-square bg-surface-highlight rounded-xl shadow-inner overflow-hidden">
        <img src="${song.img}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${song.title}" />
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <button class="absolute bottom-2.5 right-2.5 bg-brand text-white rounded-full p-3 ${isCurrent && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:-translate-y-1'} hover:scale-110 transition-all shadow-[0_0_20px_rgba(139,92,246,0.7)] duration-300">
          <i data-lucide="${isCurrent && isPlaying ? 'pause' : 'play'}" class="w-4 h-4 fill-current ${isCurrent && isPlaying ? '' : 'ml-0.5'}"></i>
        </button>
      </div>
      <div class="flex flex-col overflow-hidden">
        <span class="font-outfit font-bold text-xs truncate tracking-wide text-white ${isCurrent ? 'text-brand font-extrabold' : ''}">${song.title}</span>
        <span class="text-[11px] text-gray-400 truncate mt-0.5">${song.artist}</span>
      </div>
    </div>
  `;
}

function renderSongRow(song, index) {
  const isCurrent = queue[currentTrackIndex]?.id === song.id;
  return `
    <div onclick="playSongById(${song.id})" class="flex items-center px-4 py-3 hover:bg-white/10 cursor-pointer rounded-xl transition group ${isCurrent ? 'bg-brand/15 text-brand' : 'text-gray-200'}">
      <span class="w-8 text-xs text-gray-400 group-hover:hidden">
        ${isCurrent && isPlaying ? `
          <div class="playing-equalizer">
            <span></span><span></span><span></span><span></span>
          </div>
        ` : index}
      </span>
      <span class="w-8 text-xs text-white hidden group-hover:inline-block"><i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i></span>
      
      <div class="flex items-center gap-3 flex-1 overflow-hidden">
        <img src="${song.img}" class="w-9 h-9 rounded-lg object-cover shrink-0 border border-white/10" alt="${song.title}" />
        <div class="flex flex-col overflow-hidden pr-2">
          <span class="text-xs font-semibold truncate ${isCurrent ? 'text-brand font-bold' : 'text-white'}">${song.title}</span>
          <span class="text-[10px] text-gray-400 truncate">${song.artist}</span>
        </div>
      </div>
      
      <div class="w-48 hidden md:flex flex-col text-[11px] text-gray-400 truncate">
        <span>${song.album}</span>
        <span class="text-[9px] text-gray-500 font-mono truncate">${song.folder}</span>
      </div>
      
      <span class="w-16 text-right text-xs text-gray-400 font-mono">${formatTime(song.duration)}</span>
    </div>
  `;
}

// -------------------------------------------------------------
// Filters & Search Handlers
// -------------------------------------------------------------
function setupFilterChipListeners() {
  categoryChips.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.querySelectorAll('.chip').forEach(c => {
        c.className = 'chip bg-surface-highlight hover:bg-gray-700 text-gray-200 text-xs font-semibold px-3.5 py-1.5 rounded-full transition hover:scale-105 whitespace-nowrap';
      });
      chip.className = 'chip active bg-white text-black font-semibold text-xs px-3.5 py-1.5 rounded-full transition hover:scale-105 whitespace-nowrap shadow';
      activeCategoryFilter = chip.dataset.filter;
      renderMainSections();
    });
  });
}

function filterByCategory(cat) {
  activeCategoryFilter = cat;
  categoryChips.querySelectorAll('.chip').forEach(c => {
    if (c.dataset.filter.toLowerCase() === cat.toLowerCase()) {
      c.className = 'chip active bg-white text-black font-semibold text-xs px-3.5 py-1.5 rounded-full transition hover:scale-105 whitespace-nowrap shadow';
      c.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else {
      c.className = 'chip bg-surface-highlight hover:bg-gray-700 text-gray-200 text-xs font-semibold px-3.5 py-1.5 rounded-full transition hover:scale-105 whitespace-nowrap';
    }
  });
  renderMainSections();
}

function resetFilters() {
  activeCategoryFilter = 'all';
  searchQuery = '';
  searchInput.value = '';
  searchClear.classList.add('hidden');
  const allChip = categoryChips.querySelector('[data-filter="all"]');
  if (allChip) allChip.click();
  else renderMainSections();
}

function setupSearchListeners() {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (searchQuery.trim() !== '') {
      searchClear.classList.remove('hidden');
    } else {
      searchClear.classList.add('hidden');
    }
    renderMainSections();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClear.classList.add('hidden');
    renderMainSections();
  });
}

function setGreeting() {
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  greetingEl.innerText = greeting;
}

// -------------------------------------------------------------
// Playback Engine
// -------------------------------------------------------------
function playSongById(id) {
  const foundIndex = queue.findIndex(s => s.id === id);
  if (foundIndex !== -1) {
    currentTrackIndex = foundIndex;
    loadTrack(currentTrackIndex);
    togglePlay(true);
    renderMainSections();
  }
}

function loadTrack(index) {
  const track = queue[index];
  if (!track) return;
  
  currentTitleEl.innerText = track.title;
  currentArtistEl.innerText = track.artist;
  currentAlbumArtEl.src = track.img;
  
  // Inject Lyrics
  lyricsContent.innerHTML = track.lyrics || "No lyrics available for this track.";
  
  updateMediaSessionMetadata(track);
  
  // Track Favorite State
  let favs = JSON.parse(localStorage.getItem('favs') || '[]');
  const isFav = favs.includes(track.id);
  if (btnFav) {
    btnFav.classList.toggle('text-brand', isFav);
    const icon = btnFav.querySelector('i');
    if (icon) icon.classList.toggle('fill-brand', isFav);
  }
  
  timeTotalEl.innerText = formatTime(track.duration);
  progressBar.style.width = '0%';
  timeCurrentEl.innerText = '0:00';
  
  activePlayback = 'audio';
  audioPlayer.pause();
  audioPlayer.src = encodeURI(track.audioSrc || track.fallbackAudioSrc);
  audioPlayer.load();
}

function togglePlay(forcePlay) {
  if (typeof forcePlay === 'boolean') {
    if (forcePlay) audioPlayer.play().catch(() => {});
    else audioPlayer.pause();
    return;
  }

  if (audioPlayer.paused) audioPlayer.play().catch(() => {});
  else audioPlayer.pause();
}

function playNext() {
  const wasPlaying = isPlaying;
  currentTrackIndex = (currentTrackIndex + 1) % queue.length;
  loadTrack(currentTrackIndex);
  if (wasPlaying) togglePlay(true);
  renderMainSections();
}

function playPrev() {
  if (audioPlayer.currentTime > 3) {
    audioPlayer.currentTime = 0;
    return;
  }
  const wasPlaying = isPlaying;
  currentTrackIndex = currentTrackIndex === 0 ? queue.length - 1 : currentTrackIndex - 1;
  loadTrack(currentTrackIndex);
  if (wasPlaying) togglePlay(true);
  renderMainSections();
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// -------------------------------------------------------------
// Event Listeners
// -------------------------------------------------------------
btnPlay.addEventListener('click', () => togglePlay());
btnNext.addEventListener('click', playNext);
btnPrev.addEventListener('click', playPrev);

if (btnFav) {
  btnFav.addEventListener('click', async () => {
    const currentTrackId = queue[currentTrackIndex].id;
    btnFav.classList.toggle('text-brand');
    const isNowFav = btnFav.classList.contains('text-brand');
    const icon = btnFav.querySelector('i');
    if (icon) icon.classList.toggle('fill-brand', isNowFav);
    
    if (isNowFav) {
      let favs = JSON.parse(localStorage.getItem('favs') || '[]');
      if (!favs.includes(currentTrackId)) favs.push(currentTrackId);
      localStorage.setItem('favs', JSON.stringify(favs));
      
      if (supabaseClient) supabaseClient.from('favorites').insert([{ device_id: deviceId, song_id: currentTrackId }]).catch(()=>{});
    } else {
      let favs = JSON.parse(localStorage.getItem('favs') || '[]');
      favs = favs.filter(id => id !== currentTrackId);
      localStorage.setItem('favs', JSON.stringify(favs));
      
      if (supabaseClient) supabaseClient.from('favorites').delete().match({ device_id: deviceId, song_id: currentTrackId }).catch(()=>{});
    }
  });
}

btnRepeat.addEventListener('click', () => {
  isRepeat = !isRepeat;
  btnRepeat.classList.toggle('text-brand', isRepeat);
});

btnSpeed.addEventListener('click', () => {
  speedIndex = (speedIndex + 1) % playbackSpeeds.length;
  const speed = playbackSpeeds[speedIndex];
  audioPlayer.playbackRate = speed;
  btnSpeed.innerText = speed + 'x';
});

progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  if (audioPlayer.duration > 0) {
    audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
  }
});

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && (e.target === document.body || e.target.tagName !== 'INPUT')) {
    e.preventDefault();
    togglePlay();
  }
});

// Lyrics Event Listeners
function updateLyricsPanelUI() {
  if (isLyricsOpen) {
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
  
  if (e.type === 'mousemove' && e.target !== volumeContainer) {
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
