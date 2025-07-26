import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import { Link } from 'react-router-dom';

const ManageTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return '#8E3B46'; // Primary color for high priority
      case 'medium':
        return '#F4A259'; // Optional color 2 for medium priority
      case 'low':
        return 'green'; // Secondary color for low priority
      default:
        return '#F7E8D0';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return '#4f46e5'; // Optional color 2 for completed
      case 'ongoing':
        return '#334155'; // Primary color for in progress
      case 'pending':
        return '#e879f9'; // Secondary color for pending
      default:
        return '#F7E8D0';
    }
  };

  return (
    <div 
      className="relative p-6 min-h-screen"
      style={{ backgroundColor: '#2E2E2E' }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 
          className="text-3xl font-bold"
          style={{ color: '#F7E8D0' }}
        >
          Task Management
        </h1>
        
        {/* Add Task Button */}
       <Link to="/dashboard/task-form">
        <button
          className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg"
          style={{ 
            backgroundColor: '#8E3B46', 
            color: '#fff' 
          }}
         
        >
          + Add Task
        </button>
       </Link>
      </div>

      {/* Tasks Display */}
      <div className="grid gap-6">
        {tasks.length === 0 ? (
          <div 
            className="text-center py-12 rounded-lg"
            style={{ 
              backgroundColor: '#F7E8D0',
              color: '#2E2E2E'
            }}
          >
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm opacity-70">Click "Add Task" to create your first task</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div 
              key={task.id} 
              className="rounded-lg shadow-lg p-6 transition-all duration-200 hover:shadow-xl border-l-4"
              style={{ 
                backgroundColor: '#F7E8D0',
                borderLeftColor: getPriorityColor(task.priority)
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 
                  className="text-xl font-bold"
                  style={{ color: '#2E2E2E' }}
                >
                  {task.title}
                </h3>
                <div className="flex gap-2">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: getPriorityColor(task.priority),
                      color: task.priority?.toLowerCase() === 'low' ? '#ffffff' : '#F7E8D0'
                    }}
                  >
                    {task.priority || 'No Priority'}
                  </span>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: getStatusColor(task.status),
                      color: task.status?.toLowerCase() === 'pending' ? '#2E2E2E' : '#F7E8D0'
                    }}
                  >
                    {task.status || 'No Status'}
                  </span>
                </div>
              </div>
              
              <p 
                className="text-base mb-4 leading-relaxed"
                style={{ color: '#2E2E2E' }}
              >
                {task.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                  className="flex items-center gap-2"
                  style={{ color: '#2E2E2E' }}
                >
                  <span className="font-semibold">📅 Deadline:</span>
                  <span>{task.deadline || 'Not set'}</span>
                </div>
                <div 
                  className="flex items-center gap-2"
                  style={{ color: '#2E2E2E' }}
                >
                  <span className="font-semibold">👤 Assigned to:</span>
                  <span className="font-medium" style={{ color: '#8E3B46' }}>
                    {task.employeeName || 'Unassigned'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Overlay Form */}
    
    </div>
  );
};

export default ManageTask;