import React, { useEffect, useState } from 'react'
import { User, Lock, Save, ArrowLeft, AlertCircle } from 'lucide-react'

const EditEmployee = () => {
  const [data, setData] = useState({
    username: "john.doe@company.com",
    password_hash: ""
  })
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  // Simulate API call for demo
  useEffect(() => {
    // Simulate loading employee data
    setLoading(true);
    setTimeout(() => {
      setData({
        username: "john.doe@company.com",
        password_hash: ""
      });
      setLoading(false);
    }, 1000);
  }, [])
  
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
    setError(""); // Clear error when user starts typing
    setSuccess(false);
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    
    // Simulate API call
    setTimeout(() => {
      if (data.username && data.username.includes('@')) {
        setSuccess(true);
        setSubmitting(false);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Please enter a valid email address");
        setSubmitting(false);
      }
    }, 1500);
  }
  
  const handleBack = () => {
    // Simulate navigation back
    alert("Navigating back to employee list");
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700" style={{borderBottomColor: '#8E3B46'}}></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full shadow-lg" style={{backgroundColor: '#8E3B46'}}>
              <User className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Employee
          </h2>
          <p className="text-gray-600">
            Update employee information
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-8 py-6">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center hover:opacity-80 mb-6 transition-opacity duration-200"
              style={{color: '#8E3B46'}}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Employee List
            </button>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 rounded-lg flex items-center" style={{backgroundColor: '#f0ebe6', borderColor: '#d4c4b5', border: '1px solid'}}>
                <div className="h-5 w-5 mr-3" style={{color: '#8E3B46'}}>✓</div>
                <span className="text-sm" style={{color: '#6b4426'}}>Employee updated successfully!</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <div onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="email"
                    required
                    value={data.username}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors duration-200"
                    style={{
                      '--tw-ring-color': '#8E3B46',
                      borderColor: data.username ? '#8E3B46' : undefined
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8E3B46'}
                    onBlur={(e) => e.target.style.borderColor = data.username ? '#8E3B46' : '#d1d5db'}
                    placeholder="employee@company.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password_hash" className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password_hash"
                    name="password_hash"
                    type="password"
                    value={data.password_hash}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors duration-200"
                    style={{
                      '--tw-ring-color': '#8E3B46',
                      borderColor: data.password_hash ? '#8E3B46' : undefined
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8E3B46'}
                    onBlur={(e) => e.target.style.borderColor = data.password_hash ? '#8E3B46' : '#d1d5db'}
                    placeholder="Enter new password"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Leave blank to keep current password
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                  style={{
                    background: submitting ? '#6b4426' : 'linear-gradient(to right, #8E3B46, #7a4c2a)',
                    '--tw-ring-color': '#8E3B46'
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      e.target.style.background = 'linear-gradient(to right, #7a4c2a, #6b4426)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) {
                      e.target.style.background = 'linear-gradient(to right, #8E3B46, #7a4c2a)';
                    }
                  }}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Employee
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Make sure all information is accurate before updating
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditEmployee