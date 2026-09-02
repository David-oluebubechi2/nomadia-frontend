import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

type BookingData = {
  type: "destination" | "tour" | "hotel";
  id: number | string;
  title: string;
  location: string;
  image: string;
  category: string;
  guests: number;
  date: string;
  fullName: string;
  email: string;
  phone: string;
  price: number;
  total: number;
  duration: string;
};

export default function BookingReview() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking as BookingData | undefined;

  if (!booking) {
    return (
      <main className="min-h-screen bg-[#f8faf8] px-6 pb-20 pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef3ef] text-[#17211b]">
            <span className="material-symbols-outlined text-[30px]">
              event_busy
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.03em] text-[#17211b]">
            Booking information not found
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#17211b]/55">
            Your booking details are no longer available. Please return to
            destinations and start a new booking.
          </p>

          <Link
            to="/destinations"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#17211b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#29372e]"
          >
            Explore Destinations
            <span className="material-symbols-outlined text-[19px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </main>
    );
  }

  const handleContinue = () => {
    navigate(`/booking/${booking.id}/payment`, {
      state: {
        booking,
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#f8faf8] px-6 pb-20 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#17211b]/45">
            <Link
              to={`/booking/${booking.id}`}
              className="transition hover:text-[#17211b]"
            >
              Booking
            </Link>

            <span className="material-symbols-outlined text-[17px]">
              chevron_right
            </span>

            <span className="text-[#17211b]">Review</span>

            <span className="material-symbols-outlined text-[17px]">
              chevron_right
            </span>

            <span>Payment</span>
          </div>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17211b]/45">
              Step 2 of 3
            </p>

            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-[-0.04em] text-[#17211b] sm:text-5xl">
              Review your reservation
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#17211b]/55">
              Check your trip details and traveler information before continuing
              to payment.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-7">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-[28px] border border-[#17211b]/8 bg-white shadow-[0_20px_50px_rgba(23,33,27,0.05)]"
            >
              <div className="relative h-72 overflow-hidden sm:h-80">
                <img
                  src={booking.image}
                  alt={booking.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#17211b] backdrop-blur">
                    {booking.category}
                  </span>

                  <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                    {booking.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-white/80">
                    <span className="material-symbols-outlined text-[18px]">
                      location_on
                    </span>
                    {booking.location}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-3">
                  <div className="rounded-2xl bg-[#f5f7f5] p-5">
                    <span className="material-symbols-outlined text-[22px] text-[#17211b]/60">
                      calendar_month
                    </span>

                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#17211b]/40">
                      Date
                    </p>

                    <p className="mt-2 text-sm font-bold text-[#17211b]">
                      {booking.date}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f5f7f5] p-5">
                    <span className="material-symbols-outlined text-[22px] text-[#17211b]/60">
                      group
                    </span>

                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#17211b]/40">
                      Travelers
                    </p>

                    <p className="mt-2 text-sm font-bold text-[#17211b]">
                      {booking.guests}{" "}
                      {booking.guests === 1 ? "traveler" : "travelers"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f5f7f5] p-5">
                    <span className="material-symbols-outlined text-[22px] text-[#17211b]/60">
                      schedule
                    </span>

                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#17211b]/40">
                      Duration
                    </p>

                    <p className="mt-2 text-sm font-bold text-[#17211b]">
                      {booking.duration}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="rounded-[28px] border border-[#17211b]/8 bg-white p-6 shadow-[0_20px_50px_rgba(23,33,27,0.05)] sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#17211b]/40">
                    Traveler information
                  </p>

                  <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.03em] text-[#17211b]">
                    Your details
                  </h2>
                </div>

                <Link
                  to={`/booking/${booking.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#17211b]/10 px-4 py-2.5 text-xs font-bold text-[#17211b] transition hover:bg-[#f1f4f1]"
                >
                  <span className="material-symbols-outlined text-[17px]">
                    edit
                  </span>
                  Edit
                </Link>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#17211b]/40">
                    Full name
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#17211b]">
                    {booking.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#17211b]/40">
                    Email address
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold text-[#17211b]">
                    {booking.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#17211b]/40">
                    Phone number
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#17211b]">
                    {booking.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#17211b]/40">
                    Travelers
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#17211b]">
                    {booking.guests}{" "}
                    {booking.guests === 1 ? "traveler" : "travelers"}
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="rounded-[28px] border border-[#17211b]/8 bg-[#eef3ef] p-6 sm:p-8"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#17211b] text-white">
                  <span className="material-symbols-outlined text-[21px]">
                    verified_user
                  </span>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#17211b]">
                    Your booking is secure
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#17211b]/55">
                    Your reservation details are protected. You will choose your
                    payment method securely on the next step.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-28"
          >
            <div className="rounded-[30px] bg-[#17211b] p-6 text-white shadow-[0_25px_60px_rgba(23,33,27,0.16)] sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                Price summary
              </p>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.03em]">
                Your reservation
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-white/55">{booking.title}</span>

                  <span className="text-sm font-bold">
                    ₦{booking.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-white/55">Travelers</span>

                  <span className="text-sm font-bold">× {booking.guests}</span>
                </div>
              </div>

              <div className="my-7 border-t border-white/10" />

              <div className="flex items-end justify-between gap-4">
                <span className="text-sm text-white/55">Total</span>

                <span className="font-display text-4xl font-bold tracking-[-0.04em]">
                  ₦{booking.total.toLocaleString()}
                </span>
              </div>

              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex h-14 w-full items-center justify-center gap-3 rounded-full bg-white px-5 text-sm font-bold text-[#17211b] transition hover:bg-[#eef3ef]"
                >
                  Continue to payment
                  <span className="material-symbols-outlined text-[21px]">
                    arrow_forward
                  </span>
                </button>

                <Link
                  to={`/booking/${booking.id}`}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    arrow_back
                  </span>
                  Back to Booking
                </Link>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-white/35">
                You will review your payment method on the next step.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}
