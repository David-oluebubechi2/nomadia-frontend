import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

type Hotel = {
id: number;
name: string;
location: string;
country: string;
description: string;
image: string;
price: number;
rating: number;
reviews: number;
category: string;
amenities: string[];
};

const hotels: Hotel[] = [
{
id: 201,
name: "The Twelve Apostles Hotel",
location: "Cape Town",
country: "South Africa",
description:
"A luxurious coastal retreat overlooking the Atlantic Ocean and the Twelve Apostles mountain range.",
image:
"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
price: 480000,
rating: 4.9,
reviews: 428,
category: "Luxury",
amenities: ["Ocean View", "Pool", "Spa"],
},
{
id: 202,
name: "Royal Mansour Marrakech",
location: "Marrakech",
country: "Morocco",
description:
"An elegant Moroccan retreat combining traditional architecture, private courtyards, and exceptional hospitality.",
image:
"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85",
price: 610000,
rating: 4.9,
reviews: 367,
category: "Luxury",
amenities: ["Spa", "Restaurant", "Pool"],
},
{
id: 203,
name: "Nungwi Beach Resort",
location: "Zanzibar",
country: "Tanzania",
description:
"A tropical beachfront escape with white sand, turquoise water, and peaceful island surroundings.",
image:
"https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=85",
price: 330000,
rating: 4.8,
reviews: 295,
category: "Beach",
amenities: ["Beachfront", "Pool", "Breakfast"],
},
{
id: 204,
name: "The Ritz-Carlton Kyoto",
location: "Kyoto",
country: "Japan",
description:
"A refined riverside hotel offering a peaceful base for discovering Kyoto's temples, gardens, and culture.",
image:
"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=85",
price: 670000,
rating: 4.9,
reviews: 512,
category: "Luxury",
amenities: ["River View", "Spa", "Restaurant"],
},
{
id: 205,
name: "Ubud Jungle Retreat",
location: "Bali",
country: "Indonesia",
description:
"A tranquil jungle retreat surrounded by tropical greenery, rice terraces, and Balinese landscapes.",
image:
"https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1400&q=85",
price: 280000,
rating: 4.8,
reviews: 341,
category: "Nature",
amenities: ["Jungle View", "Pool", "Yoga"],
},
{
id: 206,
name: "Santorini Cliffside Suites",
location: "Santorini",
country: "Greece",
description:
"Beautiful cliffside suites with panoramic views across the Aegean Sea and Santorini's famous caldera.",
image:
"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=85",
price: 580000,
rating: 4.9,
reviews: 476,
category: "Beach",
amenities: ["Sea View", "Pool", "Breakfast"],
},
{
id: 207,
name: "Hotel de Crillon",
location: "Paris",
country: "France",
description:
"A sophisticated Parisian stay close to iconic landmarks, elegant boulevards, museums, and cafés.",
image:
"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85",
price: 780000,
rating: 4.9,
reviews: 394,
category: "Luxury",
amenities: ["Spa", "Restaurant", "Gym"],
},
{
id: 208,
name: "Alpine Mountain Lodge",
location: "Swiss Alps",
country: "Switzerland",
description:
"A cozy mountain lodge surrounded by dramatic alpine peaks, forests, and scenic hiking routes.",
image:
"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=85",
price: 420000,
rating: 4.8,
reviews: 278,
category: "Nature",
amenities: ["Mountain View", "Fireplace", "Breakfast"],
},
{
id: 209,
name: "Atlantis The Royal",
location: "Dubai",
country: "United Arab Emirates",
description:
"A spectacular resort offering modern luxury, ocean views, fine dining, and world-class facilities.",
image:
"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=85",
price: 720000,
rating: 4.8,
reviews: 623,
category: "Luxury",
amenities: ["Beachfront", "Pool", "Spa"],
},
{
id: 210,
name: "The Peninsula Bangkok",
location: "Bangkok",
country: "Thailand",
description:
"A riverside urban retreat offering elegant rooms, panoramic city views, and exceptional service.",
image:
"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85",
price: 360000,
rating: 4.8,
reviews: 352,
category: "City",
amenities: ["River View", "Pool", "Spa"],
},
{
id: 211,
name: "Vakkaru Maldives",
location: "Maldives",
country: "Maldives",
description:
"A secluded island resort surrounded by crystal-clear lagoons, coral reefs, and white-sand beaches.",
image:
"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85",
price: 840000,
rating: 4.9,
reviews: 447,
category: "Beach",
amenities: ["Private Beach", "Villa", "Spa"],
},
{
id: 212,
name: "Fairmont Banff Springs",
location: "Banff",
country: "Canada",
description:
"A legendary mountain resort surrounded by the spectacular scenery of Banff National Park.",
image:
"https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85",
price: 460000,
rating: 4.8,
reviews: 381,
category: "Nature",
amenities: ["Mountain View", "Spa", "Restaurant"],
},
];

const categories = ["All", "Luxury", "Beach", "Nature", "City"];

type SortOption =
| "recommended"
| "rating"
| "reviews"
| "price-low"
| "price-high";

export default function Hotels() {
const [search, setSearch] = useState<string>("");
const [category, setCategory] = useState<string>("All");
const [sort, setSort] = useState<SortOption>("recommended");

const filteredHotels = useMemo(() => {
const value = search.toLowerCase().trim();

let result = hotels.filter((hotel) => {
  const matchesSearch =
    hotel.name.toLowerCase().includes(value) ||
    hotel.location.toLowerCase().includes(value) ||
    hotel.country.toLowerCase().includes(value) ||
    hotel.category.toLowerCase().includes(value);

  const matchesCategory =
    category === "All" || hotel.category === category;

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

return ( <div className="min-h-screen bg-[#f8faf8]"> <section className="relative overflow-hidden bg-[#17211b]"> <div className="absolute inset-0"> <img
         src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=85"
         alt="Luxury hotel"
         className="h-full w-full object-cover opacity-45"
       />


      <div className="absolute inset-0 bg-gradient-to-r from-[#17211b] via-[#17211b]/75 to-[#17211b]/20" />
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
            hotel
          </span>
          Beautiful places to stay
        </span>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-7xl">
          Stay somewhere
          <br />
          <span className="text-white/60">worth remembering.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
          Discover handpicked hotels, resorts, retreats, and unforgettable
          stays in the world's most inspiring destinations.
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
            placeholder="Search hotels or destinations..."
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
                : "bg-[#f1f4f1] text-[#17211b]/65 hover:bg-[#e7ece8] hover:text-[#17211b]"
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
            Places to stay
          </span>

          <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] text-[#17211b] md:text-5xl">
            Find your perfect stay
          </h2>
        </div>

        <p className="hidden text-sm font-medium text-[#17211b]/45 md:block">
          {filteredHotels.length} hotels
        </p>
      </div>

      {filteredHotels.length > 0 ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredHotels.map((hotel, index) => (
            <motion.article
              key={hotel.id}
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
                to={`/booking/${hotel.id}`}
                className="block"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#17211b] backdrop-blur-md">
                      {hotel.category}
                    </span>
                  </div>

                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#17211b] backdrop-blur-md">
                    <span className="material-symbols-outlined text-[20px]">
                      favorite
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
                    <span className="material-symbols-outlined text-[17px]">
                      location_on
                    </span>

                    <span className="text-xs font-medium">
                      {hotel.location}, {hotel.country}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[17px] text-[#17211b]">
                      star
                    </span>

                    <span className="text-sm font-bold text-[#17211b]">
                      {hotel.rating}
                    </span>

                    <span className="text-xs text-[#17211b]/40">
                      ({hotel.reviews})
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-[#17211b]">
                    {hotel.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#17211b]/50">
                    {hotel.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-full bg-[#f1f4f1] px-2.5 py-1 text-[10px] font-semibold text-[#17211b]/60"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-end justify-between border-t border-[#17211b]/10 pt-5">
                    <div>
                      <span className="text-xs text-[#17211b]/40">
                        From
                      </span>

                      <p className="text-lg font-bold text-[#17211b]">
                        ₦{hotel.price}
                        <span className="text-xs font-normal text-[#17211b]/40">
                          {" "}
                          / night
                        </span>
                      </p>
                    </div>

                    <span className="flex items-center gap-1 text-sm font-bold text-[#17211b]">
                      View
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
              hotel
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-semibold text-[#17211b]">
            No hotels found
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#17211b]/50">
            Try another destination or remove some of your filters.
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
          hotel
        </span>

        <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.02em] text-white md:text-5xl">
          Your journey deserves a great stay.
        </h2>

        <p className="mt-5 text-base leading-8 text-white/55">
          From peaceful island retreats to vibrant city hotels, find a place
          that makes every part of your journey feel special.
        </p>

        <Link
          to="/destinations"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-7 py-4 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-[#29372e] focus:outline-none focus:ring-4 focus:ring-white/20"
        >
          Explore Destinations
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
