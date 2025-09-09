// src/components/Schedule.tsx
import React, { useState } from 'react';
import { Lightbulb, PlusCircle, Trash2 } from 'lucide-react';

// Tipe data untuk sebuah jadwal
interface ScheduleItem {
  id: number;
  room: string;
  device: string;
  action: 'on' | 'off';
  time: string;
}


const Schedule = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    { id: 1, room: 'Ruang Tamu', device: 'Lampu Utama', action: 'on', time: '18:00' },
    { id: 2, room: 'Kamar Tidur', device: 'Lampu Meja', action: 'off', time: '23:00' },
  ]);

  const [newSchedule, setNewSchedule] = useState({
    room: 'Ruang Tamu',
    device: 'Lampu Utama',
    action: 'on',
    time: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const addSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchedule.time) return;

    const id = schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1;
    setSchedules([...schedules, { ...newSchedule, id }]);
    setNewSchedule({ room: 'Ruang Tamu', device: 'Lampu Utama', action: 'on', time: '' });
  };

  const deleteSchedule = (id: number) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Jadwal Otomatis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kolom Kiri: Form Tambah Jadwal */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Tambah Jadwal Baru</h2>
          <form onSubmit={addSchedule} className="space-y-4">
            <div>
              <label className="block text-gray-600">Ruangan</label>
              <select
                name="room"
                value={newSchedule.room}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="Ruang Tamu">Ruang Tamu</option>
                <option value="Kamar Tidur">Kamar Tidur</option>
                <option value="Dapur">Dapur</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600">Perangkat</label>
              <select
                name="device"
                value={newSchedule.device}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="Lampu Utama">Lampu Utama</option>
                <option value="Lampu Meja">Lampu Meja</option>
                <option value="Lampu Tidur">Lampu Tidur</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600">Aksi</label>
              <select
                name="action"
                value={newSchedule.action}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="on">Nyalakan</option>
                <option value="off">Matikan</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600">Waktu</label>
              <input
                type="time"
                name="time"
                value={newSchedule.time}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              <PlusCircle size={20} className="mr-2" /> Tambah Jadwal
            </button>
          </form>
        </div>

        {/* Kolom Kanan: Daftar Jadwal */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Daftar Jadwal</h2>
          <div className="space-y-4">
            {schedules.length === 0 ? (
              <p className="text-gray-500 italic">Belum ada jadwal yang dibuat.</p>
            ) : (
              schedules.map((schedule) => (
                <div key={schedule.id} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${schedule.action === 'on' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-600'}`}>
                      <Lightbulb size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {schedule.room} - {schedule.device}
                      </p>
                      <p className="text-sm text-gray-600">
                        Aksi: <span className="font-medium">{schedule.action === 'on' ? 'Nyalakan' : 'Matikan'}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-gray-700">{schedule.time}</span>
                    <button
                      onClick={() => deleteSchedule(schedule.id)}
                      className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;