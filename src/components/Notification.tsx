// src/components/NotificationBell.tsx
import { useState } from 'react';
import { Bell, XCircle } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'Lampu ruang tamu menyala otomatis sesuai jadwal.', isRead: false },
    { id: 2, message: 'Baterai sensor pintu hampir habis.', isRead: false },
    { id: 3, message: 'Perangkat di dapur offline.', isRead: true },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    // Saat dropdown dibuka, tandai semua notifikasi sebagai sudah dibaca
    if (!isOpen) {
      setNotifications(
        notifications.map(n => ({ ...n, isRead: true }))
      );
    }
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Tombol Lonceng dengan Badge */}
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition-colors duration-200"
      >
        <Bell size={24} className="text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Notifikasi */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-54 bg-white rounded-lg shadow-xl overflow-hidden z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Notifikasi</h3>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-800">
              <XCircle size={20} />
            </button>
          </div>
          <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <li key={n.id} className={`p-4 transition-colors duration-200 ${!n.isRead ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <p className={`text-sm ${!n.isRead ? 'font-semibold text-blue-800' : 'text-gray-700'}`}>
                    {n.message}
                  </p>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500 italic text-sm">Tidak ada notifikasi baru.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;