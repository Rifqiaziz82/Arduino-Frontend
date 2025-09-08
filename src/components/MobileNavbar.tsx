// src/components/MobileNavbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Settings } from 'lucide-react';

const MobileNavbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Jadwal', path: '/schedule', icon: Clock },
    { name: 'Pengaturan', path: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed pb-2 pt-2 bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const colorClass = isActive ? 'text-blue-600' : 'text-gray-500';

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center text-sm font-medium transition-colors duration-200 ${colorClass}`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavbar;