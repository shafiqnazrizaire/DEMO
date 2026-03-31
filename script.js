                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                // Global variables
let currentPage = 'home';
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
let currentModalPlace = null; // Track current place in modal

// Places data
const places = [
    {
        id: 1,
        name: "Escape Penang",
        image: "https://malaysiacamping.com/wp-content/uploads/2021/10/escape2-1.jpg",
        description: "Adventure theme park in Penang. Located in Teluk Bahang, Escape Penang offers ziplines, rope courses, and water slides. Top-rated outdoor activities for families in Penang.",
        mapLink: "https://share.google/qRK6T4lrALoZwqeLf",
        details: {
            bestTime: "March to October (dry season)",
            entryFee: "RM 115 - RM 174 (varies by package)",
            openingHours: "10:00 AM - 6:00 PM (closed on Tuesdays)",
            parking: "Free parking available",
            foodDrinks: "Multiple restaurants and cafes on-site",
            photography: "Photography allowed throughout the park",
            accessibility: "Wheelchair accessible with special assistance",
            tips: "Book online for discounts and arrive early to avoid crowds"
        }
    },
    {
        id: 2,
        name: "Butterfly Farm",
        image: "https://d2ile4x3f22snf.cloudfront.net/wp-content/uploads/sites/223/2017/12/12095945/Entopia2.jpg",
        description: "Entopia Butterfly Farm, Penang. This natural attraction is a living museum with a tropical garden, thousands of free-flying butterflies, and an insect discovery center. A unique ecotourism destination in Penang.",
        mapLink: "https://share.google/KJrQsxTeiTxu9P8aH",
        details: {
            bestTime: "9:00 AM - 11:00 AM (butterflies most active)",
            entryFee: "RM 45 - RM 55 (varies by package)",
            openingHours: "9:00 AM - 5:30 PM (daily)",
            parking: "Free parking available",
            foodDrinks: "Café with light refreshments",
            photography: "Photography allowed (no flash)",
            accessibility: "Partially wheelchair accessible",
            tips: "Visit early morning when butterflies are most active and bring a camera"
        }
    },
    {
        id: 3,
        name: "Penang Hill",
        image: "https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9c3RGQHTP2oT4ZXW+QmPVVkFQiXFSv42UaHGzSmaSzQ8DO5QIbWPZuF+VkYVRk6gh-Vg4ECbfuQRQ4pHjWJ5Rmbtkk=/2000834351036/Penang-Hill-and-Temple-Tour-dc452644-5516-4c76-a956-172c1bc54c29.jpeg?tr=q-60,c-at_max,w-1280,h-720&_src=imagekit",
        description: "Ascend to the peak of Penang Hill for a refreshing escape from the city heat. Ride the iconic funicular train to the top, where you will be rewarded with breathtaking panoramic views of George Town and the mainland. Explore gardens, temples, and more at this must-visit Penang landmark.",
        mapLink: "https://share.google/fb8xxT4CwHh8xbi0c",
        details: {
            bestTime: "Early morning or late afternoon (cooler weather)",
            entryFee: "RM 30 (adults), RM 15 (children) + funicular ticket",
            openingHours: "6:30 AM - 11:00 PM (funicular operates until 11 PM)",
            parking: "Parking available at base station",
            foodDrinks: "Multiple restaurants and food stalls at the top",
            photography: "Photography allowed with stunning panoramic views",
            accessibility: "Funicular accessible, some areas may be challenging",
            tips: "Take the funicular early to avoid queues and enjoy the cool mountain air"
        }
    },
    {
        id: 4,
        name: "Kek Lok Si Temple",
        image: "https://onpenang.com/wp-content/uploads/2024/01/Kek-Lok-Si-Temple-Penang.jpg",
        description: "Explore the majestic Kek Lok Si Temple, the largest Buddhist temple in Malaysia. Situated on a hilltop in Air Itam, this temple complex features impressive pagodas, beautiful gardens, and a towering bronze statue of the Goddess of Mercy. A cultural and spiritual jewel of Penang, especially during Chinese New Year.",
        mapLink: "https://share.google/6FfaU2ajKIPWR8h3R",
        details: {
            bestTime: "Early morning or during Chinese New Year (festive atmosphere)",
            entryFee: "Free entry (donations welcome)",
            openingHours: "7:00 AM - 9:00 PM (daily)",
            parking: "Free parking available",
            foodDrinks: "Vegetarian restaurants and tea houses nearby",
            photography: "Photography allowed (respectful photography)",
            accessibility: "Some areas accessible, steep inclines in parts",
            tips: "Visit during Chinese New Year for spectacular decorations and lighting"
        }
    },
    {
        id: 5,
        name: "Botanical Gardens",
        image: "https://phbr.penanghill.gov.my/wp-content/uploads/2023/04/Penang-Botanical-Gardens.png",
        description: "Relax and reconnect with nature at the Penang Botanical Gardens, also known as the Waterfall Gardens. This tranquil green space is ideal for jogging, picnicking, and observing native flora and resident macaque monkeys. A perfect, free-entry spot for a peaceful morning stroll in Penang.",
        mapLink: "https://share.google/snsZmhQO9dTeYJCIk",
        details: {
            bestTime: "Early morning (6:00 AM - 9:00 AM) for cool weather",
            entryFee: "Free entry",
            openingHours: "5:00 AM - 8:00 PM (daily)",
            parking: "Free parking available",
            foodDrinks: "Small café and vending machines",
            photography: "Photography allowed (perfect for nature shots)",
            accessibility: "Mostly accessible with paved paths",
            tips: "Visit early morning to see locals doing tai chi and enjoy the peaceful atmosphere"
        }
    },
    {
        id: 6,
        name: "The Habitat Penang Hill",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/fb/10/15/the-habitat-penang-hill.jpg?w=1400&h=-1&s=1",
        description: "Immerse yourself in the ancient rainforest at The Habitat Penang Hill. Walk amongst the treetops on the Langur Way Canopy Walk, enjoy stunning views from the Curtis Crest Tree Top Walk, and learn about the unique biodiversity of Penang's natural heritage. An unmissable ecotourism experience.",
        mapLink: "https://share.google/AYmQe9NNEKMZHofLC",
        details: {
            bestTime: "Early morning or late afternoon (avoid midday heat)",
            entryFee: "RM 60 (adults), RM 30 (children)",
            openingHours: "9:00 AM - 6:00 PM (last entry 5:00 PM)",
            parking: "Parking at Penang Hill base station",
            foodDrinks: "Restaurant with local and international cuisine",
            photography: "Photography allowed (stunning canopy walk views)",
            accessibility: "Limited accessibility due to nature trails",
            tips: "Combine with Penang Hill visit and bring comfortable walking shoes"
        }
    },
    {
        id: 7,
        name: "Penang National Park",
        image: "https://www.thelostpassport.com/wp-content/uploads/2020/08/Pantai-Keracut-Beach-Penang-National-Park.jpg",
        description: "Embark on an adventure at Penang National Park (Taman Negara Pulau Pinang), Malaysia’s smallest national park. Hike through pristine rainforests to secluded beaches like Monkey Beach and Teluk Bahang. An ideal destination for nature lovers and hikers seeking an off-the-beaten-path experience in Penang.",
        mapLink: "https://share.google/SzXNvNNpGqEsopwpp",
        details: {
            bestTime: "Early morning (7:00 AM - 10:00 AM) for hiking",
            entryFee: "Free entry",
            openingHours: "7:00 AM - 7:00 PM (daily)",
            parking: "Free parking available",
            foodDrinks: "Basic food stalls and bring your own water",
            photography: "Photography allowed (beautiful nature and beach views)",
            accessibility: "Limited accessibility due to hiking trails",
            tips: "Start early for hiking, bring plenty of water and wear proper hiking shoes"
        }
    },
    {
        id: 8,
        name: "Chew Jetty",
        image: "https://image-tc.galaxy.tf/wijpeg-4v3h3l0khh4vhzs3ql8hu3l5t/chew-jetty-penang-places-of-interest-thumbnail-w600_standard.jpg?crop=0%2C0%2C600%2C450&width=1140",
        description: "Step back in time at Chew Jetty, one of the historic clan jetties in George Town, Penang. This UNESCO World Heritage Site offers a glimpse into the unique lifestyle of the local Chinese community living in houses on stilts. Visit for a scenic walk, charming street art, and delicious local food.",
        mapLink: "https://share.google/Edxqdse1wDBBdTjDX",
        details: {
            bestTime: "Early morning or late afternoon (avoid midday heat)",
            entryFee: "Free entry (donations welcome)",
            openingHours: "24/7 (residential area)",
            parking: "Street parking available nearby",
            foodDrinks: "Local seafood restaurants and street food",
            photography: "Photography allowed (respectful of residents)",
            accessibility: "Limited accessibility due to wooden walkways",
            tips: "Visit during sunrise or sunset for the best photos and fewer crowds"
        }
    },
    {
        id: 9,
        name: "The Top Komtar",
        image: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1440960gsm/events/2022/09/19/4bdb41e9-5f40-4fbc-b041-dfa1834133f2-1663572701530-994551c2587c74b2d4db0f95ad5ea8a0.jpg",
        description: "Elevate your Penang experience at The Top Komtar, the tallest building on the island. Offering exhilarating attractions like the Rainbow Skywalk and Jurassic Research Center, The Top provides 360-degree panoramic views of George Town and beyond. A perfect destination for family fun and stunning photo opportunities.",
        mapLink: "https://share.google/I074kA2bL0cyxRwNc",
        details: {
            bestTime: "Late afternoon to evening (best views and lighting)",
            entryFee: "RM 60 - RM 120 (varies by package and attractions)",
            openingHours: "10:00 AM - 10:00 PM (daily)",
            parking: "Paid parking available in Komtar complex",
            foodDrinks: "Multiple restaurants and cafes on different levels",
            photography: "Photography allowed (stunning city views)",
            accessibility: "Fully wheelchair accessible with elevators",
            tips: "Book combo packages for better value and visit during sunset for amazing views"
        }
    },
    {
        id: 10,
        name: "Armenian Street",
        image: "https://image-tc.galaxy.tf/wijpeg-4inu9rpahadpztijzy61g9883/armenian-street_standard.jpg?crop=56%2C0%2C912%2C684&width=1140",
        description: "Wander through the historic heart of George Town along Armenian Street. Famous for its vibrant street art, bustling cafes, and unique souvenir shops, this street embodies Penang's rich cultural heritage. Discover iconic murals and charming architecture on a leisurely stroll through this artistic hub.",
        mapLink: "https://share.google/seHJSgAvZsg1v4er3",
        details: {
            bestTime: "Early morning (8:00 AM - 10:00 AM) or late afternoon (4:00 PM - 6:00 PM)",
            entryFee: "Free entry",
            openingHours: "24/7 (shops typically 9:00 AM - 9:00 PM)",
            parking: "Limited street parking, use nearby parking lots",
            foodDrinks: "Numerous cafes, restaurants, and street food vendors",
            photography: "Photography allowed (famous street art murals)",
            accessibility: "Mostly accessible with some narrow walkways",
            tips: "Visit early morning for fewer crowds and better photo opportunities of the street art"
        }
    },
    {
        id: 11,
        name: "Leong San Tong Khoo Kongsi",
        image: "https://www.khookongsi.com.my/wp-content/uploads/2012/08/home-khookongsi-clanhouse.jpg",
        description: "Discover the grandeur of Leong San Tong Khoo Kongsi, one of Penang's most magnificent Chinese clan houses. This architectural masterpiece in George Town showcases intricate carvings, ornate statues, and a rich history. A must-see cultural landmark for anyone interested in Chinese heritage in Penang.",
        mapLink: "https://share.google/g281o1M5EqpKYshPQ",
        details: {
            bestTime: "Morning (9:00 AM - 11:00 AM) for guided tours",
            entryFee: "RM 10 (adults), RM 5 (children)",
            openingHours: "9:00 AM - 5:00 PM (daily)",
            parking: "Street parking available nearby",
            foodDrinks: "Traditional Chinese restaurants in the area",
            photography: "Photography allowed (respectful of religious site)",
            accessibility: "Limited accessibility due to traditional architecture",
            tips: "Join a guided tour to learn about the rich history and cultural significance"
        }
    },
    {
        id: 12,
        name: "Penang Street Art",
        image: "https://globaldebauchery.com/wp-content/uploads/2023/11/penang-street-art-siblings-on-a-swing-720x471.webp?crop=1",
        description: "Uncover the creative soul of George Town through its world-renowned street art. Embark on a self-guided tour to find the famous murals by Ernest Zacharevic and other local artists scattered throughout the UNESCO World Heritage Site. Penang Street Art is a free and fun way to explore the city's charming lanes.",
        mapLink: "https://share.google/sWMFWVfoAH5QLfDFw",
        details: {
            bestTime: "Early morning (7:00 AM - 9:00 AM) or late afternoon (4:00 PM - 6:00 PM)",
            entryFee: "Free entry",
            openingHours: "24/7 (best viewed during daylight)",
            parking: "Street parking available in various locations",
            foodDrinks: "Cafes and street food along the art trail",
            photography: "Photography encouraged (perfect for Instagram)",
            accessibility: "Mostly accessible with some narrow lanes",
            tips: "Download a street art map or join a guided tour to find all the murals"
        }
    },
    {
        id: 13,
        name: "Floating Mosque",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Penang_Malaysia_Sunrise_at_Tanjong_Bungah_Mosque-04and_%284461552447%29.jpg/1280px-Penang_Malaysia_Sunrise_at_Tanjong_Bungah_Mosque-04and_%284461552447%29.jpg",
        description: "Marvel at the beautiful Masjid Terapung (Floating Mosque) in Tanjung Bungah, Penang. Its stunning architecture seems to float on the water, creating a serene and picturesque sight, especially during sunrise and sunset. A peaceful and spiritual landmark offering a unique photo opportunity",
        mapLink: "https://share.google/AbgawuG8h3RcDIuU4",
        details: {
            bestTime: "Sunrise (6:00 AM - 7:00 AM) or sunset (6:00 PM - 7:00 PM)",
            entryFee: "Free entry",
            openingHours: "5:00 AM - 10:00 PM (prayer times may affect access)",
            parking: "Free parking available",
            foodDrinks: "Local restaurants nearby",
            photography: "Photography allowed (respectful of religious site)",
            accessibility: "Fully wheelchair accessible",
            tips: "Visit during prayer times to experience the spiritual atmosphere, dress modestly"
        }
    },
    {
        id: 14,
        name: "Kapitan Keling Mosque",
        image: "https://inpenangmag.wordpress.com/wp-content/uploads/2020/01/kkm_bg.jpg",
        description: "Visit the historic Kapitan Keling Mosque, a prominent landmark in the heart of George Town. Known for its distinct Mogul architecture, this mosque is a testament to Penang's multicultural heritage. A tranquil and beautiful spot for a moment of reflection.",
        mapLink: "https://share.google/q8RsZbNKce10UIebB",
        details: {
            bestTime: "Morning (8:00 AM - 10:00 AM) or late afternoon (4:00 PM - 6:00 PM)",
            entryFee: "Free entry",
            openingHours: "5:00 AM - 10:00 PM (prayer times may affect access)",
            parking: "Street parking available nearby",
            foodDrinks: "Indian Muslim restaurants in the surrounding area",
            photography: "Photography allowed (respectful of religious site)",
            accessibility: "Fully wheelchair accessible",
            tips: "Dress modestly and remove shoes before entering, visit during non-prayer times"
        }
    },
    {
        id: 15,
        name: "Thai Buddhist Temple",
        image: "https://penang.attractionsinmalaysia.com/img/photoState/penang/watChaiyaMangkalaramTemple/4.jpg",
        description: "Explore the Wat Chaiyamangalaram, a magnificent Thai Buddhist Temple in Penang. Home to one of the largest reclining Buddha statues in the world, this temple is a spiritual sanctuary and a major attraction for its vibrant colors and intricate designs",
        mapLink: "https://share.google/CKt4uJrx7Fkg3Novu",
        details: {
            bestTime: "Morning (8:00 AM - 11:00 AM) for peaceful atmosphere",
            entryFee: "Free entry (donations welcome)",
            openingHours: "6:00 AM - 6:00 PM (daily)",
            parking: "Free parking available",
            foodDrinks: "Vegetarian food stalls nearby",
            photography: "Photography allowed (respectful of religious site)",
            accessibility: "Fully wheelchair accessible",
            tips: "Visit during Buddhist festivals for special ceremonies and decorations"
        }
    },
    {
        id: 16,
        name: "3D Art Museum",
        image: "https://image-tc.galaxy.tf/wijpeg-ds6a44ih9ndzbmgkwo88oov4e/penang-3d-trick-art-museum-places-of-interest-thumbnail-w600_standard.jpg?crop=0%2C0%2C600%2C450&width=1140",
        description: "Step into a world of illusion at the Penang 3D Art Museum in George Town. Pose with interactive, three-dimensional artworks and create unforgettable photos with family and friends. A fun-filled and quirky museum experience that's perfect for all ages.",
        mapLink: "https://share.google/KS1cx54orcmrAuGcs",
        details: {
            bestTime: "Morning (10:00 AM - 12:00 PM) to avoid crowds",
            entryFee: "RM 25 (adults), RM 15 (children)",
            openingHours: "9:00 AM - 6:00 PM (daily)",
            parking: "Paid parking available nearby",
            foodDrinks: "Cafes and restaurants in the area",
            photography: "Photography encouraged (perfect for fun photos)",
            accessibility: "Fully wheelchair accessible",
            tips: "Bring a camera or smartphone for creative photos, follow the suggested poses for best results"
        }
    },
    {
        id: 17,
        name: "Penang War Museum",
        image: "https://image-tc.galaxy.tf/wijpeg-8uv9izct23xt6jn71yb3yif9r/penang-war-museum-places-of-interest-thumbnail-w600_standard.jpg?crop=0%2C0%2C600%2C450&width=1140",
        description: "Delve into history at the Penang War Museum, located on a former fortress site on Bukit Maung. Explore tunnels, bunkers, and military artifacts from World War II. A fascinating and somber journey into Penang's military past, offering a unique historical perspective.",
        mapLink: "https://share.google/r1mc8iowE3qFUA9sX",
        details: {
            bestTime: "Morning (9:00 AM - 11:00 AM) for guided tours",
            entryFee: "RM 35 (adults), RM 20 (children)",
            openingHours: "9:00 AM - 6:00 PM (daily)",
            parking: "Free parking available",
            foodDrinks: "Basic refreshments available on-site",
            photography: "Photography allowed (historical artifacts)",
            accessibility: "Limited accessibility due to historical structures",
            tips: "Join a guided tour to learn about the historical significance and bring comfortable walking shoes"
        }
    },
    {
        id: 18,
        name: "Asia Camera Museum",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/80/7f/42/getlstd-property-photo.jpg?w=800&h=-1&s=1",
        description: "For photography enthusiasts, the Asia Camera Museum in George Town is a hidden gem. Discover a fascinating collection of vintage cameras and learn about the history of photography in Asia. A small but intriguing museum that captures the evolution of imaging.",
        mapLink: "https://share.google/nuoghUx9AE3OHqt7C",
        details: {
            bestTime: "Afternoon (2:00 PM - 4:00 PM) for detailed exploration",
            entryFee: "RM 15 (adults), RM 10 (children)",
            openingHours: "10:00 AM - 6:00 PM (daily)",
            parking: "Street parking available nearby",
            foodDrinks: "Cafes and restaurants in the area",
            photography: "Photography allowed (museum exhibits)",
            accessibility: "Fully wheelchair accessible",
            tips: "Perfect for photography enthusiasts, allow 1-2 hours for detailed viewing"
        }
    },
    {
        id: 19,
        name: "Penang State Museum",
        image: "https://mypenang.gov.my/uploads/directory/1267/images/Penang-State-Museum.jpg",
        description: "Explore the rich history and cultural heritage of Penang at the Penang State Museum and Art Gallery. Located in George Town, this museum houses an extensive collection of artifacts, art, and historical exhibits that tell the story of the island's diverse past.",
        mapLink: "https://share.google/Q7fAyJkzInpKGZ5Jv",
        details: {
            bestTime: "Morning (10:00 AM - 12:00 PM) for guided tours",
            entryFee: "RM 1 (adults), RM 0.50 (children)",
            openingHours: "9:00 AM - 5:00 PM (closed on Fridays)",
            parking: "Street parking available nearby",
            foodDrinks: "Restaurants and cafes in the surrounding area",
            photography: "Photography allowed (museum exhibits)",
            accessibility: "Fully wheelchair accessible",
            tips: "Very affordable entry fee, allow 2-3 hours for comprehensive exploration"
        }
    },
    {
        id: 20,
        name: "Tropical Fruit Farm",
        image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/77/8a/a3.jpg",
        description: "Treat your taste buds at the Tropical Fruit Farm in Teluk Bahang, Penang. Take a guided tour through the orchard, learn about exotic fruits, and enjoy a tasting session of fresh, seasonal produce. A delicious and educational experience for the whole family.",
        mapLink: "https://share.google/PliRSblIfEGVVIrmw",
        details: {
            bestTime: "Morning (9:00 AM - 11:00 AM) for guided tours",
            entryFee: "RM 30 (adults), RM 20 (children) including fruit tasting",
            openingHours: "9:00 AM - 5:00 PM (daily)",
            parking: "Free parking available",
            foodDrinks: "Fresh fruit tasting and light refreshments included",
            photography: "Photography allowed (fruit trees and farm scenery)",
            accessibility: "Mostly accessible with some uneven terrain",
            tips: "Book guided tours in advance, perfect for families with children"
        }
    },
    {
        id: 21,
        name: "WonderFood Museum",
        image: "https://www.mypenang.gov.my/uploads/directory/1407/images/WONDERFOOD.JPG",
        description: "Indulge your senses at the unique WonderFood Museum in George Town. This quirky museum features larger-than-life replicas of popular Malaysian dishes, celebrating the country's rich culinary culture in a fun and artistic way. A perfect spot for foodies and Instagram-worthy photos.",
        mapLink: "https://share.google/4PqU6020HUFiMF76O",
        details: {
            bestTime: "Afternoon (2:00 PM - 4:00 PM) for photo sessions",
            entryFee: "RM 25 (adults), RM 15 (children)",
            openingHours: "9:00 AM - 6:00 PM (daily)",
            parking: "Paid parking available nearby",
            foodDrinks: "Food court and restaurants in the area",
            photography: "Photography encouraged (perfect for Instagram)",
            accessibility: "Fully wheelchair accessible",
            tips: "Great for food photography, bring your camera for creative shots with giant food replicas"
        }
    },
    {
        id: 22,
        name: "Teddyville Museum",
        image: "https://www.penang-traveltips.com/0-pics/2017/teddyville-museum.jpg",
        description: "Step into a world of fluffy fun at Teddyville Museum, Malaysia's first teddy bear museum. Located in Batu Ferringhi, this museum showcases the history of teddy bears and features dioramas depicting iconic Penang landmarks. A charming and nostalgic attraction for all ages.",
        mapLink: "https://share.google/sunT8gDkK3N4nWiwH",
        details: {
            bestTime: "Morning (10:00 AM - 12:00 PM) for family visits",
            entryFee: "RM 20 (adults), RM 15 (children)",
            openingHours: "9:00 AM - 6:00 PM (daily)",
            parking: "Free parking available",
            foodDrinks: "Cafes and restaurants in Batu Ferringhi area",
            photography: "Photography allowed (cute teddy bear displays)",
            accessibility: "Fully wheelchair accessible",
            tips: "Perfect for families with young children, located near Batu Ferringhi beach"
        }
    },

    {
        id: 23,
        name: "Snake Temple",
        image: "https://www.malaysia-traveller.com/images/PenangSnakeTemplePython.jpg",
        description: "Experience the unique and intriguing Snake Temple in Bayan Lepas, Penang. This temple is home to venomous pit vipers that are believed to be harmless due to the temple's incense-filled environment. A truly one-of-a-kind cultural and religious site.",
        mapLink: "https://share.google/qmVhmHyn7xICAhj6Q",
        details: {
            bestTime: "Morning (8:00 AM - 10:00 AM) when snakes are most active",
            entryFee: "Free entry (donations welcome)",
            openingHours: "6:00 AM - 7:00 PM (daily)",
            parking: "Free parking available",
            foodDrinks: "Local food stalls nearby",
            photography: "Photography allowed (respectful of religious site)",
            accessibility: "Fully wheelchair accessible",
            tips: "Unique cultural experience, snakes are docile due to incense but still be cautious"
        }
    },
    {
        id: 24,
        name: "Glass Museum Penang",
        image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/3c/c4/da.jpg",
        description: "Be dazzled by the intricate artistry at the Glass Museum Penang in George Town. Admire stunning glass sculptures, learn about glass-making techniques, and walk through a kaleidoscope of colors. A visually captivating experience for art and design lovers.",
        mapLink: "https://share.google/lEpqPDFkZ4Ij1iprN",
        details: {
            bestTime: "Afternoon (2:00 PM - 4:00 PM) for detailed viewing",
            entryFee: "RM 20 (adults), RM 15 (children)",
            openingHours: "10:00 AM - 6:00 PM (daily)",
            parking: "Street parking available nearby",
            foodDrinks: "Cafes and restaurants in the area",
            photography: "Photography allowed (beautiful glass artworks)",
            accessibility: "Fully wheelchair accessible",
            tips: "Perfect for art enthusiasts, allow 1-2 hours for detailed appreciation of glass art"
        }
    },
    {
        id: 25,
        name: "Sun Yat Sen Museum",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/59/9b/df/sun-yat-sen-museum.jpg?w=1000&h=-1&s=1",
        description: "Delve into the life of a historical figure at the Sun Yat Sen Museum in George Town. This beautifully preserved heritage house was once the base of operations for Dr. Sun Yat-sen's revolutionary activities. A key historical site that sheds light on modern Chinese history",
        mapLink: "https://share.google/0GY71VCkhLdChBpmb",
        details: {
            bestTime: "Morning (10:00 AM - 12:00 PM) for guided tours",
            entryFee: "RM 5 (adults), RM 3 (children)",
            openingHours: "9:00 AM - 5:00 PM (closed on Mondays)",
            parking: "Street parking available nearby",
            foodDrinks: "Traditional Chinese restaurants in the area",
            photography: "Photography allowed (historical exhibits)",
            accessibility: "Limited accessibility due to heritage building",
            tips: "Join guided tours to learn about Sun Yat-sen's revolutionary activities in Penang"
        }
    },
    {
        id: 26,
        name: "Ghost Museum",
        image: "https://onpenang.com/wp-content/uploads/2024/11/Ghost-Museum-Penang-07.jpg",
        description: "Get ready for a spooky and entertaining time at the Ghost Museum in George Town. Explore exhibits featuring ghouls and spirits from various cultures, perfect for a fun and slightly scary photo session. A lighthearted museum experience for those who dare to enter.",
        mapLink: "https://share.google/Ty95DNzSV05vZX1cy",
        details: {
            bestTime: "Afternoon (2:00 PM - 4:00 PM) for photo sessions",
            entryFee: "RM 25 (adults), RM 15 (children)",
            openingHours: "10:00 AM - 6:00 PM (daily)",
            parking: "Paid parking available nearby",
            foodDrinks: "Cafes and restaurants in the area",
            photography: "Photography encouraged (spooky photo opportunities)",
            accessibility: "Fully wheelchair accessible",
            tips: "Fun for older children and adults, great for unique photo opportunities"
        }
    },
    {
        id: 27,
        name: "Upside Down Museum",
        image: "https://mypenang.gov.my/uploads/directory/1258/images/1-Upside-Down-Museum.jpg",
        description: "Turn your world upside down at the Upside Down Museum in George Town. This popular attraction features rooms and objects creatively designed to defy gravity, offering fantastic and funny photo opportunities. A must-visit for a dose of fun and illusion",
        mapLink: "https://share.google/QmRyARjXfw4xE7bjk",
        details: {
            bestTime: "Morning (10:00 AM - 12:00 PM) to avoid crowds",
            entryFee: "RM 30 (adults), RM 20 (children)",
            openingHours: "9:00 AM - 6:00 PM (daily)",
            parking: "Paid parking available nearby",
            foodDrinks: "Cafes and restaurants in the area",
            photography: "Photography encouraged (creative illusion photos)",
            accessibility: "Fully wheelchair accessible",
            tips: "Perfect for fun family photos, follow the suggested poses for best illusion effects"
        }
    },
    {
        id: 28,
        name: "Penang Boat Museum",
        image: "https://www.businesstoday.com.my/wp-content/uploads/2025/09/Penang-ferry-museum-e1757062531999.jpg",
        description: "The Penang Boat Museum, also known as the Penang Ferry Museum, is a unique attraction located within an authentic ferry. The museum highlights Penang's maritime history and the legacy of its ferry service. An essential visit for history buffs in Penang.",
        mapLink: "https://share.google/Y6JoZKHdId8bArvjC",
        details: {
            bestTime: "Morning (10:00 AM - 12:00 PM) for guided tours",
            entryFee: "RM 29 (adults), RM 15 (children)",
            openingHours: "9:00 AM - 5:00 PM (daily)",
            parking: "Free parking available nearby",
            foodDrinks: "Food stalls and restaurants in the area",
            photography: "Photography allowed (maritime history exhibits)",
            accessibility: "Limited accessibility due to boat structure",
            tips: "Unique museum experience on an actual ferry, learn about Penang's maritime heritage"
        }
    },
    {
        id: 29,
        name: "River Cruise",
        image: "https://img.astroawani.com/2025-09/61757419100_RiverCruise.jpg",
        description: "The Penang River Cruise is an eco-tourism experience along Sungai Juru in Seberang Perai. The cruise showcases natural landscapes, traditional fishing villages, and mangrove forests. It offers interactive activities like crab catching and fishing. A top-rated nature activity in Penang.",
        mapLink: "https://share.google/wHphMMHXZ32Dc7VUm",
        details: {
            bestTime: "Early morning (8:00 AM - 10:00 AM) or late afternoon (4:00 PM - 6:00 PM)",
            entryFee: "RM 68 (adults), RM 58 (children) including activities",
            openingHours: "8:00 AM - 6:00 PM (daily, weather permitting)",
            parking: "Free parking available at departure point",
            foodDrinks: "Light refreshments provided on cruise",
            photography: "Photography allowed (beautiful mangrove scenery)",
            accessibility: "Limited accessibility due to boat access",
            tips: "Book in advance, bring sunscreen and hat, perfect for nature lovers"
        }
    },
    {
        id: 30,
        name: "Penang History Gallery",
        image: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1600900gsm/eventThirdParty/2025/06/13/d34b39b4-1f11-4ef3-bf38-f113d0090454-1749776345065-d88bbb41176440d932f42b968f85364f.jpg",
        description: "History museum in George Town, Penang. Presents a visual history of the island.",
        mapLink: "https://share.google/slOsW96MBgeRXGXIJ",
        details: {
            bestTime: "Morning (10:00 AM - 12:00 PM) for guided tours",
            entryFee: "RM 5 (adults), RM 3 (children)",
            openingHours: "9:00 AM - 5:00 PM (closed on Mondays)",
            parking: "Street parking available nearby",
            foodDrinks: "Cafes and restaurants in the surrounding area",
            photography: "Photography allowed (historical exhibits)",
            accessibility: "Fully wheelchair accessible",
            tips: "Comprehensive overview of Penang's history, allow 1-2 hours for detailed viewing"
        }
    }
    
];

// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const pages = document.querySelectorAll('.page');
const placesGrid = document.getElementById('placesGrid');
const favouritesContainer = document.getElementById('favouritesContainer');
const copyListBtn = document.getElementById('copyListBtn');
const bookingForm = document.getElementById('bookingForm');
const placeModal = document.getElementById('placeModal');
const modalClose = document.querySelector('.close');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePlaces();
    initializeFavourites();
    initializeBookingForm();
    initializeModal();
    initializeScrollEffects();
    initializeTip();
    initializeNavigationButtons();
    initializePackages();
    markDescriptionAsManuallySelected();
    initializeCameronPlaces();
    
    // Initialize hero video
    initializeHeroVideo();
});

// Navigation functionality
function initializeNavigation() {
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });

    // Handle hamburger menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle scroll effects for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Page navigation
function navigateToPage(pageName) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    currentPage = pageName;

    // Update URL hash
    window.location.hash = pageName;

    // Scroll to top of the page with smooth behavior
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Special handling for specific pages
    if (pageName === 'places') {
        renderPlaces();
    } else if (pageName === 'favourites') {
        renderFavourites();
    } else if (pageName === 'packages') {
        // Packages page is static, no special handling needed
    } else if (pageName === 'cameron-places') {
        initializeCameronPlaces();
    }
}

// Places functionality
function initializePlaces() {
    renderPlaces();
}

function renderPlaces() {
    if (!placesGrid) return;

    placesGrid.innerHTML = '';
    
    places.forEach(place => {
        const placeCard = createPlaceCard(place);
        placesGrid.appendChild(placeCard);
    });
}

function createPlaceCard(place) {
    const card = document.createElement('div');
    card.className = 'place-card';
    card.setAttribute('data-place-id', place.id);

    const isFavourited = favourites.some(fav => fav.id === place.id);

    card.innerHTML = `
        <img src="${place.image}" alt="${place.name}" class="place-image">
        <div class="place-info">
            <h3 class="place-name">${place.name}</h3>
            <button class="heart-btn ${isFavourited ? 'favorited' : ''}" onclick="toggleFavourite(${place.id}, event)">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `;

    // Add click event for card (not heart button)
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.heart-btn')) {
            showPlaceModal(place);
        }
    });

    return card;
}

// Favourites functionality
function initializeFavourites() {
    renderFavourites();
}

function renderFavourites() {
    if (!favouritesContainer) return;

    if (favourites.length === 0) {
        favouritesContainer.innerHTML = `
            <div class="empty-favourites">
                <i class="fas fa-heart"></i>
                <h3>No favourites yet</h3>
                <p>Start exploring places to visit and add them to your favourites!</p>
                <a href="#places" class="explore-btn" data-page="places">Explore Places</a>
            </div>
        `;
        copyListBtn.style.display = 'none';
        
        // Add event listener to the explore button
        const exploreBtn = favouritesContainer.querySelector('.explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                navigateToPage('places');
            });
        }
    } else {
        favouritesContainer.innerHTML = `
            <div class="favourites-grid">
                ${favourites.map(place => `
                    <div class="favourite-card">
                        <img src="${place.image}" alt="${place.name}" class="place-image">
                        <div class="place-info">
                            <h3 class="place-name">${place.name}</h3>
                            <button class="remove-btn" onclick="removeFromFavourites(${place.id})">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        copyListBtn.style.display = 'block';
    }
}

function toggleFavourite(placeId, event) {
    event.stopPropagation();
    
    const place = places.find(p => p.id === placeId);
    const existingIndex = favourites.findIndex(fav => fav.id === placeId);
    
    if (existingIndex > -1) {
        // Remove from favourites
        favourites.splice(existingIndex, 1);
        event.target.closest('.heart-btn').classList.remove('favorited');
        showNotification(`${place.name} removed from favourites!`, 'info');
    } else {
        // Add to favourites
        favourites.push(place);
        event.target.closest('.heart-btn').classList.add('favorited');
        showNotification(`${place.name} added to favourites!`, 'success');
    }
    
    // Save to localStorage
    localStorage.setItem('favourites', JSON.stringify(favourites));
    
    // Update favourites page if currently viewing it
    if (currentPage === 'favourites') {
        renderFavourites();
    }
    
    // Update modal heart button if modal is open for this place
    // If existingIndex > -1, we're removing (so isFavourited = false)
    // If existingIndex === -1, we're adding (so isFavourited = true)
    updateModalHeartButton(placeId, existingIndex === -1);
    
    // Update Package K description in real-time if Package K modal is open
    updatePackageKDescription();
}

function toggleModalFavourite() {
    if (!currentModalPlace) return;
    
    const placeId = currentModalPlace.id;
    const modalHeartBtn = document.getElementById('modalHeartBtn');
    
    // Toggle favourite status
    const existingIndex = favourites.findIndex(fav => fav.id === placeId);
    
    if (existingIndex === -1) {
        // Add to favourites
        favourites.push(currentModalPlace);
        modalHeartBtn.classList.add('favorited');
        showNotification(`${currentModalPlace.name} added to favourites!`, 'success');
    } else {
        // Remove from favourites
        favourites.splice(existingIndex, 1);
        modalHeartBtn.classList.remove('favorited');
        showNotification(`${currentModalPlace.name} removed from favourites!`, 'info');
    }
    
    // Save to localStorage
    localStorage.setItem('favourites', JSON.stringify(favourites));
    
    // Update favourites page if it's currently active
    if (currentPage === 'favourites') {
        renderFavourites();
    }
    
    // Update the heart button in the main places grid
    updateMainPlacesHeartButton(placeId, existingIndex === -1);
    
    // Update Package K description in real-time if Package K modal is open
    updatePackageKDescription();
}

// Function to update heart button in main places grid
function updateMainPlacesHeartButton(placeId, isFavourited) {
    const heartBtn = document.querySelector(`[data-place-id="${placeId}"] .heart-btn`);
    if (heartBtn) {
        if (isFavourited) {
            heartBtn.classList.add('favorited');
        } else {
            heartBtn.classList.remove('favorited');
        }
    }
}

// Function to update modal heart button
function updateModalHeartButton(placeId, isFavourited) {
    // Only update if the modal is open and showing the same place
    if (currentModalPlace && currentModalPlace.id === placeId) {
        const modalHeartBtn = document.getElementById('modalHeartBtn');
        if (modalHeartBtn) {
            if (isFavourited) {
                modalHeartBtn.classList.add('favorited');
            } else {
                modalHeartBtn.classList.remove('favorited');
            }
        }
    }
}

function removeFromFavourites(placeId) {
    const existingIndex = favourites.findIndex(fav => fav.id === placeId);
    if (existingIndex > -1) {
        const placeName = favourites[existingIndex].name;
        favourites.splice(existingIndex, 1);
        localStorage.setItem('favourites', JSON.stringify(favourites));
        renderFavourites();
        
        // Update Package K description in real-time if Package K modal is open
        updatePackageKDescription();
        
        // Update heart button in places page
        const heartBtn = document.querySelector(`[data-place-id="${placeId}"] .heart-btn`);
        if (heartBtn) {
            heartBtn.classList.remove('favorited');
        }
        
        // Update modal heart button if modal is open for this place
        updateModalHeartButton(placeId, false);
        
        showNotification(`${placeName} removed from favourites!`, 'info');
    }
}

// Copy favourites list
copyListBtn.addEventListener('click', function() {
    const placeNames = favourites.map(place => place.name).join('\n');
    navigator.clipboard.writeText(placeNames).then(function() {
        // Show success message
        const originalText = copyListBtn.innerHTML;
        copyListBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyListBtn.style.background = '#10b981';
        
        setTimeout(() => {
            copyListBtn.innerHTML = originalText;
            copyListBtn.style.background = '#3b82f6';
        }, 2000);
        
        showNotification('Favourites list copied to clipboard!', 'success');
    });
});

// Modal functionality
function initializeModal() {
    // Close modal when clicking outside
    placeModal.addEventListener('click', function(e) {
        if (e.target === placeModal) {
            closeModal();
        }
    });

    // Close modal with X button
    modalClose.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && placeModal.style.display === 'block') {
            closeModal();
        }
    });
}

function showPlaceModal(place) {
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalMapLink = document.getElementById('modalMapLink');
    const modalDetails = document.getElementById('modalDetails');
    const modalHeartBtn = document.getElementById('modalHeartBtn');

    // Set current place for modal
    currentModalPlace = place;

    modalImage.src = place.image;
    modalImage.alt = place.name;
    modalTitle.textContent = place.name;
    modalDescription.textContent = place.description;
    modalMapLink.href = place.mapLink;

    // Update heart button state
    const isFavourited = favourites.some(fav => fav.id === place.id);
    modalHeartBtn.classList.toggle('favorited', isFavourited);

    // Populate dynamic details
    if (place.details) {
        modalDetails.innerHTML = `
            <div class="detail-item">
                <i class="fas fa-clock"></i>
                <span><strong>Opening Hours:</strong> ${place.details.openingHours}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-dollar-sign"></i>
                <span><strong>Entry Fee:</strong> ${place.details.entryFee}</span>
            </div>
            <div class="detail-item">
                <i class="fas fa-info-circle"></i>
                <span><strong>Tips:</strong> ${place.details.tips}</span>
            </div>
        `;
    } else {
        // Fallback for places without details
        modalDetails.innerHTML = `
            <div class="detail-item">
                <i class="fas fa-info-circle"></i>
                <span>Detailed information coming soon...</span>
            </div>
        `;
    }

    placeModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    placeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Booking form functionality
function initializeBookingForm() {
    if (!bookingForm) return;
    bookingForm.addEventListener('submit', handleBookingSubmit);
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('travelDate');
    if (dateInput) {
        dateInput.min = today;
    }
    
    // Initialize custom dropdowns
    initializeCustomDropdowns();
    
    // Initialize phone number combination
    initializePhoneNumber();
    
    // Initialize booking form payment calculator (shows/hides Payment, transport, etc.)
    initializeBookingPaymentCalculator();
}

// Initialize booking form payment calculator
function initializeBookingPaymentCalculator() {
    try {
        const tourTypeRadios = document.querySelectorAll('input[name="tourType"]');
        const transportationSelect = document.getElementById('transportation');
        const daysSelect = document.getElementById('tourDays');
        const airportRouteSelect = document.getElementById('airportRoute');
        
        if (!tourTypeRadios || tourTypeRadios.length === 0) return;
        
        // Listen to tour type changes
        tourTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const selectedTour = this.value;
                handleTourTypeChange(selectedTour);
                calculateBookingPaymentRate();
            });
        });
        
        // Listen to transportation changes
        if (transportationSelect) {
            transportationSelect.addEventListener('change', calculateBookingPaymentRate);
            transportationSelect.addEventListener('change', function() {
                var r = document.querySelector('input[name="tourType"]:checked');
                if (r && r.value === 'Package G' && typeof updateDescriptionAutoDisplay === 'function') updateDescriptionAutoDisplay('Package G');
            });
        }
        
        // Listen to days changes
        if (daysSelect) {
            daysSelect.addEventListener('change', calculateBookingPaymentRate);
        }
        
        // Listen to airport route changes
        if (airportRouteSelect) {
            airportRouteSelect.addEventListener('change', calculateBookingPaymentRate);
            airportRouteSelect.addEventListener('change', function() {
                var r = document.querySelector('input[name="tourType"]:checked');
                if (r && r.value === 'Package G' && typeof updateDescriptionAutoDisplay === 'function') updateDescriptionAutoDisplay('Package G');
            });
        }
        
        // Initialize water sports quantity controls
        initializeWaterSportsControls();
    } catch (e) {
        console.warn('Booking payment calculator init:', e);
    }
}

// Water sports pricing configuration
const waterSportsPricing = {
    'jetski-single': 110,
    'jetski-double': 200,
    'parasailing-single': 130,
    'parasailing-double': 260,
    'banana-boat': 35,
    'boat-ride': 180,
    'boat-fishing': 275
};

// Initialize water sports quantity controls
function initializeWaterSportsControls() {
    const plusButtons = document.querySelectorAll('.qty-btn.plus');
    const minusButtons = document.querySelectorAll('.qty-btn.minus');
    
    plusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const activity = this.getAttribute('data-activity');
            const input = document.getElementById(`qty-${activity}`);
            const currentValue = parseInt(input.value) || 0;
            input.value = currentValue + 1;
            calculateWaterSportsTotal();
        });
    });
    
    minusButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const activity = this.getAttribute('data-activity');
            const input = document.getElementById(`qty-${activity}`);
            const currentValue = parseInt(input.value) || 0;
            if (currentValue > 0) {
                input.value = currentValue - 1;
                calculateWaterSportsTotal();
            }
        });
    });
}

// Reset all water sports quantities to 0
function resetWaterSportsQuantities() {
    Object.keys(waterSportsPricing).forEach(activity => {
        const input = document.getElementById(`qty-${activity}`);
        if (input) {
            input.value = 0;
        }
    });
    calculateWaterSportsTotal();
}

// Calculate water sports total price
function calculateWaterSportsTotal() {
    let total = 0;
    let activityDetails = [];
    
    Object.keys(waterSportsPricing).forEach(activity => {
        const input = document.getElementById(`qty-${activity}`);
        if (input) {
            const quantity = parseInt(input.value) || 0;
            if (quantity > 0) {
                const price = waterSportsPricing[activity];
                const subtotal = price * quantity;
                total += subtotal;
                
                // Create readable activity name
                const activityName = activity
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                
                activityDetails.push(`${activityName} x${quantity} = RM ${subtotal}`);
            }
        }
    });
    
    // Update payment rate display
    const paymentRateInput = document.getElementById('paymentRate');
    const paymentNoteElement = document.getElementById('paymentNote');
    
    if (paymentRateInput) {
        if (total === 0) {
            paymentRateInput.value = 'RM 0';
            if (paymentNoteElement) {
                paymentNoteElement.textContent = 'Add activities to calculate total price';
            }
        } else {
            paymentRateInput.value = `RM ${total}`;
            if (paymentNoteElement) {
                paymentNoteElement.textContent = activityDetails.join(' | ');
            }
        }
    }
    var tourTypeRadio = document.querySelector('input[name="tourType"]:checked');
    if (tourTypeRadio && tourTypeRadio.value === 'Package F') updateDescriptionAutoDisplay('Package F');
    return total;
}

// Handle tour type change to show/hide relevant fields
function handleTourTypeChange(tourType) {
    const daysSelectionGroup = document.getElementById('daysSelectionGroup');
    const transportationGroup = document.getElementById('transportationGroup');
    const airportRouteGroup = document.getElementById('airportRouteGroup');
    const paymentRateGroup = document.getElementById('paymentRateGroup');
    const waterSportsGroup = document.getElementById('waterSportsActivitiesGroup');
    const daysSelect = document.getElementById('tourDays');
    const transportationSelect = document.getElementById('transportation');
    const airportRouteSelect = document.getElementById('airportRoute');
    
    // Reset selections
    if (daysSelect) daysSelect.value = '';
    if (transportationSelect) transportationSelect.value = '';
    if (airportRouteSelect) airportRouteSelect.value = '';
    
    // Configure transportation options based on package
    configureBookingTransportOptions(tourType);
    
    const descriptionOptional = document.getElementById('descriptionOptional');
    
    if (tourType === 'Package K') {
        if (daysSelectionGroup) daysSelectionGroup.style.display = 'block';
        if (daysSelect) daysSelect.required = true;
        if (transportationGroup) transportationGroup.style.display = 'block';
        if (transportationSelect) transportationSelect.required = true;
        if (airportRouteGroup) { airportRouteGroup.style.display = 'none'; }
        if (airportRouteSelect) airportRouteSelect.required = false;
        if (paymentRateGroup) paymentRateGroup.style.display = 'none';
        if (waterSportsGroup) waterSportsGroup.style.display = 'none';
        if (typeof updateDescriptionAutoDisplay === 'function') updateDescriptionAutoDisplay('Package K');
        if (descriptionOptional) descriptionOptional.value = '';
    } else if (tourType === 'Package F') {
        if (daysSelectionGroup) daysSelectionGroup.style.display = 'none';
        if (daysSelect) { daysSelect.required = false; }
        if (transportationGroup) transportationGroup.style.display = 'none';
        if (transportationSelect) transportationSelect.required = false;
        if (airportRouteGroup) { airportRouteGroup.style.display = 'none'; }
        if (airportRouteSelect) airportRouteSelect.required = false;
        if (waterSportsGroup) {
            waterSportsGroup.style.display = 'block';
            resetWaterSportsQuantities();
        }
        if (paymentRateGroup) paymentRateGroup.style.display = 'block';
        var pr = document.getElementById('paymentRate');
        var pn = document.getElementById('paymentNote');
        if (pr) pr.value = 'RM 0';
        if (pn) pn.textContent = 'Add activities to calculate total price';
        if (typeof updateDescriptionAutoDisplay === 'function') updateDescriptionAutoDisplay('Package F');
        if (descriptionOptional) descriptionOptional.value = '';
    } else if (tourType === 'Package G') {
        if (daysSelectionGroup) daysSelectionGroup.style.display = 'none';
        if (daysSelect) daysSelect.required = false;
        if (airportRouteGroup) { airportRouteGroup.style.display = 'block'; }
        if (airportRouteSelect) airportRouteSelect.required = true;
        if (transportationGroup) transportationGroup.style.display = 'block';
        if (transportationSelect) transportationSelect.required = true;
        if (paymentRateGroup) paymentRateGroup.style.display = 'none';
        if (waterSportsGroup) waterSportsGroup.style.display = 'none';
        if (typeof updateDescriptionAutoDisplay === 'function') updateDescriptionAutoDisplay('Package G');
        if (descriptionOptional) descriptionOptional.value = '';
    } else {
        if (daysSelectionGroup) daysSelectionGroup.style.display = 'none';
        if (daysSelect) daysSelect.required = false;
        if (transportationGroup) transportationGroup.style.display = 'block';
        if (transportationSelect) transportationSelect.required = true;
        if (airportRouteGroup) { airportRouteGroup.style.display = 'none'; }
        if (airportRouteSelect) airportRouteSelect.required = false;
        if (paymentRateGroup) paymentRateGroup.style.display = 'none';
        if (waterSportsGroup) waterSportsGroup.style.display = 'none';
        if (typeof updateDescriptionAutoDisplay === 'function') updateDescriptionAutoDisplay('');
        if (descriptionOptional) descriptionOptional.value = '';
    }
}

// Configure transportation options based on package
function configureBookingTransportOptions(tourType) {
    const transportationSelect = document.getElementById('transportation');
    if (!transportationSelect) return;
    
    // Clear existing options except the first one
    transportationSelect.innerHTML = '<option value="">Select transportation...</option>';
    
    // Define which packages have MPV option
    const packagesWithMPV = ['Package A', 'Package B', 'Package C', 'Package D', 'Package E', 'Package I'];
    
    // Add appropriate options
    transportationSelect.innerHTML += '<option value="car">Car (Max 4 people)</option>';
    
    if (packagesWithMPV.includes(tourType)) {
        transportationSelect.innerHTML += '<option value="mpv">MPV (Max 6 people)</option>';
    }
    
    transportationSelect.innerHTML += '<option value="van">Van (Max 12 people)</option>';
}

// Calculate booking payment rate
function calculateBookingPaymentRate() {
    const tourTypeRadio = document.querySelector('input[name="tourType"]:checked');
    const transportationSelect = document.getElementById('transportation');
    const daysSelect = document.getElementById('tourDays');
    const airportRouteSelect = document.getElementById('airportRoute');
    const paymentRateInput = document.getElementById('paymentRate');
    const paymentNoteElement = document.getElementById('paymentNote');
    const paymentRateGroup = document.getElementById('paymentRateGroup');
    
    if (!tourTypeRadio) return;
    
    const tourType = tourTypeRadio.value;
    const transportation = transportationSelect ? transportationSelect.value : '';
    const days = daysSelect ? daysSelect.value : '';
    const airportRoute = airportRouteSelect ? airportRouteSelect.value : '';
    
    // Package pricing from the existing packagePricing object
    const standardPackagePricing = {
        'Package A': { car: 299, van: 599, mpv: 449 },
        'Package B': { car: 350, van: 570, mpv: 450 },
        'Package C': { car: 500, van: 900, mpv: 700 },
        'Package D': { car: 1299, van: 1999, mpv: 1599 },
        'Package E': { car: 300, van: 600, mpv: 450 },
        'Package I': { car: 650, van: 1100, mpv: 850 }
    };
    
    // Airport transfer pricing by route
    const airportTransferPricing = {
        'penang-airport': {
            car: 90,
            mpv: 160,
            van: 120
        },
        'klia': {
            car: 750,
            mpv: 850,
            van: 980
        }
    };
    
    // Customized package hourly rates
    const customizedRates = {
        car: 30,
        van: 60
    };
    
    let paymentText = '';
    let noteText = '';
    
    // Handle different package types
    if (tourType === 'Package K') {
        // Customized packages with hourly rates
        if (!transportation || !days) {
            if (paymentRateGroup) paymentRateGroup.style.display = 'none';
            return;
        }
        
        if (days === 'custom') {
            paymentText = `RM ${customizedRates[transportation]}/hour`;
            noteText = 'Please specify exact number of days and hours in description for accurate quote.';
        } else {
            const hoursPerDay = 8;
            const totalHours = parseInt(days) * hoursPerDay;
            const rate = customizedRates[transportation] || customizedRates.car;
            const totalCost = totalHours * rate;
            
            paymentText = `RM ${totalCost}`;
            noteText = `Based on ${days} day(s) × ${hoursPerDay} hours/day × RM ${rate}/hour for ${transportation === 'car' ? 'Car' : 'Van'}`;
        }
        
        if (paymentRateGroup) paymentRateGroup.style.display = 'block';
    } else if (tourType === 'Package F') {
        // Water activities - already handled in handleTourTypeChange
        return;
    } else if (tourType === 'Package G') {
        // Airport transfer - requires both route and transportation
        if (!airportRoute || !transportation) {
            if (paymentRateGroup) paymentRateGroup.style.display = 'none';
            return;
        }
        
        const routePricing = airportTransferPricing[airportRoute];
        if (!routePricing) {
            if (paymentRateGroup) paymentRateGroup.style.display = 'none';
            return;
        }
        
        const price = routePricing[transportation] || routePricing.car;
        paymentText = `RM ${price}`;
        
        const routeNames = {
            'penang-airport': 'Penang Hotel ↔ Penang International Airport',
            'klia': 'Penang Hotel ↔ KLIA (Kuala Lumpur)'
        };
        const transportNames = {
            'car': 'Car (Max 4 people)',
            'mpv': 'MPV (Max 6 people)',
            'van': 'Van (Max 12 people)'
        };
        
        noteText = `${routeNames[airportRoute]} | ${transportNames[transportation]} | Fixed rate`;
        if (paymentRateGroup) paymentRateGroup.style.display = 'block';
    } else {
        // Standard packages
        if (!transportation) {
            if (paymentRateGroup) paymentRateGroup.style.display = 'none';
            return;
        }
        
        const pricing = standardPackagePricing[tourType];
        if (!pricing) {
            if (paymentRateGroup) paymentRateGroup.style.display = 'none';
            return;
        }
        
        const price = pricing[transportation] || pricing.car;
        paymentText = `RM ${price}`;
        
        if (tourType === 'Package B' || tourType === 'Package I') {
            noteText = 'Price may vary based on selected tour option. Please specify your preference in description.';
        } else {
            noteText = 'All-inclusive package rate with professional guide and transportation.';
        }
        
        if (paymentRateGroup) paymentRateGroup.style.display = 'block';
    }
    
    // Update the display
    if (paymentRateInput) {
        paymentRateInput.value = paymentText;
    }
    if (paymentNoteElement) {
        paymentNoteElement.textContent = noteText;
    }
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const bookingData = Object.fromEntries(formData);
    
    // Validate form
    if (!validateBookingForm(bookingData)) {
        return;
    }
    
    // Get payment amount
    const paymentRateInput = document.getElementById('paymentRate');
    const paymentAmount = paymentRateInput ? paymentRateInput.value : '';
    
    if (!paymentAmount || paymentAmount === 'RM 0') {
        showNotification('Please select all required options to calculate payment amount.', 'error');
        return;
    }
    
    // Prepare water sports activities data if applicable
    let waterSportsActivities = '';
    if (bookingData.tourType === 'Package F') {
        const activities = [];
        const activityKeys = ['jetski-single', 'jetski-double', 'parasailing-single', 'parasailing-double', 'banana-boat', 'boat-ride', 'boat-fishing'];
        
        activityKeys.forEach(key => {
            const input = document.getElementById(`qty-${key}`);
            if (input && parseInt(input.value) > 0) {
                const activityName = key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                activities.push(`${activityName} x${input.value}`);
            }
        });
        
        waterSportsActivities = activities.join(', ');
    }
    
    // Full description = auto-generated (F/G/K) + optional user notes. Send complete to Stripe.
    var autoPart = getDescriptionAutoContent(bookingData.tourType);
    var optionalPart = (bookingData.descriptionOptional || bookingData.description || '').trim();
    var descriptionToSend = autoPart + (optionalPart ? '\n\n' + optionalPart : '');
    var selectedPlacesToSend = '';
    if (bookingData.tourType === 'Package K') {
        var favorites = getFavorites();
        selectedPlacesToSend = favorites.map(function(p) { return p.name; }).join(', ');
    }
    
    // Package image URLs (match package cards in index.html for Stripe checkout)
    const PACKAGE_IMAGE_URLS = {
        'Package A': 'https://img2.penangpropertytalk.com/wp-content/uploads/2024/07/fortcornwallis-1.jpg',
        'Package B': 'https://cdn.tatlerasia.com/tatlerasia/i/2021/11/11173230-123742590-500497978016363-4094686581571688722-n_cover_1080x810.jpg',
        'Package C': 'https://static.wixstatic.com/media/ed89ba_2ce2a6fb16a34eb1863f6541f8b45b78~mv2.png/v1/fill/w_534,h_316,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ed89ba_2ce2a6fb16a34eb1863f6541f8b45b78~mv2.png',
        'Package D': 'https://malaysiatravel-assets.s3.amazonaws.com/images/20200408-to6fd-genting-highland-jpg',
        'Package E': 'https://onpenang.com/wp-content/uploads/2024/10/Orangutan-Island-Bukit-Merah-1.jpg',
        'Package F': 'https://www.travel-penang-malaysia.com/images/batu-ferringhi-beach-penang.jpg',
        'Package G': 'https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2023/11/several-airasia-aircraft-parked-at-kuala-lumpur-international-airport-terminal-2-yanatul-1.jpg',
        'Package I': 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/d7/cb/5b.jpg',
        'Package K': 'https://mypenang.gov.my/uploads/directory/1405/cover/PENANG-BRIDGE.jpg'
    };
    const packageImageUrl = PACKAGE_IMAGE_URLS[bookingData.tourType] || '';
    
    // Show loading state
    const submitBtn = bookingForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Processing...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    try {
        // Create Stripe Checkout Session
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: bookingData.fullName,
                email: bookingData.email,
                phone: bookingData.phone,
                nationality: bookingData.nationality,
                people: bookingData.people,
                travelDate: bookingData.travelDate,
                travelTime: bookingData.travelTime,
                tourType: bookingData.tourType,
                transportation: bookingData.transportation,
                airportRoute: bookingData.airportRoute,
                tourDays: bookingData.tourDays,
                paymentAmount: paymentAmount,
                description: descriptionToSend,
                waterSportsActivities: waterSportsActivities,
                selectedPlaces: selectedPlacesToSend,
                packageImageUrl: packageImageUrl
            })
        });
        
        const result = await response.json();
        
        if (result.success && result.url) {
            // Show success message
            showNotification('✅ Redirecting to secure payment...', 'success');
            
            // Log success for debugging
            console.log('✅ Stripe session created:', result.sessionId);
            
            // Redirect to Stripe Checkout
            setTimeout(() => {
                window.location.href = result.url;
            }, 1000);
            
        } else {
            // Show error message
            console.error('❌ Failed to create payment session:', result);
            showNotification(`❌ ${result.error || 'Failed to process booking. Please try again.'}`, 'error');
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    } catch (error) {
        console.error('Error creating payment session:', error);
        showNotification('Network error. Please check your connection and try again.', 'error');
        
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Custom dropdown functionality
function initializeCustomDropdowns() {
    const countryCodeSelect = document.getElementById('countryCodeSelect');
    
    // Initialize country code dropdown only
    if (countryCodeSelect) {
        initializeDropdown(countryCodeSelect, 'countryCode');
    }
}

function initializeDropdown(selectElement, type) {
    const trigger = selectElement.querySelector('.custom-select__trigger');
    const options = selectElement.querySelectorAll('.custom-option');
    
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        selectElement.classList.toggle('open');
    });
    
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove selected class from all options
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Update trigger text
            trigger.querySelector('span').textContent = option.textContent;
            
            // Close dropdown
            selectElement.classList.remove('open');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!selectElement.contains(e.target)) {
            selectElement.classList.remove('open');
        }
    });
}

// Phone number combination functionality
function initializePhoneNumber() {
    const countryCodeSelect = document.getElementById('countryCodeSelect');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const phoneHiddenInput = document.getElementById('phone');
    
    if (countryCodeSelect && phoneNumberInput && phoneHiddenInput) {
        // Update combined phone number when either field changes
        function updateCombinedPhone() {
            const selectedCountryCode = countryCodeSelect.querySelector('.custom-option.selected');
            const countryCode = selectedCountryCode ? selectedCountryCode.dataset.value : '+60';
            const phoneNumber = phoneNumberInput.value;
            
            if (phoneNumber) {
                phoneHiddenInput.value = `${countryCode} ${phoneNumber}`;
            } else {
                phoneHiddenInput.value = '';
            }
        }
        
        // Listen for country code changes
        countryCodeSelect.addEventListener('change', updateCombinedPhone);
        
        // Listen for phone number input changes
        phoneNumberInput.addEventListener('input', updateCombinedPhone);
        
        // Set initial value
        updateCombinedPhone();
    }
}

function validateBookingForm(data) {
    const requiredFields = ['nationality', 'fullName', 'email', 'phone', 'people', 'travelDate', 'travelTime', 'tourType'];
    
    for (let field of requiredFields) {
        if (!data[field]) {
            alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Validate phone
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        alert('Please enter a valid phone number.');
        return false;
    }
    
    // Validate number of people
    const people = parseInt(data.people);
    if (people < 1 || people > 20) {
        alert('Number of people must be between 1 and 20.');
        return false;
    }
    
    // Validate travel date
    const selectedDate = new Date(data.travelDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    if (selectedDate < today) {
        alert('Please select a future date for your travel.');
        return false;
    }
    
    return true;
}



function redirectToWhatsApp(bookingData) {
    try {
        // Create a more detailed and professional message
        const message = encodeURIComponent(
            `🌟 *New Tour Booking Request* 🌟\n\n` +
            `👤 *Customer Information:*\n` +
            `• Name: ${bookingData.fullName}\n` +
            `• Nationality: ${bookingData.nationality}\n` +
            `• Email: ${bookingData.email}\n` +
            `• Phone: ${bookingData.phone}\n\n` +
            `🎯 *Tour Details:*\n` +
            `• Tour Type: ${bookingData.tourType}\n` +
            `• Travel Date: ${bookingData.travelDate}\n` +
            `• Travel Time: ${bookingData.travelTime}\n` +
            `• Number of People: ${bookingData.people}\n` +
            `${bookingData.description ? `• Special Requests: ${bookingData.description}\n` : ''}\n` +
            `📧 *Email Confirmation:* Sent to customer\n\n` +
            `Please confirm this booking and provide any additional information needed. Thank you! 🙏`
        );
        
        // Use the WhatsApp URL from config with fallback
        const whatsappBaseUrl = 'https://wa.me/qr/N26FJ4YEI243E1';
        const whatsappUrl = `${whatsappBaseUrl}?text=${message}`;
        
        // Try to open WhatsApp with better error handling
        const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        if (!whatsappWindow) {
            // Fallback if popup is blocked
            console.log('Popup blocked, trying alternative method');
            try {
                window.location.href = whatsappUrl;
            } catch (locationError) {
                console.error('Failed to redirect to WhatsApp:', locationError);
                // Final fallback: show the URL for manual copy
                const fallbackUrl = `https://wa.me/qr/N26FJ4YEI243E1`;
                showNotification(`Please contact us via WhatsApp: ${fallbackUrl}`, 'info');
            }
        }
        
        // Show notification about WhatsApp redirect
        showNotification('Opening WhatsApp to complete your booking...', 'info');
        
    } catch (error) {
        console.error('Error redirecting to WhatsApp:', error);
        // Fallback: show WhatsApp URL for manual copy
        const fallbackMessage = `WhatsApp: https://wa.me/qr/N26FJ4YEI243E1`;
        showNotification(`Please contact us via WhatsApp: ${fallbackMessage}`, 'info');
    }
}

// Scroll effects
function initializeScrollEffects() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.step-card, .stat-card, .place-card, .service-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Set background color based on type
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = '#10b981';
            break;
        case 'error':
            backgroundColor = '#ef4444';
            break;
        default:
            backgroundColor = '#3b82f6';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Handle page load with hash
window.addEventListener('load', function() {
    const hash = window.location.hash.slice(1);
    if (hash && ['home', 'bookings', 'places', 'packages', 'favourites', 'about'].includes(hash)) {
        navigateToPage(hash);
    }
    
    // Initialize Review Carousel
    initializeReviewCarousel();
    
    // Initialize Company Stats
    initializeCompanyStats();
    
    // Initialize Footer Links
    initializeFooterLinks();
});

// Smooth scrolling for anchor links (excluding navigation links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip navigation links that have data-page attribute
    if (anchor.hasAttribute('data-page')) {
        return;
    }
    
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Moving Review Carousel Functionality
function initializeReviewCarousel() {
    const reviewCards = document.querySelectorAll('.review-card.carousel-card');
    const carousel = document.querySelector('.review-carousel');
    
    if (reviewCards.length === 0 || !carousel) return;
    
    // Duplicate cards for seamless loop
    const originalCards = Array.from(reviewCards);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
    });
    
    // Get all cards (original + cloned)
    const allCards = document.querySelectorAll('.review-card.carousel-card');
    console.log('Total cards found:', allCards.length);
    
    // Initial star animation
    gsap.set('.review-card.carousel-card .star-rating i', { 
        scale: 0, 
        rotation: 180 
    });
    
    gsap.to('.review-card.carousel-card .star-rating i', {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
    });
    
    // Carousel entrance animation
    gsap.fromTo('.review-carousel', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });
    
    // Card entrance animation
    gsap.fromTo('.review-card.carousel-card', {
        opacity: 0,
        scale: 0.8,
        y: 30
    }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3
    });
    
    // Simple hover effects only - no click interactions
    allCards.forEach(card => {
        const photo = card.querySelector('.reviewer-photo');
        const stars = card.querySelectorAll('.star-rating i');
        
        // Desktop hover effects only
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(photo, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
            
            // Subtle star twinkle effect
            stars.forEach((star, index) => {
                gsap.to(star, {
                    scale: 1.1,
                    rotation: 10,
                    duration: 0.2,
                    delay: index * 0.05,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                });
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(photo, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(stars, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Disable click events - make cards non-interactive
        card.style.pointerEvents = 'none';
        card.style.cursor = 'default';
    });
    
    // Ensure carousel keeps moving continuously
    carousel.style.animationPlayState = 'running';
    carousel.style.animationIterationCount = 'infinite';
}

// Sparkle effect function
function createSparkleEffect(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #3b82f6 0%, #1d4ed8 50%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${centerX}px;
            top: ${centerY}px;
        `;
        
        document.body.appendChild(sparkle);
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        gsap.fromTo(sparkle, {
            scale: 0,
            opacity: 1
        }, {
            x: endX - centerX,
            y: endY - centerY,
            scale: 1,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                document.body.removeChild(sparkle);
            }
        });
    }
}

// Company Stats Functionality
function initializeCompanyStats() {
    const statBlocks = document.querySelectorAll('.stat-block');
    
    if (statBlocks.length === 0) return;
    
    // Set initial state
    gsap.set('.stat-block', {
        opacity: 0,
        y: 50,
        scale: 0.8
    });
    
    gsap.set('.stat-icon', {
        opacity: 0,
        scale: 0,
        rotation: -180
    });
    
    gsap.set('.stat-number', {
        opacity: 0,
        scale: 0.5
    });
    
    gsap.set('.stat-label', {
        opacity: 0,
        y: 20
    });
    
    // Create scroll trigger for the section
    gsap.timeline({
        scrollTrigger: {
            trigger: '.company-stats-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
                // Add fade-in class for background transition
                document.querySelector('.company-stats-section').classList.add('fade-in');
            },
            onLeave: () => {
                // Remove fade-in class when leaving
                document.querySelector('.company-stats-section').classList.remove('fade-in');
            },
            onEnterBack: () => {
                // Add fade-in class when scrolling back up
                document.querySelector('.company-stats-section').classList.add('fade-in');
            },
            onLeaveBack: () => {
                // Remove fade-in class when scrolling back up
                document.querySelector('.company-stats-section').classList.remove('fade-in');
            }
        }
    })
    .to('.stats-title', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
    })
    .to('.stats-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.3')
    .to('.stat-block', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.2')
    .to('.stat-icon', {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=0.3')
    .to('.stat-number', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.2')
    .to('.stat-label', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: 'power2.out'
    }, '-=0.2')
    .call(() => {
        // Start count-up animations
        animateCountUp();
    });
    
    // Add hover animations
    statBlocks.forEach(block => {
        const icon = block.querySelector('.stat-icon');
        const number = block.querySelector('.stat-number');
        const label = block.querySelector('.stat-label');
        
        // Desktop hover effects
        block.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.2,
                rotation: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(number, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(label, {
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        block.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(number, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(label, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Mobile tap effects
        block.addEventListener('touchstart', () => {
            gsap.to(icon, {
                scale: 1.1,
                rotation: 3,
                duration: 0.2,
                ease: 'power2.out'
            });
            
            gsap.to(number, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out'
            });
            
            gsap.to(label, {
                y: -3,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        block.addEventListener('touchend', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
            
            gsap.to(number, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
            
            gsap.to(label, {
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}

// Count-up animation function
function animateCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((element, index) => {
        const targetValue = parseInt(element.getAttribute('data-value'));
        const suffix = targetValue === 96 ? '%' : '';
        
        gsap.to(element, {
            duration: 1.2,
            ease: 'power2.out',
            delay: index * 0.2,
            onUpdate: function() {
                const progress = this.progress();
                const currentValue = Math.floor(targetValue * progress);
                element.textContent = currentValue + suffix;
            },
            onComplete: function() {
                element.textContent = targetValue + suffix;
            }
        });
    });
}

// Footer Links Functionality
function initializeFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a[data-page]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
}

// Navigation Buttons Functionality
function initializeNavigationButtons() {
    // Handle "Book Now" button and "Explore Places" button
    const navigationButtons = document.querySelectorAll('a[data-page]');
    
    navigationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            navigateToPage(targetPage);
        });
    });
}

// Tip Functionality
function initializeTip() {
    const tipContainer = document.getElementById('tipContainer');
    const tipClose = document.getElementById('tipClose');
    
    if (!tipContainer || !tipClose) return;
    
    // Always show the tip unless explicitly closed with X button
    // Remove any hidden class that might be present
    tipContainer.classList.remove('hidden');
    
    // Close tip functionality - only when X button is clicked
    tipClose.addEventListener('click', function() {
        tipContainer.classList.add('hidden');
        localStorage.setItem('tipClosed', 'true');
    });
    
    // Optional: Uncomment the line below to reset tip state for testing
    // localStorage.removeItem('tipClosed');
}

// Package Data
const packageData = {
    'Package A': {
        title: 'Penang Heritage Discovery',
        description: 'Discover UNESCO George Towns rich history on this full-day Penang Heritage Tour! See iconic Street Art Murals, Khoo Kongsi, and Cheong Fatt Tze Mansion. Immerse yourself in culture and colonial architecture. Book your 1-Day cultural trip now!',
        image: 'https://img2.penangpropertytalk.com/wp-content/uploads/2024/07/fortcornwallis-1.jpg',
        price: 'From RM 299',
        features: [
            { icon: 'fas fa-clock', title: 'Duration', description: '1 Day (8 hours)' },
            { icon: 'fas fa-users', title: 'Group Size', description: 'Max 8 people' },
            { icon: 'fas fa-star', title: 'Rating', description: '4.8/5 stars' },
            { icon: 'fas fa-map-marker-alt', title: 'Highlights', description: 'UNESCO Heritage Sites' },
            { icon: 'fas fa-camera', title: 'Photo Ops', description: 'Street Art & Architecture' },
            { icon: 'fas fa-utensils', title: 'Meals', description: 'Local lunch upon request' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Heritage Discovery Day',
                activities: [
                    '09:00 AM – Kek Lok Si Temple (Visit the largest Buddhist temple in Malaysia)',
                    '11:00 AM – Khoo Kongsi Clan House (Admire the intricate architecture of a Chinese clanhouse)',
                    '12:00 PM – Cheong Fatt Tze Mansion (Explore the famous Blue Mansion with rich history)',
                    '01:00 PM – Lunch at a Heritage Café (Enjoy traditional Malaysian cuisine)',
                    '02:00 PM – Kapitan Keling Mosque (Visit the oldest mosque in Penang)',
                    '02:45 PM – Penang Peranakan Mansion (Explore the opulent mansion and learn about Peranakan culture)',
                    '04:00 PM – Fort Cornwallis (Visit the historical fort and learn about Penang\'s colonial past)',
                    '05:00 PM – Street Art Walking Tour (Explore colorful murals and street art)',
                    '07:00 PM – Evening at Armenian Street (Experience the vibrant cultural district)'
                ]
            }
        ],
        places: [
            {
                title: 'Kek Lok Si Temple',
                description: 'Visit the largest Buddhist temple in Malaysia with stunning architecture and spiritual atmosphere.',
                image: 'https://onpenang.com/wp-content/uploads/2024/01/Kek-Lok-Si-Temple-Penang.jpg',
                features: ['Buddhist Temple', 'Cultural Experience', 'Architecture', 'Included']
            },
            {
                title: 'Khoo Kongsi Clan House',
                description: 'Admire the intricate architecture of a Chinese clanhouse with rich cultural history.',
                image: 'https://onpenang.com/wp-content/uploads/2024/06/Leong-San-Tong-Khoo-Kongsi-02.jpg',
                features: ['Chinese Clanhouse', 'Intricate Architecture', 'Cultural History', 'Included']
            },
            {
                title: 'Cheong Fatt Tze Mansion',
                description: 'Explore the famous Blue Mansion with rich history and beautiful architecture.',
                image: 'https://www.cheongfatttzemansion.com/wp-content/uploads/2024/11/cheong_fatt_tze.jpg',
                features: ['Blue Mansion', 'Heritage Site', 'Cultural Tour', 'Included']
            },
            {
                title: 'Heritage Café',
                description: 'Enjoy traditional Malaysian cuisine in a charming heritage café setting.',
                image: 'https://www.optionstheedge.com/sites/default/files/assets/2020/bao_teck_interior.jpg',
                features: ['Traditional Cuisine', 'Heritage Setting', 'Local Dining', 'Included']
            },
            {
                title: 'Kapitan Keling Mosque',
                description: 'Visit the oldest mosque in Penang with beautiful Islamic architecture and cultural significance.',
                image: 'https://image-tc.galaxy.tf/wijpeg-1rqzzjgmvsgbi2acsptc15vr8/masjidkapitankelingmosque-1-a8e859.jpg',
                features: ['Islamic Architecture', 'Cultural Heritage', 'Religious Site', 'Included']
            },
            {
                title: 'Penang Peranakan Mansion',
                description: 'Explore the opulent mansion and learn about the unique Peranakan culture and heritage.',
                image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Pinang_Peranakan_Mansion_%28I%29.jpg',
                features: ['Peranakan Culture', 'Historical Mansion', 'Heritage', 'Included']
            },
            {
                title: 'Fort Cornwallis',
                description: 'Visit the historical fort and learn about Penang\'s colonial past and maritime history.',
                image: 'https://img2.penangpropertytalk.com/wp-content/uploads/2024/07/fortcornwallis-1.jpg',
                features: ['Historical Fort', 'Colonial History', 'Maritime Heritage', 'Included']
            },
            {
                title: 'Street Art Walking Tour',
                description: 'Explore colorful murals and street art by Ernest Zacharevic and local artists.',
                image: 'https://images.ctfassets.net/dsbipkqphva2/6mGHEDXaRCC7TMmXVOvSjE/032ec0b36822d3f16633980b1a29000b/penang-street-art-pelago-1-min.jpg',
                features: ['Street Art', 'Photo Ops', 'Cultural Walk', 'Included']
            },
            {
                title: 'Armenian Street',
                description: 'Experience the vibrant cultural district with colorful murals and heritage cafés.',
                image: 'https://www.medisata.com/assets/images/wisata/armenian-street-georgetown.jpg',
                features: ['Cultural District', 'Heritage Cafés', 'Street Art', 'Included']
            }
        ]
    },
    'Package B': {
        title: 'Penang Day Tour Package: Culture & Heritage OR Nature & Coasta',
        description: 'Discover Penang in one day! Choose your perfect adventure: George Town Heritage Tour (Culture & History) OR Penang Coastal & Nature Tour (Beach & Views). All-inclusive package & meals. Book your 1-day trip now!',
        image: 'https://cdn.tatlerasia.com/tatlerasia/i/2021/11/11173230-123742590-500497978016363-4094686581571688722-n_cover_1080x810.jpg',
        price: 'From RM 350',
        features: [
            { icon: 'fas fa-clock', title: 'Duration', description: '1 Day (9 hours)' },
            { icon: 'fas fa-users', title: 'Group Size', description: 'Max 12 people (Van) / Max 6 people (MPV) / Max 4 people (Car)' },
            { icon: 'fas fa-star', title: 'Rating', description: '4.9/5 stars' },
            { icon: 'fas fa-car', title: 'Transport', description: 'Car: RM 350-380 | MPV: RM 450-480 | Van: RM 570-600' },
            { icon: 'fas fa-utensils', title: 'Meals', description: 'Food coverage upon request' },
            { icon: 'fas fa-ticket-alt', title: 'Tickets', description: 'All entrance fees not included' }
        ],
        tourOptions: {
            'culture': {
                title: 'Culture & Heritage Tour',
                price: { car: 350, mpv: 450, van: 570 },
                description: 'Explore Penang\'s rich history through temples, clan houses, street art, and traditional food.',
                itinerary: [
                    '09:00 AM – Penang Hill (Ride the funicular train and enjoy sweeping views of George Town)',
                    '10:30 AM – The Habitat (Walk along the canopy trail and discover native flora)',
                    '12:00 PM – Kek Lok Si Temple (Visit the largest Buddhist temple in Malaysia)',
                    '01:30 PM – Local Hawker Stalls (Taste authentic Penang dishes such as laksa and char kuey teow)',
                    '02:30 PM – Armenian Street (Explore colorful murals and heritage cafés)',
                    '03:30 PM – Chew Jetty (Walk through a traditional Chinese water village)',
                    '05:00 PM – Khoo Kongsi (Admire the intricate architecture of a Chinese clanhouse)',
                    '07:00 PM – Gurney Drive (Enjoy dinner at Penang\'s famous seafront hawker centre)'
                ],
                places: [
                    {
                        title: 'Penang Hill',
                        description: 'Ride the funicular train and enjoy sweeping views of George Town from the highest point in Penang.',
                        image: 'https://cdn.tatlerasia.com/tatlerasia/i/2021/11/11173230-123742590-500497978016363-4094686581571688722-n_cover_1080x810.jpg',
                        features: ['Funicular Train', 'Mountain Views', 'Included']
                    },
                    {
                        title: 'The Habitat',
                        description: 'Walk along the canopy trail and discover native flora in this beautiful nature reserve.',
                        image: 'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1600900gsm/eventThirdParty/2023/11/24/97d30375-bb0f-4400-8a0d-710c78f898e6-1700763501366-48d8c366739bd9ce80a91ed7adb735ce.jpg',
                        features: ['Canopy Trail', 'Native Flora', 'Nature Walk', 'Included']
                    },
                    {
                        title: 'Kek Lok Si Temple',
                        description: 'Visit the largest Buddhist temple in Malaysia with stunning architecture and spiritual atmosphere.',
                        image: 'https://onpenang.com/wp-content/uploads/2024/01/Kek-Lok-Si-Temple-Penang.jpg',
                        features: ['Buddhist Temple', 'Cultural Experience', 'Architecture', 'Included']
                    },
                    {
                        title: 'Armenian Street',
                        description: 'Explore colorful murals and heritage cafés in this vibrant cultural district.',
                        image: 'https://www.medisata.com/assets/images/wisata/armenian-street-georgetown.jpg',
                        features: ['Street Art', 'Heritage Cafés', 'Cultural District', 'Included']
                    },
                    {
                        title: 'Chew Jetty',
                        description: 'Walk through a traditional Chinese water village built on stilts over the sea.',
                        image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/d7/cb/5b.jpg',
                        features: ['Water Village', 'Traditional Houses', 'Cultural Heritage', 'Included']
                    },
                    {
                        title: 'Ghost Museum',
                        description: 'Spooky, fun, and photo-friendly ghost experience in Penang',
                        image: 'https://xpscntm-asset-6aaa6adb24ad2493.s3.ap-southeast-1.amazonaws.com/2002101992553/Ghost-Museum-Penang-Admission-Tickets-6416e8b0-d0d4-4a1f-83ae-cf60d0d914d5.jpeg',
                        features: ['Costume Dress-Up', 'Family-Friendly', 'Cultural History', 'Included']
                    },
                    {
                        title: 'Gurney Drive',
                        description: 'Enjoy dinner at Penang\'s famous seafront hawker centre with local delicacies.',
                        image: 'https://photos.smugmug.com/Asia/Malaysia/Georgetown-2020s/i-b6k7LH4/0/4Bm2dKLzsgdm6fbMcdtG5sTsn4Sjg4RL6BKRMGKC/L/20240518_161236-gurney-bay-walk-L.jpg',
                        features: ['Seafront Dining', 'Local Delicacies', 'Hawker Centre', 'Included']
                    }
                ]
            },
            'nature': {
                title: 'Nature & Coastal Tour',
                price: { car: 380, mpv: 480, van: 600 },
                description: 'Discover Penang\'s natural beauty and coastal wonders with butterfly farms, spice gardens, national parks, and pristine beaches.',
                itinerary: [
                    '09:00 AM – Entopia Butterfly Farm (Explore the magical world of butterflies and insects)',
                    '10:30 AM – Tropical Spice Garden (Discover exotic spices and tropical plants)',
                    '12:00 PM – Lunch at Teluk Bahang (Enjoy fresh seafood and local dishes)',
                    '01:30 PM – Fruit Farm (Scenic farm with tropical fruit orchards, guided tours, and fresh tastings.)',
                    '03:30 PM – Penang National Park(Visit Monkey Beach, lighthouse, and chance to see Tutrle)',
                    '05:00 PM – Floating Mosque (Visit the beautiful mosque on the water)',
                    '07:00 PM – Dinner at Batu Ferringhi Night Market (Experience local street food)'
                ],
                places: [
                    {
                        title: 'Entopia Butterfly Farm',
                        description: 'Explore the magical world of butterflies and insects in this beautiful nature sanctuary.',
                        image: 'https://d2ile4x3f22snf.cloudfront.net/wp-content/uploads/sites/324/2018/07/30014613/ENTOPIA_Gdn_HomeTreeView-1.jpg',
                        features: ['Butterfly Sanctuary', 'Insect World', 'Nature Education', 'Included']
                    },
                    {
                        title: 'Tropical Spice Garden',
                        description: 'Discover exotic spices and tropical plants in this lush garden setting.',
                        image: 'https://www.mypenang.gov.my/uploads/directory/39/images/tropicalspice.jpg',
                        features: ['Exotic Spices', 'Tropical Plants', 'Garden Tours', 'Included']
                    },
                    {
                        title: 'Fruit Farm',
                        description: 'Scenic farm with tropical fruit orchards, guided tours, and fresh tastings.',
                        image: 'https://penangfoodie.sgp1.digitaloceanspaces.com/2021/01/tropical-fruit-farm-2.png',
                        features: ['Monkey Beach', 'Lighthouse', 'National Park', 'Included']
                    },
                    {
                        title: 'Penang National Park',
                        description: 'Visit Monkey Beach and Chance to see Tutrle.',
                        image: 'https://mypenang.gov.my/uploads/directory/55/cover/Penang-National-Park-1.jpg',
                        features: ['Scenic Views', 'Photo Opportunities', 'Dam Visit', 'Included']
                    },
                    {
                        title: 'Floating Mosque',
                        description: 'Visit the beautiful mosque built on the water with stunning architecture.',
                        image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Penang_Malaysia_Sunrise_at_Tanjong_Bungah_Mosque-04and_%284461552447%29.jpg',
                        features: ['Water Mosque', 'Islamic Architecture', 'Cultural Visit', 'Included']
                    },
                    {
                        title: 'Batu Ferringhi Night Market',
                        description: 'Experience local street food and vibrant night market atmosphere.',
                        image: 'https://penangfoodie.sgp1.digitaloceanspaces.com/2017/10/batu-feringhi-night-market.jpg',
                        features: ['Street Food', 'Night Market', 'Local Culture', 'Included']
                    }
                ]
            }
        }
    },
    'Package C': {
        title: '3D2N Cameron Highlands  Package',
        description: 'Book the top-rated Cameron Highlands 3D2N tour! Explore iconic Tea Plantations, Mossy Forest, and Strawberry/Lavender Farms. Flexible private Car. Guaranteed cool climate escape.',
        image: 'https://static.wixstatic.com/media/ed89ba_2ce2a6fb16a34eb1863f6541f8b45b78~mv2.png/v1/fill/w_534,h_316,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ed89ba_2ce2a6fb16a34eb1863f6541f8b45b78~mv2.png',
        price: 'From RM 500',
        features: [
            { icon: 'fas fa-clock', title: 'Duration', description: '3 Days / 2 Nights' },
            { icon: 'fas fa-users', title: 'Group Size', description: 'Max 12 people (Van) / Max 4 people (Car)' },
            { icon: 'fas fa-star', title: 'Rating', description: '5.0/5 stars' },
            { icon: 'fas fa-car', title: 'Transport', description: 'Car: RM 500 | Van: RM 900' },
            { icon: 'fas fa-map-marker-alt', title: 'Departure', description: 'Day 1, 10:00 AM (Penang Hotel)' },
            { icon: 'fas fa-return', title: 'Return', description: 'Day 3, 9:00 PM (Penang Hotel)' }
        ],
        itinerary: [
            {
                day: 1,
                title: ' Day 01: Penang → Cameron Highlands',
                activities: [
                    '10:00 AM – Pick-up from Penang Hotel',
                    '10:00 AM – 2:00 PM – Drive to Cameron Highlands (approx. 4 hours)',
                    '2:00 PM – Arrival & hotel check-in',
                    '3:00 PM – Visit Boh Tea Plantation (Sungei Palas Garden)',
                    '4:30 PM – Visit Sam Poh Temple',
                    '6:00 PM – Explore Brinchang Town at leisure / Dinner (own expense)',
                    'Overnight in Cameron Highlands'
                ]
            },
            {
                day: 2,
                title: ' Day 02: Full Day Exploration',
                activities: [
                    '8:00 AM – Breakfast at hotel (self-arrangement or add-on if booked)',
                    '9:00 AM – Guided walk at Mossy Forest',
                    '11:00 AM – Short Hiking Trail (optional easy trek)',
                    '12:30 PM – Lunch (own arrangement)',
                    '2:00 PM – Visit Strawberry Farm (Big Red Strawberry Farm or similar)',
                    '3:30 PM – Visit Cameron Lavender Garden',
                    '4:30 PM – Visit Flora Park',
                    '6:30 PM – Visit Brinchang Night Market (Friday & Saturday only)',
                    'Overnight in Cameron Highlands'
                ]
            },
            {
                day: 3,
                title: ' Day 03: Cameron Highlands → Penang',
                activities: [
                    '8:00 AM – Breakfast at hotel',
                    '9:00 AM – Visit The Sheep Sanctuary',
                    '10:30 AM – Visit Bee Farm',
                    '12:00 PM – Lunch (own arrangement)',
                    'Free leisure time until departure',
                    '5:00 PM – Depart Cameron Highlands',
                    '9:00 PM – Arrive back at Penang Hotel'
                ]
            }
        ],
        places: [
            {
                title: 'Boh Tea Plantation',
                description: 'Visit Malaysia\'s largest tea plantation and learn about the tea-making process. Enjoy breathtaking views of rolling green hills and sample fresh tea.',
                image: 'https://bohtea.com/wp-content/uploads/2022/08/02_STPC_1200x675-1.jpg',
                features: ['Tea Factory Tour', 'Scenic Views', 'Tea Tasting', 'Gift Shop', 'Included']
            },
            {
                title: 'Sam Poh Temple',
                description: 'Visit the beautiful Sam Poh Temple and experience the spiritual atmosphere of this historic temple.',
                image: 'https://cdn.forevervacation.com/uploads/attraction/sam-poh-temple-2912.jpg',
                features: ['Temple Visit', 'Cultural Experience', 'Spiritual', 'Included']
            },
            {
                title: 'Mossy Forest',
                description: 'Explore the mystical mossy forest with its ancient trees covered in moss and ferns. Experience the cool, misty atmosphere and unique ecosystem.',
                image: 'https://www.jomjalan.com/wp-content/uploads/2019/03/mossy-forest-tour-1.jpg',
                features: ['Nature Trail', 'Mossy Trees', 'Cool Climate', 'Photography', 'Included']
            },
            {
                title: 'Strawberry Farm',
                description: 'Experience strawberry picking and enjoy fresh strawberries with cream. Visit the tea plantation and learn about both tea and strawberry cultivation.',
                image: 'https://www.cameronhighland.net/img/strawberry-picking.jpg',
                features: ['Strawberry Picking', 'Fresh Strawberries', 'Educational Tour', 'Included']
            },
            {
                title: 'Cameron Lavender Garden',
                description: 'Stroll through beautiful lavender fields and enjoy the fragrant aroma. Visit the garden shop and learn about lavender cultivation.',
                image: 'https://puriandsue.com/wp-content/uploads/2022/03/Cameron-Highlands-Lavender-Garden-Tringkap-19-768x401.jpg',
                features: ['Lavender Fields', 'Garden Shop', 'Fragrant Aroma', 'Photo Opportunities', 'Included']
            },
            {
                title: 'Flora Park',
                description: 'Explore the beautiful Flora Park with its diverse collection of flowers and plants.',
                image: 'https://strawberryparkresorts.com/wp-content/uploads/2023/10/Flora-Park-e1697100424764.jpg',
                features: ['Flower Gardens', 'Nature Walk', 'Photography', 'Included']
            },
            {
                title: 'Brinchang Night Market',
                description: 'Experience the vibrant night market with local food, souvenirs, and entertainment (Friday & Saturday only).',
                image: 'https://puriandsue.com/wp-content/uploads/2022/03/Cameron-Highlands-Golden-Hills-Weekend-Night-Market-0.jpg',
                features: ['Local Food', 'Shopping', 'Entertainment', 'Included']
            },
            {
                title: 'The Sheep Sanctuary',
                description: 'Visit the sheep sanctuary and interact with friendly sheep. Learn about sheep farming and enjoy the peaceful countryside setting.',
                image: 'https://images.t2u.io/upload/event/listing/0-26153-AWSS32c8cb5a7-1bad-411c-9f1a-bf3e1bb53a4e-krPd.jpg',
                features: ['Sheep Interaction', 'Farm Tour', 'Countryside Views', 'Included']
            },
            {
                title: 'Bee Farms',
                description: 'Learn about beekeeping and honey production. Sample different types of honey and learn about the importance of bees in agriculture.',
                image: 'https://cdn.forevervacation.com/uploads/attraction/cameron-tringkap-bee-farm-3274.jpg',
                features: ['Beekeeping Tour', 'Honey Sampling', 'Educational', 'Included']
            },
            {
                title: 'Hiking (Light Trails)',
                description: 'Easy hiking trails suitable for all ages and fitness levels. Enjoy gentle walks through the beautiful highland scenery.',
                image: 'https://voyagescribe.com/wp-content/uploads/2019/09/20190827_104619-1024x768.jpg',
                features: ['Easy Hiking', 'Nature Walk', 'Family Friendly', 'Included']
            },
            {
                title: 'Cactus Valley',
                description: 'Explore a vast collection of cacti and succulents from around the world. Enjoy the unique desert-like landscape in the highlands.',
                image: 'https://www.cameronhighland.net/img/cactus-valley-view.jpg',
                features: ['Cactus Collection', 'Succulents', 'Desert Landscape', 'Plant Shop', 'Not Included']
            },
            {
                title: 'Additional Farms & Gardens',
                description: 'Small flower and vegetable farms scattered across Brinchang and Tanah Rata areas. Experience local farming culture.',
                image: 'https://www.cameronhighlandsinfo.com/attraction/Vegetable_Farm/images/veg_main.jpg',
                features: ['Flower Farms', 'Vegetable Farms', 'Local Culture', 'Not Included']
            },
            {
                title: 'Long Hiking Trails',
                description: 'Advanced hiking trails like Gunung Brinchang for experienced hikers seeking challenging treks.',
                image: 'https://images.squarespace-cdn.com/content/v1/6298cb774cf3830bc9b342bf/e62e574a-62cd-4ce9-a409-8e9f5f866c68/trail-10-cameron-highlands-sign-1.jpg',
                features: ['Advanced Hiking', 'Mountain Trails', 'Challenging', 'Not Included']
            }
        ]
    },
    'Package D': {
        title: '2D1N Genting Highlands Package',
        description: 'The fastest way to Genting Highlands! All-in 2-day package with easy pickup from KL or Penang. Features Genting SkyWorlds, Skytropolis, the Awana Skyway, and Chin Swee Temple. Book your quick Malaysia mountain escape today!',
        image: 'https://malaysiatravel-assets.s3.amazonaws.com/images/20200408-to6fd-genting-highland-jpg',
        price: 'From RM 1299',
        features: [
            { icon: 'fas fa-clock', title: 'Duration', description: '2 Days / 1 Night' },
            { icon: 'fas fa-users', title: 'Group Size', description: 'Max 12 people (Van) / Max 4 people (Car)' },
            { icon: 'fas fa-star', title: 'Rating', description: '5.0/5 stars' },
            { icon: 'fas fa-car', title: 'Transport', description: 'Car: RM 1299 | Van: RM 1999' },
            { icon: 'fas fa-map-marker-alt', title: 'Departure', description: 'Day 1, 8:00 AM (Penang/KL Hotel)' },
            { icon: 'fas fa-return', title: 'Return', description: 'Day 2, 11:00 PM (Penang/KL Hotel)' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Day 1: Penang/KL → Genting Highlands',
                activities: [
                    '08:00 AM – Pick-up from your hotel in Penang/KL',
                    '12:30 PM – Arrive at Awana Skyway, take Cable Car ride',
                    '01:00 PM – Stop at Chin Swee Caves Temple',
                    '02:30 PM – Check-in at Hotel',
                    '03:30 PM – Lunch at SkyAvenue Mall',
                    '05:00 PM – Free & Easy (Skytropolis Indoor Theme Park / Shopping / Casino)',
                    '07:30 PM – Dinner at SkyAvenue Mall',
                    '09:00 PM – Night leisure at Genting (optional)',
                    'Overnight at Genting Highlands'
                ]
            },
            {
                day: 2,
                title: 'Day 2: Genting Highlands → Penang/KL',
                activities: [
                    '07:30 AM – Breakfast at Hotel',
                    '09:00 AM – Full Day at Genting SkyWorlds Theme Park',
                    '01:00 PM – Lunch inside Theme Park',
                    '05:00 PM – Exit Theme Park & Check-out Hotel',
                    '05:30 PM – Visit SkyWorld Snow (Indoor Snow Park)',
                    '07:00 PM – Depart Genting Highlands',
                    '11:00 PM – Drop-off at your hotel in Penang/KL'
                ]
            }
        ],
        places: [
            {
                title: 'Awana Skyway Cable Car',
                description: 'Experience the breathtaking cable car ride to Genting Highlands with panoramic views of the mountains and valleys.',
                image: 'https://www.agoda.com/wp-content/uploads/2024/03/Featured-image-cable-car-at-Genting-Highlands-Malaysia.jpg',
                features: ['Cable Car Ride', 'Mountain Views', 'Scenic Journey', 'Included']
            },
            {
                title: 'Chin Swee Caves Temple',
                description: 'Visit the beautiful temple complex built into the mountain with stunning architecture and spiritual atmosphere.',
                image: 'https://www.rwgenting.com/content/dam/approved/rw-genting/web/things-to-do/attractions/chin-swee-caves-temple/cs_inner_gallery_1400x680_1.jpg',
                features: ['Temple Visit', 'Cultural Experience', 'Mountain Views', 'Included']
            },
            {
                title: 'Genting SkyWorlds Theme Park',
                description: 'Enjoy a full day at Malaysia\'s premier outdoor theme park with thrilling rides and family attractions.',
                image: 'https://mjadventuretravel.com/wp-content/uploads/2023/09/10-2.jpg',
                features: ['Theme Park Rides', 'Family Fun', 'Entertainment', 'Included']
            },
            {
                title: 'SkyAvenue Mall',
                description: 'Shop and dine at the modern mall with international brands, restaurants, and entertainment options.',
                image: 'https://wanderon-images.gumlet.io/gallery/new/2025/02/27/1740672807620-skyavenue-mall-genting.jpg',
                features: ['Shopping', 'Dining', 'Entertainment', 'Included']
            },
            {
                title: 'SkyWorld Snow',
                description: 'Experience the magical indoor snow park with winter activities and snow-themed attractions.',
                image: 'https://www.rwgenting.com/content/dam/approved/rw-genting/web/theme-parks/snow-world/sw_inner_gallery_1400x680_3.jpg',
                features: ['Indoor Snow Park', 'Winter Activities', 'Snow Attractions', 'Included']
            },
            {
                title: 'Skytropolis Indoor Theme Park',
                description: 'Indoor theme park with rides, games, and entertainment suitable for all ages.',
                image: 'https://www.rwgenting.com/content/dam/approved/rw-genting/web/theme-parks/skytropolis-indoor-theme-park/family-ride/Skyscraper.jpg',
                features: ['Indoor Rides', 'Games', 'Family Entertainment', 'Included']
            }
        ]
    },
    'Package E': {
        title: '1-Day Bukit Merah Tour',
        description: 'Plan your family trip to Bukit Merah Laketown Resort! Explore the famous Orangutan Island, splash into the Waterpark, and enjoy family fun. Book tickets for the ultimate Perak adventure now!',
        image: 'https://onpenang.com/wp-content/uploads/2024/10/Orangutan-Island-Bukit-Merah-1.jpg',
        price: 'From RM 300',
        features: [
            { icon: 'fas fa-clock', title: 'Duration', description: '10 Hours' },
            { icon: 'fas fa-users', title: 'Group Size', description: 'Max 12 people' },
            { icon: 'fas fa-star', title: 'Rating', description: '5.0/5 stars' },
            { icon: 'fas fa-map-marker-alt', title: 'Departure', description: '10 AM from Penang' },
            { icon: 'fas fa-car', title: 'Transport', description: 'Car/Van Included' },
            { icon: 'fas fa-heart', title: 'Best For', description: 'Families & Groups' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Bukit Merah Adventure',
                activities: [
                    '10:00 AM - Pick-up from your hotel in Penang',
                    '12:00 PM - Arrive at Bukit Merah Laketown Resort',
                    '12:00 PM - 6:00 PM - Explore Orang Utan Island Sanctuary, Lakewater Cruise, Eco Park (Mini Zoo), and Laketown Waterpark',
                    '6:00 PM - Depart Bukit Merah',
                    '8:00 PM - Drop-off at your hotel in Penang'
                ]
            }
        ],
        places: [
            {
                title: 'Orang Utan Island Sanctuary',
                description: 'Boat ride across the lake to see orangutans in natural habitat',
                image: 'https://onpenang.com/wp-content/uploads/2024/10/Orangutan-Island-Bukit-Merah-1.jpg',
                features: ['Wildlife', 'Boat Ride', 'Included']
            },
            {
                title: 'Eco Park (Mini Zoo)',
                description: 'Reptiles, tropical birds, and small animals',
                image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXMI_sCk1MnOHHuyQOGNwrisdpNiijgDjxoJ_b28CEG0wjiO_d356Jo9GT83gF6A_NDV_lpWwx-Y3gALMQNG2C-0q3C1e7z18sOEpH3qnlA6RarlQgCpUge7fblLoJPmkhS5mxahix-Zry/s1600/DSC_3310.JPG',
                features: ['Animals', 'Nature', 'Included']
            },
            {
                title: 'Laketown Waterpark',
                description: 'Slides, pools, and family fun activities',
                image: 'https://static.wixstatic.com/media/0ee2d2_787d2a4b3af345948ab0688ff6bb2ac2~mv2.png/v1/fill/w_640,h_410,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/0ee2d2_787d2a4b3af345948ab0688ff6bb2ac2~mv2.png',
                features: ['Water Activities', 'Family Fun', 'Included']
            },
            {
                title: 'Lake Cruise',
                description: 'Scenic ride across Bukit Merah Lake',
                image: 'https://mgperak.com/wp-content/uploads/2024/03/MGF11032024_ORANG-UTAN__04.jpg',
                features: ['Scenic Views', 'Boat Tour', 'Included']
            }
        ]
    },
    'Package F': {
        title: 'The Best Water Sports & Activities at Batu Ferringhi Beach, Penang',
        description: 'Thrilling Batu Ferringhi Beach water sports! Book your Jet Ski, Parasailing, or Banana Boat package now. Professional staff, safe, and best price guarantee. Perfect for families in Penang.',
        image: 'https://www.travel-penang-malaysia.com/images/batu-ferringhi-beach-penang.jpg',
        price: 'From RM 35',
        features: [
            { icon: 'fas fa-clock', title: 'Duration', description: 'Half Day / Flexible' },
            { icon: 'fas fa-users', title: 'Group Size', description: '1-10 people' },
            { icon: 'fas fa-star', title: 'Rating', description: '5.0/5 stars' },
            { icon: 'fas fa-map-marker-alt', title: 'Location', description: 'Batu Feringhi Beach' },
            { icon: 'fas fa-heart', title: 'Best For', description: 'Adventure lovers, families' },
            { icon: 'fas fa-water', title: 'Type', description: 'Selectable activities' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Water Activities Adventure',
                activities: [
                    'Arrive at Batu Feringhi Beach (self-arrival)',
                    'Meet activity guide & safety briefing',
                    'Select & enjoy chosen activities (Jet Ski, Parasailing, Banana Boat, Boat Rides)',
                    'Return to shore after rides — free leisure time at the beach'
                ]
            }
        ],
        places: [
            {
                title: 'Jet Ski Adventure',
                description: 'Thrilling jet ski rides on the waves - single or double rider options',
                image: 'https://penangfoodie.sgp1.digitaloceanspaces.com/2019/05/56596623_2230420800514503_5390398583580849425_n.jpg',
                features: ['High Speed', 'Adventure', 'Included']
            },
            {
                title: 'Parasailing Experience',
                description: 'Soar above Batu Feringhi with breathtaking sea views',
                image: 'https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/pozpbzqxb3e0boyk4e3v.jpg',
                features: ['Aerial Views', 'Thrilling', 'Included']
            },
            {
                title: 'Banana Boat Ride',
                description: 'Fun and splashes for groups with exciting water adventure',
                image: 'https://res.cloudinary.com/djhua1jv9/image/upload/v1748451480/Banana_Boat_Ride_in_Mirissa_faac1fff25.jpg',
                features: ['Group Fun', 'Water Sports', 'Included']
            },
            {
                title: 'Boat Ride',
                description: 'Scenic boat ride across Batu Feringhi waters',
                image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/6f/46/10.jpg',
                features: ['Scenic Views', 'Boat Tour', 'Included']
            }
        ]
    },

    'Package G': {
        title: '✈️ Airport Transfer',
        description: 'Private KLIA/Penang Airport Transfers: Fixed rates, flight-tracked, and professional Meet & Greet service in Malaysia. Skip taxi queues. Book your private car now! 🇲🇾',
        image: 'https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2023/11/several-airasia-aircraft-parked-at-kuala-lumpur-international-airport-terminal-2-yanatul-1.jpg',
        price: 'From RM 90',
        features: [
            { icon: 'fas fa-plane', title: 'Service', description: 'Airport Transfers' },
            { icon: 'fas fa-clock', title: 'Availability', description: '24/7 Service' },
            { icon: 'fas fa-star', title: 'Rating', description: '4.9/5 stars' },
            { icon: 'fas fa-car', title: 'Vehicles', description: 'Car, Van, MPV' },
            { icon: 'fas fa-shield-alt', title: 'Safety', description: 'Professional Drivers' },
            { icon: 'fas fa-credit-card', title: 'Pricing', description: 'Fixed Rates' }
        ],
        routes: [
            {
                route: 'Penang Hotel → Penang International Airport',
                car: { price: 90, capacity: 4 },
                van: { price: 120, capacity: 12 },
                mpv: { price: 160, capacity: 7 }
            },
            {
                route: 'Penang International Airport → Penang Hotel',
                car: { price: 90, capacity: 4 },
                van: { price: 120, capacity: 12 },
                mpv: { price: 160, capacity: 7 }
            },
            {
                route: 'Penang Hotel → Kuala Lumpur International Airport',
                car: { price: 750, capacity: 4 },
                van: { price: 980, capacity: 12 },
                mpv: { price: 850, capacity: 7 }
            }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Airport Transfer Service',
                activities: [
                    'Professional driver pick-up',
                    'Comfortable vehicle transfer',
                    'Direct route to destination',
                    'Luggage assistance',
                    'Safe and timely arrival'
                ]
            }
        ],
        places: [
            {
                title: 'Penang International Airport',
                description: 'Main airport serving Penang with international and domestic flights',
                image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                features: ['International Flights', 'Domestic Flights', 'Included']
            },
            {
                title: 'Kuala Lumpur International Airport',
                description: 'Malaysia\'s main international airport with global connections',
                image: 'https://static1.simpleflyingimages.com/wordpress/wp-content/uploads/2023/11/several-airasia-aircraft-parked-at-kuala-lumpur-international-airport-terminal-2-yanatul-1.jpg',
                features: ['International Hub', 'Global Connections', 'Included']
            },
            {
                title: 'Penang Hotels',
                description: 'Various hotels across Penang with convenient pick-up service',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                features: ['Hotel Pick-up', 'Convenient Service', 'Included']
            }
        ]
    },
    
    'Package I': {
        title: 'Penang 2-Day Itinerary',
        description: 'Choose between two amazing 2-day Penang experiences: Heritage & Culture Tour or Nature & Adventure Tour. Both options include comprehensive itineraries. Meals and entrance fees not included.',
        image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/d7/cb/5b.jpg',
        price: 'From RM 650',
        features: [
            { icon: 'fas fa-clock', title: 'Duration', description: '2 Days (18 hours total)' },
            { icon: 'fas fa-users', title: 'Group Size', description: 'Max 12 people (Van) / Max 6 people (MPV) / Max 4 people (Car)' },
            { icon: 'fas fa-star', title: 'Rating', description: '4.9/5 stars' },
            { icon: 'fas fa-car', title: 'Transport', description: 'Car: RM 650-750 | MPV: RM 850-950 | Van: RM 1100-1200' },
            { icon: 'fas fa-utensils', title: 'Meals', description: 'Meals not included' },
            { icon: 'fas fa-ticket-alt', title: 'Tickets', description: 'All entrance fees not included' }
        ],
        tourOptions: {
            'heritage': {
                title: 'Heritage & Culture Tour',
                price: { car: 650, mpv: 850, van: 1100 },
                description: 'Immerse yourself in Penang\'s rich heritage and cultural diversity with temples, museums, and historical sites.',
                itinerary: [
                    '09:00 AM – The Habitat (Walk along the canopy trail and discover native flora)',
                    '10:30 AM – Kek Lok Si Temple (Visit the largest Buddhist temple in Malaysia)',
                    '12:00 PM – Local Hawker Stalls (Taste authentic Penang dishes such as laksa and char kuey teow)',
                    '01:30 PM – Armenian Street (Explore colorful murals and heritage cafés)',
                    '02:30 PM – Chew Jetty (Walk through a traditional Chinese water village)',
                    '03:30 PM – Khoo Kongsi (Admire the intricate architecture of a Chinese clanhouse)',
                    '05:00 PM – Gurney Drive (Enjoy dinner at Penang\'s famous seafront hawker centre)',
                    '09:00 AM – Penang Hill (Ride the funicular train and enjoy sweeping views of George Town)',
                    '10:30 AM – Penang Peranakan Mansion (Explore the opulent mansion and learn about Peranakan culture)',
                    '12:00 PM – Fort Cornwallis (Visit the historical fort and learn about Penang\'s colonial past)',
                    '01:30 PM – Lunch at local restaurant (Traditional Malaysian cuisine)',
                    '02:30 PM – Penang State Museum (Discover Penang\'s history and cultural heritage)',
                    '03:30 PM – Kapitan Keling Mosque (Visit the oldest mosque in Penang)',
                    '04:30 PM – Sri Mahamariamman Temple (Explore the oldest Hindu temple in Penang)',
                    '05:30 PM – Little India (Experience the vibrant Indian community and shopping)',
                    '07:00 PM – Dinner at New Lane Hawker Centre (Famous local street food)'
                ],
                places: [
                    {
                        title: 'Penang Hill',
                        description: 'Ride the funicular train and enjoy sweeping views of George Town from the highest point in Penang.',
                        image: 'https://cdn.tatlerasia.com/tatlerasia/i/2021/11/11173230-123742590-500497978016363-4094686581571688722-n_cover_1080x810.jpg',
                        features: ['Funicular Train', 'Mountain Views', 'Included']
                    },
                    {
                        title: 'Kek Lok Si Temple',
                        description: 'Visit the largest Buddhist temple in Malaysia with stunning architecture and spiritual atmosphere.',
                        image: 'https://onpenang.com/wp-content/uploads/2024/01/Kek-Lok-Si-Temple-Penang.jpg',
                        features: ['Buddhist Temple', 'Cultural Experience', 'Architecture', 'Included']
                    },
                    {
                        title: 'Penang Peranakan Mansion',
                        description: 'Explore the opulent mansion and learn about the unique Peranakan culture and heritage.',
                        image: 'https://cdn.getyourguide.com/img/location/5ddd0df741421-small.jpeg/68.jpg',
                        features: ['Peranakan Culture', 'Historical Mansion', 'Heritage', 'Included']
                    },
                    {
                        title: 'Fort Cornwallis',
                        description: 'Visit the historical fort and learn about Penang\'s colonial past and maritime history.',
                        image: 'https://img2.penangpropertytalk.com/wp-content/uploads/2024/07/fortcornwallis-1.jpg',
                        features: ['Historical Fort', 'Colonial History', 'Maritime Heritage', 'Included']
                    },
                    {
                        title: 'Kapitan Keling Mosque',
                        description: 'Visit the oldest mosque in Penang with beautiful Islamic architecture and cultural significance.',
                        image: 'https://image-tc.galaxy.tf/wijpeg-1rqzzjgmvsgbi2acsptc15vr8/masjidkapitankelingmosque-1-a8e859.jpg',
                        features: ['Islamic Architecture', 'Cultural Heritage', 'Religious Site', 'Included']
                    },
                    {
                        title: 'Little India',
                        description: 'Experience the vibrant Indian community with colorful shops, temples, and authentic cuisine.',
                        image: 'https://d37rmf1ynyg9aw.cloudfront.net/fit-in/1280x1280/data/v4/resources/images/96c8b5c1-0f77-40b7-a862-92572c5c52ae.jpg',
                        features: ['Indian Culture', 'Shopping District', 'Authentic Cuisine', 'Included']
                    }
                ]
            },
            'nature': {
                title: 'Nature & Adventure Tour',
                price: { car: 750, mpv: 950, van: 1200 },
                description: 'Discover Penang\'s natural beauty and adventure activities with parks, beaches, and outdoor experiences.',
                itinerary: [
                    '09:00 AM – Entopia Butterfly Farm (Explore the magical world of butterflies and insects)',
                    '10:30 AM – Tropical Spice Garden (Discover exotic spices and tropical plants)',
                    '12:00 PM – Lunch at Batu Ferringhi (Enjoy fresh seafood and local dishes)',
                    '01:30 PM – Penang National Park (Visit Monkey Beach and lighthouse)',
                    '03:30 PM – Teluk Bahang Dam (Scenic views and photo opportunities)',
                    '05:00 PM – Floating Mosque (Visit the beautiful mosque on the water)',
                    '07:00 PM – Dinner at Batu Ferringhi Night Market (Experience local street food)',
                    '09:00 AM – Penang Hill (Morning hike and nature walk)',
                    '10:30 AM – The Habitat (Extended canopy walk and bird watching)',
                    '12:00 PM – Lunch at hill station (Mountain cuisine)',
                    '01:30 PM – Penang Botanic Gardens (Explore diverse plant collections)',
                    '03:30 PM – Batu Ferringhi Beach (Relaxation and water activities)',
                    '05:00 PM – Tropical Fruit Farm (Learn about local fruits and farming)',
                    '07:00 PM – Dinner at Gurney Drive (Seafood and local specialties)'
                ],
                places: [
                    {
                        title: 'Entopia Butterfly Farm',
                        description: 'Explore the magical world of butterflies and insects in this beautiful nature sanctuary.',
                        image: 'https://www.penang-traveltips.com/0/0-pics/entopia-by-penang-butterfly-farm.jpg',
                        features: ['Butterfly Sanctuary', 'Insect World', 'Nature Education', 'Included']
                    },
                    {
                        title: 'Penang National Park',
                        description: 'Visit Monkey Beach and lighthouse in this pristine national park setting.',
                        image: 'https://www.thelostpassport.com/wp-content/uploads/2020/08/Pantai-Keracut-Beach-Penang-National-Park.jpg',
                        features: ['Monkey Beach', 'Lighthouse', 'National Park', 'Included']
                    },
                    {
                        title: 'Tropicana Spice Gardens',
                        description: 'Explore diverse plant collections and enjoy the peaceful botanical environment.',
                        image: 'https://static.wixstatic.com/media/ed89ba_6242f3dbd73740f983a2627dd608bb4b~mv2.jpg/v1/fill/w_980,h_682,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ed89ba_6242f3dbd73740f983a2627dd608bb4b~mv2.jpg',
                        features: ['Botanical Gardens', 'Plant Collections', 'Nature Walk', 'Included']
                    },
                    {
                        title: 'Batu Ferringhi Beach',
                        description: 'Experience the vibrant Batu Ferringhi beach with delicious seafood and water sports',
                        image: 'https://travel2penang.org/wp-content/uploads/2024/09/ferringhibay03-1-1024x768.jpg',
                        features: ['Pristine Beaches', 'Water Activities', 'Beach Sports', 'Included']
                    },
                    {
                        title: 'Tropical Fruit Farm',
                        description: 'Learn about local fruits and farming practices in this educational farm setting.',
                        image: 'https://www.holidaygogogo.com/wp-content/uploads/2012/08/Penang-Tropical-Fruit-Farm-fruits.jpg',
                        features: ['Fruit Farming', 'Educational Tours', 'Local Produce', 'Included']
                    },
                    {
                        title: 'The Habitat',
                        description: 'Extended canopy walk and bird watching in this beautiful nature reserve.',
                        image: 'https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit1600900gsm/eventThirdParty/2023/11/24/97d30375-bb0f-4400-8a0d-710c78f898e6-1700763501366-48d8c366739bd9ce80a91ed7adb735ce.jpg',
                        features: ['Canopy Walk', 'Bird Watching', 'Nature Reserve', 'Included']
                    }
                ]
            }
        }
    },
    
    'Package K': {
        title: 'Customized Penang Package',
        description: 'Create your perfect trip with our flexible customized package. Choose your number of days, vehicle type, and select your favorite places from our destination list. Build your dream itinerary and let us handle the rest!',
        image: 'https://mypenang.gov.my/uploads/directory/1405/cover/PENANG-BRIDGE.jpg',
        price: 'From RM 30/hour',
        features: [
            { icon: 'fas fa-calendar-alt', title: 'Duration', description: '1-7 days or more (Flexible)' },
            { icon: 'fas fa-users', title: 'Group Size', description: 'Max 12 people (Van) / Max 4 people (Car)' },
            { icon: 'fas fa-star', title: 'Rating', description: '5.0/5 stars' },
            { icon: 'fas fa-car', title: 'Transport', description: 'Car: RM 30/hour | Van: RM 60/hour' },
            { icon: 'fas fa-map-marked-alt', title: 'Destinations', description: 'Choose from our complete destination list' },
            { icon: 'fas fa-heart', title: 'Customization', description: 'Build your own itinerary' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'How to Book',
                activities: [
                    'Start by choosing the number of days for your trip.',
                    'Pick your preferred vehicle (Car or Van – price calculated per hour).',
                    'Browse our list of attractions and click to add your favourites.',
                    'Go to My Favourites to review and finalize your itinerary.',
                    'Copy your final list of chosen places into the description field at checkout.',
                    'Submit your customized itinerary. Our team will review it and contact you within 24 hours to guide and finalize your booking.'
                ]
            }
        ],
        customOptions: {
            days: [1, 2, 3, 4, 5, 6, 7],
            transport: {
                car: { price: 30, capacity: 4, name: 'Car' },
                van: { price: 60, capacity: 12, name: 'Van' }
            }
        }
    }
};

// Packages Functionality
function initializePackages() {
    const packageCards = document.querySelectorAll('.package-card');
    const packageButtons = document.querySelectorAll('.package-btn');
    const packageDetailsModal = document.getElementById('packageDetailsModal');
    const packageBookBtn = document.getElementById('packageBookBtn');
    
    // Add click event listeners to package cards
    packageCards.forEach(card => {
        card.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            showPackageDetails(packageName);
        });
    });
    
    // Add click event listeners to package buttons
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click
            const packageName = this.getAttribute('data-package');
            showPackageDetails(packageName);
        });
    });
    
    // Close modal functionality
    const closeButtons = packageDetailsModal.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            packageDetailsModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    packageDetailsModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
    
    // Book package functionality
    packageBookBtn.addEventListener('click', function() {
        const selectedPackage = this.getAttribute('data-package');
        packageDetailsModal.style.display = 'none';
        
        // Check if this is a different package than the currently selected one
        const currentSelectedPackage = window.currentSelectedPackage;
        const isDifferentPackage = currentSelectedPackage !== null && currentSelectedPackage !== selectedPackage;
        
        // Generate auto-description only for Package K (Customized Package)
        let autoDescription = '';
        if (selectedPackage === 'Package K') {
            autoDescription = window.customizedPackageDescription || '';
            // Store the description for the booking form
            window.autoGeneratedDescription = autoDescription;
        } else {
            // Clear auto-generated description for other packages
            window.autoGeneratedDescription = '';
        }
        
        // Navigate to bookings page with pre-filled package
        navigateToPage('bookings');
        
        // Pre-fill the tour type with the selected package
            setTimeout(() => {
                const tourTypeRadio = document.querySelector(`input[name="tourType"][value="${selectedPackage}"]`);
                const descriptionOptional = document.getElementById('descriptionOptional');
                if (tourTypeRadio) {
                    tourTypeRadio.checked = true;
                    tourTypeRadio.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (isDifferentPackage && descriptionOptional) {
                        descriptionOptional.value = '';
                        showNotification('Description cleared for new package', 'info');
                    }
                    tourTypeRadio.dispatchEvent(new Event('change'));
                }
                if (descriptionOptional && window.autoGeneratedDescription) descriptionOptional.value = window.autoGeneratedDescription;
                window.currentSelectedPackage = selectedPackage;
            }, 500);
    });
    
    // Transport toggle functionality for all packages
    const transportRadios = document.querySelectorAll('input[name="transport"]');
    transportRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const currentPackage = document.getElementById('packageBookBtn').getAttribute('data-package');
                // Track the selected transportation globally
                window.selectedTransport = this.value;
                updatePackagePrice(currentPackage, this.value);
            }
        });
    });
    
    // Route selection functionality for Airport Transfer
    const routeRadios = document.querySelectorAll('input[name="route"]');
    routeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const currentPackage = document.getElementById('packageBookBtn').getAttribute('data-package');
                const selectedTransport = document.querySelector('input[name="transport"]:checked');
                if (selectedTransport) {
                    updatePackagePrice(currentPackage, selectedTransport.value);
                }
            }
        });
    });
    
    // Menu tab functionality is now handled by initializePackageMenuTabs() for all packages
}

// Cameron Highlands Places Data
const cameronPlacesData = [
    {
        id: 'tea-plantation',
        title: 'Boh Tea Plantation',
        description: 'Visit Malaysia\'s largest tea plantation and learn about the tea-making process. Enjoy breathtaking views of rolling green hills and sample fresh tea.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Tea Factory Tour', 'Scenic Views', 'Tea Tasting', 'Gift Shop', 'Included'],
        mapLink: 'https://maps.google.com/?q=BOH+Tea+Plantation+Cameron+Highlands'
    },
    {
        id: 'sam-poh-temple',
        title: 'Sam Poh Temple',
        description: 'Visit the beautiful Sam Poh Temple and experience the spiritual atmosphere of this historic temple.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Temple Visit', 'Cultural Experience', 'Spiritual', 'Included'],
        mapLink: 'https://maps.google.com/?q=Sam+Poh+Temple+Cameron+Highlands'
    },
    {
        id: 'mossy-forest',
        title: 'Mossy Forest',
        description: 'Explore the mystical mossy forest with its ancient trees covered in moss and ferns. Experience the cool, misty atmosphere and unique ecosystem.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Nature Trail', 'Mossy Trees', 'Cool Climate', 'Photography', 'Included'],
        mapLink: 'https://maps.google.com/?q=Mossy+Forest+Cameron+Highlands'
    },
    {
        id: 'strawberry-farm',
        title: 'Strawberry Farms',
        description: 'Experience strawberry picking and enjoy fresh strawberries with cream. Visit the tea plantation and learn about both tea and strawberry cultivation.',
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Strawberry Picking', 'Fresh Strawberries', 'Educational Tour', 'Included'],
        mapLink: 'https://maps.google.com/?q=Strawberry+Farms+Cameron+Highlands'
    },
    {
        id: 'lavender-garden',
        title: 'Cameron Lavender Garden',
        description: 'Stroll through beautiful lavender fields and enjoy the fragrant aroma. Visit the garden shop and learn about lavender cultivation.',
        image: 'https://images.unsplash.com/photo-1528722828814-77b9b83a6b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Lavender Fields', 'Garden Shop', 'Fragrant Aroma', 'Photo Opportunities', 'Included'],
        mapLink: 'https://maps.google.com/?q=Lavender+Garden+Cameron+Highlands'
    },
    {
        id: 'flora-park',
        title: 'Flora Park',
        description: 'Explore the beautiful Flora Park with its diverse collection of flowers and plants.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Flower Gardens', 'Nature Walk', 'Photography', 'Included'],
        mapLink: 'https://maps.google.com/?q=Flora+Park+Cameron+Highlands'
    },
    {
        id: 'night-market',
        title: 'Brinchang Night Market',
        description: 'Experience the vibrant night market with local food, souvenirs, and entertainment (Friday & Saturday only).',
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Local Food', 'Shopping', 'Entertainment', 'Included'],
        mapLink: 'https://maps.google.com/?q=Brinchang+Night+Market+Cameron+Highlands'
    },
    {
        id: 'sheep-sanctuary',
        title: 'The Sheep Sanctuary',
        description: 'Visit the sheep sanctuary and interact with friendly sheep. Learn about sheep farming and enjoy the peaceful countryside setting.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Sheep Interaction', 'Farm Tour', 'Countryside Views', 'Included'],
        mapLink: 'https://maps.google.com/?q=Sheep+Sanctuary+Cameron+Highlands'
    },
    {
        id: 'bee-farms',
        title: 'Bee Farms',
        description: 'Learn about beekeeping and honey production. Sample different types of honey and learn about the importance of bees in agriculture.',
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Beekeeping Tour', 'Honey Sampling', 'Educational', 'Included'],
        mapLink: 'https://maps.google.com/?q=Bee+Farms+Cameron+Highlands'
    },
    {
        id: 'hiking-trails',
        title: 'Hiking (Light Trails)',
        description: 'Easy hiking trails suitable for all ages and fitness levels. Enjoy gentle walks through the beautiful highland scenery.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Easy Hiking', 'Nature Walk', 'Family Friendly', 'Included'],
        mapLink: 'https://maps.google.com/?q=Hiking+Trails+Cameron+Highlands'
    },
    {
        id: 'cactus-valley',
        title: 'Cactus Valley',
        description: 'Explore a vast collection of cacti and succulents from around the world. Enjoy the unique desert-like landscape in the highlands.',
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Cactus Collection', 'Succulents', 'Desert Landscape', 'Plant Shop', 'Not Included'],
        mapLink: 'https://maps.google.com/?q=Cactus+Valley+Cameron+Highlands'
    },
    {
        id: 'additional-farms',
        title: 'Additional Farms & Gardens',
        description: 'Small flower and vegetable farms scattered across Brinchang and Tanah Rata areas. Experience local farming culture.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Flower Farms', 'Vegetable Farms', 'Local Culture', 'Not Included'],
        mapLink: 'https://maps.google.com/?q=Additional+Farms+Cameron+Highlands'
    },
    {
        id: 'long-hiking',
        title: 'Long Hiking Trails',
        description: 'Advanced hiking trails like Gunung Brinchang for experienced hikers seeking challenging treks.',
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        features: ['Advanced Hiking', 'Mountain Trails', 'Challenging', 'Not Included'],
        mapLink: 'https://maps.google.com/?q=Long+Hiking+Trails+Cameron+Highlands'
    }
];

// Initialize Cameron Highlands Places
function initializeCameronPlaces() {
    const cameronPlacesGrid = document.getElementById('cameronPlacesGrid');
    if (!cameronPlacesGrid) return;
    
    cameronPlacesGrid.innerHTML = '';
    
    cameronPlacesData.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.className = 'cameron-place-card';
        placeCard.innerHTML = `
            <div class="cameron-place-image">
                <img src="${place.image}" alt="${place.title}">
                <div class="cameron-place-overlay">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
            </div>
            <div class="cameron-place-content">
                <h3 class="cameron-place-title">${place.title}</h3>
                <p class="cameron-place-description">${place.description}</p>
                <div class="cameron-place-features">
                    ${place.features.map(feature => {
                        const isNotIncluded = feature === 'Not Included';
                        return `<span class="cameron-place-feature ${isNotIncluded ? 'not-included' : ''}">${feature}</span>`;
                    }).join('')}
                </div>
                <div class="cameron-place-actions">
                    <a href="${place.mapLink}" target="_blank" class="cameron-place-btn">
                        <i class="fas fa-map-marker-alt"></i>
                        View on Map
                    </a>
                </div>
            </div>
        `;
        
        cameronPlacesGrid.appendChild(placeCard);
    });
}

// Initialize Cameron Highlands Places Preview (3 cards for package modal)
function initializeCameronPlacesPreview() {
    const placesPreviewGrid = document.querySelector('.places-preview-grid');
    if (!placesPreviewGrid) return;
    
    placesPreviewGrid.innerHTML = '';
    
    // Use the places from packageData['Package C'] instead of cameronPlacesData
    const package = packageData['Package C'];
    if (!package || !package.places) return;
    
    // Show all places for Cameron Highlands
    package.places.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.className = 'place-preview-card';
        placeCard.innerHTML = `
            <div class="place-preview-image">
                <img src="${place.image}" alt="${place.title}">
            </div>
            <div class="place-preview-content">
                <h4 class="place-preview-title">${place.title}</h4>
                <p class="place-preview-description">${place.description}</p>
                <div class="place-preview-features">
                    ${place.features.map(feature => {
                        const isNotIncluded = feature === 'Not Included';
                        return `<span class="place-preview-feature ${isNotIncluded ? 'not-included' : ''}">${feature}</span>`;
                    }).join('')}
                </div>
            </div>
        `;
        
        placesPreviewGrid.appendChild(placeCard);
    });
    
    // Update itinerary content for Cameron Highlands
    updatePackageItinerary('Package C');
}

// Initialize Package Places Preview for all packages
function initializePackagePlacesPreview(packageName) {
    const placesPreviewGrid = document.querySelector('.places-preview-grid');
    const itineraryTab = document.getElementById('itineraryTab');
    
    if (!placesPreviewGrid || !itineraryTab) return;
    
    const package = packageData[packageName];
    if (!package) return;
    
    // Handle packages with tour options
    if ((packageName === 'Package B' || packageName === 'Package I') && package.tourOptions) {
        // Initialize with first option by default
        const firstOption = Object.keys(package.tourOptions)[0];
        updatePackageWithTourOptions(packageName, firstOption);
        return;
    }
    
    // Handle other packages with direct places/itinerary
    if (!package.places) return;
    
    // Update places preview
    placesPreviewGrid.innerHTML = '';
    
    package.places.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.className = 'place-preview-card';
        placeCard.innerHTML = `
            <div class="place-preview-image">
                <img src="${place.image}" alt="${place.title}">
            </div>
            <div class="place-preview-content">
                <h4 class="place-preview-title">${place.title}</h4>
                <p class="place-preview-description">${place.description}</p>
                <div class="place-preview-features">
                    ${place.features.map(feature => {
                        const isNotIncluded = feature === 'Not Included';
                        return `<span class="place-preview-feature ${isNotIncluded ? 'not-included' : ''}">${feature}</span>`;
                    }).join('')}
                </div>
            </div>
        `;
        
        placesPreviewGrid.appendChild(placeCard);
    });
    
    // Update itinerary content for all packages except Package K
    if (packageName !== 'Package K') {
        updatePackageItinerary(packageName);
    }
    
    // Ensure the places tab is properly initialized
    console.log(`Package ${packageName} places initialized:`, package.places.length, 'places');
}

// Function to initialize tour options section
function initializeTourOptionsSection(packageName) {
    const tourOptionsSection = document.getElementById('tourOptionsSection');
    const package = packageData[packageName];
    
    if (!package || !package.tourOptions) return;
    
    // Update the tour option buttons based on the package
    const tourOptionButtons = tourOptionsSection.querySelectorAll('.tour-option-btn');
    const tourOptions = Object.keys(package.tourOptions);
    
    // Update button content for the first two options
    if (tourOptionButtons.length >= 2 && tourOptions.length >= 2) {
        const option1 = package.tourOptions[tourOptions[0]];
        const option2 = package.tourOptions[tourOptions[1]];
        
        // Update first button
        tourOptionButtons[0].innerHTML = `
            <i class="fas fa-${tourOptions[0] === 'culture' || tourOptions[0] === 'heritage' || tourOptions[0] === 'complete' ? 'landmark' : 'leaf'}"></i>
            ${option1.title}
        `;
        tourOptionButtons[0].setAttribute('data-option', tourOptions[0]);
        
        // Update second button
        tourOptionButtons[1].innerHTML = `
            <i class="fas fa-${tourOptions[1] === 'nature' || tourOptions[1] === 'ultimate' ? 'leaf' : 'landmark'}"></i>
            ${option2.title}
        `;
        tourOptionButtons[1].setAttribute('data-option', tourOptions[1]);
    }
    
    // Add event listeners for tour option buttons
    tourOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tourOptionButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update places and itinerary based on selected option
            const selectedOption = this.getAttribute('data-option');
            updatePackageWithTourOptions(packageName, selectedOption);
            
            // Update price if transport is already selected
            const selectedTransport = document.querySelector('input[name="transport"]:checked');
            if (selectedTransport) {
                updatePackagePriceWithTourOptions(packageName, selectedOption, selectedTransport.value);
            }
        });
    });
    
    // Initialize with first option by default
    const firstOption = tourOptions[0];
    updatePackageWithTourOptions(packageName, firstOption);
}

// Function to update package content based on selected tour option
function updatePackageWithTourOptions(packageName, selectedOption) {
    const package = packageData[packageName];
    const tourOption = package.tourOptions[selectedOption];
    
    if (!tourOption) return;
    
    // Track the selected tour option globally
    window.selectedTourOption = selectedOption;
    
    // Update places preview
    const placesPreviewGrid = document.querySelector('.places-preview-grid');
    
    if (!placesPreviewGrid) {
        console.error('Places preview grid not found');
        return;
    }
    
    // Clear existing places
    placesPreviewGrid.innerHTML = '';
    
    // Add places for selected option
    tourOption.places.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.className = 'place-preview-card';
        placeCard.innerHTML = `
            <div class="place-preview-image">
                <img src="${place.image}" alt="${place.title}">
            </div>
            <div class="place-preview-content">
                <h4 class="place-preview-title">${place.title}</h4>
                <p class="place-preview-description">${place.description}</p>
                <div class="place-preview-features">
                    ${place.features.map(feature => {
                        const isNotIncluded = feature === 'Not Included';
                        return `<span class="place-preview-feature ${isNotIncluded ? 'not-included' : ''}">${feature}</span>`;
                    }).join('')}
                </div>
            </div>
        `;
        
        placesPreviewGrid.appendChild(placeCard);
    });
    
    // Update itinerary content
    updatePackageItineraryWithTourOptions(packageName, selectedOption);
    
    // Update pricing based on selected option
    const currentTransport = document.querySelector('input[name="transport"]:checked');
    if (currentTransport) {
        updatePackagePriceWithTourOptions(packageName, selectedOption, currentTransport.value);
    } else {
        updatePackagePriceWithTourOptions(packageName, selectedOption, 'car'); // default to car
    }
    
    console.log(`Tour option ${selectedOption} updated for ${packageName}:`, tourOption.places.length, 'places');
}

// Function to update package itinerary based on selected tour option
function updatePackageItineraryWithTourOptions(packageName, selectedOption) {
    const package = packageData[packageName];
    const tourOption = package.tourOptions[selectedOption];
    
    if (!tourOption) return;
    
    const itineraryTab = document.getElementById('itineraryTab');
    if (!itineraryTab) return;
    
    const itineraryContent = itineraryTab.querySelector('.package-itinerary');
    if (!itineraryContent) return;
    
    // Update title
    const title = itineraryContent.querySelector('h3');
    if (title) {
        title.textContent = tourOption.title;
    }
    
    // Update itinerary days
    const itineraryDays = itineraryContent.querySelector('.itinerary-days');
    if (itineraryDays) {
        itineraryDays.innerHTML = '';
        
        // Split itinerary into days based on package
        const activitiesPerDay = packageName === 'Package B' ? 8 : packageName === 'Package I' ? 8 : 7;
        const totalActivities = tourOption.itinerary.length;
        const numberOfDays = Math.ceil(totalActivities / activitiesPerDay);
        
        for (let day = 1; day <= numberOfDays; day++) {
            const startIndex = (day - 1) * activitiesPerDay;
            const endIndex = Math.min(startIndex + activitiesPerDay, totalActivities);
            const dayActivities = tourOption.itinerary.slice(startIndex, endIndex);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'itinerary-day';
            dayElement.innerHTML = `
                <h4><i class="fas fa-sun"></i> Day ${day}</h4>
                <ul>
                    ${dayActivities.map(activity => `<li>${activity}</li>`).join('')}
                </ul>
            `;
            itineraryDays.appendChild(dayElement);
        }
    }
}

// Update package itinerary content
function updatePackageItinerary(packageName) {
    const itineraryTab = document.getElementById('itineraryTab');
    if (!itineraryTab) return;
    
    const package = packageData[packageName];
    if (!package || !package.itinerary) return;
    
    // Create the itinerary structure if it doesn't exist
    let itineraryContent = itineraryTab.querySelector('.package-itinerary');
    if (!itineraryContent) {
        itineraryTab.innerHTML = `
            <div class="package-itinerary">
                <h3>${package.itinerary.length}-Day ${package.title} Itinerary</h3>
                <div class="itinerary-days"></div>
            </div>
        `;
        itineraryContent = itineraryTab.querySelector('.package-itinerary');
    }
    
    // Update title
    const title = itineraryContent.querySelector('h3');
    if (title) {
        title.textContent = `${package.itinerary.length}-Day ${package.title} Itinerary`;
    }
    
    // Update itinerary days
    const itineraryDays = itineraryContent.querySelector('.itinerary-days');
    if (itineraryDays) {
        itineraryDays.innerHTML = '';
        
        package.itinerary.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'itinerary-day';
            dayElement.innerHTML = `
                <h4><i class="fas fa-sun"></i> Day ${day.day}</h4>
                <ul>
                    ${day.activities.map(activity => `<li>${activity}</li>`).join('')}
                </ul>
            `;
            itineraryDays.appendChild(dayElement);
        });
    }
}

function showPackageDetails(packageName) {
    const package = packageData[packageName];
    if (!package) return;
    
    const modal = document.getElementById('packageDetailsModal');
    const modalImage = document.getElementById('packageModalImage');
    const modalTitle = document.getElementById('packageModalTitle');
    const modalDescription = document.getElementById('packageModalDescription');
    const modalPrice = document.getElementById('packageModalPrice');
    const modalFeatures = document.getElementById('packageModalFeatures');
    const packageBookBtn = document.getElementById('packageBookBtn');
    const transportToggle = document.getElementById('transportToggle');
    
    // Set modal content
    modalImage.src = package.image;
    modalImage.alt = package.title;
    modalTitle.textContent = package.title;
    modalDescription.textContent = package.description;
    modalPrice.textContent = package.price;
    packageBookBtn.setAttribute('data-package', packageName);
    
    // Show/hide transport toggle and menu bar for all packages
    if (packageName === 'Package K') {
        transportToggle.style.display = 'none'; // Customized package doesn't need transport toggle
    } else {
        transportToggle.style.display = 'block';
    }
    
    // Show/hide tour options section for packages with tour options
    const tourOptionsSection = document.getElementById('tourOptionsSection');
    if (packageName === 'Package B' || packageName === 'Package I') {
        tourOptionsSection.style.display = 'block';
        initializeTourOptionsSection(packageName);
        
        // Set default transportation to car if none selected
        const selectedTransport = document.querySelector('input[name="transport"]:checked');
        if (!selectedTransport) {
            const carRadio = document.querySelector('input[name="transport"][value="car"]');
            if (carRadio) {
                carRadio.checked = true;
                window.selectedTransport = 'car';
            }
        }
    } else {
        tourOptionsSection.style.display = 'none';
    }
    
    // Hide menu bar for Airport Transfer (Package G) only
    if (packageName === 'Package G') {
        document.getElementById('packageMenuBar').style.display = 'none';
    } else {
        document.getElementById('packageMenuBar').style.display = 'block';
    }
    
    // Show/hide route selection for Airport Transfer and Water Activities
    const routeSelection = document.getElementById('routeSelection');
    if (packageName === 'Package G') {
        routeSelection.style.display = 'block';
        configureAirportTransferOptions();
    } else if (packageName === 'Package F') {
        routeSelection.style.display = 'block';
        configureWaterActivitiesOptions();
    } else {
        routeSelection.style.display = 'none';
    }
    
    // Configure transport options based on package
    configureTransportOptions(packageName);
    
    // Set initial price based on car selection
    updatePackagePrice(packageName, 'car');
    
    if (currentPackage === 'Package K' && packageName !== 'Package K') {
        updateDescriptionAutoDisplay('');
        var opt = document.getElementById('descriptionOptional');
        if (opt) opt.value = '';
    }
    
    // Update current package tracking
    currentPackage = packageName;
    
    // Initialize places preview for current package
    if (packageName === 'Package C') {
        initializeCameronPlacesPreview();
    } else if (packageName === 'Package K') {
        // For Package K, we need to wait a bit for the modal to be fully rendered
        setTimeout(() => {
            console.log('Initializing Package K custom options...');
            initializeCustomizedPackageOptions();
        }, 200);
    } else {
        // Reset interface for non-Package K packages
        resetPackageInterface(packageName);
        // Ensure places are initialized for all packages
        setTimeout(() => {
            initializePackagePlacesPreview(packageName);
        }, 100);
    }
    
    // Populate features
    modalFeatures.innerHTML = '';
    package.features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'package-detail-feature';
        featureElement.innerHTML = `
            <i class="${feature.icon}"></i>
            <h4>${feature.title}</h4>
            <p>${feature.description}</p>
        `;
        modalFeatures.appendChild(featureElement);
    });
    
    // Initialize menu tab functionality for all packages
    initializePackageMenuTabs();
    
    // Customize menu bar for Water Activities package (after tab initialization)
    if (packageName === 'Package F') {
        customizeWaterActivitiesMenuBar();
        // Reset to itinerary tab after customization
        resetToItineraryTab();
    }
    
    // Show important notice about what's not included
    showPackageExclusionsNotice(packageName);
    
    // Show modal
    modal.style.display = 'block';
    
    // Add entrance animation
    gsap.fromTo('.package-details-content', {
        opacity: 0,
        y: 50,
        scale: 0.9
    }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });
}

// Global variable to track current package
let currentPackage = null;

// Package pricing configuration
const packagePricing = {
    'Package A': { car: 299, van: 599, mpv: 449 },
    'Package B': { car: 350, van: 570, mpv: 450 },
    'Package C': { car: 500, van: 900, mpv: 700 },
    'Package D': { car: 1299, van: 1999, mpv: 1599 },
    'Package E': { car: 300, van: 600, mpv: 450 },
    'Package F': { car: 35, van: 35, mpv: 35 },
    'Package G': { car: 90, van: 120, mpv: 160 },
    'Package I': { car: 650, van: 1100, mpv: 850 },

};

// Water Activities Pricing for Package F
const waterActivitiesPricing = {
    'jet-ski-single': { price: 100, capacity: 1, name: 'Jet Ski (Single Rider)' },
    'jet-ski-double': { price: 200, capacity: 2, name: 'Jet Ski (Double Rider)' },
    'parasailing-single': { price: 130, capacity: 1, name: 'Parasailing (Single)' },
    'parasailing-double': { price: 260, capacity: 2, name: 'Parasailing (Double)' },
    'banana-boat': { price: 35, capacity: 4, name: 'Banana Boat Ride', perPerson: true },
    'boat-ride': { price: 180, capacity: 2, name: 'Boat Ride', perPerson: true },
    'boat-fishing': { price: 275, capacity: 2, name: 'Boat Ride + Fishing', perPerson: true }
};

// Function to configure transport options based on package
function configureTransportOptions(packageName) {
    const mpvOption = document.getElementById('mpvOption');
    const carPrice = document.getElementById('carPrice');
    const mpvPrice = document.getElementById('mpvPrice');
    const vanPrice = document.getElementById('vanPrice');
    
    const pricing = packagePricing[packageName];
    if (!pricing) return;
    
    // Update prices
    carPrice.textContent = `RM ${pricing.car} (max 4 people)`;
    vanPrice.textContent = `RM ${pricing.van} (max 12 people)`;
    
    // Show/hide MPV option based on package
    if (packageName === 'Package C' || packageName === 'Package D' || packageName === 'Package F') {
        mpvOption.style.display = 'block';
        mpvPrice.textContent = `RM ${pricing.mpv} (max 6 people)`;
    } else {
        mpvOption.style.display = 'none';
    }
}

// Function to configure airport transfer options
function configureAirportTransferOptions() {
    const waterActivitiesSelection = document.getElementById('waterActivitiesSelection');
    const routeOptions = document.querySelector('.route-options');
    const mpvOption = document.getElementById('mpvOption');
    
    // Show route options and hide water activities selection
    if (waterActivitiesSelection) waterActivitiesSelection.style.display = 'none';
    if (routeOptions) routeOptions.style.display = 'block';
    
    // Show MPV option for airport transfer
    if (mpvOption) mpvOption.style.display = 'block';
    
    // Update initial prices based on default route (Penang Hotel to Airport)
    updateAirportTransferPrice('penang-hotel-to-airport', 'car');
    
    // Add event listeners for route selection
    const routeInputs = document.querySelectorAll('input[name="route"]');
    routeInputs.forEach(input => {
        input.addEventListener('change', function() {
            const selectedTransport = document.querySelector('input[name="transport"]:checked');
            if (selectedTransport) {
                updateAirportTransferPrice(this.value, selectedTransport.value);
            }
        });
    });
    
    // Add event listeners for transport selection
    const transportInputs = document.querySelectorAll('input[name="transport"]');
    transportInputs.forEach(input => {
        input.addEventListener('change', function() {
            const selectedRoute = document.querySelector('input[name="route"]:checked');
            if (selectedRoute) {
                updateAirportTransferPrice(selectedRoute.value, this.value);
            }
        });
    });
}

// Function to show package exclusions notice
function showPackageExclusionsNotice(packageName) {
    // Don't show for Airport Transfer package as it's just transport
    if (packageName === 'Package G') return;
    
    // Create the notice content based on package type
    let noticeContent = '';
    
    if (packageName === 'Package C') {
        // Cameron Highlands - 3D2N package
        noticeContent = `
            <div class="package-exclusions-notice">
                <div class="notice-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Important Notice</h4>
                </div>
                <div class="notice-content">
                    <p><strong>The following are NOT included in this package unless specifically requested:</strong></p>
                    <ul>
                        <li>🏨 <strong>Hotel Accommodation</strong> - Can be arranged upon request</li>
                        <li>🎫 <strong>Entry Tickets</strong> - Mossy Forest, Lavender Garden, Flora Park, Sheep Sanctuary, etc.</li>
                        <li>🍽️ <strong>Meals & Food</strong> - Breakfast, lunch, dinner (self-arrangement or add-on)</li>
                        <li>🚠 <strong>Optional Activities</strong> - Additional tours, spa treatments, etc.</li>
                    </ul>
                    <p><em>Please contact us if you need any of these services included in your package.</em></p>
                </div>
                <button class="notice-close-btn" onclick="closePackageExclusionsNotice()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    } else if (packageName === 'Package B') {
        // Penang 1-Day Tour package
        noticeContent = `
            <div class="package-exclusions-notice">
                <div class="notice-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Important Notice</h4>
                </div>
                <div class="notice-content">
                    <p><strong>The following are NOT included in this package unless specifically requested:</strong></p>
                    <ul>
                        <li>🎫 <strong>Optional Entry Tickets</strong> - Additional attractions not in itinerary</li>
                        <li>🍽️ <strong>Extra Meals</strong> - Breakfast, snacks, beverages outside included meals</li>
                        <li>🛍️ <strong>Shopping Expenses</strong> - Personal purchases, souvenirs</li>
                        <li>📸 <strong>Photography Services</strong> - Professional photos</li>
                    </ul>
                    <p><em>Please contact us if you need any of these services included in your package.</em></p>
                </div>
                <button class="notice-close-btn" onclick="closePackageExclusionsNotice()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    } else if (packageName === 'Package E') {
        // Bukit Merah package
        noticeContent = `
            <div class="package-exclusions-notice">
                <div class="notice-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Important Notice</h4>
                </div>
                <div class="notice-content">
                    <p><strong>The following are NOT included in this package unless specifically requested:</strong></p>
                    <ul>
                        <li>🎫 <strong>Entry Tickets</strong> - Orang Utan Island, Waterpark, Eco Park</li>
                        <li>🍽️ <strong>Meals & Food</strong> - Lunch, snacks, beverages</li>
                        <li>🏊‍♀️ <strong>Water Activities</strong> - Additional water sports</li>
                    </ul>
                    <p><em>Please contact us if you need any of these services included in your package.</em></p>
                </div>
                <button class="notice-close-btn" onclick="closePackageExclusionsNotice()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    } else if (packageName === 'Package D') {
        // Genting Highlands package
        noticeContent = `
            <div class="package-exclusions-notice">
                <div class="notice-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Important Notice</h4>
                </div>
                <div class="notice-content">
                    <p><strong>The following are NOT included in this package unless specifically requested:</strong></p>
                    <ul>
                        <li>🏨 <strong>Hotel Accommodation</strong> - Can be arranged upon request</li>
                        <li>🎫 <strong>Theme Park Tickets</strong> - Genting SkyWorlds, Skytropolis entrance fees</li>
                        <li>🍽️ <strong>Meals & Food</strong> - Breakfast, lunch, dinner (self-arrangement or add-on)</li>
                        <li>🎰 <strong>Casino Activities</strong> - Gaming chips, entertainment shows</li>
                        <li>🛍️ <strong>Shopping Expenses</strong> - Personal purchases, souvenirs</li>
                    </ul>
                    <p><em>Please contact us if you need any of these services included in your package.</em></p>
                </div>
                <button class="notice-close-btn" onclick="closePackageExclusionsNotice()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

    } else if (packageName === 'Package F') {
        // Water Activities package
        noticeContent = `
            <div class="package-exclusions-notice">
                <div class="notice-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Important Notice</h4>
                </div>
                <div class="notice-content">
                    <p><strong>The following are NOT included in this package unless specifically requested:</strong></p>
                    <ul>
                        <li>🏨 <strong>Hotel Accommodation</strong> - Can be arranged upon request</li>
                        <li>🍽️ <strong>Meals & Food</strong> - Lunch, snacks, beverages</li>
                        <li>🏖️ <strong>Beach Equipment</strong> - Towels, umbrellas, chairs</li>
                        <li>📸 <strong>Photography Services</strong> - Professional photos</li>
                    </ul>
                    <p><em>Please contact us if you need any of these services included in your package.</em></p>
                </div>
                <button class="notice-close-btn" onclick="closePackageExclusionsNotice()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    } else {
        // General notice for other packages
        noticeContent = `
            <div class="package-exclusions-notice">
                <div class="notice-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Important Notice</h4>
                </div>
                <div class="notice-content">
                    <p><strong>The following are NOT included in this package unless specifically requested:</strong></p>
                    <ul>
                        <li>🎫 <strong>Entry Tickets</strong> - Attraction entrance fees</li>
                        <li>🍽️ <strong>Meals & Food</strong> - Lunch, snacks, beverages</li>
                        <li>🏨 <strong>Hotel Accommodation</strong> - Can be arranged upon request</li>
                        <li>🎁 <strong>Personal Expenses</strong> - Shopping, souvenirs, tips</li>
                    </ul>
                    <p><em>Please contact us if you need any of these services included in your package.</em></p>
                </div>
                <button class="notice-close-btn" onclick="closePackageExclusionsNotice()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }
    
    // Create and show the notice
    const noticeContainer = document.createElement('div');
    noticeContainer.className = 'package-exclusions-overlay';
    noticeContainer.innerHTML = noticeContent;
    document.body.appendChild(noticeContainer);
    
    // Add entrance animation
    gsap.fromTo('.package-exclusions-notice', {
        opacity: 0,
        scale: 0.8,
        y: -50
    }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });
}

// Function to close package exclusions notice
function closePackageExclusionsNotice() {
    const overlay = document.querySelector('.package-exclusions-overlay');
    if (overlay) {
        gsap.to('.package-exclusions-notice', {
            opacity: 0,
            scale: 0.8,
            y: -50,
            duration: 0.3,
            onComplete: () => {
                overlay.remove();
            }
        });
    }
}

// Function to reset to itinerary tab
function resetToItineraryTab() {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Set "Itinerary" tab as active by default
    const itineraryTab = document.querySelector('.menu-tab[data-tab="itinerary"]');
    const itineraryContent = document.getElementById('itineraryTab');
    if (itineraryTab && itineraryContent) {
        itineraryTab.classList.add('active');
        itineraryContent.classList.add('active');
    }
}

// Function to initialize menu tab functionality for all packages
function initializePackageMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Remove existing event listeners to prevent duplicates
    menuTabs.forEach(tab => {
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);
    });
    
    // Reset tab state to show "Itinerary" tab by default
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Set "Itinerary" tab as active by default
    const itineraryTab = document.querySelector('.menu-tab[data-tab="itinerary"]');
    const itineraryContent = document.getElementById('itineraryTab');
    if (itineraryTab && itineraryContent) {
        itineraryTab.classList.add('active');
        itineraryContent.classList.add('active');
    }
    
    // Add event listeners to the new elements
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab + 'Tab');
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Debug: Check if places tab is clicked and has content
                if (targetTab === 'places') {
                    const placesGrid = targetContent.querySelector('.places-preview-grid');
                    if (placesGrid) {
                        console.log('Places tab clicked. Places count:', placesGrid.children.length);
                    }
                }
            }
        });
    });
}

// Function to configure water activities options
function configureWaterActivitiesOptions() {
    const modalPrice = document.getElementById('packageModalPrice');
    const routeSelect = document.getElementById('routeSelect');
    const vehicleSelect = document.getElementById('vehicleSelect');
    const waterActivitiesSelection = document.getElementById('waterActivitiesSelection');
    const routeOptions = document.querySelector('.route-options');
    
    // Show water activities selection and hide route options
    if (waterActivitiesSelection) waterActivitiesSelection.style.display = 'block';
    if (routeOptions) routeOptions.style.display = 'none';
    
    // Clear existing options
    if (routeSelect) routeSelect.innerHTML = '';
    if (vehicleSelect) vehicleSelect.innerHTML = '';
    
    // Add activity options
    Object.keys(waterActivitiesPricing).forEach(activityKey => {
        const activity = waterActivitiesPricing[activityKey];
        const option = document.createElement('option');
        option.value = activityKey;
        option.textContent = `${activity.name} - RM ${activity.price}${activity.perPerson ? ' per person' : ''}`;
        if (routeSelect) routeSelect.appendChild(option);
    });
    
    // Add people count options (1-10)
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} ${i === 1 ? 'person' : 'people'}`;
        if (vehicleSelect) vehicleSelect.appendChild(option);
    }
    
    // Set initial price
    modalPrice.textContent = 'From RM 35';
    
    // Add event listeners
    if (routeSelect) routeSelect.addEventListener('change', updateWaterActivitiesPrice);
    if (vehicleSelect) vehicleSelect.addEventListener('change', updateWaterActivitiesPrice);
}

// Function to update airport transfer price based on route and transport
function updateAirportTransferPrice(route, transportType) {
    const modalPrice = document.getElementById('packageModalPrice');
    const carPrice = document.getElementById('carPrice');
    const mpvPrice = document.getElementById('mpvPrice');
    const vanPrice = document.getElementById('vanPrice');
    
    const package = packageData['Package G'];
    if (!package || !package.routes) return;
    
    // Find the selected route
    let selectedRoute;
    switch(route) {
        case 'penang-hotel-to-airport':
            selectedRoute = package.routes[0];
            break;
        case 'airport-to-penang-hotel':
            selectedRoute = package.routes[1];
            break;
        case 'penang-hotel-to-klia':
            selectedRoute = package.routes[2];
            break;
        default:
            selectedRoute = package.routes[0];
    }
    
    // Update transport prices
    carPrice.textContent = `RM ${selectedRoute.car.price} (max ${selectedRoute.car.capacity} people)`;
    vanPrice.textContent = `RM ${selectedRoute.van.price} (max ${selectedRoute.van.capacity} people)`;
    mpvPrice.textContent = `RM ${selectedRoute.mpv.price} (max ${selectedRoute.mpv.capacity} people)`;
    
    // Update modal price based on selected transport
    let price = selectedRoute.car.price; // default to car
    if (transportType === 'van') {
        price = selectedRoute.van.price;
    } else if (transportType === 'mpv') {
        price = selectedRoute.mpv.price;
    }
    
    modalPrice.textContent = `From RM ${price}`;
    
    // Store the selection for booking form
    window.airportTransferSelection = {
        route: route,
        transportType: transportType,
        price: price,
        routeName: selectedRoute.name,
        transportCapacity: selectedRoute[transportType].capacity
    };
}

// Function to update package price based on transport selection
function updatePackagePrice(packageName, transportType) {
    if (packageName === 'Package G') {
        // Get selected route
        const selectedRoute = document.querySelector('input[name="route"]:checked');
        if (selectedRoute) {
            updateAirportTransferPrice(selectedRoute.value, transportType);
        }
        return;
    }
    
    if (packageName === 'Package F') {
        // Handle water activities pricing
        updateWaterActivitiesPrice();
        return;
    }
    
    if (packageName === 'Package B' || packageName === 'Package I') {
        // Handle packages with tour options dynamic pricing
        const activeTourOption = document.querySelector('.tour-option-btn.active');
        if (activeTourOption) {
            const selectedOption = activeTourOption.getAttribute('data-option');
            updatePackagePriceWithTourOptions(packageName, selectedOption, transportType);
        } else {
            // Default to first option if no active option
            const package = packageData[packageName];
            const firstOption = Object.keys(package.tourOptions)[0];
            updatePackagePriceWithTourOptions(packageName, firstOption, transportType);
        }
        return;
    }
    
    const modalPrice = document.getElementById('packageModalPrice');
    const pricing = packagePricing[packageName];
    
    if (!pricing) return;
    
    let price = pricing.car; // default to car
    if (transportType === 'van') {
        price = pricing.van;
    } else if (transportType === 'mpv') {
        price = pricing.mpv;
    }
    
    modalPrice.textContent = `From RM ${price}`;
}

// Function to update package price based on selected tour option and transport
function updatePackagePriceWithTourOptions(packageName, selectedOption, transportType) {
    const modalPrice = document.getElementById('packageModalPrice');
    const package = packageData[packageName];
    const tourOption = package.tourOptions[selectedOption];
    
    if (!tourOption) return;
    
    const pricing = tourOption.price;
    let price = pricing.car; // default to car
    if (transportType === 'van') {
        price = pricing.van;
    } else if (transportType === 'mpv') {
        price = pricing.mpv;
    }
    
    modalPrice.textContent = `From RM ${price}`;
}

// Function to update Cameron Highlands price based on transport selection (for backward compatibility)
function updateCameronPrice(transportType) {
    updatePackagePrice('Package C', transportType);
}

// Function to update water activities price
function updateWaterActivitiesPrice() {
    const modalPrice = document.getElementById('packageModalPrice');
    
    // Get selected activity and people count
    const activitySelect = document.getElementById('routeSelect');
    const peopleSelect = document.getElementById('vehicleSelect');
    
    if (!activitySelect || !peopleSelect) return;
    
    const selectedActivity = activitySelect.value;
    const peopleCount = parseInt(peopleSelect.value) || 1;
    
    const activity = waterActivitiesPricing[selectedActivity];
    if (!activity) return;
    
    let totalPrice;
    if (activity.perPerson) {
        totalPrice = activity.price * peopleCount;
    } else {
        totalPrice = activity.price;
    }
    
    modalPrice.textContent = `RM ${totalPrice}`;
    
    // Store the selection for booking form
    window.waterActivitiesSelection = {
        activity: activity.name,
        peopleCount: peopleCount,
        totalPrice: totalPrice,
        perPerson: activity.perPerson,
        basePrice: activity.price
    };
}

// Initialize hero video
function initializeHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;
    
    // Ensure video plays on load
    heroVideo.addEventListener('loadeddata', function() {
        this.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
        });
    });
    
    // Handle video loading errors
    heroVideo.addEventListener('error', function() {
        console.log('Video failed to load');
    });
    
    // Force play on user interaction (for mobile)
    document.addEventListener('click', function() {
        if (heroVideo.paused) {
            heroVideo.play().catch(function(error) {
                console.log('Video play failed:', error);
            });
        }
    }, { once: true });
    
    // Ensure video plays when page becomes visible
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && heroVideo.paused) {
            heroVideo.play().catch(function(error) {
                console.log('Video play failed on visibility change:', error);
            });
        }
    });
}

// Customize menu bar for Water Activities package
function customizeWaterActivitiesMenuBar() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const placesTab = document.getElementById('placesTab');
    const placesTabButton = document.querySelector('.menu-tab[data-tab="places"]');
    
    // Update the second tab to "Activity" instead of "Attractions"
    if (placesTabButton) {
        placesTabButton.innerHTML = `
            <i class="fas fa-water"></i>
            Activity
        `;
        placesTabButton.setAttribute('data-tab', 'activity');
    }
    
    // Update the places tab content to show activities using the package data
    if (placesTab) {
        const package = packageData['Package F'];
        if (package && package.places) {
            placesTab.innerHTML = `
                <div class="package-places-preview">
                    <h3>Water Activities</h3>
                    <div class="places-preview-grid">
                        ${package.places.map(place => `
                            <div class="place-preview-card">
                                <div class="place-preview-image">
                                    <img src="${place.image}" alt="${place.title}">
                                </div>
                                <div class="place-preview-content">
                                    <h4 class="place-preview-title">${place.title}</h4>
                                    <p class="place-preview-description">${place.description}</p>
                                    <div class="place-preview-features">
                                        ${place.features.map(feature => {
                                            const isNotIncluded = feature === 'Not Included';
                                            return `<span class="place-preview-feature ${isNotIncluded ? 'not-included' : ''}">${feature}</span>`;
                                        }).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }
    
    // Update tab switching logic for the new "activity" tab
    const activityTabButton = document.querySelector('.menu-tab[data-tab="activity"]');
    if (activityTabButton) {
        activityTabButton.addEventListener('click', function() {
            // Remove active class from all tabs
            document.querySelectorAll('.menu-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById('placesTab').classList.add('active');
        });
    }
}

// Function to initialize customized package options for Package K
function initializeCustomizedPackageOptions() {
    console.log('initializeCustomizedPackageOptions called');
    const itineraryTab = document.getElementById('itineraryTab');
    const placesTab = document.getElementById('placesTab');
    const placesTabButton = document.querySelector('.menu-tab[data-tab="places"]');
    
    if (!itineraryTab) {
        console.log('itineraryTab not found');
        return;
    }
    
    const package = packageData['Package K'];
    if (!package || !package.customOptions) {
        console.log('Package K data not found or missing customOptions');
        return;
    }
    
    // Double-check that we're actually dealing with Package K
    const currentPackage = document.getElementById('packageModalTitle');
    console.log('Current package title:', currentPackage ? currentPackage.textContent : 'not found');
    if (currentPackage && !currentPackage.textContent.includes('Customized')) {
        console.log('Not a customized package, returning');
        return; // Don't apply Package K interface to other packages
    }
    
    // Hide the attractions tab for Package K since it doesn't need it
    if (placesTabButton) {
        placesTabButton.style.display = 'none';
    }
    
    // Create the custom options interface
    itineraryTab.innerHTML = `
        <div class="customized-package-options">
            <h3>Customize Your Package</h3>
            
            <!-- Days Selection -->
            <div class="option-section">
                <h4><i class="fas fa-calendar-alt"></i> Select Number of Days</h4>
                <div class="days-selection">
                    ${package.customOptions.days.map(day => `
                        <label class="day-option">
                            <input type="radio" name="customDays" value="${day}" ${day === 1 ? 'checked' : ''}>
                            <span class="day-label">${day} ${day === 1 ? 'Day' : 'Days'}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <!-- Transport Selection -->
            <div class="option-section">
                <h4><i class="fas fa-car"></i> Select Vehicle Type</h4>
                <div class="transport-selection">
                    <label class="transport-option">
                        <input type="radio" name="customTransport" value="car" checked>
                        <span class="transport-label">
                            <i class="fas fa-car"></i>
                            Car - RM ${package.customOptions.transport.car.price}/hour (max ${package.customOptions.transport.car.capacity} people)
                        </span>
                    </label>
                    <label class="transport-option">
                        <input type="radio" name="customTransport" value="van">
                        <span class="transport-label">
                            <i class="fas fa-van-shuttle"></i>
                            Van - RM ${package.customOptions.transport.van.price}/hour (max ${package.customOptions.transport.van.capacity} people)
                        </span>
                    </label>
                </div>
            </div>
            
            <!-- Price Calculation -->
            <div class="option-section">
                <h4><i class="fas fa-calculator"></i> Estimated Price</h4>
                <div class="price-calculation">
                    <div class="price-breakdown">
                        <span id="customDaysDisplay">1 Day</span> × 
                        <span id="customTransportDisplay">Car (RM 30/hour)</span> = 
                        <span id="customTotalPrice">RM 240</span>
                    </div>
                    <p class="price-note">* Price based on 8 hours per day. Final price may vary based on actual hours needed.</p>
                </div>
            </div>
            
            <!-- Current Favorites Display -->
            <div class="option-section">
                <h4><i class="fas fa-heart"></i> Your Selected Places</h4>
                <div id="packageKFavoritesDisplay">
                    <!-- Dynamic content will be populated here -->
                </div>
            </div>
            
            <!-- How to Book Steps -->
            <div class="option-section">
                <h4><i class="fas fa-list-ol"></i> How to Book</h4>
                <div class="booking-steps">
                    <div class="step">
                        <span class="step-number">1</span>
                        <span class="step-text">Start by choosing the number of days for your trip.</span>
                    </div>
                    <div class="step">
                        <span class="step-number">2</span>
                        <span class="step-text">Pick your preferred vehicle (Car or Van – price calculated per hour).</span>
                    </div>
                    <div class="step">
                        <span class="step-number">3</span>
                        <span class="step-text">Browse our list of attractions and click to add your favourites.</span>
                    </div>
                    <div class="step">
                        <span class="step-number">4</span>
                        <span class="step-text">Go to My Favourites to review and finalize your itinerary.</span>
                    </div>
                    <div class="step">
                        <span class="step-number">5</span>
                        <span class="step-text">Copy your final list of chosen places into the description field at checkout.</span>
                    </div>
                    <div class="step">
                        <span class="step-number">6</span>
                        <span class="step-text">Submit your customized itinerary. Our team will review it and contact you within 24 hours to guide and finalize your booking.</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for dynamic pricing
    addCustomizedPackageEventListeners();
    
    // Initialize price calculation
    updateCustomizedPackagePrice();
    
    // Initialize favorites display
    updatePackageKDescription();
    
    console.log('Package K custom options initialized successfully');
}

// Function to add event listeners for customized package options
function addCustomizedPackageEventListeners() {
    // Days selection
    const dayOptions = document.querySelectorAll('input[name="customDays"]');
    dayOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateCustomizedPackagePrice();
        });
    });
    
    // Transport selection
    const transportOptions = document.querySelectorAll('input[name="customTransport"]');
    transportOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateCustomizedPackagePrice();
        });
    });
    
    // Update favorites display immediately when modal opens
    updatePackageKDescription();
}

// Function to update customized package price
function updateCustomizedPackagePrice() {
    const selectedDays = document.querySelector('input[name="customDays"]:checked');
    const selectedTransport = document.querySelector('input[name="customTransport"]:checked');
    
    if (!selectedDays || !selectedTransport) return;
    
    const days = parseInt(selectedDays.value);
    const transportType = selectedTransport.value;
    const package = packageData['Package K'];
    
    if (!package || !package.customOptions) return;
    
    const transport = package.customOptions.transport[transportType];
    const hoursPerDay = 8; // Assume 8 hours per day
    const totalHours = days * hoursPerDay;
    const totalPrice = totalHours * transport.price;
    
    // Update display elements
    const daysDisplay = document.getElementById('customDaysDisplay');
    const transportDisplay = document.getElementById('customTransportDisplay');
    const totalPriceDisplay = document.getElementById('customTotalPrice');
    
    if (daysDisplay) daysDisplay.textContent = `${days} ${days === 1 ? 'Day' : 'Days'}`;
    if (transportDisplay) transportDisplay.textContent = `${transport.name} (RM ${transport.price}/hour)`;
    if (totalPriceDisplay) totalPriceDisplay.textContent = `RM ${totalPrice}`;
    
    // Store the selection for booking
    window.customizedPackageSelection = {
        days: days,
        transport: transportType,
        transportName: transport.name,
        pricePerHour: transport.price,
        totalHours: totalHours,
        totalPrice: totalPrice
    };
    
    // Update favorites display when selection changes
    updatePackageKDescription();
}

// Function to get favorites from localStorage
function getFavorites() {
    try {
        const favorites = localStorage.getItem('favourites');
        return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
        console.error('Error getting favorites:', error);
        return [];
    }
}

// Function to reset package interface for non-Package K packages
function resetPackageInterface(packageName) {
    const itineraryTab = document.getElementById('itineraryTab');
    const placesTabButton = document.querySelector('.menu-tab[data-tab="places"]');
    
    // Show the attractions tab for non-Package K packages
    if (placesTabButton) {
        placesTabButton.style.display = 'block';
    }
    
    // Reset itinerary tab to standard format for non-Package K packages
    if (itineraryTab && packageName !== 'Package K') {
        // Let updatePackageItinerary handle the content creation
        updatePackageItinerary(packageName);
    }
}

// Function to scroll to favorites section and close modal
function scrollToFavorites() {
    // Close the package modal
    const packageModal = document.getElementById('packageDetailsModal');
    if (packageModal) {
        packageModal.style.display = 'none';
    }
    
    // Trigger navigation to places to visit page
    const placesLink = document.querySelector('a[data-page="places"]');
    if (placesLink) {
        placesLink.click();
    } else {
        // Fallback: Scroll to places section
        const placesSection = document.getElementById('places');
        if (placesSection) {
            placesSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
}

// Function to generate customized package description for booking (Package K only)
function generateCustomizedPackageDescription() {
    const favorites = getFavorites();
    const favoriteCount = favorites.length;
    const favoritePlaces = favorites.map(place => place.name).join(', ');
    
    return `Selected Places to Visit (${favoriteCount} attraction${favoriteCount !== 1 ? 's' : ''}):
${favoritePlaces || '(None selected yet)'}

Please ensure you have added your desired places to "My Favourites" before submitting this booking.`;
}

// Build auto-generated description content for Package F, G, or K (for read-only block and for submit)
function getDescriptionAutoContent(tourType) {
    if (tourType === 'Package F') {
        const activityKeys = ['jetski-single', 'jetski-double', 'parasailing-single', 'parasailing-double', 'banana-boat', 'boat-ride', 'boat-fishing'];
        const names = {
            'jetski-single': 'Jet Ski (Single Rider)',
            'jetski-double': 'Jet Ski (Double Rider)',
            'parasailing-single': 'Parasailing (Single)',
            'parasailing-double': 'Parasailing (Double)',
            'banana-boat': 'Banana Boat',
            'boat-ride': 'Boat Ride',
            'boat-fishing': 'Boat Ride + Fishing'
        };
        const lines = [];
        activityKeys.forEach(function(key) {
            const input = document.getElementById('qty-' + key);
            if (input && parseInt(input.value, 10) > 0) {
                lines.push(names[key] + ' x' + input.value);
            }
        });
        if (lines.length === 0) return 'No water sports activities selected yet. Add activities above.';
        return 'Selected Water Sports Activities:\n' + lines.join('\n');
    }
    if (tourType === 'Package G') {
        const routeSelect = document.getElementById('airportRoute');
        const transportSelect = document.getElementById('transportation');
        const routeVal = routeSelect ? routeSelect.value : '';
        const transportVal = transportSelect ? transportSelect.options[transportSelect.selectedIndex].text : '';
        const routeNames = { 'penang-airport': 'Penang Hotel ↔ Penang International Airport', 'klia': 'Penang Hotel ↔ KLIA (Kuala Lumpur)' };
        const routeText = routeNames[routeVal] || routeVal || 'No route selected';
        return 'Selected Route: ' + routeText + (transportVal ? '\nTransportation: ' + transportVal : '');
    }
    if (tourType === 'Package K') {
        return generateCustomizedPackageDescription();
    }
    return '';
}

// Update the read-only description block and show/hide it (does not clear optional notes)
function updateDescriptionAutoDisplay(tourType) {
    const group = document.getElementById('descriptionAutoGroup');
    const autoEl = document.getElementById('descriptionAuto');
    if (!group || !autoEl) return;
    if (tourType === 'Package F' || tourType === 'Package G' || tourType === 'Package K') {
        group.style.display = 'block';
        autoEl.textContent = getDescriptionAutoContent(tourType);
    } else {
        group.style.display = 'none';
        autoEl.textContent = '';
    }
}

// Function to update Package K description in real-time
function updatePackageKDescription() {
    const favorites = getFavorites();
    const favoriteCount = favorites.length;
    
    console.log('Package K Favorites Update:', { favorites, favoriteCount });
    
    // Update the favorites display in Package K modal if it's open
    const favoritesDisplay = document.getElementById('packageKFavoritesDisplay');
    if (favoritesDisplay) {
        if (favoriteCount > 0) {
            favoritesDisplay.innerHTML = `
                <div class="favorites-summary">
                    <h4><i class="fas fa-heart"></i> Your Selected Places (${favoriteCount}):</h4>
                    <div class="favorites-list">
                        ${favorites.map(place => `
                            <div class="favorite-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${place.name}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="add-more-places">
                        <button class="add-more-btn" onclick="scrollToFavorites()">
                            <i class="fas fa-plus"></i>
                            Add More Places
                        </button>
                    </div>
                </div>
            `;
        } else {
            favoritesDisplay.innerHTML = `
                <div class="favorites-summary">
                    <h4><i class="fas fa-info-circle"></i> No Places Selected</h4>
                    <p>Please browse and add your favorite places from our attractions list.</p>
                    <div class="add-more-places">
                        <button class="add-more-btn" onclick="scrollToFavorites()">
                            <i class="fas fa-plus"></i>
                            Add Places
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    // Update the auto description block when Package K is selected
    const tourTypeRadio = document.querySelector('input[name="tourType"]:checked');
    if (tourTypeRadio && tourTypeRadio.value === 'Package K') updateDescriptionAutoDisplay('Package K');
}

// Override the package book button functionality for Package K
function overridePackageKBooking() {
    const packageBookBtn = document.getElementById('packageBookBtn');
    if (!packageBookBtn) return;
    
    // Remove existing event listeners to prevent duplicates
    const newBtn = packageBookBtn.cloneNode(true);
    packageBookBtn.parentNode.replaceChild(newBtn, packageBookBtn);
    
    newBtn.addEventListener('click', function() {
        const selectedPackage = this.getAttribute('data-package');
        
        if (selectedPackage === 'Package K') {
            // Check if this is a different package than the currently selected one
            const currentSelectedPackage = window.currentSelectedPackage;
            const isDifferentPackage = currentSelectedPackage !== null && currentSelectedPackage !== selectedPackage;
            
            // Generate description for customized package
            const description = generateCustomizedPackageDescription();
            
            // Store the description for the booking form
            window.customizedPackageDescription = description;
            
            // Close modal and navigate to booking
            document.getElementById('packageDetailsModal').style.display = 'none';
            navigateToPage('bookings');
            
            // Pre-fill the booking form (change event will show auto block + optional)
            setTimeout(() => {
                const tourTypeRadio = document.querySelector(`input[name="tourType"][value="Package K"]`);
                const descriptionOptional = document.getElementById('descriptionOptional');
                if (tourTypeRadio) {
                    tourTypeRadio.checked = true;
                    tourTypeRadio.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (isDifferentPackage && descriptionOptional) {
                        descriptionOptional.value = '';
                        showNotification('Description updated for new package', 'info');
                    }
                    tourTypeRadio.dispatchEvent(new Event('change'));
                }
                window.currentSelectedPackage = selectedPackage;
            }, 500);
        } else if (selectedPackage === 'Package F') {
            // Check if this is a different package than the currently selected one
            const currentSelectedPackage = window.currentSelectedPackage;
            const isDifferentPackage = currentSelectedPackage !== null && currentSelectedPackage !== selectedPackage;
            
            // Handle water activities booking
            const waterSelection = window.waterActivitiesSelection;
            let description = '';
            
            if (waterSelection) {
                description = `Water Activities Package Booking:

Selected Activity: ${waterSelection.activity}
Number of People: ${waterSelection.peopleCount}
${waterSelection.perPerson ? `Price per Person: RM ${waterSelection.basePrice}` : 'Fixed Price Activity'}
Total Price: RM ${waterSelection.totalPrice}

Booking Details:
- Activity will be arranged based on weather conditions
- Safety briefing provided before activity
- Equipment and safety gear included
- Professional instructors provided

Please provide your preferred date and time in the additional details below.`;
            }
            
            // Store the description for the booking form
            window.waterActivitiesDescription = description;
            
            // Close modal and navigate to booking
            document.getElementById('packageDetailsModal').style.display = 'none';
            navigateToPage('bookings');
            
            // Pre-fill the booking form
            setTimeout(() => {
                const tourTypeRadio = document.querySelector(`input[name="tourType"][value="Package F"]`);
                const descriptionOptional = document.getElementById('descriptionOptional');
                if (tourTypeRadio) {
                    tourTypeRadio.checked = true;
                    tourTypeRadio.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (isDifferentPackage && descriptionOptional) {
                        descriptionOptional.value = '';
                        showNotification('Description updated for new package', 'info');
                    }
                    tourTypeRadio.dispatchEvent(new Event('change'));
                }
                if (descriptionOptional && window.waterActivitiesDescription) descriptionOptional.value = window.waterActivitiesDescription;
                window.currentSelectedPackage = selectedPackage;
            }, 500);
        } else if (selectedPackage === 'Package G') {
            // Check if this is a different package than the currently selected one
            const currentSelectedPackage = window.currentSelectedPackage;
            const isDifferentPackage = currentSelectedPackage !== null && currentSelectedPackage !== selectedPackage;
            
            // Handle airport transfer booking
            const airportSelection = window.airportTransferSelection;
            let description = '';
            
            if (airportSelection) {
                description = `Airport Transfer Booking:

Selected Route: ${airportSelection.routeName}
Vehicle Type: ${airportSelection.transportType.toUpperCase()}
Capacity: Up to ${airportSelection.transportCapacity} people
Price: RM ${airportSelection.price}

Transfer Details:
- Professional driver with air-conditioned vehicle
- Pick-up and drop-off at exact location
- Fuel, tolls, and parking included
- Flight monitoring service available
- 24/7 availability

Please provide your flight details, hotel name, and preferred pick-up time in the additional details below.`;
            }
            
            // Store the description for the booking form
            window.airportTransferDescription = description;
            
            // Close modal and navigate to booking
            document.getElementById('packageDetailsModal').style.display = 'none';
            navigateToPage('bookings');
            
            setTimeout(() => {
                const tourTypeRadio = document.querySelector(`input[name="tourType"][value="Package G"]`);
                const descriptionOptional = document.getElementById('descriptionOptional');
                if (tourTypeRadio) {
                    tourTypeRadio.checked = true;
                    tourTypeRadio.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (isDifferentPackage && descriptionOptional) {
                        descriptionOptional.value = '';
                        showNotification('Description updated for new package', 'info');
                    }
                    tourTypeRadio.dispatchEvent(new Event('change'));
                }
                if (descriptionOptional && window.airportTransferDescription) descriptionOptional.value = window.airportTransferDescription;
                window.currentSelectedPackage = selectedPackage;
            }, 500);
        } else {
            // Check if this is a different package than the currently selected one
            const currentSelectedPackage = window.currentSelectedPackage;
            const isDifferentPackage = currentSelectedPackage !== null && currentSelectedPackage !== selectedPackage;
            
            // Default booking behavior for other packages
            document.getElementById('packageDetailsModal').style.display = 'none';
            navigateToPage('bookings');
            
            setTimeout(() => {
                const tourTypeRadio = document.querySelector(`input[name="tourType"][value="${selectedPackage}"]`);
                const descriptionOptional = document.getElementById('descriptionOptional');
                if (tourTypeRadio) {
                    tourTypeRadio.checked = true;
                    tourTypeRadio.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    if (isDifferentPackage && descriptionOptional) {
                        descriptionOptional.value = '';
                        showNotification('Description updated for new package', 'info');
                    }
                    tourTypeRadio.dispatchEvent(new Event('change'));
                }
                window.currentSelectedPackage = selectedPackage;
            }, 500);
        }
    });
}

// Function to generate package description based on selected tour option and transportation
function generatePackageDescription(packageName) {
    const package = packageData[packageName];
    if (!package || !package.tourOptions) return '';
    
    // Get the currently selected tour option
    const selectedTourOption = window.selectedTourOption || Object.keys(package.tourOptions)[0];
    const tourOption = package.tourOptions[selectedTourOption];
    
    if (!tourOption) return '';
    
    // Get the currently selected transportation
    const selectedTransport = window.selectedTransport || 'car';
    const transportPrice = tourOption.price[selectedTransport] || tourOption.price.car;
    
    // Generate description based on package and tour option
    let description = `${packageName} - ${tourOption.title} Booking:\n\n`;
    
    // Add tour details
    description += `Selected Tour: ${tourOption.title}\n`;
    description += `Description: ${tourOption.description}\n\n`;
    
    // Add transportation details
    const transportNames = {
        'car': 'Car (Max 4 people)',
        'mpv': 'MPV (Max 6 people)', 
        'van': 'Van (Max 12 people)'
    };
    
    description += `Transportation: ${transportNames[selectedTransport] || 'Car'}\n`;
    description += `Price: RM ${transportPrice}\n\n`;
    
    // Add itinerary highlights
    description += `Itinerary Highlights:\n`;
    const itineraryHighlights = tourOption.itinerary.slice(0, 4); // Show first 4 activities
    itineraryHighlights.forEach((activity, index) => {
        description += `${index + 1}. ${activity}\n`;
    });
    
    if (tourOption.itinerary.length > 4) {
        description += `... and ${tourOption.itinerary.length - 4} more activities\n`;
    }
    
    description += `\nWhat's Included:\n`;
    description += `- Professional driver and air-conditioned vehicle\n`;
    description += `- All entrance fees and tickets\n`;
    description += `- Meals as specified in itinerary\n`;
    description += `- Fuel, tolls, and parking\n`;
    description += `- English-speaking guide (if requested)\n\n`;
    
    description += `Please provide your preferred travel date, number of people, and any special requirements below.`;
    
    return description;
}

// Function to mark optional notes as manually edited
function markDescriptionAsManuallySelected() {
    const descriptionOptional = document.getElementById('descriptionOptional');
    if (descriptionOptional) {
        descriptionOptional.addEventListener('input', function() {
            this.setAttribute('data-manually-selected', 'true');
        });
    }
}

// Function to clear optional description when switching between packages (auto block handled by handleTourTypeChange)
function clearDescriptionOnPackageChange() {
    const tourTypeRadios = document.querySelectorAll('input[name="tourType"]');
    const descriptionOptional = document.getElementById('descriptionOptional');
    if (!descriptionOptional) return;
    let currentSelectedPackage = null;
    tourTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const selectedPackage = this.value;
            if (currentSelectedPackage !== null && currentSelectedPackage !== selectedPackage) {
                descriptionOptional.value = '';
                showNotification('Description updated for new package', 'info');
            }
            currentSelectedPackage = selectedPackage;
        });
    });
}

// Function to mark optional notes as manually edited
function markDescriptionAsManuallySelected() {
    const descriptionOptional = document.getElementById('descriptionOptional');
    if (descriptionOptional) descriptionOptional.setAttribute('data-manually-selected', 'true');
}

// Initialize customized package functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the override function
    overridePackageKBooking();
    // Initialize description clearing
    clearDescriptionOnPackageChange();
    // Initialize manual description tracking
    markDescriptionAsManuallySelected();
    
    const descriptionOptional = document.getElementById('descriptionOptional');
    if (descriptionOptional) {
        descriptionOptional.addEventListener('input', function() {
            this.setAttribute('data-manually-selected', 'true');
        });
        descriptionOptional.addEventListener('focus', function() {
            const tourTypeRadio = document.querySelector('input[name="tourType"]:checked');
            if (tourTypeRadio && tourTypeRadio.value === 'Package K') updateDescriptionAutoDisplay('Package K');
        });
    }
});

// Also initialize when the page loads (for cases where DOMContentLoaded already fired)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        overridePackageKBooking();
        clearDescriptionOnPackageChange();
        
        const descriptionOptional = document.getElementById('descriptionOptional');
        if (descriptionOptional) {
            descriptionOptional.addEventListener('input', function() {
                this.setAttribute('data-manually-selected', 'true');
            });
            descriptionOptional.addEventListener('focus', function() {
                const tourTypeRadio = document.querySelector('input[name="tourType"]:checked');
                if (tourTypeRadio && tourTypeRadio.value === 'Package K') updateDescriptionAutoDisplay('Package K');
            });
        }
    });
} else {
    overridePackageKBooking();
    clearDescriptionOnPackageChange();
    
    const descriptionOptional = document.getElementById('descriptionOptional');
    if (descriptionOptional) {
        descriptionOptional.addEventListener('input', function() {
            this.setAttribute('data-manually-selected', 'true');
        });
        descriptionOptional.addEventListener('focus', function() {
            const tourTypeRadio = document.querySelector('input[name="tourType"]:checked');
            if (tourTypeRadio && tourTypeRadio.value === 'Package K') updateDescriptionAutoDisplay('Package K');
        });
    }
}
