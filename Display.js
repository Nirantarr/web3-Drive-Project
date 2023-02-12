import { useState } from "react";
import "./Display.css";

const Display = ({ contract, Account }) => {
    const [data, setdata] = useState("");
    const getData = async () => {
        let dataArray;
        const otherAddress = document.querySelector(".address").value;
        if (otherAddress) {
            dataArray = await contract.display(otherAddress);
            console.log(dataArray);
        } else {
            dataArray = await contract.display(Account);
            console.log(dataArray);
        }
        const isEmpty = Object.keys(dataArray).length === 0;
        if (!isEmpty) {
            const str = dataArray.toString();
            // console.log(str);
            const str_array = str.split(",");
            // console.log(str_array);
            const images = str_array.map((item, i) => {
                return (
                    <a href={item} rel="noreferrer"  target="_blank" key={i}>
                        <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} alt="name" className="image-list"></img>
                    </a>
                )
            });
            setdata(images);
        } else {
            alert("No image to Display");
        }
    }
    return <div>
        <div className="image-list">{data}</div>
        <input type="text" placeholder="Enter Address" className="address"></input>
        <button className="center button" onClick={getData}>Get Data</button>
    </div>;
}

export default Display;