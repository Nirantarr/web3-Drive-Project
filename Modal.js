import "./Modal.css";
import { useEffect } from "react";

const Modal = ({ setmodalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    console.log(address);
    await contract.allow(address);
  }
  const removeAccess=async()=>{

     }
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;
      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    }
    contract && accessList();
  }, [contract])

  return <>
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">Share</div>
        <div className="body">
          <input type="text" className="address" placeholder="Enter Address" ></input>
        </div>
        <form id="myform" >
          <select id="selectNumber">
            <option className="address" >People with Access</option>
          </select>
        </form>
        <div className="footer">
          <button onClick={() => { setmodalOpen(false) }} id="cancelBtn">Cancel</button>
          <button onClick={() => { sharing() }}> Share</button>
        </div>
        <div className="body">
          <input type="text" className="address" placeholder="Enter Address" ></input>
        </div>
        <div className="footer">
          <button onClick={() => { removeAccess() }}> Remove Access</button>
        </div>
      </div>
    </div>
  </>;
}

export default Modal;