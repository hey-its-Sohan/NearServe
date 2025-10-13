"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";


export default function DashboardHome() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie/dashboard.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => setAnimationData(null));
  }, []);

  return (
    <section >
      <div className="fix-alignment">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid place-items-center">
          <div className="w-full max-w-5xl mx-auto">

            {/* Headings */}
            <div className="text-center ">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight "

              >
                Welcome to your <span className="text-gradient">Dashboard</span>!
              </h1>
              <p className="mt-3 text-gray max-w-3xl mx-auto">
                Manage your profile, Booked, Post Service, and more. Use the sidebar to
                navigate through different sections based on your role.
              </p>
            </div>

            <div className="relative w-full rounded-2xl overflow-hidden 
                            aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
              {animationData ? (
                <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <div className="absolute inset-0 animate-pulse" />
              )}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
