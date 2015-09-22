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
    this.voronoiGenerator = d3.geom.voronoi()
      .clipExtent([
        [this.props.clipExtent.x, this.props.clipExtent.y],
        [this.props.svgWidth, this.props.svgHeight]
      ]);
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

  addTrianglePoints(data) {
    if (this.props.corners) {
      data.push(
        {0: 0, 1: 0},
        {0: 0, 1: this.props.svgHeight},
        {0: this.props.svgWidth, 1: 0},
        {0: this.props.svgWidth, 1: this.props.svgHeight}
      );
    }
    if (this.props.fixedPoints) {
      data = data.concat(this.props.fixedPoints);
    }
    return data;
  }

  drawVoronoi(data) {
    const isTriangle = this.props.triangle;
    let dataClone = _.clone(data);
    let newData;

    if (isTriangle) {
      dataClone = this.addTrianglePoints(dataClone);
      newData = this.voronoiGenerator.triangles(dataClone);
    } else {
      newData = this.voronoiGenerator(dataClone);
    }

    return _.map(newData, (cell, i) => {
      const vertices = [];

      for (let j = 0; j < cell.length; j++) {
        if (isTriangle) {
          vertices.push([cell[j][0], cell[j][1]]);
        } else {
          vertices.push(cell[j]);
        }
      }

      const path = "M" + vertices.join("L") + "Z";

      return (
        <VictoryAnimation data={{ path, point: cell.point }} key={i} velocity={this.props.velocity}>
          {(voronoi) => {
            return (
              <g key={i}>
                <path
                  style={this.getPathStyles(vertices, i)}
                  d={voronoi.path}/>
                {isTriangle || this.props.hideCentroids ? null : (
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
      <svg
        style={{ backgroundColor: this.props.backgroundColor }}
        height={this.props.svgHeight}
        width={this.props.svgWidth}>
        <g>
          {this.drawVoronoi(this.props.data)}
        </g>
      </svg>
    );
  }
}

VictoryVoronoi.propTypes = {
  backgroundColor: React.PropTypes.string,
  circleRadius: React.PropTypes.number,
  circleStyles: React.PropTypes.object,
  clipExtent: React.PropTypes.object,
  computePathFill: React.PropTypes.func,
  corners: React.PropTypes.bool,
  data: React.PropTypes.array,
  fixedPoints: React.PropTypes.arrayOf(React.PropTypes.object),
  hideCentroids: React.PropTypes.bool,
  pathStyles: React.PropTypes.object,
  svg: React.PropTypes.bool,
  svgHeight: React.PropTypes.number,
  svgWidth: React.PropTypes.number,
  triangle: React.PropTypes.bool,
  velocity: React.PropTypes.number
};

VictoryVoronoi.defaultProps = {
  backgroundColor: "#FFF",
  circleRadius: 2,
  circleStyles: {
    fill: () => { return "#FFF"; },
    stroke: () => { return "none"; }
  },
  clipExtent: { x: 0, y: 0 },
  corners: true,
  hideCentroids: false,
  pathStyles: {
    fill: (i) => { return "rgba(" + i * 2 + "," + i * 2 + "," + i * 2 + "," + 1 + ")"; },
    stroke: () => { return "#eee"; },
    strokeWidth: () => { return 1; }
  },
  svg: true,
  svgHeight: 600,
  svgWidth: 960,
  triangle: false,
  velocity: 10
};

export default VictoryVoronoi;
