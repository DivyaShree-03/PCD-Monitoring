import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to={user.role === 'FACULTY' ? '/faculty-dashboard' : '/student-dashboard'} replace />;
  
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={user.role === 'FACULTY' ? '/faculty-dashboard' : '/student-dashboard'} />} />
      
      <Route path="/student-dashboard" element={
        <ProtectedRoute role="STUDENT">
          <StudentDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/faculty-dashboard" element={
        <ProtectedRoute role="FACULTY">
          <FacultyDashboard />
        </ProtectedRoute>
      } />

      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
