import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const lessonsContent = {
  1: { title: 'Introduction to Java', code: 'public class MyClass {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, Java!");\n\t}\n}' },
  2: { title: 'Variables and Data Types', code: 'public class MyClass {\n\tpublic static void main(String[] args) {\n\t\tint x = 5;\n\t\tSystem.out.println(x);\n\t}\n}' },
  3: { title: 'Control Flow', code: 'public class MyClass {\n\tpublic static void main(String[] args) {\n\t\tif (true) {\n\t\t\tSystem.out.println("Control flow example");\n\t\t}\n\t}\n}' },
  4: { title: 'Object-Oriented Programming', code: 'public class MyClass {\n\tpublic static void main(String[] args) {\n\t\tDog myDog = new Dog("Buddy");\n\t\tmyDog.bark();\n\t}\n}' },
};

function LessonPage() {
  const { lessonId } = useParams();
  const lesson = lessonsContent[lessonId];

  const [javaCode, setJavaCode] = useState(lesson.code || '');
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
        {/* Lesson Title */}
        <h1 className="text-3xl font-bold text-center mb-6">{lesson.title}</h1>

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

export default LessonPage;
