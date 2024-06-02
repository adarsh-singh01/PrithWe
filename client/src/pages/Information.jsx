import React from 'react';

const Information = () => {
    return (
        <div className="mx-auto flex-grow py-24 max-w-screen-xl p-6 md:px-10 lg:px-20">
            <div className='text-4xl md:text-6xl font-extrabold text-green-500 pb-10 text-center '>Information</div>
            <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">What is Carbon Footprint?</h2>
                <h1 className="list-disc list-inside text-gray-700 mb-4">
                    <p>It represents the total amount of greenhouse gases, particularly carbon dioxide, that your business is directly or indirectly responsible for emitting into the atmosphere.</p>
                    <p>Every action that releases carbon leaves a mark on the environment, similar to an actual footprint.</p>
                </h1>
            </section>
            <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Why You Need to Calculate It?</h2>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                <p><li>Understanding and reducing your carbon footprint is essential for sustainable business practices.</li></p>
                <p><li>It's not only an ethical responsibility but also a strategic move for enhancing brand reputation and resilience.</li></p>
                <p>  <li>Consumers and investors are increasingly focusing on environmentally conscious businesses.</li></p>
                </ul>
            </section>
            <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">What Indian Government Says?</h2>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <p><li>The Government of India has set ambitious goals for carbon reduction and sustainable development.</li></p>
                    <p> <li>India plays a crucial role in the global carbon reduction effort due to its diverse industrial landscape and rapidly growing economy.</li></p>
                </ul>
            </section>
            <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Goals</h2>
                
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <p> <li>Facilitating Accurate Carbon Calculations</li> </p>
                    <p> <li>Aligning with National and Global Targets</li>  </p>
                    <p><li>Empowering Sustainable Decision-Making</li></p>
                    <p><li>Continuous Improvement</li></p>
                </ul>
                
            </section>
            <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Started with Prithwe</h2>
                <p className="text-gray-700 mb-4">
                    Take the first step towards a sustainable future with PrithWe. Empower your business to make informed decisions, reduce your carbon footprint, and contribute to a greener and more resilient world.
                </p>
                <a href='#'><button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600">Get Started with PrithWe</button></a>
            </section>
        </div>
    );
}

export default Information;
