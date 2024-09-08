import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [javaCode, setJavaCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/submissions/run', javaCode,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        });
      setOutput(response.data);
      setError('');
    } catch (err) {
      setOutput('');
      setError('Error: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <h1 className="text-2xl font-bold mb-4">Submit Your Java Program</h1>

        <textarea
          className="w-full h-64 p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={javaCode}
          onChange={(e) => setJavaCode(e.target.value)}
          placeholder="Enter your Java code here..."
        />

        <button
          onClick={handleSubmit}
          className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition-colors"
        >
          Run Code
        </button>

        {output && (
          <div className="mt-8 bg-green-100 text-green-800 p-4 rounded">
            <h3 className="font-bold">Output:</h3>
            <pre>{output}</pre>
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-100 text-red-800 p-4 rounded">
            <h3 className="font-bold">Error:</h3>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
