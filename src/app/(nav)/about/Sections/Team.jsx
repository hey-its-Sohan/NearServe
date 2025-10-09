import React from 'react'

function Team() {
  return (
    <section className="py-16 fix-alignment text-center">
        <h2 className="heading">Meet Our Team</h2>
        <p className="text-gray max-w-2xl mx-auto mb-10">
          The passionate people behind NearServe who are working to connect
          communities.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-animate">
            <div className="text-5xl">👩‍💼</div>
            <h3 className="font-semibold mt-3">Sarah Johnson</h3>
            <p className="text-white text-sm py-0.5 bg-blue-400 w-fit mx-auto px-2 rounded-2xl">CEO & Co-Founder</p>
            <p className="text-gray mt-2">
              Former tech executive passionate about connecting communities
              through local services.
            </p>
          </div>
          <div className="card-animate">
            <div className="text-5xl">👨‍💻</div>
            <h3 className="font-semibold mt-3">Mike Chen</h3>
            <p className="text-white text-sm py-0.5 bg-blue-400 w-fit mx-auto px-2 rounded-2xl">CTO & Co-Founder</p>
            <p className="text-gray mt-2">
              Full stack developer with 10+ years building scalable marketplace
              platforms.
            </p>
          </div>
          <div className="card-animate">
            <div className="text-5xl">👩‍🎤</div>
            <h3 className="font-semibold mt-3">Emily Rodriguez</h3>
            <p className="text-white text-sm py-0.5  bg-blue-400 w-fit mx-auto px-2 rounded-2xl">Head of Community</p>
            <p className="text-gray mt-2">
              Community builder focused on creating trust and safety in local
              service networks.
            </p>
          </div>
        </div>
      </section>
  )
}

export default Team