import React from 'react';
import { FaHandshake } from "react-icons/fa"; // Assuming FaHandshake is still needed for the icon

function StorySection() {
    return (
        <section className=" fix-alignment grid lg:grid-cols-2 gap-14 items-start">

            <div className='col-span-1 text-[18px] pr-2'>
                <h2 className="heading">Our Story</h2>
                <p className="text-gray leading-7 ">
                    NearServe was born from a simple observation: in our increasingly
                    digital  world, it's become harder to connect with the skilled people
                    in our own neighborhoods. We saw busy professionals struggling to
                    find reliable help with everyday tasks, while talented individuals
                    had no easy way to offer their services locally.
                </p>
                <p className="text-gray leading-7 mt-4">
                    Founded in 2024, we set out to bridge this gap by creating a platform that
                    prioritizes trust, community, and convenience. Our founders, with
                    backgrounds in technology and community development, understood that
                    the key to success wasn't just connecting people-it was building
                    relationships.
                </p>
                <p className="text-gray leading-7 mt-4">
                    Today, NearServe is proud to serve thousands of users across multiple
                    cities, facilitating meaningful connections that strengthen local
                    communities one service at a time.
                </p>
            </div>

            <div className="lg:pt-10  ">
                <div className="w-16 h-16 rounded-full bg-yellow-100/50 flex items-center justify-center mx-auto mb-10">
                    <div className="text-8xl ">🤝</div>
                </div>
                <div className="card-animate p-8 rounded-xl border border-gray-100 shadow-lg text-center h-full">
                    {/* The original image showed a yellow, bee-like icon. Using the FaHandshake icon with a yellow-like color for better visual representation of the original design intent. */}

                    <h3 className="text-2xl font-bold">Community Impact</h3>
                    <p className="text-gray mt-4 text-lg">
                        Over <span className="font-extrabold text-primary">$2M</span> in services have
                        been facilitated through our platform, supporting local economies
                        and building stronger neighborhoods.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default StorySection;