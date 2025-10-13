import React from 'react';

const Hero = () => {
  return (
    <section className="relative py-20 bg-background ">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-5 lg:px-0 text-center">
        {/* Main Heading */}
        <h1 className="title mb-6 leading-tight">
          <span className="text-gradient block">Local Services</span>
          <span className="text-foreground">At Your Fingertips</span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray mb-12 max-w-3xl mx-auto leading-relaxed">
          Discover trusted professionals for all your needs. From home services to personal care,
          we connect you with the best local providers in your area.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="font-semibold text-foreground">Home Services</h3>
            <p className="text-sm text-gray">Cleaning, repairs, and maintenance</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl">👨‍🏫</span>
            </div>
            <h3 className="font-semibold text-foreground">Professional Help</h3>
            <p className="text-sm text-gray">Tutoring, consulting, and more</p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-foreground">Quick & Easy</h3>
            <p className="text-sm text-gray">Find and book in minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;