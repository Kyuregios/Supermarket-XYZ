import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">Página no encontrada</h2>
      <p className="text-lg text-gray-600">Lo sentimos, la página que estás buscando no existe.</p>
      <button class="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"><Link to="/">Back to homepage</Link></button>
    </div>
  );
}

export default NotFound;
