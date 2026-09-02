import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { fetchBookings, type Booking, type BookingStatus } from "../services/bookings";
import { clearToken } from "../services/api";

const bookings: Booking[] = [
  {
    id: "booking-cape-town",
    reference: "NMD-CT48291",
    destination: "Cape Town",
    country: "South Africa",
    hotel: "The Bayview Cape Town",
    checkIn: "18 Oct 2026",
    checkOut: "22 Oct 2026",
    guests: 2,
    nights: 4,
    price: 500000,
    status: "Upcoming",
    image:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "booking-kyoto",
    reference: "NMD-KY73184",
    destination: "Kyoto",
    country: "Japan",
    hotel: "Kyoto Garden Retreat",
    checkIn: "12 Nov 2026",
    checkOut: "16 Nov 2026",
    guests: 2,
    nights: 4,
    price: 950000,
    status: "Confirmed",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "booking-santorini",
    reference: "NMD-SN29547",
    destination: "Santorini",
    country: "Greece",
    hotel: "Aegean Sunset Villas",
    checkIn: "05 Jun 2026",
    checkOut: "09 Jun 2026",
    guests: 2,
    nights: 4,
    price: 850000,
    status: "Completed",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=85",
  },
];

const statusStyles: Record<
  BookingStatus,
  {
    bg: string;
    text: string;
    dot: string;
  }
> = {
  Confirmed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  Upcoming: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  Completed: {
    bg: "bg-[#f1f4f1]",
    text: "text-[#17211b]/60",
    dot: "bg-[#17211b]/40",
  },
  Cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
  },
};

export default function MyBookings() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeFilter, setActiveFilter] = useState<"All" | BookingStatus>(
    "All",
  );
  const [liveBookings, setLiveBookings] = useState<Booking[] | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchBookings()
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setLiveBookings(data);
        }
      })
      .catch(() => {
        // keep mock data as fallback if backend is unreachable
      });
    return () => {
      mounted = false;
    };
  }, [location.key]);

  const allBookings = liveBookings ?? bookings;

  const email =
    localStorage.getItem("nomadia_user_email") || "traveler@nomadia.com";

  const username = email.split("@")[0].replace(/[._-]/g, " ");

  const firstName =
    username.charAt(0).toUpperCase() + username.slice(1).split(" ")[0];

  const activeBookings = allBookings.filter(
    (booking) => booking.status !== "Cancelled",
  );

  const filteredBookings =
    activeFilter === "All"
      ? activeBookings
      : activeBookings.filter((booking) => booking.status === activeFilter);

  const upcomingCount = activeBookings.filter(
    (booking) =>
      booking.status === "Upcoming" || booking.status === "Confirmed",
  ).length;

  const completedCount = activeBookings.filter(
    (booking) => booking.status === "Completed",
  ).length;

  const countriesVisited = new Set(
    activeBookings.map((booking) => booking.country),
  ).size;

  const handleLogout = () => {
    localStorage.removeItem("nomadia_logged_in");
    localStorage.removeItem("nomadia_user_email");
    localStorage.removeItem("nomadia_user_name");
    clearToken();
    navigate("/login");
  };

  const handleBookAgain = (booking: Booking) => {
    const destinationIds: Record<string, string> = {
      "Cape Town": "cape-town",
      Kyoto: "kyoto",
      Santorini: "santorini",
    };

    const destinationId = destinationIds[booking.destination];

    if (destinationId) {
      navigate(`/booking/${destinationId}`);
    } else {
      navigate("/destinations");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-20">
      <section className="border-b border-[#17211b]/10 bg-white">
        <div className="page-container py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#eef3ef] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#17211b]/55">
                <span className="material-symbols-outlined text-[17px]">
                  luggage
                </span>
                My travel plans
              </span>

              <h1 className="mt-5 font-display text-4xl font-semibold text-[#17211b] md:text-6xl">
                Welcome back, {firstName}.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#17211b]/50">
                Keep track of your adventures, upcoming stays, and previous
                journeys all in one place.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#17211b]/10 bg-white px-5 py-3 text-sm font-semibold text-[#17211b]/65 transition hover:border-[#17211b]/20 hover:bg-[#f5f7f5] hover:text-[#17211b]"
            >
              <span className="material-symbols-outlined text-[19px]">
                logout
              </span>
              Sign out
            </button>
          </motion.div>
        </div>
      </section>

      <main className="section-padding">
        <div className="page-container">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total bookings",
            value: activeBookings.length,
            icon: "confirmation_number",
          },
          {
            label: "Upcoming",
            value: upcomingCount,
            icon: "event",
          },
          {
            label: "Completed",
            value: completedCount,
            icon: "check_circle",
          },
          {
            label: "Countries visited",
            value: countriesVisited,
            icon: "public",
          },
        ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-[24px] bg-white p-6 shadow-[0_10px_35px_rgba(23,33,27,0.05)]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef3ef] text-[#17211b]">
                    <span className="material-symbols-outlined text-[21px]">
                      {stat.icon}
                    </span>
                  </div>

                  <span className="font-display text-3xl font-semibold text-[#17211b]">
                    {stat.value}
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-[#17211b]/45">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#17211b]/35">
                Your reservations
              </span>

              <h2 className="mt-2 font-display text-3xl font-semibold text-[#17211b] md:text-4xl">
                Your bookings
              </h2>
            </div>

            <Link
              to="/destinations"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#17211b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#29372e]"
            >
              Find another trip
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
            {(
              [
                "All",
                "Upcoming",
                "Confirmed",
                "Completed",
                "Cancelled",
              ] as const
            ).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? "bg-[#17211b] text-white"
                    : "bg-white text-[#17211b]/50 shadow-sm hover:bg-[#eef3ef] hover:text-[#17211b]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking, index) => {
                const status = statusStyles[booking.status];

                return (
                  <motion.article
                    key={booking.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.06, 0.2),
                    }}
                    className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(23,33,27,0.06)]"
                  >
                    <div className="grid lg:grid-cols-[280px_1fr]">
                      <div className="relative h-64 overflow-hidden lg:h-full lg:min-h-[310px]">
                        <img
                          src={booking.image}
                          alt={booking.destination}
                          className="h-full w-full object-cover transition duration-700 hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                        <div className="absolute bottom-5 left-5">
                          <p className="text-xs font-medium text-white/70">
                            Destination
                          </p>

                          <h3 className="mt-1 font-display text-2xl font-semibold text-white">
                            {booking.destination}
                          </h3>

                          <div className="mt-1 flex items-center gap-1 text-white/75">
                            <span className="material-symbols-outlined text-[15px]">
                              location_on
                            </span>

                            <span className="text-xs">{booking.country}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${status.bg} ${status.text}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                              />
                              {booking.status}
                            </span>

                            <h3 className="mt-4 font-display text-2xl font-semibold text-[#17211b]">
                              {booking.hotel}
                            </h3>

                            <p className="mt-1 text-sm text-[#17211b]/40">
                              Booking reference: {booking.reference}
                            </p>
                          </div>

                          <div className="text-left sm:text-right">
                            <p className="text-xs text-[#17211b]/35">Total</p>

                            <p className="mt-1 text-xl font-bold text-[#17211b]">
                              ₦{booking.price.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="my-7 h-px bg-[#17211b]/10" />

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                          <div>
                            <div className="flex items-center gap-2 text-[#17211b]/35">
                              <span className="material-symbols-outlined text-[18px]">
                                calendar_month
                              </span>

                              <span className="text-xs font-semibold uppercase tracking-wide">
                                Check in
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-bold text-[#17211b]">
                              {booking.checkIn}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-[#17211b]/35">
                              <span className="material-symbols-outlined text-[18px]">
                                event_available
                              </span>

                              <span className="text-xs font-semibold uppercase tracking-wide">
                                Check out
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-bold text-[#17211b]">
                              {booking.checkOut}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-[#17211b]/35">
                              <span className="material-symbols-outlined text-[18px]">
                                group
                              </span>

                              <span className="text-xs font-semibold uppercase tracking-wide">
                                Guests
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-bold text-[#17211b]">
                              {booking.guests}{" "}
                              {booking.guests === 1 ? "Guest" : "Guests"}
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-[#17211b]/35">
                              <span className="material-symbols-outlined text-[18px]">
                                nights_stay
                              </span>

                              <span className="text-xs font-semibold uppercase tracking-wide">
                                Stay
                              </span>
                            </div>

                            <p className="mt-2 text-sm font-bold text-[#17211b]">
                              {booking.nights}{" "}
                              {booking.nights === 1 ? "Night" : "Nights"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-7 flex flex-col gap-3 border-t border-[#17211b]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/account/bookings/${booking.id}`)
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17211b]/10 px-5 py-3 text-sm font-semibold text-[#17211b]/65 transition hover:border-[#17211b]/20 hover:bg-[#f4f7f4] hover:text-[#17211b]"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              receipt_long
                            </span>
                            View details
                          </button>

                          {booking.status === "Upcoming" ||
                          booking.status === "Confirmed" ? (
                            <button
                              type="button"
                              onClick={() =>
                                navigate(`/account/bookings/${booking.id}`)
                              }
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17211b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#29372e]"
                            >
                              Manage booking
                              <span className="material-symbols-outlined text-[18px]">
                                arrow_forward
                              </span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleBookAgain(booking)}
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17211b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#29372e]"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                replay
                              </span>
                              Book again
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[30px] bg-white px-6 py-20 text-center shadow-[0_12px_40px_rgba(23,33,27,0.06)]"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef3ef] text-[#17211b]">
                  <span className="material-symbols-outlined text-[28px]">
                    luggage
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold text-[#17211b]">
                  No bookings found
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#17211b]/50">
                  There are no bookings in the selected category yet.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveFilter("All")}
                  className="mt-6 rounded-full bg-[#17211b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#29372e]"
                >
                  View all bookings
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <section className="bg-[#17211b]">
        <div className="page-container py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="material-symbols-outlined text-3xl text-white">
              explore
            </span>

            <h2 className="mt-5 font-display text-4xl font-semibold text-white md:text-5xl">
              Where will you go next?
            </h2>

            <p className="mt-5 text-base leading-8 text-white/55">
              There is always another destination waiting to be discovered.
              Start planning your next Nomadia journey.
            </p>

            <Link
              to="/destinations"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-7 py-4 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-[#29372e]"
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
