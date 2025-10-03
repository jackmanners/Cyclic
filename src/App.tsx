import React from 'react';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { TaskCategory } from './types';

const taskCategories: TaskCategory[] = [
  {
    id: 'wearables-api',
    name: 'Wearables API',
    icon: '⌚',
    tasks: [
      {
        id: 'get-participants',
        title: 'Get Participants',
        description: 'Fetch all participants from the wearables API',
        icon: '👥',
        category: 'wearables-api',
        tags: ['GET', 'API', 'Wearables'],
        endpoint: '/participants',
        method: 'GET'
      },
      {
        id: 'get-studies',
        title: 'Get Studies',
        description: 'Fetch all studies',
        icon: '📊',
        category: 'wearables-api',
        tags: ['GET', 'API', 'Studies'],
        endpoint: '/studies',
        method: 'GET'
      },
      {
        id: 'get-devices',
        title: 'Get Devices',
        description: 'Fetch all devices',
        icon: '📱',
        category: 'wearables-api',
        tags: ['GET', 'API', 'Devices'],
        endpoint: '/devices',
        method: 'GET'
      }
    ]
  },
  {
    id: 'general-tools',
    name: 'General Tools',
    icon: '🛠️',
    tasks: [
      {
        id: 'api-test',
        title: 'API Tester',
        description: 'Test any REST API endpoints',
        icon: '🌐',
        category: 'general-tools',
        tags: ['API', 'Testing', 'HTTP']
      },
      {
        id: 'json-format',
        title: 'JSON Formatter',
        description: 'Format and validate JSON data',
        icon: '📝',
        category: 'general-tools',
        tags: ['JSON', 'Format', 'Validate']
      },
      {
        id: 'url-encode',
        title: 'URL Encoder',
        description: 'Encode and decode URLs',
        icon: '🔗',
        category: 'general-tools',
        tags: ['URL', 'Encoding', 'Text']
      },
      {
        id: 'base64',
        title: 'Base64 Tool',
        description: 'Encode and decode Base64 strings',
        icon: '🔐',
        category: 'general-tools',
        tags: ['Base64', 'Encoding', 'Text']
      }
    ]
  }
];

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <main>
          <Dashboard taskCategories={taskCategories} />
        </main>
      </div>
    </div>
  );
}

export default App;