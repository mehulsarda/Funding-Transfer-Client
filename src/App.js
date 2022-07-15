import { useEffect, useState } from "react";
// import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from './utils/load-contract';

function App() {

  const [web3Api, setweb3Api] = useState({
    provider: null,
    web3: null,
    contract: null
  })

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [accbalance, setAccBalance] = useState(null);
  const [reload, shouldReload] = useState(false);

  const reloadEffect = () => {
    shouldReload(!reload);
  }


  useEffect(() => {
    const loadProvider = async () => {

      // 2nd and easy method to connect metamask
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Funder", provider);

      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        setweb3Api({
          web3: new Web3(provider),
          provider,
          contract
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

  useEffect(() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, 'ether'));
    }

    web3Api.contract && loadBalance();

  }, [web3Api, reload])


  const transferFund = async () => {
    const { contract, web3 } = web3Api;
    await contract.transfer({
      from: account,
      value: web3.utils.toWei("1", "ether")
    })
    reloadEffect();
  }

  const withdrawFund = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmount = web3.utils.toWei("1.5", "ether");
    await contract.withdraw(withdrawAmount, {
      from: account
    })
    reloadEffect();
  }


  // console.log(web3Api.web3)

  // home work -----> metamask wallet account balance fetch
  useEffect(() => {
    const getAccBalance = async () => {
      const { web3 } = web3Api;
      const accbalance = await web3.eth.getBalance(account);
      setAccBalance(web3.utils.fromWei(accbalance, 'ether'));
    }

    account && getAccBalance();

  }, [account, web3Api.web3, reload])

  return (
    <>
      <div className="card text-center">
        <div className="card-header">Funding</div>
        <div className="card-body">
          <h5 className="card-title">Contract Balance: {balance} ETH </h5>
          <p className="card-text">Account : {account ? account : `No Account or Not Connected`}</p>
          <h5 className="card-title">Account Balance: {accbalance} ETH </h5>
          {/* <button type="button" className="btn btn-success"
            onClick={async () => {
              // function that connects to metamask account
              const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
              console.log(accounts);
            }}>
            Connect to metamask
          </button> */}
          &nbsp;
          <button type="button" className="btn btn-success" onClick={transferFund}>
            Transfer
          </button>
          &nbsp;
          <button type="button" className="btn btn-primary" onClick={withdrawFund}>
            Withdraw
          </button>
        </div>
        <div className="card-footer text-muted">Mehul Sarda</div>
      </div>
    </>
  );
}

export default App;
