import React, { useState } from 'react';
import { Task } from '../types';
import TaskCard from './TaskCard';
import ApiTester from './tools/ApiTester';
import JsonFormatter from './tools/JsonFormatter';
import UrlEncoder from './tools/UrlEncoder';
import Base64Tool from './tools/Base64Tool';

interface TaskGridProps {
  tasks: Task[];
}

const TaskGrid: React.FC<TaskGridProps> = ({ tasks }) => {
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const handleTaskClick = (taskId: string) => {
    setActiveTask(taskId);
  };

  const handleCloseTask = () => {
    setActiveTask(null);
  };

  const renderTaskPanel = () => {
    switch (activeTask) {
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
    <>
      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => handleTaskClick(task.id)}
          />
        ))}
      </div>
      {activeTask && renderTaskPanel()}
    </>
  );
};

export default TaskGrid;