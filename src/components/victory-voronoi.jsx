import React from "react";
import Radium from "radium";
import d3 from "d3";
import _ from "lodash";
import {VictoryAnimation} from "victory-animation";

@Radium
class VictoryVoronoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPathStyles(cell, i) {
    return {
      stroke: this.props.pathStyles.stroke(cell, i),
      fill: this.props.pathStyles.fill(i)
    };
  }

  getCircleStyles(cell, i) {
    return {
      stroke: this.props.circleStyles.stroke(cell, i),
      fill: this.props.circleStyles.fill(cell, i)
    };
  }

  drawVoronoi(data) {
    const voronoiGenerator =
      d3.geom.voronoi().clipExtent([[0, 0], [this.props.svgWidth, this.props.svgHeight]]);
    const newData = voronoiGenerator(data);

    return _.map(newData, (cell, i) => {
      return (
        <VictoryAnimation data={_.toPlainObject(cell)} key={i}>
          {(voronoi) => {
            // remove voronoi centroid coordinates to create array of vertices only
            const vertices = _.toArray(voronoi).slice(0, -1);
            return (
              <g>
                <path
                  style={this.getPathStyles(vertices, i)}
                  d={"M" + vertices.join("L") + "Z"}/>
                <circle
                  style={this.getCircleStyles(vertices, i)}
                  r={this.props.circleRadius}
                  transform={"translate(" + voronoi.point + ")"}/>
              </g>
            );
          }}
        </VictoryAnimation>
      );
    });
  }

  render() {
    return (
      <svg height={this.props.svgHeight} width={this.props.svgWidth}>
        <g>
          {this.drawVoronoi(this.props.data)}
        </g>
      </svg>
    );
  }
}

VictoryVoronoi.propTypes = {
  circleRadius: React.PropTypes.number,
  circleStyles: React.PropTypes.object,
  computePathFill: React.PropTypes.func,
  data: React.PropTypes.array,
  pathStyles: React.PropTypes.object,
  styles: React.PropTypes.object,
  svg: React.PropTypes.bool,
  svgHeight: React.PropTypes.number,
  svgWidth: React.PropTypes.number
};

VictoryVoronoi.defaultProps = {
  svg: true,
  svgWidth: 960,
  svgHeight: 600,
  circleStyles: {
    fill: () => { return "#FFF"; },
    stroke: () => { return "none"; }
  },
  pathStyles: {
    fill: (i) => { return "rgba(" + i * 2 + "," + i * 2 + "," + i * 2 + "," + 1 + ")"; },
    stroke: () => { return "#eee"; }
  },
  circleRadius: 2
};

export default VictoryVoronoi;
