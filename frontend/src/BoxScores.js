import React from 'react';
import img1 from './revolution_bball_stats/1.jpg';
import img2 from './revolution_bball_stats/2.jpg';
import img3 from './revolution_bball_stats/3.jpg';
import img4 from './revolution_bball_stats/4.jpg';
import img5 from './revolution_bball_stats/5.jpg';
import img6 from './revolution_bball_stats/6.jpg';
import img7 from './revolution_bball_stats/7.jpg';
import img8 from './revolution_bball_stats/8.jpg';   
import img9 from './revolution_bball_stats/9.jpg';
import img10 from './revolution_bball_stats/10.jpg';
import img11 from './revolution_bball_stats/11.jpg';
import img12 from './revolution_bball_stats/12.jpg';
import img13 from './revolution_bball_stats/13.jpg';
import img14 from './revolution_bball_stats/14.jpg';
import img15 from './revolution_bball_stats/15.jpg';
import img16 from './revolution_bball_stats/16.jpg';    
import img17 from './revolution_bball_stats/17.jpg';
import img18 from './revolution_bball_stats/18.jpg';
import img19 from './revolution_bball_stats/19.jpg';
import img20 from './revolution_bball_stats/20.jpg';  
import img21 from './revolution_bball_stats/21.jpg';
import img22 from './revolution_bball_stats/22.jpg';
import img23 from './revolution_bball_stats/23.jpg';
import img24 from './revolution_bball_stats/24.jpg';
import img25 from './revolution_bball_stats/25.jpg';
import img26 from './revolution_bball_stats/26.jpg';
import img27 from './revolution_bball_stats/27.jpg';
import img28 from './revolution_bball_stats/28.jpg';
import img29 from './revolution_bball_stats/29.jpg';
import img30 from './revolution_bball_stats/30.jpg';
import img31 from './revolution_bball_stats/31.jpg';
import img32 from './revolution_bball_stats/32.jpg';
import img33 from './revolution_bball_stats/33.jpg';
//import img34 from './revolution_bball_stats/34.jpg';
import img35 from './revolution_bball_stats/35.jpg';
import img36 from './revolution_bball_stats/36.jpg';
import img37 from './revolution_bball_stats/37.jpg';
import img38 from './revolution_bball_stats/38.jpg';
import img39 from './revolution_bball_stats/39.jpg';
import img40 from './revolution_bball_stats/40.jpg';
import img41 from './revolution_bball_stats/41.jpg';
import img42 from './revolution_bball_stats/42.jpg';
import img43 from './revolution_bball_stats/43.jpg';
import img44 from './revolution_bball_stats/44.jpg';
import img45 from './revolution_bball_stats/45.jpg';

// You can add more imports as needed for additional box score images     

// Mock Box Score Data (using placeholder images)
// This structure is ready to accept URLs pointing to your JPG files.
const mockBoxScores = [
  { id: 1, imageUrl: img1 },
  { id: 2, imageUrl: img2 },
  { id: 3, imageUrl: img3 },
  { id: 4, imageUrl: img4 },
    { id: 5, imageUrl: img5 },
    { id: 6, imageUrl: img6 },
    { id: 7, imageUrl: img7 },
    { id: 8, imageUrl: img8 },
    { id: 9, imageUrl: img9 },
    { id: 10, imageUrl: img10 },
    { id: 11, imageUrl: img11 },
    { id: 12, imageUrl: img12 },
    { id: 13, imageUrl: img13 },
    { id: 14, imageUrl: img14 },
    { id: 15, imageUrl: img15 },
    { id: 16, imageUrl: img16 },
    { id: 17, imageUrl: img17 },
    { id: 18, imageUrl: img18 },
    { id: 19, imageUrl: img19 },
    { id: 20, imageUrl: img20 },
    { id: 21, imageUrl: img21 },
    { id: 22, imageUrl: img22 },
    { id: 23, imageUrl: img23 },
    { id: 24, imageUrl: img24 },
    { id: 25, imageUrl: img25 },
    { id: 26, imageUrl: img26 },
    { id: 27, imageUrl: img27 },
    { id: 28, imageUrl: img28 },
    { id: 29, imageUrl: img29 },
    { id: 30, imageUrl: img30 },
    { id: 31, imageUrl: img31 },
    { id: 32, imageUrl: img32 },
    { id: 33, imageUrl: img33 },
   // { id: 34, imageUrl: img34 },
    { id: 35, imageUrl: img35 },
    { id: 36, imageUrl: img36 },
    { id: 37, imageUrl: img37 },
    { id: 38, imageUrl: img38 },
    { id: 39, imageUrl: img39 },
    { id: 40, imageUrl: img40 },
    { id: 41, imageUrl: img41 },
    { id: 42, imageUrl: img42 },
    { id: 43, imageUrl: img43 },
    { id: 44, imageUrl: img44 },
    { id: 45, imageUrl: img45 },
];

/**
 * A component to display a collection of box score images.
 * This is the component you requested, containing just the images.
 */
const BoxScores = () => {
  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Recent Box Scores
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockBoxScores.map((score) => (
          <div
            key={score.id}
            className="bg-white shadow-xl rounded-xl overflow-hidden transform hover:scale-[1.02] transition duration-300 ease-in-out border-t-4 border-indigo-600"
          >
            <div className="p-4 bg-indigo-50">
              <p className="text-lg font-semibold text-indigo-800 truncate">
                {score.title}
              </p>
            </div>
            <div className="aspect-video">
              <img
                src={score.imageUrl} // This will be the URL to your JPG file
                alt={score.title}
                className="w-full h-full object-cover transition-opacity duration-500"
                // Placeholder image fallback in case the URL fails
                onError={(e) => {
                  e.target.onerror = null; // Prevents infinite loop
                  e.target.src = 'https://placehold.co/600x400/cccccc/000000?text=Image+Unavailable';
                }}
              />
            </div>
          </div>
        ))}
        {/* Example of a manually inserted empty state card */}
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 mb-3"
          >
            <path d="M4 17l6-6 6 6 4-4" />
            <path d="M18 10h.01" />
            <rect width="20" height="18" x="2" y="3" rx="2" ry="2" />
          </svg>
          <p className="text-sm font-medium">No games currently live.</p>
        </div>
      </div>
    </div>
  );
};

/**
 * The main application component.
 */
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">

      <main className="max-w-6xl mx-auto py-8">
        <BoxScores />
      </main>

      <footer className="p-4 bg-gray-200 text-center text-gray-600 text-sm mt-10">
        &copy; 2024 SportsBox Tracker. All scores are simulated.
      </footer>
    </div>
  );
};

export default App;