// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // <-- INSERT YOUR URL HERE
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // <-- INSERT YOUR KEY HERE
const supabase = (window.supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL') 
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

// Unique Anonymous Session ID for Persistent Favorites
let deviceId = localStorage.getItem('deviceId');
if (!deviceId) {
  deviceId = crypto.randomUUID ? crypto.randomUUID() : 'id_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('deviceId', deviceId);
}

// -------------------------------------------------------------
// Comprehensive Song Catalog (5 songs in each folder)
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
    img: "https://ui-avatars.com/api/?name=Oceans&background=312e81&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=So+Will+I&background=1e1b4b&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Touch+Heaven&background=4338ca&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Beautiful+Name&background=4c1d95&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Good+Grace&background=5b21b6&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Break+Chains&background=831843&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=You+Know+Me&background=9d174d&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Your+Glory&background=be185d&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Fill+Me+Up&background=9f1239&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=In+Spite&background=701a75&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Graves+Gardens&background=0284c7&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=The+Blessing&background=0369a1&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Jireh&background=075985&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=RATTLE&background=0e7490&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Praise&background=155e75&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=My+Worship&background=7c2d12&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Atmosphere&background=9a3412&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Lion+Judah&background=c2410c&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Jesus&background=ea580c&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Ransom&background=f97316&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Made+A+Way&background=854d0e&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Intentional&background=a16207&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=You+Waited&background=ca8a04&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Wont+Let+Go&background=eab308&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Good+Loved&background=facc15&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=Goodness+God&background=14532d&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Believe+For+It&background=166534&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Alabaster&background=15803d&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Mercy+No&background=22c55e&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=My+King&background=16a34a&color=fff&size=200",
    youtubeId: "z2pY5w8L1Xw",
    lyrics: "He's the Lion and the Lamb, the Alpha and Omega<br/>Ruler of the nations, healer of the broken<br/>That's my King, that's my Lord!"
  },

  // ===========================================================
  // 7. Nathaniel Bassey (music/Gospel/Nathaniel_Bassey) - 5 Songs
  // ===========================================================
  {
    id: 31,
    title: "Imela",
    artist: "Nathaniel Bassey",
    album: "Someone's at the Door",
    category: "Nathaniel Bassey",
    folder: "music/Gospel/Nathaniel_Bassey",
    duration: 326,
    img: "https://ui-avatars.com/api/?name=Imela&background=1e3a8a&color=fff&size=200",
    youtubeId: "EnYZQfS3SVE",
    lyrics: "When I think upon Your goodness and Your faithfulness each day<br/>I'm convinced it's not because I am worthy to receive the kind of love that You give<br/><br/>(Chorus)<br/>Imela, Imela, Okaka, Onyekeruwa<br/>Imela, Imela, Eze mo!"
  },
  {
    id: 32,
    title: "Olowogbogboro",
    artist: "Nathaniel Bassey",
    album: "Jesus: The Resurrection",
    category: "Nathaniel Bassey",
    folder: "music/Gospel/Nathaniel_Bassey",
    duration: 370,
    img: "https://ui-avatars.com/api/?name=Olowogbogboro&background=1e40af&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Tobechukwu&background=2563eb&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Onise+Iyanu&background=1d4ed8&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=King+Is+Coming&background=3b82f6&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Way+Maker&background=4c1d95&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=I+Know&background=581c87&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Great+Lord&background=6b21a8&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=He+Did+It&background=7e22ce&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Overflow&background=9333ea&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Excess+Love&background=9f1239&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Chinedum&background=be123c&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Obinasom&background=e11d48&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Na+You+Reign&background=f43f5e&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Trust&background=fb7185&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=Make+A+Way&background=854d0e&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Give+Thanks&background=a16207&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Thank+You&background=ca8a04&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Offer+Life&background=eab308&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=God+Is+Good&background=facc15&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=Jazz+Devotion&background=1e40af&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Sax+Praise&background=1d4ed8&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Midnight+Jazz&background=2563eb&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Hallelujah+Jazz&background=3b82f6&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Sweet+Prayer&background=60a5fa&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=Delta+Blues&background=b45309&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Memphis+Praise&background=d97706&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Crossroad&background=f59e0b&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=Acoustic+Blues&background=fbbf24&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=Slide+Guitar&background=fde68a&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=Classical&background=047857&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Majesty+Adagio&background=059669&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Holy+Holy&background=10b981&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Cello+Solo&background=34d399&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=Brass+Fanfare&background=6ee7b7&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=RnB+Worship&background=be123c&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Heavenly+Harmonies&background=e11d48&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Unfailing+Melody&background=f43f5e&color=fff&size=200",
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
    img: "https://ui-avatars.com/api/?name=Late+Night&background=fda4af&color=000&size=200",
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
    img: "https://ui-avatars.com/api/?name=Grace+Soul&background=fecdd3&color=000&size=200",
    youtubeId: "velvet_soul_05",
    lyrics: "Amazing grace, how sweet the sound, saved a soul that was lost and found!"
  }
];

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

// Artists metadata
const artistsData = [
  { name: "Hillsong United", songs: 5, img: "https://ui-avatars.com/api/?name=HU&background=312e81&color=fff&size=150" },
  { name: "Tasha Cobbs", songs: 5, img: "https://ui-avatars.com/api/?name=TC&background=831843&color=fff&size=150" },
  { name: "Elevation Worship", songs: 5, img: "https://ui-avatars.com/api/?name=EW&background=0284c7&color=fff&size=150" },
  { name: "Phil Thompson", songs: 5, img: "https://ui-avatars.com/api/?name=PT&background=7c2d12&color=fff&size=150" },
  { name: "Travis Greene", songs: 5, img: "https://ui-avatars.com/api/?name=TG&background=854d0e&color=fff&size=150" },
  { name: "CeCe Winans", songs: 5, img: "https://ui-avatars.com/api/?name=CW&background=14532d&color=fff&size=150" },
  { name: "Nathaniel Bassey", songs: 5, img: "https://ui-avatars.com/api/?name=NB&background=1e40af&color=fff&size=150" },
  { name: "Sinach", songs: 5, img: "https://ui-avatars.com/api/?name=SI&background=4c1d95&color=fff&size=150" },
  { name: "Mercy Chinwo", songs: 5, img: "https://ui-avatars.com/api/?name=MC&background=9f1239&color=fff&size=150" },
  { name: "Don Moen", songs: 5, img: "https://ui-avatars.com/api/?name=DM&background=ca8a04&color=fff&size=150" }
];

// Top Featured Grid Albums
const featuredAlbums = [
  { id: 1, title: "Oceans (Where Feet May Fail)", artist: "Hillsong United", img: "https://ui-avatars.com/api/?name=HU&background=312e81&color=fff&size=150" },
  { id: 6, title: "Break Every Chain", artist: "Tasha Cobbs", img: "https://ui-avatars.com/api/?name=TC&background=831843&color=fff&size=150" },
  { id: 11, title: "Graves Into Gardens", artist: "Elevation Worship", img: "https://ui-avatars.com/api/?name=EW&background=0284c7&color=fff&size=150" },
  { id: 16, title: "My Worship", artist: "Phil Thompson", img: "https://ui-avatars.com/api/?name=PT&background=7c2d12&color=fff&size=150" },
  { id: 21, title: "Made A Way", artist: "Travis Greene", img: "https://ui-avatars.com/api/?name=TG&background=854d0e&color=fff&size=150" },
  { id: 26, title: "Goodness of God", artist: "CeCe Winans", img: "https://ui-avatars.com/api/?name=CW&background=14532d&color=fff&size=150" },
  { id: 31, title: "Imela", artist: "Nathaniel Bassey", img: "https://ui-avatars.com/api/?name=NB&background=1e40af&color=fff&size=150" },
  { id: 36, title: "Way Maker", artist: "Sinach", img: "https://ui-avatars.com/api/?name=SI&background=4c1d95&color=fff&size=150" }
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

let isLyricsOpen = false;
let savedVolume = localStorage.getItem('playerVolume') ? parseFloat(localStorage.getItem('playerVolume')) : 1.0;

let ytPlayer = null;
let ytInterval = null;
let ytReady = false;

// -------------------------------------------------------------
// YouTube IFrame Initialization
// -------------------------------------------------------------
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
  if (ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(Math.round(savedVolume * 100));
  loadTrack(currentTrackIndex);
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
    if (isRepeat) {
      if (ytPlayer && ytPlayer.seekTo) ytPlayer.seekTo(0);
      if (ytPlayer && ytPlayer.playVideo) ytPlayer.playVideo();
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

// -------------------------------------------------------------
// Initialization
// -------------------------------------------------------------
async function init() {
  if (supabase) {
    try {
      const { data: dbQueue } = await supabase.from('queue').select('*');
      if (dbQueue && dbQueue.length > 0) {
        queue = dbQueue;
      }
    } catch (e) {
      console.warn("Supabase fetch failed. Using full enriched local queue with 70 songs.");
    }
  }

  populateSidebar();
  renderFeaturedGrid();
  renderMainSections();
  setGreeting();
  setupSidebarTabListeners();
  setupFilterChipListeners();
  setupSearchListeners();
  
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
      album: track.album || 'Gospel Collection',
      artwork: [ { src: track.img.replace('200', '512'), sizes: '512x512', type: 'image/png' } ]
    });
  }
}

// -------------------------------------------------------------
// Sidebar Views (Playlists / Artists / Folders)
// -------------------------------------------------------------
function populateSidebar() {
  if (currentSidebarTab === 'playlists') {
    sidebarPlaylistsEl.innerHTML = playlistsData.map(p => `
      <div onclick="filterByCategory('${p.category}')" class="group flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-surface-highlight cursor-pointer transition text-gray-300 hover:text-white">
        <div class="flex items-center gap-3 overflow-hidden">
          <i data-lucide="disc" class="w-4 h-4 text-brand shrink-0"></i>
          <span class="text-xs font-medium truncate">${p.name}</span>
        </div>
        <span class="text-[10px] text-gray-500 group-hover:text-gray-300 font-mono">${p.count} songs</span>
      </div>
    `).join('');
  } else if (currentSidebarTab === 'artists') {
    sidebarPlaylistsEl.innerHTML = artistsData.map(a => `
      <div onclick="filterByCategory('${a.name}')" class="group flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-surface-highlight cursor-pointer transition text-gray-300 hover:text-white">
        <img src="${a.img}" class="w-7 h-7 rounded-full object-cover shrink-0 border border-white/10" alt="${a.name}" />
        <div class="flex flex-col overflow-hidden">
          <span class="text-xs font-medium truncate">${a.name}</span>
          <span class="text-[10px] text-gray-500">${a.songs} songs</span>
        </div>
      </div>
    `).join('');
  } else if (currentSidebarTab === 'folders') {
    sidebarPlaylistsEl.innerHTML = foldersData.map(f => `
      <div onclick="filterByCategory('${f.filter}')" class="group flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-surface-highlight cursor-pointer transition text-gray-300 hover:text-white">
        <i data-lucide="folder" class="w-4 h-4 text-yellow-500 shrink-0"></i>
        <div class="flex flex-col overflow-hidden">
          <span class="text-xs font-medium truncate">${f.label}</span>
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
    <div onclick="playSongById(${album.id})" class="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/5 transition-all duration-300 rounded-xl overflow-hidden flex items-center group cursor-pointer h-16 shadow-lg hover:shadow-[0_4px_20px_rgba(139,92,246,0.25)] hover:-translate-y-0.5">
      <img src="${album.img}" class="h-16 w-16 object-cover shrink-0" alt="${album.title}" />
      <div class="flex flex-col px-3 overflow-hidden">
        <span class="font-outfit font-bold text-xs truncate text-white">${album.title}</span>
        <span class="text-[11px] text-gray-400 truncate">${album.artist}</span>
      </div>
      <button class="ml-auto mr-3 bg-brand text-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all shadow-[0_0_15px_rgba(139,92,246,0.6)] shrink-0">
        <i data-lucide="play" class="w-4 h-4 fill-current"></i>
      </button>
    </div>
  `).join('');
  lucide.createIcons();
}

// -------------------------------------------------------------
// Dynamic Sections & Category Cards
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

function renderMainSections() {
  const songs = getFilteredSongs();
  
  if (activeCategoryFilter !== 'all' || searchQuery.trim() !== '') {
    // Show Single Filtered View with Track List & Cards
    dynamicSectionsEl.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold font-outfit">
            ${searchQuery ? `Search Results for "${searchQuery}"` : activeCategoryFilter} 
            <span class="text-sm font-normal text-gray-400">(${songs.length} tracks found)</span>
          </h2>
          ${activeCategoryFilter !== 'all' || searchQuery ? `
            <button onclick="resetFilters()" class="text-xs text-brand hover:underline font-semibold flex items-center gap-1">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Reset Filter
            </button>
          ` : ''}
        </div>

        ${songs.length === 0 ? `
          <div class="p-12 text-center text-gray-400 bg-white/5 rounded-2xl border border-white/5">
            <i data-lucide="music" class="w-12 h-12 mx-auto mb-3 text-gray-600"></i>
            <p class="text-lg font-semibold">No songs match your search</p>
            <p class="text-sm text-gray-500 mt-1">Try another artist name or category filter</p>
          </div>
        ` : `
          <!-- Card Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
            ${songs.map(song => renderSongCard(song)).join('')}
          </div>

          <!-- Song Row Table -->
          <div class="bg-black/30 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden p-3">
            <div class="text-xs text-gray-400 font-semibold px-4 py-2 flex items-center border-b border-white/5">
              <span class="w-8">#</span>
              <span class="flex-1">Title</span>
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
    // Show Full Categorized Sections (5 songs each in every section)
    const sections = [
      { name: "Hillsong United & Worship", filter: "Hillsong United", folder: "music/Gospel/Hillsong_United" },
      { name: "Tasha Cobbs Leonard", filter: "Tasha Cobbs", folder: "music/Gospel/Tasha_Cobbs" },
      { name: "Elevation Worship", filter: "Elevation Worship", folder: "music/Gospel/Elevation_Worship" },
      { name: "Phil Thompson", filter: "Phil Thompson", folder: "music/Gospel/Phil_Thompson" },
      { name: "Travis Greene", filter: "Travis Greene", folder: "music/Gospel/Travis_Greene" },
      { name: "CeCe Winans", filter: "CeCe Winans", folder: "music/Gospel/CeCe_Winans" },
      { name: "Nathaniel Bassey", filter: "Nathaniel Bassey", folder: "music/Gospel/Nathaniel_Bassey" },
      { name: "Sinach", filter: "Sinach", folder: "music/Gospel/Sinach" },
      { name: "Mercy Chinwo", filter: "Mercy Chinwo", folder: "music/Gospel/Mercy_Chinwo" },
      { name: "Don Moen", filter: "Don Moen", folder: "music/Gospel/Don_Moen" },
      { name: "Gospel Jazz", filter: "Gospel Jazz", folder: "music/Jazz/Gospel_Jazz" },
      { name: "Blues Devotional", filter: "Blues Devotional", folder: "music/Blues/Gospel_Blues" },
      { name: "Classical Symphony Worship", filter: "Classical Worship", folder: "music/Classical/Symphony_Worship" },
      { name: "RnB Worship", filter: "RnB Worship", folder: "music/RnB/RnB_Gospel" }
    ];

    dynamicSectionsEl.innerHTML = sections.map(sec => {
      const sectionSongs = allSongs.filter(s => s.category === sec.filter || s.folder === sec.folder);

      return `
        <section class="space-y-3">
          <div class="flex items-end justify-between">
            <div>
              <h2 class="text-xl font-outfit font-bold text-white hover:text-brand transition cursor-pointer flex items-center gap-2" onclick="filterByCategory('${sec.filter}')">
                ${sec.name}
                <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
              </h2>
              <span class="text-xs text-gray-400 font-mono flex items-center gap-1 mt-0.5">
                <i data-lucide="folder" class="w-3 h-3 text-yellow-500"></i> ${sec.folder} (5 songs)
              </span>
            </div>
            <button onclick="filterByCategory('${sec.filter}')" class="text-xs text-gray-400 font-semibold hover:text-white hover:underline">
              Show all (${sectionSongs.length})
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            ${sectionSongs.map(song => renderSongCard(song)).join('')}
          </div>
        </section>
      `;
    }).join('');
  }

  lucide.createIcons();
}

function renderSongCard(song) {
  const isCurrent = queue[currentTrackIndex]?.id === song.id;
  return `
    <div onclick="playSongById(${song.id})" class="bg-white/5 hover:bg-white/10 backdrop-blur-md border ${isCurrent ? 'border-brand shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'border-white/5'} transition-all duration-300 p-3.5 rounded-xl cursor-pointer group flex flex-col gap-2.5 shadow-lg hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)] hover:-translate-y-1">
      <div class="relative w-full aspect-square bg-surface-highlight rounded-lg shadow-inner overflow-hidden">
        <img src="${song.img}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${song.title}" />
        <button class="absolute bottom-2 right-2 bg-brand text-white rounded-full p-2.5 ${isCurrent && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:-translate-y-1'} hover:scale-110 transition-all shadow-[0_0_15px_rgba(139,92,246,0.6)] duration-300">
          <i data-lucide="${isCurrent && isPlaying ? 'pause' : 'play'}" class="w-4 h-4 fill-current"></i>
        </button>
      </div>
      <div class="flex flex-col overflow-hidden">
        <span class="font-outfit font-bold text-xs truncate tracking-wide text-white ${isCurrent ? 'text-brand' : ''}">${song.title}</span>
        <span class="text-[11px] text-gray-400 truncate mt-0.5">${song.artist}</span>
      </div>
    </div>
  `;
}

function renderSongRow(song, index) {
  const isCurrent = queue[currentTrackIndex]?.id === song.id;
  return `
    <div onclick="playSongById(${song.id})" class="flex items-center px-4 py-2.5 hover:bg-white/10 cursor-pointer rounded-lg transition group ${isCurrent ? 'bg-brand/10 text-brand' : 'text-gray-200'}">
      <span class="w-8 text-xs text-gray-400 group-hover:hidden">${index}</span>
      <span class="w-8 text-xs text-white hidden group-hover:inline-block"><i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i></span>
      
      <div class="flex items-center gap-3 flex-1 overflow-hidden">
        <img src="${song.img}" class="w-8 h-8 rounded object-cover shrink-0 border border-white/10" alt="${song.title}" />
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
  categoryChips.querySelector('[data-filter="all"]').click();
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
    if (forcePlay && !isPlaying) {
       if (ytPlayer.playVideo) ytPlayer.playVideo();
    } else if (!forcePlay && isPlaying) {
       if (ytPlayer.pauseVideo) ytPlayer.pauseVideo();
    }
    return;
  }
  
  if (isPlaying) {
    if (ytPlayer.pauseVideo) ytPlayer.pauseVideo();
  } else {
    if (ytPlayer.playVideo) ytPlayer.playVideo();
  }
}

function playNext() {
  currentTrackIndex = (currentTrackIndex + 1) % queue.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) togglePlay(true);
  renderMainSections();
}

function playPrev() {
  if (ytReady && ytPlayer && ytPlayer.getCurrentTime && ytPlayer.getCurrentTime() > 3) {
    ytPlayer.seekTo(0);
  } else {
    currentTrackIndex = currentTrackIndex === 0 ? queue.length - 1 : currentTrackIndex - 1;
    loadTrack(currentTrackIndex);
  }
  if (isPlaying) togglePlay(true);
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

btnFav.addEventListener('click', async () => {
  const currentTrackId = queue[currentTrackIndex].id;
  btnFav.classList.toggle('text-brand');
  const isNowFav = btnFav.classList.contains('text-brand');
  const icon = btnFav.querySelector('i');
  
  if (isNowFav) {
    icon.classList.add('fill-brand');
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');
    if (!favs.includes(currentTrackId)) favs.push(currentTrackId);
    localStorage.setItem('favs', JSON.stringify(favs));
    
    if (supabase) supabase.from('favorites').insert([{ device_id: deviceId, song_id: currentTrackId }]).catch(()=>{});
  } else {
    icon.classList.remove('fill-brand');
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');
    favs = favs.filter(id => id !== currentTrackId);
    localStorage.setItem('favs', JSON.stringify(favs));
    
    if (supabase) supabase.from('favorites').delete().match({ device_id: deviceId, song_id: currentTrackId }).catch(()=>{});
  }
});

btnRepeat.addEventListener('click', () => {
  isRepeat = !isRepeat;
  btnRepeat.classList.toggle('text-brand', isRepeat);
});

btnSpeed.addEventListener('click', () => {
  speedIndex = (speedIndex + 1) % playbackSpeeds.length;
  const speed = playbackSpeeds[speedIndex];
  if (ytReady && ytPlayer && ytPlayer.setPlaybackRate) {
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
  if (ytInterval) clearInterval(ytInterval);
}

function updateProgress() {
  if (!ytReady || !ytPlayer || !ytPlayer.getCurrentTime) return;
  const currentTime = ytPlayer.getCurrentTime() || 0;
  let duration = queue[currentTrackIndex]?.duration || 0;
  if (ytPlayer.getDuration && ytPlayer.getDuration() > 0) duration = ytPlayer.getDuration();
  
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
  if (ytReady && ytPlayer && ytPlayer.getDuration && ytPlayer.getDuration() > 0) duration = ytPlayer.getDuration();
  
  if (duration > 0 && ytReady && ytPlayer) {
    const newTime = (clickX / width) * duration;
    ytPlayer.seekTo(newTime, true);
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
