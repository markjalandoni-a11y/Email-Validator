
import React, { useState } from 'react';
import BulkEmailValidator from './components/BulkEmailValidator';
import EmailValidator from './components/EmailValidator';

type View = 'single' | 'bulk';

function App() {
  const [view, setView] = useState<View>('single');

  const header = (
    <div className="text-center p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
        Gemini Email Validator
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        AI-powered email verification for single or bulk lists.
      </p>
    </div>
  );

  const viewToggle = (
    <div className="flex justify-center my-8">
      <div className="flex rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
        <button
          onClick={() => setView('single')}
          className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            view === 'single'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Single Validator
        </button>
        <button
          onClick={() => setView('bulk')}
          className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            view === 'bulk'
              ? 'bg-blue-600 text-white shadow'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Bulk Validator
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      {header}
      <main className="container mx-auto px-4 py-8">
        {viewToggle}
        <div className="max-w-4xl mx-auto">
          {view === 'single' ? <EmailValidator /> : <BulkEmailValidator />}
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
}

export default App;
