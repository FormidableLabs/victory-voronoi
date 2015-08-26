/*global document:false*/
import React from "react";
import {VictoryVoronoi} from "../src/index";

function getRandomVoronoiData (width, height) {
  const vertices = d3.range(100).map(() => {
    return [Math.random() * width, Math.random() * height];
  });
  return vertices;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth: 960,
      svgHeight: 600,
      data: getRandomVoronoiData(960, 600)
    }
  }
  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        data: getRandomVoronoiData(960,600)
      });
    }, 1700);
  }
  render() {
    console.log(this.state.data)
    return (
      <VictoryVoronoi
        data={this.state.data}
        svgWidth={this.state.svgWidth}
        svgHeight={this.state.svgHeight}/>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
