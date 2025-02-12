import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../Service/UserService';
import AdminHeader from './AdminHeader';
import Myfooter from './MyFooter';

export default function Alluser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            console.log("API Response:", response);

            // Ensure we get the actual array from `response.data`
            if (response?.data && Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                setUsers([]); // Default to empty array if format is unexpected
            }
        } catch (err) {
            console.error("Fetching users failed", err);
            setError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.userId !== userId)); // Remove user from state
            alert("User deleted successfully!");
        } catch (err) {
            console.error("Delete failed", err);
            alert("Failed to delete user.");
        }
    };

    if (loading) return <p className="text-center">Loading users...</p>;
    if (error) return <p className="text-danger text-center">{error}</p>;

    return (
        <div>
            <AdminHeader />
            <div className="container mt-5">
                <h2 className="text-center mb-4" style={{ color: "#374151" }}>All Users</h2>

                <div className="table-responsive">
                    <table className="table table-hover shadow-sm"
                        style={{
                            borderRadius: "10px",
                            overflow: "hidden",
                            background: "#f8f9fa",
                            borderCollapse: "separate",
                            borderSpacing: "0"
                        }}>
                        <thead className="table-dark">
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Bio</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created On</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(user => (
                                    <tr key={user.userId}>
                                        <td>{user.userId}</td>
                                        <td>{user.name}</td>
                                        <td>{user.bio || "No bio available"}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role || "USER"}</td>
                                        <td>{new Date(user.createdOn).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(user.userId)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Myfooter />
        </div>
    );
}
