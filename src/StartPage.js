// src/StartPage.js
import React, { useState } from "react";

function StartPage({ onNext }) {
  const [grade, setGrade] = useState("");
  const [unit, setUnit] = useState("");

  const handleNext = () => {
    if (grade && unit) {
      onNext({ grade, unit });
    } else {
      alert("반과 단원명을 모두 입력해주세요.");
    }
  };

  return (
    <div>
      <h1>AI 기반 수업 자료 생성 서비스</h1>
      <div>
        <label htmlFor="grade">반: </label>
        <input
          type="text"
          id="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="unit">단원명: </label>
        <input
          type="text"
          id="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>
      <button onClick={handleNext}>다음</button>
    </div>
  );
}

export default StartPage;
