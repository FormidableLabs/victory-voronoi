/*global document:false window:false*/
import React from "react";
import _ from "lodash";
import {VictoryVoronoi} from "../src/index";

const n = 40;
const svgWidth = 1200;
const svgHeight = 430;

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
        0: Math.floor(Math.random() * svgWidth),
        1: Math.floor(Math.random() * svgHeight),
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

      if (point[0] <= 0 || point[0] >= svgWidth) {
        point.vx *= -1;
      }
      if (point[1] <= 0 || point[1] >= svgHeight) {
        point.vy *= -1;
      }

      point[0] += point.vx / 6;
      point[1] += point.vy / 6;
    }

    return data;
  }

  getFixedPoints() {
    const topPoints = _.map(_.range(1, 4), (k) => {
      return {0: (svgWidth / 4) * k, 1: 0};
    });
    const bottomPoints = _.map(_.range(1, 4), (m) => {
      return { 0: (svgWidth / 4) * m, 1: svgHeight };
    });
    const leftPoints = [{ 0: 0, 1: svgHeight / 2 }];
    const rightPoints = [{ 0: svgWidth, 1: svgHeight / 2 }];

    return topPoints.concat(bottomPoints).concat(leftPoints).concat(rightPoints);
  }

  render() {
    return (
      <VictoryVoronoi
        backgroundColor="#ccc"
        data={this.state.data}
        fixedPoints={this.state.fixedPoints}
        hideCentroids={true}
        svgWidth={svgWidth}
        svgHeight={svgHeight}
        velocity={10}
        pathStyles={{
          fill: () => { return "#ccc"; },
          stroke: () => { return "#f5f5f5"; },
          strokeWidth: () => { return 3.5; }
        }}/>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
