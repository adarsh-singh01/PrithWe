import React from 'react';
import adarsh from '../assets/adarsh.png'
import shivam from '../assets/shivam.jpg'



const AboutUs = () => {
    
    return (
        <div className="mx-auto flex-grow max-w-screen-xl py-24 p-6 md:px-10 lg:px-20">
        <div className='text-4xl md:text-6xl font-extrabold text-green-500 pb-10 text-center '>About Us</div>
            <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">About PrithWe</h2>
                <p className="text-gray-700 mb-4">
                    PrithWe is a platform dedicated to helping individuals and businesses calculate and reduce their carbon footprint. We provide tools and resources to promote sustainability and environmental consciousness in everyday practices.
                </p>
            </section>
            <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                    Our mission at PrithWe is to empower people and organizations to make informed decisions that contribute to a greener and more sustainable world. We believe in the importance of environmental stewardship and strive to make a positive impact on the planet.
                </p>
            </section>
            <section className="mb-12">
                <h2 className="text-2xl  md:text-3xl font-bold mb-4">Meet the Founders</h2>
                <div className="flex items-center mb-6">
                    <img src={adarsh} className="w-24 h-22 rounded-full" alt="Adarsh Singh" />
                    <div className="ml-4">
                        <h3 className="text-xl font-semibold">Adarsh Singh</h3>
                        <p className="text-gray-700">Founder</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <img src={shivam} className="w-24 h-22 rounded-full" alt="Shivam Verma" />
                    <div className="ml-4">
                        <h3 className="text-xl font-semibold">Shivam Verma</h3>
                        <p className="text-gray-700">Co-founder</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;
