"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit2, FiMail, FiSave, FiShield, FiUser, FiX } from "react-icons/fi";
import Swal from "sweetalert2";

const roleStyles = {
  admin: { color: "bg-amber-100 text-amber-800 border-amber-200", icon: <FiShield className="w-4 h-4" /> },
  provider: { color: "bg-sky-100 text-sky-800 border-sky-200", icon: <FiUser className="w-4 h-4" /> },
  customer: { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: <FiUser className="w-4 h-4" /> },
};

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedRole, setEditedRole] = useState("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/all-users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire("Error!", "Failed to load users data.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedRole(user.role);
  };

  const handleSaveClick = async (userId) => {
    if (!editedRole) {
      Swal.fire("Warning", "Please select a role before saving!", "warning");
      return;
    }

    // ⚠️ Confirm before saving
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to update this user's role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await axios.patch("/api/all-users/role-update", {
        userId,
        newRole: editedRole,
      });

      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, role: editedRole } : user
          )
        );
        setEditingUserId(null);
        setEditedRole("");

        Swal.fire("Success!", "User role updated successfully!", "success");
      } else {
        Swal.fire("Error!", response.data?.error || "Failed to update role", "error");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.error || "Something went wrong while updating role.",
        "error"
      );
    }
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
    setEditedRole("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-sky-500 px-6 py-4">
        <h2 className="text-xl font-bold text-white">User Management</h2>
        <p className="text-emerald-100 text-sm mt-1">
          Manage user roles and permissions
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                {/* User Name & Avatar */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-full flex items-center justify-center">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {user.name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-700">
                    <FiMail className="w-4 h-4 text-gray-400 mr-2" />
                    {user.email}
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user._id ? (
                    <select
                      value={editedRole}
                      onChange={(e) => setEditedRole(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm"
                    >
                      <option value="admin">Admin</option>
                      <option value="provider">Provider</option>
                      <option value="customer">Customer</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                        roleStyles[user.role]?.color || "bg-gray-100 text-gray-800 border-gray-200"
                      }`}
                    >
                      {roleStyles[user.role]?.icon || <FiUser className="w-4 h-4" />}
                      <span className="ml-1 capitalize">{user.role}</span>
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingUserId === user._id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveClick(user._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors text-sm"
                      >
                        <FiSave className="w-4 h-4 mr-1" />
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="inline-flex items-center px-3 py-1.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm"
                      >
                        <FiX className="w-4 h-4 mr-1" />
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(user)}
                      className="inline-flex items-center px-3 py-1.5 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors text-sm"
                    >
                      <FiEdit2 className="w-4 h-4 mr-1" />
                      Edit Role
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          Showing {users.length} users • Admin can change user roles
        </p>
      </div>
    </div>
  );
};

export default UserManagementTable;
