'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState("week");
  const [userProfile, setUserProfile] = useState({
    name: "Guest User",
    email: "",
    role: "",
    avatar: "GU",
    status: "Offline"
  });

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      // Set the actual user profile from localStorage
      setUserProfile({
        name: `${parsedUser.firstname} ${parsedUser.lastname}`,
        email: parsedUser.email,
        role: parsedUser.role,
        avatar: `${parsedUser.firstname.charAt(0)}${parsedUser.lastname.charAt(0)}`,
        status: "Online"
      });
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/login');
    }

    // Set auth checked to true to stop showing loading state
    setAuthChecked(true);
  }, [router]);

  const stats = {
    totalUsers: 1568,
    activeProjects: 42,
    revenue: 89245,
    growth: 12.3
  };

  const recentActivity = [
    { id: 1, type: "user", action: "New user registered", user: "John Doe", time: "2 min ago", status: "success" },
    { id: 2, type: "project", action: "Project completed", project: "Mobile App", time: "1 hour ago", status: "completed" },
    { id: 3, type: "payment", action: "Payment received", amount: "$2,500", time: "3 hours ago", status: "success" },
    { id: 4, type: "alert", action: "Server maintenance", description: "Scheduled for midnight", time: "5 hours ago", status: "warning" },
    { id: 5, type: "update", action: "System update", version: "v2.1.0", time: "1 day ago", status: "info" }
  ];

  const tasks = [
    { id: 1, title: "Review project proposals", status: "pending", priority: "high", due: "Today" },
    { id: 2, title: "Update documentation", status: "in-progress", priority: "medium", due: "Tomorrow" },
    { id: 3, title: "Client meeting", status: "completed", priority: "high", due: "Completed" },
    { id: 4, title: "Team sync", status: "pending", priority: "low", due: "This week" }
  ];

  const notifications = [
    { id: 1, type: "info", message: "New feature update available", time: "10 min ago", read: false },
    { id: 2, type: "alert", message: "Server performance warning", time: "25 min ago", read: false },
    { id: 3, type: "success", message: "Payment processed successfully", time: "1 hour ago", read: true },
    { id: 4, type: "info", message: "Weekly report generated", time: "3 hours ago", read: true }
  ];

  const isLoading = !authChecked || !userProfile.name || userProfile.name === 'Guest User';

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      change: "+12.5%",
      trend: "up",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      icon: "👥"
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      change: "+3.2%",
      trend: "up",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: "📁"
    },
    {
      title: "Revenue",
      value: `$${stats.revenue.toLocaleString()}`,
      change: "+8.7%",
      trend: "up",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      icon: "💰"
    },
    {
      title: "Growth Rate",
      value: `${stats.growth}%`,
      change: "-1.2%",
      trend: "down",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: "📈"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      case 'completed': return '✅';
      default: return 'ℹ️';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'alert': return 'text-red-600 bg-red-50';
      case 'success': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* User Profile Section */}
            <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {userProfile.avatar}
                </div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-900">{userProfile.name}</p>
                  <p className="text-xs text-gray-500">{userProfile.role}</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="day">Last 24 hours</option>
              <option value="week">Last week</option>
              <option value="month">Last month</option>
              <option value="year">Last year</option>
            </select>
            <button
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <span>🔄</span>
              Refresh
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 transition-colors">
              <span>📥</span>
              Export
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                  <div className="text-3xl font-bold text-gray-900">
                    {card.value}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-sm font-medium ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {card.trend === 'up' ? '↗' : '↘'}
                      {card.change}
                    </span>
                    <span className="text-sm text-gray-500">vs last week</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${card.bgColor} text-2xl`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
              <div className="flex items-center gap-3">
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Daily
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                  Weekly
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Monthly
                </button>
              </div>
            </div>

            {/* Enhanced Chart Placeholder */}
            <div className="h-64 flex items-end justify-between gap-2 mb-6 p-4 bg-gray-50 rounded-xl">
              {[65, 40, 75, 50, 85, 60, 95].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:opacity-80 relative"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      ${Math.floor(Math.random() * 3000) + 1000}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">Day {index + 1}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Current Period</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-600">Previous Period</span>
                </div>
              </div>
              <span className="text-gray-500">Last 7 days</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-6">Performance</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-blue-200">Avg. Session Duration</p>
                <p className="text-2xl font-bold">4m 32s</p>
              </div>
              <div>
                <p className="text-sm text-blue-200">Conversion Rate</p>
                <p className="text-2xl font-bold">3.24%</p>
              </div>
              <div>
                <p className="text-sm text-blue-200">Bounce Rate</p>
                <p className="text-2xl font-bold">42.1%</p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center justify-center gap-2">
              📊 View Detailed Analytics
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className={`p-3 rounded-full ${getStatusColor(activity.status)} text-lg`}>
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        🕒 {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.user || activity.project || activity.amount || activity.description || activity.version}
                    </p>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
                    ⋮
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Mark all read
              </button>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'}`}
                >
                  <div className={`p-1.5 rounded-full ${getNotificationColor(notification.type)}`}>
                    {notification.type === 'info' ? 'ℹ️' :
                      notification.type === 'alert' ? '⚠️' :
                        notification.type === 'success' ? '✅' : '🔔'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Management Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Task Management</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              + Add Task
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${task.status === 'completed' ? 'text-green-700 bg-green-100' : task.status === 'in-progress' ? 'text-yellow-700 bg-yellow-100' : 'text-gray-700 bg-gray-100'}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <span className="text-gray-500">{task.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Data updates in real-time • Last refreshed: Just now</p>
        </div>
      </div>
    </div>
  );
}