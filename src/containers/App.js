import React, { Component } from "react";
import { ColorMapper } from "../components/ColorMapper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class App extends Component {
  state = {
    numberRange: [0, 900],
    unit: "ms",
    colors: ["#f44336", "#4CAF50", "#3F51B5", "red", "blue", "dark"],
    lines: [],
    first: 0,
    second: 0
  };

  computeLines = state => {
    console.log("+++++");
    let res = [];
    const min = state.numberRange[0];
    const max = state.numberRange[1];
    const range = (max - min) / state.colors.length;
    state.colors.reduce((acc, current) => {
      const start = acc.min !== undefined ? acc.min + range : min;
      res.push({
        [`${current}`]: {
          min: start,
          max: start + range
        }
      });
      return { min: start, max: start + range };
    }, {});
    console.log("@@res", res);
    return res;
  };

  handler = (key, value) => {
    if (this.state.second !== value.end) {
      console.log("=============");
      this.setState({ second: value.end });
    }

    const result = [...this.state.lines];
    console.log("result", result);
    const found = result.find(o => o.hasOwnProperty(key));
    // console.log(found)
    const position = result.indexOf(found);
    // console.log(position)
    if (value.start && position !== 0) {
      result[position][key].min = value.start;
      if (result[position][key].min >= result[position][key].max - 10) {
        //for (let i=0;i<result.length; i++){}
        result[position][key].max = result[position][key].min + 10;
        Object.keys(result[position + 1]).every(p => {
          result[position + 1][p].min = result[position][key].min + 10;
        });
      }
      Object.keys(result[position - 1]).every(p => {
        result[position - 1][p].max = value.start;
      });
    }

    if (value.end !== this.state.second && position !== result.length - 1) {
      console.log("+++++++++++++++++", value.end);
      result[position][key].max = value.end;
      console.log(value.end);
      Object.keys(result[position + 1]).every(p => {
        console.log(result[position + 1]);
        result[position + 1][p].min = value.end;
        if ( result[position + 1][p].min >=  result[position + 1][p].max - 10) {
        result[position + 1][p].max = result[position + 1][p].min + 10;
          // Object.keys(result[position + 1]).every(p => {
          //   result[position + 1][p].min = result[position][key].min + 10;
          // });
        }
      });
    }
    console.log("handler result", result);
    this.setState({ ...this.state, lines: result });
    // return result;
  };

  componentDidMount() {
    this.setState({ ...this.state, lines: this.computeLines(this.state) });
  }

  // onChange = () => {};

  reverseArray = array => {
    let reversArr = array.reverse();
    console.log(this.state.lines);
    this.setState({ lines: reversArr });
  };

  render() {
    console.log("this.state.lines", this.state.lines);
    return (
      <div>
        <FormControlLabel
          control={
            <Checkbox onChange={() => this.reverseArray(this.state.lines)} />
          }
          label="Revers color"
        />
        <ColorMapper
          data={this.state.lines}
          handler={this.handler}
          numberRange={this.state.numberRange}
          unit={this.state.unit}
          colors={this.state.colors}
        />
      </div>
    );
  }
}

export default App;
