import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "How do I book a destination or experience?",
    a: "Sign in to your Nomadia account, browse destinations, stays, or tours, and choose the one you love. You'll confirm your traveller details, review your reservation, and complete secure payment — all in a few simple steps.",
  },
  {
    q: "How do I view or manage my bookings?",
    a: "Once you're signed in, open 'My Bookings' from the navigation. You'll see a summary of every reservation. Choose 'Manage booking' on an upcoming trip to view details, modify it, or cancel it.",
  },
  {
    q: "Can I modify or cancel a booking?",
    a: "Yes. For upcoming or confirmed bookings, use the 'Modify booking' option to change your details, or 'Cancel booking' to cancel. Refunds are processed within 5–10 business days after cancellation.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major credit and debit cards, bank transfers, and select digital wallets. All payments are processed securely and we support the payment details shown at checkout.",
  },
  {
    q: "Is my personal and payment information secure?",
    a: "Yes. We use secure connections and follow industry-standard practices to protect your data. We only use your information to manage your bookings and improve your experience.",
  },
  {
    q: "How can I contact support?",
    a: "Reach out through our Contact page — you can email us, call us, or chat with a member of the team. We're happy to help with any questions about your trip or booking.",
  },
];

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              Help Center
            </span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-7xl">
              How can we help?
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              Find answers to common questions about booking, managing your
              trips, and using Nomadia.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17211b]/40">
              Frequently asked questions
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[#17211b] md:text-4xl">
              Common questions, answered
            </h2>

            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <motion.div
                    key={faq.q}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="overflow-hidden rounded-2xl border border-[#17211b]/8 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-sm font-semibold text-[#17211b] md:text-base">
                        {faq.q}
                      </span>
                      <span className="material-symbols-outlined text-[22px] text-[#17211b]/45">
                        {isOpen ? "remove" : "add"}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-sm leading-7 text-[#17211b]/55">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 rounded-[28px] bg-white p-8 text-center shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3ef]">
                <span className="material-symbols-outlined text-[26px] text-[#17211b]">
                  forum
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl font-semibold text-[#17211b]">
                Still need help?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#17211b]/50">
                Our support team is here for you. Send us a message and we'll
                get back to you within 24 hours.
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#29372e]"
              >
                Contact support
                <span className="material-symbols-outlined text-[19px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
