
import React, { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [video, setVideo] = useState("")

  const videoUpload = async () => {
    const formData = new FormData();
    console.log(selectedFile)
    formData.append(
      "fileName",
      selectedFile,
      selectedFile.name
    );
    setLoading(true)
    const response = await fetch('http://localhost:3001/upload', { method: "POST", body: formData, mode: "cors" });
    const data = await response.json();
    setLoading(false)

    console.log(data);
    const ipfs = await fetch(`https://ipfs.io/${data.data.replace(":", "")}`);
    const nftMetadata = await ipfs.json()
    console.log(nftMetadata);
    setVideo(`https://ipfs.io/${nftMetadata.properties.video.replace(":", "")}`)
    
  }

  return (
    <div>
      {loading ? "Loading..." : <div>
        <video width='320' height='320' controls>
        <source src={video}></source>
        </video>
        </div>
        }
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button onClick={videoUpload}>
        Upload!
      </button>
    </div>
  )
}
