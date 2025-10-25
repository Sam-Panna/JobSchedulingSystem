import React, { useContext, useEffect, useState } from 'react';
import { Bell, User, FileText, BarChart3, Calendar, Clock, CheckCircle, AlertCircle, Play, Briefcase } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';


const EmployeeDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  const [totalTasks, setTotalTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [showTasks, setShowTasks] = useState([]);

  const [tasks] =
    useState([
      { id: 1, title: "Redesign Landing Page", description: "Update the main landing page with new branding", status: "Ongoing", priority: "High", time: "09:00", deadline: "2024-01-28" },
      { id: 2, title: "Database Optimization", description: "Improve query performance for user data", status: "Pending", priority: "Medium", time: "11:00", deadline: "2024-01-30" },
      { id: 3, title: "API Documentation", description: "Complete REST API documentation", status: "Completed", priority: "Low", time: "14:00", deadline: "2024-01-25" },
      { id: 4, title: "User Testing", description: "Conduct usability testing for new features", status: "Ongoing", priority: "High", time: "16:00", deadline: "2024-01-29" }
    ]);



    // console.log(showTasks);

    function formatDateTime(dateString) {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long", // e.g., August
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  return date.toLocaleString("en-US", options);
}
    

  const getTaskByEmployee = () => {
    axios.get(`http://localhost:5000/api/employee-tasks/${currentUser?.id}`).then((res) => {
      // console.log(res);
      setShowTasks(res.data.data);
      
      
      setTotalTasks(() => (res.data.data).length);


      const incompleteTask = res.data.data.filter(curEle => {
        return curEle.status === "Pending";
      }
      )
      console.log(incompleteTask);
      setPendingTasks(incompleteTask.length)

      const finishedTask = res.data.data.filter(curEle => {
        return curEle.status === "Completed";
      })
      console.log(finishedTask);
      setCompletedTasks(finishedTask.length);
      
    })
  }
  useEffect(() => {
    getTaskByEmployee();
  }, [])

  const [notifications] = useState([
    { id: 1, message: "New task assigned: Mobile App Review", time: "2 hours ago", type: "assignment" },
    { id: 2, message: "Deadline extended for Database Optimization", time: "4 hours ago", type: "update" },
    { id: 3, message: "Performance review scheduled for next week", time: "1 day ago", type: "reminder" },
    { id: 4, message: "Team meeting at 3 PM today", time: "2 days ago", type: "meeting" }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#4CAF50';
      case 'Ongoing': return '#F4A259';
      case 'Pending': return '#8E3B46';
      default: return '#8E3B46';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#8E3B46';
      case 'Medium': return '#F4A259';
      case 'Low': return '#4CAF50';
      default: return '#F4A259';
    }
  };

  const taskCounts = {
    pending: tasks.filter(task => task.status === 'Pending').length,
    ongoing: tasks.filter(task => task.status === 'Ongoing').length,
    completed: tasks.filter(task => task.status === 'Completed').length
  };

  return (
    <div style={{ backgroundColor: '#2E2E2E', minHeight: '100vh' }} className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#F7E8D0' }}>
          Good Morning, Sam! 👋
        </h1>
        <p className="text-lg opacity-80" style={{ color: '#F7E8D0' }}>
          Here's your daily overview and tasks for {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-3 space-y-6">

          {/* Status Counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl p-6 shadow-lg border-l-4" style={{ backgroundColor: '#F7E8D0', borderLeftColor: '#F4A259' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-70" style={{ color: '#2E2E2E' }}>Total Tasks</p>
                  <p className="text-3xl font-bold" style={{ color: '#2E2E2E' }}>{totalTasks}</p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#F4A259' }}>
                  <Briefcase className="w-6 h-6" style={{ color: '#2E2E2E' }} />
                </div>
              </div>
            </div>

            <div className="rounded-xl p-6 shadow-lg border-l-4" style={{ backgroundColor: '#F7E8D0', borderLeftColor: '#8E3B46' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-70" style={{ color: '#2E2E2E' }}>Pending Tasks</p>
                  <p className="text-3xl font-bold" style={{ color: '#2E2E2E' }}>{pendingTasks}</p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#8E3B46' }}>
                  <AlertCircle className="w-6 h-6" style={{ color: '#F7E8D0' }} />
                </div>
              </div>
            </div>



            <div className="rounded-xl p-6 shadow-lg border-l-4" style={{ backgroundColor: '#F7E8D0', borderLeftColor: '#4CAF50' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-70" style={{ color: '#2E2E2E' }}>Completed Tasks</p>
                  <p className="text-3xl font-bold" style={{ color: '#2E2E2E' }}>{completedTasks}</p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: '#4CAF50' }}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Tasks Overview */}
          <div className="rounded-xl p-6 shadow-lg" style={{ backgroundColor: '#F7E8D0' }}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#2E2E2E' }}>
              <FileText className="w-5 h-5" />
              Assigned Tasks Overview
            </h2>
            <div className="grid gap-4">
              {showTasks.map(task => (
                <div key={task.id} className="p-4 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200"
                  style={{ backgroundColor: '#ffffff', borderColor: '#8E3B46' }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg" style={{ color: '#2E2E2E' }}>{task.title}</h3>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: getStatusColor(task.status) }}>
                        {task.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm opacity-70 mb-2" style={{ color: '#2E2E2E' }}>{task.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span style={{ color: '#8E3B46' }}>📅 Due: {formatDateTime(task.deadline)}</span>
                    <span style={{ color: '#8E3B46' }}>⏰ Scheduled: {formatDateTime(task.updated_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Task Timeline */}
          <div className="rounded-xl p-6 shadow-lg" style={{ backgroundColor: '#F7E8D0' }}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#2E2E2E' }}>
              <Clock className="w-5 h-5" />
              Today's Task Timeline
            </h2>
            <div className="space-y-4">
              {tasks.filter(task => task.status !== 'Completed').map((task, index) => (
                <div key={task.id} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getPriorityColor(task.priority) }}></div>
                    {index < tasks.filter(t => t.status !== 'Completed').length - 1 && (
                      <div className="w-0.5 h-12 mt-2" style={{ backgroundColor: '#8E3B46' }}></div>
                    )}
                  </div>
                  <div className="flex-1 p-3 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold" style={{ color: '#2E2E2E' }}>{task.title}</h4>
                        <p className="text-sm opacity-70" style={{ color: '#2E2E2E' }}>Scheduled at {task.time}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded"
                        style={{ backgroundColor: getPriorityColor(task.priority), color: 'white' }}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="rounded-xl p-6 shadow-lg" style={{ backgroundColor: '#F7E8D0' }}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#2E2E2E' }}>
              <BarChart3 className="w-5 h-5" />
              Performance Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                <p className="text-2xl font-bold" style={{ color: '#8E3B46' }}>85%</p>
                <p className="text-sm opacity-70" style={{ color: '#2E2E2E' }}>Completion Rate</p>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                <p className="text-2xl font-bold" style={{ color: '#F4A259' }}>12</p>
                <p className="text-sm opacity-70" style={{ color: '#2E2E2E' }}>Tasks This Week</p>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                <p className="text-2xl font-bold" style={{ color: '#4CAF50' }}>4.8</p>
                <p className="text-sm opacity-70" style={{ color: '#2E2E2E' }}>Avg Rating</p>
              </div>
            </div>
          </div>

          {/* Shortcuts */}
          <div className="rounded-xl p-6 shadow-lg" style={{ backgroundColor: '#F7E8D0' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#2E2E2E' }}>Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                style={{ backgroundColor: '#8E3B46', color: '#F7E8D0' }}>
                <User className="w-5 h-5" />
                <span className="font-medium">My Profile</span>
              </button>
              <button className="flex items-center gap-3 p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                style={{ backgroundColor: '#F4A259', color: '#2E2E2E' }}>
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Apply Leave</span>
              </button>
              <button className="flex items-center gap-3 p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
                style={{ backgroundColor: '#2E2E2E', color: '#F7E8D0' }}>
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">View Workload</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Feed - Right Side */}
        <div className="lg:col-span-1">
          <div className="rounded-xl p-6 shadow-lg sticky top-6" style={{ backgroundColor: '#F7E8D0' }}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#2E2E2E' }}>
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <div className="space-y-3">
              {notifications.map(notification => (
                <div key={notification.id} className="p-3 rounded-lg border-l-4 hover:shadow-sm transition-all duration-200"
                  style={{ backgroundColor: '#ffffff', borderLeftColor: '#8E3B46' }}>
                  <p className="text-sm font-medium mb-1" style={{ color: '#2E2E2E' }}>
                    {notification.message}
                  </p>
                  <p className="text-xs opacity-60" style={{ color: '#2E2E2E' }}>
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#8E3B46', color: '#F7E8D0' }}>
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;