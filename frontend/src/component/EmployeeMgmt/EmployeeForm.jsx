import React, { useState } from 'react'
import { User, MapPin, Briefcase, Code, Plus, X } from 'lucide-react'
import axios from 'axios'

const EmployeeForm = () => {
  const [data, setData] = useState({
    full_name: '',
    username: '',
    address: '',
    designation: '',
    skills: []
  })
  
  const [currentSkill, setCurrentSkill] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleAddSkill = (e) => {
    e.preventDefault()
    if (currentSkill.trim() && !data.skills.includes(currentSkill.trim())) {
      setData({ ...data, skills: [...data.skills, currentSkill.trim()] })
      setCurrentSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setData({ 
      ...data, 
      skills: data.skills.filter(skill => skill !== skillToRemove) 
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log(data);
    
    
    try {
      
      
      
      // In real implementation, uncomment this:
      await axios.post('http://localhost:5000/api/addemployees', data).then((res)=>{
        console.log(res);
        
      }).catch((err)=>{
        console.log(err);
        
      })
      
      setShowSuccess(true)
      setData({
        full_name: '',
        username: '',
        address: '',
        designation: '',
        skills: []
      })
      
      
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-800 p-4 rounded-lg shadow-sm animate-pulse">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-800" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700 font-medium">
                  Employee added successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 bg-[#8E3B46]"  >
            <h1 className="text-3xl font-bold text-white">Add New Employee</h1>
            <p className="text-amber-100 mt-2">Enter employee details below</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User size={16} style={{ color: '#8E3B46' }} />
                Full Name
              </label>
              <input 
                value={data.full_name}
                name="full_name"
                type="text" 
                onChange={handleChange}
                placeholder="Enter employee full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                style={{ focusRingColor: '#8E3B46' }}
                onFocus={(e) => e.target.style.outline = '2px solid #8E3B46'}
                onBlur={(e) => e.target.style.outline = 'none'}
                required
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User size={16} style={{ color: '#8E3B46' }} />
                Username
              </label>
              <input 
                value={data.username}
                name="username"
                type="text" 
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onFocus={(e) => e.target.style.outline = '2px solid #8E3B46'}
                onBlur={(e) => e.target.style.outline = 'none'}
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin size={16} style={{ color: '#8E3B46' }} />
                Address
              </label>
              <input 
                value={data.address}
                name="address"
                type="text" 
                onChange={handleChange}
                placeholder="Enter employee address"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onFocus={(e) => e.target.style.outline = '2px solid #8E3B46'}
                onBlur={(e) => e.target.style.outline = 'none'}
                required
              />
            </div>

            {/* Designation */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Briefcase size={16} style={{ color: '#8E3B46' }} />
                Designation
              </label>
              <input 
                value={data.designation}
                name="designation"
                type="text" 
                onChange={handleChange}
                placeholder="Enter employee designation"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                onFocus={(e) => e.target.style.outline = '2px solid #8E3B46'}
                onBlur={(e) => e.target.style.outline = 'none'}
                required
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Code size={16} style={{ color: '#8E3B46' }} />
                Skills
              </label>
              
              <div className="flex gap-2">
                <input 
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Enter a skill"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  onFocus={(e) => e.target.style.outline = '2px solid #8E3B46'}
                  onBlur={(e) => e.target.style.outline = 'none'}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(e)}
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-3 text-white rounded-xl hover:opacity-90 transition-colors duration-200 flex items-center gap-2"
                  style={{ backgroundColor: '#8E3B46' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#7A4C2A'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#8E3B46'}
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {/* Skills Display */}
              {data.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {data.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border"
                      style={{ 
                        backgroundColor: '#F3E8D8', 
                        color: '#8E3B46',
                        borderColor: '#D4B896'
                      }}
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="transition-colors"
                        style={{ color: '#8E3B46' }}
                        onMouseEnter={(e) => e.target.style.color = '#7A4C2A'}
                        onMouseLeave={(e) => e.target.style.color = '#8E3B46'}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white py-4 rounded-xl font-semibold text-lg focus:ring-4 focus:ring-opacity-30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                background: 'linear-gradient(to right, #8E3B46, #7A4C2A)',
                focusRingColor: '#8E3B46'
              }}
              onMouseEnter={(e) => e.target.style.background = 'linear-gradient(to right, #7A4C2A, #664020)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(to right, #8E3B46, #7A4C2A)'}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding Employee...
                </div>
              ) : (
                'Add Employee'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeForm