import React from 'react';
import './App.css';
import Header from './components/Header';
import TaskGrid from './components/TaskGrid';
import { Task } from './types';

const tasks: Task[] = [
  {
    id: 'api-test',
    title: 'API Tester',
    description: 'Test REST API endpoints',
    icon: '🌐'
  },
  {
    id: 'json-format',
    title: 'JSON Formatter',
    description: 'Format and validate JSON',
    icon: '📝'
  },
  {
    id: 'url-encode',
    title: 'URL Encoder',
    description: 'Encode/decode URLs',
    icon: '🔗'
  },
  {
    id: 'base64',
    title: 'Base64 Tool',
    description: 'Encode/decode Base64',
    icon: '🔐'
  }
];

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <main>
          <TaskGrid tasks={tasks} />
        </main>
      </div>
    </div>
  );
}

export default App;