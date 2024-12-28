import React from "react";
import "../App.css";
import dailyDoubleVideo from "../Daily_Double.mp4";
import { JEOPARDY_QUESTIONS, CLUES, CLUES2, JEOPARDY_CATEGORIES, DOUBLE_JEOPARDY_CATEGORIES, DOUBLE_JEOPARDY_QUESTIONS } from "../Constants";

export function DailyDoubleVideo(props) {
    return (
        <div className="daily-double-modal">
          <video src={dailyDoubleVideo} autoPlay onClick={() => props.videoEnded(2)} />
        </div>
    )
};

export function SeedDailyDouble(isDoubleJeopardy) {
  let randomCategoryIndex, randomClueIndex, randomCategoryIndex2, randomClueIndex2;
  do {
    randomCategoryIndex = Math.floor(Math.random() * JEOPARDY_CATEGORIES.length);
    randomClueIndex = Math.floor(Math.random() * CLUES[randomCategoryIndex].length);
  } while (JEOPARDY_QUESTIONS[randomCategoryIndex].questions[randomClueIndex].isDailyDouble);

  JEOPARDY_QUESTIONS[randomCategoryIndex].questions[randomClueIndex].isDailyDouble = true;

  if(isDoubleJeopardy === true) {
    do {
      randomCategoryIndex2 = Math.floor(Math.random() * DOUBLE_JEOPARDY_CATEGORIES.length);
      randomClueIndex2 = Math.floor(Math.random() * CLUES2[randomCategoryIndex2].length);
    } while (DOUBLE_JEOPARDY_QUESTIONS[randomCategoryIndex2].questions[randomClueIndex2].isDailyDouble);

    DOUBLE_JEOPARDY_QUESTIONS[randomCategoryIndex2].questions[randomClueIndex2].isDailyDouble = true;

    do {
      randomCategoryIndex2 = Math.floor(Math.random() * DOUBLE_JEOPARDY_CATEGORIES.length);
      randomClueIndex2 = Math.floor(Math.random() * CLUES2[randomCategoryIndex2].length);
    } while (DOUBLE_JEOPARDY_QUESTIONS[randomCategoryIndex2].questions[randomClueIndex2].isDailyDouble);

    DOUBLE_JEOPARDY_QUESTIONS[randomCategoryIndex2].questions[randomClueIndex2].isDailyDouble = true;
  }
};

export function HandleDailyDoubleWager(team, wager, setTeam1DailyDoubleWager, setTeam2DailyDoubleWager, team1Score, team2Score, clueValue) {
  if(team === 1) {
    if(wager <= team1Score) {
      setTeam1DailyDoubleWager(parseInt(wager));
    } else if(team1Score <= 0) {
      setTeam1DailyDoubleWager(parseInt(clueValue));
    }
  } else {
    if(wager <= team2Score) {
      setTeam2DailyDoubleWager(parseInt(wager));
    } else if(team2Score <= 0) {
      setTeam2DailyDoubleWager(parseInt(clueValue));
    }
  }
};

export function GetDailyDoubleDecision(selectedCategory, selectedClue, isRound1Finished) {

  const getQuestion = () => {
    let chosenQuestion, categoryQuestions;

    if(isRound1Finished === true) {
      categoryQuestions = DOUBLE_JEOPARDY_QUESTIONS.find(q => q.category === selectedCategory);
      if (categoryQuestions) {
        chosenQuestion = categoryQuestions.questions.find(q => q.points === selectedClue);
      }
    } else {
      categoryQuestions = JEOPARDY_QUESTIONS.find(q => q.category === selectedCategory);
      if (categoryQuestions) {
        chosenQuestion = categoryQuestions.questions.find(q => q.points === selectedClue);
      }
    }

    return chosenQuestion;
  }

  const selectedQuestion = getQuestion();

  return selectedQuestion;
};