import React, { Component } from 'react';

class LineChart extends Component {
  // GET MAX & MIN X
  getMinX() {
    const { data } = this.props;
    return data[0].x;
  }
  getMaxX() {
    const { data } = this.props;
    return data[data.length - 1].x;
  }
  // GET MAX & MIN Y
  getMinY() {
    const { data } = this.props;
    return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
  }
  getMaxY() {
    const { data } = this.props;
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
  }

  getSvgX(x) {
    const { svgWidth } = this.props;
    return ((x / this.getMaxX()) * svgWidth);
  }
  getSvgY(y) {
    const { svgHeight } = this.props;
    return svgHeight - ((y / this.getMaxY()) * svgHeight) + 100;
  }

  makePath() {
    // The <path> element defines the shape of our svg.
    // d attribute is a string containing a list of path instructions.
    // M means ‘move to’. In this instance, move to point x=10, y=10.
    // L means ‘line to’. In this instance create a line to point x=20, y=20.
    // z means ‘close’. It ends our SVG element
    const { data, color } = this.props;
    let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";
    pathD += data.map((point, i) => {
      return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
    });
    return (
      <path className="linechart_path" d={pathD} style={{ stroke: color }} />
    );
  }

  makeAxis() {
    const minX = this.getMinX(), maxX = this.getMaxX();
    const minY = this.getMinY(), maxY = this.getMaxY();
    return (
      <g className="linechart_axis">
        <line
          x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
          x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)} />
        <line
          x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
          x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)} />
      </g>
    );
  }

  render() {
    return (
      <svg viewBox={`0 0 ${this.props.svgWidth} ${this.props.svgHeight}`}>
        {this.props.data.length && this.makePath()}
      </svg>
    );
  }
}

LineChart.defaultProps = {
  color: '#2196F3',
  svgHeight: 300,
  svgWidth: 700
}
export default LineChart;