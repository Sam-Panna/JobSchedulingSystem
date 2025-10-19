import React, { useContext, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import img from '../../image/login.svg'
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/authContext';

const Login = () => {
    const {login}= useContext(AuthContext)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        
    });
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSignUp, setIsSignUp] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.username) {
            newErrors.username = 'Email is required';
        } else if (!emailRegex.test(formData.username)) {
            newErrors.username = 'Please enter a valid email';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 4) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    const res = await login(formData);
    setIsLoading(false);

    const response = res.data;
     // ✅ use res.data directly

     console.log(res);
     localStorage.setItem("token", res.data.token)
     

    if (response.message === "Login successful") {
      const role = response.data[0].role;

      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "employee") {
        navigate("/employee-dashboard");
      } else {
        alert("Unknown user role. Cannot navigate.");
      }
    } else {
      alert(response.message || "Login failed");
    }
  } catch (err) {
    setIsLoading(false);
    console.error("Login error:", err);
    alert("Login failed. Please check your credentials.");
  }
};



    const handleSocialLogin = (provider) => {
        alert(`${provider} login clicked`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">



            <div className="relative w-full max-w-6xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                <div className="flex flex-col lg:flex-row bg-[#E8DFE0]">

                    <div className='w-1/2 h-full bg-[#d1cdce]'>
                        <img src={img} alt="" className='h-full w-full ' />
                    </div>

                    {/* Right Panel - Form */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                        <div className="max-w-md mx-auto w-full">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                </h1>
                                <p className="text-gray-600">
                                    {isSignUp ? 'Fill in your details to get started' : 'Enter your credentials to access your account'}
                                </p>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button
                                    onClick={() => handleSocialLogin('Google')}
                                    className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                                >
                                    <Chrome size={20} className="text-red-500" />
                                    <span className="text-sm font-medium text-gray-700">Google</span>
                                </button>
                                <button
                                    onClick={() => handleSocialLogin('GitHub')}
                                    className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                                >
                                    <Github size={20} className="text-gray-800" />
                                    <span className="text-sm font-medium text-gray-700">GitHub</span>
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">or continue with email</span>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="space-y-6">
                                <form action="" onSubmit={handleSubmit}>
                                    {/* Email Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="email"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                placeholder="Enter your email"
                                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:bg-white'
                                                    }`}
                                            />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </div>

                                    {/* Password Input */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                placeholder="Enter your password"
                                                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:bg-white'
                                                    }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    {!isSignUp && (
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center">
                                                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                            </label>
                                            <button type="button" className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors">
                                                Forgot password?
                                            </button>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full p-2 bg-[#8D9B6A] hover:bg-[#596639] flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                {isSignUp ? 'Create Account' : 'Sign In'}
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Toggle Sign Up/Sign In */}
                                <div className="mt-6 text-center">
                                    <p className="text-gray-600">
                                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                                        <button
                                            onClick={() => setIsSignUp(!isSignUp)}
                                            className="  font-medium transition-colors hover:underline"
                                        >
                                            {isSignUp ? 'Sign in' : 'Sign up'}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;