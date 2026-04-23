import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS } from '../mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('pcd_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    if (!email.endsWith('@svce.ac.in')) {
      return { success: false, message: "Only @svce.ac.in email addresses are permitted access." };
    }
    const foundUser = USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('pcd_user', JSON.stringify(userData));
      return { success: true, role: foundUser.role };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pcd_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
