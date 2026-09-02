import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { cancelBooking, fetchBooking, type BookingStatus } from "../services/bookings";

type Booking = {
  id: string;
  reference: string;
  destination: string;
  country: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  price: number;
  status: BookingStatus;
  image: string;
  itemId?: string;
  traveller: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  payment: {
    method: string;
    last4: string;
    date: string;
    total: number;
    status: "Paid" | "Pending" | "Refunded";
  };
};

const allBookings: Record<string, Booking> = {
  "booking-cape-town": {
    id: "cape-town",
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
    traveller: {
      firstName: "Aisha",
      lastName: "Bello",
      email: "aisha.bello@email.com",
      phone: "+234 801 234 5678",
    },
    payment: {
      method: "Visa",
      last4: "4242",
      date: "10 Sep 2026",
      total: 500000,
      status: "Paid",
    },
  },
  "booking-kyoto": {
    id: "kyoto",
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
    traveller: {
      firstName: "Aisha",
      lastName: "Bello",
      email: "aisha.bello@email.com",
      phone: "+234 801 234 5678",
    },
    payment: {
      method: "Visa",
      last4: "4242",
      date: "28 Sep 2026",
      total: 950000,
      status: "Paid",
    },
  },
  "booking-santorini": {
    id: "santorini",
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
    traveller: {
      firstName: "Aisha",
      lastName: "Bello",
      email: "aisha.bello@email.com",
      phone: "+234 801 234 5678",
    },
    payment: {
      method: "Visa",
      last4: "4242",
      date: "20 May 2026",
      total: 850000,
      status: "Paid",
    },
  },
};

const statusStyles: Record<
  BookingStatus,
  { bg: string; text: string; dot: string; label: string }
> = {
  Confirmed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    label: "Confirmed",
  },
  Upcoming: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    label: "Upcoming",
  },
  Completed: {
    bg: "bg-[#f1f4f1]",
    text: "text-[#17211b]/60",
    dot: "bg-[#17211b]/40",
    label: "Completed",
  },
  Cancelled: {
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
    label: "Cancelled",
  },
};

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [live, setLive] = useState<Booking | null>(null);

  const mockBooking = id ? allBookings[id] : undefined;
  const booking = live ?? mockBooking;

  useEffect(() => {
    if (!id) {
      return;
    }
    let mounted = true;
    fetchBooking(id)
      .then((data) => {
        if (mounted && data) {
          setLive(data as unknown as Booking);
        }
      })
      .catch(() => {
        // fall back to mock data if backend is unreachable
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f8faf8] pt-20">
        <section className="section-padding">
          <div className="page-container flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#eef3ef]">
              <span className="material-symbols-outlined text-[36px] text-[#17211b]">
                search_off
              </span>
            </div>

            <h1 className="mt-6 font-display text-3xl font-semibold text-[#17211b]">
              Booking not found
            </h1>

            <p className="mt-3 max-w-md text-sm leading-7 text-[#17211b]/50">
              We couldn't find a booking with that reference. Check your
              bookings list and try again.
            </p>

            <Link
              to="/my-bookings"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#29372e]"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              Back to my bookings
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const style = statusStyles[booking.status];
  const isManageable =
    booking.status === "Upcoming" || booking.status === "Confirmed";

  const handleCancelBooking = async () => {
    setShowCancelModal(false);
    if (id) {
      try {
        await cancelBooking(id);
      } catch {
        // fall back to local cancellation if backend is unreachable
      }
    }
    setCancelled(true);
  };

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-20">
      <section className="border-b border-[#17211b]/10 bg-white">
        <div className="page-container py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/my-bookings"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#17211b]/50 transition hover:text-[#17211b]"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              Back to my bookings
            </Link>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-display text-3xl font-semibold text-[#17211b]">
                    {booking.destination}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {cancelled ? "Cancelled" : style.label}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#17211b]/50">
                  Booking reference:{" "}
                  <span className="font-mono font-semibold text-[#17211b]">
                    {booking.reference}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="overflow-hidden rounded-[30px] bg-white shadow-[0_12px_40px_rgba(23,33,27,0.06)]"
              >
                <div className="relative h-56 sm:h-72">
                  <img
                    src={booking.image}
                    alt={booking.destination}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-sm font-medium text-white/80">
                      {booking.country}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-white">
                      {booking.destination}
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#17211b]/40">
                    Trip details
                  </h3>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-2xl bg-[#f8faf8] p-4">
                      <span className="material-symbols-outlined text-[22px] text-[#17211b]/50">
                        hotel
                      </span>

                      <div>
                        <p className="text-xs font-semibold text-[#17211b]/40">
                          Hotel
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#17211b]">
                          {booking.hotel}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-[#f8faf8] p-4">
                      <span className="material-symbols-outlined text-[22px] text-[#17211b]/50">
                        calendar_today
                      </span>

                      <div>
                        <p className="text-xs font-semibold text-[#17211b]/40">
                          Dates
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#17211b]">
                          {booking.checkIn} — {booking.checkOut}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-[#f8faf8] p-4">
                      <span className="material-symbols-outlined text-[22px] text-[#17211b]/50">
                        group
                      </span>

                      <div>
                        <p className="text-xs font-semibold text-[#17211b]/40">
                          Guests
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#17211b]">
                          {booking.guests}{" "}
                          {booking.guests === 1 ? "guest" : "guests"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-[#f8faf8] p-4">
                      <span className="material-symbols-outlined text-[22px] text-[#17211b]/50">
                        nights_stay
                      </span>

                      <div>
                        <p className="text-xs font-semibold text-[#17211b]/40">
                          Duration
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#17211b]">
                          {booking.nights}{" "}
                          {booking.nights === 1 ? "night" : "nights"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-[30px] bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)] sm:p-8"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#17211b]/40">
                  Traveller details
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#f8faf8] p-4">
                    <p className="text-xs font-semibold text-[#17211b]/40">
                      Full name
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#17211b]">
                      {booking.traveller.firstName}{" "}
                      {booking.traveller.lastName}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f8faf8] p-4">
                    <p className="text-xs font-semibold text-[#17211b]/40">
                      Email
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#17211b]">
                      {booking.traveller.email}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f8faf8] p-4">
                    <p className="text-xs font-semibold text-[#17211b]/40">
                      Phone
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#17211b]">
                      {booking.traveller.phone}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-[30px] bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)] sm:p-8"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#17211b]/40">
                  Payment summary
                </h3>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#17211b]/60">
                      {booking.nights} nights × {booking.guests} guests
                    </span>
                    <span className="text-sm font-semibold text-[#17211b]">
                      ₦{booking.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#17211b]/60">Taxes</span>
                    <span className="text-sm font-semibold text-[#17211b]">
                      Included
                    </span>
                  </div>

                  <div className="border-t border-[#17211b]/10 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#17211b]">
                        Total
                      </span>
                      <span className="text-lg font-bold text-[#17211b]">
                        ₦{booking.payment.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="rounded-[30px] bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)] sm:p-8"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#17211b]/40">
                  Payment info
                </h3>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8faf8]">
                      <span className="material-symbols-outlined text-[20px] text-[#17211b]">
                        credit_card
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#17211b]">
                        {booking.payment.method} •••• {booking.payment.last4}
                      </p>
                      <p className="text-xs text-[#17211b]/50">
                        Charged on {booking.payment.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">
                      check_circle
                    </span>
                    <span className="text-xs font-semibold text-emerald-700">
                      {cancelled ? "Refunded" : booking.payment.status}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="rounded-[30px] bg-white p-6 shadow-[0_12px_40px_rgba(23,33,27,0.06)] sm:p-8"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#17211b]/40">
                  Actions
                </h3>

                <div className="mt-5 space-y-3">
                  {isManageable && !cancelled ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/booking/${booking.itemId ?? booking.id}`)
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#17211b] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#29372e]"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                        Modify booking
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowCancelModal(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 px-5 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          cancel
                        </span>
                        Cancel booking
                      </button>
                    </>
                  ) : cancelled ? (
                    <div className="rounded-2xl bg-red-50 p-4 text-center">
                      <p className="text-sm font-semibold text-red-700">
                        This booking has been cancelled
                      </p>
                      <p className="mt-1 text-xs text-red-500">
                        A refund will be processed within 5–10 business days.
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-[#f8faf8] p-4 text-center">
                      <p className="text-sm font-semibold text-[#17211b]/60">
                        No actions available for this booking
                      </p>
                    </div>
                  )}

                  <Link
                    to="/destinations"
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[#17211b]/10 px-5 py-3.5 text-sm font-semibold text-[#17211b]/65 transition hover:border-[#17211b]/20 hover:bg-[#f4f7f4] hover:text-[#17211b]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      travel_explore
                    </span>
                    Explore destinations
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md rounded-[30px] bg-white p-8 shadow-2xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <span className="material-symbols-outlined text-[28px] text-red-600">
                warning
              </span>
            </div>

            <h2 className="mt-5 font-display text-xl font-semibold text-[#17211b]">
              Cancel booking?
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#17211b]/55">
              Are you sure you want to cancel your booking to{" "}
              <span className="font-semibold text-[#17211b]">
                {booking.destination}
              </span>
              ? This action cannot be undone. A refund will be processed within
              5–10 business days.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 rounded-full border border-[#17211b]/10 px-5 py-3 text-sm font-semibold text-[#17211b]/65 transition hover:border-[#17211b]/20 hover:bg-[#f4f7f4] hover:text-[#17211b]"
              >
                Keep booking
              </button>

              <button
                type="button"
                onClick={handleCancelBooking}
                className="flex-1 rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
              >
                Yes, cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
