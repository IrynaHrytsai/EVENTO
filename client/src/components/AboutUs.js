import React from 'react';
import aboutUs from '../assets/aboutUs.png';

const AboutUs = () => {
    return (
        <section className="py-12 mt-48">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8">
                    <img 
                        src={aboutUs} 
                        alt="About Us" 
                        className="rounded-lg shadow-md w-full h-auto" 
                    />
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0">
                    <h2 className="text-3xl font-bold text-center md:text-left mb-6">Welcome to Our Events Platform!</h2>
                    <p className="text-lg text-center md:text-left mb-4">
                        Join us for a vibrant array of experiences that cater to every interest and passion. 
                        Whether you're looking to unwind with meditation sessions, dance the night away at lively parties, 
                        enjoy a cozy movie night, or dive into strategic fun with board games, our platform has something for everyone.
                    </p>
                    <p className="text-lg text-center md:text-left mb-4">
                        Explore eco-friendly workshops where creativity meets sustainability, or engage in enlightening discussions that inspire and motivate. 
                        Our events are designed to foster community, encourage learning, and create lasting memories.
                    </p>
                    <h3 className="text-2xl font-bold text-center md:text-left mb-4">Why Choose Us?</h3>
                    <ul className="text-lg text-center md:text-left mb-6 space-y-2">
                        <li><strong>Diverse Events</strong>: From wellness retreats to interactive game nights, we offer a variety of activities to suit your mood.</li>
                        <li><strong>Easy Registration</strong>: Sign up effortlessly and secure your spot in just a few clicks.</li>
                        <li><strong>Community Engagement</strong>: Connect with like-minded individuals who share your interests and passions.</li>
                        <li><strong>Memorable Experiences</strong>: Create unforgettable moments and friendships that will last a lifetime.</li>
                    </ul>
                    <p className="text-lg font-bold text-center  md:text-left mb-6">
                        Join us today and start exploring the events that await you!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
