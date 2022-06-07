import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { manager: "" };
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    console.log(manager);
    this.setState({ manager: manager });
  }

  render() {
    return (
      <div className="App">
        <h2>Lottery Contract</h2>
        <p>The Contract is Managed by {this.state.manager}</p>
        {/* <p>{lottery}</p> */}
      </div>
    );
  }
}

export default App;
