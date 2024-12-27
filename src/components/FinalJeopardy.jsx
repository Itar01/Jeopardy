import React, { useState } from "react";
import "../App.css";
import finalJeopardyAudio from "../final_jeopardy.mp3";
import finalJeopardyQuestion from '../finalJeopardy.json';

export default function FinalJeopardy(props) {
    const [thinkMusicPlaying, setThinkMusicPlaying] = useState(false);
    const [team1FinalWager, setTeam1FinalWager] = useState(0);
    const [team2FinalWager, setTeam2FinalWager] = useState(0);
    
    const FINAL_JEOPARDY = import.meta.env.VITE_FINAL_JEOPARDY_QUESTION ? JSON.parse(import.meta.env.VITE_FINAL_JEOPARDY_QUESTION) : finalJeopardyQuestion;

    if (!thinkMusicPlaying === true) {
        const thinkMusic = new Audio(finalJeopardyAudio);
        thinkMusic.play();
        setThinkMusicPlaying(true);
    }

    const handleFinalJeopardyWager = (team, wager) => {
        if(team === 1) {
          if(wager <= props.team1CurrentScore) {
            setTeam1FinalWager(parseInt(wager));
          }
        } else {
          if(wager <= props.team2CurrentScore) {
            setTeam2FinalWager(parseInt(wager));
          }
        }
    };

    return (
        <div className="final-jeopardy-modal">
            <div className="final-jeopardy-modal-content">
                <h1>{FINAL_JEOPARDY.category}</h1>
                <p>{FINAL_JEOPARDY.question}</p>
                <div className="final-jeopardy-response-area1">
                    <input id="team1-final-response" type="text" value={team1FinalWager > 0 ? team1FinalWager : ""} onChange={(wagerInput) => handleFinalJeopardyWager(1, wagerInput.target.value)} />
                    <button onClick={() => props.onIncrease(1, team1FinalWager, false)}>Team 1 Correct</button>
                    <button onClick={() => props.onDecrease(1, team1FinalWager, false)}>Team 1 Incorrect</button>
                </div>
                <div className="final-jeopardy-response-area2">
                    <input id="team2-final-response" type="text" value={team2FinalWager > 0 ? team2FinalWager : ""} onChange={(wagerInput) => handleFinalJeopardyWager(2, wagerInput.target.value)} />
                    <button onClick={() => props.onIncrease(2, team2FinalWager, false)}>Team 2 Correct</button>
                    <button onClick={() => props.onDecrease(2, team2FinalWager, false)}>Team 2 Incorrect</button>
                </div>
                <div style={{ marginTop: "120px" }}>
                    <button onClick={() => props.disableFinalJeopardy()}>Close</button>
                </div>
            </div>
        </div>
    )
}