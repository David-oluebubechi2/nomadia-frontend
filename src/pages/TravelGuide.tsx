import { Link } from "react-router-dom";
import { motion } from "motion/react";

const guides = [
  {
    icon: "flight",
    title: "Planning your trip",
    text: "How to choose a destination, set a budget, and build an itinerary that fits your travel style.",
  },
  {
    icon: "luggage",
    title: "Packing essentials",
    text: "Smart packing lists and tips so you bring what you need without weighing yourself down.",
  },
  {
    icon: "payments",
    title: "Budgeting & saving",
    text: "Practical ways to keep travel costs in check, from booking early to travelling off-peak.",
  },
  {
    icon: "language",
    title: "Culture & etiquette",
    text: "Respectful travel practices and local customs to help you connect with the places you visit.",
  },
  {
    icon: "shield",
    title: "Staying safe",
    text: "Health, safety, and insurance guidance to keep your journey smooth and worry-free.",
  },
  {
    icon: "photo_camera",
    title: "Capturing memories",
    text: "Tips for photographing your travels and making the most of every moment on the road.",
  },
];

const tips = [
  "Book stays and experiences in advance during peak travel seasons.",
  "Pack light and bring layers — weather can change quickly.",
  "Keep digital copies of important travel documents.",
  "Add travel insurance to protect against unexpected changes.",
  "Learn a few phrases in the local language — it goes a long way.",
  "Leave room in your itinerary for spontaneous discovery.",
];

export default function TravelGuide() {
  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <section className="relative overflow-hidden bg-[#17211b]">
        <div className="page-container py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <span className="material-symbols-outlined text-[18px]">explore</span>
              Travel Guide
            </span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-7xl">
              Travel smarter,
              <br />
              <span className="text-white/60">wherever you go.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              Practical tips and gentle advice to help you plan, pack, and enjoy
              your journeys with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17211b]/40">
              Guide topics
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[#17211b] md:text-4xl">
              Everything you need for a smoother trip
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, index) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(23,33,27,0.06)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ef] text-[#17211b]">
                  <span className="material-symbols-outlined">{guide.icon}</span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-[#17211b]">
                  {guide.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#17211b]/50">
                  {guide.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="page-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17211b]/40">
                Quick tips
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold text-[#17211b] md:text-4xl">
                A few things every traveler should know.
              </h2>

              <ul className="mt-7 space-y-4">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <span className="material-symbols-outlined mt-0.5 text-[20px] text-[#17211b]">
                      check_circle
                    </span>
                    <span className="text-sm leading-7 text-[#17211b]/60">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#29372e]"
              >
                Start planning
                <span className="material-symbols-outlined text-[19px]">
                  arrow_forward
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-[30px] shadow-[0_20px_60px_rgba(23,33,27,0.1)]"
            >
              <img
                src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1400&q=85"
                alt="Traveler with a map"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
