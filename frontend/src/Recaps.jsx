import React, { useState, useMemo } from 'react';

// Consolidated Recap Data
const blogPostsData = [
  {
    "id": 1,
    "week": 1, // Added week number
    "title": "Game 1: Purple Edges Green in Season Opener",
    "author": "League Correspondent",
    "date": "2025-10-01",
    "category": "Recap",
    "summary": "The Fall League season started with a close match between Purple and Green. Despite Green's strong start led by Matt Spear and Tavian Barrino, Purple's balanced attack secured a 71-64 victory, powered by ball movement and four players in double figures.",
    "content": "Week 1 \nWeek one of the Revolution Fall League got off to a sizzling start.\nThere were surprise wins, forty-point showcases, and even a fifty-four-point clinic by an early MVP contender.\nLet’s get into the action.\n\nGame 1: Purple vs. Green\nThe first game started hot and heavy.\nThe dynamic duo of Matt “Swiss Army knife” Spear and Tavian “The Smooth Operator” Barrino led Green to an early lead. Spear got to the cup at will, while Barrino showcased a lights-out shooting stroke. Meanwhile, Brody Snow scored timely buckets.\nDespite their play, Purple held a 37-35 lead at halftime.\nIn the second half, Purple stretched that lead.\nBall movement and player touches were the secret sauce to their offensive output. Logan Tobin led the way, followed by “Mr. Consistent”, Kolby Bradford. Rounding out the scoring action were Kaleb Swetty and Fin Mitchell.\nThe quartet each scored in double figures, leading to a final score of 71-64, Purple.\nPurple Top Performers\nLogan Tobin - 18 points, 9 rebounds\nFin Mitchell - 13 points, 9 rebounds\nKolby Bradford - 16 points, 3 rebounds, 4 assists, 3 steals\nKaleb Swetty - 15 points, 4 rebounds, 2 steals\nGreen Top Performers\nBrody Snow - 10 points\nMatt Spear - 29 points, 15 rebounds, 3 assists, and 2 steals.\nTavian Barrino - 22 points, 7 rebounds, 4 assists, 2 steals"
  },
  {
    "id": 2,
    "week": 1, // Added week number
    "title": "Game 2: Black Blows Out Light Blue; MVP Candidate Shines",
    "author": "League Correspondent",
    "date": "2025-10-01",
    "category": "MVP Watch",
    "summary": "Black dominated Light Blue in a decisive 98-54 victory. The team's MVP candidate delivered a spectacular 54-point performance, establishing Black as the early favorite in the league. Light Blue's Jibril Abdullahi led his team with 23 points.",
    "content": "Game 2: Black vs. Light Blue\nThis game was a one-sided affair.\nBlack blew the doors off Light Blue, winning 98-54. The Black team was led by an early MVP candidate, who put on a scoring clinic. His fifty-four-point performance put the rest of the league on notice. Black is the team to beat.\nLight Blue Top Performers\nJibril Abdullahi - 23 points, 4 rebounds, 3 assists, 2 steals\nMatt Riordan - 13 points, 9 rebounds, 2 assists, 3 blocks\nBlack Top Performers\nMVP Candidate - 54 points, 15 rebounds, 5 assists, 3 blocks, 3 steals\nKyle Mayor - 15 points, 3 rebounds, 2 assists\nBrandon Bigelow - 10 points, 3 rebounds, 5 assists"
  },
  {
    "id": 3,
    "week": 9, // Added week number
    "title": "Week 9 Finale: Yellow Stuns Light Blue in Final Regular Season Game",
    "author": "League Correspondent",
    "date": "2025-11-20",
    "category": "Upset Alert",
    "summary": "The Yellow team pulled off a shocking upset against the heavily favored Light Blue squad. Led by Manny Robertson's dominant 23-point, 15-rebound performance, Yellow won 71-60, locking in the final regular season standings.",
    "content": "Game 1: Light Blue vs. Yellow\nLight Blue came out flat, and Yellow capitalized. They led by as much as fifteen at one point. Yellow’s center, Manny Robertson, was a beast on the boards. He was a force to be reckoned with. Yellow’s bench came up big, too. Kassian Prior, Jack Lloyd, Kyle Mayor, and Brandon Bigelow came up big in the upset, too.\nThe final score was 71-60, Yellow.\nLight Blue Top Performers\nJibril Abdullahi - 28 points, 4 rebounds, 3 assists, 3 steals\nMatt Riordan - 17 points, 9 rebounds, 2 assists, 3 blocks, 2 steals\nYellow Top Performers\nManny Robertson - 23 points, 15 rebounds, 3 assists, 3 blocks\nKassian Prior - 11 points, 15 rebounds\nJack Lloyd - 12 points, 3 rebounds, 2 assists\nBrandon Bigelow - 10 points, 3 rebounds, 5 assists\nThe Alta Group Player of the Game - Manny Robertson"
  },
  {
    "id": 4,
    "week": null, // Not a weekly recap
    "title": "Final Regular Season Standings: Black Goes Undefeated",
    "author": "League Statistician",
    "date": "2025-11-20",
    "category": "Standings",
    "summary": "The Revolution Men’s Basketball Fall League 2025 regular season is officially over. Black finishes a flawless 9-0 to take the top seed. Light Blue and White finish 7-2, setting up an exciting playoff bracket.",
    "content": "The Final Regular Season Standings for the Revolution Men’s Basketball Fall League 2025:\n\nBLACK 9-0\nLIGHT BLUE 7-2\nWHITE 7-2\nPURPLE 5-4\nGREEN 5-4\nRED 3-6\nBLUE 3-6\nYELLOW 2-7\nGRAY 2-7\nORANGE 1-8"
  },
  {
    "id": 5,
    "week": null, // Not a weekly recap
    "title": "Playoff Questions & Thanks to Our New Sponsors",
    "author": "Chris Nolan",
    "date": "2025-11-21",
    "category": "Analysis & Sponsorship",
    "summary": "We preview the playoffs with questions about whether Black can finish the run and if the 7-2 teams can make the finals. Also, a big thank you to our new partners: Namaste Kitchens and The Alta Group.",
    "content": "Some questions as we enter the playoffs:\nWill Black run the table?\nCan the 7-2 teams (Light Blue/White) find a way to make it to the Finals?\nWill there be upsets in the first round?\n\nBig thank you to our new sponsors, Namaste Kitchens and The Alta Group! Check them out if you haven’t yet."
  },
  {
    "id": 6,
    "week": null, // Not a weekly recap
    "title": "Warden's Wisdom Invitation: Mindfulness for Life",
    "author": "Warden's Wisdom Team",
    "date": "2025-11-21",
    "category": "Wellness",
    "summary": "Warden’s Wisdom, a mindfulness-based coaching service, offers an invitation for self-examination: Stay curious, stay open, and minimize judgments for a life well-lived.",
    "content": "This recap was brought to you by Warden’s Wisdom, a mindfulness-based coaching service to help you overcome anxiety and stress with simple, customized mindfulness practices.\n\nWarden’s Wisdom Invitation of the Week: “It’s okay to examine yourself. An examined life is a life well-lived. But be mindful of the approach. Stay curious. Stay open. And minimize judgments. You are a human after all.”"
  }
];

// Helper function to format the date
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    return dateString;
  }
};

// Component for a single blog card
const RecapCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const displayContent = isExpanded ? post.content : post.summary;

  // Inline style for the summary overflow effect
  const collapsedStyle = {
    maxHeight: '120px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'max-height 0.3s ease-in-out',
  };

  const fadeStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40px',
    background: 'linear-gradient(to top, white, rgba(255, 255, 255, 0))',
    pointerEvents: 'none',
  };

  return (
    <div className="col-md-6 mb-4">
      <div className="card shadow-lg h-100 d-flex flex-column rounded-lg border-2 border-primary">
        <div className="card-body d-flex flex-column">
          
          {/* Category Tag */}
          <span className="badge rounded-pill bg-secondary text-light align-self-start mb-2">
            {post.category}
          </span>
          
          {/* Title */}
          <h5 className="card-title fw-bolder text-dark mb-2">{post.title}</h5>
          
          {/* Metadata */}
          <p className="card-text text-muted small mb-3">
            <i className="bi bi-person-fill me-1"></i>
            {post.author} | 
            <i className="bi bi-calendar me-1 ms-2"></i>
            {formatDate(post.date)}
          </p>

          {/* Content Area */}
          <div className="card-text flex-grow-1 position-relative mb-3">
            <div style={isExpanded ? {} : collapsedStyle} className="text-secondary whitespace-pre-wrap">
              {displayContent}
            </div>
            
            {!isExpanded && (
              <div style={fadeStyle}></div>
            )}
          </div>

          {/* Read More/Show Less Button */}
          <div className="mt-auto pt-3 border-t border-light">
            <button
              onClick={toggleExpand}
              className="btn btn-link p-0 text-primary fw-bold text-decoration-none"
            >
              {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Recaps Component
const Recaps = () => {
  // Identify unique weeks available, sorting them descendingly
  const uniqueWeeks = useMemo(() => {
    const weeks = blogPostsData
      .filter(post => post.week !== null)
      .map(post => post.week);
    // Use Set to get unique weeks, spread to array, then sort descending
    return [...new Set(weeks)].sort((a, b) => b - a);
  }, []);

  // Set the default active week to the latest available week
  const [activeWeek, setActiveWeek] = useState(uniqueWeeks[0] || null);
  
  // Filter posts based on the active week
  const filteredPosts = useMemo(() => {
    if (!activeWeek) return [];
    return blogPostsData.filter(post => post.week === activeWeek);
  }, [activeWeek]);

  // Include non-weekly news posts in a separate section
  const nonWeeklyPosts = useMemo(() => {
    return blogPostsData.filter(post => post.week === null);
  }, []);

  return (
    <div className="container-fluid bg-light p-4" style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <header className="container text-center py-5">
        <h1 className="display-4 fw-bold text-dark">
          Weekly <span className="text-primary">Recaps</span>
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Browse game summaries and analysis from each week of the Revolution Fall League 2025 season.
        </p>
      </header>
      
      {/* Week Selector Navigation */}
      <div className="container mb-5">
        <h3 className="text-center text-dark mb-3 fs-5 fw-bold">Select Week:</h3>
        <div className="d-flex justify-content-center flex-wrap gap-2">
          {uniqueWeeks.map(week => (
            <button
              key={week}
              onClick={() => setActiveWeek(week)}
              className={`btn ${activeWeek === week ? 'btn-primary' : 'btn-outline-primary'} fw-bold px-4 rounded-pill shadow-sm transition duration-150 ease-in-out`}
            >
              Week {week}
            </button>
          ))}
        </div>
      </div>
      
      <main className="container py-4">
        {activeWeek && (
          <>
            <h2 className="text-center text-dark mb-4 display-6 fw-bold border-bottom border-primary pb-2">
              Week {activeWeek} Recaps
            </h2>
            <div className="row">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <RecapCard key={post.id} post={post} />
                ))
              ) : (
                <div className="col-12 text-center text-muted py-5">
                  No recaps available for Week {activeWeek}.
                </div>
              )}
            </div>
          </>
        )}

        {/* General News Section for non-weekly posts */}
        {nonWeeklyPosts.length > 0 && (
          <div className="mt-6 pt-6 border-t border-secondary-subtle">
            <h2 className="text-center text-dark mb-4 display-6 fw-bold border-bottom border-secondary pb-2">
              League News & Analysis
            </h2>
            <div className="row justify-content-center">
              {nonWeeklyPosts.map((post) => (
                <RecapCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      {/* Required Links - Fixed crossorigin to crossOrigin */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" crossOrigin="anonymous" />
    </div>
  );
};

export default Recaps;