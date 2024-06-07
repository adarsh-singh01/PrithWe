import React from 'react';
import DoughnutChart from './DoughnutChart';

const HouseholdResult = ({ totalCarbonFootprint, contributions, Recommendation }) => {
  function formatRecommendations(data) {
    return data
      .replace(/## (.*?):/g, '<h2>$1</h2>')
      .replace(/### (.*?):/g, '<h3>$1</h3>')
      .replace(/#### (.*?):/g, '<h4>$1</h4>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\- (.*?):/g, '<li>$1</li>')
      .replace(/\n/g, '<br />'); // Add line breaks for better readability
  }

  const formattedRecommendations = formatRecommendations(Recommendation);

  return (
    <div className="mt-4 mb-16 space-y-16">
      {totalCarbonFootprint !== null && (
        <div className="mt-4 flex flex-col justify-center items-center">
          <h3 className="text-lg md:text-xl font-medium mb-2 mx-4">Total Carbon Footprint</h3>
          <p className='mx-4 text-3xl md:text-6xl font-medium'>
            {Math.round(totalCarbonFootprint * 100) / 100} 
            <span className='font-thin'> KgCO<sub>2</sub></span>
          </p>
        </div>
      )}
      {/* Render Doughnut Chart */}
      <DoughnutChart contributions={contributions} />
      
      <div className="recommendations mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Personalized Recommendations</h2>
        <div 
          className="recommendation-content"
          dangerouslySetInnerHTML={{ __html: formattedRecommendations }} 
        />
      </div>
    </div>
  );
}

export default HouseholdResult;
