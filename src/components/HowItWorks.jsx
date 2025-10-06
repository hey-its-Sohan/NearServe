import React from 'react';
import { Search, UserCheck, Star, Shield } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Search Services",
      description: "Find local services near you with our smart search and filters.",
      color: "primary"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Compare Providers",
      description: "View profiles, ratings, and prices from trusted local professionals.",
      color: "secondary"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Book Instantly",
      description: "Schedule appointments or request quotes directly through the platform.",
      color: "accent"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enjoy Quality Service",
      description: "Get your task done with confidence and leave reviews for others.",
      color: "primary"
    }
  ];

  const getStepColor = (color) => {
    const colors = {
      primary: "bg-primary/10 text-primary border-primary/20",
      secondary: "bg-secondary/10 text-secondary border-secondary/20",
      accent: "bg-accent/10 text-accent border-accent/20"
    };
    return colors[color] || colors.primary;
  };
  return (
    <section className=" py-20">
      <div className="fix-alignment">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading">How NearServe Works</h2>
          <p className="text-gray text-xl mt-4">
            Getting the help you need has never been easier. Four simple steps to find
            and book trusted local services.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group card-animate relative text-center"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold z-10">
                {index + 1}
              </div>

              {/* Step Card */}
              <div className="">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${getStepColor(step.color)} border flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;