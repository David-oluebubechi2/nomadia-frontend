import { type FormEvent, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";

type Destination = {
  id: string;
  title: string;
  location: string;
  country: string;
  continent: string;
  category: string;
  image: string;
};

type Tour = {
  id: number;
  title: string;
  location: string;
  country: string;
  category: string;
  image: string;
  price: number;
  duration: string;
};

type Hotel = {
  id: number;
  name: string;
  location: string;
  country: string;
  category: string;
  image: string;
  price: number;
  duration: string;
};

const destinations: Destination[] = [
  {
    id: "cape-town",
    title: "Cape Town",
    location: "Cape Town",
    country: "South Africa",
    continent: "Africa",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "marrakech",
    title: "Marrakech",
    location: "Marrakech",
    country: "Morocco",
    continent: "Africa",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "zanzibar",
    title: "Zanzibar",
    location: "Zanzibar",
    country: "Tanzania",
    continent: "Africa",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "cairo",
    title: "Cairo",
    location: "Cairo",
    country: "Egypt",
    continent: "Africa",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "victoria-falls",
    title: "Victoria Falls",
    location: "Victoria Falls",
    country: "Zimbabwe",
    continent: "Africa",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "mauritius",
    title: "Mauritius",
    location: "Mauritius",
    country: "Mauritius",
    continent: "Africa",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "kyoto",
    title: "Kyoto",
    location: "Kyoto",
    country: "Japan",
    continent: "Asia",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "bali",
    title: "Bali",
    location: "Bali",
    country: "Indonesia",
    continent: "Asia",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "bangkok",
    title: "Bangkok",
    location: "Bangkok",
    country: "Thailand",
    continent: "Asia",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "seoul",
    title: "Seoul",
    location: "Seoul",
    country: "South Korea",
    continent: "Asia",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1538485399081-7c8971e7f0f5?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "maldives",
    title: "Maldives",
    location: "Maldives",
    country: "Maldives",
    continent: "Asia",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "dubai",
    title: "Dubai",
    location: "Dubai",
    country: "United Arab Emirates",
    continent: "Asia",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "santorini",
    title: "Santorini",
    location: "Santorini",
    country: "Greece",
    continent: "Europe",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "amalfi-coast",
    title: "Amalfi Coast",
    location: "Amalfi Coast",
    country: "Italy",
    continent: "Europe",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "paris",
    title: "Paris",
    location: "Paris",
    country: "France",
    continent: "Europe",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "swiss-alps",
    title: "Swiss Alps",
    location: "Swiss Alps",
    country: "Switzerland",
    continent: "Europe",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "barcelona",
    title: "Barcelona",
    location: "Barcelona",
    country: "Spain",
    continent: "Europe",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "lisbon",
    title: "Lisbon",
    location: "Lisbon",
    country: "Portugal",
    continent: "Europe",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "banff",
    title: "Banff",
    location: "Banff",
    country: "Canada",
    continent: "North America",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "new-york",
    title: "New York",
    location: "New York",
    country: "United States",
    continent: "North America",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "vancouver",
    title: "Vancouver",
    location: "Vancouver",
    country: "Canada",
    continent: "North America",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "mexico-city",
    title: "Mexico City",
    location: "Mexico City",
    country: "Mexico",
    continent: "North America",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "hawaii",
    title: "Hawaii",
    location: "Hawaii",
    country: "United States",
    continent: "North America",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1507876466759-4b6d3b9d5a4f?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "grand-canyon",
    title: "Grand Canyon",
    location: "Grand Canyon",
    country: "United States",
    continent: "North America",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1400&q=85",
  },
];

const tours: Tour[] = [
  {
    id: 101,
    title: "Santorini Sunset Sailing",
    location: "Santorini",
    country: "Greece",
    category: "Water",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
    price: 270000,
    duration: "5 hours",
  },
  {
    id: 102,
    title: "Kyoto Cultural Walking Tour",
    location: "Kyoto",
    country: "Japan",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
    price: 150000,
    duration: "4 hours",
  },
  {
    id: 103,
    title: "Amalfi Coast Boat Experience",
    location: "Amalfi Coast",
    country: "Italy",
    category: "Water",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
    price: 320000,
    duration: "6 hours",
  },
  {
    id: 104,
    title: "Bali Jungle & Waterfall Adventure",
    location: "Bali",
    country: "Indonesia",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    price: 190000,
    duration: "8 hours",
  },
  {
    id: 105,
    title: "Table Mountain Hiking Experience",
    location: "Cape Town",
    country: "South Africa",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85",
    price: 165000,
    duration: "5 hours",
  },
  {
    id: 106,
    title: "Marrakech Medina Food Tour",
    location: "Marrakech",
    country: "Morocco",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
    price: 130000,
    duration: "4 hours",
  },
  {
    id: 107,
    title: "Banff Lake & Mountain Explorer",
    location: "Banff",
    country: "Canada",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=85",
    price: 250000,
    duration: "9 hours",
  },
  {
    id: 108,
    title: "Queenstown Adrenaline Day",
    location: "Queenstown",
    country: "New Zealand",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=85",
    price: 290000,
    duration: "Full day",
  },
  {
    id: 109,
    title: "Santorini Wine & Village Tour",
    location: "Santorini",
    country: "Greece",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=85",
    price: 220000,
    duration: "5 hours",
  },
  {
    id: 110,
    title: "Kyoto Arashiyama Bamboo Tour",
    location: "Kyoto",
    country: "Japan",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=85",
    price: 120000,
    duration: "4 hours",
  },
  {
    id: 111,
    title: "Cape Peninsula Wildlife Tour",
    location: "Cape Town",
    country: "South Africa",
    category: "Wildlife",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85",
    price: 200000,
    duration: "9 hours",
  },
  {
    id: 112,
    title: "Bali Temple & Rice Terrace Tour",
    location: "Bali",
    country: "Indonesia",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=85",
    price: 160000,
    duration: "7 hours",
  },
  {
    id: 113,
    title: "Dubai Desert Safari",
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=85",
    price: 200000,
    duration: "7 hours",
  },
  {
    id: 114,
    title: "Bangkok Grand Palace & Temples",
    location: "Bangkok",
    country: "Thailand",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=85",
    price: 135000,
    duration: "5 hours",
  },
  {
    id: 115,
    title: "Maldives Island Snorkeling Cruise",
    location: "Maldives",
    country: "Maldives",
    category: "Water",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85",
    price: 260000,
    duration: "6 hours",
  },
  {
    id: 116,
    title: "Marrakech Atlas Mountains Day Trip",
    location: "Marrakech",
    country: "Morocco",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=85",
    price: 190000,
    duration: "8 hours",
  },
  {
    id: 117,
    title: "Zanzibar Spice Farm & Stone Town",
    location: "Zanzibar",
    country: "Tanzania",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1200&q=85",
    price: 150000,
    duration: "7 hours",
  },
  {
    id: 118,
    title: "Cairo Pyramids & Sphinx Experience",
    location: "Cairo",
    country: "Egypt",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=85",
    price: 175000,
    duration: "6 hours",
  },
  {
    id: 119,
    title: "Mauritius Catamaran Lagoon Cruise",
    location: "Mauritius",
    country: "Mauritius",
    category: "Water",
    image:
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1200&q=85",
    price: 235000,
    duration: "7 hours",
  },
  {
    id: 120,
    title: "Paris Seine Evening Cruise",
    location: "Paris",
    country: "France",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
    price: 120000,
    duration: "2 hours",
  },
  {
    id: 121,
    title: "Barcelona Tapas & Old Town Tour",
    location: "Barcelona",
    country: "Spain",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=85",
    price: 150000,
    duration: "4 hours",
  },
  {
    id: 122,
    title: "Lisbon Hills & Tram Experience",
    location: "Lisbon",
    country: "Portugal",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85",
    price: 115000,
    duration: "4 hours",
  },
  {
    id: 123,
    title: "Swiss Alps Scenic Rail Journey",
    location: "Swiss Alps",
    country: "Switzerland",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=85",
    price: 320000,
    duration: "Full day",
  },
  {
    id: 124,
    title: "New York City Highlights",
    location: "New York",
    country: "United States",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=85",
    price: 210000,
    duration: "7 hours",
  },
  {
    id: 125,
    title: "Vancouver Mountain & City Tour",
    location: "Vancouver",
    country: "Canada",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1200&q=85",
    price: 230000,
    duration: "8 hours",
  },
  {
    id: 126,
    title: "Mexico City Street Food Tour",
    location: "Mexico City",
    country: "Mexico",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=85",
    price: 130000,
    duration: "4 hours",
  },
  {
    id: 127,
    title: "Grand Canyon Sunset Tour",
    location: "Grand Canyon",
    country: "United States",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=1200&q=85",
    price: 250000,
    duration: "6 hours",
  },
  {
    id: 128,
    title: "Hawaii Coastal Adventure",
    location: "Hawaii",
    country: "United States",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1507876466759-4b6d3b9d5a4f?auto=format&fit=crop&w=1200&q=85",
    price: 290000,
    duration: "8 hours",
  },
  {
    id: 129,
    title: "Seoul Palace & Street Food Tour",
    location: "Seoul",
    country: "South Korea",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1538485399081-7c8971e7f0f5?auto=format&fit=crop&w=1200&q=85",
    price: 160000,
    duration: "5 hours",
  },
  {
    id: 130,
    title: "Bali Sunrise Mount Batur Trek",
    location: "Bali",
    country: "Indonesia",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=85",
    price: 220000,
    duration: "8 hours",
  },
  {
    id: 131,
    title: "Bangkok Floating Market Adventure",
    location: "Bangkok",
    country: "Thailand",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1504214208698-ea1916f2195a?auto=format&fit=crop&w=1200&q=85",
    price: 130000,
    duration: "6 hours",
  },
  {
    id: 132,
    title: "Cape Town Winelands Day Tour",
    location: "Cape Town",
    country: "South Africa",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&w=1200&q=85",
    price: 190000,
    duration: "8 hours",
  },
];

const hotels: Hotel[] = [
  {
    id: 201,
    name: "The Twelve Apostles Hotel",
    location: "Cape Town",
    country: "South Africa",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
    price: 480000,
    duration: "Per night",
  },
  {
    id: 202,
    name: "Royal Mansour Marrakech",
    location: "Marrakech",
    country: "Morocco",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
    price: 610000,
    duration: "Per night",
  },
  {
    id: 203,
    name: "Nungwi Beach Resort",
    location: "Zanzibar",
    country: "Tanzania",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=85",
    price: 330000,
    duration: "Per night",
  },
  {
    id: 204,
    name: "The Ritz-Carlton Kyoto",
    location: "Kyoto",
    country: "Japan",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=85",
    price: 670000,
    duration: "Per night",
  },
  {
    id: 205,
    name: "Ubud Jungle Retreat",
    location: "Bali",
    country: "Indonesia",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1400&q=85",
    price: 280000,
    duration: "Per night",
  },
  {
    id: 206,
    name: "Santorini Cliffside Suites",
    location: "Santorini",
    country: "Greece",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=85",
    price: 580000,
    duration: "Per night",
  },
  {
    id: 207,
    name: "Hotel de Crillon",
    location: "Paris",
    country: "France",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
    price: 780000,
    duration: "Per night",
  },
  {
    id: 208,
    name: "Alpine Mountain Lodge",
    location: "Swiss Alps",
    country: "Switzerland",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=85",
    price: 420000,
    duration: "Per night",
  },
  {
    id: 209,
    name: "Atlantis The Royal",
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Luxury",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
    price: 720000,
    duration: "Per night",
  },
  {
    id: 210,
    name: "The Peninsula Bangkok",
    location: "Bangkok",
    country: "Thailand",
    category: "City",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85",
    price: 360000,
    duration: "Per night",
  },
  {
    id: 211,
    name: "Vakkaru Maldives",
    location: "Maldives",
    country: "Maldives",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85",
    price: 840000,
    duration: "Per night",
  },
  {
    id: 212,
    name: "Fairmont Banff Springs",
    location: "Banff",
    country: "Canada",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85",
    price: 460000,
    duration: "Per night",
  },
];

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(
    localStorage.getItem("nomadia_user_email") || "",
  );
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const item = useMemo(() => {
    const tour = tours.find((tour) => String(tour.id) === id);

    if (tour) {
      return {
        type: "tour" as const,
        id: tour.id,
        title: tour.title,
        location: `${tour.location}, ${tour.country}`,
        image: tour.image,
        category: tour.category,
        price: tour.price,
        duration: tour.duration,
      };
    }

    const destination = destinations.find(
      (destination) => destination.id === id,
    );

    if (destination) {
      return {
        type: "destination" as const,
        id: destination.id,
        title: destination.title,
        location: `${destination.location}, ${destination.country}`,
        image: destination.image,
        category: destination.category,
        price: 500000,
        duration: "Flexible stay",
      };
    }

    const hotel = hotels.find((hotel) => String(hotel.id) === id);

    if (hotel) {
      return {
        type: "hotel" as const,
        id: hotel.id,
        title: hotel.name,
        location: `${hotel.location}, ${hotel.country}`,
        image: hotel.image,
        category: hotel.category,
        price: hotel.price,
        duration: hotel.duration,
      };
    }

    return null;
  }, [id]);

  const total = item ? item.price * guests : 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!item) {
      return;
    }

    const bookingData = {
      type: item.type,
      id: item.id,
      title: item.title,
      location: item.location,
      image: item.image,
      category: item.category,
      guests,
      date,
      fullName,
      email,
      phone,
      price: item.price,
      total,
      duration: item.duration,
    };

    navigate(`/booking/${item.id}/review`, {
      state: {
        booking: bookingData,
      },
    });
  };

  const handleBack = () => {
    navigate("/destinations");
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-[#f8faf8]">
        <section className="bg-[#17211b]">
          <div className="page-container py-20 md:py-28">
            <span className="material-symbols-outlined text-5xl text-white">
              travel_explore
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold text-white md:text-5xl">
              Booking not found
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
              We could not find the destination or experience you are trying to
              book.
            </p>
          </div>
        </section>

        <div className="page-container py-10">
          <button
            type="button"
            onClick={() => navigate("/destinations")}
            className="inline-flex items-center gap-2 rounded-full bg-[#17211b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#29372e]"
          >
            <span className="material-symbols-outlined text-[19px]">
              arrow_back
            </span>
            Explore destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <section className="relative overflow-hidden bg-[#17211b]">
        <div className="absolute inset-0">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17211b] via-[#17211b]/90 to-[#17211b]/55" />
        </div>

        <div className="page-container relative z-10 py-16 md:py-20">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            <span className="material-symbols-outlined text-[19px] text-white">
              arrow_back
            </span>
            Back
          </button>

          <div className="mt-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/55">
              <span className="inline-flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>
                {item.location}
              </span>

              <span className="h-1 w-1 rounded-full bg-white/30" />

              <span>{item.category}</span>
            </div>

            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white md:text-7xl">
              Book your
              <br />
              <span className="text-white/45">{item.title}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
              Tell us a little about your trip and we will prepare your booking
              details for review.
            </p>
          </div>
        </div>
      </section>

      <main className="section-padding">
        <div className="page-container">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17211b] text-white">
              <span className="text-sm font-bold">1</span>
            </div>

            <div className="h-px w-12 bg-[#17211b]/15" />

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#17211b]/15 bg-white text-[#17211b]/35">
              <span className="text-sm font-bold">2</span>
            </div>

            <div className="h-px w-12 bg-[#17211b]/15" />

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#17211b]/15 bg-white text-[#17211b]/35">
              <span className="text-sm font-bold">3</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="rounded-[30px] border border-[#17211b]/10 bg-white p-6 shadow-sm md:p-8"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#17211b]/40">
                  Traveler details
                </p>

                <h2 className="mt-2 font-display text-3xl font-semibold text-[#17211b]">
                  Tell us about yourself
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#17211b]/50">
                  These details will be used to prepare your booking
                  confirmation.
                </p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-[#17211b]"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#17211b]/35">
                      person
                    </span>

                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-2xl border border-[#17211b]/12 bg-[#f8faf8] py-4 pl-12 pr-4 text-sm text-[#17211b] outline-none transition placeholder:text-[#17211b]/30 focus:border-[#17211b]/40 focus:bg-white focus:ring-4 focus:ring-[#17211b]/5"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#17211b]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#17211b]/35">
                      mail
                    </span>

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-2xl border border-[#17211b]/12 bg-[#f8faf8] py-4 pl-12 pr-4 text-sm text-[#17211b] outline-none transition placeholder:text-[#17211b]/30 focus:border-[#17211b]/40 focus:bg-white focus:ring-4 focus:ring-[#17211b]/5"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[#17211b]"
                  >
                    Phone number
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#17211b]/35">
                      phone
                    </span>

                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="+234 800 000 0000"
                      required
                      className="w-full rounded-2xl border border-[#17211b]/12 bg-[#f8faf8] py-4 pl-12 pr-4 text-sm text-[#17211b] outline-none transition placeholder:text-[#17211b]/30 focus:border-[#17211b]/40 focus:bg-white focus:ring-4 focus:ring-[#17211b]/5"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-semibold text-[#17211b]"
                  >
                    Travel date
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#17211b]/35">
                      calendar_month
                    </span>

                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full rounded-2xl border border-[#17211b]/12 bg-[#f8faf8] py-4 pl-12 pr-4 text-sm text-[#17211b] outline-none transition focus:border-[#17211b]/40 focus:bg-white focus:ring-4 focus:ring-[#17211b]/5"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="guests"
                    className="mb-2 block text-sm font-semibold text-[#17211b]"
                  >
                    Travelers
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#17211b]/35">
                      group
                    </span>

                    <select
                      id="guests"
                      value={guests}
                      onChange={(event) =>
                        setGuests(Number(event.target.value))
                      }
                      className="w-full appearance-none rounded-2xl border border-[#17211b]/12 bg-[#f8faf8] py-4 pl-12 pr-10 text-sm text-[#17211b] outline-none transition focus:border-[#17211b]/40 focus:bg-white focus:ring-4 focus:ring-[#17211b]/5"
                    >
                      {Array.from({ length: 10 }, (_, index) => index + 1).map(
                        (number) => (
                          <option key={number} value={number}>
                            {number} {number === 1 ? "traveler" : "travelers"}
                          </option>
                        ),
                      )}
                    </select>

                    <span className="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[20px] text-[#17211b]/35">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-[#eef3ef] p-5">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#17211b]">
                    info
                  </span>

                  <div>
                    <p className="text-sm font-semibold text-[#17211b]">
                      Booking information
                    </p>

                    <p className="mt-1 text-xs leading-6 text-[#17211b]/55">
                      You will have an opportunity to review all your
                      information before payment.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#17211b] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#29372e] focus:outline-none focus:ring-4 focus:ring-[#17211b]/15"
              >
                Continue to booking
                <span className="material-symbols-outlined text-[19px] text-white">
                  arrow_forward
                </span>
              </button>
            </motion.form>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="sticky top-24 overflow-hidden rounded-[30px] bg-[#17211b] shadow-xl">
                <div className="relative h-56">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#17211b] via-[#17211b]/20 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      {item.category}
                    </span>

                    <h2 className="mt-3 font-display text-2xl font-semibold text-white">
                      {item.title}
                    </h2>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-2 text-sm text-white/55">
                    <span className="material-symbols-outlined text-[19px]">
                      location_on
                    </span>
                    {item.location}
                  </div>

                  <div className="mt-6 space-y-4 border-b border-white/10 pb-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[19px] text-white/55">
                          schedule
                        </span>

                        <span className="text-sm text-white/55">Duration</span>
                      </div>

                      <span className="text-sm font-semibold text-white">
                        {item.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[19px] text-white/55">
                          group
                        </span>

                        <span className="text-sm text-white/55">Travelers</span>
                      </div>

                      <span className="text-sm font-semibold text-white">
                        {guests}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[19px] text-white/55">
                          payments
                        </span>

                        <span className="text-sm text-white/55">
                          Price per traveler
                        </span>
                      </div>

                      <span className="text-sm font-semibold text-white">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-4 pt-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                        Estimated total
                      </p>

                      <p className="mt-2 font-display text-4xl font-semibold text-white">
                        ₦{total.toLocaleString()}
                      </p>
                    </div>

                    <span className="pb-1 text-sm text-white/40">NGN</span>
                  </div>

                  <div className="mt-6 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="material-symbols-outlined text-white/65">
                      verified_user
                    </span>

                    <p className="text-xs leading-6 text-white/50">
                      Your information is securely handled and will only be used
                      for your booking.
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>
    </div>
  );
}
