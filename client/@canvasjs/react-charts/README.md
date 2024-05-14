<div align="center">
	<a href="https://www.npmjs.com/~canvasjs">
		<img src="https://canvasjs.com/wp-content/uploads/images/logo/canvasjs-logo-240x100.png" alt="CanvasJS"/>
	</a>
</div>

# CanvasJS React Charts - Official
CanvasJS [React Chart](https://canvasjs.com/react-charts/) Component for creating interactive charts and graphs for your react applications. Library supports a wide range of chart types including bar, line, area, pie, doughnut, etc.

<br/>

<a href="https://canvasjs.com/react-charts/">
	<img src="https://canvasjs.com/wp-content/uploads/images/npm/react/react-charts.png" alt="CanvasJS React Charts">
</a>

<br/>

## Important Links
- [Official Website](https://canvasjs.com/)
- [React Charts Demo](https://canvasjs.com/react-charts/)
- [Download CanvasJS](https://canvasjs.com/download-html5-charting-graphing-library/)
- [React Charts Integration](https://canvasjs.com/docs/charts/integration/react/)
- [Chart Documentation](https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/)
- [CanvasJS Support Forum](https://canvasjs.com/forums/)

<br/>

## Installing CanvasJS React Charts
Install CanvasJS React Charts to your application from npm.
##### Install React Charts via NPM
```
npm install @canvasjs/react-charts
```
See [npm documentation](https://docs.npmjs.com/) to know more about npm usage.

##### Import React Chart Component
Import the React Chart module into your React application.
```
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
```

##### Set the chart-options & create chart
Set the chart-options & use ‘CanvasJSChart’ selector to create the chart.
```
class App extends Component {
  render() {
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
    }
    
    return (
    <div>
      <CanvasJSChart options = {options}
        /* onRef = {ref => this.chart = ref} */
      />
    </div>
    );
  }
}
```

<br/>

<img src="https://canvasjs.com/wp-content/uploads/images/npm/react/react-column-chart.png" alt="React Column Chart">

<br/>

#### Interactive React Charts
<a href="https://canvasjs.com/react-charts/column-line-area-chart/"><img src="https://canvasjs.com/wp-content/uploads/images/npm/react/interactive-react-charts.gif" alt="React Interactive Charts"></a>

<br/>

#### React Chart with Multiple Y-axes
<a href="https://canvasjs.com/react-charts/chart-with-multiple-axes/"><img src="https://canvasjs.com/wp-content/uploads/images/npm/react/react-charts-mulitple-y-axes.gif" alt="React Chart with Multiple Y-axes"></a>

<br/>

#### React Chart with Zooming / Panning
<a href="https://canvasjs.com/react-charts/chart-zoom-pan/"><img src="https://canvasjs.com/wp-content/uploads/images/npm/react/react-charts-zooming-panning.gif" alt="React Chart with Zooming / Panning"></a>

<br />

### Related Chart Packages
* [JavaScript Charts](https://www.npmjs.com/package/@canvasjs/charts)
* [Angular Charts](https://www.npmjs.com/package/@canvasjs/angular-charts)
* [Vue Charts](https://www.npmjs.com/package/@canvasjs/vue-charts)
* [jQuery Charts](https://www.npmjs.com/package/@canvasjs/jquery-charts)