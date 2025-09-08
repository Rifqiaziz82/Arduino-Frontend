// src/components/Settings.tsx
import React, { useState } from 'react';
import { User, BellRing, Settings2, Shield, Power } from 'lucide-react';

// Tipe data untuk preferensi notifikasi
interface NotificationPreferences {
  lowBattery: boolean;
  offlineDevice: boolean;
  scheduledTask: boolean;
}

const Settings = () => {
  const [username, setUsername] = useState('JohnDoe');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>({
    lowBattery: true,
    offlineDevice: true,
    scheduledTask: false,
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleNotificationChange = (pref: keyof NotificationPreferences) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [pref]: !prev[pref]
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini bisa ditambahkan validasi dan logika untuk menyimpan data
    alert('Pengaturan berhasil disimpan!');
  };

  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Pengaturan</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-8">
        {/* Bagian Profil */}
        <div className="border-b pb-6 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center mb-4">
            <User size={20} className="mr-2 text-blue-500" /> Pengaturan Profil
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nama Pengguna</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </form>
        </div>

        {/* Bagian Keamanan */}
        <div className="border-b pb-6 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center mb-4">
            <Shield size={20} className="mr-2 text-red-500" /> Keamanan
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="old-password" className="block text-sm font-medium text-gray-700">Kata Sandi Lama</label>
              <input
                type="password"
                id="old-password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Kata Sandi Baru</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          </form>
        </div>

        {/* Bagian Notifikasi */}
        <div className="border-b pb-6 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center mb-4">
            <BellRing size={20} className="mr-2 text-purple-500" /> Notifikasi
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Baterai Rendah</span>
                <p className="text-sm text-gray-500">Dapatkan notifikasi ketika baterai perangkat rendah.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.lowBattery}
                onChange={() => handleNotificationChange('lowBattery')}
                className="form-checkbox h-5 w-5 text-purple-600 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Perangkat Offline</span>
                <p className="text-sm text-gray-500">Dapatkan notifikasi jika perangkat kehilangan koneksi.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.offlineDevice}
                onChange={() => handleNotificationChange('offlineDevice')}
                className="form-checkbox h-5 w-5 text-purple-600 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-700">Jadwal Selesai</span>
                <p className="text-sm text-gray-500">Beri tahu ketika jadwal otomatis berhasil dijalankan.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.scheduledTask}
                onChange={() => handleNotificationChange('scheduledTask')}
                className="form-checkbox h-5 w-5 text-purple-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* Tombol Simpan */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
};

export default Settings;