import React, { useState } from 'react';
import axios from 'axios';
import SyntaxHighlighter from 'react-syntax-highlighter';

function App() {
  const [javaCode, setJavaCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/submissions/run',
        javaCode,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );
      setOutput(response.data);
      setError('');
    } catch (err) {
      setOutput('');
      setError('Error: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="container">
        <h1 className="text-2xl font-bold mb-6">Submit Your Java Program</h1>

        <SyntaxHighlighter language='java'>
          {javaCode}
          </SyntaxHighlighter>

        <button onClick={handleSubmit} className="btn">
          Run Code
        </button>

        {output && (
          <div className="output-message">
            <h3 className="font-bold">Output:</h3>
            <pre>{output}</pre>
          </div>
        )}

        {error && (
          <div className="error-message">
            <h3 className="font-bold">Error:</h3>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
