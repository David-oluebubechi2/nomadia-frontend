import { type FormEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { GOOGLE_CLIENT_ID } from "../config";
import { completeAuth, googleLogin, login, register } from "../services/auth";

type GoogleCredential = {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from =
    (location.state as { from?: string } | null)?.from || "/my-bookings";

  const googleButtonContainer = useRef<HTMLDivElement>(null);
  const googleInitialized = useRef(false);

  useEffect(() => {
    const scriptReady = () =>
      typeof window !== "undefined" &&
      !!window.google &&
      !!window.google.accounts;

    const renderButton = () => {
      if (!scriptReady() || !googleButtonContainer.current) {
        return;
      }

      if (googleInitialized.current) {
        return;
      }

      googleInitialized.current = true;

      const id = window.google?.accounts?.id;
      if (!id) {
        return;
      }

      id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: { credential: string }) => {
          handleGoogleCredential(response.credential);
        },
      });

      id.renderButton(googleButtonContainer.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        width: 380,
        text: "continue_with",
        locale: "en",
      });
    };

    if (scriptReady()) {
      renderButton();
      return;
    }

    window.addEventListener("load", renderButton);
    return () => window.removeEventListener("load", renderButton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoogleCredential = async (credential: string) => {
    try {
      const payload = JSON.parse(
        atob(credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
      ) as GoogleCredential;

      setLoading(true);
      setError("");

      const response = await googleLogin({
        email: payload.email,
        name: payload.name,
        image: payload.picture,
        googleId: payload.sub,
      });

      completeAuth(response);
      navigate(from, { replace: true });
    } catch {
      setError("We couldn't verify your Google sign-in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    if (isRegistering && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const doAuth = async () => {
      if (isRegistering) {
        const response = await register(name.trim(), email.trim(), password);
        completeAuth(response);
      } else {
        const response = await login(email.trim(), password);
        completeAuth(response);
      }
    };

    doAuth()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const switchMode = () => {
    setIsRegistering((current) => !current);
    setError("");
    setPassword("");
    setShowPassword(false);
  };

  return (
    <div className="bg-[#f8faf8]">
      <div className="grid min-h-[calc(100vh-5rem)] pt-20 lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-[#17211b] lg:block">
          <img
            src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85"
            alt="Travel destination"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-[#17211b]/95 via-[#17211b]/60 to-[#17211b]/20" />

          <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
            <Link to="/" className="font-display text-3xl font-bold text-white">
              Nomadia
            </Link>

            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
                <span className="material-symbols-outlined text-[18px]">
                  travel_explore
                </span>
                Explore without limits
              </span>

              <h1 className="mt-7 font-display text-5xl font-semibold leading-tight text-white xl:text-6xl">
                Your next adventure is closer than you think.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-white/65">
                Sign in to manage your bookings, discover unforgettable
                experiences, and keep every part of your journey in one place.
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/45">
              <span className="material-symbols-outlined text-[18px]">
                verified
              </span>
              Your journey, beautifully organized.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-10 md:py-16 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="mt-6 lg:hidden">
              <Link
                to="/"
                className="font-display text-3xl font-bold text-[#17211b]"
              >
                Nomadia
              </Link>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#17211b]/40">
                {isRegistering ? "Join Nomadia" : "Welcome back"}
              </p>

              <h2 className="mt-3 font-display text-4xl font-semibold text-[#17211b]">
                {isRegistering ? "Create your account." : "Welcome back."}
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#17211b]/55">
                {isRegistering
                  ? "Create an account to start planning your next journey."
                  : "Sign in to continue your journey with Nomadia."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              {isRegistering && (
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-[#17211b]"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#17211b]/35">
                      person
                    </span>

                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="h-14 w-full rounded-2xl border border-[#17211b]/10 bg-white pl-12 pr-4 text-sm text-[#17211b] outline-none transition placeholder:text-[#17211b]/30 focus:border-[#17211b]/30 focus:ring-4 focus:ring-[#17211b]/5"
                    />
                  </div>
                </div>
              )}

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#17211b]"
                >
                  Email address
                </label>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#17211b]/35">
                    mail
                  </span>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-14 w-full rounded-2xl border border-[#17211b]/10 bg-white pl-12 pr-4 text-sm text-[#17211b] outline-none transition placeholder:text-[#17211b]/30 focus:border-[#17211b]/30 focus:ring-4 focus:ring-[#17211b]/5"
                  />
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#17211b]"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-[#17211b]/35">
                    lock
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={
                      isRegistering
                        ? "Create a password"
                        : "Enter your password"
                    }
                    autoComplete={
                      isRegistering ? "new-password" : "current-password"
                    }
                    className="h-14 w-full rounded-2xl border border-[#17211b]/10 bg-white pl-12 pr-12 text-sm text-[#17211b] outline-none transition placeholder:text-[#17211b]/30 focus:border-[#17211b]/30 focus:ring-4 focus:ring-[#17211b]/5"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#17211b]/35 transition hover:text-[#17211b]"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  <span className="material-symbols-outlined text-[20px]">
                    error
                  </span>
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#17211b] text-sm font-bold text-white transition hover:bg-[#29372e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px] text-white">
                      progress_activity
                    </span>
                    Please wait...
                  </>
                ) : (
                  <>
                    {isRegistering ? "Create Account" : "Sign In"}
                    <span className="material-symbols-outlined text-[19px] text-white">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#17211b]/10" />
              <span className="text-xs font-medium text-[#17211b]/35">OR</span>
              <div className="h-px flex-1 bg-[#17211b]/10" />
            </div>

            <div className="flex min-h-14 items-center justify-center">
              <div ref={googleButtonContainer} className="w-full [&>div]:w-full [&>div>iframe]:!h-full" />
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#17211b]/50">
                {isRegistering
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={switchMode}
                  className="font-bold text-[#17211b] transition hover:opacity-60"
                >
                  {isRegistering ? "Sign in" : "Create an account"}
                </button>
              </p>
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-[#eef3ef] p-4">
              <span className="material-symbols-outlined text-[20px] text-[#17211b]/50">
                security
              </span>

              <p className="text-xs leading-6 text-[#17211b]/50">
                By continuing, you agree to Nomadia's terms and acknowledge our
                privacy policy.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
