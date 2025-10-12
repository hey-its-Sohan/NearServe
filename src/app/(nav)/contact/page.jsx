"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();               // no real submit
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // tiny UX delay
    setSent(true);
    setLoading(false);
    e.currentTarget?.reset();
  };

  return (
    <main className="min-h-screen">
    
      <section className="bg-gradient text-white">
        <div className="fix-alignment py-10 lg:py-14">
          <h1 className="title">Contact</h1>
          <p className="mt-2 opacity-90">We’d love to hear from you.</p>
        </div>
      </section>

      
      <section className="py-10 lg:py-12">
        <div className="fix-alignment grid gap-8 lg:grid-cols-[1fr,380px]">
          <div className="card-animate">
            <h2 className="heading">Send a message</h2>
            <form onSubmit={onSubmit} className="mt-4 grid gap-4" noValidate>
              <div>
                <label className="text-sm text-gray">Full name</label>
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-lg border border-input bg-popover px-3 py-2"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-sm text-gray">Email address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-lg border border-input bg-popover px-3 py-2"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm text-gray">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full rounded-lg border border-input bg-popover px-3 py-2"
                  placeholder="Write your message…"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button type="submit" className="primary-btn w-max" disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </button>
                {sent && (
                  <span className="text-sm font-medium" style={{ color: "var(--color-success)" }}>
                    Sent successfully
                  </span>
                )}
              </div>
            </form>
          </div>

        
          <aside className="card-animate h-max">
            <h3 className="heading">Contact info</h3>
            <ul className="text-gray space-y-3 mt-2">
              <li>
                <span className="font-medium text-foreground">Email:</span>{" "}
                <a href="mailto:support@nearserve.local" className="text-primary hover:underline">
                  support@nearserve.local
                </a>
              </li>
              <li>
                <span className="font-medium text-foreground">Phone:</span> +880 1234-567890
              </li>
              <li>
                <span className="font-medium text-foreground">Hours:</span> Mon–Fri, 9:00–18:00
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
