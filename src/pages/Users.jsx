import React from "react";
import { useState, useEffect } from 'react';
import { Pencil, Trash, Plus } from 'react-bootstrap-icons';
import Sidebar from "./navigation/Sidebar";
import axios from 'axios';
import UserModal from "./modal/UserModal";
const Users=()=>{
 
    const [users,setUsers]=useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=> {
        const fetchUsers = async () => {
            try {
              const response = await axios.get('http://localhost:3001/users');
              setUsers(response.data);
            } catch (error) {
              console.error('Error fetching users:', error);
            }
          };
          fetchUsers();
    },[])
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3001/users/${id}`);
          setUsers(users.filter(user => user.id !== id));
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      };
    return(
        <div className="d-flex">
         <Sidebar />
         <div  className="ms-5 ps-4">
         <div className="my-4">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Users</h2>
            <button
              className="btn btn-primary"
              onClick={() => {
                setCurrentUser(null);
                setShowModal(true);
              }}
            >
              <Plus className="me-1" /> Add User
            </button>
          </div>
        </div>

        <div style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>
          <table className="table table-striped table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{new Date(user.dob).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          setCurrentUser(user);
                          setShowModal(true);
                        }}
                      >
                        <Pencil />
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
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

        <UserModal
          show={showModal}
          onHide={() => setShowModal(false)}
          user={currentUser}
          setUsers={setUsers}
        />
      </div>
        </div>
    )
}

export default Users;