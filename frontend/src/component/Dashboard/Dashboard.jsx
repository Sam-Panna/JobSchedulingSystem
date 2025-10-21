import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, CheckCircle, Clock, Briefcase, TrendingUp, Zap } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [totalTasks, setTotalTasks] = useState(0)
  const [pendingTasks, setPendingTasks] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)
  const [totalEmployees, setEmployees] = useState(0)
  const [data, setData] = useState([])

  const getAllTask = () => {
    axios.get('http://localhost:5000/api/tasks').then((res) => {
      // console.log(res);
      setData(res.data);
      setTotalTasks(res.data.length);
     
      
      setPendingTasks(()=>(res.data.filter(curElem=>
         curElem.status === 'Pending' 
      )).length);

      setCompletedTasks(()=>(
        res.data.filter(curElem =>
          curElem.status === "Completed"
        )).length);

    }
    ).catch((err) => {
      console.log(err);

    })

  }

  const getEmployee = () =>{
    axios.get('http://localhost:5000/api/employee-data').then((res) =>{
      console.log(res);

      setEmployees(()=>(res.data.data.filter(curElem=>
      curElem.role === "employee")).length);
      
    }).catch((err)=>{
      console.log(err);
      
    })
  }
  useEffect(() => {
    getAllTask();
    getEmployee();

  }, [])


  // Static data
  // const totalTasks = 100;
  // const pendingTasks = 25;
  // const completedTasks = 65;
  // const totalEmployees = 10;

  const workloadData = [
    { name: 'Sampanna', tasks: 12 },
    { name: 'Anuradha', tasks: 8 },
    { name: 'Shine', tasks: 10 },
    { name: 'Ram', tasks: 7 },
    { name: 'Eve', tasks: 13 },
  ];

  const suggestedEmployee = "Eve";

  const StatCard = ({ title, value, icon: Icon, iconBg, textColor }) => (
    <div className="backdrop-blur-sm border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group h-32 w-full flex flex-col justify-center items-center"
      style={{ backgroundColor: '#2E2E2E', borderColor: '#8E3B46' }}>
      <div className="p-2 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: iconBg }}>
        <Icon size={24} style={{ color: textColor }} />
      </div>
      <h2 className="text-sm font-medium mb-1" style={{ color: '#F7E8D0' }}>{title}</h2>
      <p className="text-3xl font-bold" style={{ color: textColor }}>{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#2E2E2E' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl" style={{ backgroundColor: '#8E3B46' }}>
              <TrendingUp className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Welcome back, <span style={{ color: '#F4A259' }}>Sampanna</span>
            </h1>
          </div>
          <p className="ml-14" style={{ color: '#F7E8D0' }}>Here's what's happening with your team today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tasks"
            value={totalTasks}
            icon={Briefcase}
            iconBg="#8E3B46"
            textColor="#F4A259"
          />
          <StatCard
            title="Pending Tasks"
            value={pendingTasks}
            icon={Clock}
            iconBg="#8E3B46"
            textColor="#F4A259"
          />
          <StatCard
            title="Team Members"
            value={totalEmployees}
            icon={Users}
            iconBg="#8E3B46"
            textColor="#F7E8D0"
          />
          <StatCard
            title="Completed"
            value={completedTasks}
            icon={CheckCircle}
            iconBg="#8E3B46"
            textColor="#4ade80"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
          {/* Workload Chart */}
          <div className="lg:col-span-2 backdrop-blur-sm border rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            style={{ backgroundColor: '#2E2E2E', borderColor: '#8E3B46' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#8E3B46' }}>
                <BarChart className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-white">Team Workload Distribution</h2>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workloadData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8E3B46" />
                      <stop offset="100%" stopColor="#F4A259" />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#F7E8D0', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#F7E8D0', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#2E2E2E',
                      border: '1px solid #8E3B46',
                      borderRadius: '12px',
                      color: '#F7E8D0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                  <Bar
                    dataKey="tasks"
                    fill="url(#barGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Assignment Panel */}
          <div className="backdrop-blur-sm border rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col"
            style={{ backgroundColor: '#2E2E2E', borderColor: '#8E3B46' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ backgroundColor: '#F4A259' }}>
                <Zap className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-white">AI Smart Assignment</h2>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <div className="rounded-xl p-6 mb-6 border"
                style={{ backgroundColor: '#8E3B46', borderColor: '#F4A259' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: '#F4A259' }}>
                  <Users className="text-white" size={24} />
                </div>
                <p className="text-sm mb-3" style={{ color: '#F7E8D0' }}>
                  Based on workload analysis and performance metrics, our AI recommends:
                </p>
                <div className="rounded-lg p-3 border"
                  style={{ backgroundColor: '#F7E8D0', borderColor: '#F4A259' }}>
                  <span className="text-lg font-bold" style={{ color: '#8E3B46' }}>
                    {suggestedEmployee}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 text-white hover:opacity-90"
              style={{ backgroundColor: '#F4A259' }}>
              <Zap size={18} />
              Assign Task
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 backdrop-blur-sm border rounded-2xl p-6 shadow-lg"
          style={{ backgroundColor: '#2E2E2E', borderColor: '#8E3B46' }}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-white">Overall Progress</h3>
            <span className="text-sm font-medium" style={{ color: '#F7E8D0' }}>{completedTasks}% Complete</span>
          </div>
          <div className="w-full rounded-full h-3" style={{ backgroundColor: '#8E3B46' }}>
            <div
              className="h-3 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${completedTasks}%`,
                background: 'linear-gradient(to right, #F4A259, #4ade80)'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;