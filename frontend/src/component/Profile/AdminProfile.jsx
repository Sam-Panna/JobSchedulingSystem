import React, { useState } from 'react';
import { User, Edit3, Save, X, Lock, Settings, Trash2, Eye, EyeOff, Shield, Bell, UserCog } from 'lucide-react';

// Navigation Component
const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'danger', label: 'Danger Zone', icon: Trash2 }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 p-4 rounded-lg" style={{ backgroundColor: 'rgba(142, 59, 70, 0.1)' }}>
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-white shadow-lg transform scale-105'
                : 'text-gray-300 hover:text-white hover:bg-opacity-20 hover:bg-white'
            }`}
            style={{
              backgroundColor: activeTab === tab.id ? '#8E3B46' : 'transparent'
            }}
          >
            <IconComponent size={20} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Mock ProfileHeader Component
const ProfileHeader = () => (
  <div className="relative mb-8">
    {/* Background Banner */}
    <div className="h-40 rounded-t-xl relative overflow-hidden" style={{ backgroundColor: '#8E3B46' }}>
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-white"></div>
        <div className="absolute top-12 right-16 w-8 h-8 rounded-full border border-white"></div>
        <div className="absolute bottom-4 right-8 w-12 h-12 rounded-full border border-white"></div>
      </div>
      
      {/* Profile Avatar - Centered and More Prominent */}
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className="w-40 h-40 rounded-full border-6 border-white shadow-2xl flex items-center justify-center" style={{ backgroundColor: '#F7E8D0' }}>
            <User size={64} style={{ color: '#8E3B46' }} strokeWidth={1.5} />
          </div>
          {/* Online Status Badge */}
          <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-green-500">
            <div className="w-3 h-3 rounded-full bg-white"></div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Profile Information - Centered Layout */}
    <div className="pt-24 pb-8 px-8 text-center">
      <h1 className="text-4xl font-bold text-white mb-3">John Administrator</h1>
      <p className="text-xl mb-4" style={{ color: '#F7E8D0' }}>System Administrator</p>
      
      {/* Status and Email Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-sm text-green-300 font-medium">Active Now</span>
        </div>
        <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-500"></div>
        <div className="flex items-center gap-2 text-gray-300">
          <span className="text-sm">john.admin@company.com</span>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="flex justify-center gap-8 text-center">
        <div>
          <div className="text-2xl font-bold text-white">156</div>
          <div className="text-sm text-gray-400">Tasks Completed</div>
        </div>
        <div className="w-px h-12 bg-gray-600"></div>
        <div>
          <div className="text-2xl font-bold text-white">89%</div>
          <div className="text-sm text-gray-400">Performance</div>
        </div>
        <div className="w-px h-12 bg-gray-600"></div>
        <div>
          <div className="text-2xl font-bold text-white">2.5yr</div>
          <div className="text-sm text-gray-400">Experience</div>
        </div>
      </div>
    </div>
  </div>
);

// Profile Section Component
const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  const ProfileDetails = () => (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div className="space-y-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7E8D0' }}>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#8E3B46' }}>Full Name</label>
          <p className="text-gray-800">John Administrator</p>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7E8D0' }}>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#8E3B46' }}>Email Address</label>
          <p className="text-gray-800">john.admin@company.com</p>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7E8D0' }}>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#8E3B46' }}>Department</label>
          <p className="text-gray-800">IT Administration</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7E8D0' }}>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#8E3B46' }}>Phone Number</label>
          <p className="text-gray-800">+1 (555) 123-4567</p>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7E8D0' }}>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#8E3B46' }}>Role</label>
          <p className="text-gray-800">System Administrator</p>
        </div>
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7E8D0' }}>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#8E3B46' }}>Last Login</label>
          <p className="text-gray-800">Today, 2:30 PM</p>
        </div>
      </div>
    </div>
  );

  const EditProfileForm = ({ onCancel }) => {
    const [formData, setFormData] = useState({
      fullName: 'John Administrator',
      email: 'john.admin@company.com',
      phone: '+1 (555) 123-4567',
      department: 'IT Administration'
    });

    const handleSubmit = () => {
      onCancel();
    };

    return (
      <div className="space-y-6 mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full p-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
              style={{ backgroundColor: '#F7E8D0', borderColor: '#8E3B46' }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
              style={{ backgroundColor: '#F7E8D0', borderColor: '#8E3B46' }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full p-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
              style={{ backgroundColor: '#F7E8D0', borderColor: '#8E3B46' }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-white">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              className="w-full p-3 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
              style={{ backgroundColor: '#F7E8D0', borderColor: '#8E3B46' }}
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 text-white hover:bg-opacity-10 hover:bg-white transition-colors"
            style={{ borderColor: '#F7E8D0' }}
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-white hover:bg-opacity-90 transition-colors"
            style={{ backgroundColor: '#F4A259' }}
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: '#8E3B46' }}>
            <UserCog size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Profile Information</h2>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-white hover:bg-opacity-90 transition-colors shadow-lg"
            style={{ backgroundColor: '#F4A259' }}
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        )}
      </div>
      
      {isEditing ? (
        <EditProfileForm onCancel={() => setIsEditing(false)} />
      ) : (
        <ProfileDetails />
      )}
    </div>
  );
};

// Security Section Component
const SecuritySection = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const togglePassword = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert('Please fill in all password fields');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match');
      return;
    }
    alert('Password updated successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#8E3B46' }}>
          <Lock size={20} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Security Settings</h2>
      </div>
      
      <div className="max-w-md space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">Current Password</label>
          <div className="relative">
            <input
              type={showPasswords.current ? "text" : "password"}
              value={passwords.current}
              onChange={(e) => setPasswords({...passwords, current: e.target.value})}
              className="w-full p-3 pr-12 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
              style={{ backgroundColor: '#F7E8D0', borderColor: '#8E3B46' }}
              placeholder="Enter current password"
            />
            <button
              onClick={() => togglePassword('current')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
              style={{ color: '#8E3B46' }}
            >
              {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">New Password</label>
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              value={passwords.new}
              onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              className="w-full p-3 pr-12 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
              style={{ backgroundColor: '#F7E8D0', borderColor: '#8E3B46' }}
              placeholder="Enter new password"
            />
            <button
              onClick={() => togglePassword('new')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
              style={{ color: '#8E3B46' }}
            >
              {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2 text-white">Confirm New Password</label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              value={passwords.confirm}
              onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              className="w-full p-3 pr-12 rounded-lg border-2 focus:outline-none focus:border-opacity-80"
              style={{ backgroundColor: '#F7E8D0', borderColor: '#8E3B46' }}
              placeholder="Confirm new password"
            />
            <button
              onClick={() => togglePassword('confirm')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
              style={{ color: '#8E3B46' }}
            >
              {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <button
          onClick={handlePasswordUpdate}
          className="flex items-center gap-2 px-6 py-3 rounded-lg text-white hover:bg-opacity-90 transition-colors w-full justify-center"
          style={{ backgroundColor: '#8E3B46' }}
        >
          <Lock size={18} />
          Update Password
        </button>
      </div>
    </div>
  );
};

// Settings Section Component
const SettingsSection = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    loginAlerts: true,
    darkMode: true,
    sessionTimeout: '30'
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg" style={{ backgroundColor: '#8E3B46' }}>
          <Settings size={20} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#F7E8D0' }}>
          <div className="flex items-center gap-3">
            <Bell size={20} style={{ color: '#8E3B46' }} />
            <div>
              <h3 className="font-semibold" style={{ color: '#8E3B46' }}>Email Notifications</h3>
              <p className="text-sm text-gray-600">Receive email updates about your account</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#F7E8D0' }}>
          <div className="flex items-center gap-3">
            <Shield size={20} style={{ color: '#8E3B46' }} />
            <div>
              <h3 className="font-semibold" style={{ color: '#8E3B46' }}>Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#F7E8D0' }}>
          <div className="flex items-center gap-3">
            <Lock size={20} style={{ color: '#8E3B46' }} />
            <div>
              <h3 className="font-semibold" style={{ color: '#8E3B46' }}>Login Alerts</h3>
              <p className="text-sm text-gray-600">Get notified of new login attempts</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.loginAlerts}
              onChange={(e) => setSettings({...settings, loginAlerts: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
        
        <div className="p-4 rounded-lg" style={{ backgroundColor: '#F7E8D0' }}>
          <div className="flex items-center gap-3 mb-3">
            <Settings size={20} style={{ color: '#8E3B46' }} />
            <div>
              <h3 className="font-semibold" style={{ color: '#8E3B46' }}>Session Timeout</h3>
              <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
            </div>
          </div>
          <select
            value={settings.sessionTimeout}
            onChange={(e) => setSettings({...settings, sessionTimeout: e.target.value})}
            className="w-full p-2 rounded border-2 focus:outline-none"
            style={{ borderColor: '#8E3B46' }}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Danger Zone Section Component
const DangerZoneSection = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-red-600">
          <Trash2 size={20} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Danger Zone</h2>
      </div>
      
      <div className="p-6 rounded-lg border-2 border-red-500" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
        <div className="flex items-center gap-3 mb-4">
          <Trash2 size={24} className="text-red-500" />
          <h3 className="font-semibold text-red-400 text-lg">Delete Account</h3>
        </div>
        <p className="text-red-300 mb-6">
          Once you delete your account, there is no going back. This action cannot be undone.
          All your data, settings, and access will be permanently removed.
        </p>
        
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-red-900 bg-opacity-20 border border-red-500">
              <p className="text-red-200 font-semibold mb-2">⚠️ Final Warning</p>
              <p className="text-red-300 text-sm">
                This action is irreversible. Type "DELETE" below to confirm account deletion.
              </p>
              <input
                type="text"
                placeholder="Type DELETE to confirm"
                className="w-full mt-2 p-2 rounded border-2 border-red-500 bg-red-50 text-red-800 focus:outline-none focus:border-red-600"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-3 border-2 border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:bg-opacity-10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => alert('Account deletion confirmed')}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Delete My Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main AdminProfile Component
const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'security':
        return <SecuritySection />;
      case 'settings':
        return <SettingsSection />;
      case 'danger':
        return <DangerZoneSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6" style={{ backgroundColor: '#2E2E2E' }}>
      <div className="max-w-5xl mx-auto">
        <div className="rounded-xl shadow-2xl overflow-hidden" style={{ backgroundColor: '#2E2E2E' }}>
          <ProfileHeader />
          
          <div className="px-4 md:px-8 pb-8">
            <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="min-h-[400px]">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;