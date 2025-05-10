import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider,AuthContext } from './services/AuthContext';
import Login from './pages/auth/Login';


const App = () => {
  return (
   
      <BrowserRouter>
       <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />         
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    
  );
};

export default App;