import React, { useEffect, useState } from 'react';
import { User, Lock, Save, ArrowLeft, AlertCircle, UserCircle, Briefcase, Activity, Award } from 'lucide-react';

const EditEmployee = () => {
  const [data, setData] = useState({
    username: "",
    password_hash: "",
    full_name: "",
    availability: true,
    skills: []
  });
  
  const [availableSkills, setAvailableSkills] = useState([
    { id: 1, name: "JavaScript" },
    { id: 2, name: "React" },
    { id: 3, name: "Node.js" },
    { id: 4, name: "SQL" },
    { id: 5, name: "Project Management" },
  ]);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  // Simulate API call for demo
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData({
        id: 13,
        username: "sam123@gmail.com",
        password_hash: "",
        full_name: "Sampannarajjhblhh",
        availability: true,
        skills: [
          { skill_id: 1, proficiency_level: "intermediate" },
          { skill_id: 3, proficiency_level: "advanced" }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError("");
    setSuccess(false);
  };
  
  const handleSkillChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSkills = [...data.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [name]: name === 'skill_id' ? parseInt(value, 10) : value
    };
    setData(prev => ({ ...prev, skills: updatedSkills }));
  };
  
  const addSkill = () => {
    if (data.skills.length < availableSkills.length) {
      setData(prev => ({
        ...prev,
        skills: [...prev.skills, { skill_id: "", proficiency_level: "intermediate" }]
      }));
    }
  };
  
  const removeSkill = (index) => {
    const updatedSkills = [...data.skills];
    updatedSkills.splice(index, 1);
    setData(prev => ({ ...prev, skills: updatedSkills }));
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    
    // Validation
    if (!data.username || !data.full_name) {
      setError("Email and full name are required");
      setSubmitting(false);
      return;
    }
    
    if (data.skills.length === 0) {
      setError("At least one skill is required");
      setSubmitting(false);
      return;
    }
    
    for (const skill of data.skills) {
      if (!skill.skill_id) {
        setError("Please select a skill for all entries");
        setSubmitting(false);
        return;
      }
    }
    
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };
  
  const handleBack = () => {
    // Navigation back implementation
    alert("Navigating back to employee list");
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700" style={{borderBottomColor: '#8E3B46'}}></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="Enter new password"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Leave blank to keep current password
                  </p>
                </div>

                {/* Full Name Field */}
                <div>
                  <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="full_name"
                      name="full_name"
                      type="text"
                      required
                      value={data.full_name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors duration-200"
                      style={{
                        '--tw-ring-color': '#8E3B46',
                        borderColor: data.full_name ? '#8E3B46' : undefined
                      }}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Availability Field */}
                <div>
                  <label htmlFor="availability" className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Activity className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="pl-10 flex items-center">
                      <input
                        id="availability"
                        name="availability"
                        type="checkbox"
                        checked={data.availability}
                        onChange={handleChange}
                        className="h-5 w-5 rounded border-gray-300 focus:ring-amber-700"
                        style={{color: '#8E3B46'}}
                      />
                      <label htmlFor="availability" className="ml-3 text-sm text-gray-700">
                        Available for assignments
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Award className="h-5 w-5 mr-2" style={{color: '#8E3B46'}} />
                    Skills & Proficiency
                  </h3>
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-3 py-1 text-sm rounded-md flex items-center"
                    style={{backgroundColor: '#f0ebe6', color: '#8E3B46'}}
                  >
                    + Add Skill
                  </button>
                </div>
                
                {data.skills.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    No skills added yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {data.skills.map((skill, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        <div className="md:col-span-5">
                          <select
                            name="skill_id"
                            value={skill.skill_id}
                            onChange={(e) => handleSkillChange(e, index)}
                            className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200"
                            style={{
                              '--tw-ring-color': '#8E3B46',
                              borderColor: skill.skill_id ? '#8E3B46' : undefined
                            }}
                            required
                          >
                            <option value="">Select a skill</option>
                            {availableSkills
                              .filter(s => !data.skills.find(sk => sk.skill_id === s.id) || s.id === skill.skill_id)
                              .map(skillOption => (
                                <option key={skillOption.id} value={skillOption.id}>
                                  {skillOption.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        
                        <div className="md:col-span-5">
                          <select
                            name="proficiency_level"
                            value={skill.proficiency_level}
                            onChange={(e) => handleSkillChange(e, index)}
                            className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200"
                            style={{
                              '--tw-ring-color': '#8E3B46',
                              borderColor: skill.proficiency_level ? '#8E3B46' : undefined
                            }}
                            required
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>
                        
                        <div className="md:col-span-2">
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="w-full py-3 px-4 text-red-600 hover:text-red-800 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                  style={{
                    background: submitting ? '#6b4426' : 'linear-gradient(to right, #8E3B46, #7a4c2a)',
                    '--tw-ring-color': '#8E3B46'
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
            </form>
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

export default EditEmployee;