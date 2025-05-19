// src/NextPage.js
import React, { useState, useEffect } from "react";

function NextPage({ unitInfo, onGenerate, addedMaterials }) {
  const [previousSummary, setPreviousSummary] = useState("이전수업 요약약");
  const [todayGoal, setTodayGoal] = useState("오늘의 수업목표");
  const [todaySummary, setTodaySummary] = useState("");
  const [subTopicsData, setSubTopicsData] = useState([
    {
      name: "소주제 1",
      description: "소주제 1에 대한 간략한 설명입니다.",
      keywords: ["키워드A", "키워드B", "키워드C"],
    },
    {
      name: "소주제 2",
      description: "소주제 2에 대한 짧은 내용입니다.",
      keywords: ["핵심어1", "핵심어2"],
    },
  ]);
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
  const [derivedKeywords, setDerivedKeywords] = useState(["파생1", "파생2"]);
  const [localAddedMaterials, setLocalAddedMaterials] = useState([]); // 로컬에서 추가된 자료 관리

  useEffect(() => {
    // 백엔드에서 이전 수업 요약, 오늘의 수업 목표, 전체 수업 내용 요약, 소주제 및 키워드 데이터 가져오기
    // 실제 API 엔드포인트로 변경해야 합니다.
    fetch(`/api/unit-data?grade=${unitInfo.grade}&unit=${unitInfo.unit}`)
      .then((response) => response.json())
      .then((data) => {
        setPreviousSummary(data.previousSummary);
        setTodayGoal(data.todayGoal);
        setTodaySummary(data.todaySummary);
        setSubTopicsData(data.subTopics);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 데 실패했습니다.", error);
      });
    // 기존에 추가된 자료들을 반영
    setLocalAddedMaterials(addedMaterials);
  }, [unitInfo, addedMaterials]);

  const handleShowDerivedKeywords = (subTopic) => {
    setSelectedSubTopic(subTopic);
    // 해당 소주제에 대한 파생 키워드를 백엔드에서 가져오기
    // 실제 API 엔드포인트로 변경해야 합니다.
    fetch(`/api/derived-keywords?topic=${subTopic.name}`)
      .then((response) => response.json())
      .then((data) => {
        setDerivedKeywords(data.derivedKeywords);
      })
      .catch((error) => {
        console.error("파생 키워드를 불러오는 데 실패했습니다.", error);
      });
  };

  const handleGenerateMaterial = (keyword) => {
    if (selectedSubTopic) {
      // 해당 키워드로 수업 자료를 생성하는 페이지로 이동
      onGenerate(keyword);
    } else {
      alert("소주제를 먼저 선택해주세요.");
    }
  };

  return (
    <div>
      <h2>이전 수업 요약</h2>
      <p>{previousSummary}</p>

      <h2>오늘의 수업 목표</h2>
      <p>{todayGoal}</p>

      <h2>오늘의 전체 수업 내용 요약</h2>
      <p>{todaySummary}</p>

      <h2>단원별 소주제</h2>
      {subTopicsData.map((topic) => (
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
          </p>{" "}
          {/* 소주제 내용 (약 3줄) */}
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
              <>
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
                  onClick={() => handleShowDerivedKeywords(topic)}
                >
                  파생 키워드 보기
                </button>
                {selectedSubTopic && (
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
                    onClick={() =>
                      handleGenerateMaterial(selectedSubTopic.name)
                    }
                  >
                    수업 자료 생성하기
                  </button>
                )}
              </>
            )}
          </div>
          {selectedSubTopic?.name === topic.name &&
            derivedKeywords.length > 0 && (
              <div
                style={{
                  marginTop: "10px",
                  borderTop: "1px dashed #ccc",
                  paddingTop: "10px",
                }}
              >
                <h4>파생 키워드</h4>
                {derivedKeywords.map((keyword) => (
                  <button
                    key={keyword}
                    style={{
                      margin: "5px",
                      padding: "8px 12px",
                      border: "1px solid #a5d6a7",
                      borderRadius: "5px",
                      backgroundColor: "#f1f8e9",
                      color: "#388e3c",
                      cursor: "pointer",
                    }}
                    onClick={() => handleGenerateMaterial(keyword)}
                  >
                    {keyword} (생성)
                  </button>
                ))}
              </div>
            )}
        </div>
      ))}

      <h2>추가한 수업 자료 목록</h2>
      {localAddedMaterials.map((item, index) => (
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
      ))}

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
    </div>
  );
}

export default NextPage;
