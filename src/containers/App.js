import React, { Component } from "react";
import { GroupSelector } from "../components/GroupSelector";
import { styles } from "../style/style";
import data from "../mockData/data.json";

class App extends Component {
  state = {
    graph: {}
  };
  
  componentDidMount() {
    /* API call emulation */
    setTimeout(() => {
      this.setState({
        graph: data
      });
    });
  }

  render() {
    return (
      <div>
        <GroupSelector data={this.state.graph} styles={styles} />
      </div>
    );
  }
}

export default App;
