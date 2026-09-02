import { Link } from "react-router-dom";
import { motion } from "motion/react";

const values = [
  {
    icon: "explore",
    title: "Exploration first",
    text: "We believe travel should be meaningful, personal, and full of discovery — not just a checklist of sights.",
  },
  {
    icon: "verified_user",
    title: "Curated with care",
    text: "Every destination, stay, and experience on Nomadia is carefully selected by people who love to travel.",
  },
  {
    icon: "support_agent",
    title: "Human support",
    text: "Real people on the other side, ready to help you plan, book, and enjoy your journey from start to finish.",
  },
  {
    icon: "public",
    title: "Travel for everyone",
    text: "We aim to make exploring the world simpler, safer, and more accessible for every kind of traveler.",
  },
];

const stats = [
  { value: "120+", label: "Destinations" },
  { value: "500+", label: "Places to stay" },
  { value: "250+", label: "Experiences" },
  { value: "4.9", label: "Traveler rating" },
];

export default function About() {
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
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              About Nomadia
            </span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-7xl">
              Made for the
              <br />
              <span className="text-white/60">journey.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              Nomadia is a travel platform that helps curious travelers discover
              remarkable places, find beautiful places to stay, and experience
              the world more meaningfully — all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17211b]/40">
                Our story
              </p>

              <h2 className="mt-3 font-display text-3xl font-semibold text-[#17211b] md:text-4xl">
                Travel should feel easy again.
              </h2>

              <p className="mt-5 text-base leading-8 text-[#17211b]/55">
                Nomadia began with a simple frustration: planning a trip meant
                juggling dozens of tabs, scattered reviews, and uncertain
                choices. We wanted to bring discovery, booking, and support
                together so that planning feels as good as the trip itself.
              </p>

              <p className="mt-4 text-base leading-8 text-[#17211b]/55">
                Today, Nomadia connects travelers with hand-picked
                destinations, stays, and experiences — powered by people who
                genuinely care about getting the details right.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-[30px] shadow-[0_20px_60px_rgba(23,33,27,0.1)]"
            >
              <img
                src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1400&q=85"
                alt="Travelers exploring a scenic destination"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="page-container">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="text-center"
              >
                <p className="font-display text-4xl font-semibold text-[#17211b]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-[#17211b]/45">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17211b]/40">
              What we stand for
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[#17211b] md:text-4xl">
              Our values
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-[28px] bg-white p-7 shadow-[0_12px_40px_rgba(23,33,27,0.06)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ef] text-[#17211b]">
                  <span className="material-symbols-outlined">{value.icon}</span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-[#17211b]">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#17211b]/50">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17211b]">
        <div className="page-container py-20 text-center">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold text-white md:text-4xl">
            Ready to start planning your next journey?
          </h2>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17211b] px-7 py-4 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-[#29372e]"
            >
              Sign in to explore
              <span className="material-symbols-outlined text-[19px] text-white">
                arrow_forward
              </span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
