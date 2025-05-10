import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider,AuthContext } from './services/AuthContext';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};
const App = () => {
  return (
   
      <BrowserRouter>
       <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />  
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />      
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    
  );
};

export default App;