// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// =================================================================
// --- STATIC DATA DEFINITION ---
// =================================================================
const STATIC_RECAP_DATA = [
  {
    id: '0',
    title: 'Week 5 - Team was the theme of week 5.',
    author: 'League Admin',
    category: 'Intro',
    content: 'Team was the theme of week 5. We saw several momentum swings, hundred-point efforts, and one team solidifying itself as the top dog. Let\'s get into the action:',
    date: new Date('2025-10-28T00:00:00Z')
},
{
    id: '1',
    title: 'Week 5 - Game 1: Green vs Yellow',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-26',
    content: 'Green woke up with the power of espresso. Kevin "KG" Garrison played like he just had a double shot from Carrier Roasting. Garrison was all over the court, scoring from all three levels, snagging rebounds, and stepping into the passing lanes. Teammates Cyle Chappy and Brody Snow both came to play, as Chaplin hit several crucial threes and had his fair share of steals, while Snow almost collected a double-double. At halftime, the score was 33-22 in favor of Green. But something changed in the second half. Yellow banded together and made a run for the game. Captain Kyle Haley, Manny "Big Bro" Robertson, and Reg Dailey shared the scoring load and chipped away tooth and nail. Possession after possession, they got closer and closer. Score and stop. Score and stop. However, it was Green who held on and had the last laugh. The final score: 77-73, Green',
    topPerformers1: 'Green Top Performers: Kevin Garrison - 39 points, 13 rebounds, 4 assists, 9 steals, 2 blocks, Clye Chappy - 17 points, 4 rebounds, 4 steals, Brody Snow - 14 points, 8 rebounds. The Alta Group Player of the Game - Kevin Garrison',
    topPerformers2: 'Yellow Top Performers: Kyle Haley - 17 points, 14 rebounds, 3 assists, 2 steals, Manny Roberston - 21 points, 13 rebounds, 2 assists, 2 blocks, Reg Dailey - 16 points, 7 rebounds, 2 assists',
    date: new Date('2025-10-28T00:00:00Z')
},
{
    id: '2',
    title: 'Week 5 - Game 2: Black vs Purple',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-26',
    content: 'Purple gave it their best. They made the first half competitive with their balanced team effort. Chris "The Pro" Cayole and Bryan "El Toro" Rivera facilitated the offense with pace and grace. Teammate Stan "The Man" Salley had a breakout game in the paint, while Fin Mitchell also stuffed the stat sheet. Despite their team play, the halftime score was 52-42, Black. In the second half, black didn\'t turn back. Hakeem "The Dream" Faud and Tre "Grabs Mad Boards" Grubbs were a lethal 1-2 punch. Not only do their games complement each other, but the way they fill the stat sheet may have them at 1-2 for the MVP vote. They did just that throughout the game, and especially the second half. The final: 102-78, Black',
    topPerformers1: 'Black Top Performers: Hakeem Faud - 44 points, 13 rebounds, 4 assists, 4 steals, Tre Grubbs - 36 points, 16 rebounds. The Alta Group Player of the Game - Hakeem Faud',
    topPerformers2: 'Purple Top Performers: Chris Cayole - 12 points, 6 assists, Stan Salley - 26 points, 8 rebounds, 2 assists, Fin Mitchell - 10 points, 4 rebounds, 4 assists, Bryan Rivera - 9 points, 5 rebounds, 9 assists, 1 block',
    date: new Date('2025-10-28T00:00:00Z')
},
{
    id: '3',
    title: 'Week 5 - Game 3: White vs. Red',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-26',
    content: 'This game was over before halftime. "The Commish" and co. had plenty to prove. Bousono led the team with a whopping 32 points, while lacing seven three pointers. Five other teammates got into double figures: Isaiah Terrell, Jack Goga-Blacnahrd, "Mean" Joe Ruggles, Kenny Black, and Tyrone "Big Dog" Conley. Their collective attack led to a halftime lead of 51-26. The second half was more of the same, but Red had two top performers. Ben "Lights It Up" Litteken was hard to guard, and he lived up to his name. Speaking of living up to one\'s name, Cory "The Energizer Bunny" Chaplin was anything but short of energy as he zipped around the court. Unfortunately, Red needed more than a duo to step up to the dominance of White\'s depth. The final score was 115-78, White.',
    topPerformers1: 'White Top Performers: Andy Bousono - 32 points, 5 rebounds, 4 assists, 5 steals, Isaiah Terrell - 15 points, 7 rebounds, 3 steals, Jack Goga-Blacnhard - 17 points, 13 rebounds, Joe Ruggles - 16 points, 2 rebounds, 3 assists, Tyrone Conley - 18 points, 7 rebounds, 5 assists, 2 steals, Kenny Black - 14 points, 11 rebounds, 2 steals. The Alta Group Player of the Game - Andy Bousono',
    topPerformers2: 'Red Top Performers: Ben Litteken - 36 points, 6 rebounds, 3 assists, 2 steals, Cory Chaplin - 17 points, 3 rebounds, 4 assists, 2 steals',
    date: new Date('2025-10-28T00:00:00Z')
},
{
    id: '4',
    title: 'Week 5 - Game 4: Light Blue vs. Gray',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-26',
    content: 'Game four wasn\'t much better than game three. Light Blue secured a lead from the get-go, and the theme of the team continued throughout this game. For Light Blue, "Prince" Jibril Abdullahi led the way, facilitating the offense. Teammates Jeromy Anderson and Donnie Dwyer were a strong duo in the paint, while Aid Semic was also a force to be reckoned with. But the Dark Horse of the offense was Matt "The Stallion" Riordan who also played a stellar defensive game. At halftime, they held a 41-26 lead. Light Blue continued their dominance in the second half, but Gray had a couple of strong outings from John Helsel and Deng Adieng. Helsel went for a double-double, while Adieng did a little bit of everything. However, Light Blue was too strong to beat. The final: 79-51',
    topPerformers1: 'Light Blue Top Performers: Jibril Abdullahi - 14 points, 8 rebounds, 7 assists, 3 steals, Jeromy Anderson - 8 points, 8 rebounds, 2 steals, Donnie Dwyer - 11 points, 10 rebounds, 2 assists, Matt Riordan - 20 points, 8 rebounds, 4 assists, 2 blocks, Aid Semic - 20 points, 3 rebounds. The Alta Group Player of the Game - Matt Riordan',
    topPerformers2: 'Gray Top Performers: Jon Helsel - 23 points, 14 rebounds, Deng Adieng - 21 points, 6 rebounds, 2 assists',
    date: new Date('2025-10-28T00:00:00Z')
},
{
    id: '5',
    title: 'Week 5 - Game 5: Orange vs. Blue',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-26',
    content: 'The final game of the day was a tale of two halves. In the first half, Orange utilized their outside shooting to stretch the defense and build a lead. Drew Pelkey and Alex Philo led the scoring charge, while Logan Letourneau and Graden added to the offense. At halftimer, they held a 47-40 lead. However, Blue still had fight left in them. "Tenacious" Tavarius Vance and "Air" Jordan Maille led the way. Vance shot lights out from everywhere on the court, while Maille had several strong takes to the basket. Jerome Stewart also helped the squad with some seamless offensive play. By the game\'s end, Blue dismantled Orange\'s seven-point lead and took a seven-point lead of their own. The final: 84-77, Blue.',
    topPerformers1: 'Orange Top Performers: Drew Pelkey - 21 points, 11 rebounds, 5 assists, 2 steals, Logan Letourneau - 11 points, 5 rebounds, 6 assists, Alex Philo - 16 points, 6 rebounds, 2 assists, Graden - 11 points, 5 rebounds, 2 blocks',
    topPerformers2: 'Blue Top Performers: Jordan Maille - 21 points, 11 rebounds, 6 assists, 3 steals, Jerome Stewart - 14 points, 4 rebounds, 2 steals, Tavarius Vance - 38 points, 15 rebounds, 2 steals. The Alta Group Player of the Game - Tavarius Vance',
    date: new Date('2025-10-28T00:00:00Z')
},
{
    id: '6',
    title: 'Week 5 - Sponsors, Standings, and Preview',
    author: 'League Admin',
    category: 'Closing',
    content: 'League standings after week 5: BLACK 5-0, WHITE 4-1, LIGHT BLUE 4-1, PURPLE 3-2, GREEN 3-2, RED 2-3, BLUE 2-3, GRAY 1-4, YELLOW 1-4, ORANGE 0-5. Big thank you to our new sponsors, Namaste Kitchens and The Alta Group! Check them out if you haven\'t yet. This recap was brought to you by Warden\'s Wisdom, a mindfulness-based coaching service to help you overcome anxiety and stress with simple, customized mindfulness practices. Warden\'s Wisdom Invitation of the Week: "I invite you to notice something for the rest of this week. Notice when you\'re moving a bit faster than you need to. Maybe you fumble your phone in your hand. Perhaps you drop a dish as you remove it from the dishwasher. Maybe you almost get pulled over for the speed you\'re driving. When you catch yourself doing these things, ask yourself: What\'s the rush? Then, slow yourself down by 10%." Some questions as we exit week 5 and enter week 6: Will anyone beat Black? Will Hakeem and Tre split MVP? Is Blue a dark horse down the stretch? Can White\'s depth defeat black\'s dynamic duo come playoff time? Find out the answers to these questions this Sunday, starting at 8 am. You won\'t wanna miss it!',
    date: new Date('2025-10-28T00:00:00Z')
},
  {
    id: '0',
    title: 'Week 4 - The week four scores were all across the board.',
    author: 'League Admin',
    category: 'Intro',
    content: 'The week four scores were all across the board. Some were blowouts, others were barnburners, and some top-notch individual performances put a few teams over the top. Let\'s get into the action.',
    date: new Date('2025-10-21T00:00:00Z')
},
{
    id: '1',
    title: 'Week 4 - Game 1: Green vs. Blue',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-19',
    content: 'Green was without former MVP Matt "Swiss Army Knife" Spear. But they didn\'t have to fear, because Tavian Barrino, Cyle Chappy, and Brody Snow got into the flow of the game. Barrino barraged the paint with dynamite drives, while Chappy and Snow got it going from distance. The halftime score was 43-33, Green. Blue did their best to surmount a comeback. "Tenacious" Tavarius Vance, "Air" Jordan Maille, and Jerome Stewart were a trifecta who contributed to the comeback effort. Vance dialed in from distance while Stewart and Maille mixed elbows in the paint. Unfortunately, Green stayed steady and held their lead. The Final Score was 71-62, Green.',
    topPerformers1: 'Green Top Performers: Tavian Barrino - 24 points, 6 rebounds, 4 assists, Cyle Chappy - 15 points, 6 rebounds, 2 assists, Brody Snow - 14 points, 2 rebounds. The Alta Group Player of the Game: Tavian Barrino',
    topPerformers2: 'Blue Top Performers: Jerome Stewart - 20 points, 13 rebounds, 4 assists, Jordan Maille - 15 points, 3 rebounds, 2 steals, Tavarius Vance - 23 points, 11 rebounds',
    date: new Date('2025-10-21T00:00:00Z')
},
{
    id: '2',
    title: 'Week 4 - Game 2: Gray vs. Red',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-19',
    content: 'This was a star-studded matchup. Gray\'s duo of Mahlik "Skywalker" Franklin and Stefan "The Don" Radan put pressure on Red\'s defense each time down the court. Franklin was a force in the paint, while Radan tried making it rain from the outside. Despite their strong scoring outings, the halftime score was 37-29, Red. Much of that was due to Ben "Lights It Up" Litteken. Litteken was a nightmare to cover, as he scored from all three levels. He also received plenty of scoring insurance from Cory "The Energizer Bunny" Chaplin, who nailed some timely threes to stretch the lead. Meanwhile, Carter "Bruiser" Beeman lived up to his nickname and cleaned up any messes Litteken or Chaplin left behind. The final score of this one was 80-64, Red.',
    topPerformers1: 'Gray Top Performers: Mahlik Franklin - 32 points, 8 rebounds, Stefan Radan - 22 points, 8 rebounds',
    topPerformers2: 'Red Top Performers: Ben Litteken - 33 points, 8 rebounds, Cory Chaplin - 20 points, 3 rebounds, Carter Beeman - 10 points, 7 rebounds, 2 assists, 2 steals. The Alta Group Player of the Game: Ben Litteken',
    date: new Date('2025-10-21T00:00:00Z')
},
{
    id: '3',
    title: 'Week 4 - Game 3: Orange vs. Light Blue',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-19',
    content: 'Game three was a treat. Orange came out guns blazing from behind the three-point line. Cam Perta and co made it look like a shooting clinic. Teammates Alex Philo and Logan Leteourneau contributed to the three-point party, while Drew Pelkey was a pest in the paint and on the glass. At halftime, it was 43-43. But Light Blue had a scoring blizzard up their sleeve. "Prince" Jirbil Abdullahi led the way. He turned defense into offense and took his time to get the right shot for himself or a teammate in the halfcourt. Matt Riordan, Donnie Dwyer, and Jeromy Anderson put themselves into prime time scoring positions to be beneficiaries of the defense drawn by Abdullahi\'s electric offensive arsenal. The final score wound up to be 97-87, Light Blue.',
    topPerformers1: 'Orange Top Performers: Alex Philo - 12 points, 5 rebounds, Cam Perta - 18 points, 5 rebounds, 3 assists, Drew Pelkey - 26 points, 14 rebounds, Logan Letourneau - 22 points, 6 rebounds, 5 assists',
    topPerformers2: 'Light Blue Top Performers: Jibril Abdullahi - 31 points, 9 rebounds, 4 assists, 6 steals, Matt Riordan - 20 points, 8 rebounds, 5 assists, Donnie Dwyer - 28 points, 12 rebounds, Jeromy Anderson - 12 points, 8 rebounds. The Alta Group Player of the Game: Jibril Abdullahi',
    date: new Date('2025-10-21T00:00:00Z')
},
{
    id: '4',
    title: 'Week 4 - Game 4: Yellow vs. Purple',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-19',
    content: 'Game four was all Purple. Kaleb Swetty made the defense perspire as he dominated the rebounding game and scored at will from multiple levels. Teammate Fin Mitchell also got into the scoring mix, while Stan "The Man" Salley and "Mr. Consistent" Kolby Bradford were timely bucket getters. The halftime score was 51-40, Purple. Purple extended their lead in the second, but Yellow still received strong outings from several players. Manny "Big Bro" Robertson registered a double-double in his return to the court, while Reg Dailey, Kassian Pryor, and Jack Lloyd registered double-digit scoring outings. But it wasn\'t quite enough to overcome Purple\'s offensive onslaught. The final score was 91-70, Purple.',
    topPerformers1: 'Yellow Top Performers: Manny Robertson - 16 points, 10 rebounds, Jack Lloyd - 12 points, 4 rebounds, 2 assists, 2 steals, Reg Dailey - 13 points, 5 rebounds, 4 assists, Kassian Pryor - 10 points, 11 rebounds',
    topPerformers2: 'Purple Top Performers: Kaleb Swetty - 28 points, 14 rebounds, 6 assists, Fin Mitchell - 17 points, 4 rebounds, Stanley Salley - 10 points, 5 rebounds, Kolby Bradford - 11 points, 3 assists. The Alta Group Player of the Game: Kaleb Swetty',
    date: new Date('2025-10-21T00:00:00Z')
},
{
    id: '5',
    title: 'Week 4 - Game 5: White vs. Black',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-19',
    content: 'The final game was a fight for the one seed. Black bit down on White\'s defense as Hakeem "The Dream" Faud was hard to guard. His pull-up jumper and jet speed quickness seemed to be working in his favor, as Tre Grubbs grabbed nearly every defensive rebound in sight. Teammate James Hare also made all the difference in this one, scoring timely buckets when Faud and Grubbs weren\'t available. The score at the half was 42-38, Black. White packed a punch in the second. "The Commish" Andy Bousono nearly scored a triple-double, while lacing some clutch treys. Tyone "Big Dog" Conley was on the hunt for buckets, and his hunt was executed, as he bullied his way to 32 points that afternoon. Isaiah Terell also played a strong role, but it wasn\'t enough to overcome the deficit they faced. The final score was 83-79, Black.',
    topPerformers1: 'White Top Performers: Andy Bousono - 17 points, 10 rebounds, 9 assists, 2 steals, Tyrone Conley - 32 points, 10 rebounds, 2 assists, 2 steals, Isaiah Terell - 10 points, 5 rebounds',
    topPerformers2: 'Black Top Performers: Hakeem Faud - 39 points, 13 rebounds, 5 assists, 2 steals, Tre Grubbs - 15 points, 20 rebounds, 3 assists, 2 steals, James Hare - 10 points, 6 rebounds, 2 assists. The Alta Group Player of the Game: Hakeem Faud',
    date: new Date('2025-10-21T00:00:00Z')
},
{
    id: '6',
    title: 'Week 4 - Sponsors, Standings, and Announcements',
    author: 'League Admin',
    category: 'Closing',
    content: 'Big thank you to our new sponsors, Namaste Kitchens and The Alta Group! Check them out if you haven\'t yet. This recap was brought to you by Warden\'s Wisdom, a mindfulness-based coaching service to help you overcome anxiety and stress with simple, customized mindfulness practices. Warden\'s Wisdom Quote of the Week: "The more consciously you live, the more fulfilled you feel." Current Standings: BLACK 4-0, WHITE 3-1, PURPLE 3-1, LIGHT BLUE 3-1, GREEN 2-2, RED 2-2, GRAY 1-3, YELLOW 1-3, BLUE 1-3, ORANGE 0-4. Tune in tomorrow to catch the live Week 5 action on Facebook!',
    date: new Date('2025-10-21T00:00:00Z')
},
  {
    id: '0',
    title: 'Week 3 - Week 3 saw an undefeated team go down, and two more teams rise to the top of the rankings.',
    author: 'League Admin',
    category: 'Intro',
    content: 'Week 3 saw an undefeated team go down, and two more teams rise to the top of the rankings. There were high-flying acrobatic finishes, three-balls galore, and an overtime barn burner that kept the crowd biting their nails in anticipation of the outcome. Let\'s dive into the week three action:',
    date: new Date('2025-10-14T00:00:00Z')
},
{
    id: '1',
    title: 'Week 3 - Game 1: Red vs. Light Blue',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-12',
    content: 'This game featured a battle of the guards. For Red, Ben "Lights It Up" Litteken continued to live up to his nickname as he stroked shots from downtown and in the mid-range. At the same time, teammates Carter "Bruiser" Beeman, Cory "Energizer Bunny" Chaplin, and Edo "The Magician" Semic also contributed with double-digit scoring outings. However, there wasn\'t magic happening for Red. At halftime, Light Blue held a steady 48-38 lead. How did they get there? The return of The Prince, The Don, and White Chocolate. "Prince" Jibril Abdullahi made his defenders look as foolish as court jesters as he lit them up with between-the-legs crossovers and smooth stepbacks on his way to a game-high 36. Down low and on the perimeter, "The Don", Donnie Dwyer made his presence felt. He laced some timely threes and twos to keep Light Blue in cruise control. To finish things off, Jason "White Chocolate" West hit a couple shots to put the nail in the coffin. The final of this one was 92-71, Light Blue.',
    topPerformers1: 'Red Top Performers: Ben Litteken - 32 points, 12 rebounds, 2 assists, 3 steals, Carter Beeman - 11 points, 6 rebounds, Cory Chaplin - 11 points, 3 rebounds, Edo Semic - 11 points, 2 rebounds, 2 assists',
    topPerformers2: 'Light Blue Top Performers: Donnie Dwyer - 28 points, 4 rebounds, Jibril Abdullahi - 36 points, 6 rebounds, 4 assists, 4 steals, Jason West - 11 points, 5 rebounds, 2 assists',
    date: new Date('2025-10-14T00:00:00Z')
},
{
    id: '2',
    title: 'Week 3 - Game 2: White vs. Yellow',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-12',
    content: 'White has been on the rise and continued to click with their chemistry. "The Commish", Andy Bousono was the straw stirring the drink as he facilitated offense to get all of his teammates involved. As a result, the White Team had five players go for double figures: Tyrone "Big Dog" Conley, Jack-Goga Blanchard, Kenny Black, "Mean" Joe Ruggles, and Isaiah Terrell. Blanchard led the squad with 23. At the half, the score was 42-26, White. Yellow tried to squabble up. Led by Captain Kyle Haley, they put up a fight to start. Teammate Kassian Prior had a strong outing with a near double-double. However, they couldn\'t sustain their effort for the remainder of the half, and White recharged and revamped their offensive approach to get back to what was working in the first half. As the final buzzer sounded, the score was 90-59, White.',
    topPerformers1: 'White Top Performers: Isaiah Terrell - 17 points, 12 rebounds, 2 assists, Tyrone Conley - 13 points, 7 rebounds, Jack Goga Blanchard - 23 points, 6 rebounds, 2 assists, 2 steals, Joe Ruggles - 13 points, 3 rebounds, 6 assists, Kenny Black - 12 points, 8 rebounds, 2 assists, Andy Bousono - 2 points, 5 rebounds, 12 assists, 3 steals',
    topPerformers2: 'Yellow Top Performers: Kyle Haley - 17 points, 5 rebounds, 3 assists, Kassian Prior - 9 points, 9 rebounds',
    date: new Date('2025-10-14T00:00:00Z')
},
{
    id: '3',
    title: 'Week 3 - Game 3: Orange vs. Green',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-12',
    content: 'Green\'s dynamic guard combo was lethal in this matchup. Matt "Swiss Army Knife" Spear and "Timely" Tavian Barrino shot lights out and couldn\'t be contained by anyone on the Orange defensive side of the ball. Spear was slicing to the rim, and Barrino was bold with his takes to the rim and three-point shot. At the half, they had gotten Green out to a 37-28 lead. The second half was more of the same. However, Orange stayed in contention for the first half of the second frame. Alex Philo, Logan Letourneau, and Drew Pelkey provided the scoring Orange needed to compete, but the amount they scored couldn\'t make up for the deficit they faced. The final score of this game was 81-66, Green.',
    topPerformers1: 'Orange Top Performers: Alex Philo - 20 points, 5 rebounds, 2 assists, Logan Letourneau - 12 points, 5 rebounds, 3 assists, Drew Pelkey - 18 points, 8 rebounds',
    topPerformers2: 'Green Top Performers: Matt Spear - 30 points, 5 rebounds, 4 assists, 3 steals, Tavian Barrino - 26 points, 7 rebounds, 2 assists',
    date: new Date('2025-10-14T00:00:00Z')
},
{
    id: '4',
    title: 'Week 3 - Game 4: Purple vs. Blue',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-12',
    content: 'Game four was hands down the game of the day. Blue had a balanced attack. "Air" Jordan Maille, Jon "Moneyball" Billado, Jerome Stewart, and "Tenacious" Tavarius Vance added to the offensive onslaught. Billado and Stewart hit multiple threes, while Maille and Vance were vicious in the paint. As a result, they held a 44-42 halftime lead. But Purple didn\'t back down. To try to sustain their undefeated record, Chris "The Pro" Cayole put defenders to shame. Any shot he took with a hand in his face went in, and he was lacing plenty. Teammates Bryan "El Toro" Rivera, Kaleb Swetty, and Logan Tobin also contributed to the cause. Their collective effort brought the game to a tie by the end of regulation. However, in overtime, Blue seized back the momentum and snuck out with their first win of the season, giving Purple their first loss. The final score was 93-90.',
    topPerformers1: 'Purple Top Performers: Chris Cayole - 32 points, 8 rebounds, 2 assists, Kaleb Swetty - 20 points, 3 rebounds, 3 assists, 3 steals, Bryan Rivera - 11 points, 6 rebounds, Logan Tobin - 10 points, 9 rebounds',
    topPerformers2: 'Blue Top Performers: Jon Billado - 12 points, Jerome Stewart - 20 points, 9 rebounds, 4 assists, Jordan Maille - 24 points, 7 rebounds, 7 assists, 3 steals, Tavarius Vance - 18 points, 15 rebounds, 4 assists, 2 steals',
    date: new Date('2025-10-14T00:00:00Z')
},
{
    id: '5',
    title: 'Week 3 - Game 5: Gray vs. Black',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-10-12',
    content: 'Gray had something to say in this one. In particular, Mahlik "Skywalker" Franklin had the loudest message with his performance. He drilled a game-high seven threes and dominated the paint on his way to a whopping 47 points throughout the entire contest. And as a result of his first half effort, Gray led, 39-36. But Black said: "Not so fast, my friend!" The deadly combination of Hakeem "The Dream" Faud and Tre "Let\'s Play" Grubbs proved to be way too much for Gray to handle. Faud was draining jumpers while Grubbs was strong in the paint and on the perimeter defense. Faud and Grubbs combined for a total of 73 points, which helped Black reclaim the momentum of the game, the victory, and the number one ranking in the standings. The final score of this game was 94-76.',
    topPerformers1: 'Gray Top Performers: Mahlik Franklin - 47 points, 9 rebounds, 2 assists, 3 steals',
    topPerformers2: 'Black Top Performers: Hakeem Faud - 43 points, 12 rebounds, 3 assists, Tre Grubbs - 30 points, 13 rebounds, 4 steals',
    date: new Date('2025-10-14T00:00:00Z')
},
   {
    id: '0',
    title: 'Week 2 - The second week of the Revolution Fall League was telling.',
    author: 'League Admin',
    category: 'Intro',
    content: 'The second week of the Revolution Fall League was telling. The Black Team emerged as the team to beat, as they dominated for the second week in a row. Meanwhile, White\'s balanced team attack is nipping at their heels. Also, can Purple be the dark horse no one is talking about? Those ideas will reveal themselves in this week\'s recap.',
    date: new Date('2025-09-29T00:00:00Z')
},
{
    id: '1',
    title: 'Week 2 - Game 1: Light Blue vs. Green',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-09-27',
    content: 'Light Blue came out with a three-man attack. "Prince" Jibril Abdullahi was back after a hiatus from the league and showed he\'s not missing a step. His quick feet were eating defenders up, while Matt "The Stallion" Riordan got out in transition and slashed into the paint. Meanwhile, Donnie Dwyer made his presence felt in the paint. At halftime, the score was 39-32, Light Blue. In the second half, Green tried to chip away at the lead. Matt "Swiss Army Knife" Spear led the scoring charge, while Brody "Smooth as Sinatra" Snow was lights out from all over the court. Teammate "Smiling" Kyle Picard also put in work on the offensive end. However, their collective effort wasn\'t enough to overcome their deficit. The final score was 67-62, in favor of Light Blue.',
    topPerformers1: 'Light Blue Top Performers: Jibril Abdullahi - 20 points, 3 rebounds, 2 steals, Matt Riordan - 19 points, 6 rebounds, 3 assists, Donnie Dwyer - 14 points, 5 rebounds',
    topPerformers2: 'Green Top Performers: Matt Spear - 26 points, 3 rebounds, 2 assists, 4 steals, Brody Snow - 20 points, 3 rebounds, 2 assists, Kyle Picard - 11 points, 7 rebounds',
    date: new Date('2025-09-29T00:00:00Z')
},
{
    id: '2',
    title: 'Week 2 - Game 2: Black vs. Red',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-09-27',
    content: 'Game two was a tale of two halves. Ben "Lights it Up" Litteken showcased his scholarship-level skills against anyone who tried to guard him. He scored from multiple levels all through the half. Teammates Carter "Bruiser" Beeman and Edo "The Magician" Semic provided essential insurance. But at halftime, the score was 43-39, Black. That halftime lead was much ado to the dynamic duo of Hakeem "The Dream" Faud and Tre Grubbs. That duo lit things up in the second frame. Faud was unstoppable off the bounce. He got to the rim and skyed over the outreached arms of defenders trying to contest his lights-out pull-up jump shot. Grubbs, on the other hand, was a force in the paint, gobbling ricochets off the glass and putting them back, while also lacing three-pointers when given the chance. Their scoring eruption led to a win, 97-77.',
    topPerformers1: 'Black Top Performers: Hakeem Faud - 47 points, 8 rebounds, 5 assists, Tre Grubbs - 30 points, 16 rebounds, 5 assists, 4 steals',
    topPerformers2: 'Red Top Performers: Ben Litteken - 29 points, 6 rebounds, 4 assists, 3 steals, Carter Beeman - 15 points, 11 rebounds, Edo Semic - 11 points, 2 rebounds',
    date: new Date('2025-09-29T00:00:00Z')
},
{
    id: '3',
    title: 'Week 2 - Game 3: White vs. Blue',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-09-27',
    content: 'This game was over at halftime. White\'s six-headed monster of Andy "The Commish" Bousono, Tyrone "Big Dog" Conley, Isaiah Terrell, Joe Ruggles, John O\'Brien, and Jack Goga-Blanchard was firing on all cylinders. Their complete team approach to the game proved unstoppable as they made the extra pass and got wide-open shots nearly every possession. At halftime, the score was 53-23, White. The second half went much better for Blue, but the deficit was massive. Fortunately, they received strong outings from "Air" Jordan Maille and Jerome Stewart. Both players went for 22, but considering the deficit was 30, it was too much for two men to overcome. On the bright side, they won the second half! But that didn\'t say much. The final score was 94-65, White.',
    topPerformers1: 'White Top Performers: Andy Bousono - 11 points, 2 rebounds, 5 assists, Tyrone Conley - 14 points, 3 rebounds, 4 assists, 3 steals, Isaiah Terrell - 12 points, 5 rebounds, 3 assists, Joe Ruggles - 14 points, 9 rebounds, 4 assists, 2 steals, John O\'Brien - 11 points, 2 rebounds, Jack Goga-Blanchard - 12 points, 6 rebounds, 2 assists',
    topPerformers2: 'Blue Top Performers: Jordan Maille - 22 points, 11 rebounds, 2 assists, Jerome Stewart - 22 points, 4 rebounds, 6 assists, 2 steals',
    date: new Date('2025-09-29T00:00:00Z')
},
{
    id: '4',
    title: 'Week 2 - Game 4: Gray vs. Yellow',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-09-27',
    content: 'Game four was a solid contest. Gray came out with a one-man show of Jon Helsel. Helsel was relentless on the glass and in the paint on his way to a game-high 33 points. He was aided by substitute Jordan, who scored in double figures. Despite their efforts, they faced a 28-23 deficit. The second half was when Yellow turned it up a notch. Kyle Haley and Miles Robertson led the scoring charge, while several teammates neared double-figures. They also locked down on the defensive side of the ball, giving up less than thirty points for the second half in a row. The final score was 71-51, Yellow.',
    topPerformers1: 'Gray Top Performers: Jon Helsel - 33 points, 11 rebounds, 3 assists, Jordan - 11 points, 4 rebounds, 3 assists',
    topPerformers2: 'Yellow Top Performers: Kyle Haley - 17 points, 5 rebounds, 3 assists, Miles Robertson - 10 points, 5 rebounds',
    date: new Date('2025-09-29T00:00:00Z')
},
{
    id: '5',
    title: 'Week 2 - Game 5: Orange vs. Purple',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-09-27',
    content: 'The final game of the day proved to be dramatic. Orange received a strong shooting effort from Cam Perta, who nailed nine trey balls. Teammates Dylan Mackie, Logan Letourneau, Alex Philo, and Drew Pelkey also got into the scoring mix by getting into double figures. At halftime, the score was 45-42, Orange. But the tides turned in the second half. Caleb Swetty turned up the heat with a stellar all-around performance, registering a 20-point double-double. Teammates Stan "The Man" Salley, Fin Mitchell, and "Mr. Consistent" Kolby Bradford also got into double figures to grab and stretch their lead like Mr. Fantastic. The final score was 99-86, Purple.',
    topPerformers1: 'Orange Top Performers: Cam Perta - 28 points, 5 rebounds, 4 assists, Dylan Mackie - 17 points, 5 rebounds, 5 assists, Logan Letourneau - 13 points, 6 rebounds, 4 assists, Alex Philo - 14 points, 6 rebounds, Drew Pelkey - 12 points, 12 rebounds, 2 assists',
    topPerformers2: 'Purple Top Performers: Caleb Swetty - 23 points, 10 rebounds, 4 assists, 3 steals, Stanley Salley - 23 points, 9 rebounds, 2 assists, Fin Mitchell - 17 points, 11 rebounds, 3 assists, Kolby Bradford - 13 points, 2 rebounds',
    date: new Date('2025-09-29T00:00:00Z')
},
{
    id: '6',
    title: 'Week 2 - Sponsors and Announcements',
    author: 'League Admin',
    category: 'Closing',
    content: 'A big thank you to our new sponsor, Namaste Kitchens! Check them out if you haven\'t yet. This recap was brought to you by Warden\'s Wisdom, a mindfulness-based coaching service to help you overcome anxiety and stress with simple, customized mindfulness practices. Warden\'s Wisdom Quote of the Week: "Instead of striving forward all the time, it might serve you best to sit and do nothing. When you do, you\'ll notice all the suffering you\'ve been avoiding." Tune in next Sunday to catch the live Week 3 action on Facebook!',
    date: new Date('2025-09-29T00:00:00Z')
},
    {
    id: '0',
    title: 'Week 1 - Week one of the Revolution Fall League got off to a sizzling start.',
    author: 'League Admin',
    category: 'Intro',
    content: 'Week one of the Revolution Fall League got off to a sizzling start. There were surprise wins, forty-point showcases, and even a fifty-four-point clinic by an early MVP contender. Let\'s get into the action.',
    date: new Date('2025-09-21T00:00:00Z')
    },
    {
        id: '1',
        title: 'Week 1 - Game 1: Purple vs. Green',
        author: 'League Admin',
        category: 'Recap',
        gameDate: '2025-09-21',
        content: 'The first game started hot and heavy. The dynamic duo of Matt "Swiss Army knife" Spear and Tavian "The Smooth Operator" Barrino led Green to an early lead. Spear got to the cup at will, while Barrino showcased a lights-out shooting stroke. Meanwhile, Brody Snow scored timely buckets. Despite their play, Purple held a 37-35 lead at halftime. In the second half, Purple stretched that lead. Ball movement and player touches were the secret sauce to their offensive output. Logan Tobin led the way, followed by "Mr. Consistent", Kolby Bradford. Rounding out the scoring action were Kaleb Swetty and Fin Mitchell. The quartet each scored in double figures, leading to a final score of 71-64, Purple.',
        topPerformers1: 'Purple Top Performers: Logan Tobin - 18 points, 9 rebounds, Fin Mitchell - 13 points, 9 rebounds, Kolby Bradford - 16 points, 3 rebounds, 4 assists, 3 steals, Kaleb Swetty - 15 points, 4 rebounds, 2 steals',
        topPerformers2: 'Green Top Performers: Brody Snow - 10 points, Matt Spear - 29 points, 15 rebounds, 3 assists, and 2 steals, Tavian Barrino - 22 points, 7 rebounds, 4 assists, 2 steals',
        date: new Date('2025-09-21T00:00:00Z')
    },
    {
        id: '2',
        title: 'Week 1 - Game 2: Black vs. Light Blue',
        author: 'League Admin',
        category: 'Recap',
        gameDate: '2025-09-21',
        content: 'This game was a one-sided affair. Black blew the doors off Light Blue. Hakeem "The Dream" Faud and Tre Grubbs kicked down the doors with vengeance. The duo was unstoppable, scoring nearly every trip down the court, and they dominated the glass on both ends. They also received scoring insurance from James Hare and Aaron "White Chocolate" West. At halftime, it was 53-20, Black. The second half didn\'t go any better for Light Blue. In fact, their deficit nearly doubled. However, they received a strong performance from Matt Riordan, who led the way with 35 points. Donnie Dwyer put up double figures, but shot only 22% from the field. The final of this one was 118-65, Black.',
        topPerformers1: 'Black Top Performers: Tre Grubbs - 38 points, 20 rebounds, 7 assists, 5 steals, Hakeem Faud - 47 points, 18 rebounds, 6 assists, 3 steals, James Hare - 14 points, 6 rebounds, Aaron West - 13 points, 6 rebounds, 2 steals',
        topPerformers2: 'Light Blue Top Performers: Matt Riordan - 35 points, 5 rebounds, 3 assists, 2 steals, Donnie Dwyer - 16 points, 8 rebounds, 3 steals',
        date: new Date('2025-09-21T00:00:00Z')
    },
    {
        id: '3',
        title: 'Week 1 - Game 3: Red vs. Yellow',
        author: 'League Admin',
        category: 'Recap',
        gameDate: '2025-09-21',
        content: 'Game three was another lopsided victory. Ben "Lights It Up" Litteken looked like he was seeking revenge after getting bounced in the first round of the summer league playoffs. He shot at a 62% clip for a league high 54 points. Teammates Cory "Energizer Bunny" Chaplin and Carter "Bruiser" Beeman also played pivotal roles in the scoring effort. At half, the score was 48-31, Red. In the second half, they went on cruise control. For Yellow, Manny "Big Bro" Robertson continued his strong play after rebounding from an injury in the spring. Teammates Austin Mayo, Kassian Pryor, and Reg Dailey also got into double figures. But the deficit was too large to overcome. The final was 97-72, Red.',
        topPerformers1: 'Red Top Performers: Ben Litteken - 54 points, 16 rebounds, 2 assists, 2 steals, Carter Beeman - 10 points, 7 rebounds, Cory Chaplin - 14 points, 5 rebounds, 5 assists, 3 steals',
        topPerformers2: 'Yellow Top Performers: Manny Robertson - 25 points, 3 rebounds, 2 steals, Reg Dailey - 10 points, 7 rebounds, Austin Mayo - 19 points, Kassian Prior - 12 points, 8 rebounds',
        date: new Date('2025-09-21T00:00:00Z')
    },
    {
        id: '4',
        title: 'Week 1 - Game 4: White vs. Orange',
        author: 'League Admin',
        category: 'Recap',
        gameDate: '2025-09-21',
        content: 'Game four was a ping pong match. White asserted themselves in the first half, much of that due to the evenly distributed scoring of Tyone "Big Dog" Conley, "The Commish" Andy Bousono, Jack Blanchard, and Kenny Black. Bousono and Conley facilitated the action and scored as needed. At halftime, it was 54-40, White. However, Orange struck back in the second. Drew Pelkey, Alex Philo, and Cam Perta led the way, launching three-pointers at will that started to fall. Teammate Hayden was also a contributor to the scoring that saw Orange\'s double-digit lead shrink before their eyes. However, they held on by the tip of their fingers, as Orange failed to complete the comeback. The final was 79-77, White.',
        topPerformers1: 'White Top Performers: Andy Bousono - 14 points, 6 assists, Tyrone Conley - 18 points, 16 rebounds, 3 assists, Jack Blanchard - 10 points, 7 rebounds, Kenny Black - 10 points',
        topPerformers2: 'Orange Top Performers: Drew Pelkey - 23 points, 4 rebounds, Cam Perta - 18 points, 2 rebounds, 5 assists, Alex Philo - 19 points, 5 rebounds, 2 assists, Hayden - 13 points, 7 rebounds, 2 assists',
        date: new Date('2025-09-21T00:00:00Z')
    },
    {
        id: '5',
        title: 'Week 1 - Game 5: Gray vs. Blue',
        author: 'League Admin',
        category: 'Recap',
        gameDate: '2025-09-21',
        content: 'The final game of the evening was a rock fight. Blue appeared to have brought enough rocks as they kept it close early. Nate "The Great" Luong was dialed in from two and three, leading his team in scoring. However, the halftime score eventually swayed toward Gray. At the half, it was 31-25, Gray. In the second half, the Skywalker took over. Mahlik Franklin was a force to be reckoned with. He sliced through the defense and soared to the rim, over and over, while also knocking down crucial jumpers to expand Gray\'s lead. He also got help from teammate John Helsel in the scoring department. The final of this one was 62-42, Gray.',
        topPerformers1: 'Gray Top Performers: Mahlik Franklin - 39 points, 11 rebounds, 2 assists, John Helsel - 12 points, 4 rebounds',
        topPerformers2: 'Blue Top Performers: Nate Luong - 14 points, 4 rebounds, and 3 steals',
        date: new Date('2025-09-21T00:00:00Z')
    },
    {
        id: '6',
        title: 'Week 1 - Sponsors and Announcements',
        author: 'League Admin',
        category: 'Closing',
        content: 'Big thank you to our new sponsors, Namaste Kitchens! Check them out if you haven\'t yet. This recap was brought to you by Warden\'s Wisdom, a mindfulness-based coaching service to help you overcome anxiety and stress with simple, customized mindfulness practices. Warden\'s Wisdom Quote of the Week: "Peace is not a matter of holding on, but rather it\'s a matter of letting go. So let go of what you\'ve held onto so tightly. It might be the relief you seek." Revolution basketball is sponsored by @namaste kitchen! Located on Shelburne Road! Go check them out. Tune in this Sunday to catch the live Week 2 action on Facebook.',
        date: new Date('2025-09-21T00:00:00Z')
    }
];


// --- HELPER FUNCTIONS ---

const getWeekFromTitle = (title) => {
  const match = title.match(/Week (\d+)/i);
  return match ? parseInt(match[1], 10) : null;
};

const formatDate = (dateInput) => {
  if (!dateInput) return 'Unknown Date';
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Invalid Date';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    return 'Invalid Date';
  }
};

/**
 * Extracts the dynamic header (e.g., 'Light Blue Top Performers') from the content string.
 * @param {string} performerString The full string (e.g., 'Light Blue Top Performers: Jibril Abdullahi...')
 * @returns {string} The extracted title.
 */
const extractPerformerTitle = (performerString) => {
    if (!performerString) return 'Top Performers';
    const index = performerString.indexOf(':');
    // If a colon exists, take everything before it and trim
    if (index !== -1) {
        return performerString.substring(0, index).trim();
    }
    // Otherwise, return a generic title
    return 'Top Performers';
};

/**
 * Extracts only the details (the part after the first colon) from the content string.
 * @param {string} performerString The full string (e.g., 'Light Blue Top Performers: Jibril Abdullahi...')
 * @returns {string} The extracted details (e.g., 'Jibril Abdullahi - 20 points...')
 */
const extractPerformerDetails = (performerString) => {
    if (!performerString) return '';
    const index = performerString.indexOf(':');
    // If a colon exists, take everything after it and trim leading space
    if (index !== -1) {
        return performerString.substring(index + 1).trim();
    }
    // Otherwise, return the whole string
    return performerString;
};


// --- COMPONENT: RecapCard (Display Logic) ---
const RecapCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Combine content for expansion check
  const fullText = [post.content, post.topPerformers1, post.topPerformers2, post.newsUpdates].filter(Boolean).join('\n\n');
  const needsExpansion = fullText.length > 500;
  
  // Conditionally render detailed sections
  const renderDetail = (title, content, icon) => {
      if (!content) return null;

      // Use the new helper to get just the player details for the content body
      const detailContent = extractPerformerDetails(content);
      
      return (
          // Use border-top and text-danger for primary accent
          <div className="mb-3 pt-3 border-top border-danger-subtle">
              {/* Header Title (e.g., "Light Blue Top Performers") */}
              <h6 className="fw-bold text-danger mb-2 d-flex align-items-center small text-uppercase">
                  <i className={`bi bi-${icon} me-2 text-danger`}></i> {title}
              </h6>
              {/* Content Body (e.g., "Jibril Abdullahi - 20 points...") */}
              <div className="text-secondary whitespace-pre-wrap small lh-base">{detailContent}</div>
          </div>
      );
  };
  
  // The block containing all the content sections
  const mainContentBlock = (
      <>
          {/* General Recap Header */}
          <h6 className="fw-bold text-dark mb-2 d-flex align-items-center small text-uppercase">
             <i className="bi bi-file-earmark-text me-2 text-danger"></i> 
             {post.category === 'Intro' ? 'Weekly Overview' : 'Summary'}
          </h6>
          <div className="text-secondary whitespace-pre-wrap mb-4 small lh-base">{post.content || 'No content provided.'}</div>
          
          {/* Render both Top Performer sections using extracted dynamic titles and full content string */}
          {renderDetail(extractPerformerTitle(post.topPerformers1), post.topPerformers1, 'star-fill')}
          {renderDetail(extractPerformerTitle(post.topPerformers2), post.topPerformers2, 'star-fill')}
          
          {renderDetail('League News & Updates', post.newsUpdates, 'megaphone-fill')}
      </>
  );

  // Custom style for the fixed height for collapsed state
  const collapsedStyle = {
    maxHeight: '200px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'max-height 0.3s ease-in-out',
  };

  // Custom style for the fade overlay
  const fadeStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: 'linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0))',
    pointerEvents: 'none',
    zIndex: 1,
  };

  return (
    // Changed col-md-6 col-lg-4 to col-12 to ensure full width on all screen sizes
    <div className="col-12 mb-4">
      {/* Bootstrap Card with shadow, rounded corners. Removed non-functional Tailwind classes (transition-shadow, hover-shadow-xl) */}
      <div className="card h-100 shadow-lg border-0 rounded-4">
        <div className="card-body d-flex flex-column h-100 p-4 p-sm-5">
          
          {/* Header & Meta */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            {/* Red accent badge */}
            <span className="badge text-bg-danger fs-6 px-3 py-1 rounded-pill shadow-sm">
              {post.category || 'Recap'}
            </span>
             {post.gameDate && (
                // Lighter background badge
                <span className="badge text-bg-light text-danger border border-danger-subtle fs-6 px-3 py-1 rounded-pill">
                    Game: {post.gameDate}
                </span>
            )}
          </div>
          
          {/* Title */}
          <h5 className="fw-bold text-dark mb-3 fs-4">{post.title || 'Untitled Post'}</h5>
          
          {/* Author and Date metadata */}
          <p className="text-muted small mb-4 d-flex flex-wrap align-items-center">
            <span className="d-flex align-items-center text-dark-emphasis me-3">
                <i className="bi bi-person-circle text-danger me-2"></i>
                {post.author || 'Anonymous'}
            </span>
            <span className="d-flex align-items-center text-dark-emphasis">
                <i className="bi bi-calendar-check text-danger me-2"></i>
                Posted: {formatDate(post.date)}
            </span>
          </p>

          {/* Main Content Area (Expandable) */}
          <div className="flex-grow-1 position-relative mb-3">
            <div 
              style={(!isExpanded && needsExpansion) ? collapsedStyle : {}} 
              // Custom look: thick danger border on left, light background
              // Removed transition-all (Tailwind class)
              className="p-3 border border-start-0 border-end-0 border-top-0 border-bottom-0 border-5 border-danger-subtle rounded-end bg-danger-subtle bg-opacity-10">
              {mainContentBlock}
            </div>
            
            {!isExpanded && needsExpansion && (
              <div style={fadeStyle}></div>
            )}
          </div>

          {/* Read More Button */}
          {needsExpansion && (
            <div className="mt-auto pt-3 border-top border-light">
              <button
                onClick={toggleExpand}
                // Link style button with red text
                className="btn btn-link text-danger fw-bold text-decoration-none p-0 d-flex align-items-center"
              >
                {isExpanded ? 
                    <>Show Less Detail <i className="bi bi-chevron-up ms-2 small"></i></> : 
                    <>Show Full Detail <i className="bi bi-chevron-down ms-2 small"></i></>
                }
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- CORE FEATURE COMPONENT: Recaps ---
const Recaps = () => {
    // Sort posts once by date descending (most recent first)
    const sortedPosts = useMemo(() => {
        return STATIC_RECAP_DATA.sort((a, b) => b.date.getTime() - a.date.getTime());
    }, []);

    // 1. FILTERING LOGIC
    const allPosts = useMemo(() => {
        return sortedPosts.map(post => ({
            ...post,
            week: getWeekFromTitle(post.title || '')
        }));
    }, [sortedPosts]);

    const uniqueWeeks = useMemo(() => {
        const weeks = allPosts
          .filter(post => post.week !== null)
          .map(post => post.week);
        return [...new Set(weeks)].sort((a, b) => b - a);
    }, [allPosts]);

    const [activeWeek, setActiveWeek] = useState(null);
    
    // Set the latest week as default active week
    useEffect(() => {
        if (!activeWeek && uniqueWeeks.length > 0) {
            setActiveWeek(uniqueWeeks[0]);
        }
    }, [uniqueWeeks, activeWeek]);


    const filteredPosts = useMemo(() => {
        if (!activeWeek) return [];
        return allPosts.filter(post => post.week === activeWeek);
    }, [activeWeek, allPosts]);

    const nonWeeklyPosts = useMemo(() => {
        // Since all new posts are weekly, this array will be empty for now, but the logic remains sound.
        return allPosts.filter(post => post.week === null);
    }, [allPosts]);
    
    // 2. RENDER LOGIC
    return (
        // Main container centered on the page with shadow
        <div className="container py-4">
            <div className="card bg-white p-4 p-md-5 rounded-4 shadow-lg border-0">
                {/* Header: Reduced from mb-5/pb-5 to mb-4/pb-4 for tighter spacing */}
                <header className="text-center pb-3 pb-md-4 border-bottom border-danger-subtle mb-4">
                    <h1 className="display-4 fw-bold text-dark mb-2">
                        League <span className="text-danger">Recaps</span> 
                    </h1>
                    <p className="lead text-secondary mx-auto" style={{ maxWidth: '600px' }}>
                        View game summaries, top performers, and league analysis from the Revolution League.
                    </p>
                </header>
                
                {/* Week Selector Navigation: Reduced outer div margin from mb-5 to mb-4 */}
                {uniqueWeeks.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-center text-dark-emphasis mb-4 fs-5 fw-bold">Filter By Week:</h3>
                        <div className="d-flex justify-content-center flex-wrap gap-2 px-2">
                            {uniqueWeeks.map(week => (
                            <button
                                key={week}
                                onClick={() => setActiveWeek(week)}
                                // Removed transition-all (Tailwind class)
                                className={`btn btn-sm fw-bold rounded-pill ${activeWeek === week 
                                    ? 'btn-danger shadow-sm' // Active button uses solid danger
                                    : 'btn-outline-danger shadow-sm' // Inactive button is outlined
                                }`}
                            >
                                Week {week}
                            </button>
                            ))}
                        </div>
                    </div>
                )}
                
                <main className="py-4">
                    {activeWeek && filteredPosts.length > 0 && (
                        <>
                        {/* Recaps Title: Reduced margin from mb-5 to mb-4 */}
                        <h2 className="text-center text-dark mb-4 fs-3 fw-bolder border-bottom border-danger pb-3">
                            Week {activeWeek} Recaps
                        </h2>
                        {/* Bootstrap Grid: All cards are now full-width (col-12 is handled inside RecapCard) */}
                        <div className="row g-4 justify-content-center"> 
                            {filteredPosts.map((post) => (
                                <RecapCard key={post.id} post={post} />
                            ))}
                        </div>
                        </>
                    )}
                    
                    {/* General News Section for non-weekly posts */}
                    {nonWeeklyPosts.length > 0 && (
                        <div className={`mt-5 pt-5 border-top border-light`}>
                        <h2 className="text-center text-dark mb-5 fs-3 fw-bolder border-bottom border-secondary pb-3">
                            General League News & Analysis
                        </h2 >
                        {/* Bootstrap Grid for general news */}
                        <div className="row g-4 justify-content-center">
                            {nonWeeklyPosts.map((post) => (
                            <RecapCard key={post.id} post={post} />
                            ))}
                        </div>
                        </div>
                    )}
                    
                    {/* Fallback if a week is selected but has no posts */}
                    {activeWeek && filteredPosts.length === 0 && nonWeeklyPosts.length > 0 && (
                         <div className="text-center text-secondary py-5">
                            No recaps available for Week {activeWeek}. Check the General News below.
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
  };
  
// --- MAIN APP COMPONENT ---
function App() {
  return (
    // Set a subtle background and a max-width container for desktop display
    <div className="min-vh-100 bg-light" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="container-xxl p-2 p-sm-5 mx-auto"> 
            <Recaps />
        </div>
    </div>
  );
}

export default App;