import React, { useState } from 'react';

// SVG for the logo placeholder
const Logo = () => (
  <svg height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Main Application Component
export default function App() {
  // State management for the application flow
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [uiState, setUiState] = useState('initial'); // 'initial', 'processing', 'complete'
  const [csvData, setCsvData] = useState('');

  // Handles file selection from the input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFile(null);
      setError('');
      return;
    }

    // Validate file type
    if (selectedFile.type !== 'application/json') {
      setError('Invalid file type. Please upload a .json file.');
      setFile(null);
      return;
    }

    // Validate file size (max 500KB)
    if (selectedFile.size > 500 * 1024) {
      setError('File is too large. Maximum size is 500KB.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  // Handles the "Convert" button click
  const handleConvert = async () => {
    if (!file) {
      setError('Please select a file to convert.');
      return;
    }

    setUiState('processing');
    setError('');

    // --- Backend Simulation ---
    // In a real application, you would send the 'file' to your Python backend here.
    // For this scaffold, we'll simulate the process with a delay.
    console.log("Simulating backend processing for:", file.name);

    setTimeout(() => {
      // Simulate receiving CSV data from the backend
      const dummyCsvContent = "id,name,value\n1,itemA,100\n2,itemB,200\n3,itemC,300";
      setCsvData(dummyCsvContent);
      setUiState('complete');
      console.log("Processing complete. CSV data generated.");
    }, 3000); // 3-second delay to simulate processing
  };

  // Handles downloading the generated CSV file
  const handleDownload = () => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    const originalFileName = file.name.replace(/\.json$/i, '');
    link.setAttribute('download', `${originalFileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Resets the application to its initial state
  const handleStartOver = () => {
      setFile(null);
      setError('');
      setUiState('initial');
      setCsvData('');
  };

  // Renders the UI based on the current state
  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300">
          
          {/* Initial State: File Upload Form */}
          {uiState === 'initial' && (
            <div className="space-y-6">
              <div className="flex items-center justify-center flex-col text-center">
                <Logo />
                <h1 className="text-2xl font-bold text-slate-800 mt-2">JSON to CSV Converter</h1>
                <p className="text-slate-500 mt-1">Upload your .json file to convert it into a downloadable CSV.</p>
              </div>

              <div>
                <label htmlFor="file-upload" className="block text-sm font-medium text-slate-700 mb-2">JSON File</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-8 w-8 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-slate-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".json,application/json" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">JSON up to 500KB</p>
                  </div>
                </div>
              </div>

              {file && <p className="text-sm text-center text-slate-600">Selected: <span className="font-medium">{file.name}</span></p>}
              {error && <p className="text-sm text-center text-red-600">{error}</p>}

              <button
                onClick={handleConvert}
                disabled={!file}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
              >
                Convert
              </button>
            </div>
          )}

          {/* Processing State: Loading Animation */}
          {uiState === 'processing' && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
              <h2 className="mt-6 text-xl font-semibold text-slate-700">Processing...</h2>
              <p className="text-slate-500 mt-2">Your file is being converted. Please wait.</p>
            </div>
          )}

          {/* Complete State: Download and Analyze */}
          {uiState === 'complete' && (
            <div className="text-center py-8">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h2 className="mt-4 text-2xl font-bold text-slate-800">Conversion Complete!</h2>
              <p className="text-slate-500 mt-2">Your CSV file is ready for download.</p>
              <div className="mt-8 space-y-4">
                <button
                  onClick={handleDownload}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Download CSV
                </button>
                <button
                  onClick={() => alert("Analysis feature coming soon!")}
                  className="w-full flex justify-center py-3 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Analyze Results
                </button>
                 <button
                  onClick={handleStartOver}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 mt-4"
                >
                  Convert another file?
                </button>
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-slate-400 text-xs mt-4">Powered by Vite + React</p>
      </div>
    </div>
  );
}