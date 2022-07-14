import { useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {

  useEffect(() => {
    const loadProvider = async () => {
      console.log(window.web3);
      console.log(window.ethereum);
    }

    loadProvider();

  }, [])

  return (
    <>
      <div className="card text-center">
        <div className="card-header">Funding</div>
        <div className="card-body">
          <h5 className="card-title">Balance: 20 ETH </h5>
          <p className="card-text">Account : 0x000000000</p>
          <button type="button" className="btn btn-success">
            Connect to metamask
          </button>
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
