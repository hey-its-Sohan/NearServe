import React from 'react'

function CTA() {
  return (
     <section className="py-16 text-center bg-gradient text-white">
        <h2 className="text-3xl font-bold">Join Our Growing Community</h2>
        <p className="mt-3 max-w-2xl mx-auto">
          Whether you need a service or want to offer one, NearServe is here to
          help you connect with your neighbors.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow hover:shadow-lg transition">
            Find Services
          </button>
          <button className="px-6 py-3 bg-primary-foreground/10 border border-white text-white font-semibold rounded-lg hover:bg-white/10 shadow hover:shadow-lg transition">
            Become a Provider
          </button>
        </div>
      </section>
  )
}

export default CTA