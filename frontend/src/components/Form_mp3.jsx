import React, { useState } from "react";

function Form_mp3() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["audio/mp3", "audio/mpeg", "audio/wav", "audio/ogg"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Invalid file type! Please upload an MP3, WAV, or OGG file.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError("");
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a valid MP3, WAV, or OGG file.");
      return;
    }
 
    const formData = new FormData();
    formData.append("audio_file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/process_audio/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setError("Download your generated PDF below:");
        
        // Create a download link
        const link = document.createElement("a");
        link.href = url;
        link.download = "AI_Medical_Research_Paper.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setError("Error processing file.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error uploading files to backend");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-80 border-2 border-red-400 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Upload MP3 File</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="mp3" className="block text-gray-700 mb-2">
            Choose MP3, WAV, or OGG File
          </label>
          <input
            type="file"
            id="mp3"
            accept=".mp3,.wav,.ogg"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {file && <p className="text-green-600 text-sm mt-2">Selected: {file.name}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition duration-200"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Form_mp3;
