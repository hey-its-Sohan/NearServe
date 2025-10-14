// app/about/page.tsx
"use client";

import { FaUsers, FaStar, FaHandshake } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { BsShieldCheck, BsClockHistory } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import Hero from "./Sections/Hero";
import StorySection from "./Sections/StorySection";
import OurValues from "./Sections/OurValues";
import Team from "./Sections/Team";
import HowItWorks from "./Sections/HowItWorks";
import CTA from "./Sections/CTA";
import Contact from "./Sections/Contact";


export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">

      <Hero></Hero>


      <StorySection></StorySection>


      <OurValues></OurValues>


      <Team></Team>


      {/* CTA */}
      <CTA></CTA>

      {/* Contact */}
      <Contact></Contact>

    </div>
  );
}
