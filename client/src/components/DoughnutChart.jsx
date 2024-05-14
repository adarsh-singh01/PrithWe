import React from "react";
//import CanvasJSReact from '../../canvasjs-chart-3.8.5/canvasjs.react';
import CanvasJSReact from '../../@canvasjs/react-charts';


//import CanvasJSReact from "../../../client/@canvasjs/react-charts";
//import CanvasJSReact from "@canvasjs/react-charts";

//import '../../canvas (3)/canvasjs.min'; // Import the script to ensure it's executed and `CanvasJS` is available globally

//import CanvasJSReact f`ro`m '../../canvasjs (3)/canvasjs.react';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = ({ contributions }) => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Contribution of each factor",
    },
    subtitles: [
      {
        text: "🍃",
        verticalAlign: "center",
        fontSize: 50,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: '##0.00"%"',
        dataPoints: contributions.map(({ name, y }) => ({ name, y: y })),
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
      {/* You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods */}
    </div>
  );
};

export default DoughnutChart;
