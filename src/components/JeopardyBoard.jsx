import React, {useState} from "react";
import "../App.css";
import { CATEGORIES, CLUES, QUESTIONS } from "../Constants";
import boardAudio from "../board_fill.mp3";

import {HandleDailyDoubleWager} from "../components/DailyDouble";

export function JeopardyBoard(props) {
    return (
        <main className="jeopardy-board">
            {CATEGORIES.map((category, catIndex) => (
            <div key={catIndex} className="category-column">
                <div className="category-header">{category}</div>
                <div>
                {CLUES[catIndex].map((value, clueIndex) => (
                    <div key={clueIndex} className="clue"  onClick={() => props.processClue(category, value, catIndex, clueIndex)}>
                    ${value}
                    </div>
                ))}
                </div>
            </div>
            ))}
        </main>
    )
}

export function InitBoard() {
    const audio = new Audio(boardAudio);
    audio.play();
    const categoryColumns = document.querySelectorAll('.category-column');
    const clues = [];

    categoryColumns.forEach(column => {
        const columnClues = column.querySelectorAll('.clue');
        columnClues.forEach(clue => clues.push(clue));
    });

    const revealNextClue = () => {
        if (clues.length === 0) return;

        const randomIndex = Math.floor(Math.random() * clues.length);
        const clue = clues.splice(randomIndex, 1)[0];

        clue.style.backgroundImage = "unset";
        clue.style.color = "#FFFF00";

        setTimeout(revealNextClue, 240);
    };

    revealNextClue();
}
 
export function HandleDisableClue(categoryIndex, clueIndex, clueCount, setQuestionsAnswered) {
    if (categoryIndex !== null && clueIndex !== null) {
      const categoryColumns = document.querySelectorAll('.category-column');
      if (categoryIndex < categoryColumns.length) {
        const clues = categoryColumns[categoryIndex].querySelectorAll('.clue');
        if (clueIndex < clues.length) {
          clues[clueIndex].style.color = "#000099";
          clues[clueIndex].style.pointerEvents = "none";
          if(clueCount >= 30) {
            setQuestionsAnswered(true);
          }
        }
      }
    }
};

export function GetQuestionForClue(props) {

  const getQuestion = () => {
    let chosenQuestion;
    const categoryQuestions = QUESTIONS.find(q => q.category === props.currentCategory);
    if (categoryQuestions) {
      chosenQuestion = categoryQuestions.questions.find(q => q.points === props.currentValue);
    }
    return chosenQuestion;
  }

  const selectedQuestion = getQuestion()?.question;

  return selectedQuestion ? (
    <>
      <h1>Question for ${props.currentValue}</h1>
      <p>{selectedQuestion}</p>
    </>
    
  ) : null;
    
};

export function RemoveVideo(choice, setVideo, setDailyDouble) {
    const video = document.querySelector('video');
    const videoModal = document.querySelector('.video-modal');
    const dailyDoubleModal = document.querySelector('.daily-double-modal');
    if (video && choice === 1) {
      video.muted = true;
      video.remove();
      videoModal.remove();
      setVideo(false);
    }

    if (dailyDoubleModal && choice === 2 ) {
      setDailyDouble(false);
    }
};

export function RenderClueControls(props) {
  const [team1DailyDoubleWager, setTeam1DailyDoubleWager] = useState(0);
  const [team2DailyDoubleWager, setTeam2DailyDoubleWager] = useState(0);

  return props.isDailyDoubleActive ? (
    <>
      <div className="daily-double-response-area1">
        <input id="team1-daily-double-response" type="text" value={team1DailyDoubleWager > 0 ? team1DailyDoubleWager : ""} onChange={(wagerInput) => HandleDailyDoubleWager(1, wagerInput.target.value, setTeam1DailyDoubleWager, setTeam2DailyDoubleWager, props.team1CurrentScore, props.team2CurrentScore)}/>
        <button onClick={() => { props.increaseScore(1, parseInt(team1DailyDoubleWager), false, true); }}>Team 1 Correct</button>
        <button onClick={() => { props.decreaseScore(1, parseInt(team1DailyDoubleWager), false, true); }}>Team 1 Incorrect</button>
      </div>
      <div className="daily-double-response-area2">
        <input id="team2-daily-double-response" type="text" value={team2DailyDoubleWager > 0 ? team2DailyDoubleWager : ""} onChange={(wagerInput) => HandleDailyDoubleWager(2, wagerInput.target.value, setTeam1DailyDoubleWager, setTeam2DailyDoubleWager, props.team1CurrentScore, props.team2CurrentScore)}/>
        <button onClick={() => { props.increaseScore(2, parseInt(team2DailyDoubleWager), false, true); }}>Team 2 Correct</button>
        <button onClick={() => { props.decreaseScore(2, parseInt(team2DailyDoubleWager), false, true); }}>Team 2 Incorrect</button>
      </div>
      <div style={{marginTop: "130px"}}>
        <button onClick={() => props.closeWindow()}>Close</button>
      </div>
    </>
  ): (
    <>
      <button onClick={() => { props.increaseScore(1, props.currentClue); }}>Team 1 Correct</button>
      <button onClick={() => { props.increaseScore(2, props.currentClue); }}>Team 2 Correct</button>
      <button onClick={() => { props.decreaseScore(1, props.currentClue); }}>Team 1 Incorrect</button>
      <button onClick={() => { props.decreaseScore(2, props.currentClue); }}>Team 2 Incorrect</button>
      <button onClick={() => props.closeWindow()}>Close</button>
    </>
    
  )
};