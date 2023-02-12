import { useState } from "react";
import "./Fileupload.css";
// we have imported axios here as it helps us to connect with pinata. npm install axios
import axios from "axios";

const Fileupload = ({ contract, Account }) => {
    const [file, setfile] = useState(null);
    const [fileName, setfileName] = useState("No file Selected");
    const handleSubmit = async (e) => {
        e.preventDefault(); //we use .preventDefault so that page should not get reloaded after file uploaded to pinata.
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: 'bcf2d533e53faf332622',
                        pinata_secret_api_key: '3307fe365eae332928cb3893924467b5b896c02e7e735de04d92b8099646143e',
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                contract.add(Account, ImgHash);
                alert("File successfully uploaded");
                setfileName("No file Selected");
                setfile(null);
            } catch (e) {
                alert("Unable to upload image");
            }
        }

    }
    const retrieveFile = (e) => {
        const data = e.target.files[0];        //.target.files[index] is array of files object.
        console.log(data);
        const reader = new window.FileReader();// FileReader() reads file
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {             //onloadeend function works when file is completely readed
            setfile(e.target.files[0]);
        }
        setfileName(e.target.files[0].name);
        e.preventDefault();
    }
    return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
                Choose Image
            </label>
            <input
                disabled={!Account} type="file" id="file-upload" name="data" onChange={retrieveFile} />
            <span className="textArea"> Img: {fileName}</span>
            <button type="submit" className="upload" disabled={!file}>Upload</button>

        </form>
    </div>
}

export default Fileupload;