import React, { useState, useEffect } from "react";
import { SimpleStorageABI } from "./abi/abi";
import SimpleStorage from "./abi/SimpleStorage.json";
import Web3 from "web3";
import './App.css';


const web3 = new Web3(Web3.givenProvider);
var storageContract;

function App() {

  

  const [number, setUint] = useState(0);
  const [getNumber, setGet] = useState("0");

  useEffect(() => {
    console.log("Inside useEffect");
    async function fetchData() {
       var networkId = await web3.eth.net.getId();
       var contractAddress = SimpleStorage.networks[networkId].address;
       storageContract = new web3.eth.Contract(SimpleStorageABI,contractAddress);
    }
    fetchData();
  }, []);

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