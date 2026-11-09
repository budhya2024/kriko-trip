import { ItineraryDay, TourPackage } from "./types";
import { initialTourPackages } from "./data";

export interface PackageDetailedInfo {
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  hotelName: string;
  hotelStars: number;
  hotelRoom: string;
  hotelAmenities: string[];
}

const detailedInfoMap: Record<string, PackageDetailedInfo> = {
  "andaman-short-stay": {
    overview:
      "Embark on an unforgettable tropical voyage to the Andaman Islands with KrikoTrip. Experience the historic Cellular Jail in Port Blair, witness the legendary Light and Sound Show, cruise on high-speed catamarans to world-famous Havelock Island, and sink your toes into the powdery white sands of Radhanagar Beach (voted Asia's Best Beach).",
    highlights: [
      "High-speed luxury catamaran cruise between Port Blair and Havelock",
      "Visit Asia's finest Radhanagar Beach (Beach No. 7) for a breathtaking sunset",
      "Sound & Light Show at Historic Cellular Jail National Memorial",
      "Complimentary snorkeling session with certified safety divers",
      "Private AC vehicle for all airport, jetty, and sightseeing transfers",
      "Daily gourmet buffet breakfast and chef-crafted dinner at resort",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Port Blair & Historic Cellular Jail Light Show",
        description:
          "Arrive at Veer Savarkar International Airport in Port Blair where our representative will welcome you with traditional floral garlands. Check into your luxury resort and freshen up. In the afternoon, visit the historic Cellular Jail and experience the moving Sound and Light Show recounting India's freedom struggle.",
        meals: "Dinner Included",
        stay: "Sea Shell Resort & Spa, Port Blair",
        activities: ["Airport Pick-up", "Cellular Jail Visit", "Sound & Light Show"],
      },
      {
        day: 2,
        title: "Cruise to Havelock Island & Radhanagar Beach Sunset",
        description:
          "Board the morning luxury catamaran to Havelock Island. Check in to your beachfront villa. In the late afternoon, head to Radhanagar Beach, ranked among the top 10 beaches in the world by Time Magazine, and marvel at the magical golden sunset over the turquoise Andaman Sea.",
        meals: "Breakfast & Dinner Included",
        stay: "Symphony Palms Beach Resort, Havelock",
        activities: ["Ferry Transfer", "Radhanagar Beach Walk", "Sunset Photography"],
      },
      {
        day: 3,
        title: "Elephant Beach Coral Reef Snorkeling & Watersports",
        description:
          "Take an exciting speedboat ride to Elephant Beach. Known for its pristine coral reefs and exotic marine life, enjoy a guided snorkeling session with certified divers. Optional activities include Sea Walk, Jet Skiing, and Glass Bottom Boat tours.",
        meals: "Breakfast & Dinner Included",
        stay: "Symphony Palms Beach Resort, Havelock",
        activities: ["Speedboat Cruise", "Guided Snorkeling", "Beach Watersports"],
      },
      {
        day: 4,
        title: "Return to Port Blair & Local Souvenir Shopping",
        description:
          "After breakfast, take the return ferry to Port Blair. In the afternoon, explore Sagarika Government Emporium and Aberdeen Bazaar for handmade mother-of-pearl crafts, seashell souvenirs, and local spices. Enjoy an exclusive candlelit dinner at the hotel.",
        meals: "Breakfast & Dinner Included",
        stay: "Sea Shell Resort & Spa, Port Blair",
        activities: ["Jetty Transfer", "Sagarika Handicrafts", "Farewell Dinner"],
      },
      {
        day: 5,
        title: "Departure with Cherished Tropical Memories",
        description:
          "Enjoy a leisurely breakfast overlooking the ocean. Our private chauffeur will transfer you to Port Blair Airport for your flight back home with countless wonderful memories.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Airport Drop-off"],
      },
    ],
    inclusions: [
      "4 Nights AC Luxury Hotel Accommodation on double occupancy",
      "Daily Chef's Buffet Breakfast and Multi-Cuisine Dinner",
      "All airport and ferry jetty transfers in private AC vehicle",
      "Luxury Catamaran tickets (Makruzz / Green Ocean) in Premium Class",
      "Entry permits, monuments tickets, and parking fees",
      "Complimentary snorkeling experience at Elephant Beach",
      "24/7 dedicated on-ground Tour Coordinator",
    ],
    exclusions: [
      "Domestic or International flight airfare",
      "Personal expenses, room service, laundry, and alcoholic beverages",
      "Optional water activities (Scuba diving, Sea Walk, Parasailing)",
      "Camera fees at monuments (if applicable)",
      "Travel insurance coverage (available as add-on)",
    ],
    hotelName: "Sea Shell & Symphony Palms Luxury Beach Resorts",
    hotelStars: 4,
    hotelRoom: "Deluxe Ocean View AC Villa",
    hotelAmenities: ["Swimming Pool", "Beachfront Access", "Free Wi-Fi", "Spa & Wellness", "Restaurant & Bar"],
  },
  "andaman-wonders": {
    overview:
      "A complete 6-day family and couple getaway combining the rich colonial history of Port Blair with the tranquil white sand lagoons of Havelock Island. Includes excursions to Kalapathar Beach, Radhanagar Beach, and private island hopping.",
    highlights: [
      "3 Nights Port Blair + 2 Nights Havelock Island in premium beach resorts",
      "Explore both Radhanagar Beach and turquoise Kalapathar Beach",
      "Heritage walking tour of British colonial ruins at Ross Island",
      "Private speedboat excursion to Elephant Beach with snorkeling kit",
      "Dedicated AC private car and personalized tour manager throughout",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Port Blair, Hotel Check-in & Corbyn's Cove Beach",
        description: "Welcome at Port Blair Airport and transfer to hotel. Visit Corbyn's Cove coconut-fringed beach and attend the Cellular Jail Sound & Light Show.",
        meals: "Dinner Included",
        stay: "Welcomhotel by ITC, Port Blair",
        activities: ["Corbyn's Cove", "Cellular Jail Show"],
      },
      {
        day: 2,
        title: "Catamaran to Havelock & Radhanagar Sunset",
        description: "Morning high-speed catamaran cruise to Havelock Island. Relax at the resort before heading to Radhanagar Beach for an iconic sunset.",
        meals: "Breakfast & Dinner Included",
        stay: "Barefoot at Havelock Eco Resort",
        activities: ["Makruzz Cruise", "Radhanagar Sunset"],
      },
      {
        day: 3,
        title: "Elephant Beach Coral Reef & Water Adventures",
        description: "Speedboat ride to Elephant Beach. Enjoy coral reef snorkeling, banana rides, or relaxation under shady tropical mangroves.",
        meals: "Breakfast & Dinner Included",
        stay: "Barefoot at Havelock Eco Resort",
        activities: ["Elephant Beach", "Coral Snorkeling"],
      },
      {
        day: 4,
        title: "Kalapathar Beach & Return Ferry to Port Blair",
        description: "Morning photo walk along the turquoise waters of Kalapathar Beach. Afternoon ferry back to Port Blair with sunset on the high seas.",
        meals: "Breakfast & Dinner Included",
        stay: "Welcomhotel by ITC, Port Blair",
        activities: ["Kalapathar Beach", "Ferry Transfer"],
      },
      {
        day: 5,
        title: "Ross Island Colonial Heritage & Chidiyatapu Sunset",
        description: "Short boat ride to historic Ross Island (Netaji Subhash Chandra Bose Dweep) with friendly deer and peacocks. Sunset at Chidiyatapu bird sanctuary.",
        meals: "Breakfast & Dinner Included",
        stay: "Welcomhotel by ITC, Port Blair",
        activities: ["Ross Island Tour", "Chidiyatapu Sunset"],
      },
      {
        day: 6,
        title: "Farewell Port Blair & Departure Transfer",
        description: "Leisurely breakfast followed by a timely transfer to Veer Savarkar Airport for your onward journey.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Airport Drop-off"],
      },
    ],
    inclusions: [
      "5 Nights accommodation in top 4/5-star beachfront resorts",
      "Daily gourmet breakfast and chef's dinner",
      "All inter-island ferry tickets in Premium AC Class",
      "Private AC vehicle throughout with chauffeur",
      "All entry permits and guided sightseeing",
      "Complimentary snorkeling at Elephant Beach",
    ],
    exclusions: [
      "Airfare tickets",
      "Optional adventure watersports",
      "Personal telephone calls, laundry, and minibar",
      "Travel insurance",
    ],
    hotelName: "Welcomhotel by ITC & Barefoot at Havelock",
    hotelStars: 5,
    hotelRoom: "Oceanfront Luxury Cottage",
    hotelAmenities: ["Infinity Pool", "Private Beach", "Ayurvedic Spa", "Free Wi-Fi", "Ocean Dining"],
  },
  "best-of-andaman": {
    overview:
      "The definitive 7-day Andaman journey covering Port Blair, Havelock Island, and the untouched paradise of Neil Island (Shaheed Dweep). Marvel at natural rock bridges, coral gardens, and sunset viewpoints.",
    highlights: [
      "Covers all 3 major islands: Port Blair, Havelock Island, and Neil Island",
      "Visit the famous Natural Rock Formation (Howrah Bridge) on Neil Island",
      "Radhanagar Beach, Elephant Beach, and Bharatpur Beach water sports",
      "Sunset viewpoints at Laxmanpur Beach and Kalapathar Beach",
      "Full board buffet meals and premium cruise tickets included",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Port Blair & Cellular Jail Memorial",
        description: "Transfer from airport to hotel. Visit Cellular Jail and attend the national Sound & Light program.",
        meals: "Dinner Included",
        stay: "Peerless Sarovar Portico, Port Blair",
        activities: ["Airport Pick-up", "Cellular Jail"],
      },
      {
        day: 2,
        title: "Port Blair to Havelock Island & Radhanagar Beach",
        description: "Cruise to Havelock. Enjoy the afternoon on the world-renowned sands of Radhanagar Beach.",
        meals: "Breakfast & Dinner",
        stay: "Silver Sand Beach Resort, Havelock",
        activities: ["Catamaran Cruise", "Radhanagar Beach"],
      },
      {
        day: 3,
        title: "Elephant Beach Snorkeling Excursion",
        description: "Speedboat excursion to Elephant Beach with vibrant coral reefs, colorful fish, and watersports.",
        meals: "Breakfast & Dinner",
        stay: "Silver Sand Beach Resort, Havelock",
        activities: ["Speedboat Ride", "Snorkeling"],
      },
      {
        day: 4,
        title: "Havelock to Neil Island & Natural Coral Bridge",
        description: "Ferry to peaceful Neil Island. Discover the natural rock formation bridge and Laxmanpur sunset beach.",
        meals: "Breakfast & Dinner",
        stay: "Sea Shell Neil, Neil Island",
        activities: ["Neil Island Cruise", "Natural Bridge", "Laxmanpur Sunset"],
      },
      {
        day: 5,
        title: "Bharatpur Beach Water Sports & Return to Port Blair",
        description: "Morning at Bharatpur Beach for glass bottom boat rides. Afternoon ferry back to Port Blair.",
        meals: "Breakfast & Dinner",
        stay: "Peerless Sarovar Portico, Port Blair",
        activities: ["Bharatpur Beach", "Return Ferry"],
      },
      {
        day: 6,
        title: "Ross Island Colonial Tour & Souvenir Shopping",
        description: "Boat excursion to Ross Island colonial ruins followed by local shopping for Andaman pearls and handicrafts.",
        meals: "Breakfast & Dinner",
        stay: "Peerless Sarovar Portico, Port Blair",
        activities: ["Ross Island", "Aberdeen Bazaar"],
      },
      {
        day: 7,
        title: "Departure from Port Blair",
        description: "Transfer to airport after breakfast with lifelong memories of the Andaman paradise.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Airport Drop-off"],
      },
    ],
    inclusions: [
      "6 Nights AC accommodation in premium 4-star beach resorts",
      "Daily breakfast and dinner included",
      "All inter-island private catamaran tickets",
      "Private AC vehicle for all tours and transfers",
      "All permit fees, tolls, and entry passes",
    ],
    exclusions: ["Airfare", "Personal expenses", "Optional Scuba Diving", "Insurance"],
    hotelName: "Silver Sand Beach Resort & Sea Shell Neil",
    hotelStars: 4,
    hotelRoom: "Luxury Pool Villa / Beach Cabana",
    hotelAmenities: ["Private Beach", "Swimming Pool", "Spa & Wellness", "Free Wi-Fi", "Bar & Grill"],
  },
  "bali-island-escape": {
    overview:
      "Immerse yourself in Bali's lush tropical highlands and sun-drenched coastal beaches. From the artistic soul of Ubud to the vibrant sunset beach clubs of Seminyak, this luxury package offers the quintessential Indonesian escape.",
    highlights: [
      "4 Nights in an Ubud jungle pool villa + 2 Nights in Seminyak luxury beach resort",
      "Tegalalang Rice Terraces and Bali Swing photo experience",
      "Sacred Monkey Forest Sanctuary and Ubud Royal Palace",
      "Uluwatu Clifftop Temple sunset with legendary Kecak Fire Dance",
      "Private speedboat day trip to Nusa Penida's Kelingking T-Rex Beach",
      "Complimentary 60-minute Balinese Aromatherapy couples massage",
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Denpasar Bali & Transfer to Ubud Jungle Resort",
        description: "Arrive at Ngurah Rai International Airport in Denpasar. Meet our English-speaking concierge and transfer through scenic villages to your private pool villa in Ubud.",
        meals: "Dinner Included",
        stay: "The Kayon Jungle Resort, Ubud",
        activities: ["Airport VIP Meet & Greet", "Check-in Welcome Drink"],
      },
      {
        day: 2,
        title: "Tegalalang Rice Terraces, Bali Swing & Coffee Plantation",
        description: "Walk through UNESCO-protected emerald rice terraces, soar over the jungle on the giant Bali Swing, and taste authentic Luwak coffee.",
        meals: "Breakfast & Dinner Included",
        stay: "The Kayon Jungle Resort, Ubud",
        activities: ["Tegalalang Terraces", "Bali Swing", "Coffee Tasting"],
      },
      {
        day: 3,
        title: "Sacred Monkey Forest, Tirta Empul & Kanto Lampo Waterfall",
        description: "Visit the mischievous macaques in Ubud's Sacred Monkey Forest, receive blessings at Holy Spring Temple (Tirta Empul), and swim at Kanto Lampo waterfall.",
        meals: "Breakfast & Dinner Included",
        stay: "The Kayon Jungle Resort, Ubud",
        activities: ["Monkey Forest", "Holy Spring Temple", "Waterfall Swim"],
      },
      {
        day: 4,
        title: "Day Trip to Nusa Penida (Kelingking & Broken Beach)",
        description: "Speedboat to Nusa Penida island. Marvel at the dramatic T-Rex cliff at Kelingking Beach, Broken Beach, and natural infinity pool at Angel's Billabong.",
        meals: "Breakfast & Lunch Included",
        stay: "The Kayon Jungle Resort, Ubud",
        activities: ["Speedboat Ride", "Kelingking Beach", "Angel's Billabong"],
      },
      {
        day: 5,
        title: "Transfer to Seminyak & Uluwatu Clifftop Kecak Dance",
        description: "Transfer from Ubud to Seminyak. Check in to your beach resort. In the evening, visit Uluwatu Temple perched 70m above crashing waves and witness the sunset Kecak Dance.",
        meals: "Breakfast & Seafood Dinner",
        stay: "W Bali Seminyak / Alila Seminyak",
        activities: ["Seminyak Transfer", "Uluwatu Temple", "Kecak Fire Dance", "Jimbaran Seafood BBQ"],
      },
      {
        day: 6,
        title: "Leisure Day at Seminyak Beach Clubs & Sunset Cocktails",
        description: "Enjoy a relaxing day swimming in your private pool, browsing boutique stores in Seminyak, or relaxing at renowned beach clubs like Potato Head.",
        meals: "Breakfast Included",
        stay: "W Bali Seminyak",
        activities: ["Beach Club Access", "Spa Treatment", "Boutique Shopping"],
      },
      {
        day: 7,
        title: "Departure Transfer to Bali Airport",
        description: "Savor your final tropical breakfast before private transfer to Denpasar Airport for your onward journey.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Airport Transfer"],
      },
    ],
    inclusions: [
      "6 Nights accommodation in 5-star private pool villas and beach resorts",
      "Daily international breakfast and 4 chef dinners including Jimbaran Seafood",
      "Private AC luxury minivan with dedicated English-speaking guide",
      "Full-day Nusa Penida island excursion with speedboat tickets",
      "All temple entry tickets, swing passes, and Kecak Dance tickets",
      "60-minute Balinese Spa massage for travelers",
    ],
    exclusions: [
      "International flights",
      "Indonesia Visa on Arrival (approx. $35 USD)",
      "Personal expenses, drinks outside meals, and tipping",
      "Travel insurance",
    ],
    hotelName: "The Kayon Jungle Resort & W Bali Seminyak",
    hotelStars: 5,
    hotelRoom: "Private Infinity Pool Villa",
    hotelAmenities: ["Private Pool", "Jungle Spa", "Free High-Speed Wi-Fi", "Beach Club Access", "24/7 Butler"],
  },
  "swiss-alps-express": {
    overview:
      "Experience the pinnacle of European alpine luxury. Glide along crystalline lakes, ride world-famous mountain cogwheel railways to the Top of Europe (Jungfraujoch), and stroll charming cobblestone streets in Lucerne and Interlaken.",
    highlights: [
      "Excursion to Jungfraujoch - Top of Europe (3,454m) with Ice Palace visit",
      "Mount Titlis revolving cable car (Rotair) and Cliff Walk suspension bridge",
      "Lake Lucerne scenic paddle steamer cruise with alpine backdrop",
      "Swiss Travel Pass included for unlimited scenic train travel",
      "Handpicked 4-star boutique alpine hotels in Lucerne and Interlaken",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Zurich & Scenic Train to Lucerne",
        description: "Arrive at Zurich Airport. Board the Swiss Rail to Lucerne. Walk across the iconic 14th-century Chapel Bridge and Lion Monument.",
        meals: "Dinner Included",
        stay: "Hotel Schweizerhof, Lucerne",
        activities: ["Zurich Transfer", "Chapel Bridge", "Old Town Walk"],
      },
      {
        day: 2,
        title: "Mount Titlis Eternal Snow & Glacier Cave",
        description: "Ascend Mount Titlis on the world's first revolving cable car. Walk Europe's highest suspension bridge and explore the Ice Cave.",
        meals: "Breakfast & Dinner",
        stay: "Hotel Schweizerhof, Lucerne",
        activities: ["Titlis Rotair", "Cliff Walk", "Glacier Park"],
      },
      {
        day: 3,
        title: "Lake Lucerne Cruise & GoldenPass Train to Interlaken",
        description: "Morning cruise on Lake Lucerne. In the afternoon, board the panoramic GoldenPass express train across alpine passes to Interlaken.",
        meals: "Breakfast & Fondue Dinner",
        stay: "Victoria-Jungfrau Grand Hotel, Interlaken",
        activities: ["Steamer Cruise", "GoldenPass Train", "Swiss Fondue Dinner"],
      },
      {
        day: 4,
        title: "Jungfraujoch Top of Europe Day Trip",
        description: "Take the Eiger Express gondola and historic cogwheel train to Jungfraujoch station at 3,454m. Step out onto the Aletsch Glacier.",
        meals: "Breakfast & Alpine Lunch",
        stay: "Victoria-Jungfrau Grand Hotel, Interlaken",
        activities: ["Jungfraujoch Railway", "Ice Palace", "Sphinx Observation Deck"],
      },
      {
        day: 5,
        title: "Lauterbrunnen Valley of 72 Waterfalls & Grindelwald",
        description: "Visit the postcard-perfect valley of Lauterbrunnen, admire Staubbach Falls, and explore the charming glacier village of Grindelwald.",
        meals: "Breakfast & Dinner",
        stay: "Victoria-Jungfrau Grand Hotel, Interlaken",
        activities: ["Lauterbrunnen Waterfalls", "Grindelwald First"],
      },
      {
        day: 6,
        title: "Scenic Train to Zurich Airport & Departure",
        description: "Enjoy a Swiss breakfast before a comfortable rail journey back to Zurich Airport for your departure.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Zurich Airport Rail Transfer"],
      },
    ],
    inclusions: [
      "5 Nights accommodation in luxury 4/5-star Swiss alpine hotels",
      "Daily Swiss buffet breakfast and authentic Fondue dinners",
      "Full Swiss Travel Pass for unlimited train, bus, and boat journeys",
      "Jungfraujoch Top of Europe roundtrip train tickets",
      "Mount Titlis cable car & suspension bridge passes",
      "Lake Lucerne boat cruise tickets",
    ],
    exclusions: ["International airfare", "Schengen Visa fees", "Personal expenses", "Travel insurance"],
    hotelName: "Hotel Schweizerhof Lucerne & Victoria-Jungfrau Grand Hotel",
    hotelStars: 5,
    hotelRoom: "Alpine View Superior Room",
    hotelAmenities: ["Heated Indoor Pool", "Luxury Alpine Spa", "Fine Dining", "Panoramic Balcony", "Free Wi-Fi"],
  },
  "dubai-luxury-desert": {
    overview:
      "Discover the glamorous crossroads of futuristic architecture and golden desert dunes. Enjoy high-floor access to Burj Khalifa, luxury Marina yacht cruises, and a private desert safari with dune bashing, camel rides, and sunset BBQ.",
    highlights: [
      "At The Top, Burj Khalifa 124th & 125th Floor observation deck entry",
      "Luxury desert 4x4 dune bashing safari with sunset BBQ dinner and live Tanoura show",
      "Private 2-hour sunset yacht cruise around Dubai Marina and Atlantis The Palm",
      "Old Dubai Abra boat ride, Gold Souk, and Spice Souk walking tour",
      "Stay in prestigious 5-star Dubai Marina hotel with rooftop infinity pool",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dubai & Private Chauffeur Transfer",
        description: "Arrive at Dubai International Airport (DXB). Meet your private chauffeur and check in to your luxury Marina hotel.",
        meals: "Dinner Included",
        stay: "Address Dubai Marina / JW Marriott Marquis",
        activities: ["Airport VIP Transfer", "Marina Walk"],
      },
      {
        day: 2,
        title: "Burj Khalifa At The Top & Dubai Mall Fountain Show",
        description: "Visit Dubai Mall, ascend Burj Khalifa to the 124th floor for 360-degree skyline views, and watch the synchronized Dubai Fountain show.",
        meals: "Breakfast & Dinner",
        stay: "Address Dubai Marina",
        activities: ["Burj Khalifa Tickets", "Dubai Mall", "Fountain Show"],
      },
      {
        day: 3,
        title: "Desert 4x4 Safari, Dune Bashing & Bedouin BBQ Camp",
        description: "Afternoon desert safari in a Land Cruiser. Thrilling dune bashing, sandboarding, camel rides, and a 5-star BBQ dinner with fire dancers.",
        meals: "Breakfast & Desert BBQ Dinner",
        stay: "Bab Al Shams Desert Resort / Address Marina",
        activities: ["Dune Bashing", "Camel Riding", "BBQ Dinner Show"],
      },
      {
        day: 4,
        title: "Old Dubai Heritage, Gold Souk & Marina Sunset Yacht Cruise",
        description: "Explore Al Fahidi historical district, cross Dubai Creek on a wooden Abra, and cruise the Marina on a private luxury yacht.",
        meals: "Breakfast & Dinner",
        stay: "Address Dubai Marina",
        activities: ["Old Dubai Tour", "Gold & Spice Souk", "Marina Yacht Cruise"],
      },
      {
        day: 5,
        title: "Leisure Shopping & Departure Transfer",
        description: "Relax by the pool or enjoy duty-free shopping before private chauffeur transfer to DXB Airport.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Airport Drop-off"],
      },
    ],
    inclusions: [
      "4 Nights in 5-star luxury Dubai hotels",
      "Daily international breakfast and desert BBQ banquet",
      "Private luxury transfers in AC SUV throughout",
      "Burj Khalifa At The Top entry tickets",
      "Premium 4x4 Desert Safari with live cultural shows",
      "Dubai Marina yacht cruise experience",
    ],
    exclusions: ["International flights", "UAE Visa fees", "Tourism Dirham fee (approx. $5/night)", "Personal expenses"],
    hotelName: "Address Dubai Marina & Bab Al Shams Desert Resort",
    hotelStars: 5,
    hotelRoom: "Marina View Executive Suite",
    hotelAmenities: ["Rooftop Infinity Pool", "Private Beach Club Access", "Spa & Sauna", "Free Wi-Fi", "Concierge"],
  },
  "maldives-water-villa": {
    overview:
      "Escape to paradise on earth with this luxury all-inclusive overwater bungalow experience in the Maldives. Step directly from your private sun deck into crystal-clear turquoise lagoons teeming with manta rays and vibrant coral reefs.",
    highlights: [
      "4 Nights in a Premium Overwater Villa with direct lagoon access",
      "Roundtrip speedboat or seaplane transfers from Velana International Airport",
      "All-Inclusive dining: Unlimited gourmet meals, fine wines, and cocktails",
      "Guided coral reef snorkeling safari and dolphin sunset cruise",
      "Complimentary water sports (Kayaking, Stand-up paddleboarding, Snorkel gear)",
      "60-minute holistic couples massage at the overwater spa pavilion",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Malé & Seaplane Flight to Resort Island",
        description: "Arrive at Velana International Airport (MLE). Board a scenic seaplane flight over atolls. Check into your private Overwater Villa.",
        meals: "All-Inclusive Dinner & Drinks",
        stay: "Centara Grand Island Resort & Spa / Adaaran Prestige Vadoo",
        activities: ["Seaplane Transfer", "Champagne Check-in", "Sunset Deck Viewing"],
      },
      {
        day: 2,
        title: "Lagoon Snorkeling & Overwater Spa Therapy",
        description: "Step right from your villa deck into the turquoise house reef. Afternoon rejuvenating spa treatment at the overwater pavilion.",
        meals: "All-Inclusive (Breakfast, Lunch, Dinner, Drinks)",
        stay: "Overwater Villa",
        activities: ["House Reef Snorkeling", "Couples Spa Therapy"],
      },
      {
        day: 3,
        title: "Dolphin Watching Sunset Cruise & Starlit Dining",
        description: "Spend the day kayaking in calm lagoons. At dusk, board a traditional Maldivian Dhoni for a sunset cruise with wild spinner dolphins.",
        meals: "All-Inclusive Dining & Sunset Cocktails",
        stay: "Overwater Villa",
        activities: ["Paddleboarding", "Sunset Dolphin Cruise", "Beach BBQ"],
      },
      {
        day: 4,
        title: "Private Sandbank Picnic & Coral Conservation Tour",
        description: "Boat excursion to a secluded private sandbank for a chef-prepared picnic. Join the marine biologist on a coral planting session.",
        meals: "All-Inclusive Dining",
        stay: "Overwater Villa",
        activities: ["Sandbank Excursion", "Marine Biology Tour"],
      },
      {
        day: 5,
        title: "Farewell Maldives & Seaplane Transfer to Airport",
        description: "Enjoy a floating breakfast in your private pool before seaplane transfer back to Malé for your flight home.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Seaplane Return Transfer"],
      },
    ],
    inclusions: [
      "4 Nights in 5-star Overwater Villa with private sun terrace",
      "All-Inclusive Dine-Around Plan (all meals, snacks, premium wines & spirits)",
      "Roundtrip scenic seaplane / speedboat transfers from Malé Airport",
      "Guided dolphin watching sunset cruise with champagne",
      "Free non-motorized water sports (Kayak, Paddleboard, Snorkeling gear)",
      "Green Tax and government service charges included",
    ],
    exclusions: ["International flights to Malé", "Motorized water sports (Jet Ski, Seabob)", "Travel insurance"],
    hotelName: "Centara Grand Island Resort & Overwater Sanctuary",
    hotelStars: 5,
    hotelRoom: "Sunset Overwater Pool Villa",
    hotelAmenities: ["Direct Lagoon Access", "Private Plunge Pool", "Overwater Spa", "Free Wi-Fi", "Butler Service"],
  },
};

export function getPackageDetails(id: string): (TourPackage & PackageDetailedInfo) | null {
  if (!id) return null;

  const normalizedId = id.trim().toLowerCase();

  // 1. Direct match by exact ID
  let basePkg = initialTourPackages.find((p) => p.id.toLowerCase() === normalizedId);

  // 2. Numeric index match (e.g. /tour-packages/1)
  if (!basePkg) {
    const num = parseInt(normalizedId, 10);
    if (!isNaN(num) && num >= 1 && num <= initialTourPackages.length) {
      basePkg = initialTourPackages[num - 1];
    }
  }

  // 3. Substring match by destination or slug
  if (!basePkg) {
    basePkg = initialTourPackages.find(
      (p) =>
        p.id.toLowerCase().includes(normalizedId) ||
        normalizedId.includes(p.id.toLowerCase()) ||
        p.destination.toLowerCase().includes(normalizedId) ||
        normalizedId.includes(p.destination.toLowerCase())
    );
  }

  // 4. Default fallback to first package so it never fails
  if (!basePkg) {
    basePkg = initialTourPackages[0];
  }

  const defaultDetails: PackageDetailedInfo = {
    overview:
      basePkg.description +
      " Handcrafted by KrikoTrip's certified travel specialists to deliver seamless comfort, personalized sightseeing, and unforgettable memories.",
    highlights: [
      `Complete ${basePkg.duration} guided holiday experience in ${basePkg.location}`,
      "Handpicked 4-star and 5-star luxury accommodation with daily gourmet breakfast",
      "Private AC transport for all airport and sightseeing transfers",
      "Certified multilingual tour guide and 24/7 on-ground assistance",
      "All major monument entry fees and island permits included",
    ],
    itinerary: Array.from({ length: basePkg.days }).map((_, idx) => ({
      day: idx + 1,
      title:
        idx === 0
          ? `Arrival in ${basePkg.location} & Warm Welcome`
          : idx === basePkg.days - 1
          ? `Farewell ${basePkg.location} & Departure Transfer`
          : `Explore Highlights of ${basePkg.location} - Day ${idx + 1}`,
      description:
        idx === 0
          ? `Arrive at the destination airport where our executive will receive you and transfer you to your hotel. Relax and enjoy a welcome dinner.`
          : idx === basePkg.days - 1
          ? `Enjoy a hearty breakfast at your hotel before checking out. Private chauffeur transfer to the airport for your onward journey.`
          : `Full-day guided sightseeing of scenic landmarks, local cultural attractions, and authentic cuisine experiences with our private guide.`,
      meals: idx === basePkg.days - 1 ? "Breakfast Included" : "Breakfast & Dinner Included",
      stay: `Luxury Resort ${basePkg.location}`,
      activities: [`Day ${idx + 1} Sightseeing`, "Private Transfer"],
    })),
    inclusions: [
      `${basePkg.nights} Nights accommodation in top-rated verified luxury hotels`,
      "Daily buffet breakfast and chef-prepared dinner",
      "Private AC vehicle for all transfers and sightseeing",
      "All toll taxes, parking fees, and driver allowances",
      "24/7 dedicated ground support from KrikoTrip",
    ],
    exclusions: [
      "Domestic and international flight tickets",
      "Personal expenses, laundry, telephone, and minibar",
      "Optional adventure sports and personal shopping",
      "Travel insurance",
    ],
    hotelName: `Grand Luxury Resort & Spa ${basePkg.location}`,
    hotelStars: 4,
    hotelRoom: "Deluxe Ocean/Garden View Room",
    hotelAmenities: ["Swimming Pool", "Spa & Wellness", "Free Wi-Fi", "Multi-Cuisine Restaurant", "Fitness Center"],
  };

  const detailed = detailedInfoMap[id] || defaultDetails;

  return {
    ...basePkg,
    ...detailed,
  };
}

