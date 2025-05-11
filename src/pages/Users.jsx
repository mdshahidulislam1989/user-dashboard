import React, { useState, useEffect } from 'react';
import { Pencil, Trash, Plus } from 'react-bootstrap-icons';
import Sidebar from './navigation/Sidebar';
import axios from 'axios';
import UserModal from "./modal/UserModal";
import '../styles/Users.scss';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="users-container">
      <Sidebar title='Users'/>
      
      <div className="content-wrapper">
        <div className="header-section">
          <h2>Users</h2>
          <button
            className="add-user-btn btn btn-primary btn-sm"
            onClick={() => {
              setCurrentUser(null);
              setShowModal(true);
            }}
          >
            <Plus className="me-1" /> Add User
          </button>
        </div>

        <div className="table-container">
          <div className="table-responsive">
            <table className="users-table table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td className="text-truncate">{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.dob).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-primary btn-xs"
                          onClick={() => {
                            setCurrentUser(user);
                            setShowModal(true);
                          }}
                        >
                          <Pencil />
                        </button>
                        <button
                          className="btn btn-outline-danger btn-xs"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <UserModal
          show={showModal}
          onHide={() => setShowModal(false)}
          user={currentUser}
          setUsers={setUsers}
        />
      </div>
    </div>
  );
};

export default Users;