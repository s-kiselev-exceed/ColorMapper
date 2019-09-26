import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { parse } from "querystring";
import { Slide } from "@material-ui/core";


function valuetext(value) {
  console.log(value);
  return `${value}°C`;
}

export const ColorMapper = props => {
  console.log("@@@@@props", props.data);
  // const convertProps = props => {
  //   console.log("+++++")
  //   let res = [];
  //   const min = props.numberRange[0];
  //   const max = props.numberRange[1];
  //   const range = (max - min) / props.colors.length;
  //   props.colors.reduce((acc, current) => {
  //     const start = acc.min !== undefined ? acc.min + range : min;
  //     res.push({
  //       [`${current}`]: {
  //         min: start,
  //         max: start + range
  //       }
  //     });
  //     return { min: start, max: start + range };
  //   }, {});
  //   return res;
  // };
  let state = {};
  // let state = convertProps(props);
  // console.log("state", state);

  ///////

  // const handler = (key, value) => {
  //   // console.log(value);
  //   const result = [...state];
  //   // console.log('result', result)
  //   const found = result.find(o => o.hasOwnProperty(key));
  //   // console.log(found)
  //   const position = result.indexOf(found);
  //   // console.log(position)
  //   if (value.start && position !== 0) {
  //     // console.log(value.start)
  //     result[position][key].min = value.start;
  //     Object.keys(result[position - 1]).every(p => {
  //       result[position - 1][p].max = value.start;
  //     });
  //   }
  //   if (value.end && position !== result.length - 1) {
  //     result[position][key].max = value.end;
  //     console.log(value.end);
  //     Object.keys(result[position + 1]).every(p => {
  //       result[position + 1][p].min = value.end;
  //     });
  //   }
  //   return result;
  // };

  // const res = handler('#f44336', {start:100,end: 1200});
  // console.log("result", res);

  ////////












  // const [value, setValue] = React.useState(state);
  const handleChange = (event, newValue, name) => {
    state = props.handler(name, { start: newValue[0], end: newValue[1] });
  };

  // const useStyles = makeStyles({
  //   root: { 
  //     color: "orange"
  //   }
  // });
  // const classes = useStyles();

  return props.data.map(elem => {

    let name;
    let min;
    let max;
    Object.keys(elem).forEach(key => {
      name = key;
      min = elem[key].min;
      max = elem[key].max;
    });
    console.log(name);
    
    // const AirbnbSlider = withStyles({
    //   root: {
    //     color: `${name}`,
    //     height: 3,
       
    //   }
    // })(Slider);
    
    const useStyles = makeStyles({
      root: { 
        color: `${name}`
      }
    });
   
    // console.log("name, min, max", name, min, max);
    return (
      <Slider
      className={useStyles.root}
        value={[min, max]}
        name={name}
        onChange={(e, value) => handleChange(e, value, name)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        // getAriaValueText={valuetext}
        min={props.numberRange[0]}
        max={props.numberRange[1]}
      />
    );
  });
};

// class ColorMapper extends React.Component {

//   state = {
//     start: 0,
//     finish: parseInt(100 / this.props.colors.length),
//     value: [0, parseInt(100 / this.props.colors.length)]
//   };

//   handleChange = (event, newValue) => {
//     console.log(newValue);
//   };

//   ColorMapper = () => {
//     const { colors, unit, numberRange } = this.props;
//     let start = 0;
//     let finish = 0;
//     //  let numberColor=1+colors.indexOf(elem);
//     // let range = parseInt(100 / colors.length);
//     return colors.map(elem => {
//       console.log(colors.indexOf(elem));
//       let PrettoSlider = withStyles({
//         root: {
//           color: `${elem}`,
//           height: 8,
//           width: "40%",
//           marginLeft: 20
//         },
//         thumb: {
//           height: 18,
//           width: 18,
//           backgroundColor: `${elem}`,
//           marginTop: -8,
//           marginLeft: -12
//         },
//         active: {},
//         valueLabel: {
//           left: "calc(-50% + 4px)"
//         },
//         track: {
//           height: 3,
//           borderRadius: 4
//         },
//         rail: {
//           height: 3,
//           borderRadius: 4
//         }
//       })(Slider);
//       //       if (colors.indexOf(elem)!==0) {
//       // let x=start+range
//       //         this.setState({start:10,
//       //         finish:99})

//       //       }
//       // let start=0;
//       // let finish=parseInt(100/colors.length);
//       if (colors.indexOf(elem) === 0) {
//         return (
//           <div>
//             <Typography>{numberRange[0] + " " + unit}</Typography>
//             <PrettoSlider
//               // value={this.state.value}
//               onChange={e => this.handleChange(e, this.state.value)}
//               valueLabelDisplay="auto" //on
//               // getAriaValueText={valuetext}
//               id={colors.indexOf(elem)}
//               min={0}
//               max={100}
//               // defaultValue={[this.state.start, this.state.finish]}
//               value={[0,this.state.finish]}
//             />
//           </div>
//         );
//       } else {
//         start = start + this.state.finish;
//         finish = start + this.state.finish;

//         return (
//           <div>
//             <Typography>{numberRange[0] + " " + unit}</Typography>
//             <PrettoSlider
//               // value={this.state.value}
//               id={colors.indexOf(elem)}
//               onChange={e => this.handleChange(e, elem)}
//               valueLabelDisplay="auto" //on
//               // getAriaValueText={valuetext}
//               min={0}
//               max={100}
//               defaultValue={[start, finish]}
//             />
//           </div>
//         );
//       }
//     });
//   };
//   render() {
//     return this.ColorMapper();
//   }
// }

// export default ColorMapper;
