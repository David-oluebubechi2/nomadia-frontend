import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { PAYSTACK_PUBLIC_KEY } from "../config";
import { createBooking, type Booking } from "../services/bookings";

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
};

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.PaystackPop) {
      resolve();
      return;
    }

    let settled = false;
    const finish = (fn: () => void) => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearInterval(poll);
      window.clearTimeout(timeout);
      fn();
    };

    if (!document.querySelector('script[src*="paystack"]')) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v2/inline.js";
      script.onerror = () =>
        finish(() => reject(new Error("Failed to load Paystack script")));
      document.head.appendChild(script);
    }

    const poll = window.setInterval(() => {
      if (window.PaystackPop) {
        finish(resolve);
      }
    }, 150);

    const timeout = window.setTimeout(() => {
      finish(() => reject(new Error("Timed out loading Paystack")));
    }, 12000);
  });
}

export default function BookingPayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking as BookingData | undefined;

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paystackReady, setPaystackReady] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadPaystackScript()
      .then(() => {
        if (mounted) setPaystackReady(true);
      })
      .catch(() => {
        if (mounted) {
          setPaystackReady(false);
          setScriptError(true);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const retryLoad = () => {
    setScriptError(false);
    loadPaystackScript()
      .then(() => setPaystackReady(true))
      .catch(() => setScriptError(true));
  };

  const openPaystack = useCallback(() => {
    if (!booking) {
      return;
    }

    if (!paystackReady || !window.PaystackPop) {
      setPaymentError(
        "The secure payment gateway could not be loaded. Please check your connection and try again.",
      );
      return;
    }

    const email = booking.email?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setPaymentError(
        "Your booking email is missing or invalid. Please go back and provide a valid email address.",
      );
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    const reference = `NMD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const paystack = new window.PaystackPop();

    const completeBooking = async (transaction: { reference: string }) => {
      const checkIn = booking.date;
      const nights =
        parseInt(booking.duration.match(/\d+/)?.[0] ?? "1", 10) || 1;
      const nameParts = booking.fullName.split(" ");

      let persistedBooking: Booking | null = null;
      try {
        persistedBooking = await createBooking({
          destination: booking.title,
          country: booking.location,
          hotel: booking.title,
          checkIn,
          checkOut: checkIn,
          guests: booking.guests,
          nights,
          price: booking.total,
          image: booking.image,
          category: booking.category,
          itemId: booking.id != null ? String(booking.id) : undefined,
          traveller: {
            firstName: nameParts[0] || "Guest",
            lastName: nameParts.slice(1).join(" ") || "Traveler",
            email: booking.email,
            phone: booking.phone,
          },
          payment: {
            method: "Card",
            last4: "0000",
            total: booking.total,
          },
        });
      } catch (error) {
        setIsProcessing(false);
        const message =
          error instanceof Error ? error.message : "Something went wrong.";
        setPaymentError(
          `Your payment succeeded but we couldn't save your booking (${message}). Please make sure you are signed in and try again.`,
        );
        return;
      }

      navigate("/booking/success", {
        state: {
          booking: {
            ...booking,
            paymentMethod: "card",
            bookingReference:
              persistedBooking?.reference ||
              transaction.reference ||
              `NMD-${Date.now().toString().slice(-8).toUpperCase()}`,
          },
        },
      });
    };

    paystack.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      email,
      amount: Math.round(booking.total * 100),
      currency: "NGN",
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Booking Title",
            variable_name: "booking_title",
            value: booking.title,
          },
          {
            display_name: "Booking Type",
            variable_name: "booking_type",
            value: booking.type,
          },
        ],
      },
      onCancel: () => {
        setIsProcessing(false);
      },
      onSuccess: (transaction) => {
        setIsProcessing(true);
        void completeBooking(transaction);
      },
    });
  }, [booking, paystackReady, navigate]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f8faf8] px-6 py-24">
        <div className="mx-auto max-w-2xl rounded-[30px] bg-white p-10 text-center shadow-sm">
          <span className="material-symbols-outlined text-5xl text-[#17211b]">
            payment
          </span>

          <h1 className="mt-5 font-display text-3xl font-semibold text-[#17211b]">
            Payment information not found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#17211b]/50">
            Your booking information could not be found. Please return to your
            booking and try again.
          </p>

          <button
            type="button"
            onClick={() => navigate("/destinations")}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#17211b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#29372e] focus:outline-none focus:ring-2 focus:ring-[#17211b]/30"
          >
            Explore destinations
            <span className="material-symbols-outlined text-[19px] text-white">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] px-6 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <p className="text-sm font-semibold text-[#17211b]/45">
              Step 3 of 3
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 rounded-full bg-[#17211b]" />
              <div className="h-1.5 flex-1 rounded-full bg-[#17211b]" />
              <div className="h-1.5 flex-1 rounded-full bg-[#17211b]" />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <div className="rounded-[30px] bg-white p-6 shadow-sm md:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ef]">
                    <span className="material-symbols-outlined text-[#17211b]">
                      lock
                    </span>
                  </div>

                  <div>
                    <h1 className="font-display text-3xl font-semibold text-[#17211b]">
                      Secure payment
                    </h1>

                    <p className="mt-1 text-sm text-[#17211b]/45">
                      Pay securely with your debit or credit card.
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-[24px] bg-[#f5f7f5] p-6">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[28px] text-[#17211b]">
                      credit_card
                    </span>

                    <div>
                      <p className="text-sm font-bold text-[#17211b]">
                        Card payment
                      </p>

                      <p className="mt-1 text-xs text-[#17211b]/50">
                        You will be prompted to enter your card details securely
                        via Paystack.
                      </p>
                    </div>
                  </div>
                </div>

                {paymentError && (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <span className="material-symbols-outlined text-[20px]">
                      error
                    </span>
                    <p>{paymentError}</p>
                  </div>
                )}

                {scriptError && (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    <span className="material-symbols-outlined text-[20px]">
                      error
                    </span>
                    <div className="flex-1">
                      <p>
                        The payment gateway could not be loaded. Check your
                        connection.
                      </p>
                      <button
                        type="button"
                        onClick={retryLoad}
                        className="mt-2 text-xs font-bold text-amber-800 underline underline-offset-2"
                      >
                        Retry loading
                      </button>
                    </div>
                  </div>
                )}

                {!paystackReady && !scriptError && !paymentError && (
                  <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    <span className="material-symbols-outlined text-[20px]">
                      hourglass_empty
                    </span>
                    <p>Loading payment gateway...</p>
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-[24px] border border-[#dfe7e1] bg-[#eef3ef] p-5">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-[#17211b]">
                    verified_user
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold text-[#17211b]">
                      Your payment is protected
                    </h3>

                    <p className="mt-1 text-xs leading-6 text-[#17211b]/55">
                      Paystack encrypts your card details. Your payment
                      information is safe and secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside>
              <div className="sticky top-24 rounded-[30px] bg-[#17211b] p-7 text-white shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  Final total
                </p>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <h2 className="font-display text-2xl font-semibold">
                    {booking.title}
                  </h2>

                  <span className="whitespace-nowrap font-display text-3xl font-semibold">
                    ₦{booking.total.toLocaleString()}
                  </span>
                </div>

                <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-white/50">Travelers</span>

                    <span className="text-sm font-semibold">
                      {booking.guests}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-white/50">Travel date</span>

                    <span className="text-right text-sm font-semibold">
                      {booking.date}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-sm text-white/50">Payment</span>

                    <span className="text-sm font-semibold">Card</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={openPaystack}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#17211b] px-6 py-4 text-sm font-bold text-white ring-1 ring-white/25 transition hover:bg-[#29372e] focus:outline-none focus:ring-2 focus:ring-white/60 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isProcessing ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[19px] text-white">
                        progress_activity
                      </span>
                      Opening secure payment...
                    </>
                  ) : (
                    <>
                      Pay ₦{booking.total.toLocaleString()}
                      <span className="material-symbols-outlined text-[19px] text-white">
                        lock
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate(`/booking/${booking.id}/review`, {
                      state: {
                        booking,
                      },
                    })
                  }
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <span className="material-symbols-outlined text-[18px] text-white">
                    arrow_back
                  </span>
                  Back to review
                </button>

                <p className="mt-5 text-center text-xs leading-5 text-white/35">
                  By confirming your payment, you agree to the booking terms
                  and conditions.
                </p>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
