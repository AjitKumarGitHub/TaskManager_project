import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Home from './Home'; // Import the Home component
import Login from './Login';
import Layout from './layout';
import Profile from './Profile';
import Dashboard from './Dashboard';
import LeftSideBar from './LeftSideBar';
import CompletedTask from './completedTask';
import NavLinkUrl from './NavLink';
import Settings from './setting';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import ProtectedRoute from './ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <AuthProvider>
      <div>
        <NavLinkUrl />
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} /> // Set Home as the landing page
            <Route path='dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='completed' element={<CompletedTask />} />
            <Route path='setting' element={<Settings />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <LeftSideBar />
      </div>
    </AuthProvider>
  );
}

export default App;
