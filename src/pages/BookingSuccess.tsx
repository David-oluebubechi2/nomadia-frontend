import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";

type BookingData = {
  type: string;
  id: string | undefined;
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
  paymentMethod?: string;
  bookingReference?: string;
};

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking as BookingData | undefined;

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f8faf8] px-6 py-24">
        <div className="mx-auto max-w-2xl rounded-[30px] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef3ef]">
            <span className="material-symbols-outlined text-3xl text-[#17211b]">
              confirmation_number
            </span>
          </div>

          <h1 className="mt-6 font-display text-3xl font-semibold text-[#17211b]">
            Confirmation unavailable
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#17211b]/50">
            We could not find your booking confirmation. You can view your
            existing bookings or start a new journey.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/my-bookings")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17211b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#29372e] focus:outline-none focus:ring-2 focus:ring-[#17211b]/30"
            >
              My bookings
              <span className="material-symbols-outlined text-[19px] text-white">
                arrow_forward
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/destinations")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17211b]/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#17211b] transition hover:bg-[#eef3ef] focus:outline-none focus:ring-2 focus:ring-[#17211b]/20"
            >
              Explore destinations
            </button>
          </div>
        </div>
      </div>
    );
  }

  const paymentLabel =
    booking.paymentMethod === "card"
      ? "Card (Paystack)"
      : booking.paymentMethod === "bank"
        ? "Bank transfer"
        : booking.paymentMethod === "wallet"
          ? "Digital wallet"
          : "Payment";

  const handleMyBookings = () => {
    navigate("/my-bookings", {
      state: {
        newBooking: booking,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <section className="relative overflow-hidden bg-[#17211b] px-6 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full border border-white" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white"
          >
            <span className="material-symbols-outlined text-5xl text-[#17211b]">
              check
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/45">
              Reservation confirmed
            </p>

            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
              Your journey is booked.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              Your reservation has been successfully created. Keep your booking
              reference somewhere safe for your trip.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="overflow-hidden rounded-[32px] bg-white shadow-sm"
          >
            <div className="grid md:grid-cols-[320px_1fr]">
              <div className="h-72 md:h-full">
                <img
                  src={booking.image}
                  alt={booking.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-7 md:p-10">
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#17211b]/40">
                      {booking.category}
                    </p>

                    <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-[#17211b]">
                      {booking.title}
                    </h2>

                    <div className="mt-4 flex items-center gap-2 text-sm text-[#17211b]/55">
                      <span className="material-symbols-outlined text-[19px]">
                        location_on
                      </span>
                      {booking.location}
                    </div>
                  </div>

                  <div className="rounded-full bg-[#eef3ef] px-4 py-2 text-xs font-bold text-[#17211b]">
                    Confirmed
                  </div>
                </div>

                <div className="mt-8 rounded-[22px] bg-[#f5f7f5] p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#17211b]/40">
                    Booking reference
                  </p>

                  <p className="mt-2 font-display text-2xl font-semibold tracking-wide text-[#17211b]">
                    {booking.bookingReference || "NMD-CONFIRMED"}
                  </p>
                </div>

                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <span className="material-symbols-outlined text-[#17211b]">
                      person
                    </span>

                    <p className="mt-2 text-xs text-[#17211b]/40">Traveler</p>

                    <p className="mt-1 text-sm font-semibold text-[#17211b]">
                      {booking.fullName}
                    </p>
                  </div>

                  <div>
                    <span className="material-symbols-outlined text-[#17211b]">
                      calendar_month
                    </span>

                    <p className="mt-2 text-xs text-[#17211b]/40">
                      Travel date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#17211b]">
                      {booking.date}
                    </p>
                  </div>

                  <div>
                    <span className="material-symbols-outlined text-[#17211b]">
                      group
                    </span>

                    <p className="mt-2 text-xs text-[#17211b]/40">Travelers</p>

                    <p className="mt-1 text-sm font-semibold text-[#17211b]">
                      {booking.guests}{" "}
                      {booking.guests === 1 ? "traveler" : "travelers"}
                    </p>
                  </div>

                  <div>
                    <span className="material-symbols-outlined text-[#17211b]">
                      schedule
                    </span>

                    <p className="mt-2 text-xs text-[#17211b]/40">Duration</p>

                    <p className="mt-1 text-sm font-semibold text-[#17211b]">
                      {booking.duration}
                    </p>
                  </div>

                  <div>
                    <span className="material-symbols-outlined text-[#17211b]">
                      payments
                    </span>

                    <p className="mt-2 text-xs text-[#17211b]/40">
                      Payment method
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#17211b]">
                      {paymentLabel}
                    </p>
                  </div>

                  <div>
                    <span className="material-symbols-outlined text-[#17211b]">
                      receipt_long
                    </span>

                    <p className="mt-2 text-xs text-[#17211b]/40">Total paid</p>

                    <p className="mt-1 font-display text-xl font-semibold text-[#17211b]">
                      ₦{booking.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 rounded-[28px] bg-[#eef3ef] p-6 md:p-7"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-2xl text-[#17211b]">
                  mail
                </span>

                <div>
                  <h3 className="text-sm font-semibold text-[#17211b]">
                    Confirmation details
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#17211b]/50">
                    Your booking details have been prepared for {booking.email}.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#17211b]/55">
                <span className="material-symbols-outlined text-[18px]">
                  verified
                </span>
                Reservation secured
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleMyBookings}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17211b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#29372e] focus:outline-none focus:ring-2 focus:ring-[#17211b]/30"
            >
              View my bookings
              <span className="material-symbols-outlined text-[19px] text-white">
                arrow_forward
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/destinations")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17211b]/15 bg-white px-7 py-4 text-sm font-semibold text-[#17211b] transition hover:bg-[#eef3ef] focus:outline-none focus:ring-2 focus:ring-[#17211b]/20"
            >
              Explore more
              <span className="material-symbols-outlined text-[19px] text-[#17211b]">
                travel_explore
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
