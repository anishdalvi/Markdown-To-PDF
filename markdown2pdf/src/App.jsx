import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const convertToPdf = async () => {
    try {
      const response = await axios.post('api/convert', { markdown });
      //console.log(response);
      // Create a Blob from the received data
      const blob = new Blob([response.data], { type: 'application/octetstream' });
      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);
      //console.log(url);
      // Set the URL in the state
      setPdfUrl(url);
      //console.log(pdfUrl);
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
      {pdfUrl && <a href={pdfUrl} download="converted.pdf">Download PDF</a>}
    </div>
  );
}

export default App;
