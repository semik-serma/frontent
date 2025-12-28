"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeProjects: 0,
    revenue: 0,
    growth: 0
  });

  useEffect(() => {
    // Simulate loading data
    setStats({
      totalUsers: 1234,
      activeProjects: 56,
      revenue: 45678,
      growth: 23.5
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-600">Active Projects</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">${stats.revenue}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-600">Growth</h3>
            <p className="text-2xl font-bold text-gray-900">{stats.growth}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="text-sm text-gray-600">New user registered</p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-600">Project completed</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
            <div className="pb-2">
              <p className="text-sm text-gray-600">Payment received</p>
              <p className="text-xs text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
