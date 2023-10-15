import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  // Use useEffect to monitor pdfUrl changes
  useEffect(() => {
    // Check if pdfUrl is not empty before using it
    if (pdfUrl) {
      // You can set the PDF source in an iframe or use it in another way
      // This example uses an iframe for PDF display
      const iframe = document.getElementById('pdfViewer');
      iframe.src = pdfUrl;
    }
  }, [pdfUrl]);

  const convertToPdf = async () => {
    try {
      const response = await axios.post('api/convert', { markdown });
      //console.log(response);
      // Create a Blob from the received data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      //console.log(url);
      // Set the URL in the state
      setPdfUrl(url);
      //console.log(pdfUrl);
      console.log(response.headers['content-type']);
    } catch (error) {
      console.error('PDF conversion error:', error);
    }
  };

  return (
    <div>
      <h1>Markdown to PDF Converter</h1>
      <textarea
        rows="10"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <button onClick={convertToPdf}>Convert to PDF</button>
      {/* {pdfUrl && <a href={pdfUrl} download="converted.pdf">Download PDF</a>} */}
      { pdfUrl && (
        <iframe
          id="pdfViewer"
          title="PDF Viewer"
          width="1000px"
          height="500px"
        ></iframe>
      )}
    </div>
  );
}

export default App;
