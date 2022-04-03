import React, { Component } from 'react';
import './App.css';
import Web3 from "web3";
import Basic from "../abis/Basic.json";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Basic.networks[networkId];
    if(networkData) {
      const basic = web3.eth.Contract(Basic.abi, networkData.address);
      let x = await basic.methods.getX().call();
      this.setState({ x: parseInt(x._hex), basic: basic, loading: false });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      x: null,
      account: "",
      loading: true
    };
  }

   updateXValue(val) {
    this.setState({ loading: true });
    this.state.basic.methods.setX(val).send({ from: this.state.account })
    .once("receipt", async (receipt) => {
      this.setState({ loading: false });
    })
  }

  render() {
    return (
      <div>
        {
          this.state.loading 
          ? <h2>Loading...</h2>
          : null
        }
        <h1>Account: {this.state.account}</h1>
        <h3>X Value: {this.state.x}</h3>
        <form onSubmit={ (event) => {
          event.preventDefault();
          const val = this.xin.value;
          this.updateXValue(val);
        } }>
          <input 
            type="number" 
            id="xin"
            ref={(input) => { this.xin = input }} 
          />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default App;
