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
      fill: this.props.pathStyles.fill(cell, i),
      stroke: this.props.pathStyles.stroke(cell, i),
      strokeWidth: this.props.pathStyles.strokeWidth(cell, i)
    };
  }

  getCircleStyles(cell, i) {
    return {
      stroke: this.props.circleStyles.stroke(cell, i),
      fill: this.props.circleStyles.fill(cell, i)
    };
  }

  drawVoronoi(data) {
    const voronoiGenerator = d3.geom.voronoi()
      .clipExtent([
        [this.props.clipExtent.x, this.props.clipExtent.y],
        [this.props.svgWidth, this.props.svgHeight]
      ]);
    const newData = this.props.triangle ?
      voronoiGenerator.triangles(data) : voronoiGenerator(data);

    return _.map(newData, (cell, i) => {
      return (
        <VictoryAnimation data={_.toPlainObject(cell)} key={i} velocity={this.props.velocity}>
          {(voronoi) => {
            // remove voronoi centroid coordinates to create array of vertices only
            const vertices =
              this.props.triangle ? _.toArray(voronoi) : _.toArray(voronoi).slice(0, -1);

            return (
              <g key={i}>
                <path
                  style={this.getPathStyles(vertices, i)}
                  d={"M" + vertices.join("L") + "Z"}/>
                {this.props.triangle ? null : (
                  <circle
                    style={this.getCircleStyles(vertices, i)}
                    r={this.props.circleRadius}
                    transform={"translate(" + voronoi.point[0] + "," + voronoi.point[1] + ")"}/>
                  )
                }
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
  clipExtent: React.PropTypes.object,
  computePathFill: React.PropTypes.func,
  data: React.PropTypes.array,
  pathStyles: React.PropTypes.object,
  svg: React.PropTypes.bool,
  svgHeight: React.PropTypes.number,
  svgWidth: React.PropTypes.number,
  triangle: React.PropTypes.bool,
  velocity: React.PropTypes.number
};

VictoryVoronoi.defaultProps = {
  circleRadius: 2,
  circleStyles: {
    fill: () => { return "#FFF"; },
    stroke: () => { return "none"; }
  },
  clipExtent: { x: 0, y: 0 },
  pathStyles: {
    fill: (i) => { return "rgba(" + i * 2 + "," + i * 2 + "," + i * 2 + "," + 1 + ")"; },
    stroke: () => { return "#eee"; },
    strokeWidth: () => { return 1; }
  },
  svg: true,
  svgHeight: 600,
  svgWidth: 960,
  triangle: false,
  velocity: 0.02
};

export default VictoryVoronoi;
