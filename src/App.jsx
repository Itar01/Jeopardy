import React, { useState, useEffect } from "react";
import "./App.css";

import IntroVideo from "./components/IntroVideo";
import {DailyDoubleVideo, SeedDailyDouble, GetDailyDoubleDecision} from "./components/DailyDouble";
import FinalJeopardy from "./components/FinalJeopardy";
import JeopardyHeader from "./components/JeopardyHeader";
import {JeopardyBoard, InitBoard, HandleDisableClue, GetQuestionForClue, RemoveVideo, RenderClueControls} from "./components/JeopardyBoard";

export default function App() {
  // #region Constants
  const [selectedClue, setSelectedClue] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [clueIndex, setClueIndex] = useState(null);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [video, setVideo] = useState(true);
  const [dailyDouble, setDailyDouble] = useState(false);
  const [dailyDoubleControls, setDailyDoubleControls] = useState(false);
  const [round1Finished, setRound1Finished] = useState(false);
  const [round2Finished, setRound2Finished] = useState(false);
  const [isFinalJeopardy, setIsFinalJeopardy] = useState(false);
  const [clueCount, setClueCount] = useState(0);
  // #endregion Constants

  // #region UseEffects
  useEffect(() => {
    let score1 = document.querySelector('.team1-scores');
    let score2 = document.querySelector('.team2-scores');

    if(team1Score < 0) {
      score1.style.color = 'red';
    } else {
      score1.style.color = '#ffffff';
    }

    if(team2Score < 0) {
      score2.style.color = 'red';
    } else {
      score2.style.color = '#ffffff';
    }

  }, [team1Score, team2Score]);

  useEffect(() => {
    if (!video || round1Finished === true) {

      if(round1Finished === true) {
        document.querySelectorAll('.clue').forEach(clue => {
          clue.style.backgroundImage = 'url("/double_jeopardy.png")';
          clue.style.color = "#ffffff00"
        });

        setTimeout(() => {
          InitBoard(round1Finished);
          SeedDailyDouble(round1Finished);
        }, 2500)
      } else {
        setTimeout(() => {
          InitBoard(round1Finished);
          SeedDailyDouble(round1Finished);
        }, 300)
      }
    }
  }, [video, round1Finished]);

  useEffect(() => {
    if (selectedClue && GetDailyDoubleDecision(selectedCategory, selectedClue, round1Finished)?.isDailyDouble) {
      setDailyDouble(true);
      setDailyDoubleControls(true);
    }
  }, [categoryIndex, clueIndex, selectedClue]);

  // #endregion UseEffects

  // #region Board Management
  const closeModal = () => {
    HandleDisableClue(categoryIndex, clueIndex, clueCount, setRound1Finished, setRound2Finished);
    setCategoryIndex(null);
    setClueIndex(null);
    setSelectedCategory(null);
    setSelectedClue(null);
    if(dailyDoubleControls) {
      setDailyDoubleControls(false);
    }
  };

  const handleClueClick = (category, value, categoryIndex, clueIndex) => {
    setClueCount(clueCount + 1);
    setCategoryIndex(categoryIndex);
    setClueIndex(clueIndex);
    setSelectedCategory(category);
    setSelectedClue(value);
  };
  // #endregion Board Management

  // #region Scoreboard

  const handleIncreaseScore = (team, clueValue, performClueActions = true, isDailyDouble = false) => {
    if (team === 1) {
      if(isDailyDouble) {
        setTeam1Score(team1Score + (clueValue * 2));
      } else {
        setTeam1Score(team1Score + clueValue);
      }
      
    } else {
      if(isDailyDouble) {
        setTeam2Score(team2Score + (clueValue * 2));
      } else {
        setTeam2Score(team2Score + clueValue);
      }
    }

    if(performClueActions) {
      HandleDisableClue(categoryIndex, clueIndex, clueCount, setRound1Finished, setRound2Finished);
      setCategoryIndex(null);
      setClueIndex(null);
      setSelectedCategory(null);
      setSelectedClue(null);
    }
  };

  const handleDecreaseScore = (team, clueValue, performClueActions = true, isDailyDouble = false) => {
    if (team === 1) {
      if(isDailyDouble) {
        setTeam1Score(team1Score - (clueValue * 2));
      } else {
        setTeam1Score(team1Score - clueValue);
      }
      
    } else {
      if(isDailyDouble) {
        setTeam2Score(team2Score - (clueValue * 2));
      } else {
        setTeam2Score(team2Score - clueValue);
      }
    }

    if(performClueActions) {
      HandleDisableClue(categoryIndex, clueIndex, clueCount, setRound1Finished, setRound2Finished);
      setCategoryIndex(null);
      setClueIndex(null);
      setSelectedCategory(null);
      setSelectedClue(null);
    }
  };

  // #endregion Scoreboard

  return (
    <>
      <IntroVideo videoEnded={(choice) => RemoveVideo(choice, setVideo, setDailyDouble)}/>
      {dailyDouble && (<DailyDoubleVideo videoEnded={(choice) => RemoveVideo(choice, setVideo, setDailyDouble)}/>)}
      {isFinalJeopardy && <FinalJeopardy team1CurrentScore={team1Score} team2CurrentScore={team2Score} disableFinalJeopardy={() => setIsFinalJeopardy(false)} onIncrease={(team, finalWager, performActions) => handleIncreaseScore(team, finalWager, performActions)} onDecrease={(team, finalWager, performActions) => handleDecreaseScore(team, finalWager, performActions)}/>}
      <div className="jeopardy-board-background">
        <div className="jeopardy-board-container">
          <JeopardyBoard round1Done={round1Finished} processClue={(category, value, catIndex, clueIndex) => handleClueClick(category, value, catIndex, clueIndex)}/>
        </div>
        <JeopardyHeader team1CurrentScore={team1Score} team2CurrentScore={team2Score} round1BoardEmpty={round1Finished} round2BoardEmpty={round2Finished}/>
        {selectedClue && (
          <div className="modal">
            <div className="modal-content">
              <GetQuestionForClue round1Done={round1Finished} currentValue={selectedClue} currentCategory={selectedCategory}  />
              <RenderClueControls currentValue={selectedClue} closeWindow={() => closeModal()} isDailyDoubleActive={dailyDoubleControls} currentClue={selectedClue}  team1CurrentScore={team1Score} team2CurrentScore={team2Score}  increaseScore={(team, value, clueActions, enableDailyDouble) => handleIncreaseScore(team, value, clueActions, enableDailyDouble)} decreaseScore={(team, value, clueActions, enableDailyDouble) => handleDecreaseScore(team, value, clueActions, enableDailyDouble)} />
            </div>
          </div>
        )}
        <div className="final-jeopardy-header">
          {round2Finished ?  (<img src="/final_jeopardy.jpg" alt="Jeopardy Logo" className="jeopardy-logo" onClick={() => setIsFinalJeopardy(true)} style={{cursor: "pointer"}}/>) : null}
        </div>
      </div>
    </>
  );
}