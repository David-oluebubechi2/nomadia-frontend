import { type FormEvent, useState } from "react";
import { motion } from "motion/react";

const contactChannels = [
  {
    icon: "mail",
    title: "Email us",
    text: "oluebubechidavid@gmail.com",
    note: "We reply within 24 hours",
    href: "mailto:oluebubechidavid@gmail.com",
  },
  {
    icon: "call",
    title: "Call us",
    text: "+234 704 605 9865",
    note: "Mon–Fri, 9am–6pm",
    href: "tel:+2347046059865",
  },
  {
    icon: "chat",
    title: "Live chat",
    text: "Chat with a real person",
    note: "Available 7 days a week",
    href: null,
  },
];

type ChatMessage = {
  id: number;
  from: "user" | "bot";
  text: string;
};

const botReplies: Record<string, string> = {
  booking: "Good news — sign in and open 'My Bookings' to view, modify, or cancel any upcoming trip. Need help with a specific reservation?",
  cancel:
    "You can cancel an upcoming booking from 'My Bookings' → 'Manage booking' → 'Cancel booking'. Refunds are processed within 5–10 business days.",
  payment:
    "We accept major credit and debit cards, bank transfers, and select digital wallets. All payments are processed securely at checkout.",
  greeting:
    "Hello! 👋 Welcome to Nomadia. How can I help you today? You can ask about bookings, payments, or destinations.",
  default:
    "Thanks for your message! A member of our support team will get back to you shortly. In the meantime, I can help with booking questions, cancellations, or payments — just ask!",
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      from: "bot",
      text: "Hi there! 👋 Welcome to Nomadia support. Ask me about bookings, cancellations, or payments.",
    },
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const getBotReply = (input: string): string => {
    const value = input.toLowerCase();

    if (value.includes("book")) {
      return botReplies.booking;
    }
    if (value.includes("cancel")) {
      return botReplies.cancel;
    }
    if (value.includes("pay")) {
      return botReplies.payment;
    }
    if (value.includes("hi") || value.includes("hello") || value.includes("hey")) {
      return botReplies.greeting;
    }
    return botReplies.default;
  };

  const handleSendMessage = () => {
    const text = chatInput.trim();
    if (!text) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      from: "user",
      text,
    };

    setMessages((current) => [...current, userMessage]);
    setChatInput("");

    window.setTimeout(() => {
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        from: "bot",
        text: getBotReply(text),
      };
      setMessages((current) => [...current, botMessage]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <section className="relative overflow-hidden bg-[#17211b]">
        <div className="page-container py-28 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Contact Us
            </span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-7xl">
              Let's talk.
              <br />
              <span className="text-white/60">We're here to help.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
              Questions about a trip, a booking, or the platform? Reach out and
              a real person from our team will get back to you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="page-container">
          <div className="grid gap-8 md:grid-cols-3">
            {contactChannels.map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col rounded-[28px] bg-white p-8 shadow-[0_12px_40px_rgba(23,33,27,0.06)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3ef] text-[#17211b]">
                  <span className="material-symbols-outlined">{channel.icon}</span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-[#17211b]">
                  {channel.title}
                </h3>
                <p className="mt-2 text-base font-semibold text-[#17211b]">
                  {channel.text}
                </p>
                <p className="mt-1 text-sm text-[#17211b]/45">{channel.note}</p>

                {channel.title === "Live chat" ? (
                  <div className="mt-auto">
                    <button
                      type="button"
                      onClick={() => setChatOpen(true)}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#17211b] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#29372e]"
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        chat
                      </span>
                      Start a chat
                    </button>
                  </div>
                ) : (
                  <a
                    href={channel.href as string}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#17211b] transition hover:underline"
                  >
                    {channel.title === "Email us" ? "Send an email" : "Call now"}
                    <span className="material-symbols-outlined text-[17px]">
                      arrow_forward
                    </span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="page-container">
          <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_12px_40px_rgba(23,33,27,0.06)]">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=85"
                  alt="Travel consultation"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#17211b]/60" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="font-display text-2xl font-semibold">
                    Send us a message
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/75">
                    Tell us about your trip plans or booking and we'll get back
                    to you as soon as possible.
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-10">
                {submitted ? (
                  <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                      <span className="material-symbols-outlined text-[32px] text-emerald-600">
                        check
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-semibold text-[#17211b]">
                      Message sent
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-7 text-[#17211b]/50">
                      Thanks for reaching out! A member of our team will be in
                      touch within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-semibold text-[#17211b]"
                        >
                          Full name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Jane Smith"
                          className="w-full rounded-2xl border border-[#17211b]/10 bg-[#f8faf8] px-4 py-3 text-sm text-[#17211b] outline-none transition focus:border-[#17211b]/30"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-semibold text-[#17211b]"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="jane@email.com"
                          className="w-full rounded-2xl border border-[#17211b]/10 bg-[#f8faf8] px-4 py-3 text-sm text-[#17211b] outline-none transition focus:border-[#17211b]/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-semibold text-[#17211b]"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        className="w-full rounded-2xl border border-[#17211b]/10 bg-[#f8faf8] px-4 py-3 text-sm text-[#17211b] outline-none transition focus:border-[#17211b]/30"
                      >
                        <option>General inquiry</option>
                        <option>Booking support</option>
                        <option>Travel guide question</option>
                        <option>Partnerships</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-semibold text-[#17211b]"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        placeholder="How can we help?"
                        className="w-full resize-none rounded-2xl border border-[#17211b]/10 bg-[#f8faf8] px-4 py-3 text-sm text-[#17211b] outline-none transition focus:border-[#17211b]/30"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#17211b] px-6 text-sm font-bold text-white transition hover:bg-[#29372e]"
                    >
                      Send message
                      <span className="material-symbols-outlined text-[19px]">send</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-t-[30px] bg-white shadow-2xl sm:h-[600px] sm:rounded-[30px]"
          >
            <div className="flex items-center gap-3 border-b border-[#17211b]/10 bg-[#17211b] px-6 py-4 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <span className="material-symbols-outlined text-[22px]">support_agent</span>
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold">Nomadia Support</p>
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online now
                </p>
              </div>

              <button
                type="button"
                onClick={() => setChatOpen(false)}
                aria-label="Close chat"
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/15"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[#f8faf8] px-5 py-5">
              {messages.map((message) =>
                message.from === "bot" ? (
                  <div key={message.id} className="flex items-end gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17211b] text-white">
                      <span className="material-symbols-outlined text-[17px]">support_agent</span>
                    </div>
                    <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm leading-6 text-[#17211b]/80 shadow-sm">
                      {message.text}
                    </div>
                  </div>
                ) : (
                  <div key={message.id} className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[#17211b] px-4 py-3 text-sm leading-6 text-white shadow-sm">
                      {message.text}
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="border-t border-[#17211b]/10 bg-white px-4 py-3">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Type your message..."
                  className="min-w-0 flex-1 rounded-full border border-[#17211b]/10 bg-[#f8faf8] px-5 py-3 text-sm text-[#17211b] outline-none transition focus:border-[#17211b]/30"
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#17211b] text-white transition hover:bg-[#29372e]"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
