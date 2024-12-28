# React Jeopardy!
![ ](/public/main_logo.jpeg)

This repository provides a fully functioning Jeopardy game that runs in the browser.

## Features
 - Scoreboard for Team 1 and Team 2
 - Daily Double with option to wager points
 - Final Jeopardy with option to wager points

## Install

### Prerequisites
- VS Code
- Node 20+
- Browser

### Setup
1. Run <code>npm install</code> from root of the project
2. Run <code>npm run build</code> from the root of the project
3. Jeopardy Board questions are provided from the jeopardy.json file or provided from the env via VITE_JEOPARDY_QUESTIONS<b><sup>*</sup></b>
4. Double Jeopardy Board questions are provided from the double_jeopardy.json file or provided from the env via VITE_DOUBLE_JEOPARDY_QUESTIONS<b><sup>*</sup></b>
5. Final Jeopardy question is provided from finalJeopardy.json file or provided from the the env via VITE_FINAL_JEOPARDY_QUESTION<b><sup>*</sup></b>

\* If loaded from ENV must be stringified JSON

## Play

- Run <code>npm run dev</code> to start the game

## Legal Disclaimer

>This project is not affiliated with, endorsed by, or in any way associated with the official Jeopardy! television show, its producers, or its owners. All trademarks, service marks, trade names, trade dress, product names, and logos appearing in this project are the property of their respective owners. This project is intended for educational and entertainment purposes only and is not for profit.