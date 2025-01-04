import React, { useState, useEffect } from "react";
import "../App.css";

export default function JeopardyHeader(props) {
    return (
        <div className="scores-container">
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
        </div>
    )
}