import React, { useState, useEffect } from "react";
import "../App.css";

export default function JeopardyHeader(props) {
    return (
        <header className="jeopardy-header">
            {props.round2BoardEmpty ? 
            (<img src="/final_jeopardy.jpg" alt="Jeopardy Logo" className="jeopardy-logo" onClick={() => props.activateFinalJeopardy(true)} style={{cursor: "pointer"}}/>) 
            : props?.round1BoardEmpty ? <img src="/double_jeopardy.png" alt="Jeopardy Logo" className="jeopardy-logo"/> : <img src="/main_logo.jpeg" alt="Jeopardy Logo" className="jeopardy-logo"/>}
            
            <div className="team1-scores">
            <div className="team1-score">
                <p style={{color: '#ffffff', float: 'left', marginTop: '-1px', marginRight: '10px'}}>Team 1:</p>
                ${props.team1CurrentScore}
            </div>
            </div>
            <div className="team2-scores">
            <div className="team2-score">
                <p style={{color: '#ffffff', float: 'left', marginTop: '-1px', marginRight: '10px'}}>Team 2:</p>
                ${props.team2CurrentScore}
            </div>
            </div>
        </header>
    )
}