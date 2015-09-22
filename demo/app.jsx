/*global document:false window:false*/
import React from "react";
import _ from "lodash";
import { VictoryVoronoi } from "../src/index";

const n = 40;
const width = 1200;
const height = 430;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getRandomVoronoiData(),
      fixedPoints: this.getFixedPoints()
    };
  }

  componentDidMount() {
    const self = this;
    window.setInterval(() => {
      self.setState({
        data: self.tweakData()
      });
    }, 100);
  }

  getRandomVoronoiData() {
    const points = _.range(n);

    for (let i = 0; i < n; ++i) {
      points[i] = {
        0: Math.floor(Math.random() * width),
        1: Math.floor(Math.random() * height),
        vx: Math.floor(Math.random() * 2) * 2 - 1,
        vy: Math.floor(Math.random() * 2) * 2 - 1
      };
    }

    return points;
  }

  tweakData() {
    const data = this.state.data;

    for (let i = 0; i < n; i++) {
      const point = data[i];
      if (point[0] <= 0 || point[0] >= width) { point.vx *= -1; }
      if (point[1] <= 0 || point[1] >= height) { point.vy *= -1; }
      point[0] += point.vx / 6;
      point[1] += point.vy / 6;
    }

    return data;
  }

  getFixedPoints() {
    const topPoints = _.map(_.range(1, 4), (k) => { return { 0: (width / 4) * k, 1: 0 }; });
    const bottomPoints = _.map(_.range(1, 4), (m) => { return { 0: (width / 4) * m, 1: height }; });
    const leftPoints = [{ 0: 0, 1: height / 2 }];
    const rightPoints = [{ 0: width, 1: height / 2 }];
    return topPoints.concat(bottomPoints).concat(leftPoints).concat(rightPoints);
  }

  render() {
    return (
      <VictoryVoronoi
        data={this.state.data}
        fixedPoints={this.state.fixedPoints}
        hideCentroids={true}
        pathStyles={{
          fill: () => { return "#cccccc"; },
          stroke: () => { return "#f5f5f5"; },
          strokeWidth: () => { return 3.5; }
        }}
        svgHeight={height}
        svgStyles={{
          backgroundColor: "#cccccc",
          position: "absolute",
          top: "5px",
          left: 0
        }}
        svgWidth={width}/>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
