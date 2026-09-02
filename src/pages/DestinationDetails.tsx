import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";

const destinations = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "Santorini is a spectacular Greek island known for whitewashed villages, blue-domed churches, volcanic landscapes, and unforgettable sunsets overlooking the Aegean Sea.",
    longDescription:
      "From the dramatic cliffs of Oia to the volcanic beaches of Kamari and Perissa, Santorini combines natural beauty with rich Greek culture. Wander through narrow streets, enjoy fresh Mediterranean cuisine, discover ancient ruins, or sail across the caldera as the sun sets over the horizon.",
    rating: 4.9,
    reviews: 2840,
    price: 850000,
    duration: "5–7 days",
    bestTime: "April – October",
    highlights: [
      "Oia sunset",
      "Caldera cruise",
      "Volcanic beaches",
      "Ancient Akrotiri",
      "Greek island cuisine",
    ],
    activities: [
      {
        icon: "sailing",
        title: "Caldera Sailing",
        text: "Cruise across the Aegean and explore Santorini's volcanic coastline.",
      },
      {
        icon: "restaurant",
        title: "Local Cuisine",
        text: "Discover traditional Greek dishes, seafood, wines, and island specialties.",
      },
      {
        icon: "landscape",
        title: "Island Views",
        text: "Explore dramatic cliffs, coastal villages, and unforgettable viewpoints.",
      },
    ],
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "Kyoto is a timeless Japanese city filled with ancient temples, peaceful gardens, traditional neighborhoods, and centuries of cultural heritage.",
    longDescription:
      "Kyoto offers a remarkable balance between historic Japan and modern city life. Walk beneath thousands of torii gates at Fushimi Inari, visit the golden Kinkaku-ji temple, explore the atmospheric streets of Gion, and experience seasonal traditions that make the city unique.",
    rating: 4.8,
    reviews: 3150,
    price: 950000,
    duration: "6–9 days",
    bestTime: "March – May",
    highlights: [
      "Fushimi Inari",
      "Kinkaku-ji",
      "Arashiyama",
      "Gion district",
      "Japanese tea ceremony",
    ],
    activities: [
      {
        icon: "temple_buddhist",
        title: "Historic Temples",
        text: "Visit some of Japan's most celebrated temples and shrines.",
      },
      {
        icon: "local_florist",
        title: "Arashiyama",
        text: "Walk through bamboo forests and explore the surrounding mountain scenery.",
      },
      {
        icon: "emoji_food_beverage",
        title: "Japanese Dining",
        text: "Experience authentic Kyoto cuisine, tea culture, and traditional dining.",
      },
    ],
  },
  {
    id: 3,
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "The Amalfi Coast combines dramatic Mediterranean cliffs, colorful seaside villages, crystal-clear waters, and extraordinary Italian cuisine.",
    longDescription:
      "Stretching along Italy's southern coastline, the Amalfi Coast is one of Europe's most enchanting destinations. Discover Positano, Amalfi, and Ravello while enjoying coastal drives, boat trips, hidden beaches, and unforgettable Italian meals.",
    rating: 4.9,
    reviews: 2290,
    price: 900000,
    duration: "5–8 days",
    bestTime: "May – September",
    highlights: [
      "Positano",
      "Ravello",
      "Boat tours",
      "Coastal villages",
      "Italian cuisine",
    ],
    activities: [
      {
        icon: "directions_boat",
        title: "Coastal Boat Trip",
        text: "See the dramatic coastline from the Mediterranean and discover hidden coves.",
      },
      {
        icon: "directions_walk",
        title: "Scenic Walks",
        text: "Explore picturesque trails connecting villages and mountain viewpoints.",
      },
      {
        icon: "local_dining",
        title: "Italian Food",
        text: "Enjoy fresh seafood, handmade pasta, local lemons, and regional wines.",
      },
    ],
  },
  {
    id: 4,
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "Bali is a tropical paradise famous for lush rice terraces, ancient temples, beautiful beaches, and a relaxed island atmosphere.",
    longDescription:
      "Bali brings together tropical landscapes, spiritual traditions, adventure, and wellness. Explore Ubud's rice terraces, visit ancient temples, surf along the coast, swim beneath waterfalls, and experience the island's vibrant culture.",
    rating: 4.8,
    reviews: 4020,
    price: 700000,
    duration: "5–10 days",
    bestTime: "April – October",
    highlights: [
      "Ubud",
      "Rice terraces",
      "Temple visits",
      "Waterfalls",
      "Beach resorts",
    ],
    activities: [
      {
        icon: "forest",
        title: "Jungle Adventures",
        text: "Discover waterfalls, forests, rice terraces, and tropical landscapes.",
      },
      {
        icon: "self_improvement",
        title: "Wellness",
        text: "Slow down with yoga, spa treatments, meditation, and peaceful retreats.",
      },
      {
        icon: "surfing",
        title: "Ocean Activities",
        text: "Surf, swim, snorkel, or relax on Bali's beautiful beaches.",
      },
    ],
  },
  {
    id: 5,
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    category: "Nature",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "Cape Town is a vibrant South African destination where dramatic mountains, beaches, wildlife, and cosmopolitan culture meet.",
    longDescription:
      "Cape Town offers an extraordinary range of experiences within a single destination. Climb or ride up Table Mountain, explore the Cape Peninsula, visit nearby vineyards, discover coastal wildlife, and enjoy the city's diverse food and cultural scene.",
    rating: 4.9,
    reviews: 2675,
    price: 500000,
    duration: "5–8 days",
    bestTime: "November – March",
    highlights: [
      "Table Mountain",
      "Cape Peninsula",
      "Boulders Beach",
      "Winelands",
      "V&A Waterfront",
    ],
    activities: [
      {
        icon: "hiking",
        title: "Mountain Hiking",
        text: "Explore trails with spectacular views across the city and coastline.",
      },
      {
        icon: "pets",
        title: "Wildlife",
        text: "See penguins, marine life, and other wildlife around the Cape.",
      },
      {
        icon: "wine_bar",
        title: "Winelands",
        text: "Visit beautiful vineyards and discover South Africa's celebrated wines.",
      },
    ],
  },
  {
    id: 6,
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1553603227-2358aabe821e?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "Marrakech is a captivating Moroccan city filled with colorful souks, historic palaces, beautiful courtyards, and rich cultural traditions.",
    longDescription:
      "Marrakech is a sensory journey through Morocco's history and culture. Explore the ancient medina, bargain for handcrafted treasures, visit magnificent palaces and gardens, and enjoy traditional Moroccan cuisine in atmospheric surroundings.",
    rating: 4.7,
    reviews: 1980,
    price: 600000,
    duration: "4–7 days",
    bestTime: "March – May",
    highlights: [
      "Medina",
      "Jemaa el-Fnaa",
      "Majorelle Garden",
      "Traditional souks",
      "Moroccan cuisine",
    ],
    activities: [
      {
        icon: "storefront",
        title: "Souk Shopping",
        text: "Browse colorful markets filled with crafts, textiles, spices, and jewelry.",
      },
      {
        icon: "account_balance",
        title: "Historic Architecture",
        text: "Discover palaces, mosques, courtyards, and centuries-old landmarks.",
      },
      {
        icon: "restaurant",
        title: "Moroccan Cuisine",
        text: "Taste tagines, couscous, mint tea, pastries, and local specialties.",
      },
    ],
  },
  {
    id: 7,
    name: "Banff",
    country: "Canada",
    region: "North America",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1518623380242-d992d3c57b37?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1508261303786-2f2b1b0a6b66?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "Banff is a spectacular mountain destination surrounded by turquoise lakes, alpine forests, glaciers, and dramatic Canadian Rockies.",
    longDescription:
      "Banff National Park is an outdoor playground for travelers who love nature and adventure. Hike through mountain landscapes, canoe across crystal-clear lakes, watch wildlife, and explore scenic roads surrounded by some of Canada's most impressive peaks.",
    rating: 4.9,
    reviews: 2410,
    price: 800000,
    duration: "5–8 days",
    bestTime: "June – September",
    highlights: [
      "Lake Louise",
      "Moraine Lake",
      "Rocky Mountains",
      "Banff town",
      "Wildlife viewing",
    ],
    activities: [
      {
        icon: "hiking",
        title: "Mountain Hiking",
        text: "Explore scenic trails through forests, valleys, and alpine terrain.",
      },
      {
        icon: "kayaking",
        title: "Lake Adventures",
        text: "Paddle across some of the world's most beautiful mountain lakes.",
      },
      {
        icon: "photo_camera",
        title: "Scenic Photography",
        text: "Capture glaciers, peaks, forests, wildlife, and turquoise alpine waters.",
      },
    ],
  },
  {
    id: 8,
    name: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1800&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
    ],
    description:
      "Queenstown is New Zealand's adventure capital, surrounded by dramatic mountains, alpine lakes, and breathtaking landscapes.",
    longDescription:
      "Queenstown is ideal for travelers seeking both adrenaline and natural beauty. Experience bungee jumping, skydiving, jet boating, hiking, scenic cruises, and peaceful lakefront moments surrounded by the Southern Alps.",
    rating: 4.8,
    reviews: 1870,
    price: 880000,
    duration: "5–9 days",
    bestTime: "December – March",
    highlights: [
      "Lake Wakatipu",
      "Southern Alps",
      "Bungee jumping",
      "Milford Sound",
      "Skyline Queenstown",
    ],
    activities: [
      {
        icon: "paragliding",
        title: "Adventure Sports",
        text: "Experience some of the world's best skydiving, bungee jumping, and rafting.",
      },
      {
        icon: "directions_boat",
        title: "Lake Cruises",
        text: "Explore Lake Wakatipu and surrounding landscapes from the water.",
      },
      {
        icon: "terrain",
        title: "Alpine Exploration",
        text: "Discover mountains, valleys, hiking trails, and spectacular viewpoints.",
      },
    ],
  },
];

export default function DestinationDetails() {
  const { slug } = useParams();

  const destination = useMemo(
    () =>
      destinations.find(
        (item) => item.name.toLowerCase().replace(/\s+/g, "-") === slug,
      ),
    [slug],
  );

  if (!destination) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8faf8] px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef3ef]">
            <span className="material-symbols-outlined text-4xl text-[#17211b]">
              travel_explore
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.03em] text-[#17211b]">
            Destination not found
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#17211b]/55">
            The destination you are looking for does not exist or may have been
            moved.
          </p>

          <Link
            to="/destinations"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#29372e]"
          >
            <span className="material-symbols-outlined text-[19px] text-white">
              arrow_back
            </span>
            Back to destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] text-[#17211b]">
      <main>
        <section className="relative h-[76vh] min-h-[620px] overflow-hidden bg-[#17211b]">
          <motion.img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#17211b] via-[#17211b]/45 to-[#17211b]/10" />

          <div className="page-container relative flex h-full items-end pb-16 pt-28 text-white">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="max-w-4xl"
            >
              <Link
                to="/destinations"
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#17211b]/45 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-[#17211b]/65"
              >
                <span className="material-symbols-outlined text-[19px] text-white">
                  arrow_back
                </span>
                All destinations
              </Link>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/15 bg-[#17211b]/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                  {destination.category}
                </span>

                <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#17211b]/50 px-4 py-2 text-sm text-white backdrop-blur-md">
                  <span className="material-symbols-outlined text-[17px] text-white">
                    location_on
                  </span>
                  {destination.country}
                </span>
              </div>

              <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
                {destination.name}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                {destination.description}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-[#17211b]/10 bg-white">
          <div className="page-container grid divide-y divide-[#17211b]/10 py-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex items-center gap-4 px-0 py-4 sm:px-8 sm:py-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ef]">
                <span className="material-symbols-outlined text-[#17211b]">
                  star
                </span>
              </div>

              <div>
                <p className="text-xl font-semibold text-[#17211b]">
                  {destination.rating}
                </p>
                <p className="text-sm text-[#17211b]/50">
                  {destination.reviews.toLocaleString()} reviews
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-0 py-4 sm:px-8 sm:py-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ef]">
                <span className="material-symbols-outlined text-[#17211b]">
                  calendar_month
                </span>
              </div>

              <div>
                <p className="text-xl font-semibold text-[#17211b]">
                  {destination.duration}
                </p>
                <p className="text-sm text-[#17211b]/50">Ideal trip length</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-0 py-4 sm:px-8 sm:py-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ef]">
                <span className="material-symbols-outlined text-[#17211b]">
                  sunny
                </span>
              </div>

              <div>
                <p className="text-xl font-semibold text-[#17211b]">
                  {destination.bestTime}
                </p>
                <p className="text-sm text-[#17211b]/50">Best time to visit</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#f8faf8]">
          <div className="page-container grid gap-16 lg:grid-cols-[1fr_380px]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17211b]/45">
                  About the destination
                </p>

                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#17211b] sm:text-5xl">
                  A journey worth remembering.
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[#17211b]/65">
                  {destination.longDescription}
                </p>
              </motion.div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                {destination.activities.map((activity, index) => (
                  <motion.div
                    key={activity.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.55,
                      delay: index * 0.08,
                    }}
                    className="rounded-3xl border border-[#17211b]/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#17211b]/20 hover:shadow-xl hover:shadow-[#17211b]/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef3ef] text-[#17211b]">
                      <span className="material-symbols-outlined">
                        {activity.icon}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-semibold text-[#17211b]">
                      {activity.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#17211b]/55">
                      {activity.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.aside
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="h-fit rounded-[2rem] bg-[#17211b] p-8 text-white shadow-xl shadow-[#17211b]/10 lg:sticky lg:top-28"
            >
              <p className="text-sm text-white/50">Starting from</p>

              <div className="mt-2 flex items-end gap-2">
                <span className="font-display text-5xl font-semibold text-white">
                  ₦{destination.price.toLocaleString()}
                </span>

                <span className="mb-2 text-sm text-white/50">per person</span>
              </div>

              <div className="my-7 h-px bg-white/10" />

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-xl text-white/65">
                    location_on
                  </span>

                  <div>
                    <p className="text-sm font-medium text-white">Location</p>
                    <p className="mt-1 text-sm text-white/50">
                      {destination.name}, {destination.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-xl text-white/65">
                    calendar_month
                  </span>

                  <div>
                    <p className="text-sm font-medium text-white">
                      Best season
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      {destination.bestTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-xl text-white/65">
                    verified
                  </span>

                  <div>
                    <p className="text-sm font-medium text-white">
                      Nomadia verified
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      Carefully selected experience
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2 text-2xl font-bold tracking-tight text-white transition hover:text-white/80"
              >
                Nomadia
              </Link>
            </motion.aside>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="page-container">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17211b]/45">
                Travel highlights
              </p>

              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-[#17211b] sm:text-5xl">
                Don't miss these experiences.
              </h2>
            </motion.div>

            <div className="mt-10 flex flex-wrap gap-3">
              {destination.highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                  }}
                  className="flex items-center gap-2 rounded-full border border-[#17211b]/10 bg-[#f8faf8] px-5 py-3 text-sm font-medium text-[#17211b]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#17211b]">
                    check_circle
                  </span>
                  {highlight}
                </motion.div>
              ))}
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {destination.gallery.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className={`group overflow-hidden rounded-[2rem] ${
                    index === 0 ? "md:col-span-2 md:h-[520px]" : "md:h-[520px]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${destination.name} travel view ${index + 1}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#f8faf8]">
          <div className="page-container">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#dfe8df] px-7 py-16 sm:px-12 lg:px-20">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[50px] border-white/30" />
              <div className="absolute -bottom-32 right-48 h-64 w-64 rounded-full border-[40px] border-white/20" />

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative max-w-2xl"
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17211b]/50">
                  Your next chapter
                </p>

                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#17211b] sm:text-5xl">
                  Ready to experience {destination.name}?
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-[#17211b]/60">
                  Start planning your journey and turn this destination into
                  your next unforgettable memory.
                </p>

                <Link
                  to={`/booking/${destination.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#29372e]"
                >
                  Start planning
                  <span className="material-symbols-outlined text-[19px] text-white">
                    arrow_forward
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
