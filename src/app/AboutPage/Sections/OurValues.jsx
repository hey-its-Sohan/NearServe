import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { LuAward, LuShield } from 'react-icons/lu';
import { MdOutlineAccessTime } from 'react-icons/md';

function OurValues() {
  const services = [
    {
      icon: <LuShield className="w-8 h-8" />,
      title: "Trust & Safety",
      description:
        "Every provider is verified and background-checked to ensure your peace of mind.",
      color: "primary",
    },
    {
      icon: <FaRegHeart className="w-8 h-8" />,
      title: "Community First",
      description:
        "We believe in supporting local communities and fostering neighbor-to-neighbor connections.",
      color: "primary",
    },
    {
      icon: <MdOutlineAccessTime className="w-8 h-8" />,
      title: "Reliable Service",
      description:
        "Our platform ensures timely, professional service delivery that you can count on.",
      color: "primary",
    },
    {
      icon: <LuAward className="w-8 h-8" />,
      title: "Quality Guaranteed",
      description:
        "We maintain high standards through reviews, ratings, and continuous quality monitoring.",
      color: "primary",
    },
  ];

  const getStepColor = (color) => {
    const colors = {
      primary: "bg-primary/10 text-primary border-primary/20",
      secondary: "bg-secondary/10 text-secondary border-secondary/20",
      accent: "bg-accent/10 text-accent border-accent/20",
    };
    return colors[color] || colors.primary;
  };

  return (
    <section className="py-16 fix-alignment text-center">
      <h2 className="heading">Our Values</h2>
      <p className="text-gray max-w-2xl mx-auto mb-10">
        These core values guide everything we do and help us build a platform
        that truly serves our community.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="group card-animate relative text-center">
            <div className="">
              <div
                className={`w-16 h-16 rounded-2xl ${getStepColor(
                  service.color
                )} border flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-gray leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OurValues;
