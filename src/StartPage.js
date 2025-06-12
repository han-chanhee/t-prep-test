// src/StartPage.js
import React, { useState, useEffect } from "react";

function StartPage({ onNext }) {
  const [grade, setGrade] = useState("");
  const [prevProgress, setPrevProgress] = useState("");
  const [nextProgress, setNextProgress] = useState("");
  const [progressList, setProgressList] = useState([]);
  const [startProgress, setStartProgress] = useState("");
  const [endProgress, setEndProgress] = useState("");

  // 반 입력 시, 이전 진도와 다음 진도를 불러오는 예시
  useEffect(() => {
    if (grade) {
      // 실제로는 서버나 DB에서 grade 기반으로 데이터 불러오기
      setPrevProgress(`${grade} - 1단원`);
      setNextProgress(`${grade} - 2단원`);
      setProgressList([
        `${grade} - 1단원`,
        `${grade} - 2단원`,
        `${grade} - 3단원`,
        `${grade} - 4단원`,
      ]);
    } else {
      setPrevProgress("");
      setNextProgress("");
      setProgressList([]);
    }
  }, [grade]);

  const handleNext = () => {
    if (!grade || !startProgress || !endProgress) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    onNext({
      grade,
      startProgress,
      endProgress,
    });
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
      {grade && (
        <div>
          <p>이전 진도: {prevProgress}</p>
          <p>다음 진도: {nextProgress}</p>
          <div>
            <label htmlFor="startProgress">시작 진도: </label>
            <select
              id="startProgress"
              value={startProgress}
              onChange={(e) => setStartProgress(e.target.value)}
            >
              <option value="">선택</option>
              {progressList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="endProgress">끝 진도: </label>
            <select
              id="endProgress"
              value={endProgress}
              onChange={(e) => setEndProgress(e.target.value)}
            >
              <option value="">선택</option>
              {progressList.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <button onClick={handleNext}>다음</button>
    </div>
  );
}

export default StartPage;
