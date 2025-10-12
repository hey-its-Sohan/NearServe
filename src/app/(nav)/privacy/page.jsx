export const metadata = {
  title: "Privacy Policy — NearServe",
  description: "Short Privacy Policy for NearServe.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      
      <section className="bg-gradient text-white">
        <div className="fix-alignment py-10 lg:py-14">
          <h1 className="title">Privacy Policy</h1>
          <p className="mt-2 opacity-90">Effective: Oct 9, 2025</p>
        </div>
      </section>

      
      <section className="py-10 lg:py-12">
        <div className="fix-alignment space-y-6">
          <div className="card-animate">
            <h2 className="heading">1) Overview</h2>
            <p className="text-gray">
              This Policy explains how NearServe collects, uses, and protects your information when you use our Service.
            </p>
          </div>

          <div className="card-animate">
            <h2 className="heading">2) Data We Collect</h2>
            <ul className="list-disc pl-5 text-gray space-y-1.5">
              <li>Account data (name, email, role).</li>
              <li>Listing & booking details you provide.</li>
              <li>Usage data and device info; approximate location if permitted.</li>
            </ul>
          </div>

          <div className="card-animate">
            <h2 className="heading">3) How We Use Data</h2>
            <ul className="list-disc pl-5 text-gray space-y-1.5">
              <li>Provide, operate, and improve the platform.</li>
              <li>Process bookings, payments, notifications, and support.</li>
              <li>Prevent fraud and ensure safety; comply with legal obligations.</li>
            </ul>
          </div>

          <div className="card-animate">
            <h2 className="heading">4) Sharing & Retention</h2>
            <ul className="list-disc pl-5 text-gray space-y-1.5">
              <li>Shared only with service providers (e.g., payments) under safeguards.</li>
              <li>No sale of personal data.</li>
              <li>Retained as long as needed for the purposes stated or as required by law.</li>
            </ul>
          </div>

          <div className="card-animate">
            <h2 className="heading">5) Your Choices</h2>
            <ul className="list-disc pl-5 text-gray space-y-1.5">
              <li>Access, update, or delete certain account info.</li>
              <li>Control cookies via your browser settings.</li>
              <li>Opt out of marketing communications.</li>
            </ul>
          </div>

          <div className="card-animate">
            <h2 className="heading">6) Security & Changes</h2>
            <p className="text-gray">
              We use reasonable safeguards but no method is 100% secure. We may update this Policy from time to time.
            </p>
          </div>

          <div className="card-animate">
            <h2 className="heading">7) Contact</h2>
            <p className="text-gray">
              Questions? <span className="font-medium">privacy@nearserve.local</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
