import React, { useState, useEffect } from "react";
import axios from "axios"; // axios 사용 (fetch 등으로 대체 가능)

function NextPage({
  unitInfo,
  onGenerate,
  addedMaterials,
  onGoToCreateSurvey,
}) {
  const [previousSummary, setPreviousSummary] = useState("");
  const [todayGoal, setTodayGoal] = useState("");
  const [todaySummary, setTodaySummary] = useState("");
  const [subTopicsData, setSubTopicsData] = useState([]);
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
  const [localAddedMaterials, setLocalAddedMaterials] = useState([]); // 로컬에서 추가된 자료 관리
  const [loading, setLoading] = useState(false); // API 호출 중 로딩 상태
  const [error, setError] = useState(null); // API 호출 에러 상태

  // unitInfo 변경 시, 단원 관련 데이터를 서버에서 가져오는 useEffect
  useEffect(() => {
    if (unitInfo?.grade && unitInfo?.unit) {
      // API 호출 시작: 로딩 상태 활성화
      setLoading(true);
      setError(null);

      // API 호출: grade와 unit 기반으로 단원 데이터 요청
      // 엔드포인트: GET /api/unit-data?grade={grade}&unit={unit}
      // 예상 응답: { previousSummary: string, todayGoal: string, todaySummary: string, subTopics: { name: string, description: string, keywords: string[] }[] }
      // 예: { "previousSummary": "3학년 1단원 요약", "todayGoal": "학습 목표", "todaySummary": "내용 요약", "subTopics": [{ "name": "소주제 1", ... }, ...] }
      axios
        .get(`/api/unit-data`, {
          params: { grade: unitInfo.grade, unit: unitInfo.unit },
        })
        .then((response) => {
          setPreviousSummary(response.data.previousSummary || "");
          setTodayGoal(response.data.todayGoal || "");
          setTodaySummary(response.data.todaySummary || "");
          setSubTopicsData(response.data.subTopics || []);
        })
        .catch((err) => {
          setError("단원 데이터를 불러오는데 실패했습니다.");
          console.error("데이터 로드 실패:", err);
          setPreviousSummary("");
          setTodayGoal("");
          setTodaySummary("");
          setSubTopicsData([]);
        })
        .finally(() => {
          setLoading(false);
        });

      // 기존에 추가된 자료 반영
      setLocalAddedMaterials(addedMaterials || []);
    }
  }, [unitInfo, addedMaterials]);

  // 수업 자료 생성
  const handleGenerateMaterial = (keyword) => {
    if (selectedSubTopic) {
      onGenerate(keyword);
    } else {
      alert("소주제를 먼저 선택해주세요.");
    }
  };

  return (
    <div>
      {loading && <p>데이터를 불러오는 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <h2>이전 수업 요약</h2>
          <p>{previousSummary || "이전 수업 요약이 없습니다."}</p>

          <h2>오늘의 수업 목표</h2>
          <p>{todayGoal || "오늘의 수업 목표가 없습니다."}</p>

          <h2>오늘의 전체 수업 내용 요약</h2>
          <p>{todaySummary || "오늘의 요약이 없습니다."}</p>

          <h2>단원별 소주제</h2>
          {subTopicsData.length > 0 ? (
            subTopicsData.map((topic) => (
              <div
                key={topic.name}
                style={{
                  marginBottom: "20px",
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "5px",
                }}
              >
                <h3>{topic.name}</h3>
                <p style={{ fontSize: "0.9em", color: "#555" }}>
                  {topic.description}
                </p>
                <div>
                  {topic.keywords.map((keyword) => (
                    <button
                      key={keyword}
                      style={{
                        margin: "5px",
                        padding: "8px 12px",
                        border: "1px solid #81c784",
                        borderRadius: "5px",
                        backgroundColor: "white",
                        color: "#333",
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedSubTopic(topic)}
                    >
                      {keyword}
                    </button>
                  ))}
                  {selectedSubTopic?.name === topic.name && (
                    <button
                      style={{
                        margin: "5px",
                        padding: "8px 12px",
                        border: "1px solid #4caf50",
                        borderRadius: "5px",
                        backgroundColor: "#e8f5e9",
                        color: "#2e7d32",
                        cursor: "pointer",
                      }}
                      onClick={() => handleGenerateMaterial(topic.name)}
                    >
                      수업 자료 생성하기
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>소주제 데이터가 없습니다.</p>
          )}

          <div style={{ margin: "30px 0 10px 0" }}>
            <button
              onClick={onGoToCreateSurvey}
              style={{
                padding: "12px 24px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              질문 만들기
            </button>
          </div>

          <h2>추가한 수업 자료 목록</h2>
          {localAddedMaterials.length > 0 ? (
            localAddedMaterials.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px dotted #ccc",
                  paddingBottom: "10px",
                }}
              >
                <strong>{item.keyword}</strong> - {item.material || "생성 중"}
              </div>
            ))
          ) : (
            <p>추가된 자료가 없습니다.</p>
          )}

          <div style={{ marginTop: "20px" }}>
            <button
              style={{
                margin: "5px",
                padding: "10px 15px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              모든 수업 자료 다운받기
            </button>
            <button
              style={{
                margin: "5px",
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              PPT로 만들기
            </button>
            <button
              style={{
                margin: "5px",
                padding: "10px 15px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              PDF로 만들기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default NextPage;
