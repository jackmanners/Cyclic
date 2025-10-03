import React from 'react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <button className="task-card" onClick={onClick}>
      <div className="task-icon">{task.icon}</div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </button>
  );
};

export default TaskCard;