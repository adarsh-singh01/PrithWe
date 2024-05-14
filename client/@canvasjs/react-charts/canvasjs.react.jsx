/*
CanvasJS React Chart - https://canvasjs.com/
Copyright 2024 fenopix

--------------------- License Information --------------------
The software in CanvasJS React Chart is free and open-source. But, CanvasJS React Chart relies on CanvasJS Chart which requires a valid CanvasJS Chart license for commercial use. Please refer to the following link for further details https://canvasjs.com/license/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

/*tslint:disable*/
/*eslint-disable*/
/*jshint ignore:start*/


import React from "react";
import CJS from "@canvasjs/charts";
//import CJS from "../charts";

const CanvasJS = CJS.Chart ? CJS : window.CanvasJS;
/*var React = require('react');
var CanvasJS = require('@canvasjs/charts');*/
//CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

class CanvasJSChart extends React.Component {
	constructor(props) {
		super(props);
		this.options = props.options ? props.options : {};
		this.containerProps = props.containerProps ? { ...props.containerProps } : { width: "100%", position: "relative" };
		this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : this.options.height ? this.options.height + "px" : "400px";
		this.containerRef = React.createRef();
	}
	componentDidMount() {
		//Create Chart and Render
		this.chart = new CanvasJS.Chart(this.containerRef.current, this.options);
		this.chart.render();

		if (this.props.onRef)
			this.props.onRef(this.chart);
	}
	shouldComponentUpdate(nextProps, nextState) {
		//Check if Chart-options has changed and determine if component has to be updated
		return !(nextProps.options === this.options);
	}
	componentDidUpdate() {
		//Update Chart Options & Render
		this.chart.options = this.props.options;
		this.chart.render();
	}
	componentWillUnmount() {
		//Destroy chart and remove reference
		if (this.chart)
			this.chart.destroy();

		if (this.props.onRef)
			this.props.onRef(undefined);
	}
	render() {
		return React.createElement('div', { id: this.props.id, ref: this.containerRef, style: this.containerProps });
		//return <div id={this.props.id} ref={this.containerRef} style={this.containerProps} />
	}
}

var CanvasJSReact = {
	CanvasJSChart: CanvasJSChart,
	CanvasJS: CanvasJS
};

export default CanvasJSReact;
/*tslint:enable*/
/*eslint-enable*/
/*jshint ignore:end*/