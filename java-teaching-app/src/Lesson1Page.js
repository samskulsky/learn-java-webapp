import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

// Markdown content for lesson 1
const markdownContent = `
# Introduction to Java

Java is a popular programming language, created in 1995. It is owned by Oracle, and more than 3 billion devices run Java. Java is used for:

- Mobile applications (especially Android apps)
- Web applications
- Desktop applications
- Games
- Database connection

## Your First Program

In Java, every application begins with a class definition. In this lesson, you will create a simple Java program that prints "Hello, Java!" to the console.

Below is the starting code. Click "Run Code" to execute it.
`;

function Lesson1Page() {
  const [javaCode, setJavaCode] = useState(`public class MyClass {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`);
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

  const handleEditorChange = (value) => {
    setJavaCode(value);
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8">
        {/* Markdown Lesson Content */}
        <div className="markdown-content bg-white shadow-md rounded-lg p-6 mb-6">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>

        {/* Code Editor */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <Editor
            defaultLanguage="java"
            value={javaCode}
            height="50vh"
            onChange={handleEditorChange}
            options={{
              fontSize: 12,
              minimap: { enabled: false },
            }}
            className="w-full"
          />
        </div>

        {/* Run Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Run Code
          </button>
        </div>

        {/* Output/Error Section */}
        {output && (
          <div className="bg-green-100 text-green-800 rounded-lg p-4 shadow-md mb-6">
            <h3 className="font-semibold mb-2">Output:</h3>
            <pre>{output}</pre>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 rounded-lg p-4 shadow-md">
            <h3 className="font-semibold mb-2">Error:</h3>
            <pre>{error}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lesson1Page;
