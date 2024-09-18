import React from 'react';
import Navigation from '../components/dashboard/Navigation';
import ArticleForm from '../components/form/ArticleForm';
import ArticleTable from '../components/table/ArticleTable';

const Articles = () => {
  return (
    <div>
      <main className="w-full h-screen flex flex-row relative">
      <Navigation />
      <section className="flex flex-col p-10 ml-20 mb-20 w-full gap-5">
        <h1 className="text-4xl text-teal-700">Articles</h1>

        {/* Overview Section */}
        
        <ArticleForm/>
        <ArticleTable/>
      </section>
    </main>
    </div>
  );
};

export default Articles;