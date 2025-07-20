import React from 'react';
import EmployeeTable from '../component/EmployeeMqmt/EmployeeTable';

const EmployeesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
        <p className="text-gray-600 mt-2">
          View and manage all employees in the system
        </p>
      </div>
      
      {/* Employee Table Component */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <EmployeeTable />
      </div>
    </div>
  );
};

export default EmployeesPage;