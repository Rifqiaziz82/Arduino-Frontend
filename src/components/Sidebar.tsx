// src/components/Sidebar.tsx
import { Link } from 'react-router-dom';
import { Cable } from 'lucide-react';
import NotificationBell from './Notification';

const Sidebar = () => {
  return (
    <div className="hidden lg:flex fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 min-h-screen p-4 flex-col">
      <div className="flex gap-3 text-2xl font-bold mb-8 align-center " ><Cable className="align-center justify-center"/>Smart Home
      <NotificationBell />
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <Link
              to="/"
              className="block p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/schedule"
              className="block p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Jadwal
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/settings"
              className="block p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Pengaturan
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto p-2 text-sm text-gray-400">
        © 2025 Electrical Controller App by Kelompok 5
      </div>
    </div>
  );
};

export default Sidebar;