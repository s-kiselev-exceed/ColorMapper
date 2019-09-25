import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export function GroupSelector(props) {
  console.log(props);
  const { data, onChange, styles } = props;
  const [selectedValue, checkedMeasurements] = React.useState("a");

  const handleChange = event => {
    checkedMeasurements(event.target.value);
  };

  const renderMeasurments = () => {
    if (data.counters) {
      return (
        <div className="group-selector__checkbox-panel" style={styles["group-selector__checkbox-panel"]}>
          <p>Measurements</p>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                checked={selectedValue === "1"}
                value="1"
              />
            }
            label="Throughput (mbps)"
          />

          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                checked={selectedValue === "2"}
                value="2"
              />
            }
            label="RTT (ms)"
          />
        </div>
      );
    }
  };

  const renderFilters = () => {
    if (data.filters) {
      return (
        <div className="group-selector__checkbox-panel" style={styles["group-selector__checkbox-panel"]}>
          <p>Filters</p>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                checked={selectedValue === "3"}
                value="3"
              />
            }
            label="MCC 240"
          />

          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                checked={selectedValue === "4"}
                value="4"
              />
            }
            label="MCC 239"
          />

          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChange}
                checked={selectedValue === "5"}
                value="5"
              />
            }
            label="VPLMN 23903"
          />
        </div>
      );
    }
  };

  return (
    <div className="group-selector" style={styles["group-selector"]}>
      {renderMeasurments()}
      {renderFilters()}
    </div>
  );
}
