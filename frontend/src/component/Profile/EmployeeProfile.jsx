import React, { useState } from 'react'; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { User, ClipboardList, Activity, CalendarCheck, Settings } from 'lucide-react';

const dummyTasks = [
  { id: 1, title: 'Task A', status: 'Completed', date: '2025-07-01' },
  { id: 2, title: 'Task B', status: 'Pending', date: '2025-07-10' },
  { id: 3, title: 'Task C', status: 'Completed', date: '2025-07-15' },
];

const workloadData = [
  { name: 'Week 1', tasks: 2 },
  { name: 'Week 2', tasks: 3 },
  { name: 'Week 3', tasks: 1 },
  { name: 'Week 4', tasks: 4 },
];

const leaveStatus = [
  { id: 1, type: 'Sick Leave', date: '2025-06-10', status: 'Approved' },
  { id: 2, type: 'Casual Leave', date: '2025-07-05', status: 'Pending' },
];

const EmployeeProfile = () => {
  const [selectedMenu, setSelectedMenu] = useState('Personal Info');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Personal Info':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Full Name" value="Sampanna Tamang" />
            <InfoCard label="Phone Number" value="+977 9800000000" />
            <InfoCard label="Email Address" value="sampanna@example.com" />
            <InfoCard label="Department" value="Engineering" />
            <InfoCard label="Role" value="Frontend Developer" />
            <InfoCard label="Last Login" value="Today, 2:30 PM" />
          </div>
        );
      case 'My Tasks':
        return (
          <ul className="space-y-3">
            {dummyTasks.map(task => (
              <li key={task.id} className="border p-4 rounded-lg" style={{ backgroundColor: '#2E2E2E', borderColor: '#8E3B46' }}>
                <p className="text-gray-200 mb-1"><span className="font-medium" style={{ color: '#F4A259' }}>Title:</span> {task.title}</p>
                <p className="text-gray-200 mb-1"><span className="font-medium" style={{ color: '#F4A259' }}>Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${task.status === 'Completed' ? 'bg-green-600 text-white' : 'text-white'}`}
                        style={task.status !== 'Completed' ? { backgroundColor: '#F4A259' } : {}}>
                    {task.status}
                  </span>
                </p>
                <p className="text-gray-200"><span className="font-medium" style={{ color: '#F4A259' }}>Date:</span> {task.date}</p>
              </li>
            ))}
          </ul>
        );
      case 'Workload Chart':
        return (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#F7E8D0" 
                  tick={{ fill: '#F7E8D0' }}
                  axisLine={{ stroke: '#8E3B46' }}
                />
                <YAxis 
                  stroke="#F7E8D0" 
                  tick={{ fill: '#F7E8D0' }}
                  axisLine={{ stroke: '#8E3B46' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#2E2E2E',
                    border: '1px solid #8E3B46',
                    borderRadius: '8px',
                    color: '#F7E8D0'
                  }}
                />
                <Bar 
                  dataKey="tasks" 
                  fill="#8E3B46" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'Leave Status':
        return (
          <ul className="space-y-3">
            {leaveStatus.map(leave => (
              <li key={leave.id} className="border p-4 rounded-lg" style={{ backgroundColor: '#2E2E2E', borderColor: '#8E3B46' }}>
                <p className="text-gray-200 mb-1"><span className="font-medium" style={{ color: '#F4A259' }}>Type:</span> {leave.type}</p>
                <p className="text-gray-200 mb-1"><span className="font-medium" style={{ color: '#F4A259' }}>Date:</span> {leave.date}</p>
                <p className="text-gray-200"><span className="font-medium" style={{ color: '#F4A259' }}>Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${leave.status === 'Approved' ? 'bg-green-600 text-white' : 'text-white'}`}
                        style={leave.status !== 'Approved' ? { backgroundColor: '#F4A259' } : {}}>
                    {leave.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        );
      case 'Settings':
        return (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-200 font-medium">Change Email</label>
              <input 
                className="w-full text-gray-200 p-3 rounded-lg focus:outline-none border-2 focus:border-opacity-100 transition-all duration-200" 
                style={{ 
                  backgroundColor: '#2E2E2E', 
                  borderColor: '#8E3B46',
                  focusBorderColor: '#F4A259'
                }}
                onFocus={(e) => e.target.style.borderColor = '#F4A259'}
                onBlur={(e) => e.target.style.borderColor = '#8E3B46'}
                type="email" 
                placeholder="New Email" 
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-200 font-medium">Change Password</label>
              <input 
                className="w-full text-gray-200 p-3 rounded-lg focus:outline-none border-2 focus:border-opacity-100 transition-all duration-200" 
                style={{ 
                  backgroundColor: '#2E2E2E', 
                  borderColor: '#8E3B46',
                  focusBorderColor: '#F4A259'
                }}
                onFocus={(e) => e.target.style.borderColor = '#F4A259'}
                onBlur={(e) => e.target.style.borderColor = '#8E3B46'}
                type="password" 
                placeholder="New Password" 
              />
            </div>
            <button 
              className="w-full text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#F4A259' }}
            >
              Update Information
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const menuItems = [
    { name: 'Personal Info', icon: <User className="w-4 h-4" /> },
    { name: 'My Tasks', icon: <ClipboardList className="w-4 h-4" /> },
    { name: 'Workload Chart', icon: <Activity className="w-4 h-4" /> },
    { name: 'Leave Status', icon: <CalendarCheck className="w-4 h-4" /> },
    { name: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2E2E2E' }}>
      {/* Header Profile Section */}
      <div className="relative">
        {/* Background Header */}
        <div className="h-48" style={{ backgroundColor: '#8E3B46' }}></div>
        
        {/* Profile Card - Overlapping */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
          <div className="rounded-2xl shadow-2xl" style={{ backgroundColor: '#2E2E2E', border: '1px solid #8E3B46' }}>
            <div className="p-8 text-center">
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center -mt-16 border-4 shadow-lg" 
                   style={{ backgroundColor: '#F7E8D0', borderColor: '#8E3B46' }}>
                <User className="w-12 h-12" style={{ color: '#8E3B46' }} />
              </div>
              
              {/* Name and Role */}
              <h1 className="text-3xl font-bold text-white mb-2">Sampanna Tamang</h1>
              <p className="text-lg mb-6" style={{ color: '#F7E8D0' }}>Frontend Developer</p>
              
              {/* Status and Stats */}
              <div className="flex justify-center items-center gap-12 text-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm" style={{ color: '#F7E8D0' }}>Active Now</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">156</div>
                  <div className="text-sm" style={{ color: '#F7E8D0' }}>Tasks Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">2.5yr</div>
                  <div className="text-sm" style={{ color: '#F7E8D0' }}>Experience</div>
                </div>
              </div>
            </div>
            
            {/* Navigation Tabs - Inside the card */}
            <div className="border-t" style={{ borderColor: '#8E3B46' }}>
              <div className="flex justify-center">
                {menuItems.map(item => (
                  <button
                    key={item.name}
                    onClick={() => setSelectedMenu(item.name)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                      selectedMenu === item.name
                        ? 'text-white border-b-3'
                        : 'hover:text-white'
                    }`}
                    style={{
                      backgroundColor: selectedMenu === item.name ? '#8E3B46' : 'transparent',
                      borderBottomColor: selectedMenu === item.name ? '#F4A259' : 'transparent',
                      borderBottomWidth: selectedMenu === item.name ? '3px' : '0',
                      color: selectedMenu === item.name ? 'white' : '#F7E8D0'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedMenu !== item.name) {
                        e.target.style.backgroundColor = '#8E3B46';
                        e.target.style.opacity = '0.7';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedMenu !== item.name) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.opacity = '1';
                      }
                    }}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - With proper spacing */}
      <div className="pt-48 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-lg border mt-8" style={{ backgroundColor: '#2E2E2E', borderColor: '#8E3B46' }}>
            {/* Content Header */}
            <div className="border-b px-6 py-4" style={{ borderColor: '#8E3B46' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: '#8E3B46' }}>
                  {menuItems.find(item => item.name === selectedMenu)?.icon}
                </div>
                <h2 className="text-xl font-semibold text-white">{selectedMenu}</h2>
              </div>
            </div>
            
            {/* Content Body */}
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="p-4 rounded-lg border" style={{ backgroundColor: '#F7E8D0', borderColor: '#8E3B46' }}>
    <p className="text-xs text-gray-600 mb-1">{label}</p>
    <p className="font-semibold" style={{ color: '#8E3B46' }}>{value}</p>
  </div>
);

export default EmployeeProfile;