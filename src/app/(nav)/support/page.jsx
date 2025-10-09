"use client";

import { useState } from "react";

export default function SupportPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setSent(true);
    setLoading(false);
    e.currentTarget?.reset();
  };

  return (
    <main className="min-h-screen">
      
      <section className="bg-gradient text-white">
        <div className="fix-alignment py-10 lg:py-14">
          <h1 className="title">Support Center</h1>
          <p className="mt-2 opacity-90">
            Tell us what you need help with—we’ll get you the right guidance.
          </p>
        </div>
      </section>

      {/* form */}
      <section className="py-10 lg:py-12">
        <div className="fix-alignment grid gap-8 lg:grid-cols-[1fr,380px]">
          <div className="card-animate">
            <h2 className="heading">Create a support request</h2>
            <form onSubmit={onSubmit} className="mt-4 grid gap-4" noValidate>
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
                <label className="text-sm text-gray">Category</label>
                <select
                  name="category"
                  className="mt-2 w-full rounded-lg border border-input bg-popover px-3 py-2"
                  defaultValue="technical"
                >
                  <option value="technical">Technical issue</option>
                  <option value="billing">Billing</option>
                  <option value="account">Account & role</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full rounded-lg border border-input bg-popover px-3 py-2"
                  placeholder="Describe the issue…"
                />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button type="submit" className="primary-btn w-max" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
                {sent && (
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-success)" }}
                  >
                    Request submitted successfully
                  </span>
                )}
              </div>
            </form>
          </div>

          <aside className="card-animate h-max">
            <h3 className="heading">Quick help</h3>
            <ul className="text-gray space-y-3 mt-2">
              
              <li>
                <span className="font-medium text-foreground">Policies:</span>{" "}
                <a href="/terms" className="text-primary hover:underline">Terms</a> ·{" "}
                <a href="/privacy" className="text-primary hover:underline">Privacy</a>
              </li>
              <li>
                Prefer email? <span className="font-medium text-foreground">support@nearserve.local</span>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
