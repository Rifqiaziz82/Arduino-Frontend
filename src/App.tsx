import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Schedule from './pages/Schedule';
import Settings from './pages/Setting';
import NotFound from './pages/NotFound';
import MobileNavbar from './components/MobileNavbar';
import Login from './pages/Login';
import PrivateRoutes from './pages/PrivatRoutes';

export default function App (){
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rute publik, bisa diakses siapa saja */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        
        {/* Rute privat, hanya bisa diakses setelah login */}
        <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
          <Route 
            path="/*" 
            element={
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col pb-16 lg:pb-0 lg:ml-64">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <MobileNavbar />
              </div>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
