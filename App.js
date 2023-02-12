// npx hardhat run --network  localhost scripts/deploy.js -To deploy on hardhat network
// npx hardhat node -To get Accounts provided by hardhat.

import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Drive from "./artifacts/contracts/Drive.sol/Drive.json";
import Modal from "./components/Modal";
import Display from "./components/Display";
import Fileupload from "./components/Fileupload";
import './App.css';

function App() {
  const [Account, setAccount] = useState("");
  const [contract, setcontract] = useState(null);
  // const [Prrovider, setPrrovider] = useState(null);
  const [modalOpen, setmodalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => { //This will reload the window automatically when account is changed in metamask. Metamask provides us this feature.
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x320A7D18A606E463A4b11b4CCf1514674d3584D2"; //contract address is generated when contract is deployed on network. I have used goerli testnetwork to deploy it.
        const Contract = new ethers.Contract(contractAddress, Drive.abi, signer);
        console.log(Contract);
        setcontract(Contract);
        // setPrrovider(provider);
      } else {
        alert("Metamask is not connected");
      }
    }
    provider && loadProvider();
  }, [])

  return (<>
    {!modalOpen && (
      <button className="share" onClick={() => setmodalOpen(true)}>Share</button>
    )}
    {modalOpen && <Modal setmodalOpen={setmodalOpen} contract={contract}  ></Modal>}
    <div className="App">

      <div className="Heading">
        <h1 style={{ color: "white" }}>Web3-Drive 3.0</h1>
      </div>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>

      <p style={{ color: "white" }}>
        Account : {Account ? Account : "Not connected"}
      </p>
      <div >
        <Fileupload contract={contract} Account={Account}></Fileupload>
      </div>
      <div>
        <Display contract={contract} Account={Account}></Display>
      </div>
    </div></>
  );
}

export default App;
