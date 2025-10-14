import React from 'react'
import { FaRegStar } from 'react-icons/fa';



import { HiOutlineLocationMarker } from 'react-icons/hi';
import { LuTarget } from 'react-icons/lu';
import { TbUsers } from 'react-icons/tb';

function Hero() {
  return (
    <section className="py-20 fix-alignment text-center">
      <div className=' mx-auto max-w-4xl  px-5 lg:px-0'>
        <h1 className="title">
          About <span className="text-gradient">NearServe</span>
        </h1>
        <p className="mt-6 text-xl text-gray  max-w-4xl mx-auto">
          We're on a mission to connect neighbors and build stronger communities
          through <br /> trusted local services. NearServe makes it easy to find help
          when you need it and offer <br /> your skills to others.
        </p>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-lg">

        <div className="card-animate">
          <TbUsers className="text-primary text-4xl mx-auto mb-3" />
          <p className="text-4xl text-primary font-bold">10K+</p>
          <p className="text-gray mt-1">Active Users</p>
        </div>

        <div className="card-animate">
          <HiOutlineLocationMarker className="text-primary text-4xl mx-auto mb-4" />
          <p className="text-4xl text-primary font-bold">5K+</p>
          <p className="text-gray mt-1">Services Listed</p>
        </div>

        <div className="card-animate">
          <FaRegStar className="text-primary text-4xl mx-auto mb-3" />
          <p className="text-4xl text-primary font-bold">4.9</p>
          <p className="text-gray mt-1">Average Rating</p>
        </div>

        <div className="card-animate">
          <LuTarget className="text-primary text-4xl mx-auto mb-3" />
          <p className="text-4xl text-primary font-bold">200+</p>
          <p className="text-gray mt-1">Cities Covered</p>
        </div>
      </div>
    </section>
  )
}

export default Hero