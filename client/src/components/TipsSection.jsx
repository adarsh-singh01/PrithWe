import React from 'react';

const tips = [
  {
    category: 'Transportation',
    tips: [
      'Carpool with coworkers or friends to reduce the number of vehicles on the road.',
      'Use public transport whenever possible.',
      'Consider biking or walking for short distances.',
      'Switch to an electric or hybrid vehicle.',
    ],
    links: [
      { text: '10 Ways to Green Your Ride', url: 'https://www.treehugger.com/how-to-go-green-cars-4856210' },
      { text: 'Electric Cars Explained', url: 'https://www.example.com/video/electric-cars' },
    ],
  },
  {
    category: 'Energy Use',
    tips: [
      'Switch to energy-efficient appliances and light bulbs.',
      'Unplug electronics when not in use.',
      'Use a programmable thermostat to reduce energy use when you are not home.',
      'Install solar panels to harness renewable energy.',
    ],
    links: [
      { text: 'Energy-Efficient Home Guide', url: 'https://www.energy.gov/energysaver/efficient-home-design' },
      { text: 'Benefits of Solar Panels', url: 'https://www.enelgreenpower.com/learning-hub/renewable-energies/solar-energy/advantages-solar-energy' },
    ],
  },
  {
    category: 'Diet',
    tips: [
      'Reduce meat consumption, especially red meat.',
      'Incorporate more plant-based meals into your diet.',
      'Buy locally sourced and seasonal produce.',
      'Avoid food waste by planning meals and using leftovers.',
    ],
    links: [
      { text: 'Plant-Based Diet Tips', url: 'https://www.health.harvard.edu/blog/what-is-a-plant-based-diet-and-why-should-you-try-it-2018092614760' },
      { text: 'Sustainable Eating', url: 'https://nutritionsource.hsph.harvard.edu/2015/06/17/5-tips-for-sustainable-eating/' },
    ],
  },
  {
    category: 'Waste Reduction',
    tips: [
      'Recycle paper, plastic, glass, and metal.',
      'Compost organic waste.',
      'Use reusable bags, bottles, and containers.',
      'Avoid single-use plastics.',
    ],
    links: [
      { text: 'Recycling Best Practices', url: 'https://www.wm.com/us/en/recycle-right/recycling-101' },
      { text: 'Composting 101', url: 'https://www.nrdc.org/stories/composting-101' },
    ],
  },
];

const TipsSection = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-6 text-center">Reduce Your Carbon Footprint</h1>
      <p className="text-lg text-gray-700 mb-12 text-center">
        Learn how to make informed decisions in your daily life to lower your carbon emissions and promote sustainability.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tips.map((section) => (
          <div key={section.category} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">{section.category}</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              {section.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Useful Links</h3>
            <ul className="list-disc list-inside text-blue-600">
              {section.links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsSection;
