import React from 'react'

function HowItWorks() {
  return (
      <section className="py-16 fix-alignment text-center">
        <h2 className="heading">How NearServe Works</h2>
        <p className="text-gray max-w-2xl mx-auto mb-10">
          Simple, safe, and effective - connecting you with local services in
          three easy steps
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8">
            <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center text-lg font-bold text-primary bg-primary/10 rounded-full">
              1
            </div>
            <h3 className="text-lg font-semibold">Search & Discover</h3>
            <p className="text-gray mt-2">
              Browse services by category, location, and price. Read reviews and
              compare providers to find the perfect match.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8">
            <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center text-lg font-bold text-primary bg-primary/10 rounded-full">
              2
            </div>
            <h3 className="text-lg font-semibold">Connect & Book</h3>
            <p className="text-gray mt-2">
              Contact providers directly through our secure messaging system.
              Discuss details and schedule your service.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-8">
            <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center text-lg font-bold text-primary bg-primary/10 rounded-full">
              3
            </div>
            <h3 className="text-lg font-semibold">Get It Done</h3>
            <p className="text-gray mt-2">
              Receive your service and leave a review. Help build trust in the
              community for future users.
            </p>
          </div>
        </div>
      </section>
  )
}

export default HowItWorks