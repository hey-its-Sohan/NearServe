"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

const Loader = () => {
    const rocketVariants = {
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
                rotate: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' },
            },
        },
    };

    const textVariants = {
        animate: {
            opacity: [0.5, 1, 0.5],
            transition: {
                opacity: { repeat: Infinity, duration: 1.5, ease: 'linear' },
            },
        },
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-200">
            <motion.div className="flex flex-col items-center" animate="animate">
                <motion.div
                    variants={rocketVariants}
                    className="mb-6 p-4 rounded-full border-2 border-primary shadow-lg"
                >
                    <FaRocket className="text-6xl text-primary" />
                </motion.div>

                <motion.p variants={textVariants} className="text-2xl font-semibold text-primary">
                    Loading...
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Loader;
