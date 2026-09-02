import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#17211b] text-white">
      <div className="page-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="font-display text-3xl font-bold tracking-tight"
            >
              Nomadia
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Discover extraordinary destinations, beautiful stays, and
              unforgettable experiences around the world.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">
                  photo_camera
                </span>
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">
                  public
                </span>
              </a>

              <a
                href="mailto:hello@nomadia.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">
                  mail
                </span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-4">
              <Link
                to="/destinations"
                className="text-sm text-white/60 transition hover:text-white"
              >
                Destinations
              </Link>

              <Link
                to="/hotels"
                className="text-sm text-white/60 transition hover:text-white"
              >
                Hotels
              </Link>

              <Link
                to="/tours"
                className="text-sm text-white/60 transition hover:text-white"
              >
                Tours & Activities
              </Link>

              <Link
                to="/my-bookings"
                className="text-sm text-white/60 transition hover:text-white"
              >
                My Bookings
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Company
            </h3>

            <div className="mt-5 flex flex-col gap-4">
              <Link
                to="/about"
                className="text-sm text-white/60 transition hover:text-white"
              >
                About Nomadia
              </Link>

              <Link
                to="/contact"
                className="text-sm text-white/60 transition hover:text-white"
              >
                Contact Us
              </Link>

              <Link
                to="/travel-guide"
                className="text-sm text-white/60 transition hover:text-white"
              >
                Travel Guide
              </Link>

              <Link
                to="/help-center"
                className="text-sm text-white/60 transition hover:text-white"
              >
                Help Center
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              Stay Connected
            </h3>

            <p className="mt-5 text-sm leading-7 text-white/60">
              Get travel inspiration, destination ideas, and exclusive offers
              delivered to your inbox.
            </p>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-5 flex overflow-hidden rounded-full border border-white/10 bg-white/5"
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                required
                className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#17211b] transition hover:bg-[#e7eee9]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-4 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Nomadia. All rights reserved.</p>

            <div className="flex flex-wrap gap-6">
              <Link to="/" className="transition hover:text-white">
                Privacy Policy
              </Link>

              <Link to="/" className="transition hover:text-white">
                Terms of Service
              </Link>

              <Link to="/" className="transition hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
