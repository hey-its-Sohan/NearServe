"use-client"
import Link from 'next/link'
import React from 'react'

function Contact() {
  return (
    <section className="py-16 fix-alignment text-center">


      <div className="bg-card card-animate  rounded-xl shadow-sm p-8 inline-block text-center">
        <h2 className="heading">Get in Touch</h2>
        <p className="text-gray mb-8">
          Have questions or feedback? We’d love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <p className="text-sm">
            <strong>Email:</strong>{" "}
            <span className="text-primary">hello@nearserve.com</span>
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> (555) 123-4567
          </p>
        </div>

        <div className='w-full '>
          <Link href={'/support'}>
            <button className="primary-btn w-full mt-6   ">
              Contact Support
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Contact