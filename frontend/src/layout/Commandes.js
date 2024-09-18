import React from 'react';
import Navigation from '../components/dashboard/Navigation';
import OrderTable from '../components/table/OrderTable';
import OrderForm from '../components/form/OrderForm';

const Commandes = () => {
  return (
    <div>
      <main className="w-full h-screen flex flex-row relative">
      <Navigation />
      <section className="flex flex-col p-10 ml-20 mb-20 w-full gap-5">
        <h1 className="text-4xl text-teal-700">Commandes</h1>

        {/* Overview Section */}
        <OrderTable/>
      </section>
    </main>
    </div>
  );
};

export default Commandes;