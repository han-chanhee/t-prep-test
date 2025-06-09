import React, { useState, useEffect } from "react";
import axios from "axios"; // axios 사용 (fetch 등으로 대체 가능)

function StartPage({ onNext }) {
  const [grade, setGrade] = useState("");
  const [prevProgress, setPrevProgress] = useState("");
  const [nextProgress, setNextProgress] = useState("");
  const [progressList, setProgressList] = useState([]);
  const [startProgress, setStartProgress] = useState("");
  const [endProgress, setEndProgress] = useState("");
  const [loading, setLoading] = useState(false); // API 호출 중 로딩 상태
  const [error, setError] = useState(null); // API 호출 에러 상태

  // grade 변경 시, 서버에서 이전/다음 진도 및 진도 리스트를 가져오는 useEffect
  useEffect(() => {
    if (grade) {
      // API 호출 시작: 로딩 상태 활성화
      setLoading(true);
      setError(null);

      // API 호출: grade 기반으로 이전/다음 진도 및 전체 진도 리스트 요청
      // 엔드포인트: GET /api/progress?grade={grade}
      // 예상 응답: { prevProgress: string, nextProgress: string, progressList: string[] }
      // 예: { "prevProgress": "3학년 - 1단원", "nextProgress": "3학년 - 2단원", "progressList": ["3학년 - 1단원", ...] }
      axios
        .get(`/api/progress`, { params: { grade } })
        .then((response) => {
          // 서버 응답 데이터 설정
          setPrevProgress(response.data.prevProgress || "");
          setNextProgress(response.data.nextProgress || "");
          setProgressList(response.data.progressList || []);
        })
        .catch((err) => {
          // 에러 처리: 서버에서 반환된 메시지 또는 기본 에러 메시지 표시
          setError(
            err.response?.data?.error ||
              "진도 데이터를 불러오는데 실패했습니다."
          );
          setPrevProgress("");
          setNextProgress("");
          setProgressList([]);
        })
        .finally(() => {
          // API 호출 완료: 로딩 상태 비활성화
          setLoading(false);
        });
    } else {
      // grade가 비어있을 경우 상태 초기화
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
    // 다음 단계로 데이터 전달
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

      {loading && <p>데이터를 불러오는 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {grade && !loading && !error && (
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

      <button onClick={handleNext} disabled={loading}>
        다음
      </button>
    </div>
  );
}

export default StartPage;
