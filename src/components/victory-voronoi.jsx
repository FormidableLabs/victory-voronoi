import React from "react";
import Radium from "radium";
import d3 from "d3";
import {VictoryAnimation} from "victory-animation";

@Radium
class VictoryVoronoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getPathStyles (cell, i) {
    return {
      stroke: this.props.pathStyles.stroke(cell, i),
      fill: this.props.pathStyles.fill(cell, i)
    }
  }
  getCircleStyles (cell, i) {
    return {
      stroke: this.props.circleStyles.stroke(cell, i),
      fill: this.props.circleStyles.fill(cell, i)
    }
  }
  drawVoronoi(data) {
    const voronoi = d3.geom.voronoi()
                    .clipExtent([[0, 0], [this.props.svgWidth, this.props.svgHeight]]);
    const newData = voronoi(data);
    /* circle translate uses data[i] to get centroid from unadulterated data */
    const cells = newData.map((cell, i) => {
      console.log(cell, i)
      return (
        <VictoryAnimation data={cell} key={i}>
          {(data) => {
            return (
              <g>
                <path
                  style={this.getPathStyles(cell, i)}
                  d={"M" + cell.join("L") + "Z"} />
                <circle
                  style={this.getCircleStyles(cell, i)}
                  r={this.props.circleRadius}
                  transform={"translate("+ data[i] +")"}/>
              </g>
            );
          }}
        </VictoryAnimation>
      )
    });
    return cells;
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
  svg: React.PropTypes.bool,
  svgWidth: React.PropTypes.number,
  svgHeight: React.PropTypes.number,
  styles: React.PropTypes.object,
  data: React.PropTypes.array,
  computePathFill: React.PropTypes.func,
  circleRadius: React.PropTypes.number
};

VictoryVoronoi.defaultProps = {
  svg: true,
  svgWidth: 960,
  svgHeight: 600,
  circleStyles: {
    fill: (cell, i) => { return "#FFF"; },
    stroke: (cell, i) => { return "none"; }
  },
  pathStyles: {
    fill: (cell, i) => {
      return "rgba(" + i * 2 + "," + i * 2 + "," + i * 2 + "," + 1 + ")";
    },
    stroke: (cell, i) => { return "#eee"; }
  },
  circleRadius: 2
};

export default VictoryVoronoi;
