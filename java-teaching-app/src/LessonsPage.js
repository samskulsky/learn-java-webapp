import React from 'react';
import { Link } from 'react-router-dom';

const lessons = [
  { id: 1, title: 'Introduction to Java' },
];

function LessonsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Lessons</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id} className="mb-2">
            <Link to={`/lessons/${lesson.id}`} className="text-blue-500 hover:underline">
              {lesson.id}: {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LessonsPage;
