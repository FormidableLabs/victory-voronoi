/*global document:false*/
import React from "react";
import _ from "lodash";
import {VictoryVoronoi} from "../src/index";

const getRandomVoronoiData = function (width, height) {
  return _.map(_.range(40), () => {
    return [_.random(0, 1, true) * width, _.random(0, 1, true) * height];
  });
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth: 1200,
      svgHeight: 430,
      data: getRandomVoronoiData(1200, 430)
    };
  }

  // componentDidMount() {
  //   window.setInterval(() => {
  //     this.setState({
  //       data: getRandomVoronoiData(1200, 430)
  //     });
  //   }, 5000);
  // }

  render() {
    return (
      <VictoryVoronoi
        data={this.state.data}
        svgWidth={this.state.svgWidth}
        svgHeight={this.state.svgHeight}
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
