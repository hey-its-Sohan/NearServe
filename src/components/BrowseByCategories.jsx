import {
  BrushCleaning,
  Camera,
  GraduationCap,
  PawPrint,
  ToolCase,
} from "lucide-react";
import React from "react";

const BrowseByCategories = () => {
  const services = [
    {
      icon: <BrushCleaning className="w-8 h-8" />,
      title: "Cleaning",
      count: "150+",
      color: "primary"
    },
    {
      icon: <ToolCase className="w-8 h-8" />,
      title: "Repair",
      count: "200+",
      color: "secondary"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Tutoring",
      count: "80+",
      color: "accent"
    },
    {
      icon: <PawPrint className="w-8 h-8" />,
      title: "Pet Care",
      count: "20+",
      color: "primary"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photography",
      count: "90+",
      color: "secondary"
    },
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
    <section className="bg-background py-20">
      <div className="fix-alignment text-center">
        <h1 className="heading ">Browse By Category</h1>
        <p className="text-gray text-xl mb-7">
          Explore our most popular service categories.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group text-center card-animate "
            >
              <div className={`w-16 h-16 rounded-2xl ${getStepColor(service.color)} flex items-center mx-auto border justify-center group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              <h3 className="mt-3 text-lg text-foreground font-medium">{service.title}</h3>
              <p className="text-gray  mt-1">{service.count} providers</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategories;
