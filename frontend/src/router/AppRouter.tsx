import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import UserList from '../components/UserList';
import UserPrograms from '../components/UserPrograms';
import ProgramStudents from '../components/ProgramStudents';
import ProgramList from '../components/ProgramList';
import ProgramDetails from '../components/ProgramDetails';
import Login from '../components/Login';
import apiService from '../services/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.setToken(token);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
      <Route path="/programs" element={<ProtectedRoute><ProgramList /></ProtectedRoute>} />
      <Route path="/programs/:programId" element={<ProtectedRoute><ProgramDetails /></ProtectedRoute>} />
      <Route path="/users/:userId/programs" element={<ProtectedRoute><UserPrograms /></ProtectedRoute>} />
      <Route path="/programs/:programId/students" element={<ProtectedRoute><ProgramStudents /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRouter;