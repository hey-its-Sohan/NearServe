export const metadata = {
  title: "Terms of Service — NearServe",
  description: "Short Terms of Service for NearServe.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen">
    
      <section className="bg-gradient text-white">
        <div className="fix-alignment py-10 lg:py-14">
          <h1 className="title">Terms of Service</h1>
          <p className="mt-2 opacity-90">Effective: Oct 9, 2025</p>
        </div>
      </section>

    
      <section className="py-10 lg:py-12">
        <div className="fix-alignment space-y-6">
          <div className="card-animate">
            <h2 className="heading">1) Agreement</h2>
            <p className="text-gray">
              By using NearServe, you agree to these Terms. If you do not agree, please do not use the Service.
            </p>
          </div>

          <div className="card-animate">
            <h2 className="heading">2) Accounts & Roles</h2>
            <ul className="list-disc pl-5 text-gray space-y-1.5">
              <li>Provide accurate info and keep your credentials secure.</li>
              <li>Roles: <b>Customer</b>, <b>Provider</b>, or <b>Admin</b>. Features may vary by role.</li>
            </ul>
          </div>

          <div className="card-animate">
            <h2 className="heading">3) Listings & Bookings</h2>
            <ul className="list-disc pl-5 text-gray space-y-1.5">
              <li>Providers must describe services clearly with price and availability.</li>
              <li>Customers can request bookings; Providers may accept or decline.</li>
            </ul>
          </div>

          <div className="card-animate">
            <h2 className="heading">4) Payments & Cancellations</h2>
            <ul className="list-disc pl-5 text-gray space-y-1.5">
              <li>Payments are processed via authorized partners; applicable fees may apply.</li>
              <li>Cancellation/refund eligibility follows the listing’s policy and local laws.</li>
            </ul>
          </div>

          <div className="card-animate">
            <h2 className="heading">5) Prohibited Use</h2>
            <ul className="list-disc pl-5 text-gray space-y-1.5">
              <li>Fraud, illegal content, harassment, discrimination.</li>
              <li>Fee circumvention or off-platform transactions to avoid charges.</li>
            </ul>
          </div>

          <div className="card-animate">
            <h2 className="heading">6) Liability & Termination</h2>
            <p className="text-gray">
              To the extent permitted by law, NearServe is not liable for indirect or consequential damages. We may suspend or terminate access for violations of these Terms.
            </p>
          </div>

          <div className="card-animate">
            <h2 className="heading">7) Changes & Contact</h2>
            <p className="text-gray">
              We may update these Terms periodically. Questions? <span className="font-medium">support@nearserve.local</span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
