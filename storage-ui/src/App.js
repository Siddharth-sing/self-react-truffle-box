import React, { useState } from "react";
import { SimpleStorageABI } from "./abi/abi";
import Web3 from "web3";
import './App.css';

// Access our wallet inside of our dapp
const web3 = new Web3(Web3.givenProvider);
// Contract address of the deployed smart contract
const contractAddress = "0xBa9Aa5AFE8925a8De0549302302727e13a781A2f";

const storageContract = new web3.eth.Contract(SimpleStorageABI, contractAddress);

function App() {
  // Hold variables that will interact with our contract and frontend
  const [number, setUint] = useState(0);
  const [getNumber, setGet] = useState("0");
  
  const numberSet = async (t) => {
    console.log("Called");
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    // Get permission to access user funds to pay for gas fees
    const gas = await storageContract.methods.set(number).estimateGas();
    await storageContract.methods.set(number).send({
      from: account,
      gas,
    });
    
    console.log("Setted");
  };
  
  const numberGet = async (t) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    console.log("here inside");
    t.preventDefault();
    console.log("here inside");
    const post = await storageContract.methods.get().call({from : account});
    console.log("here inside");
    setGet(post);
    console.log("here inside");
    
  };
  
  return (
     <div className="main">
       <div className="card">
         <form className="form" onSubmit={numberSet}>
           <label>
             Set your uint256:
             <input
               className="input"
               type="text"
               name="name"
               onChange={(t) => setUint(t.target.value)}
             />
           </label>
           <button className="button" type="submit" value="Confirm">
             Confirm
           </button>
         </form>
         <br />
         <button className="button" onClick={numberGet} type="button">
           Get your uint256
         </button>
         {getNumber}
       </div>
     </div>
  );
}

export default App;