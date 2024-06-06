import React from 'react';

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
    {/* Header */}
    <header className="bg-green-600 p-4 text-white text-center">
      <h1 className="text-4xl font-bold">Supermarket XYZ</h1>
      <p className="mt-2">Everything you need just a click away</p>
    </header>

    {/* Banner */}
    <section className="bg-cover bg-center h-64">
      <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
        <h2 className="text-white text-3xl md:text-5xl font-bold">Great Deals of the Month</h2>
      </div>
    </section>

    {/* Categories */}
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold">Fruits and Vegetables</h3>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold">Meat and Fish</h3>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold">Dairy and Eggs</h3>
        </div>
      </div>
    </section>

    {/* Special Offers */}
    <section className="p-6 bg-gray-200">
      <h2 className="text-2xl font-bold mb-4">Special offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold">Offer 1</h3>
          <p className="mt-2">Description of special offer 1.</p>
          <p className="mt-2 text-green-600 font-bold">9.99€</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h3 className="text-xl font-semibold">Offer 2</h3>
          <p className="mt-2">Description of special offer 2.</p>
          <p className="mt-2 text-green-600 font-bold">19.99€</p>
        </div>
      </div>
    </section>
  </div>
  );
}

export default Home;
