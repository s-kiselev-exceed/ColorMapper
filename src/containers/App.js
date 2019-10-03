import React, { Component } from "react";
import { ColorMapper } from "../components/ColorMapper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class App extends Component {
  state = {
    numberRange: [0, 900],
    unit: "ms",
    colors: ["#f44336", "#4CAF50", "#3F51B5", "red", "blue", "black"],
    lines: [],
    first: 0,
    second: 0
  };

  computeLines = state => {
    console.log("qweqweqweqwe");
    let res = [];
    const min = state.numberRange[0];
    const max = state.numberRange[1];
    const range = (max - min) / state.colors.length;
    //func(state.colors){   let reversArr = array.reverse();
    // this.setState({ lines: reversArr });  }
    state.colors.reduce((acc, current) => {
      console.log(state.colors);
      const start = acc.min !== undefined ? acc.min + range : min;
      res.push({
        [`${current}`]: {
          min: start,
          max: start + range
        }
      });
      return { min: start, max: start + range };
    }, {});
    return res;
  };

  handler = (key, value) => {
    console.log(value,"Value+++++++++++++++")
    const onePercentRange = this.state.numberRange[1] / 100;
    // if (this.state.second !== value.end) {
    //   console.log("=============");
    //   this.setState({ second: value.end });
    // }
    console.log(key);
    const result = [...this.state.lines];
    console.log("result", result);
    const found = result.find(o => o.hasOwnProperty(key));
    console.log(found);
    const position = result.indexOf(found);
    console.log(position);
    
    if (value.start && position !== 0) {
      //       result[position][key].min = value.start;
      // //if( result[position][key].min>= result[position][key].max-10){result[position][key].max=value.start+10}
      // //       for (let i=position+1; i<result.length;i++){
      // //         Object.keys(result[i]).every(p => {
      // // console.log("+++", result[i][p].min)
      // //           if (value.end>=result[i][p].min){
      // //           result[i][p].min = value.end;
      // //           }
      // //           if (value.end>=result[i][p].max){
      // //             result[i][p].max = value.end;
      // //             }
      // //         })
      // //       }
      //       if (result[position][key].min >= result[position][key].max - 50) {
      //       //   //for (let i=0;i<result.length; i++){}
      //       console.log("++++++++",result[position][key].max)
      //       result[position][key].max = value.start + 50;
      //       console.log( result[position][key].max)
      //       //   Object.keys(result[position + 1]).every(p => {
      //       //     result[position + 1][p].min = result[position][key].min + 10;
      //       //   });
      //       // }
      //       // Object.keys(result[position - 1]).every(p => {
      //       //   result[position - 1][p].max = value.start;
      //       //
      //       }
    }

    if (value.end && position !== result.length - 1) {
      result[position][key].max = value.end;
      // if(result[position][key].min>=result[position][key].max-50){
      // result[position][key].min = value.end-50;
      // console.log("!!!!!!!!!!!!!!")
      // }
      // if(result[position][key].min<result[position][key].max){
      //   result[position][key].min = value.start;
      //   }

      //       Object.keys(result[position]).every(p => {
      // console.log(p)
      //       if(key===p){
      //         result[position][key].min = value.start
      //       }
      //     })

      // >> stoping max point
      if (
        result[position][key].min >=
        result[position][key].max - onePercentRange
      ) {
        result[position][key].max = result[position][key].min + onePercentRange;
      }
      // >> moving min point of the next slider to left
      Object.keys(result[position + 1]).every(p => {
        if (result[position + 1][p].min >= value.end) {
          console.log("+++++++++", result[position + 1][p].min);
          result[position + 1][p].min = value.end;
        }
      });
      //==>>>>>>>>>>>>>>>>>>>>>
      // >> depending points of the sliders from moving max point to right
      for (let i = position + 1; i < result.length; i++) {
        Object.keys(result[i]).every(p => {
          if (value.end >= result[i][p].min) {
            result[i][p].min = value.end;
          }

          if (value.end >= result[i][p].max) {
            result[i][p].max = value.end;
          }

          // if(value.end<=result[position+1][p].min){
          //   result[position+1][p].min=value.end+10
          // }
        });
      }
      //==>>>>>>>>>>>>>>>>>>>>>
      Object.keys(result[position + 1]).every(p => {
        // result[position + 1][p].min = value.end;
        // // if (result[position + 1][p].min >= result[position + 1][p].max - 10) {
        // //   result[position + 1][p].max = result[position + 1][p].min + 10;
        // //   // Object.keys(result[position + 1]).every(p => {
        // //   //   result[position + 1][p].min = result[position][key].min + 10;
        // //   // });
        // // }
        // console.log(result)
        // for(let i=position+1; i<result.length;i++ ){
        //   console.log(i)
        //   if(result[i][p].min >= result[i][p].max - 10){
        //     result[i][p].max = result[i][p].min + 10;
        //   }
        //   // if(result[i][p].max >= result[i+1][p].min - 10 ){
        //   //   result[i+1][p].min = result[i][p].max + 10;
        //   // }
        // }
      });
    }
    this.setState({ ...this.state, lines: result });
  };

  componentDidMount() {
    this.setState({ ...this.state, lines: this.computeLines(this.state) });
  }

  reverseColorHandler = array => {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      Object.keys(array[i]).every(p => {
        arr = [...arr, p];
      });
    }
    let reverseArr = arr.reverse();
    let res = array.map((e, index) => {
      let r;
      Object.keys(e).forEach(key => {
        r = { [reverseArr[index]]: e[key] };
      });
      return r;
    });
    this.setState({lines:res})
  };

  lambdaFunction = color => {
    console.log(`${color}`);
    return `${color}`;
  };

  onChange = color => {
    this.lambdaFunction(color);
  };

  render() {
    return (
      <div>
        <FormControlLabel
          control={
            <Checkbox onChange={() => this.reverseColorHandler(this.state.lines)} />
          }
          label="Reverse color"
        />
        <ColorMapper
          data={this.state.lines}
          handler={this.handler}
          numberRange={this.state.numberRange}
          unit={this.state.unit}
          colors={this.state.colors}
          testFunc={this.testFunc}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
