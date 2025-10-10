import React from 'react';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <section className="py-20 bg-background lg:py-32 ">
      <div className="mx-auto max-w-4xl px-5 lg:px-0 text-center">
        <h1 className="title  mb-6">
          <span className="text-gradient">Find Local Services</span> <br /> Near
          You
        </h1>
        <p className="text-xl text-gray  mb-8 max-w-2xl mx-auto">
          Connect with trusted local service providers in your area. From
          cleaning to repairs, tutoring to delivery - find the help you need,
          when you need it.
        </p>
        <button className='primary-btn mx-auto text-center'>Get Started Now</button>
      </div>
    </section>
  );
};

export default Hero;