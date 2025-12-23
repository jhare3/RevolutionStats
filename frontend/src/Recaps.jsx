// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';

// =================================================================
// --- STATIC DATA DEFINITION (Complete Data Set) ---
// =================================================================
const STATIC_RECAP_DATA = [
    // Week 8
    {
    id: '0',
    title: 'Week 8 - All of the questions got answered in the final week of the Revolution 2025 Men\'s Fall Basketball League.',
    author: 'League Admin',
    category: 'Intro',
    content: 'All of the questions got answered in the final week of the Revolution 2025 Men\'s Fall Basketball League, and there were some surprises sprinkled in. Black went undefeated, but just by a hair. White thumped their opponents, generating momentum for themselves, and Yellow upset Light Blue in the final game of the season. Let\'s get into how all that went down with the final recap of the regular season:',
    date: new Date('2025-11-17T00:00:00Z')
},
{
    id: '1',
    title: 'Week 8 - Game 1: Gray vs. Orange',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-15',
    content: 'The first game started with a bang. Orange came out on the edge early as they found their three-point stroke. Cam Perta led the way from range with several deep three-pointers, while Logan Letourneau and Drew Pelkey also found the bottom of the net. At halftime, the score was 45-36 Orange. But the tides turned in the second. Mahlik "Skywalker" Franklin lived up to his name and took advantage of mismatches and soared to the hoop for several buckets, one of which was a rim-snapping slam. Teammate John Helsel came up in the clutch, while Franklin was unstoppable for the remainder of the half. Their joint effort led to an 81-71 win for Gray.',
    topPerformers1: 'Gray Top Performers: Mahlik Franklin - 54 points, 12 rebounds, 3 steals, John Helsel - 16 points, 14 rebounds, 2 assists. Alta Group Player of the Game - Mahlik Franklin',
    topPerformers2: 'Orange Top Performers: Drew Pelkey - 20 points, 9 rebounds, Logan Letourneau - 22 points, 3 rebounds, 8 assists, 2 steals, Cam Perta - 18 points, 4 rebounds, 3 steals',
    date: new Date('2025-11-17T00:00:00Z')
},
{
    id: '2',
    title: 'Week 8 - Game 2: Blue vs. Red',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-15',
    content: 'Game two was also a tide-turner. Blue held the upper hand in the first frame behind the play of "Tenacious" Tavarius Vance and "Air" Jordan Maille. Vance and Maille had their shots going, and teammates Nate "The Great" Luong and Avery Barrino also contributed with strong scoring efforts. At halftime, the score was 41-40, Blue. The second half saw a seismic shift in momentum. Ben \'Lights IT UP" Litteken caught fire and got things going for Red. Litteken lived up to the hype from downtown and in the mid-range, while Carter "Bruiser" Beeman got busy on the glass and in the paint. Rounding out the energy shift was none other than Cory "Energize Bunny" Chaplin. He was electric in the open floor and found teammates for easy buckets. Edo Semic also had a strong game with 16 of his own. The final was 78-71, Red.',
    topPerformers1: 'Blue Top Performers: Tavarus Vance - 23 points, 8 rebounds, Jordan Maille - 18 points, 18 rebounds, 3 assists, 3 steals, Nate Luong - 14 points, 3 rebounds, 2 assists, Avery Barrino - 10 points, 8 rebounds, 4 assists',
    topPerformers2: 'Red Top Performers: Ben Litteken - 27 points, 10 rebounds, 6 assists, Carter Beeman - 17 points, 15 rebounds, Cory Chalpin - 15 points, 5 rebounds, 4 assists, Edo Semic - 16 points, 1 rebound, 1 assist. Alta Group Player of the Game - Ben Litteken',
    date: new Date('2025-11-17T00:00:00Z')
},
{
    id: '3',
    title: 'Week 8 - Game 3: Green vs. Gray',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-15',
    content: 'The tale of two halves was a theme that played out in game three, too. Gray was up throughout the first frame, thanks again to Mahlik "Skywalker" Franklin. Franklin has his shot going at times to complement his ability to get to the cup. Teammates Dylan "point God" Pratico and John Helsel also helped out in the scoring department. At halftime, it was 40-31, Gray. The second half belonged to Green. Tavian Barrino led the charge, and Kyle Picard was right behind him. The duo combined for a whopping 50 of their team\'s 63 points. Barrino hit a barrage of shots in a row, and Picard was dominant down low. Their combined efforts led to a 63-62 comeback victory.',
    topPerformers1: 'Green Top Performers: Tavian Barrino - 30 points, 10 rebounds, 3 assists, Kyle Picard - 20 points, 8 rebounds. Alta Group Player of the Game - Tavian Barrino',
    topPerformers2: 'Gray Top Performers: Mahlik Franklin - 28 points, 10 rebounds, 3 assists, 4 steals, Dylan Pratico - 13 points, 4 rebounds, 3 assists, 3 steals, John Helsel - 17 points, 8 rebounds',
    date: new Date('2025-11-17T00:00:00Z')
},
{
    id: '4',
    title: 'Week 8 - Game 4: Red vs. Orange',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-15',
    content: 'Game four was another showdown. Both teams exchanged blows throughout the half. After all, basketball is a game of runs. Back and forth they went, basket for basket. Leading the way for Red were Littken, Beeman, Chaplin, Semic, and Dan Faris for Orange, Letourneau, Pelkey, and Dan Mackie. Halftime; 48-48. Despite the constant jockeying for position, Red took the reins in the second. Orange had no matchup or answer for Litteken, who scored from all three levels throughout the game. Beeman was a beast in the paint and on the glass again, while Faris, Chalin, and Semic played well within their roles. The total team effort resulted in a 89-79 win for Red.',
    topPerformers1: 'Red Top Performers: Ben Litteken - 30 points, 17 rebounds, 5 assists, 2 steals, Carter Beeman - 18 points, 13 rebounds, 4 assists, Cory Chaplin - 14 points, 3 rebounds, 7 assists, Dan Faris - 14 points, 6 rebounds, 2 steals, Edo Semic - 13 points, 4 assists. The Alta Group Player of the Game - Ben Litteken',
    topPerformers2: 'Orange Top Performers: Drew Pelkey - 28 points, 4 rebounds, 2 assists, Logan Letourneau - 18 points, 5 rebounds, 5 assists',
    date: new Date('2025-11-17T00:00:00Z')
},
{
    id: '5',
    title: 'Week 8 - Game 5: Blue vs. Black',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-15',
    content: 'Game five was the first double-digit victory. Black was back in action, Hakeem "The Dream" Faud showcased his smooth pull-up jumpshot, and even showed off some strength, getting to the cup on his defenders. Tre "Grabs Mad Boards" Grubbs nearly went for a triple-double and made it look easy in the process. Peter Linholm also shot lights out in the opportunities he was given. At halftime, it was 51-36, Black. The second half was more of the same. Fortunately, Blue received strong efforts from "Tenacious" Tavarius Vance, "Air" Jordan Maille, Jerome Stewart, and Avery Barrino. Unfortunately, their collective efforts weren\'t enough to close the distance. The final score of this one was 94-72, Black.',
    topPerformers1: 'Blue Top Performers: Tavarius Vance - 29 points, 11 rebounds, 4 assists, 2 steals, Jordan Maille - 18 points, 5 rebounds, Jerome Stewart - 14 points, 10 rebounds, 3 assists, 2 steals, Avery Barrino - 11 points, 8 rebounds',
    topPerformers2: 'Black Top Performers: Hakeem Faud - 38 points, 18 rebounds, 6 assists, 2 steals, Tre Grubbs - 22 points, 14 rebounds, 8 assists, Peter Lindholm - 11 points, 4 rebounds. Alta Group Player of the Game - Hakeem Faud',
    date: new Date('2025-11-18T00:00:00Z')
},
{
    id: '6',
    title: 'Week 8 - Game 6: White vs. Green',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-16',
    content: 'White showed up with a point to prove. Three players went for more than twenty, and six total players scored in double figures. "The Commish" Andy Bousono captained his way to a triple-double, making all the right plays to put his teammates in positions to succeed, and succeed they did. Isaiah Terrell, Jack Goga-Blanchard, Kenny Black, and Tyrone Conley were beneficiaries of Bousono\'s generous facilitation. At halftime, the score was 53-39, White. A slaughter ensued in the second half, but Green still had a few players stand out. Tavian Barrino, Cyle Chappy, and Brody Snow all scored in double figures, and Barrino was the top scorer with a second straight 30-point performance. However, White played like a well-oiled machine on their way to a 32-point win. The final score was 111-79, White.',
    topPerformers1: 'White Top Performers: Andy Bousono - 25 points, 11 rebounds, 10 assists, Isaiah Terrell - 21 points, 10 rebounds, Jack Goga-Blanchard - 13 points, 5 rebounds, Kenny Black - 17 points, 6 rebounds, 2 assists, Tyrone Conley - 20 points, 6 rebounds, 3 assists, Tanner Freeman - 13 points, 8 assists, 2 steals. The Alta Group Player of the Game - Andy Bousono',
    topPerformers2: 'Green Top Performers: Tavian Barrino - 30 points, 4 rebounds, Cyle Chappy - 13 points, 3 rebounds, Brody Snow - 14 points, 8 rebounds, 4 assists',
    date: new Date('2025-11-18T00:00:00Z')
},
{
    id: '7',
    title: 'Week 8 - Game 7: Light Blue vs. Purple',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-16',
    content: 'Game seven brought back momentum shifts. Purple received a strong effort from their big three: Chris "The Pro" Cayole, Fin Mitchell, and Kaleb Swetty. Cayole led the way with 21 points on over 50% shooting, while Mitchell and Swetty rounded out the leading scorers. At halftime, it was 39-35, Purple. In the second half, Light Blue started to chip away at the deficit they faced. "Prince" Jibril Abdullahi was a force to be reckoned with. He scored at ease from all three levels; no one could keep him in front of them. Matt "The Stallion" Rioran played with pace, and Aid Semic came up strong with a double-digit outing. The final score of this game was 68-63, Light Blue.',
    topPerformers1: 'Light Blue Top Performers: Jibril Abdullahi - 35 points, 9 rebounds, 6 assists, 4 steals, Matt Riordan - 16 points, 6 rebounds, Aid Semic - 11 points, 5 rebounds. Alta Group Player of the Game - Jibril Abdullahi',
    topPerformers2: 'Purple Top Performers: Chris Cayole - 21 points, 9 rebounds, Fin Mitchell 13 points, 8 rebounds, 3 assists, Kaleb Swetty - 13 points, 4 rebounds',
    date: new Date('2025-11-18T00:00:00Z')
},
{
    id: '8',
    title: 'Week 8 - Game 8: Yellow vs. Black',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-16',
    content: 'Although it was a matinee game, game eight was the best of the day. Captain Kyle Haley hit a whopping ten threes throughout the contest and made his way to the basket several other times. Jack Lloyd took a page out of Ben Litteken\'s book and shot lights out from the field to help Haley. Meanwhile, Austin Mayo and Kassian Pryor played big roles with double-digit scoring performances. At the half, it was 48-40, Yellow. But in the second half, Black fought back. Tre "Grabs Mad Boards" Grubbs was an unstoppable force on his way to nearly sixty points and twenty rebounds. James Hare and Peter Lindholm were helpful with double-digits, but it was none other than Revolution legend Bobby Yefchak who came up clutch. With time ticking down, Black had clawed their way back to a 96-95 deficit. They held the ball with less than a minute left in the contest. They drew some defense on a dribble drive and kicked it over to Yefchak, who hoisted a smooth, 24-foot, left-handed jumper from the right wing. Nothing but net! Haley came down on the next possession and pulled up from the top of the key. The ball looked good. The arc was phenomenal. But as it descended, it bounced off the back rim and away from the hoop. Black snuck out with a 98-96 win.',
    topPerformers1: 'Yellow Top Performers: Kyle Haley - 40 points, 7 rebounds, 3 assists, 2 steals, Jack Lloyd - 27 points, 7 rebounds, 2 assists, Austin Mayo - 13 points, 2 rebounds, Kassian Pryor - 11 points, 9 rebounds, 2 assists',
    topPerformers2: 'Black Top Performers: Tre Grubbs 57 points, 18 rebounds, 5 assists, 3 steals, James Hare - 14 points, 3 rebounds, 2 steals, Peter Lindholm - 16 points. The Alta Group Player of the Game - Tre Grubbs',
    date: new Date('2025-11-18T00:00:00Z')
},
{
    id: '9',
    title: 'Week 8 - Game 9: White vs. Purple',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-16',
    content: 'Game nine was over as soon as it started. White\'s whole team continued their collective dominance. Leading the way again was Bousono with a 26-point, 12-assist effort. Conley was an offensive juggernaut and scorched the nets with 30 points, while Black, Terrell, Goga-Blanchard, and O\'Brien scored in double digits. At halftime, the score was 59-32, White. Purple had a few strong outings, too. Bryan "El Toro" Rivera, Chris "The Pro" Cayole, "Mr. Consistent" Kolby Bradford, and Kaleb Swetty did the scoring, with Bradford leading the team with 27. However, it wasn\'t nearly enough to combat the White team\'s scoring clip. Final: 125-91, White',
    topPerformers1: 'White Top Performers: Andy Bousono - 26 points, 6 rebounds, 12 assists, 2 steals, Isaiah Terrell - 11 points, 7 rebounds, 2 assists, 3 steals, Jack Goga-Blacnachard - 14 points, 7 rebounds, 2 blocks, John O\'Brien - 14 points, 3 rebounds, Kenny Black - 11 points, 9 rebounds, 6 assists, Tyrone Conely - 30 points, 6 rebounds, 2 assists, 3 steals. The Alta Group Player of the Game - Andy Bousono',
    topPerformers2: 'Purple Top Performers: Chris Cayole - 21 points, 7 rebounds, 2 assists, Bryan Rivera - 13 points, 4 rebounds, 2 assists, Kolby Bradford - 27 points, 2 rebounds, Kaleb Swetty - 10 points, 7 rebounds, 3 assists',
    date: new Date('2025-11-18T00:00:00Z')
},
{
    id: '10',
    title: 'Week 8 - Game 10: Light Blue vs. Yellow',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-16',
    content: 'Game ten was the upset of the day. Light Blue didn\'t want it to be, and they held Yellow off for a bit. "Prince" Jirbil Abduallahi and Matt "The Stallion" Riordan were a strong one-two punch, but Yellow\'s team had it going on. At the half, it was 37-35, Yellow. However, they continued to push the team dynamic in the second, and they extended their lead. Leading the way was Manny "Big Bro" Robertson. He went for over 20 and secured 15 rebounds in the process. Jack Lloyd, Kassian Pryor, and Brandon Bigelow came up big in the upset, too. The final score was 71-60, Yellow.',
    topPerformers1: 'Light Blue Top Performers: Jibril Abdullahi - 28 points, 4 rebounds, 3 assists, 3 steals, Matt Riordan - 17 points, 9 rebounds, 2 assists, 3 blocks, 2 steals',
    topPerformers2: 'Yellow Top Performers: Manny Robertson - 23 points, 15 rebounds, 3 assists, 3 blocks, Kassian Prior - 11 points, 15 rebounds, Jack Lloyd - 12 points, 3 rebounds, 2 assists, Brandon Bigelow - 10 points, 3 rebounds, 5 assists. The Alta Group Player of the Game - Manny Robertson',
    date: new Date('2025-11-18T00:00:00Z')
},
{
    id: '11',
    title: 'Week 8 - Final Standings and Playoff Preview',
    author: 'League Admin',
    category: 'Closing',
    content: 'The Final Regular Season Standings for the Revolution Men\'s Basketball Fall League 2025: BLACK 9-0, LIGHT BLUE 7-2, WHITE 7-2, PURPLE 5-4, GREEN 5-4, RED 3-6, BLUE 3-6, YELLOW 2-7, GRAY 2-7, ORANGE 1-8. Big thank you to our new sponsors, Namaste Kitchens and The Alta Group! Check them out if you haven\'t yet. This recap was brought to you by Warden\'s Wisdom, a mindfulness-based coaching service to help you overcome anxiety and stress with simple, customized mindfulness practices. Warden\'s Wisdom Invitation of the Week: "It\'s okay to examine yourself. An examined life is a life well-lived. But be mindful of the approach. Stay curious. Stay open. And minimize judgments. You are a human after all." Some questions as we enter the playoffs: Will Black run the table undefeated? Will someone finally blemish their record? Who will be the MVP? Find out the answers to these questions this RIGHT NOW and this Sunday, November 23rd, on the Revolution Facebook Page. You won\'t wanna miss it!',
    date: new Date('2025-11-18T00:00:00Z')
},
    // Week 7
    {
    id: '0',
    title: 'Week 7 - Week 7 was full of matches made in heaven.',
    author: 'League Admin',
    category: 'Intro',
    content: 'Week 7 was full of matches made in heaven. White and Light Blue squared off in a battle for number two. Black was on the attack with their dynamite duo, and Purple made their presence felt with seven players in double digits. Let\'s get into the action!',
    date: new Date('2025-11-11T00:00:00Z')
},
{
    id: '1',
    title: 'Week 7 - Game 1: Light Blue vs. White',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-09',
    content: 'Game one was hot from the start! White was without their Big Dog, Tyrone Conley, but "The Commish" Andy Bousono bullied his way around the court to make his presence felt. Isaiah Terrell and Jack Goga-Blanchard also played big roles to keep White in contention. However, at the half, Light Blue led by a slim 27-26 margin. In the second half, the fight ensued. Light Blue received stellar showings from "Prince" Jibril Abdullahi and Matt "The Stallion" Riordan. Both players got into the passing lanes over and over to turn defense into offense. Abdullahi also clicked into high gear at just the right times to provide an extra scoring punch. The final score of this game was 63-59, Light Blue.',
    topPerformers1: 'Light Blue Top Performers: Jibril Abdullahi - 30 points, 8 rebounds, 4 assists, 6 steals, Matt Riordan - 14 points, 7 rebounds, 2 assists, 4 steals. The Alta Group Player of the Game - Jibril Abdullahi',
    topPerformers2: 'White Top Performers: Andy Bousono - 25 points, 13 rebounds, 8 assists, Isaiah Terrell - 10 points, 5 rebounds, 2 assists, Jack Goga-Blanchard - 11 points, 11 rebounds, 2 steals',
    date: new Date('2025-11-11T00:00:00Z')
},
{
    id: '2',
    title: 'Week 7 - Game 2: Green vs. Red',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-09',
    content: 'Game two was all business for Green. Kevin "KG" Garrison was like a machine out there. He skied for rebounds and showcased a textbook, silky smooth jumpshot to help put Green in the lead. Brody Snow was a terrific secondary scoring option, along with Prince Yodishembo, who stuffed the stat sheet. At halftime, it was 33-24, Green. Green grew their lead in the second, but Red had some strong outings, too. Ben "Lights It Up" Litteken wasn\'t his usual self, but he still got buckets when he could. Carter "Bruiser" Beeman did some damage in the paint, and Kerry Lyons must have taken a bath in the hot tub time machine, as he pulled off a gargantuan double-double like he was playing for the Frost Heaves. Unfortunately, it wasn\'t nearly enough, as Green walked away the winners, 78-61.',
    topPerformers1: 'Green Top Performers: Brody Snow - 18 points, 7 rebounds, 2 assists, Kevin Garrison - 23 points, 10 rebounds, 2 steals, Prince Yodishembo - 20 points, 9 rebounds, 2 assists, 2 steals. The Alta Group Player of the Game - Kevin Garrison',
    topPerformers2: 'Red Top Performers: Ben Litteken - 15 points, 9 rebounds, 2 assists, Carter Beeman - 19 points, 5 rebounds, 3 assists, Kerry Lyons - 10 points, 25 rebounds',
    date: new Date('2025-11-11T00:00:00Z')
},
{
    id: '3',
    title: 'Week 7 - Game 3: Purple vs. Gray',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-09',
    content: 'Purple came out of the gate throwing punches. They had seven players reach double figures: Stan "The Man" Salley, Chris "The Pro" Cayole, Logan Tobin, Kaleb Swetty, Fin Mitchell, and Wyatt Jarvis-Comi. Salley led the way with a 20-piece McNugget, and Cayole shot 85% from three. At halftime, it was 59-36 in favor of Purple. Purple kept pounding, but Gray had a little bit of fight in the second. Their sub, Will, had a powerful performance with 34 points and 19 rebounds, while John Helsel chipped in with 20 points of his own. Paul Gutierrez almost registered a double-double to round out the performances, but it wasn\'t enough for Gray. The final: 102-71, Purple.',
    topPerformers1: 'Purple Top Performers: Stan Salley - 20 points, 9 rebounds, 2 assists, Chris Cayole - 18 points, 4 rebounds, 2 assists, Kolby Bradford - 15 points, 3 rebounds, Kaleb Swetty - 13 points, 7 rebounds, 7 assists, Fin Mitchell - 10 points, 5 rebounds, 3 assists, Logan Tobin - 10 points, 8 rebounds, 4 assists, Wyatt Jarvis-Comi - 10 points, 2 steals. The Alta Group Player of the Game - Stan "The Man" Salley',
    topPerformers2: 'Gray Top Performers: John Helsel - 20 points, 6 rebounds, 4 assists, Will - 34 points, 19 rebounds, 3 assists, 3 steals, Paul Gutierrez - 11 points, 8 rebounds, 3 assists',
    date: new Date('2025-11-11T00:00:00Z')
},
{
    id: '4',
    title: 'Week 7 - Game 4: Blue vs. Yellow',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-09',
    content: 'Game four was a tight contest. Yellow came to battle. Kyle Haley and Reg Dailey put together some fine play along with their teammates to keep the first half within striking distance. Haley was timely in his three-point conversions, and Dailey made it rain in the midrange. However, at halftime the score favored Blue, 40-36. In the second half, they stretched their lead. Led by "Tenacious" Tavarius Vance, "Air" Jordan Maille, and "Send it in" Jerome Stewart, Blue put the clamps down defensively, and hit big buckets to take control of the game and establish momentum. The final of this one was 74-64, Blue.',
    topPerformers1: 'Blue Top Performers: Tavarius Vance - 18 points, 10 rebounds, 4 assists, Jordan Maille - 24 points, 10 rebounds, 2 assists, 2 steals, Jerome Stewart - 16 points, 6 rebounds, 4 assists, 2 steals. The Alta Group Player of the Game - Jordan Maille',
    topPerformers2: 'Yellow Top Performers: Kyle Haley - 16 points and 5 rebounds, Reg Dailey - 10 points and 2 rebounds',
    date: new Date('2025-11-11T00:00:00Z')
},
{
    id: '5',
    title: 'Week 7 - Game 5: Black vs. Orange',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-09',
    content: 'This game was over almost as soon as it began. Hakeem "The Dream" Faud was back in full force, and he was up to his usual activities: scoring from all three levels, rebounding like a madman, and wreaking havoc on defense. Teammates Aaaron West and Tre "Grabs Mad Boards" Grubbs provided plenty of scoring insurance to help Black distance themselves from Orange. At halftime, it was 59-36, Black. Black coasted in the second, allowing Orange to put up some points. They had four players reach double figures: Logan Letourneau, Dylan Mackie, Drew Pelkey, and Alex Philo. Mackie was like Ice Cube and almost messed around and got a triple-double. But it wasn\'t nearly enough to overcome the halftime deficit. The final score was 104-76, Black.',
    topPerformers1: 'Black Top Performers: Hakeem Faud - 43 points, 16 rebounds, 8 assists, 6 steals, Tre Grubbs - 29 points, 13 rebounds, 7 assists, Aaron West - 16 points, 2 rebounds. The Alta Group Player of the Game - Hakeem Faud',
    topPerformers2: 'Orange Top Performers: Drew Pelkey - 19 points, 6 rebounds, Dylan Mackie - 12 points, 13 rebounds, 8 assists, Logan Letourneau - 22 points, 6 rebounds, 2 assists, Alex Philo - 15 points',
    date: new Date('2025-11-11T00:00:00Z')
},
{
    id: '6',
    title: 'Week 7 - Sponsors, Standings, and Preview',
    author: 'League Admin',
    category: 'Closing',
    content: 'League standings after week 7: BLACK 7-0, LIGHT BLUE 6-1, WHITE 5-2, PURPLE 5-2, GREEN 4-3, BLUE 3-4, RED 2-5, ORANGE 1-6, YELLOW 1-6, GRAY 1-6. Big thank you to our new sponsors, Namaste Kitchens and The Alta Group! Check them out if you haven\'t yet. This recap was brought to you by Warden\'s Wisdom, a mindfulness-based coaching service to help you overcome anxiety and stress with simple, customized mindfulness practices. Warden\'s Wisdom Invitation of the Week: "Lean into uncertainty. Be okay with it. After all, it\'s one of the only things that\'s certain in this life." Some questions as we exit week 7 and enter week 8: Will Purple keep punching up in the standings? How will White respond after a second loss? Will Black remain undefeated heading into the playoffs? Find out the answers to these questions this Sunday, starting at 8 am. You won\'t wanna miss it!',
    date: new Date('2025-11-11T00:00:00Z')
},
   
   // Week 6
    {
    id: '0',
    title: 'Week 6 - Week 6 was full of tricks.',
    author: 'League Admin',
    category: 'Intro',
    content: 'Week 6 was full of tricks. A 48-point and 26-rebound performance in an overtime thriller, a tide turner in the opener, and Orange even got into the win column. Needless to say, Week 6 had it all. Let\'s get into the action.',
    date: new Date('2025-11-04T00:00:00Z')
},
{
    id: '1',
    title: 'Week 6 - Game 1: Red vs. Purple',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-02',
    content: 'Red was undermanned without Ben "Lights It Up" Litteken, but that didn\'t stop them from coming out with a bang. Carter "Bruiser" Beeman was a behemoth in the paint and nearly unguardable as he stopped over and through defenders on his way to scoring basket after basket. Cory "The Energizer Bunny" Chaplin packed a punch on the scoring end as well, while Dan Faris also chipped in with double digits. At halftime, it was Red who was ahead, 35-28. But that woke up a sleeping giant. Chris "The Pro" Cayole took the game into his hands along with three teammates: Kaleb Swetty, Logan Tobin, and Stan "The Man" Salley. Sweety dropped sweet passes into the shooting pocket of Cayole, who struck multiple times from deep. Tobin also hit a couple of timely three-pointers, while Salley bucked up in the paint against Beeman. Their collective effort led to a serious shift in energy, and the scoreboard showed. The final score was 83-80, Purple.',
    topPerformers1: 'Red Top Performers: Carter Beeman - 32 points, 11 rebounds, 2 steals, Cory Chaplin - 20 points, 3 rebounds, 4 assists, Dan Faris - 12 points, 2 steals',
    topPerformers2: 'Purple Top Performers: Chris Cayole - 33 points, 11 rebounds, 3 assists, 3 steals, Kaleb Swetty - 13 points, 3 rebounds, 6 assists, 3 steals, Logan Tobin - 14 points, 6 rebounds, 3 assists, Stan Salley - 15 points, 14 rebounds, 3 assists, 2 steals. The Alta Group Player of the Game - Chris Cayole',
    date: new Date('2025-11-04T00:00:00Z')
},
{
    id: '2',
    title: 'Week 6 - Game 2: Yellow vs. Orange',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-02',
    content: 'Game two was a barn burner in the first frame. Yellow was led by Captain Kyle Haley and Reg Dailey. Haley and Dailey doubled down from distance and from the midrange to drop 24 and 28, respectively. Manny "Big Bro" Robertson was a reassuring scorer, too, to keep Yellow within striking distance. At halftime, the score was in favor of Orange, 49-45. In the second, Orange opened it up. Drew Pelkey played a near-perfect game on his way to 35 points and 12 boards, and Logan Letourneau was another helpful asset to the offense. But perhaps the most helpful was Dylan Mackie. He was the straw that stirred the offense\'s drink. The final: 92-77, Orange.',
    topPerformers1: 'Yellow Top Performers: Kyle Haley - 24 points, 5 rebounds, 2 assists, Reg Dailey - 28 points, 7 rebounds, 2 assists, Manny Roberston - 10 points, 2 rebounds, 3 assists',
    topPerformers2: 'Orange Top Performers: Drew Pelkey - 35 points, 12 rebounds, 3 assists, Logan Letourneau - 22 points, 6 rebounds, 2 assists, Dylan Mackie - 9 points, 5 rebounds, 12 assists. The Alta Group Player of the Game - Drew Pelkey',
    date: new Date('2025-11-04T00:00:00Z')
},
{
    id: '3',
    title: 'Week 6 - Game 3: Black vs. Green',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-02',
    content: 'Game three was one you couldn\'t believe. Black was without Hakeem "The Dream" Faud, so Tre "Grabs Mad Boards" Grubbs not only did that, but he did his fair share of scoring, too. He scorched the nets for a near fifty-point performance throughout the contest, and teammates James Hare and Peter Lindham helped with scoring in double figures as well. At the half, they held a 45-43 lead. But Green was a well-oiled machine. Tavian Barrino set the tone with a perfect shooting percentage from inside the arc, while Cyle Chappy chipped in with some backbreaking three-pointers that kept the audience biting their nails. Brody Snow drank some go-go juice and provided big sparks as needed. As a result, the score at the end of regulation was 81-81. But in overtime, Black took care of business with a few buckets on offense and only allowing one on the defensive end, so they snuck away with a win. 87-83.',
    topPerformers1: 'Black Top Performers: Tre Grubbs - 48 points, 26 rebounds, 3 assists, 4 steals, James Hare - 17 points, 3 rebounds, 4 assists, Peter Lindham - 15 points, 7 rebounds, 3 assists. The Alta Group Player of the Game - Tre Grubbs',
    topPerformers2: 'Green Top Performers: Tavian Barrino - 40 points, 9 rebounds, 4 assists, Cyle Chappy - 21 points, 7 rebounds, Brody Snow - 11 points, 5 rebounds, 3 assists',
    date: new Date('2025-11-04T00:00:00Z')
},
{
    id: '4',
    title: 'Week 6 - Game 4: Blue vs. Light Blue',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-02',
    content: 'This game was over almost as soon as it started. Light Blue lit the scoreboard up and clamped down on the defensive end. "Prince" Jibril Abdullahi was a force to be reckoned with. He was nearly impossible to guard off the bounce, and his sniper-like precision from three made him all the harder to guard. Teammate Donnie Dwyer continued playing like a man possessed. At halftime, they held a 43-21 lead. In the second half, they continued to stretch that lead. Despite being dismantled from the get-go, Blue had a strong performance from Jerome Stewart, who went for 25 in the loss. The final: 91-45, Light Blue.',
    topPerformers1: 'Blue Top Performers: Jerome Stewart - 25 points, 7 rebounds',
    topPerformers2: 'Light Blue Top Performers: Jibril Abdullahi - 38 points, 6 rebounds, 4 assists, Donnie Dwyer - 24 points, 13 rebounds, 2 assists. The Alta Group Player of the Game - Jibril Abdullahi',
    date: new Date('2025-11-04T00:00:00Z')
},
{
    id: '5',
    title: 'Week 6 - Game 5: White vs. Gray',
    author: 'League Admin',
    category: 'Recap',
    gameDate: '2025-11-02',
    content: 'The final game of the day was almost as much of a snoozefest as game four. White\'s well-balanced attack was too much for Gray to contain. "The Commish" Andy Bousono held steady at the point and scored at all three levels. Isaiah Terrell shot it as efficiently as one can get. Jack Goga-Blanchard, "Mean" Joe Ruggles, and Kenny Black also got into the scoring mix to get White out ahead. At halftime, it was 59-26, White. Gray won the second half by double digits, but their hole to dig out of was way too big. Mahlik "Skywalker" Franklin showcased his athletic prowess, while Dylan "Point God" Practico and Dieng Adieng dipped their toes into double-digit scoring waters. But it was too late to surmount a comeback. The final score was 82-64, White.',
    topPerformers1: 'White Top Performers: Andy Bousono - 19 points, 9 rebounds, 8 assists, Isaiah Terrell - 11 points, 4 rebounds, 2 assists, Jack Goga-Blanchard - 15 points, 5 rebounds, 2 assists, Joe Ruggles - 13 points, 3 rebounds, 3 assists, Kenny Black - 13 points, 4 rebounds. The Alta Group Player of the Game - Andy Bousono',
    topPerformers2: 'Gray Top Performers: Mahlik Franklin - 30 points, 6 rebounds, 3 steals, Dylan Pratico - 14 points, 2 rebounds, 3 assists, 3 steals, Deng Adieng - 11 points, 6 rebounds',
    date: new Date('2025-11-04T00:00:00Z')
},
{
    id: '6',
    title: 'Week 6 - Sponsors, Standings, and Preview',
    author: 'League Admin',
    category: 'Closing',
    content: 'League standings after week 6: BLACK 6-0, WHITE 5-1, LIGHT BLUE 5-1, PURPLE 4-2, GREEN 3-3, RED 2-4, BLUE 2-4, GRAY 1-5, ORANGE 1-5, YELLOW 1-5. Big thank you to our new sponsors, Namaste Kitchens and The Alta Group! Check them out if you haven\'t yet. This recap was brought to you by Warden\'s Wisdom, a mindfulness-based coaching service to help you overcome anxiety and stress with simple, customized mindfulness practices. Warden\'s Wisdom Invitation of the Week: "Pay attention to your attention. You just might notice how much of life has been passing you by." Some questions as we exit week 6 and enter week 7: Will Light Blue beat out White for the two seed? Is Purple the new dark horse? Will Black stay undefeated? Find out the answers to these questions this Sunday, starting at 8 am. You won\'t wanna miss it!',
    date: new Date('2025-11-04T00:00:00Z')
},
    {
        // Week 5
        id: '0-5',
        title: 'Week 5 - Team was the theme of week 5.',
        author: 'League Admin',
        category: 'Intro',
        content: 'Team was the theme of week 5. We saw several momentum swings, hundred-point efforts, and one team solidifying itself as the top dog. Let\'s get into the action:',
        date: new Date('2025-10-28T00:00:00Z')
    },
    {
        id: '1-5',
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
        id: '2-5',
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
        id: '3-5',
        title: 'Week 5 - Game 3: White vs. Red',
        author: 'League Admin',
        category: 'Recap',
        gameDate: '2025-10-26',
        content: 'This game was over before halftime. "The Commish" and co. had plenty to prove. Bousono led the team with a whopping 32 points, while lacing seven three pointers. Five other teammates got into double figures: Isaiah Terrell, Jack Goga-Blacnahrd, "Mean" Joe Ruggles, Kenny Black, and Tyrone "Big Dog" Conley. Their collective attack led to a halftime lead of 51-26. The second half was more of the same, but Red had two top performers. Ben "Lights It Up" Litteken was hard to guard, and he lived up to his name. Speaking of living up to one\'s name, Cory "The Energizer Bunny" Chaplin was anything but short of energy as he zipped around the court. Unfortunately, Red needed more than a duo to step up to the dominance of White\'s depth. The final score was 115-78, White.',
        topPerformers1: 'White Top Performers: Andy Bousono - 32 points, 5 rebounds, 4 assists, 5 steals, Isaiah Terrell - 15 points, 7 rebounds, 3 steals, Jack Goga-Blacnahrd - 17 points, 13 rebounds, Joe Ruggles - 16 points, 2 rebounds, 3 assists, Tyrone Conley - 18 points, 7 rebounds, 5 assists, 2 steals, Kenny Black - 14 points, 11 rebounds, 2 steals. The Alta Group Player of the Game - Andy Bousono',
        topPerformers2: 'Red Top Performers: Ben Litteken - 36 points, 6 rebounds, 3 assists, 2 steals, Cory Chaplin - 17 points, 3 rebounds, 4 assists, 2 steals',
        date: new Date('2025-10-28T00:00:00Z')
    },
    {
        id: '4-5',
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
        id: '5-5',
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
        id: '6-5',
        title: 'Week 5 - Sponsors, Standings, and Preview',
        author: 'League Admin',
        category: 'Closing',
        content: 'League standings after week 5: BLACK 5-0, WHITE 4-1, LIGHT BLUE 4-1, PURPLE 3-2, GREEN 3-2, RED 2-3, BLUE 2-3, GRAY 1-4, YELLOW 1-4, ORANGE 0-5. Big thank thank you to our new sponsors, Namaste Kitchens and The Alta Group! Check them out if you haven\'t yet. This recap was brought to you by Warden\'s Wisdom, a mindfulness-based coaching service to help you overcome anxiety and stress with simple, customized mindfulness practices. Warden\'s Wisdom Invitation of the Week: "I invite you to notice something for the rest of this week. Notice when you\'re moving a bit faster than you need to. Maybe you fumble your phone in your hand. Perhaps you drop a dish as you remove it from the dishwasher. Maybe you almost get pulled over for the speed you\'re driving. When you catch yourself doing these things, ask yourself: What\'s the rush? Then, slow yourself down by 10%." Some questions as we exit week 5 and enter week 6: Will anyone beat Black? Will Hakeem and Tre split MVP? Is Blue a dark horse down the stretch? Can White\'s depth defeat black\'s dynamic duo come playoff time? Find out the answers to these questions this Sunday, starting at 8 am. You won\'t wanna miss it!',
        date: new Date('2025-10-28T00:00:00Z')
    },
    {
        // Week 4
        id: '0-4',
        title: 'Week 4 - The week four scores were all across the board.',
        author: 'League Admin',
        category: 'Intro',
        content: 'The week four scores were all across the board. Some were blowouts, others were barnburners, and some top-notch individual performances put a few teams over the top. Let\'s get into the action.',
        date: new Date('2025-10-21T00:00:00Z')
    },
    {
        id: '1-4',
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
        id: '2-4',
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
        id: '3-4',
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
        id: '4-4',
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
        id: '5-4',
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
        id: '6-4',
        title: 'Week 4 - Sponsors, Standings, and Announcements',
        author: 'League Admin',
        category: 'Closing',
        content: 'Big thank you to our new sponsors, Namaste Kitchens and The Alta Group! Check them out if you haven\'t yet. This recap was brought to you by Warden\'s Wisdom, a mindfulness-based coaching service to help you overcome anxiety and stress with simple, customized mindfulness practices. Warden\'s Wisdom Quote of the Week: "The more consciously you live, the more fulfilled you feel." Current Standings: BLACK 4-0, WHITE 3-1, PURPLE 3-1, LIGHT BLUE 3-1, GREEN 2-2, RED 2-2, GRAY 1-3, YELLOW 1-3, BLUE 1-3, ORANGE 0-4. Tune in tomorrow to catch the live Week 5 action on Facebook!',
        date: new Date('2025-10-21T00:00:00Z')
    },
    {
        // Week 3
        id: '0-3',
        title: 'Week 3 - Week 3 saw an undefeated team go down, and two more teams rise to the top of the rankings.',
        author: 'League Admin',
        category: 'Intro',
        content: 'Week 3 saw an undefeated team go down, and two more teams rise to the top of the rankings. There were high-flying acrobatic finishes, three-balls galore, and an overtime barn burner that kept the crowd biting their nails in anticipation of the outcome. Let\'s dive into the week three action:',
        date: new Date('2025-10-14T00:00:00Z')
    },
    {
        id: '1-3',
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
        id: '2-3',
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
        id: '3-3',
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
        id: '4-3',
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
        id: '5-3',
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
        // Week 2
        id: '0-2',
        title: 'Week 2 - The second week of the Revolution Fall League was telling.',
        author: 'League Admin',
        category: 'Intro',
        content: 'The second week of the Revolution Fall League was telling. The Black Team emerged as the team to beat, as they dominated for the second week in a row. Meanwhile, White\'s balanced team attack is nipping at their heels. Also, can Purple be the dark horse no one is talking about? Those ideas will reveal themselves in this week\'s recap.',
        date: new Date('2025-09-29T00:00:00Z')
    },
    {
        id: '1-2',
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
        id: '2-2',
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
        id: '3-2',
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
        id: '4-2',
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
        id: '5-2',
        title: 'Week 2 - Game 5: Orange vs. Purple',
        author: 'League Admin',
        category: 'Recap',
        gameDate: '2025-09-27',
        content: 'The final game of the day proved to be dramatic. Orange received a strong shooting effort from Cam Perta, who nailed nine trey balls. Teammates Dylan Mackie, Logan Letourneau, Alex Philo, and Drew Pelkey also got into the scoring mix by getting into double figures. At halftime, the score was 45-42, Orange. But the tides turned in the second half. Caleb Swetty turned up the heat with a stellar all-around performance, registering a 20-point double-double. Teammates Stan "The Man" Salley, Fin Mitchell, and "Mr. Consistent" Kolby Bradford also got into double figures to grab and stretch their lead like Mr. Fantastic. The final score was 99-86, Purple.',
        topPerformers1: 'Orange Top Performers: Cam Perta - 28 points, 5 rebounds, 4 assists, Dylan Mackie - 17 points, 5 rebounds, 5 assists, Logan Letourneau - 13 points, 6 rebounds, 4 assists, Alex Philo - 14 points, 6 rebounds, Drew Pelkey - 12 points, 12 rebounds, 2 assists',
        topPerformers2: 'Purple Top Performers: Caleb Swetty - 20 points, 11 rebounds, 5 assists, 3 steals, Stan "The Man" Salley - 18 points, 7 rebounds, Fin Mitchell - 14 points, Kolby Bradford - 10 points, 6 assists',
        date: new Date('2025-09-29T00:00:00Z')
    },
    {
        id: '0-1',
        title: 'Week 1 -Week one of the Revolution Fall League got off to a sizzling start.',
        author: 'League Admin',
        category: 'Intro',
        content: 'Week one of the Revolution Fall League got off to a sizzling start. There were surprise wins, forty-point showcases, and even a fifty-four-point clinic by an early MVP contender. Let’s get into the action.',
        date: new Date('2025-10-06T00:00:00Z') // Adjusting date to be earlier than week 2
    },
    {
        id: '1-1',
        title: 'Week 1 -Game 1: Purple vs. Green',
        author: 'League Admin',
        category: 'Recap',
        gameDate: '2025-10-04',
        content: 'The first game started hot and heavy.The dynamic duo of Matt “Swiss Army knife” Spear and Tavian “The Smooth Operator” Barrino led Green to an early lead. Spear got to the cup at will, while Barrino showcased a lights-out shooting stroke. Meanwhile, Brody Snow scored timely buckets. Despite their play, Purple held a 37-35 lead at halftime. In the second half, Purple stretched that lead. Ball movement and player touches were the secret sauce to their offensive output. Logan Tobin led the way, followed by “Mr. Consistent”, Kolby Bradford. Rounding out the scoring action were Kaleb Swetty and Fin Mitchell.\nThe quartet each scored in double figures, leading to a final score of 71-64, Purple.',
        topPerformers1: 'Purple Top Performers: Logan Tobin - 18 points, 9 rebounds, Fin Mitchell - 13 points, 9 rebounds, Kolby Bradford - 16 points, 3 rebounds, 4 assists, 3 steals, Kaleb Swetty - 15 points, 4 rebounds, 2 steals',
        topPerformers2: 'Green Top Performers: Brody Snow - 10 points, Matt Spear - 29 points, 15 rebounds, 3 assists, and 2 steals, Tavian Barrino - 22 points, 7 rebounds, 4 assists, 2 steals',
        date: new Date('2025-10-06T00:00:00Z'),
        
    },
    {
        id: '2-1',
        title: 'Week 1 -Game 2: Black vs. Light Blue',
        author: 'League Admin',
        category: 'Recap',
        gameDate: '2025-10-04',
        content: 'This game was a one-sided affair. \nBlack blew the doors off Light Blue. Hakeem “The Dream” Faud and Tre Grubbs kicked down the doors with vengeance. The duo was unstoppable, scoring nearly every trip down the court, and they dominated the glass on both ends. They also received scoring insurance from James Hare and Aaron “White Chocolate” West.\nAt halftime, it was 53-20, Black.\nThe second half didn’t go any better for Light Blue. In fact, their deficit nearly doubled. However, they received a strong performance from Matt Riordan, who led the way with 35 points. Donnie Dwyer put up double figures, but shot only 22% from the field. The final of this one was 118-65, Black.',
        topPerformers1: 'Black Top Performers: Tre Grubbs - 38 points, 20 rebounds, 7 assists, 5 steals, Hakeem Faud - 47 points, 18 rebounds, 6 assists. 3 steals, James Hare - 14 points, 6 rebounds, Aaron West - 13 points, 6 rebounds, 2 steals',
        topPerformers2: 'Light Blue Top Performers: Matt Riordan - 35 points, 5 rebounds, 3 assists, 2 steals, Donnie Dwyer - 16 points, 8 rebounds, 3 steals',
        date: new Date('2025-10-06T00:00:00Z'),
    },
    {
        id: '3-1',
        title: 'Week 1 -Game 3: Red vs. Yellow',
        author: 'League Admin',
        category: 'Recap',
        gameDate: '2025-10-04',
        content: 'Game three was another lopsided victory. Ben “Lights It Up” Litteken looked like he was seeking revenge after getting bounced in the first round of the summer league playoffs. He shot at a 62% clip for a league high 54 points. Teammates Cory “Energizer Bunny” Chaplin and Carter “Bruiser” Beeman also played pivotal roles in the scoring effort. At half, the score was 48-31, Red. In the second half, they went on cruise control. For Yellow, Manny “Big Bro” Robertson continued his strong play after rebounding from an injury in the spring. Teammates Austin Mayo, Kassian Pryor, and Reg Dailey also got into double figures. But the deficit was too large to overcome. The final was 97-72, Red.',
        topPerformers1: 'Red Top Performers: Ben Litteken - 54 points, 16 rebounds, 2 assists, 2 steals, Carter Beeman - 10 points, 7 rebounds, Cory Chaplin - 14 points, 5 rebounds, 5 assists, 3 steals',
        topPerformers2: 'Yellow Top Performers: Manny Robertson - 25 points, 3 rebounds, 2 steals, Reg Dailey - 10 points, 7 rebounds, Austin Mayo - 19 points,Kassian Pryor - 12 points, 8 rebounds',
        date: new Date('2025-10-06T00:00:00Z'),
    },
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

const extractPerformerTitle = (performerString) => {
    if (!performerString) return 'Top Performers';
    const index = performerString.indexOf(':');
    if (index !== -1) {
        return performerString.substring(0, index).trim();
    }
    return 'Top Performers';
};

const extractPerformerDetails = (performerString) => {
    if (!performerString) return '';
    const index = performerString.indexOf(':');
    if (index !== -1) {
        return performerString.substring(index + 1).trim();
    }
    return performerString;
};

// --- COMPONENT: RecapCard (Display Logic) ---
const RecapCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const fullText = [post.content, post.topPerformers1, post.topPerformers2, post.newsUpdates].filter(Boolean).join('\n\n');
  const needsExpansion = fullText.length > 400;
  
  const renderDetail = (title, content, icon) => {
      if (!content) return null;
      const detailContent = extractPerformerDetails(content);
      
      return (
          <div className="mb-3 pt-3 border-top border-danger-subtle">
              <h6 className="fw-bold text-danger mb-2 d-flex align-items-center small text-uppercase">
                  <i className={`bi bi-${icon} me-2 text-danger`}></i> {title}
              </h6>
              <div className="text-dark-emphasis whitespace-pre-wrap small lh-base">{detailContent}</div>
          </div>
      );
  };
  
  const mainContentBlock = (
      <>
          <h6 className="fw-bold text-dark mb-2 d-flex align-items-center small text-uppercase">
             <i className="bi bi-file-earmark-text me-2 text-danger"></i> 
             {post.category === 'Intro' ? 'Weekly Overview' : 'General Recap'}
          </h6>
          <div className="text-secondary whitespace-pre-wrap mb-4 small lh-base">{post.content || 'No content provided.'}</div>
          
          {renderDetail(extractPerformerTitle(post.topPerformers1), post.topPerformers1, 'star-fill')}
          {renderDetail(extractPerformerTitle(post.topPerformers2), post.topPerformers2, 'star-fill')}
          
          {renderDetail('League News & Updates', post.newsUpdates, 'megaphone-fill')}
      </>
  );

  const collapsedStyle = {
    maxHeight: '220px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'max-height 0.3s ease-in-out',
  };

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
    <div className="col-12 mb-4">
      <div className="card h-100 shadow-sm border border-light-subtle rounded-4">
        <div className="card-body d-flex flex-column h-100 p-4 p-sm-5">
          
          <div className="d-flex justify-content-between align-items-start mb-3">
            <span className="badge text-bg-danger px-3 py-1 rounded-pill shadow-sm small fw-bold">
              {post.category || 'Recap'}
            </span>
             {post.gameDate && (
                <span className="badge text-bg-light text-danger border border-danger-subtle px-3 py-1 rounded-pill small">
                    Game: {post.gameDate}
                </span>
            )}
          </div>
          
          <h5 className="fw-bold text-dark mb-3 fs-4 text-uppercase italic">{post.title || 'Untitled Post'}</h5>
          
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

          <div className="flex-grow-1 position-relative mb-3">
            <div 
              style={(!isExpanded && needsExpansion) ? collapsedStyle : {}} 
              className="p-3 border border-light-subtle rounded-3 bg-white"> 
              {mainContentBlock}
            </div>
            
            {!isExpanded && needsExpansion && (
              <div style={fadeStyle}></div>
            )}
          </div>

          {needsExpansion && (
            <div className="mt-auto pt-3">
              <button
                onClick={toggleExpand}
                className="btn btn-link text-danger fw-bold text-decoration-none p-0 d-flex align-items-center small"
              >
                {isExpanded ? 
                    <>SHOW LESS <i className="bi bi-chevron-up ms-2"></i></> : 
                    <>SHOW FULL DETAIL <i className="bi bi-chevron-down ms-2"></i></>
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
    const sortedPosts = useMemo(() => {
        return [...STATIC_RECAP_DATA].sort((a, b) => b.date.getTime() - a.date.getTime());
    }, []);

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

    const [activeWeek, setActiveWeek] = useState(uniqueWeeks.length > 0 ? uniqueWeeks[0] : null);
    
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
        return allPosts.filter(post => post.week === null);
    }, [allPosts]);
    
    return (
        <div className="min-vh-100" style={{ backgroundColor: '#ffffff' }}>
            <div className="container py-4 py-md-5">
                <header className="text-center pb-3 pb-md-4 mb-5">
                    <h1 className="display-5 fw-bold text-dark mb-2 text-uppercase italic">
                        League <span className="text-danger">Recaps</span> 
                    </h1>
                    <div className="mx-auto bg-danger" style={{ width: '50px', height: '4px', borderRadius: '2px' }}></div>
                    <p className="lead text-secondary mt-3 mx-auto small" style={{ maxWidth: '600px' }}>
                        Weekly game summaries, top performers, and league analysis.
                    </p>
                </header>
                
                {uniqueWeeks.length > 0 && (
                    <div className="mb-5 text-center">
                        <h3 className="text-dark-emphasis mb-4 fs-6 fw-bold text-uppercase tracking-wider">Filter By Week</h3>
                        <div className="d-flex justify-content-center flex-wrap gap-2">
                            {uniqueWeeks.map(week => (
                            <button
                                key={week}
                                onClick={() => setActiveWeek(week)}
                                className={`btn btn-sm fw-bold rounded-pill px-4 py-2 shadow-sm transition-all ${activeWeek === week 
                                    ? 'btn-danger' 
                                    : 'btn-outline-danger' 
                                }`}
                            >
                                WEEK {week}
                            </button>
                            ))}
                        </div>
                    </div>
                )}
                
                <main>
                    {activeWeek && filteredPosts.length > 0 && (
                        <div className="row justify-content-center">
                            <div className="col-lg-9">
                                <h2 className="text-dark mb-4 fs-4 fw-bolder border-bottom border-danger-subtle pb-3 text-uppercase">
                                    Week {activeWeek} Summaries
                                </h2>
                                <div className="row g-4"> 
                                    {filteredPosts.map((post) => (
                                        <RecapCard key={post.id} post={post} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {nonWeeklyPosts.length > 0 && (
                        <div className="row justify-content-center mt-5 pt-5 border-top border-light-subtle">
                            <div className="col-lg-9">
                                <h2 className="text-dark mb-4 fs-4 fw-bolder border-bottom border-secondary-subtle pb-3 text-uppercase">
                                    General League News
                                </h2>
                                <div className="row g-4">
                                    {nonWeeklyPosts.map((post) => (
                                        <RecapCard key={post.id} post={post} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Recaps;