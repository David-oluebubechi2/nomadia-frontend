import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

type Region = "Africa" | "Asia" | "Europe" | "North America";
type Category = "Beach" | "Culture" | "Nature" | "Adventure";

type Destination = {
id: string;
name: string;
country: string;
region: Region;
category: Category;
description: string;
image: string;
rating: number;
travelers: string;
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

const regions: string[] = [
"All",
"Africa",
"Asia",
"Europe",
"North America",
];

const categories: string[] = [
"All",
"Beach",
"Culture",
"Nature",
"Adventure",
];

type SortOption = "recommended" | "rating" | "travelers" | "name";

export default function Destinations() {
const [search, setSearch] = useState<string>("");
const [region, setRegion] = useState<string>("All");
const [category, setCategory] = useState<string>("All");
const [sort, setSort] = useState<SortOption>("recommended");

const filteredDestinations = useMemo(() => {
const searchValue = search.toLowerCase().trim();

let result = destinations.filter((destination) => {
  const matchesSearch =
    destination.name.toLowerCase().includes(searchValue) ||
    destination.country.toLowerCase().includes(searchValue) ||
    destination.region.toLowerCase().includes(searchValue) ||
    destination.category.toLowerCase().includes(searchValue);

  const matchesRegion =
    region === "All" || destination.region === region;

  const matchesCategory =
    category === "All" || destination.category === category;

  return matchesSearch && matchesRegion && matchesCategory;
});

if (sort === "rating") {
  result = [...result].sort((a, b) => b.rating - a.rating);
}

if (sort === "travelers") {
  result = [...result].sort(
    (a, b) =>
      Number(b.travelers.replace("k", "")) -
      Number(a.travelers.replace("k", "")),
  );
}

if (sort === "name") {
  result = [...result].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

return result;

}, [search, region, category, sort]);

const clearFilters = () => {
setSearch("");
setRegion("All");
setCategory("All");
setSort("recommended");
};

return ( <div className="min-h-screen bg-[#f8faf8]"> <section className="relative overflow-hidden bg-[#17211b]"> <div className="absolute inset-0"> <img
         src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2200&q=85"
         alt="Beautiful travel destination"
         className="h-full w-full object-cover opacity-45"
       />

      <div className="absolute inset-0 bg-gradient-to-r from-[#17211b] via-[#17211b]/75 to-[#17211b]/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#17211b] via-transparent to-[#17211b]/20" />
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
            public
          </span>
          Discover the world
        </span>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-7xl">
          Find your next
          <br />
          <span className="text-white/65">great escape.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
          Explore remarkable places, discover new cultures, and find the
          destination that feels made for your next journey.
        </p>
      </motion.div>
    </div>
  </section>

  <section className="border-b border-[#17211b]/10 bg-white">
    <div className="page-container py-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[21px] text-[#17211b]/40">
            search
          </span>

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search destinations..."
            className="h-12 w-full rounded-full border border-[#17211b]/10 bg-[#f8faf8] pl-12 pr-5 text-sm font-medium text-[#17211b] placeholder:text-[#17211b]/35 outline-none transition focus:border-[#17211b]/25 focus:ring-4 focus:ring-[#17211b]/5"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm font-medium text-[#17211b]/45 sm:block">
            Sort by
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="h-12 rounded-full border border-[#17211b]/10 bg-[#f8faf8] px-5 text-sm font-semibold text-[#17211b] outline-none transition focus:border-[#17211b]/25 focus:ring-4 focus:ring-[#17211b]/5"
          >
            <option value="recommended">Recommended</option>
            <option value="rating">Highest Rated</option>
            <option value="travelers">Most Popular</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#17211b]/40">
          Region
        </p>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {regions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRegion(item)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                region === item
                  ? "bg-[#17211b] text-white"
                  : "bg-[#f1f4f1] text-[#17211b]/65 hover:bg-[#e7ece8] hover:text-[#17211b]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#17211b]/40">
          Travel style
        </p>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-[#17211b] text-white"
                  : "bg-[#f1f4f1] text-[#17211b]/65 hover:bg-[#e7ece8] hover:text-[#17211b]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>

  <section className="section-padding">
    <div className="page-container">
      <div className="mb-10 flex items-end justify-between gap-5">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#17211b]/40">
            Destinations
          </span>

          <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] text-[#17211b] md:text-5xl">
            Places worth discovering
          </h2>
        </div>

        <p className="hidden text-sm font-medium text-[#17211b]/45 md:block">
          {filteredDestinations.length} destinations
        </p>
      </div>

      {filteredDestinations.length > 0 ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDestinations.map((destination, index) => (
            <motion.article
              key={destination.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: Math.min(index * 0.04, 0.2),
              }}
              className="group overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(23,33,27,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(23,33,27,0.1)]"
            >
              <Link
                to={`/destinations/${destination.id}`}
                className="block"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#17211b] backdrop-blur-md">
                      {destination.category}
                    </span>
                  </div>

                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#17211b] backdrop-blur-md">
                    <span className="material-symbols-outlined text-[16px]">
                      star
                    </span>
                    {destination.rating}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/65">
                      {destination.country}
                    </p>

                    <h3 className="mt-1 font-display text-2xl font-semibold text-white">
                      {destination.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="line-clamp-3 text-sm leading-6 text-[#17211b]/55">
                    {destination.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#17211b]/10 pt-5">
                    <div className="flex items-center gap-2 text-[#17211b]/50">
                      <span className="material-symbols-outlined text-[18px]">
                        group
                      </span>

                      <span className="text-xs font-medium">
                        {destination.travelers} travelers
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-sm font-bold text-[#17211b]">
                      Explore
                      <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </span>
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
              travel_explore
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-semibold text-[#17211b]">
            No destinations found
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#17211b]/50">
            Try a different search or remove some of your filters to
            discover more destinations.
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
      <div className="mx-auto max-w-3xl text-center">
        <span className="material-symbols-outlined text-3xl text-white">
          travel_explore
        </span>

        <h2 className="mt-5 font-display text-4xl font-semibold text-white md:text-5xl">
          The world is waiting.
        </h2>

        <p className="mt-5 text-base leading-8 text-white/55">
          Choose a place that inspires you, then let Nomadia help you turn
          it into your next unforgettable journey.
        </p>

        <Link
          to="/tours"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-7 py-4 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-[#29372e] focus:outline-none focus:ring-4 focus:ring-white/20"
        >
          Explore Experiences
          <span className="material-symbols-outlined text-[19px] text-white">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  </section>
</div>

);
}
