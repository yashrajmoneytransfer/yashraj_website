"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Edit, Trash2, Shield, User, Mail, Calendar } from "lucide-react"

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@yashraj.com", role: "admin", createdAt: "2024-01-01", lastLogin: "2024-01-20" },
    { id: 2, name: "Manager User", email: "manager@yashraj.com", role: "manager", createdAt: "2024-01-05", lastLogin: "2024-01-19" },
  ])

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id))
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
      case "manager": return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
      default: return "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Users Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
          <User className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Users</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{users.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Admins</div>
          <div className="text-3xl font-bold text-purple-600">{users.filter(u => u.role === "admin").length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Managers</div>
          <div className="text-3xl font-bold text-blue-600">{users.filter(u => u.role === "manager").length}</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Created</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Last Login</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)} flex items-center gap-1 w-fit`}>
                    <Shield className="w-4 h-4" />
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {user.createdAt}
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{user.lastLogin}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
