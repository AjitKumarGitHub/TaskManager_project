import React from 'react';

const Welcome = () => {
  const quotes = [
    "The secret of getting ahead is getting started. - Mark Twain",
    "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "The future depends on what you do today. - Mahatma Gandhi",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 absolute">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Task Manager!</h1>
        <p className="text-lg mb-6">Your productivity starts here. Manage your tasks efficiently and achieve your goals.</p>
        <h2 className="text-xl font-semibold mb-4">Inspirational Quotes:</h2>
        <ul className="list-disc list-inside mb-4">
          {quotes.map((quote, index) => (
            <li key={index} className="mb-2 text-gray-700 italic">
              {quote}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-500">Let's get started!</p>
      </div>
    </div>
  );
};

export default Welcome;