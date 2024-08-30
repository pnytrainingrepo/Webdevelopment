'use client';

import React from 'react';
import { useState } from "react";

export default function Managestate() {

    const [score, setScore] = useState(0);
    const increaseScore = () => setScore(score + 1);
    const decreaseScore = () => setScore(score - 1);
  
    return (
      <div>
        <p>Your score is {score}</p>
        <button onClick={increaseScore}>  Click(+)  </button>
        <button onClick={decreaseScore}>   Click(-) </button>
      </div>
    );
  }
