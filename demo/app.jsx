/*global document:false*/
import React from "react";
import {VictoryVoronoi} from "../src/index";

class App extends React.Component {
  render() {
    return (
      <VictoryVoronoi/>
    );
  }
}

const content = document.getElementById("content");

React.render(<App/>, content);
