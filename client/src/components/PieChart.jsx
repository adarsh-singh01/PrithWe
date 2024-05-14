// PieChart.js

import React from 'react';
//import CanvasJSReact from '@canvasjs/react-charts';

//const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = ({ contributions }) => {
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Contribution in Total Carbon Footprint"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: contributions.map(({ label, value }) => ({ label, y: value }))
    }]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default PieChart;



/*import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = () => {
    const options = {
      title: {
        text: "Basic Column Chart in React"
      },
      data: [{
        type: "column",
        dataPoints: [
          { label: "Apple",  y: 10  },
          { label: "Orange", y: 15  },
          { label: "Banana", y: 25  },
          { label: "Mango",  y: 30  },
          { label: "Grape",  y: 28  }
        ]
      }]
    };
  
    return (
      <div>
        <CanvasJSChart options={options} />
      </div>
    );
  };
  
  export default PieChart;*/