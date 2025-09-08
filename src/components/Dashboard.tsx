// src/components/Dashboard.tsx
import React, { useState } from 'react';
import { Lightbulb, Zap, Sun, Cloud, DollarSign, Home } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// --- Tipe Data (Interfaces) ---
interface UsageData {
  hour: string;
  usage: number;
}

interface Lamp {
  id: number;
  room: string;
  isOn: boolean;
}

// --- Komponen LampControl ---
const LampControl: React.FC<{ lamp: Lamp; toggleLamp: (id: number) => void }> = ({ lamp, toggleLamp }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md transition-colors duration-300 space-between ${
        lamp.isOn ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-800'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">{lamp.room}</h3>
        {lamp.isOn ? <Sun size={20} className="text-yellow-500" /> : <Lightbulb size={20} className="text-gray-500" />}
      </div>
      <p className="text-sm">{lamp.isOn ? 'Menyala' : 'Mati'}</p>
      <button
        onClick={() => toggleLamp(lamp.id)}
        className={`mt-4 w-full py-2 px-4 rounded-md font-semibold transition-colors duration-200
        ${lamp.isOn ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-700 text-white hover:bg-gray-800'}`}
      >
        {lamp.isOn ? 'Matikan' : 'Nyalakan'}
      </button>
    </div>
  );
};

// --- Komponen UsageChart ---
const UsageChart: React.FC<{ data: UsageData[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="hour" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip />
        <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// --- Komponen Utama: Dashboard ---
const Dashboard = () => {
  // Data simulasi
  const [usageData, setUsageData] = useState<UsageData[]>([
    { hour: '00:00', usage: 0.5 }, { hour: '01:00', usage: 0.4 }, { hour: '02:00', usage: 0.3 }, { hour: '03:00', usage: 0.35 }, { hour: '04:00', usage: 0.5 }, { hour: '05:00', usage: 0.8 }, { hour: '06:00', usage: 1.2 }, { hour: '07:00', usage: 1.5 }, { hour: '08:00', usage: 2.0 }, { hour: '09:00', usage: 1.8 }, { hour: '10:00', usage: 1.6 }, { hour: '11:00', usage: 1.7 }, { hour: '12:00', usage: 2.2 }, { hour: '13:00', usage: 2.5 }, { hour: '14:00', usage: 2.3 }, { hour: '15:00', usage: 2.1 }, { hour: '16:00', usage: 2.4 }, { hour: '17:00', usage: 2.6 }, { hour: '18:00', usage: 3.0 }, { hour: '19:00', usage: 3.5 }, { hour: '20:00', usage: 3.2 }, { hour: '21:00', usage: 2.8 }, { hour: '22:00', usage: 2.5 }, { hour: '23:00', usage: 2.0 },
  ]);

  const [lights, setLights] = useState<Lamp[]>([
    { id: 1, room: 'Ruang Tamu', isOn: true },
    { id: 2, room: 'Dapur', isOn: false },
    { id: 3, room: 'Kamar Tidur', isOn: true },
  ]);

  // Data baru
  const [weatherData, setWeatherData] = useState({ temp: 28, condition: 'Cerah' });
  const [costData, setCostData] = useState(5500); // Perkiraan biaya harian

  const toggleLamp = (id: number) => {
    setLights(
      lights.map((lamp) =>
        lamp.id === id ? { ...lamp, isOn: !lamp.isOn } : lamp
      )
    );
  };

  const totalUsage = usageData.reduce((sum, data) => sum + data.usage, 0).toFixed(1);
  const lightsOnCount = lights.filter(lamp => lamp.isOn).length;

  return (
    <div className="flex-1 p-4 sm:p-8 bg-gray-100 min-h-screen"> {/* Sesuaikan padding */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center sm:text-left">Dashboard</h1>
      
      {/* Tata letak grid untuk layar mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Ringkasan Penggunaan */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center space-y-2 text-center">
          <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600">
            <Zap size={20} className="sm:w-6 sm:h-6" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500">Total Penggunaan</p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{totalUsage} kWh</h2>
        </div>
        
        {/* Ringkasan Lampu */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center space-y-2 text-center">
          <div className={`p-2 sm:p-3 rounded-full ${lightsOnCount > 0 ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-600'}`}>
            <Lightbulb size={20} className="sm:w-6 sm:h-6" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500">Lampu Menyala</p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{lightsOnCount}</h2>
        </div>
        
        {/* Kartu Cuaca */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center space-y-2 text-center">
          <div className="p-2 sm:p-3 rounded-full bg-green-100 text-green-600">
            <Cloud size={20} className="sm:w-6 sm:h-6" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500">Cuaca</p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{weatherData.temp}°C</h2>
        </div>

        {/* Kartu Perkiraan Biaya */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center space-y-2 text-center">
          <div className="p-2 sm:p-3 rounded-full bg-red-100 text-red-600">
            <DollarSign size={20} className="sm:w-6 sm:h-6" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500">Biaya Harian</p>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Rp {costData.toLocaleString('id-ID')}</h2>
        </div>
      </div>
      
      {/* Tata letak grid untuk grafik dan kontrol lampu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Grafik Penggunaan */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Grafik Penggunaan Harian</h2>
          <UsageChart data={usageData} />
        </div>
        
        {/* Kontrol Lampu */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Kontrol Lampu</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lights.map((lamp) => (
              <LampControl key={lamp.id} lamp={lamp} toggleLamp={toggleLamp} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;