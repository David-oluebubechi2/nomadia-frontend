import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";

type Destination = {
  id: string;
  name: string;
  country: string;
  region: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  travelers: string;
};

type Tour = {
  id: number;
  title: string;
  location: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
};

const destinations: Destination[] = [
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    category: "Adventure",
    description:
      "Discover dramatic coastlines, iconic mountains, beautiful beaches, and vibrant city life.",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "2.4k",
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    category: "Culture",
    description:
      "Wander through colorful souks, historic palaces, peaceful gardens, and lively medinas.",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1400&q=85",
    rating: 4.8,
    travelers: "1.8k",
  },
  {
    id: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    region: "Africa",
    category: "Beach",
    description:
      "Relax on white-sand beaches and explore turquoise waters, spice farms, and historic Stone Town.",
    image:
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "1.6k",
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    region: "Africa",
    category: "Culture",
    description:
      "Step into ancient history and explore legendary monuments, museums, markets, and the Nile.",
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1400&q=85",
    rating: 4.7,
    travelers: "2.1k",
  },
  {
    id: "victoria-falls",
    name: "Victoria Falls",
    country: "Zimbabwe",
    region: "Africa",
    category: "Nature",
    description:
      "Experience one of the world's greatest natural wonders surrounded by spectacular wilderness.",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "1.2k",
  },
  {
    id: "mauritius",
    name: "Mauritius",
    country: "Mauritius",
    region: "Africa",
    category: "Beach",
    description:
      "Escape to tropical lagoons, lush mountains, coral reefs, and peaceful island beaches.",
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "1.5k",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    category: "Culture",
    description:
      "Experience ancient temples, traditional neighborhoods, peaceful gardens, and Japanese heritage.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "3.1k",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    category: "Nature",
    description:
      "Explore lush rice terraces, tropical forests, ancient temples, and beautiful beaches.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85",
    rating: 4.8,
    travelers: "3.8k",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    region: "Asia",
    category: "Culture",
    description:
      "Discover ornate temples, floating markets, incredible food, and the energy of modern Thailand.",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=85",
    rating: 4.7,
    travelers: "2.9k",
  },
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    region: "Asia",
    category: "Culture",
    description:
      "Combine royal palaces and traditional neighborhoods with modern architecture, food, and nightlife.",
    image:
      "https://images.unsplash.com/photo-1538485399081-7c8971e7f0f5?auto=format&fit=crop&w=1400&q=85",
    rating: 4.8,
    travelers: "2.7k",
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "Asia",
    category: "Beach",
    description:
      "Swim through crystal-clear lagoons and experience some of the world's most beautiful tropical islands.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "2.3k",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Asia",
    category: "Adventure",
    description:
      "Experience futuristic architecture, luxury shopping, desert adventures, and spectacular attractions.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=85",
    rating: 4.8,
    travelers: "3.5k",
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    category: "Beach",
    description:
      "Admire whitewashed villages, volcanic landscapes, blue-domed churches, and unforgettable sunsets.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "3.6k",
  },
  {
    id: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    category: "Beach",
    description:
      "Travel along dramatic cliffs, colorful coastal towns, hidden coves, and Mediterranean villages.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "2.8k",
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    category: "Culture",
    description:
      "Explore world-famous landmarks, charming streets, museums, cafés, and timeless French culture.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85",
    rating: 4.8,
    travelers: "4.2k",
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    region: "Europe",
    category: "Nature",
    description:
      "Discover snow-covered peaks, alpine villages, turquoise lakes, and breathtaking mountain scenery.",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "2.5k",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    category: "Culture",
    description:
      "Experience Gaudí architecture, Mediterranean beaches, historic streets, art, and incredible food.",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1400&q=85",
    rating: 4.8,
    travelers: "3.3k",
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    region: "Europe",
    category: "Culture",
    description:
      "Wander through colorful neighborhoods, scenic viewpoints, historic streets, and coastal landscapes.",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1400&q=85",
    rating: 4.7,
    travelers: "2.2k",
  },
  {
    id: "banff",
    name: "Banff",
    country: "Canada",
    region: "North America",
    category: "Nature",
    description:
      "Explore turquoise lakes, towering mountains, alpine forests, and unforgettable Canadian wilderness.",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "2.4k",
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    region: "North America",
    category: "Culture",
    description:
      "Discover iconic landmarks, world-class museums, diverse neighborhoods, and endless city energy.",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1400&q=85",
    rating: 4.8,
    travelers: "4.6k",
  },
  {
    id: "vancouver",
    name: "Vancouver",
    country: "Canada",
    region: "North America",
    category: "Nature",
    description:
      "Enjoy a beautiful combination of coastal scenery, mountains, forests, and vibrant city life.",
    image:
      "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1400&q=85",
    rating: 4.8,
    travelers: "1.9k",
  },
  {
    id: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    region: "North America",
    category: "Culture",
    description:
      "Experience incredible cuisine, ancient history, colorful neighborhoods, art, and modern Mexican culture.",
    image:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1400&q=85",
    rating: 4.7,
    travelers: "2.6k",
  },
  {
    id: "hawaii",
    name: "Hawaii",
    country: "United States",
    region: "North America",
    category: "Beach",
    description:
      "Relax on tropical beaches while discovering volcanoes, waterfalls, forests, and Pacific landscapes.",
    image:
      "https://images.unsplash.com/photo-1507876466759-4b6d3b9d5a4f?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "2.8k",
  },
  {
    id: "grand-canyon",
    name: "Grand Canyon",
    country: "United States",
    region: "North America",
    category: "Adventure",
    description:
      "Stand above one of the world's greatest natural wonders and explore its immense desert landscapes.",
    image:
      "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1400&q=85",
    rating: 4.9,
    travelers: "2.1k",
  },
];

const tours: Tour[] = [
  {
    id: 101,
    title: "Santorini Sunset Sailing",
    location: "Santorini, Greece",
    category: "Water",
    description:
      "Cruise along the Aegean coast and watch the famous Santorini sunset from the sea.",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
    price: 270000,
    rating: 4.9,
    reviews: 328,
    duration: "5 hours",
  },
  {
    id: 102,
    title: "Kyoto Cultural Walking Tour",
    location: "Kyoto, Japan",
    category: "Culture",
    description:
      "Explore traditional neighborhoods, historic temples, gardens, and hidden streets with a local guide.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
    price: 150000,
    rating: 4.8,
    reviews: 241,
    duration: "4 hours",
  },
  {
    id: 103,
    title: "Amalfi Coast Boat Experience",
    location: "Amalfi Coast, Italy",
    category: "Water",
    description:
      "Discover colorful coastal villages, hidden coves, and spectacular Mediterranean scenery by boat.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
    price: 320000,
    rating: 4.9,
    reviews: 416,
    duration: "6 hours",
  },
  {
    id: 104,
    title: "Bali Jungle & Waterfall Adventure",
    location: "Bali, Indonesia",
    category: "Adventure",
    description:
      "Journey through tropical landscapes, rice terraces, jungle trails, and spectacular waterfalls.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    price: 190000,
    rating: 4.8,
    reviews: 379,
    duration: "8 hours",
  },
  {
    id: 105,
    title: "Table Mountain Hiking Experience",
    location: "Cape Town, South Africa",
    category: "Adventure",
    description:
      "Hike one of Africa's most iconic mountains while enjoying breathtaking views over Cape Town.",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85",
    price: 165000,
    rating: 4.9,
    reviews: 287,
    duration: "5 hours",
  },
  {
    id: 106,
    title: "Marrakech Medina Food Tour",
    location: "Marrakech, Morocco",
    category: "Food",
    description:
      "Taste authentic Moroccan dishes while discovering the vibrant markets and streets of the Medina.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    price: 130000,
    rating: 4.7,
    reviews: 198,
    duration: "4 hours",
  },
  {
    id: 107,
    title: "Banff Lake & Mountain Explorer",
    location: "Banff, Canada",
    category: "Nature",
    description:
      "Experience turquoise lakes, towering peaks, alpine forests, and some of Canada's finest scenery.",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=85",
    price: 250000,
    rating: 4.9,
    reviews: 356,
    duration: "9 hours",
  },
  {
    id: 108,
    title: "Queenstown Adrenaline Day",
    location: "Queenstown, New Zealand",
    category: "Adventure",
    description:
      "Spend an action-packed day experiencing the adventure capital of New Zealand.",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=85",
    price: 290000,
    rating: 4.8,
    reviews: 224,
    duration: "Full day",
  },
  {
    id: 109,
    title: "Santorini Wine & Village Tour",
    location: "Santorini, Greece",
    category: "Food",
    description:
      "Visit charming villages and local wineries while tasting wines produced from volcanic soil.",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=85",
    price: 220000,
    rating: 4.8,
    reviews: 176,
    duration: "5 hours",
  },
  {
    id: 110,
    title: "Kyoto Arashiyama Bamboo Tour",
    location: "Kyoto, Japan",
    category: "Nature",
    description:
      "Walk through the famous bamboo grove and discover temples, gardens, and traditional scenery.",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=85",
    price: 120000,
    rating: 4.7,
    reviews: 214,
    duration: "4 hours",
  },
  {
    id: 111,
    title: "Cape Peninsula Wildlife Tour",
    location: "Cape Town, South Africa",
    category: "Wildlife",
    description:
      "Explore the Cape Peninsula, coastal landscapes, penguin colonies, and dramatic viewpoints.",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85",
    price: 200000,
    rating: 4.9,
    reviews: 302,
    duration: "9 hours",
  },
  {
    id: 112,
    title: "Bali Temple & Rice Terrace Tour",
    location: "Bali, Indonesia",
    category: "Culture",
    description:
      "Discover ancient temples, lush rice terraces, and the spiritual side of Bali.",
    image:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=85",
    price: 160000,
    rating: 4.8,
    reviews: 267,
    duration: "7 hours",
  },
  {
    id: 113,
    title: "Dubai Desert Safari",
    location: "Dubai, UAE",
    category: "Adventure",
    description:
      "Ride across golden dunes and experience an unforgettable evening in the Arabian desert.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85",
    price: 200000,
    rating: 4.8,
    reviews: 493,
    duration: "7 hours",
  },
  {
    id: 114,
    title: "Bangkok Grand Palace & Temples",
    location: "Bangkok, Thailand",
    category: "Culture",
    description:
      "Explore Bangkok's grand temples, historic landmarks, and fascinating cultural heritage.",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=85",
    price: 135000,
    rating: 4.7,
    reviews: 238,
    duration: "5 hours",
  },
  {
    id: 115,
    title: "Maldives Island Snorkeling Cruise",
    location: "Maldives",
    category: "Water",
    description:
      "Sail through crystal-clear waters and discover colorful coral reefs and tropical marine life.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85",
    price: 260000,
    rating: 4.9,
    reviews: 351,
    duration: "6 hours",
  },
  {
    id: 116,
    title: "Marrakech Atlas Mountains Day Trip",
    location: "Marrakech, Morocco",
    category: "Nature",
    description:
      "Escape the city for a scenic journey through mountain villages and dramatic landscapes.",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=85",
    price: 190000,
    rating: 4.8,
    reviews: 183,
    duration: "8 hours",
  },
  {
    id: 117,
    title: "Zanzibar Spice Farm & Stone Town",
    location: "Zanzibar, Tanzania",
    category: "Culture",
    description:
      "Discover Zanzibar's historic streets, spice farms, local traditions, and coastal culture.",
    image:
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1200&q=85",
    price: 150000,
    rating: 4.7,
    reviews: 164,
    duration: "7 hours",
  },
  {
    id: 118,
    title: "Cairo Pyramids & Sphinx Experience",
    location: "Cairo, Egypt",
    category: "Culture",
    description:
      "Step into ancient history with a guided journey around the legendary pyramids and Sphinx.",
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=85",
    price: 175000,
    rating: 4.8,
    reviews: 427,
    duration: "6 hours",
  },
  {
    id: 119,
    title: "Mauritius Catamaran Lagoon Cruise",
    location: "Mauritius",
    category: "Water",
    description:
      "Relax on a catamaran while exploring turquoise lagoons and beautiful tropical coastline.",
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1200&q=85",
    price: 235000,
    rating: 4.9,
    reviews: 229,
    duration: "7 hours",
  },
  {
    id: 120,
    title: "Paris Seine Evening Cruise",
    location: "Paris, France",
    category: "Culture",
    description:
      "See the lights of Paris from the Seine while passing some of the city's most famous landmarks.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    price: 120000,
    rating: 4.7,
    reviews: 512,
    duration: "2 hours",
  },
  {
    id: 121,
    title: "Barcelona Tapas & Old Town Tour",
    location: "Barcelona, Spain",
    category: "Food",
    description:
      "Taste authentic Spanish tapas while exploring Barcelona's atmospheric historic streets.",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=85",
    price: 150000,
    rating: 4.8,
    reviews: 291,
    duration: "4 hours",
  },
  {
    id: 122,
    title: "Lisbon Hills & Tram Experience",
    location: "Lisbon, Portugal",
    category: "Culture",
    description:
      "Discover Lisbon's colorful neighborhoods, viewpoints, historic streets, and iconic tram routes.",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85",
    price: 115000,
    rating: 4.7,
    reviews: 186,
    duration: "4 hours",
  },
  {
    id: 123,
    title: "Swiss Alps Scenic Rail Journey",
    location: "Swiss Alps, Switzerland",
    category: "Nature",
    description:
      "Travel through breathtaking alpine scenery aboard one of Switzerland's iconic scenic rail routes.",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=85",
    price: 320000,
    rating: 4.9,
    reviews: 267,
    duration: "Full day",
  },
  {
    id: 124,
    title: "New York City Highlights",
    location: "New York, USA",
    category: "Culture",
    description:
      "See New York's most famous landmarks and discover the energy of Manhattan with a local guide.",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=85",
    price: 210000,
    rating: 4.7,
    reviews: 438,
    duration: "7 hours",
  },
  {
    id: 125,
    title: "Vancouver Mountain & City Tour",
    location: "Vancouver, Canada",
    category: "Nature",
    description:
      "Combine city highlights with spectacular mountain, forest, and coastal scenery.",
    image:
      "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1200&q=85",
    price: 230000,
    rating: 4.8,
    reviews: 197,
    duration: "8 hours",
  },
  {
    id: 126,
    title: "Mexico City Street Food Tour",
    location: "Mexico City, Mexico",
    category: "Food",
    description:
      "Taste tacos, traditional snacks, and local favorites while exploring vibrant neighborhoods.",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=85",
    price: 130000,
    rating: 4.9,
    reviews: 312,
    duration: "4 hours",
  },
  {
    id: 127,
    title: "Grand Canyon Sunset Tour",
    location: "Grand Canyon, USA",
    category: "Nature",
    description:
      "Experience one of the world's most extraordinary landscapes as the canyon glows at sunset.",
    image:
      "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=85",
    price: 250000,
    rating: 4.9,
    reviews: 348,
    duration: "6 hours",
  },
  {
    id: 128,
    title: "Hawaii Coastal Adventure",
    location: "Hawaii, USA",
    category: "Adventure",
    description:
      "Explore dramatic coastlines, tropical scenery, hidden beaches, and unforgettable viewpoints.",
    image:
      "https://images.unsplash.com/photo-1507876466759-4b6d3b9d5a4f?auto=format&fit=crop&w=1200&q=85",
    price: 290000,
    rating: 4.8,
    reviews: 231,
    duration: "8 hours",
  },
  {
    id: 129,
    title: "Seoul Palace & Street Food Tour",
    location: "Seoul, South Korea",
    category: "Food",
    description:
      "Explore royal palaces and lively markets while tasting some of Seoul's best street food.",
    image:
      "https://images.unsplash.com/photo-1538485399081-7c8971e7f0f5?auto=format&fit=crop&w=1200&q=85",
    price: 160000,
    rating: 4.8,
    reviews: 204,
    duration: "5 hours",
  },
  {
    id: 130,
    title: "Bali Sunrise Mount Batur Trek",
    location: "Bali, Indonesia",
    category: "Adventure",
    description:
      "Climb Mount Batur before sunrise and watch the island awaken from above the clouds.",
    image:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=85",
    price: 220000,
    rating: 4.9,
    reviews: 286,
    duration: "8 hours",
  },
  {
    id: 131,
    title: "Bangkok Floating Market Adventure",
    location: "Bangkok, Thailand",
    category: "Culture",
    description:
      "Visit colorful floating markets and experience a fascinating side of traditional Thai life.",
    image:
      "https://images.unsplash.com/photo-1504214208698-ea1916f2195a?auto=format&fit=crop&w=1200&q=85",
    price: 130000,
    rating: 4.7,
    reviews: 175,
    duration: "6 hours",
  },
  {
    id: 132,
    title: "Cape Town Winelands Day Tour",
    location: "Cape Town, South Africa",
    category: "Food",
    description:
      "Journey through beautiful vineyards and historic wine estates in the Cape Winelands.",
    image:
      "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=1200&q=85",
    price: 190000,
    rating: 4.9,
    reviews: 253,
    duration: "8 hours",
  },
];

function createSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getDestinationTours(destination: Destination) {
  const destinationName = destination.name.toLowerCase();

  return tours
    .filter((tour) => {
      const location = tour.location.toLowerCase();

      return (
        location.includes(destinationName) ||
        location.includes(destination.id.replace(/-/g, " "))
      );
    })
    .slice(0, 3);
}

export default function Places() {
  const { slug } = useParams<{ slug: string }>();

  const normalizedSlug = slug?.toLowerCase() || "";

  const destination = destinations.find(
    (item) => item.id.toLowerCase() === normalizedSlug,
  );

  const tour = tours.find((item) => createSlug(item.title) === normalizedSlug);

  if (!destination && !tour) {
    return (
      <main className="min-h-screen bg-[#f8faf8] px-6 py-32">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#17211b]/5">
            <span className="material-symbols-outlined text-4xl text-[#17211b]/50">
              travel_explore
            </span>
          </div>

          <h1 className="mt-7 font-display text-4xl font-semibold text-[#17211b]">
            Place not found
          </h1>

          <p className="mt-4 text-base leading-7 text-[#17211b]/55">
            The destination or tour you are looking for does not exist.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17211b] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#29372e]"
            >
              <span className="material-symbols-outlined text-[19px]">
                arrow_back
              </span>
              Back to destinations
            </Link>

            <Link
              to="/tours"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17211b]/10 bg-white px-7 py-3.5 text-sm font-semibold text-[#17211b] transition hover:bg-[#eef3ef]"
            >
              Explore tours
              <span className="material-symbols-outlined text-[19px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (destination) {
    const destinationTours = getDestinationTours(destination);

    return (
      <main className="bg-[#f8faf8] text-[#17211b]">
        <section className="relative min-h-[78vh] overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211b] via-transparent to-black/10" />

          <div className="page-container relative z-10 flex min-h-[78vh] items-end pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl text-white"
            >
              <Link
                to="/destinations"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition hover:text-white"
              >
                <span className="material-symbols-outlined text-[19px]">
                  arrow_back
                </span>
                Back to destinations
              </Link>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur-md">
                  {destination.category}
                </span>

                <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-md">
                  <span className="material-symbols-outlined text-[16px]">
                    location_on
                  </span>
                  {destination.country}
                </span>
              </div>

              <h1 className="mt-6 font-display text-5xl font-semibold leading-none md:text-7xl lg:text-8xl">
                {destination.name}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                {destination.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/booking/${destination.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#17211b] transition hover:bg-[#e8eee9]"
                >
                  Book this destination
                  <span className="material-symbols-outlined text-[19px]">
                    arrow_forward
                  </span>
                </Link>

                <a
                  href="#experiences"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
                >
                  Explore experiences
                  <span className="material-symbols-outlined text-[19px]">
                    expand_more
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="page-container py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#17211b]/40">
                Discover {destination.name}
              </span>

              <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                A place worth experiencing
              </h2>

              <p className="mt-7 text-base leading-8 text-[#17211b]/60 md:text-lg">
                {destination.description} Explore the local culture, discover
                remarkable landscapes, meet new people, and create memories that
                make your journey special.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
                  <span className="material-symbols-outlined text-2xl">
                    public
                  </span>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#17211b]/40">
                    Region
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {destination.region}
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
                  <span className="material-symbols-outlined text-2xl">
                    category
                  </span>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#17211b]/40">
                    Travel style
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {destination.category}
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
                  <span className="material-symbols-outlined text-2xl">
                    star
                  </span>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#17211b]/40">
                    Rating
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {destination.rating} / 5
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
                  <span className="material-symbols-outlined text-2xl">
                    group
                  </span>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#17211b]/40">
                    Travelers
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {destination.travelers}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-28 rounded-[30px] bg-[#17211b] p-8 text-white">
                <span className="material-symbols-outlined text-3xl">
                  flight_takeoff
                </span>

                <h3 className="mt-5 font-display text-3xl font-semibold">
                  Explore {destination.name}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/55">
                  Find tours and experiences available around this destination.
                </p>

                <Link
                  to="/"
                  className="mt-7 inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-white transition hover:text-white/80"
                >
                  Nomadia
                </Link>

                <Link
                  to="/tours"
                  className="mt-3 flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View experiences
                  <span className="material-symbols-outlined text-[19px]">
                    travel_explore
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="experiences"
          className="scroll-mt-24 bg-white py-20 md:py-24"
        >
          <div className="page-container">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#17211b]/40">
                  Experiences nearby
                </span>

                <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                  Explore {destination.name}
                </h2>
              </div>

              <Link
                to="/tours"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#17211b]"
              >
                View all tours
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            </div>

            {destinationTours.length > 0 ? (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {destinationTours.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                    }}
                  >
                    <Link
                      to={`/tours/${createSlug(item.title)}`}
                      className="group block overflow-hidden rounded-[26px] bg-[#f8faf8]"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="text-xs font-medium text-white/65">
                            {item.location}
                          </span>

                          <h3 className="mt-1 font-display text-xl font-semibold text-white">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[17px]">
                              star
                            </span>

                            <span className="text-sm font-semibold">
                              {item.rating}
                            </span>

                            <span className="text-xs text-[#17211b]/40">
                              ({item.reviews})
                            </span>
                          </div>

                          <span className="text-sm font-bold">
                            ₦{item.price}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-[#17211b]/10 pt-4">
                          <span className="flex items-center gap-1.5 text-xs font-medium text-[#17211b]/50">
                            <span className="material-symbols-outlined text-[16px]">
                              schedule
                            </span>
                            {item.duration}
                          </span>

                          <span className="flex items-center gap-1 text-sm font-bold text-[#17211b]">
                            Explore
                            <span className="material-symbols-outlined text-[17px] transition-transform duration-300 group-hover:translate-x-1">
                              arrow_forward
                            </span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-[28px] bg-[#f8faf8] px-6 py-16 text-center">
                <span className="material-symbols-outlined text-4xl text-[#17211b]/40">
                  travel_explore
                </span>

                <h3 className="mt-4 font-display text-2xl font-semibold">
                  More experiences coming soon
                </h3>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#17211b]/50">
                  We are preparing more experiences around {destination.name}.
                </p>

                <Link
                  to="/tours"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#29372e]"
                >
                  Explore all tours
                  <span className="material-symbols-outlined text-[19px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  if (tour) {
    return (
      <main className="bg-[#f8faf8] text-[#17211b]">
        <section className="relative min-h-[75vh] overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211b] via-transparent to-black/10" />

          <div className="page-container relative z-10 flex min-h-[75vh] items-end pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl text-white"
            >
              <Link
                to="/tours"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition hover:text-white"
              >
                <span className="material-symbols-outlined text-[19px]">
                  arrow_back
                </span>
                Back to tours
              </Link>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur-md">
                  {tour.category}
                </span>

                <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-md">
                  <span className="material-symbols-outlined text-[16px]">
                    location_on
                  </span>
                  {tour.location}
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-tight md:text-7xl">
                {tour.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                {tour.description}
              </p>

              <Link
                to={`/booking/${tour.id}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-7 py-4 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-[#29372e]"
              >
                Book this experience
                <span className="material-symbols-outlined text-[19px] text-white">
                  arrow_forward
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="page-container py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#17211b]/40">
                Tour overview
              </span>

              <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                Experience {tour.location}
              </h2>

              <p className="mt-7 text-base leading-8 text-[#17211b]/60 md:text-lg">
                {tour.description} This carefully selected experience gives you
                the opportunity to explore the destination from a local
                perspective while enjoying a memorable journey.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
                  <span className="material-symbols-outlined text-2xl">
                    schedule
                  </span>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#17211b]/40">
                    Duration
                  </p>

                  <p className="mt-1 text-lg font-semibold">{tour.duration}</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
                  <span className="material-symbols-outlined text-2xl">
                    star
                  </span>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#17211b]/40">
                    Rating
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {tour.rating} / 5
                  </p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
                  <span className="material-symbols-outlined text-2xl">
                    reviews
                  </span>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#17211b]/40">
                    Reviews
                  </p>

                  <p className="mt-1 text-lg font-semibold">{tour.reviews}</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
                  <span className="material-symbols-outlined text-2xl">
                    category
                  </span>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#17211b]/40">
                    Experience
                  </p>

                  <p className="mt-1 text-lg font-semibold">{tour.category}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-28 rounded-[30px] bg-[#17211b] p-8 text-white">
                <p className="text-sm text-white/45">Experience from</p>

                <p className="mt-2 font-display text-5xl font-semibold">
                  ₦{tour.price}
                </p>

                <p className="mt-2 text-sm text-white/45">per person</p>

                <div className="my-7 h-px bg-white/10" />

                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-sm text-white/55">
                      <span className="material-symbols-outlined text-[19px]">
                        schedule
                      </span>
                      Duration
                    </span>

                    <span className="text-sm font-semibold">
                      {tour.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-sm text-white/55">
                      <span className="material-symbols-outlined text-[19px]">
                        star
                      </span>
                      Rating
                    </span>

                    <span className="text-sm font-semibold">{tour.rating}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-sm text-white/55">
                      <span className="material-symbols-outlined text-[19px]">
                        location_on
                      </span>
                      Location
                    </span>

                    <span className="max-w-[170px] text-right text-sm font-semibold">
                      {tour.location}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/booking/${tour.id}`}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#17211b] px-6 py-4 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-[#29372e]"
                >
                  Book this experience
                  <span className="material-symbols-outlined text-[19px] text-white">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="page-container">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#17211b]/40">
                Your experience
              </span>

              <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
                What makes this tour special
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-[28px] bg-[#f8faf8] p-7">
                <span className="material-symbols-outlined text-3xl">
                  explore
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  Discover something new
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#17211b]/50">
                  Explore remarkable places and discover another side of{" "}
                  {tour.location}.
                </p>
              </div>

              <div className="rounded-[28px] bg-[#f8faf8] p-7">
                <span className="material-symbols-outlined text-3xl">
                  groups
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  Local perspective
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#17211b]/50">
                  Experience the destination through carefully selected local
                  experiences.
                </p>
              </div>

              <div className="rounded-[28px] bg-[#f8faf8] p-7">
                <span className="material-symbols-outlined text-3xl">
                  favorite
                </span>

                <h3 className="mt-5 text-xl font-semibold">
                  Memorable moments
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#17211b]/50">
                  Turn your trip into lasting memories with an experience
                  designed around discovery.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return null;
}
