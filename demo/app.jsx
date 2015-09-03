/*global document:false*/
import React from "react";
import _ from "lodash";
import {VictoryVoronoi} from "../src/index";

const n = 10;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth: 1200,
      svgHeight: 430,
      data: this.getRandomVoronoiData(1200, 430)
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

  getRandomVoronoiData(width, height) {
    const particles = _.range(n);

    for (let i = 0; i < n; ++i) {
      particles[i] = {
        0: Math.random() * width,
        1: Math.random() * height,
        vx: 0,
        vy: 0
      };
    }

    return particles;
  }

  tweakData() {
    let data = this.state.data;
    for (let i = 0; i < n; ++i) {
      let p = this.state.data[i];
      p[0] += p.vx; if (p[0] < 0) p[0] = p.vx *= -1; else if (p[0] > this.state.width) p[0] = this.state.width + (p.vx *= -1);
      p[1] += p.vy; if (p[1] < 0) p[1] = p.vy *= -1; else if (p[1] > this.state.height) p[1] = this.state.height + (p.vy *= -1);
      p.vx += 0.1 * (Math.random() - 0.5) - 0.01 * p.vx;
      p.vy += 0.1 * (Math.random() - 0.5) - 0.01 * p.vy;
      data[i] = p;
    }
    return data;
  }

  render() {
    return (
      <VictoryVoronoi
        data={this.state.data}
        svgWidth={this.state.svgWidth}
        svgHeight={this.state.svgHeight}
        velocity={5}
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
