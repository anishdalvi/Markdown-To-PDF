import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [markdown, setMarkdown] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Check if pdfUrl is not empty before using it
    if (pdfUrl) {
      const iframe = document.getElementById('pdfViewer');
      iframe.src = pdfUrl;
    }
  }, [pdfUrl]);

  

  const convertToPdf = async () => {
    try {
      const response = await axios.post('api/convert', { markdown },
        {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'blob'
        });
      //console.log(response);
      // Create a Blob from the received data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      // Create a URL for the Blob
      //console.log(blob);
      const url = URL.createObjectURL(blob);
      
      // Set the URL in the state
      setPdfUrl(url);
      //console.log(url);

    } catch (error) {
      console.error('PDF conversion error:', error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target.result;
        setMarkdown(fileContent);
      };

      reader.readAsText(file);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  

  return (
    <div>
      <div className='header'>
        <h1>Markdown to PDF Converter</h1>
      </div>
      
      <div className='content'>
        <div className='up'>
          <div className='editor'>
            <textarea
              placeholder="Enter your markdown here"
              style={{
                width: '100%',
                height: '100%',
                fontSize: '16px',
                outline: 'none',
                resize: 'none',
}}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>

          <div className='buttons'>
            <button onClick={openFileInput}>Upload Markdown</button>
            <input
              type="file"
              accept=".md"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button onClick={convertToPdf}>Convert to PDF</button>

            {pdfUrl && <a href={pdfUrl} download="converted.pdf"><button>Download PDF</button></a>}
          </div>
        </div>

        <div className='down'>
          <div className='pdfPreview'>
            {pdfUrl && (
              <iframe
                id="pdfViewer"
                title="PDF Viewer"
                style={{ width: '100%', height: '700px' }}

              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
