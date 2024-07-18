import React from 'react';
import DoughnutChart from './DoughnutChart';
import html2canvas from 'html2canvas';


const HouseholdResult = ({ totalCarbonFootprint, contributions, Recommendation }) => {
  const ToCaptureRef = React.useRef();

  function captureScreenshot() {
    var canvasPromise = html2canvas(ToCaptureRef.current, {
      useCORS: true,
      width: document.documentElement.scrollWidth,  // Full page width
      height: document.documentElement.scrollHeight // Full page height
    });
    canvasPromise.then((canvas)=> {
      var dataURL = canvas.toDataURL("image/png");
      // Create an image element from the data URL
      var img = new Image();
      img.src = dataURL;
      img.download = dataURL;
      // Create a link element
      var a = document.createElement("a");
      a.innerHTML = "DOWNLOAD";
      a.target = "_blank";
      // Set the href of the link to the data URL of the image
      a.href = img.src;
      // Set the download attribute of the link
      a.download = img.download;
      // Append the link to the page
      document.body.appendChild(a);
      // Click the link to trigger the download
      a.click();
    });

  }

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
    <div ref={ToCaptureRef} className="mt-4 mb-16 space-y-16">
      {totalCarbonFootprint !== null && (
        <div className="mt-4 flex flex-col justify-center items-center">
          <h3 className="text-lg md:text-xl font-medium mb-2 mx-4">Total Carbon Footprint</h3>
          <p className='mx-4 text-3xl md:text-6xl font-medium'>
            {Math.round(totalCarbonFootprint * 100) / 100} 
            <span className='font-thin'> KgCO<sub>2</sub></span>
          </p>
          <button
                  onClick={() => captureScreenshot()}
                  className="btn w-10px text-start bg-black mt-3 px-3 py-2 font-Rubik rounded-full text-white"
                >
                  Download report
                </button>
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
