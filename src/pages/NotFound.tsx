// src/components/NotFound.tsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-lg text-gray-600 mb-8">
        Maaf, halaman yang Anda cari tidak ada.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

export default NotFound;