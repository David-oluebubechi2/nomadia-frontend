import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("nomadia_logged_in") === "true";

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#17211b]/10 bg-white shadow-[0_4px_20px_rgba(23,33,27,0.04)]">
      <div className="page-container flex h-20 items-center justify-between">
        <Link
          to="/"
          onClick={closeMenu}
          className="font-display text-2xl font-bold tracking-tight text-[#17211b] sm:text-3xl"
        >
          Nomadia
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            to="/"
            className={`text-sm font-semibold transition ${
              isActive("/")
                ? "text-[#17211b]"
                : "text-[#17211b]/50 hover:text-[#17211b]"
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`text-sm font-semibold transition ${
              isActive("/about")
                ? "text-[#17211b]"
                : "text-[#17211b]/50 hover:text-[#17211b]"
            }`}
          >
            About
          </Link>

          <Link
            to="/travel-guide"
            className={`text-sm font-semibold transition ${
              isActive("/travel-guide")
                ? "text-[#17211b]"
                : "text-[#17211b]/50 hover:text-[#17211b]"
            }`}
          >
            Travel Guide
          </Link>

          <Link
            to="/help-center"
            className={`text-sm font-semibold transition ${
              isActive("/help-center")
                ? "text-[#17211b]"
                : "text-[#17211b]/50 hover:text-[#17211b]"
            }`}
          >
            Help Center
          </Link>

          <Link
            to="/contact"
            className={`text-sm font-semibold transition ${
              isActive("/contact")
                ? "text-[#17211b]"
                : "text-[#17211b]/50 hover:text-[#17211b]"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <>
              <Link
                to="/destinations"
                className="rounded-full border border-[#17211b]/15 px-5 py-2.5 text-sm font-semibold text-[#17211b]/70 transition hover:border-[#17211b]/30 hover:text-[#17211b]"
              >
                My Bookings
              </Link>

              <Link
                to="/destinations"
                className="rounded-full bg-[#17211b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#29372e]"
              >
                Explore
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#17211b]/70 transition hover:bg-[#17211b]/5 hover:text-[#17211b]"
              >
                Login
              </Link>

              <Link
                to="/login"
                className="rounded-full bg-[#17211b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#29372e]"
              >
                Sign in to explore
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17211b]/10 text-[#17211b] transition hover:bg-[#17211b]/15 lg:hidden"
        >
          <span className="material-symbols-outlined text-[23px]">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-[#17211b]/10 bg-white lg:hidden"
          >
            <nav className="page-container flex flex-col py-4">
              <Link
                to="/"
                onClick={closeMenu}
                className={`border-b border-[#17211b]/10 py-4 text-base font-semibold ${
                  isActive("/") ? "text-[#17211b]" : "text-[#17211b]/60"
                }`}
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={closeMenu}
                className={`border-b border-[#17211b]/10 py-4 text-base font-semibold ${
                  isActive("/about") ? "text-[#17211b]" : "text-[#17211b]/60"
                }`}
              >
                About
              </Link>

              <Link
                to="/travel-guide"
                onClick={closeMenu}
                className={`border-b border-[#17211b]/10 py-4 text-base font-semibold ${
                  isActive("/travel-guide")
                    ? "text-[#17211b]"
                    : "text-[#17211b]/60"
                }`}
              >
                Travel Guide
              </Link>

              <Link
                to="/help-center"
                onClick={closeMenu}
                className={`border-b border-[#17211b]/10 py-4 text-base font-semibold ${
                  isActive("/help-center")
                    ? "text-[#17211b]"
                    : "text-[#17211b]/60"
                }`}
              >
                Help Center
              </Link>

              <Link
                to="/contact"
                onClick={closeMenu}
                className={`border-b border-[#17211b]/10 py-4 text-base font-semibold ${
                  isActive("/contact") ? "text-[#17211b]" : "text-[#17211b]/60"
                }`}
              >
                Contact
              </Link>

              <div className="flex gap-3 pt-5">
                {!isLoggedIn && (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex flex-1 items-center justify-center rounded-full border border-[#17211b]/15 px-5 py-3 text-sm font-bold text-[#17211b]"
                  >
                    Login
                  </Link>
                )}

                <Link
                  to={isLoggedIn ? "/destinations" : "/login"}
                  onClick={closeMenu}
                  className="flex flex-1 items-center justify-center rounded-full bg-[#17211b] px-5 py-3 text-sm font-bold text-white"
                >
                  {isLoggedIn ? "Explore" : "Sign in to explore"}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
