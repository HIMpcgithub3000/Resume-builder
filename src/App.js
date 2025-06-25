import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Intro from './pages/Intro';
import Auth from './pages/Auth';
import Builder from './pages/Builder';
import ResumeReady from './pages/ResumeReady';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const AuthContext = createContext();
export { AuthContext };
const useAuth = () => useContext(AuthContext);

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return children ? children : <Outlet />;
};

const Layout = () => (
  <div className="min-h-screen flex bg-[#F6FBF4]">
    <Sidebar />
    <div className="flex-1 flex flex-col min-h-screen ml-20 md:ml-56">
      <Navbar />
      <main className="flex-1 p-4 md:p-8 bg-[#F6FBF4]"><Outlet /></main>
    </div>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<Layout />}>
            <Route element={<RequireAuth />}>
              <Route path="/intro" element={<Intro />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/done" element={<ResumeReady />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;