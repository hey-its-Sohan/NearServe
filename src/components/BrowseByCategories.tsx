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
    },
    {
      icon: <ToolCase className="w-8 h-8" />,
      title: "Repair",
      count: "200+",
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Tutoring",
      count: "80+",
    },
    {
      icon: <PawPrint className="w-8 h-8" />,
      title: "Pet Care",
      count: "20+",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photography",
      count: "90+",
    },
  ];
  return (
    <section className="bg-slate-100 py-20">
      <div className="fix-alignment">
        <h1 className="heading">Browse By Category</h1>
        <p className="text-gray text-xl mb-7">
          Explore our most popular service categories.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-5 cursor-pointer text-center bg-white rounded-xl card-animate shadow-md"
            >
              <div className="text-secondary flex justify-center">
                {service.icon}
              </div>

              <h3 className="mt-3 text-lg font-medium">{service.title}</h3>
              <p className="text-gray  mt-1">{service.count} providers</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategories;
