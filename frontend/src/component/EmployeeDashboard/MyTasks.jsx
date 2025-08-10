import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Calendar, Flag, Clock, CheckCircle2, AlertCircle, Circle } from 'lucide-react';
import axios from 'axios';

const MyTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks]  = useState([]);
  // Sample task data
  const atasks = [
    {
      id: 1,
      title: "Complete Project Documentation",
      description: "Create comprehensive documentation for the new client management system including user guides, technical specifications, and API documentation.",
      priority: "High",
      deadline: "2024-08-15",
      status: "In Progress",
      assignedDate: "2024-08-01"
    },
    {
      id: 2,
      title: "Database Migration",
      description: "Migrate legacy customer data to the new database schema. Ensure data integrity and minimal downtime during the transition process.",
      priority: "Critical",
      deadline: "2024-08-12",
      status: "Pending",
      assignedDate: "2024-07-28"
    },
    {
      id: 3,
      title: "UI/UX Review",
      description: "Conduct thorough review of the new dashboard interface focusing on user experience improvements and accessibility standards.",
      priority: "Medium",
      deadline: "2024-08-20",
      status: "Completed",
      assignedDate: "2024-07-25"
    },
    {
      id: 4,
      title: "Security Audit",
      description: "Perform comprehensive security audit of the application including penetration testing and vulnerability assessment.",
      priority: "High",
      deadline: "2024-08-18",
      status: "In Progress",
      assignedDate: "2024-08-03"
    },
    {
      id: 5,
      title: "Client Training Session",
      description: "Prepare and conduct training session for client team on new system features and best practices for optimal usage.",
      priority: "Low",
      deadline: "2024-08-25",
      status: "Pending",
      assignedDate: "2024-08-05"
    },
    {
      id: 6,
      title: "Performance Optimization",
      description: "Analyze and optimize application performance, focusing on database queries and frontend loading times.",
      priority: "Medium",
      deadline: "2024-08-22",
      status: "In Progress",
      assignedDate: "2024-08-02"
    }
  ];

  const getTasks =async()=>{
   await axios.get(`http://localhost:5000/api/employee-tasks/${7}`).then((res)=>{
        console.log(res);
        setTasks(res.data.data);
        
   }).catch((err)=>{
     console.log(err);
     
   })


  }
  console.log(tasks);
  
  useEffect(()=>{
    getTasks()
  },[])

  // Filter tasks based on search term
  const filteredTasks = useMemo(() => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-red-100';
      case 'high': return 'bg-red-50';
      case 'medium': return 'bg-yellow-50';
      case 'low': return 'bg-green-50';
      default: return 'bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in progress': return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'pending': return <Circle className="w-5 h-5 text-gray-500" />;
      default: return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2E2E2E' }}>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#F7E8D0' }}>
            Task Dashboard
          </h1>
          <p className="text-gray-400">Manage and track your assigned tasks</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-600 focus:border-opacity-50 transition-all duration-200 text-gray-800 placeholder-gray-500"
              style={{ 
                backgroundColor: '#F7E8D0',
                borderColor: '#8E3B46'
              }}
            />
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => openModal(task)}
              className="cursor-pointer rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 p-6"
              style={{ backgroundColor: '#F7E8D0' }}
            >
              {/* Task Header */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                  {task.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {task.description}
                </p>
              </div>

              {/* Priority Badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPriorityBg(task.priority)} ${getPriorityColor(task.priority)}`}>
                  <Flag className="w-3 h-3 mr-1" />
                  {task.priority}
                </span>
              </div>

              {/* Deadline */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className={isOverdue(task.deadline) ? 'text-red-600 font-medium' : ''}>
                    {formatDate(task.deadline)}
                  </span>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(task.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No tasks found matching your search.</div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            className="rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            style={{ backgroundColor: '#F7E8D0' }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 pr-4">
                {selectedTask.title}
              </h2>
              <button
                onClick={closeModal}
                className="flex-shrink-0 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedTask.description}
                </p>
              </div>

              {/* Task Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Priority */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Priority</h3>
                  <span className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${getPriorityBg(selectedTask.priority)} ${getPriorityColor(selectedTask.priority)}`}>
                    <Flag className="w-4 h-4 mr-2" />
                    {selectedTask.priority}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Status</h3>
                  <div className="flex items-center">
                    {getStatusIcon(selectedTask.status)}
                    <span className="ml-2 text-gray-700">{selectedTask.status}</span>
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Deadline</h3>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                    <span className={`${isOverdue(selectedTask.deadline) ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                      {formatDate(selectedTask.deadline)}
                      {isOverdue(selectedTask.deadline) && ' (Overdue)'}
                    </span>
                  </div>
                </div>

                {/* Assigned Date */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Assigned Date</h3>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="text-gray-700">{formatDate(selectedTask.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-lg font-medium transition-colors duration-200 text-white hover:opacity-90"
                style={{ backgroundColor: '#8E3B46' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;