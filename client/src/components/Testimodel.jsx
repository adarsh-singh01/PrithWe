// src/components/TestimonialPage.jsx
import React from 'react';

const testimonials = [
  {
    name: 'John Doe',
    image: 'https://images.pexels.com/photos/25950675/pexels-photo-25950675/free-photo-of-a-black-and-white-photo-of-a-woman-with-curly-hair.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    testimonial: 'This place is amazing! The games are well curated and the atmosphere is just perfect.'
  },
  {
    name: 'Jane Smith',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600',
    testimonial: 'Great selection of board games and the staff are very friendly and helpful.'
  },
  {
    name: 'Sam Wilson',
    image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600',
    testimonial: 'A wonderful place to relax and have fun with friends. Highly recommended!'
  }
];

const Testimonial = () => {
  return (
    <div className=" bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8" data-aos="fade-up">What Our Customers Say</h1>
      <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
          >
            <img
              className="w-24 h-24 rounded-full mx-auto hover:scale-105 transition-transform duration-300"
              src={testimonial.image}
              alt={testimonial.name}
            />
            <h2 className="text-xl font-semibold text-center mt-4">{testimonial.name}</h2>
            <p className="text-gray-600 text-center mt-2">{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
