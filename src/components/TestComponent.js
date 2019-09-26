import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
//import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";


function valuetext(value) {
 return ${value};
}
// const useStyles = makeStyles({
//   root: {
//     width: 300
//   }
// });
////////
/////////
export const ColorMapper = props => {
 const { colors, numberRange, unit } = props;
 // const widthSlider = useStyles();
 let range=parseInt((100/colors.length));
 let [value, setValue] = React.useState([0, range]);
 const reverseArray = array => {
   let reversArr = array.reverse();
 };
 const handleChange = (event, newValue) => {
   setValue(newValue);
 };
 const renderColorMapper = () => {
   return colors.map(elem => {
     let numberColor=1+colors.indexOf(elem);
console.log(numberColor)
     const PrettoSlider = withStyles({
       root: {
         color: ${elem},
         height: 8,
         width: 300
       },
       thumb: {
         height: 20,
         width: 20,
         backgroundColor: ${elem},
         border: "2px solid currentColor",
         marginTop: -8,
         marginLeft: -12,
         "&:focus,&:hover,&$active": {
           boxShadow: "inherit"
         }
       },
       active: {},
       valueLabel: {
         left: "calc(-50% + 4px)"
       }
     })(Slider);
     let names = [elem];
     return (
       // <div className={widthSlider.root}>
       <div>
         <Typography>{numberRange[0] + " " + unit}</Typography>
         <PrettoSlider
           value={value}
           onChange={handleChange}
           valueLabelDisplay="auto" //on
           getAriaValueText={valuetext}
         />
       </div>
     );
   });
 };
 return (
   <div>
     <FormControlLabel control={<Checkbox onClick={reverseArray(colors)}/>} label="Revers color" />
     {renderColorMapper()}
   </div>
 );
};