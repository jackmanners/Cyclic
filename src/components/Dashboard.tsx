import React, { useState } from 'react';
import { TaskCategory, Task } from '../types';
import ApiTester from './tools/ApiTester';
import JsonFormatter from './tools/JsonFormatter';
import UrlEncoder from './tools/UrlEncoder';
import Base64Tool from './tools/Base64Tool';
import WearablesApiTester from './tools/WearablesApiTester';

interface DashboardProps {
  taskCategories: TaskCategory[];
}

const Dashboard: React.FC<DashboardProps> = ({ taskCategories }) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleTaskClick = (task: Task) => {
    setActiveTask(task);
  };

  const handleCloseTask = () => {
    setActiveTask(null);
  };

  const filterTasks = (tasks: Task[]) => {
    if (!searchTerm) return tasks;
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const renderTaskPanel = () => {
    if (!activeTask) return null;

    switch (activeTask.id) {
      case 'get-participants':
      case 'get-studies':
      case 'get-devices':
        return <WearablesApiTester task={activeTask} onClose={handleCloseTask} />;
      case 'api-test':
        return <ApiTester onClose={handleCloseTask} />;
      case 'json-format':
        return <JsonFormatter onClose={handleCloseTask} />;
      case 'url-encode':
        return <UrlEncoder onClose={handleCloseTask} />;
      case 'base64':
        return <Base64Tool onClose={handleCloseTask} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <input
          type="text"
          className="search-bar"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {taskCategories.map(category => {
          const filteredTasks = filterTasks(category.tasks);
          if (filteredTasks.length === 0) return null;
          
          return (
            <div key={category.id} className="category-section">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <span>{category.name}</span>
              </div>
              <ul className="task-list">
                {filteredTasks.map(task => (
                  <li
                    key={task.id}
                    className={`task-item ${
                      activeTask?.id === task.id ? 'active' : ''
                    }`}
                    onClick={() => handleTaskClick(task)}
                  >
                    <span className="task-item-icon">{task.icon}</span>
                    <div className="task-item-content">
                      <div className="task-item-title">{task.title}</div>
                      <div className="task-item-desc">{task.description}</div>
                      <div className="task-tags">
                        {task.tags.map(tag => (
                          <span key={tag} className="task-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      
      <div className="main-content">
        {activeTask ? (
          renderTaskPanel()
        ) : (
          <div className="welcome-screen">
            <h2>🔄 Welcome to Cyclic</h2>
            <p>Select a task from the sidebar to get started with your work tools.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;