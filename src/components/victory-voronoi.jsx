import React from "react";
import Radium from "radium";
import d3 from "d3";

/*
  http://bl.ocks.org/mbostock/4060366
  http://bl.ocks.org/mbostock/6675193
  http://bl.ocks.org/mbostock/6909318
  http://bl.ocks.org/mbostock/3846051
  http://bl.ocks.org/mbostock/7280327
  http://bl.ocks.org/mbostock/7608400
  https://www.jasondavies.com/maps/voronoi/
  https://www.jasondavies.com/maps/voronoi/airports/
  http://christophermanning.org/projects/
    voronoi-diagram-with-force-directed-nodes-and-delaunay-links/
*/

@Radium
class VictoryVoronoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  drawVoronoi(data) {
    const voronoi = d3.geom.voronoi()
                    .clipExtent([[0, 0], [this.props.svgWidth, this.props.svgHeight]]);
    const newData = voronoi(data);
    const cells = newData.map((cell, i) => {
      return (
        <path
          style={{stroke: "#fff", fill: "rgba(" + i + "," + i + "," + i + "," + 1 + ")" }}
          d={"M" + cell.join("L") + "Z"} />
      );
    });
    return cells;
  }
  getRandomData() {
    const vertices = d3.range(100).map(() => {
      return [Math.random() * this.props.svgWidth, Math.random() * this.props.svgHeight];
    });
    return vertices;
  }
  render() {
    return (
      <svg height={this.props.svgHeight} width={this.props.svgWidth}>
        <g>
          {this.drawVoronoi(this.props.data || this.getRandomData())}
        </g>
      </svg>
    );
  }
}

VictoryVoronoi.propTypes = {
  svg: React.PropTypes.bool,
  svgWidth: React.PropTypes.number,
  svgHeight: React.PropTypes.number,
  stroke: React.PropTypes.string,
  data: React.PropTypes.array
};

VictoryVoronoi.defaultProps = {
  svg: true,
  svgWidth: 960,
  svgHeight: 600,
  stroke: "#fff"
};

export default VictoryVoronoi;
