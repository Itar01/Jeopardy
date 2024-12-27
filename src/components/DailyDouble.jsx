import React from "react";
import "../App.css";
import dailyDoubleVideo from "../Daily_Double.mp4";
import { QUESTIONS, CLUES, CATEGORIES } from "../Constants";

export function DailyDoubleVideo(props) {
    return (
        <div className="daily-double-modal">
          <video src={dailyDoubleVideo} autoPlay onClick={() => props.videoEnded(2)} />
        </div>
    )
};

export function SeedDailyDouble() {
  let randomCategoryIndex, randomClueIndex, randomCategoryIndex2, randomClueIndex2;
  do {
    randomCategoryIndex = Math.floor(Math.random() * CATEGORIES.length);
    randomClueIndex = Math.floor(Math.random() * CLUES[randomCategoryIndex].length);
  } while (QUESTIONS[randomCategoryIndex].questions[randomClueIndex].isDailyDouble);

  QUESTIONS[randomCategoryIndex].questions[randomClueIndex].isDailyDouble = true;

  do {
    randomCategoryIndex2 = Math.floor(Math.random() * CATEGORIES.length);
    randomClueIndex2 = Math.floor(Math.random() * CLUES[randomCategoryIndex2].length);
  } while (QUESTIONS[randomCategoryIndex2].questions[randomClueIndex2].isDailyDouble);

  QUESTIONS[randomCategoryIndex2].questions[randomClueIndex2].isDailyDouble = true;
};

export function HandleDailyDoubleWager(team, wager, setTeam1DailyDoubleWager, setTeam2DailyDoubleWager, team1Score, team2Score) {
  if(team === 1) {
    if(wager <= team1Score) {
      setTeam1DailyDoubleWager(parseInt(wager));
    }
  } else {
    if(wager <= team2Score) {
      setTeam2DailyDoubleWager(parseInt(wager));
    }
  }
};

export function GetDailyDoubleDecision(selectedCategory, selectedClue) {

  const getQuestion = () => {
    let chosenQuestion;
    const categoryQuestions = QUESTIONS.find(q => q.category === selectedCategory);
    if (categoryQuestions) {
      chosenQuestion = categoryQuestions.questions.find(q => q.points === selectedClue);
    }
    return chosenQuestion;
  }

  const selectedQuestion = getQuestion();

  return selectedQuestion;
};