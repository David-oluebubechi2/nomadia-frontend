import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

type TourCategory =
  | "Adventure"
  | "Culture"
  | "Nature"
  | "Water"
  | "Food"
  | "Wildlife";

type Tour = {
  id: number;
  title: string;
  location: string;
  category: TourCategory;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
};

type SortOption =
  | "recommended"
  | "rating"
  | "reviews"
  | "price-low"
  | "price-high";

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

const categories = [
  "All",
  "Adventure",
  "Culture",
  "Nature",
  "Water",
  "Food",
  "Wildlife",
];

export default function Tours() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("recommended");

  const filteredTours = useMemo(() => {
    const value = search.toLowerCase().trim();

    let result = tours.filter((tour) => {
      const matchesSearch =
        tour.title.toLowerCase().includes(value) ||
        tour.location.toLowerCase().includes(value) ||
        tour.category.toLowerCase().includes(value);

      const matchesCategory = category === "All" || tour.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    if (sort === "reviews") {
      result = [...result].sort((a, b) => b.reviews - a.reviews);
    }

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, category, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("recommended");
  };

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <section className="relative overflow-hidden bg-[#17211b]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2200&q=85"
            alt="Travel experience"
            className="h-full w-full object-cover opacity-45"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#17211b] via-[#17211b]/75 to-[#17211b]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17211b] via-transparent to-[#17211b]/10" />
        </div>

        <div className="page-container relative z-10 py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <span className="material-symbols-outlined text-[18px]">
                hiking
              </span>
              Curated experiences
            </span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-7xl">
              Make the journey
              <br />
              <span className="text-white/65">the destination.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              Discover unforgettable tours, local adventures, cultural
              experiences, and extraordinary ways to see the world.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#17211b]/10 bg-white">
        <div className="page-container py-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[21px] text-[#17211b]/35">
                search
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tours or destinations..."
                className="h-12 w-full rounded-full border border-[#17211b]/10 bg-[#f8faf8] pl-12 pr-5 text-sm font-medium text-[#17211b] placeholder:text-[#17211b]/35 outline-none transition focus:border-[#17211b]/25 focus:ring-4 focus:ring-[#17211b]/5"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium text-[#17211b]/45 sm:block">
                Sort by
              </span>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="h-12 rounded-full border border-[#17211b]/10 bg-[#f8faf8] px-5 text-sm font-semibold text-[#17211b] outline-none transition focus:border-[#17211b]/25 focus:ring-4 focus:ring-[#17211b]/5"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  category === item
                    ? "bg-[#17211b] text-white"
                    : "bg-[#f1f4f1] text-[#17211b]/55 hover:bg-[#e7ece8] hover:text-[#17211b]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#17211b]/40">
                Experiences
              </span>

              <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] text-[#17211b] md:text-5xl">
                Find something unforgettable
              </h2>
            </div>

            <p className="hidden text-sm font-medium text-[#17211b]/45 md:block">
              {filteredTours.length} experiences
            </p>
          </div>

          {filteredTours.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTours.map((tour, index) => (
                <motion.article
                  key={tour.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.04, 0.2),
                  }}
                  className="group overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(23,33,27,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(23,33,27,0.1)]"
                >
                  <Link to={`/booking/${tour.id}`} className="block">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#17211b] backdrop-blur-md">
                          {tour.category}
                        </span>
                      </div>

                      <div
                        aria-hidden="true"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#17211b] backdrop-blur-md transition group-hover:bg-white"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          favorite
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
                        <span className="material-symbols-outlined text-[17px]">
                          location_on
                        </span>

                        <span className="text-xs font-medium">
                          {tour.location}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[17px] text-[#17211b]">
                          star
                        </span>

                        <span className="text-sm font-bold text-[#17211b]">
                          {tour.rating}
                        </span>

                        <span className="text-xs text-[#17211b]/40">
                          ({tour.reviews})
                        </span>
                      </div>

                      <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-[#17211b]">
                        {tour.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#17211b]/50">
                        {tour.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-[#17211b]/10 pt-5">
                        <div className="flex items-center gap-1.5 text-[#17211b]/50">
                          <span className="material-symbols-outlined text-[18px]">
                            schedule
                          </span>

                          <span className="text-xs font-medium">
                            {tour.duration}
                          </span>
                        </div>

                        <div>
                          <span className="text-xs text-[#17211b]/40">
                            From
                          </span>

                          <p className="text-lg font-bold text-[#17211b]">
                            ₦{tour.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="rounded-[32px] bg-white px-6 py-20 text-center shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef3ef] text-[#17211b]">
                <span className="material-symbols-outlined text-[28px]">
                  search_off
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold text-[#17211b]">
                No experiences found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#17211b]/50">
                Try searching for another destination or choose a different
                category.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#17211b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#29372e] focus:outline-none focus:ring-4 focus:ring-[#17211b]/15"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#17211b]">
        <div className="page-container py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <span className="material-symbols-outlined text-3xl text-white">
                verified
              </span>

              <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                Carefully selected
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/50">
                Every experience is selected to help you discover something
                genuinely memorable.
              </p>
            </div>

            <div>
              <span className="material-symbols-outlined text-3xl text-white">
                public
              </span>

              <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                Explore globally
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/50">
                Find experiences across iconic cities, remote landscapes, and
                beautiful coastlines.
              </p>
            </div>

            <div>
              <span className="material-symbols-outlined text-3xl text-white">
                favorite
              </span>

              <h3 className="mt-5 font-display text-2xl font-semibold text-white">
                Travel your way
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/50">
                Choose activities that match your interests, pace, and style of
                travel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
