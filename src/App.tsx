import { Link, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import AccountNavbar from "./components/AccountNavbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTransition from "./components/PageTransition";

import Destinations from "./pages/Destinations";
import Hotels from "./pages/Hotels";
import Tours from "./pages/Tours";
import Booking from "./pages/Booking";
import BookingReview from "./pages/BookingReview";
import BookingPayment from "./pages/BookingPayment";
import BookingSuccess from "./pages/BookingSuccess";
import BookingDetail from "./pages/BookingDetail";
import Login from "./pages/Login";
import MyBookings from "./pages/MyBookings";
import Places from "./pages/Places";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TravelGuide from "./pages/TravelGuide";
import HelpCenter from "./pages/HelpCenter";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <Navbar />

      <main>
        <PageTransition />
      </main>

      <Footer />
    </div>
  );
}

function AccountLayout() {
  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <AccountNavbar />

      <main>
        <PageTransition />
      </main>

      <Footer />
    </div>
  );
}

function Home() {
  return (
    <div className="bg-[#f8faf8]">
      <section className="relative min-h-screen overflow-hidden bg-[#17211b]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85"
            alt="Beautiful travel destination"
            className="h-full w-full object-cover opacity-45"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#17211b] via-[#17211b]/80 to-[#17211b]/20" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#17211b] via-transparent to-[#17211b]/20" />
        </div>

        <div className="page-container relative z-10 flex min-h-screen items-center py-32">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md">
              <span className="material-symbols-outlined text-[18px]">
                explore
              </span>
              Explore More. Live the Journey.
            </span>

            <h1 className="mt-7 font-display text-6xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-8xl">
              Discover places
              <br />
              <span className="text-white/45">worth remembering.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
              Discover extraordinary destinations, beautiful places to stay, and
              unforgettable experiences designed to make every journey
              meaningful.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/destinations"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17211b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#29372e]"
              >
                Explore Destinations
                <span className="material-symbols-outlined text-[19px]">
                  arrow_forward
                </span>
              </Link>

              <Link
                to="/tours"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Discover Experiences
                <span className="material-symbols-outlined text-[19px]">
                  travel_explore
                </span>
              </Link>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-2 gap-8 border-t border-white/15 pt-7 sm:grid-cols-4">
              <div>
                <p className="font-display text-3xl font-semibold text-white">
                  120+
                </p>
                <p className="mt-1 text-xs text-white/45">Destinations</p>
              </div>

              <div>
                <p className="font-display text-3xl font-semibold text-white">
                  500+
                </p>
                <p className="mt-1 text-xs text-white/45">Places to stay</p>
              </div>

              <div>
                <p className="font-display text-3xl font-semibold text-white">
                  250+
                </p>
                <p className="mt-1 text-xs text-white/45">Experiences</p>
              </div>

              <div>
                <p className="font-display text-3xl font-semibold text-white">
                  4.9
                </p>
                <p className="mt-1 text-xs text-white/45">Traveler rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[28px] bg-[#f5f7f5] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17211b] text-white">
                <span className="material-symbols-outlined">public</span>
              </div>

              <h2 className="mt-6 font-display text-2xl font-semibold text-[#17211b]">
                Explore freely
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#17211b]/50">
                Find inspiring destinations and discover new places waiting for
                your next adventure.
              </p>
            </div>

            <div className="rounded-[28px] bg-[#f5f7f5] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17211b] text-white">
                <span className="material-symbols-outlined">hotel</span>
              </div>

              <h2 className="mt-6 font-display text-2xl font-semibold text-[#17211b]">
                Stay beautifully
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#17211b]/50">
                Discover carefully selected hotels, resorts, villas, and
                retreats for every kind of journey.
              </p>
            </div>

            <div className="rounded-[28px] bg-[#f5f7f5] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17211b] text-white">
                <span className="material-symbols-outlined">hiking</span>
              </div>

              <h2 className="mt-6 font-display text-2xl font-semibold text-[#17211b]">
                Live the journey
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#17211b]/50">
                Turn every destination into a story with unforgettable tours and
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#17211b]">
        <div className="page-container py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="material-symbols-outlined text-3xl text-white">
              flight_takeoff
            </span>

            <h2 className="mt-5 font-display text-4xl font-semibold text-white md:text-5xl">
              Your next adventure is waiting.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/55">
              Choose a destination, find the perfect stay, and start creating
              memories that last long after the journey ends.
            </p>

            <Link
              to="/destinations"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#17211b] transition hover:bg-[#eef3ef]"
            >
              Start Exploring
              <span className="material-symbols-outlined text-[19px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#f8faf8] px-6">
      <div className="text-center">
        <span className="material-symbols-outlined text-6xl text-[#17211b]">
          travel_explore
        </span>

        <h1 className="mt-5 font-display text-4xl font-semibold text-[#17211b]">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-7 text-[#17211b]/50">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#17211b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#29372e]"
        >
          Back to home
          <span className="material-symbols-outlined text-[19px]">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/travel-guide" element={<TravelGuide />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AccountLayout />}>
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<Places />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<Places />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/account/bookings/:id" element={<BookingDetail />} />
        </Route>

        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/booking/:id/review" element={<BookingReview />} />
        <Route path="/booking/:id/payment" element={<BookingPayment />} />
        <Route path="/booking/success" element={<BookingSuccess />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
