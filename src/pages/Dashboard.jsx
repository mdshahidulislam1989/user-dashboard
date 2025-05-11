import { useState, useEffect } from 'react';
import Sidebar from './navigation/Sidebar';
import { BarChart, PieChart, DonutChart, LineChart } from '../services/Charts';
import axios from 'axios';
import '../styles/dashboard.scss';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="dashboard-page">
      <Sidebar title="Dashboard" />
      
      <div className="dashboard-content">
        <div className="users-table-wrapper">
          <h3>User Management</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>   
                  <th>Id</th>      
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Status</th>
                  <th>Registered On</th>          
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <td>{idx+1}</td>
                    <td>{user.name}</td>
                    <td className="text-truncate">{user.email}</td>
                    <td>{user.dob}</td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-title">User Activity</div>
            <div className="chart-container">
              <BarChart data={users} />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-title">User Status</div>
            <div className="chart-container">
              <PieChart data={users} />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-title">Age Distribution</div>
            <div className="chart-container">
              <DonutChart data={users} />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-title">Monthly Signups</div>
            <div className="chart-container">
              <LineChart data={users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;