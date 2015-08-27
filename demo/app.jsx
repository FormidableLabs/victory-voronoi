/*global document:false*/
import React from "react";
import _ from "lodash";
import {VictoryVoronoi} from "../src/index";

const getRandomVoronoiData = function (width, height) {
  return _.map(_.range(60), () => {
    return [Math.random() * width, Math.random() * height];
  });
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth: 960,
      svgHeight: 600,
      data: getRandomVoronoiData(960, 600)
    };
  }

  // componentDidMount() {
  //   window.setInterval(() => {
  //     this.setState({
  //       data: getRandomVoronoiData(960, 600)
  //     });
  //   }, 8000);
  // }

  render() {
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
