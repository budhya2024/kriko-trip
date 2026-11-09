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
  "kashmir-valley-paradise": {
    overview:
      "Experience paradise on earth with our premier Kashmir holiday. Stay in traditional hand-carved luxury houseboats on Dal Lake, take the scenic gondola ride to snow-capped Apharwat Peak in Gulmarg, and walk through the fragrant pine valleys of Pahalgam.",
    highlights: [
      "Luxury carved cedarwood houseboat stay on Dal Lake with morning Shikara ride",
      "Gulmarg Gondola cable car tickets to Phase 1 & Phase 2 snow peaks",
      "Pahalgam excursion visiting Betaab Valley, Aru Valley, and Lidder River",
      "Mughal Gardens of Srinagar: Shalimar Bagh, Nishat Bagh, and Chashme Shahi",
      "Private heated AC Innova/Crysta vehicle for all mountain transfers",
      "Daily gourmet Kashmiri Wazwan and multi-cuisine buffet meals",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Srinagar & Sunset Shikara Ride on Dal Lake",
        description: "Arrive at Srinagar Sheikh-ul-Alam International Airport. Warm traditional Kashmiri welcome with Kehwa tea. Check in to your luxury carved cedarwood Houseboat. In the evening, enjoy a private Shikara cruise across the floating gardens and lotus lakes.",
        meals: "Dinner Included",
        stay: "Mascot Luxury Houseboats, Dal Lake",
        activities: ["Airport Welcome", "Dal Lake Shikara Cruise", "Floating Market"],
      },
      {
        day: 2,
        title: "Srinagar to Gulmarg Meadow of Flowers & Gondola Ride",
        description: "Scenic morning drive past apple orchards to Gulmarg (2,730m). Board the world-famous Gulmarg Gondola up to Apharwat Peak. Enjoy snow activities, skiing, and breathtaking views of Nanga Parbat.",
        meals: "Breakfast & Dinner Included",
        stay: "The Khyber Himalayan Resort & Spa, Gulmarg",
        activities: ["Gondola Cable Car Phase 1 & 2", "Snow Activities", "Golf Course Walk"],
      },
      {
        day: 3,
        title: "Gulmarg to Pahalgam Valley of Shepherds via Saffron Fields",
        description: "Drive through Pampore saffron fields and Awantipora ruins to picturesque Pahalgam along the roaring Lidder River. Check in to your pine-forest riverside resort.",
        meals: "Breakfast & Dinner Included",
        stay: "Pahalgam Hotel / Pine N Peak Resort",
        activities: ["Saffron Fields Visit", "Lidder River Walk", "Pine Forest Trail"],
      },
      {
        day: 4,
        title: "Excursion to Betaab Valley, Aru Valley & Chandanwari",
        description: "Board local union taxis to explore the breathtaking alpine meadows of Betaab Valley (named after the Bollywood classic) and the pristine wilderness of Aru Valley.",
        meals: "Breakfast & Dinner Included",
        stay: "Pahalgam Hotel / Pine N Peak Resort",
        activities: ["Betaab Valley", "Aru Valley", "Chandanwari Nature Walk"],
      },
      {
        day: 5,
        title: "Return to Srinagar & Historic Mughal Gardens Exploration",
        description: "Return to Srinagar. Visit the grand terraced Mughal Gardens: Nishat Bagh (Garden of Bliss) and Shalimar Bagh (Abode of Love). Explore Lal Chowk for authentic Pashmina shawls, saffron, and walnut wood crafts.",
        meals: "Breakfast & Special Wazwan Dinner",
        stay: "The Lalit Grand Palace Srinagar",
        activities: ["Mughal Gardens Tour", "Pashmina & Saffron Shopping", "Farewell Wazwan Dinner"],
      },
      {
        day: 6,
        title: "Farewell Kashmir & Airport Departure Transfer",
        description: "Enjoy a leisurely morning breakfast overlooking the Zabarwan Mountains before private transfer to Srinagar Airport with cherished memories.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Airport Drop-off"],
      },
    ],
    inclusions: [
      "5 Nights accommodation in 4/5-star luxury resorts and premium Dal Lake houseboat",
      "Daily buffet breakfast and chef-crafted dinner including traditional Wazwan",
      "All airport and sightseeing transfers in private AC vehicle",
      "Private 1-hour sunset Shikara ride on Dal Lake",
      "Toll taxes, parking fees, and driver allowances",
      "24/7 dedicated on-ground KrikoTrip tour coordinator",
    ],
    exclusions: [
      "Domestic airfare to/from Srinagar",
      "Gondola cable car ride tickets (can be pre-booked on request)",
      "Pony rides and personal sledging charges",
      "Travel insurance",
    ],
    hotelName: "The Lalit Grand Palace Srinagar & The Khyber Gulmarg",
    hotelStars: 5,
    hotelRoom: "Heritage Mountain View Suite",
    hotelAmenities: ["Heated Swimming Pool", "Ayurvedic Spa", "Free Wi-Fi", "Mughal Fine Dining", "Mountain View Lawn"],
  },
  "kerala-backwaters-munnar": {
    overview:
      "Immerse yourself in God's Own Country with mist-covered tea estates in Munnar, aromatic cardamom hills in Thekkady, and a private luxury houseboat cruise gliding through the emerald backwaters of Alleppey.",
    highlights: [
      "2 Nights in Munnar tea hills + 1 Night in Thekkady + 2 Nights in Alleppey private houseboat",
      "Visit Eravikulam National Park home of the endangered Nilgiri Tahr",
      "Private luxury backwater cruise with onboard personal chef serving fresh Karimeen fish",
      "Spice plantation guided walk and traditional Periyar boat safari",
      "Live authentic Kathakali dance and Kalaripayattu martial arts show",
      "Complimentary Ayurvedic herbal rejuvenation massage session",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cochin & Scenic Drive to Munnar Tea Country",
        description: "Arrive at Cochin International Airport. Meet your private chauffeur and drive past rubber plantations and Cheeyappara waterfalls up into the misty Western Ghats to Munnar.",
        meals: "Dinner Included",
        stay: "Fragrant Nature Munnar / Blanket Luxury Resort",
        activities: ["Airport Welcome", "Cheeyappara Waterfalls", "Tea Garden Drive"],
      },
      {
        day: 2,
        title: "Eravikulam National Park, Mattupetty Dam & Tea Museum",
        description: "Morning visit to Eravikulam National Park (Rajamalai). Tour the Tata Tea Museum to learn the art of tea crafting, followed by boating at Mattupetty Dam and Echo Point.",
        meals: "Breakfast & Dinner Included",
        stay: "Fragrant Nature Munnar",
        activities: ["Eravikulam Park", "Tea Museum", "Mattupetty Boating", "Echo Point"],
      },
      {
        day: 3,
        title: "Munnar to Thekkady Spice Hills & Periyar Lake Safari",
        description: "Scenic mountain drive to Thekkady. Tour an organic spice plantation smelling fresh cardamom, cinnamon, and pepper. In the evening, watch a traditional Kalaripayattu martial arts performance.",
        meals: "Breakfast & Dinner Included",
        stay: "Elephant Court / Spice Village Thekkady",
        activities: ["Spice Plantation Tour", "Periyar Lake Boat Safari", "Kalaripayattu Show"],
      },
      {
        day: 4,
        title: "Thekkady to Alleppey & Boarding Private Luxury Houseboat",
        description: "Drive down to Alleppey. At noon, step aboard your private luxury Kettuvallam (Houseboat). Cruise past palm-fringed canals, paddy fields, and coir-making villages while your private chef prepares traditional Kerala meals.",
        meals: "Lunch, Evening High Tea & Grand Candlelight Dinner",
        stay: "Luxury AC Premium Houseboat, Alleppey",
        activities: ["Houseboat Check-in", "Backwater Cruise", "Sunset Village Walk", "Karimeen Fish Dinner"],
      },
      {
        day: 5,
        title: "Alleppey Backwater Serenity & Ayurvedic Spa Treatment",
        description: "Wake up to serene backwater birdsong. Disembark from the houseboat and check in to a luxury lake resort. Enjoy an authentic 60-minute Ayurvedic Abhyanga herbal massage.",
        meals: "Breakfast & Dinner Included",
        stay: "Kumarakom Lake Resort / Marari Beach Resort",
        activities: ["Backwater Leisure", "Ayurvedic Spa Massage", "Sunset Infinity Pool"],
      },
      {
        day: 6,
        title: "Transfer to Cochin & Heritage Fort Kochi Tour - Departure",
        description: "After breakfast, transfer to Fort Kochi. Visit historic Chinese Fishing Nets, St. Francis Church, and Jewish Synagogue before airport drop-off.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Fort Kochi Heritage Tour", "Chinese Fishing Nets", "Airport Transfer"],
      },
    ],
    inclusions: [
      "5 Nights accommodation in 4/5-star tea resorts, spice lodges, and private AC houseboat",
      "Full Board on Houseboat (Lunch, High Tea, Dinner, Breakfast) + Daily buffet meals",
      "Private AC luxury sedan/SUV with experienced local chauffeur throughout",
      "Organic spice plantation entry and guided walk",
      "Traditional Kalaripayattu martial arts show tickets",
      "All toll taxes, parking fees, and driver allowances",
    ],
    exclusions: ["Flight tickets to/from Cochin", "Camera tickets at national parks", "Personal laundry and beverages"],
    hotelName: "Fragrant Nature Munnar & Kumarakom Lake Resort",
    hotelStars: 5,
    hotelRoom: "Valley View Luxury Cottage",
    hotelAmenities: ["Ayurvedic Wellness Spa", "Infinity Pool", "Free Wi-Fi", "Traditional Restaurant", "Tea Estate Lawn"],
  },
  "rajasthan-royal-heritage": {
    overview:
      "Journey through the royal kingdom of Rajasthan. Marvel at the imposing Amber Fort in Jaipur, the majestic Mehrangarh Fort rising above the blue city of Jodhpur, and fairy-tale boat rides on Lake Pichola in Udaipur.",
    highlights: [
      "2 Nights Jaipur (Pink City) + 2 Nights Jodhpur (Blue City) + 2 Nights Udaipur (City of Lakes)",
      "Amber Fort jeep safari and private tour of the City Palace & Hawa Mahal in Jaipur",
      "Mehrangarh Fort private guided tour and Umaid Bhawan Palace in Jodhpur",
      "Exclusive sunset boat cruise on Lake Pichola past Jag Mandir in Udaipur",
      "Traditional Rajasthani cultural folk dance and Kalbeliya musical dinner",
      "Stays in authentic converted heritage palaces and luxury boutique havelis",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jaipur (The Pink City) & Chokhi Dhani Cultural Night",
        description: "Arrive at Jaipur International Airport. Traditional garland welcome and check in to your heritage hotel. In the evening, visit Chokhi Dhani ethnic resort for authentic camel rides, puppet shows, and royal Rajasthani Thali.",
        meals: "Dinner Included",
        stay: "ITC Rajputana / Alsisar Haveli, Jaipur",
        activities: ["Royal Garland Welcome", "Chokhi Dhani Ethnic Evening"],
      },
      {
        day: 2,
        title: "Amber Fort, Hawa Mahal & Jantar Mantar Observatory",
        description: "Ascend Amber Fort by jeep. Tour the dazzling Sheesh Mahal (Mirror Palace). In the afternoon, photograph the iconic honeycomb Hawa Mahal (Palace of Winds) and City Palace.",
        meals: "Breakfast & Dinner Included",
        stay: "ITC Rajputana / Alsisar Haveli, Jaipur",
        activities: ["Amber Fort Jeep Safari", "Sheesh Mahal", "Hawa Mahal", "City Palace"],
      },
      {
        day: 3,
        title: "Jaipur to Jodhpur via Pushkar Brahma Temple & Holy Lake",
        description: "Drive to Jodhpur with a stop at sacred Pushkar. Visit the rare 14th-century Lord Brahma Temple and holy Pushkar Lake. Arrive in Jodhpur and see the blue-painted old town.",
        meals: "Breakfast & Dinner Included",
        stay: "Ajit Bhawan Heritage Palace / Welcomhotel Jodhpur",
        activities: ["Pushkar Lake Visit", "Brahma Temple", "Blue City Sunset Walk"],
      },
      {
        day: 4,
        title: "Mighty Mehrangarh Fort, Jaswant Thada & Clock Tower Bazaar",
        description: "Explore the towering ramparts of Mehrangarh Fort with sweeping panoramas of the Blue City. Visit Jaswant Thada royal marble cenotaphs and shop for Jodhpuri juttis and spices at Sardar Market.",
        meals: "Breakfast & Dinner Included",
        stay: "Ajit Bhawan Heritage Palace",
        activities: ["Mehrangarh Fort Tour", "Jaswant Thada", "Sardar Market Bazaar"],
      },
      {
        day: 5,
        title: "Jodhpur to Udaipur via Ranakpur 1,444 Marble Pillar Jain Temple",
        description: "Drive through the Aravalli hills to Udaipur. En route, explore the breathtaking 15th-century Ranakpur Jain Temple, famous for its 1,444 uniquely hand-carved marble pillars. Arrive in the romantic lake city of Udaipur.",
        meals: "Breakfast & Dinner Included",
        stay: "Fateh Garh Heritage Resort / Trident Udaipur",
        activities: ["Ranakpur Marble Temple", "Aravalli Mountain Drive", "Lake City Check-in"],
      },
      {
        day: 6,
        title: "Udaipur City Palace, Saheliyon Ki Bari & Lake Pichola Cruise",
        description: "Tour the grand Udaipur City Palace complex overlooking Lake Pichola. Visit Saheliyon-ki-Bari (Courtyard of Maidens). In the late afternoon, enjoy an exclusive private boat ride on Lake Pichola with sunset views of Taj Lake Palace.",
        meals: "Breakfast & Royal Farewell Dinner",
        stay: "Trident Udaipur",
        activities: ["City Palace Guided Tour", "Saheliyon Ki Bari", "Lake Pichola Sunset Boat Cruise"],
      },
      {
        day: 7,
        title: "Farewell Rajasthan & Udaipur Airport Departure",
        description: "Enjoy a royal breakfast overlooking the lake before private transfer to Maharana Pratap Airport Udaipur for your flight home.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Airport Drop-off"],
      },
    ],
    inclusions: [
      "6 Nights accommodation in luxury 4/5-star heritage hotels and royal havelis",
      "Daily royal buffet breakfast and multi-cuisine dinners",
      "Private AC luxury vehicle for all city tours and inter-city royal highway transfers",
      "Private boat cruise on Lake Pichola in Udaipur",
      "Amber Fort jeep ride in Jaipur",
      "All monument entry tickets and guided heritage walks",
    ],
    exclusions: ["Airfare to Jaipur and from Udaipur", "Camera tickets at palaces", "Personal expenses"],
    hotelName: "ITC Rajputana Jaipur & Trident Lake Resort Udaipur",
    hotelStars: 5,
    hotelRoom: "Heritage Royal Palace Room",
    hotelAmenities: ["Royal Palace Architecture", "Swimming Pool", "Spa & Wellness", "Free Wi-Fi", "Rooftop Restaurant"],
  },
  "goa-beach-bliss": {
    overview:
      "Unwind in India's beach capital. Experience sun-drenched golden sands in Calangute and Candolim, sunset luxury cruises on the Mandovi River, historic UNESCO churches in Old Goa, and secluded beachfront resort relaxation in South Goa.",
    highlights: [
      "3 Nights in vibrant North Goa beachfront resort + 2 Nights in peaceful South Goa 5-star haven",
      "Mandovi River luxury sunset catamaran cruise with live Goan folk dance and DJ",
      "Old Goa UNESCO heritage trail: Basilica of Bom Jesus and Se Cathedral",
      "Excursion to Dudhsagar Waterfalls and Sahakari Spice Farm with traditional Goan lunch",
      "Exciting beach water sports: Parasailing, Jet Skiing, and Banana boat rides in Baga",
      "Complimentary beach shack candlelight dinner with fresh seafood and Goan feni",
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome to Goa & North Goa Beachfront Check-in",
        description: "Arrive at Manohar International Airport (MOPA) or Dabolim Airport. Private AC transfer to your beachfront resort in North Goa. Relax by the pool or stroll on Calangute Beach at sunset.",
        meals: "Dinner Included",
        stay: "Novotel Goa Candolim / Taj Holiday Village",
        activities: ["Airport Welcome", "Calangute Beach Walk", "Sunset Cocktails"],
      },
      {
        day: 2,
        title: "North Goa Fort Aguada, Baga Beach & Watersports",
        description: "Visit the 17th-century Portuguese Fort Aguada and its historic lighthouse. Head to Baga Beach for thrilling water sports including Parasailing and Jet Skiing.",
        meals: "Breakfast & Dinner Included",
        stay: "Novotel Goa Candolim",
        activities: ["Fort Aguada", "Baga Watersports", "Anjuna Flea Market"],
      },
      {
        day: 3,
        title: "UNESCO Old Goa Heritage Churches & Mandovi Sunset Cruise",
        description: "Explore the sacred Basilica of Bom Jesus (housing the relics of St. Francis Xavier) and Se Cathedral in Old Goa. In the evening, board a luxury cruise on the Mandovi River with live music and Goan folk dances.",
        meals: "Breakfast & Dinner Included",
        stay: "Novotel Goa Candolim",
        activities: ["Old Goa Churches", "Mandovi River Cruise", "Latin Quarter Fontainhas Walk"],
      },
      {
        day: 4,
        title: "Transfer to South Goa Luxury Resort via Dudhsagar Waterfalls",
        description: "Jeep safari through Mollem National Park to the roaring 4-tiered Dudhsagar Waterfalls. Tour an organic spice plantation with traditional Goan buffet lunch. Transfer to your peaceful 5-star South Goa resort.",
        meals: "Breakfast, Spice Lunch & Dinner",
        stay: "ITC Grand Goa Resort & Spa / Taj Exotica",
        activities: ["Dudhsagar Jeep Safari", "Spice Farm Buffet", "South Goa Check-in"],
      },
      {
        day: 5,
        title: "South Goa Secluded Beaches (Palolem & Colva) & Candlelight Dinner",
        description: "Spend a relaxing day on the crescent-shaped golden sands of Palolem Beach and Colva. In the evening, enjoy a romantic private beach candlelight dinner with fresh seafood.",
        meals: "Breakfast & Candlelight Seafood Dinner",
        stay: "ITC Grand Goa Resort & Spa",
        activities: ["Palolem Beach", "Ayurvedic Spa Treatment", "Beach Candlelight Dinner"],
      },
      {
        day: 6,
        title: "Leisure Morning & Airport Departure Transfer",
        description: "Enjoy a leisurely tropical breakfast overlooking the Arabian Sea before private chauffeur transfer to the airport.",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Airport Transfer"],
      },
    ],
    inclusions: [
      "5 Nights accommodation in 4/5-star beachfront luxury resorts in North & South Goa",
      "Daily buffet breakfast, spice plantation grand lunch, and chef dinners",
      "Private AC vehicle for all transfers and sightseeing tours",
      "Mandovi River sunset cruise tickets",
      "Dudhsagar Waterfalls jeep safari and entry permits",
      "All driver charges, toll taxes, and parking fees",
    ],
    exclusions: ["Flight tickets to/from Goa", "Motorized water sports fees", "Personal laundry and alcoholic beverages"],
    hotelName: "Taj Holiday Village North Goa & ITC Grand Goa South",
    hotelStars: 5,
    hotelRoom: "Sea View Deluxe Beach Villa",
    hotelAmenities: ["Direct Beach Access", "Multiple Swimming Pools", "Ayurvedic Spa", "Beachfront Restaurant", "Free Wi-Fi"],
  },
  "himachal-manali-shimla": {
    overview:
      "Journey into the heart of the Himalayas across Himachal Pradesh. Experience the British colonial charm of Shimla, pine-scented mountain passes, the thrill of Solang Valley adventures, and serene hot sulfur springs of Manali.",
    highlights: [
      "Drive through the engineering marvel of Atal Tunnel into Lahaul Valley",
      "Panoramic views of Himalayan peaks from Kufri and Shimla Ridge",
      "Trek to ancient wooden Hadimba Temple surrounded by cedar forests",
      "River rafting and paragliding thrill over the foaming Beas River",
    ],
    itinerary: [
      {
        day: 1,
        title: "Chandigarh to Shimla – Scenic Foothills Ascent",
        description: "Pick-up from Chandigarh airport/station. Drive through the picturesque Shivalik foothills as the temperature cools. Arrive in Shimla and check into your luxury mountain resort.",
        transport: "Private Luxury SUV / Sedan",
        meals: "Dinner Included",
        stay: "The Oberoi Cecil / Radisson Shimla",
        activities: ["Scenic Foothills Drive", "Evening Mall Road Stroll", "Welcome Dinner"],
      },
      {
        day: 2,
        title: "Shimla & Kufri Excursion – High Alpine Vistas",
        description: "Ascend to Kufri for panoramic snow-clad Himalayan views, nature park visits, and pony rides. Afternoon tour of Shimla's historic Mall Road, Christ Church, and the Ridge.",
        transport: "Private Mountain Vehicle",
        meals: "Breakfast & Dinner",
        stay: "The Oberoi Cecil / Radisson Shimla",
        activities: ["Kufri Viewpoint", "Christ Church", "The Ridge Walk", "Lakkar Bazaar"],
      },
      {
        day: 3,
        title: "Shimla to Manali via Kullu Valley & River Beas",
        description: "Spectacular valley drive through Sundernagar Lake, Pandoh Dam, and Kullu Valley. Stop for Kullu shawl showroom visits and river rafting before arriving in Manali.",
        transport: "Private Mountain Vehicle",
        meals: "Breakfast & Dinner",
        stay: "ManuAllaya Resort / Span Resort Manali",
        activities: ["Kullu Valley Drive", "River Rafting Option", "Valley Photography"],
      },
      {
        day: 4,
        title: "Solang Valley & Atal Tunnel – Snow & Adventure Thrills",
        description: "Full day excursion to Solang Valley for paragliding, zorbing, and quad biking. Drive through the famous Atal Tunnel to behold the stark beauty of Sissu waterfall.",
        transport: "Private 4x4 / Mountain SUV",
        meals: "Breakfast & Dinner",
        stay: "ManuAllaya Resort / Span Resort Manali",
        activities: ["Atal Tunnel Crossing", "Sissu Waterfall", "Solang Paragliding", "Snow Activities"],
      },
      {
        day: 5,
        title: "Manali Local Sightseeing & Old Manali Cafes",
        description: "Explore the 500-year-old wooden Hadimba Temple nestled in Dhungri pine forest. Visit Manu Temple, Vashisht sulfur baths, and bohemian Old Manali riverside cafes.",
        transport: "Private City Cab",
        meals: "Breakfast & Dinner",
        stay: "ManuAllaya Resort / Span Resort Manali",
        activities: ["Hadimba Temple", "Vashisht Hot Springs", "Old Manali Cafes", "Tibetan Monastery"],
      },
      {
        day: 6,
        title: "Departure to Chandigarh – Fond Himalayan Farewells",
        description: "After breakfast, check out from the resort and drive down to Chandigarh with unforgettable memories of the snowy peaks of Himachal.",
        transport: "Private Luxury SUV",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Scenic Downhill Drive", "Airport / Railway Drop"],
      },
    ],
    inclusions: [
      "5 Nights accommodation in premier 4/5-star mountain view resorts",
      "Daily breakfast and multi-course chef dinners",
      "Dedicated AC vehicle with experienced hill chauffeur",
      "Sightseeing tours in Shimla, Kufri, Kullu, Manali, and Solang Valley",
      "Permits and toll charges for Atal Tunnel route",
    ],
    exclusions: ["Adventure sports fees (paragliding, rafting)", "Flight / train tickets", "Personal tips and heater charges"],
    hotelName: "The Oberoi Cecil & ManuAllaya Resort Manali",
    hotelStars: 5,
    hotelRoom: "Valley View Luxury Suite",
    hotelAmenities: ["Heated Swimming Pool", "Cedar Forest Spa", "Mountain View Balcony", "Fireplace Lounge", "Wi-Fi"],
  },
  "leh-ladakh-adventure": {
    overview:
      "Journey to the roof of the world across Ladakh's moonscapes, sapphire high-altitude lakes, ancient Buddhist gompas, and dizzying Himalayan mountain passes.",
    highlights: [
      "Marvel at the color-changing waters of Pangong Tso Lake",
      "Cross Khardung La Pass at 18,380 ft – one of the world's highest motorable roads",
      "Ride double-humped Bactrian camels amid the white sand dunes of Hunder",
      "Spin prayer wheels at the centuries-old cliffside Thiksey Monastery",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Leh – Acclimatization & Shanti Stupa",
        description: "Arrive at Kushok Bakula Rimpochee Airport Leh (11,562 ft). Transfer to hotel for mandatory complete rest and high-altitude acclimatization. Evening sunset visit to Shanti Stupa.",
        transport: "Private Airport Pickup SUV",
        meals: "Lunch & Dinner Included",
        stay: "The Grand Dragon Ladakh / Zen Resort",
        activities: ["High Altitude Rest", "Sunset at Shanti Stupa", "Leh Main Bazaar"],
      },
      {
        day: 2,
        title: "Sham Valley Excursion – Magnetic Hill & Sangam",
        description: "Scenic drive along the Indus River. Witness the gravity-defying phenomenon at Magnetic Hill, the sacred Gurudwara Pathar Sahib, and the confluence of Indus and Zanskar rivers.",
        transport: "Private 4x4 Mountain SUV",
        meals: "Breakfast & Dinner",
        stay: "The Grand Dragon Ladakh",
        activities: ["Magnetic Hill", "Indus-Zanskar Sangam", "Gurudwara Pathar Sahib", "Hall of Fame"],
      },
      {
        day: 3,
        title: "Leh to Nubra Valley via Khardung La Pass (18,380 ft)",
        description: "Ascend the legendary Khardung La Pass for sweeping Himalayan views. Descend into Nubra Valley and explore Hunder sand dunes with double-humped Bactrian camel safaris.",
        transport: "Private 4x4 Expedition Vehicle",
        meals: "Breakfast & Dinner",
        stay: "Luxury Deluxe Camps Hunder",
        activities: ["Khardung La Crossing", "Diskit Monastery Giant Buddha", "Bactrian Camel Ride"],
      },
      {
        day: 4,
        title: "Nubra Valley to Pangong Tso Lake via Shyok Route",
        description: "Spectacular off-road expedition tracing the Shyok River gorge directly to the turquoise blue waters of Pangong Tso (14,270 ft). Watch the lake change hues before sunset.",
        transport: "Private 4x4 Expedition Vehicle",
        meals: "Breakfast & Dinner",
        stay: "Pangong Luxury Swiss Cottage Camps",
        activities: ["Shyok River Valley Drive", "Pangong Sunset Walk", "Stargazing under Milky Way"],
      },
      {
        day: 5,
        title: "Pangong Sunrise to Leh via Chang La Pass (17,590 ft)",
        description: "Wake early for golden dawn light dancing over Pangong Lake. Return drive to Leh conquering Chang La Pass, visiting the stunning Thiksey Monastery on the return route.",
        transport: "Private 4x4 Mountain SUV",
        meals: "Breakfast & Dinner",
        stay: "The Grand Dragon Ladakh",
        activities: ["Sunrise Photography", "Chang La Crossing", "Thiksey Monastery Tour"],
      },
      {
        day: 6,
        title: "Leh Heritage & Departure from the Himalayas",
        description: "Morning farewell to Leh. Transfer to Leh airport for your flight back over the snowy Karakoram and Himalayan peaks.",
        transport: "Private Airport Drop Cab",
        meals: "Breakfast Included",
        stay: "Check-out",
        activities: ["Airport Transfer", "Mountain Aerial Views"],
      },
    ],
    inclusions: [
      "5 Nights luxury hotel & deluxe glamping accommodation",
      "Daily breakfast and hot Tibetan/Indian dinners",
      "Dedicated 4x4 SUV with experienced mountain chauffeur and oxygen cylinders",
      "Inner Line Permits (ILP) for Nubra Valley and Pangong Lake",
      "Wildlife and ecology conservation fees",
    ],
    exclusions: ["Airfare to/from Leh", "Camel ride & monastery camera fees", "Personal mountain gear"],
    hotelName: "The Grand Dragon Ladakh & Pangong Swiss Camps",
    hotelStars: 5,
    hotelRoom: "Heritage Mountain View Suite",
    hotelAmenities: ["Central Heating", "In-Room Oxygen Facility", "Panoramic Sun Terraces", "Doctor on Call", "Wi-Fi"],
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

