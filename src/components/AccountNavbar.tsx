import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function AccountNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("nomadia_logged_in");
    localStorage.removeItem("nomadia_user_email");
    localStorage.removeItem("nomadia_user_name");
    setMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const isActive = (path: string) => {
    if (path === "/my-bookings") {
      return (
        location.pathname === "/my-bookings" ||
        location.pathname.startsWith("/my-bookings/") ||
        location.pathname.startsWith("/account/bookings/")
      );
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const getNavClass = (path: string) =>
    `text-sm font-semibold transition ${
      isActive(path)
        ? "text-[#17211b]"
        : "text-[#17211b]/45 hover:text-[#17211b]"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#17211b]/10 bg-white">
      <div className="page-container">
        <div className="flex h-20 items-center justify-between">
          <Link
            to="/"
            onClick={closeMenu}
            className="font-display text-2xl font-bold tracking-[-0.03em] text-[#17211b]"
          >
            Nomadia
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link to="/destinations" className={getNavClass("/destinations")}>
              Explore
            </Link>

            <Link to="/hotels" className={getNavClass("/hotels")}>
              Hotels
            </Link>

            <Link to="/tours" className={getNavClass("/tours")}>
              Tours
            </Link>

            <Link to="/my-bookings" className={getNavClass("/my-bookings")}>
              My Bookings
            </Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/my-bookings"
              className="flex h-11 items-center gap-2 rounded-full bg-[#17211b] px-5 text-sm font-bold text-white transition hover:bg-[#29372e]"
            >
              <span className="material-symbols-outlined text-[19px] text-white">
                confirmation_number
              </span>
              My Bookings
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 items-center gap-2 rounded-full border border-[#17211b]/10 px-5 text-sm font-semibold text-[#17211b]/60 transition hover:border-[#17211b]/20 hover:bg-[#f5f7f5] hover:text-[#17211b]"
            >
              <span className="material-symbols-outlined text-[19px]">
                logout
              </span>
              Sign out
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1f4f1] text-[#17211b] transition hover:bg-[#e7ece8] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="border-t border-[#17211b]/10 py-5">
                <div className="flex flex-col gap-2">
                  <Link
                    to="/destinations"
                    onClick={closeMenu}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive("/destinations")
                        ? "bg-[#eef3ef] text-[#17211b]"
                        : "text-[#17211b]/65 hover:bg-[#f1f4f1] hover:text-[#17211b]"
                    }`}
                  >
                    Explore
                  </Link>

                  <Link
                    to="/hotels"
                    onClick={closeMenu}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive("/hotels")
                        ? "bg-[#eef3ef] text-[#17211b]"
                        : "text-[#17211b]/65 hover:bg-[#f1f4f1] hover:text-[#17211b]"
                    }`}
                  >
                    Hotels
                  </Link>

                  <Link
                    to="/tours"
                    onClick={closeMenu}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive("/tours")
                        ? "bg-[#eef3ef] text-[#17211b]"
                        : "text-[#17211b]/65 hover:bg-[#f1f4f1] hover:text-[#17211b]"
                    }`}
                  >
                    Tours
                  </Link>

                  <Link
                    to="/my-bookings"
                    onClick={closeMenu}
                    className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                      isActive("/my-bookings")
                        ? "bg-[#17211b] text-white"
                        : "bg-[#eef3ef] text-[#17211b] hover:bg-[#e3ebe5]"
                    }`}
                  >
                    My Bookings
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-[#17211b]/60 transition hover:bg-red-50 hover:text-red-700"
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      logout
                    </span>
                    Sign out
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
