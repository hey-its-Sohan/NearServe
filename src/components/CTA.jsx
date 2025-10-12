import React from 'react';
import { ArrowRight, Star, Users } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient"></div>
      <div className="relative fix-alignment">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-white" fill="white" />
            <span className="text-white text-sm font-medium">
              Trusted by 10,000+ Local Professionals
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Find Your Perfect Service Match
            Today
          </h2>

          {/* Description */}
          <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who discovered reliable local services
            through NearServe. From home repairs to personal services, we connect you
            with trusted professionals in your area.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex items-center gap-3 text-white">
              <Users className="w-6 h-6" />
              <div className="text-left">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-white/70 text-sm">Happy Customers</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Star className="w-6 h-6" fill="white" />
              <div className="text-left">
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-white/70 text-sm">Average Rating</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-hero text-xs font-bold">NS</span>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-white/70 text-sm">Cities Served</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group bg-white text-foreground dark:text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3">
              Browse All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-foreground transition-all duration-300 backdrop-blur-sm">
              Become a Provider
            </button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-16 w-6 h-6 bg-white/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/30 rounded-full animate-pulse delay-500"></div>
    </section>
  );
};

export default CTA;