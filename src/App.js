import { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {

  const [web3Api, setweb3Api] = useState({
    provider: null,
    web3: null
  })

  const [account, setAccount] = useState(null);


  useEffect(() => {
    const loadProvider = async () => {

      // 2nd and easy method to connect metamask
      const provider = await detectEthereumProvider();
      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setweb3Api({
          web3: new Web3(provider),
          provider,
        })
      }
      else {
        console.error("Please install Metamask!");
      }




      // General method to connect metamask using if else ----->
      // let provider = null;
      // if (window.ethereum) {
      //   provider = window.ethereum;
      //   try {
      //     // Connect auto metamask while windows load
      //     // await provider.enable();   //Depricated

      //     await provider.request({ method: "eth_requestAccounts" });
      //     console.log("metamask connected");
      //   }
      //   catch (error) {
      //     console.error("user not allowed");
      //   }
      // }
      // else if (window.web3) {
      //   provider = window.web3.currentProvider;
      // }
      // else if (!process.env.production) {
      //   provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545")
      // }

      // setweb3Api({
      //   web3: new Web3(provider),
      //   provider,
      // })

    }

    loadProvider();

  }, [])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();

      setAccount(accounts[0]);
    }

    web3Api.web3 && getAccount();

  }, [web3Api.web3])

  // console.log(web3Api.web3)

  return (
    <>
      <div className="card text-center">
        <div className="card-header">Funding</div>
        <div className="card-body">
          <h5 className="card-title">Balance: 20 ETH </h5>
          <p className="card-text">Account : {account ? account : `No Account or Not Connected`}</p>
          {/* <button type="button" className="btn btn-success"
            onClick={async () => {
              // function that connects to metamask account
              const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
              console.log(accounts);
            }}>
            Connect to metamask
          </button> */}
          &nbsp;
          <button type="button" className="btn btn-success ">
            Transfer
          </button>
          &nbsp;
          <button type="button" className="btn btn-primary ">
            Withdraw
          </button>
        </div>
        <div className="card-footer text-muted">Mehul Sarda</div>
      </div>
    </>
  );
}

export default App;
